/** Single source of truth for outbound links and contact details. */
export const DONATE_URL =
  "https://www.zeffy.com/en-US/donation-form/donate-to-create-safe-spaces-for-healing";

export const CONTACT_EMAIL = "info@munayinaction.org";

export const INSTAGRAM_URL = "https://www.instagram.com/munayfoundation";
export const INSTAGRAM_HANDLE = "@munayfoundation";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://munayinaction.org";

/** Primary navigation, locale independent. */
export const mainNavItems = [
  { key: "home", path: "" },
  { key: "about", path: "/about" },
  { key: "programs", path: "/programs" },
  { key: "calendar", path: "/calendar" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
] as const;

export type MainNavKey = (typeof mainNavItems)[number]["key"];

export function navHref(locale: string, path: string): string {
  return path ? `/${locale}${path}` : `/${locale}`;
}
