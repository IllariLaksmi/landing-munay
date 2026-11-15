/** Single source of truth for outbound links and contact details. */
export const DONATE_URL =
  "https://www.zeffy.com/en-US/donation-form/donate-to-create-safe-spaces-for-healing";

export const CONTACT_EMAIL = "info@munayinaction.org";

export const INSTAGRAM_URL = "https://www.instagram.com/munayfoundation";
export const INSTAGRAM_HANDLE = "@munayfoundation";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://munayinaction.org";

export function navHref(locale: string, path: string, hash?: string): string {
  const base = path ? `/${locale}${path}` : `/${locale}`;

  return hash ? `${base}#${hash}` : base;
}
