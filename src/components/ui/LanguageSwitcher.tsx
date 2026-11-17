"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import type { Dictionary } from "@/types/dictionary";
import {
  localeCookieName,
  localeHtmlLang,
  localeNames,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  a11y: Dictionary["a11y"];
  /** `light` adapts the control to photographic/blue surfaces. */
  tone?: "default" | "light";
  className?: string;
}

/**
 * Native select, so the control keeps full keyboard and screen-reader support
 * while remaining easy to extend when more locales are added.
 */
export function LanguageSwitcher({
  locale,
  a11y,
  tone = "default",
  className = "",
}: LanguageSwitcherProps) {
  const router = useRouter();
  const light = tone === "light";

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const target = event.target.value as Locale;

    if (target === locale || typeof window === "undefined") return;

    // Remember the explicit choice so later visits without a locale prefix
    // keep the language the visitor picked.
    document.cookie = `${localeCookieName}=${target};path=/;max-age=31536000;samesite=lax`;

    const targetPath = `${switchLocalePath(window.location.pathname, target)}${window.location.search}${window.location.hash}`;
    router.push(targetPath);
  };

  return (
    <div
      className={["relative inline-flex shrink-0 items-center", className]
        .join(" ")
        .trim()}
    >
      <select
        defaultValue={locale}
        onChange={handleChange}
        aria-label={a11y.languageSwitcher}
        className={[
          "min-h-11 min-w-32 appearance-none rounded-full border py-2 pl-4 pr-10 text-[0.75rem] font-semibold tracking-[0.04em] transition-colors",
          light
            ? "border-cream/40 bg-transparent text-cream hover:border-cream focus-visible:border-cream"
            : "border-blue/30 bg-transparent text-blue hover:border-blue focus-visible:border-blue",
        ].join(" ")}
      >
        {locales.map((target) => (
          <option
            key={target}
            value={target}
            lang={localeHtmlLang[target]}
            className="bg-cream text-blue"
          >
            {localeNames[target]}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute right-3 text-[0.55rem]",
          light ? "text-cream" : "text-blue",
        ].join(" ")}
      >
        ▾
      </span>
    </div>
  );
}
