export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/** Language tags used by `hreflang` and the `<html lang>` attribute. */
export const localeHtmlLang: Record<Locale, string> = {
  es: "es",
  en: "en",
};

/** Cookie that remembers the visitor's explicit or detected locale. */
export const localeCookieName = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Pick the first locale supported by the site from an `Accept-Language`
 * header, honouring quality weights (e.g. `en-US,en;q=0.9,es;q=0.8`).
 * Returns `null` when nothing matches.
 */
export function matchAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam
        ? Number.parseFloat(qualityParam.split("=")[1] ?? "0")
        : 1;

      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag, quality } of candidates) {
    if (quality <= 0) continue;

    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return null;
}

/**
 * Replace the first path segment with the target locale while preserving the
 * rest of the route (for example `/es/retiros/abc` → `/en/retiros/abc`).
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = target;
    return `/${segments.join("/")}`;
  }

  return `/${[target, ...segments].join("/")}`;
}

/** Replace `{key}` placeholders in a dictionary string. */
export function formatTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
