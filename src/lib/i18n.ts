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

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
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
