"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { navHref } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { DonateButton } from "@/components/ui/DonateButton";

interface NavbarProps {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
}

export function Navbar({ locale, nav, a11y }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (path: string) =>
    path === ""
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname?.startsWith(`/${locale}${path}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-blue/20 bg-cream/95 text-blue backdrop-blur-md">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1">
        <span className="h-full flex-1 bg-blue" />
        <span className="h-full flex-1 bg-purple" />
        <span className="h-full flex-1 bg-pink" />
        <span className="h-full flex-1 bg-yellow" />
        <span className="h-full flex-1 bg-green" />
      </span>
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-24 lg:px-12 xl:px-16">
        <Link
          href={`/${locale}`}
          onClick={() => setMenuOpen(false)}
          className="inline-flex min-h-11 items-center rounded-sm"
        >
          <Image
            src="/brand/munay-logo-blue.png"
            alt={`${nav.brand} — ${nav.tagline}`}
            width={1711}
            height={620}
            priority
            className="h-11 w-auto sm:h-12 lg:h-14"
          />
        </Link>

        <nav aria-label={a11y.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-6 2xl:gap-8">
            {nav.links.map((link) => {
              const active = isActive(link.path);

              return (
                <li key={link.path || "home"}>
                  <Link
                    href={navHref(locale, link.path)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "inline-flex min-h-11 items-center border-b-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                      active
                        ? "border-current"
                        : "border-transparent hover:border-current",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} a11y={a11y} />
          </div>

          <DonateButton
            label={nav.donate}
            a11y={a11y}
            className="hidden md:inline-flex"
          />

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? a11y.closeMenu : a11y.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-blue/30 transition-colors hover:bg-blue/10 xl:hidden"
          >
            <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
              <span
                className={[
                  "h-px w-full bg-current transition-transform duration-200",
                  menuOpen ? "translate-y-[3.5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "h-px w-full bg-current transition-transform duration-200",
                  menuOpen ? "-translate-y-[3.5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-blue/20 bg-cream text-blue xl:hidden"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8">
            <nav aria-label={a11y.mobileNav}>
              <ul className="flex flex-col">
                {nav.links.map((link) => {
                  const active = isActive(link.path);

                  return (
                    <li
                      key={link.path || "home"}
                      className="border-b border-blue/15"
                    >
                      <Link
                        href={navHref(locale, link.path)}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex min-h-14 items-center justify-between font-display text-3xl text-blue"
                      >
                        {link.label}
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-green"
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <DonateButton label={nav.donate} a11y={a11y} />
              <LanguageSwitcher locale={locale} a11y={a11y} />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
