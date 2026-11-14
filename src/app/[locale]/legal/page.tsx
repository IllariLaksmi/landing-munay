import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    title: dict.legal.metaTitle,
    description: dict.legal.metaDescription,
    alternates: {
      canonical: `/${locale}/legal`,
      languages: {
        es: "/es/legal",
        en: "/en/legal",
        "x-default": "/es/legal",
      },
    },
  };
}

export default async function LegalPage({
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
        titleId="legal-title"
        eyebrow={`${dict.legal.updatedLabel}: ${dict.legal.updated}`}
        title={dict.legal.title}
        intro={dict.legal.intro}
      />

      <div className="bg-cream py-16 sm:py-20">
        <article className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <div className="space-y-12">
            {dict.legal.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="border-t border-blue/20 pt-8"
              >
                <h2
                  id={`${section.id}-title`}
                  className="font-display text-3xl leading-none text-blue sm:text-4xl"
                >
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-blue sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Link
            href={`/${locale}`}
            className="mt-14 inline-flex min-h-11 items-center gap-2 rounded-full border border-blue px-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue transition-colors hover:bg-blue hover:text-cream"
          >
            <span aria-hidden="true">←</span>
            {dict.legal.back}
          </Link>
        </article>
      </div>
    </main>
  );
}
