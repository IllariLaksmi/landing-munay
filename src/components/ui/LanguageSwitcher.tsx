"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import type { Dictionary } from "@/types/dictionary";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  a11y: Dictionary["a11y"];
  /** `light` adapts the control to photographic/blue surfaces. */
  tone?: "default" | "light";
}

export function LanguageSwitcher({
  locale,
  a11y,
  tone = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = pathname || `/${locale}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    if (typeof window === "undefined") return;

    const targetPath = `${switchLocalePath(window.location.pathname, target)}${window.location.search}${window.location.hash}`;
    const href = event.currentTarget.getAttribute("href");

    if (targetPath !== href) {
      event.preventDefault();
      router.push(targetPath);
    }
  };

  return (
    <nav aria-label={a11y.languageSwitcher}>
      <ul className="flex items-center gap-1">
        {locales.map((target) => {
          const active = target === locale;
          const label =
            target === "es" ? a11y.switchToSpanish : a11y.switchToEnglish;

          return (
            <li key={target}>
              <Link
                href={switchLocalePath(currentPath, target)}
                hrefLang={target}
                lang={target}
                aria-label={`${target.toUpperCase()} — ${label}`}
                aria-current={active ? "page" : undefined}
                onClick={(event) => handleClick(event, target)}
                className={[
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2.5 text-[0.7rem] font-semibold tracking-[0.18em] transition-colors",
                  active
                    ? "bg-blue text-cream"
                    : tone === "light"
                      ? "text-cream hover:bg-cream/15"
                      : "text-blue hover:bg-blue/10",
                ].join(" ")}
              >
                {target.toUpperCase()}
                <span className="sr-only"> · {label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
