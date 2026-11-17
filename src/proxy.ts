import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  locales,
  matchAcceptLanguage,
  type Locale,
} from "@/lib/i18n";

const localeCookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

/**
 * Resolve the locale for a visitor without a locale prefix:
 * 1. the locale they explicitly chose before (`NEXT_LOCALE` cookie),
 * 2. the browser/system language (`Accept-Language`),
 * 3. Spanish, the brand's primary language.
 */
function preferredLocale(request: NextRequest): Locale {
  const remembered = request.cookies.get(localeCookieName)?.value;
  if (remembered && isLocale(remembered)) return remembered;

  return matchAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

/**
 * Locale routing. Paths already prefixed with a supported locale are kept and
 * remembered; any other path is redirected to the visitor's preferred locale,
 * preserving the rest of the path and the query string.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathLocale = locales.find(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathLocale) {
    const response = NextResponse.next();

    if (request.cookies.get(localeCookieName)?.value !== pathLocale) {
      response.cookies.set(localeCookieName, pathLocale, localeCookieOptions);
    }

    return response;
  }

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookieName, locale, localeCookieOptions);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
