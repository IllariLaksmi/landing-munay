import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  navHref,
} from "@/lib/constants";
import { Cantuta, LeafBranch } from "@/components/ui/BrandShapes";
import { DonateButton } from "@/components/ui/DonateButton";
import { SubscribeForm } from "@/components/sections/SubscribeForm";

interface FooterProps {
  footer: Dictionary["footer"];
  subscribe: Dictionary["subscribe"];
  a11y: Dictionary["a11y"];
  nav: Dictionary["nav"];
  locale: Locale;
}

export function Footer({ footer, subscribe, a11y, nav, locale }: FooterProps) {
  return (
    <footer className="surface-blue relative overflow-hidden bg-blue text-cream">
      <Cantuta
        tone="pink"
        className="absolute -bottom-12 right-4 h-56 w-auto opacity-20"
      />
      <LeafBranch
        tone="green"
        className="absolute -left-10 top-10 h-24 w-auto rotate-12 opacity-20"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href={`/${locale}`}
              className="inline-flex min-h-11 items-center rounded-sm"
            >
              <Image
                src="/brand/munay-logo-cream.png"
                alt={`${nav.brand} — ${footer.tagline}`}
                width={1711}
                height={620}
                className="h-auto w-full max-w-[15rem]"
              />
            </Link>

            <p className="mt-6 inline-flex items-center rounded-full bg-yellow px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-blue">
              {footer.nonprofit}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/85">
              {footer.madeWith}
            </p>
            <div className="mt-7">
              <DonateButton
                label={footer.donate}
                a11y={a11y}
                variant="accent"
              />
            </div>
          </div>

          <nav aria-label={footer.exploreLabel} className="lg:col-span-2">
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream/85">
              {footer.exploreLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.links.map((link) => (
                <li key={link.path || "home"}>
                  <Link
                    href={navHref(locale, link.path)}
                    className="inline-flex min-h-6 items-center text-sm text-cream underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream/85">
              {footer.contactLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex min-h-6 items-center break-all text-sm text-cream underline-offset-4 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${footer.instagramLabel}: ${INSTAGRAM_HANDLE}. ${a11y.externalLink}`}
                  className="inline-flex min-h-6 items-center gap-2 text-sm text-cream underline-offset-4 hover:underline"
                >
                  {INSTAGRAM_HANDLE}
                  <span aria-hidden="true" className="text-base">
                    ↗
                  </span>
                  <span className="sr-only">({a11y.externalLink})</span>
                </a>
              </li>
            </ul>

            <h2 className="mt-9 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream/85">
              {footer.legalLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href={`/${locale}/legal#privacidad`}
                  className="inline-flex min-h-6 items-center text-sm text-cream underline-offset-4 hover:underline"
                >
                  {footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal#terminos`}
                  className="inline-flex min-h-6 items-center text-sm text-cream underline-offset-4 hover:underline"
                >
                  {footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal#cookies`}
                  className="inline-flex min-h-6 items-center text-sm text-cream underline-offset-4 hover:underline"
                >
                  {footer.cookies}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl leading-none text-cream">
              {subscribe.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/85">
              {subscribe.body}
            </p>
            <div className="mt-6">
              <SubscribeForm
                dict={subscribe}
                tone="light"
                idPrefix="footer"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/25 pt-6 text-[0.68rem] text-cream/85 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <a
            href="#main-content"
            className="inline-flex min-h-6 items-center underline-offset-4 hover:underline"
          >
            {a11y.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
