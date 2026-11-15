import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/constants";
import { PageHeader } from "@/components/ui/PageHeader";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm } from "@/components/sections/ContactForm";
import { DonateBanner } from "@/components/sections/DonateBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    title: `${dict.contact.eyebrow} — Munay`,
    description: dict.contact.intro,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        es: "/es/contact",
        en: "/en/contact",
        "x-default": "/es/contact",
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
      <PageHeader
        titleId="contact-title"
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        intro={dict.contact.intro}
      />

      <section
        aria-labelledby="contact-form-title"
        className="bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 xl:px-16">
          <div className="lg:col-span-7">
            <ContactForm dict={dict.contact} />
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-[2rem] border border-blue/20 bg-blue p-7 text-cream sm:p-9 lg:sticky lg:top-28">
              <p className="eyebrow text-cream/85">
                {dict.contact.directTitle}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-none text-cream">
                {dict.contact.directTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/90">
                {dict.contact.directBody}
              </p>

              <ul className="mt-8 space-y-5">
                <li>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream/80">
                    {dict.contact.emailLabel}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 inline-flex min-h-6 items-center break-all text-base text-cream underline underline-offset-4 hover:decoration-2"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream/80">
                    {dict.footer.followLabel}
                  </p>
                  <SocialLinks
                    labels={{
                      instagram: dict.footer.instagramLabel,
                      facebook: dict.footer.facebookLabel,
                      linkedin: dict.footer.linkedinLabel,
                    }}
                    a11y={dict.a11y}
                    showLabels
                    tone="light"
                    className="mt-3"
                  />
                </li>
              </ul>

              <p className="mt-8 inline-flex items-center rounded-full bg-yellow px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-blue">
                {dict.footer.nonprofit}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <DonateBanner dict={dict.home.donate} a11y={dict.a11y} />
    </main>
  );
}
