"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/types/dictionary";
import { formatTemplate, type Locale } from "@/lib/i18n";
import { navHref } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { DonateButton } from "@/components/ui/DonateButton";

interface NavbarProps {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
}

type NavLink = Dictionary["nav"]["links"][number];

export function Navbar({ locale, nav, a11y }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  const groupKey = (link: NavLink) => link.path || "home";

  useEffect(() => {
    const nav = desktopNavRef.current;
    if (!nav) return;

    const groupOf = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest<HTMLElement>("[data-nav-group]")
        : null;

    const onPointerOver = (event: PointerEvent) => {
      const group = groupOf(event.target)?.dataset.navGroup;
      if (group) setDesktopOpen(group);
    };

    const onPointerOut = (event: PointerEvent) => {
      const group = groupOf(event.target)?.dataset.navGroup;
      if (!group) return;

      const next = event.relatedTarget;
      if (next instanceof Node && groupOf(next)?.dataset.navGroup === group) {
        return;
      }

      setDesktopOpen((current) => (current === group ? null : current));
    };

    const onFocusIn = (event: FocusEvent) => {
      const group = groupOf(event.target)?.dataset.navGroup;
      if (group) setDesktopOpen(group);
    };

    const onFocusOut = (event: FocusEvent) => {
      const group = groupOf(event.target)?.dataset.navGroup;
      if (!group) return;

      if (
        event.relatedTarget instanceof Node &&
        groupOf(event.relatedTarget)?.dataset.navGroup === group
      ) {
        return;
      }

      setDesktopOpen((current) => (current === group ? null : current));
    };

    nav.addEventListener("pointerover", onPointerOver);
    nav.addEventListener("pointerout", onPointerOut);
    nav.addEventListener("focusin", onFocusIn);
    nav.addEventListener("focusout", onFocusOut);

    return () => {
      nav.removeEventListener("pointerover", onPointerOver);
      nav.removeEventListener("pointerout", onPointerOut);
      nav.removeEventListener("focusin", onFocusIn);
      nav.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (desktopOpen) {
        desktopNavRef.current
          ?.querySelector<HTMLButtonElement>(
            `[data-submenu-trigger="desktop-${desktopOpen}"]`,
          )
          ?.focus();
        setDesktopOpen(null);
      }

      if (mobileOpen) {
        document
          .querySelector<HTMLButtonElement>(
            `[data-submenu-trigger="mobile-${mobileOpen}"]`,
          )
          ?.focus();
        setMobileOpen(null);
      }

      setMenuOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        desktopOpen &&
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setDesktopOpen(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [desktopOpen, mobileOpen]);

  const isActive = (path: string) =>
    path === ""
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname?.startsWith(`/${locale}${path}`);

  const closeAll = () => {
    setMenuOpen(false);
    setDesktopOpen(null);
    setMobileOpen(null);
  };

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
          onClick={closeAll}
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

        <nav
          ref={desktopNavRef}
          aria-label={a11y.mainNav}
          className="hidden xl:block"
        >
          <ul className="flex items-center gap-4 2xl:gap-6">
            {nav.links.map((link) => {
              const key = groupKey(link);
              const active = isActive(link.path);
              const hasChildren = link.children.length > 0;
              const open = hasChildren && desktopOpen === key;
              const submenuId = `desktop-submenu-${key}`;

              return (
                <li
                  key={key}
                  className="relative"
                  data-nav-group={hasChildren ? key : undefined}
                >
                  <div className="relative">
                    <div className="flex items-center">
                      <Link
                        href={navHref(locale, link.path)}
                        onClick={closeAll}
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

                      {hasChildren ? (
                        <button
                          type="button"
                          data-submenu-trigger={`desktop-${key}`}
                          aria-expanded={open}
                          aria-controls={submenuId}
                          aria-label={formatTemplate(
                            open ? a11y.hideSubmenu : a11y.showSubmenu,
                            { label: link.label },
                          )}
                          onClick={() => setDesktopOpen(open ? null : key)}
                          className="ml-1 inline-flex h-11 w-6 items-center justify-center rounded-sm text-blue/70 transition-colors hover:text-blue focus-visible:text-blue"
                        >
                          <span
                            aria-hidden="true"
                            className={[
                              "text-[0.6rem] transition-transform duration-200",
                              open ? "rotate-180" : "",
                            ].join(" ")}
                          >
                            ▾
                          </span>
                        </button>
                      ) : null}
                    </div>

                    {open ? (
                      <div className="absolute left-0 top-full pt-1">
                        <ul
                          id={submenuId}
                          className="min-w-60 rounded-2xl border border-blue/15 bg-cream p-2 shadow-soft"
                        >
                          {link.children.map((child) => (
                            <li key={child.hash}>
                              <Link
                                href={navHref(locale, child.path, child.hash)}
                                onClick={closeAll}
                                className="flex min-h-10 items-center rounded-xl px-3 text-sm text-blue transition-colors hover:bg-blue/10 focus-visible:bg-blue/10"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
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
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-blue/20 bg-cream text-blue xl:hidden"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8">
            <nav aria-label={a11y.mobileNav}>
              <ul className="flex flex-col">
                {nav.links.map((link) => {
                  const key = groupKey(link);
                  const active = isActive(link.path);
                  const hasChildren = link.children.length > 0;
                  const open = hasChildren && mobileOpen === key;
                  const submenuId = `mobile-submenu-${key}`;

                  return (
                    <li
                      key={key}
                      className="border-b border-blue/15"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={navHref(locale, link.path)}
                          onClick={closeAll}
                          aria-current={active ? "page" : undefined}
                          className="flex min-h-14 flex-1 items-center justify-between font-display text-3xl text-blue"
                        >
                          {link.label}
                          {active ? (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-green"
                            />
                          ) : null}
                        </Link>

                        {hasChildren ? (
                          <button
                            type="button"
                            data-submenu-trigger={`mobile-${key}`}
                            aria-expanded={open}
                            aria-controls={submenuId}
                            aria-label={formatTemplate(
                              open ? a11y.hideSubmenu : a11y.showSubmenu,
                              { label: link.label },
                            )}
                            onClick={() => setMobileOpen(open ? null : key)}
                            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-blue"
                          >
                            <span
                              aria-hidden="true"
                              className={[
                                "text-sm transition-transform duration-200",
                                open ? "rotate-180" : "",
                              ].join(" ")}
                            >
                              ▾
                            </span>
                          </button>
                        ) : null}
                      </div>

                      {open ? (
                        <ul id={submenuId} className="pb-4 pl-4">
                          {link.children.map((child) => (
                            <li key={child.hash}>
                              <Link
                                href={navHref(locale, child.path, child.hash)}
                                onClick={closeAll}
                                className="flex min-h-11 items-center text-lg text-blue/90"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
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
