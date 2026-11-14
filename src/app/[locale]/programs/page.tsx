import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import {
  getIndividualServices,
  getWorkshopTopics,
} from "@/data/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { IndividualServicesTabs } from "@/components/sections/IndividualServicesTabs";
import { DonateBanner } from "@/components/sections/DonateBanner";
import { Cantuta, Cloud, LeafBranch } from "@/components/ui/BrandShapes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    title: `${dict.programs.eyebrow} — Munay`,
    description: dict.programs.intro,
    alternates: {
      canonical: `/${locale}/programs`,
      languages: {
        es: "/es/programs",
        en: "/en/programs",
        "x-default": "/es/programs",
      },
    },
  };
}

const principleAccents = ["bg-yellow", "bg-pink", "bg-green"] as const;

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const groups = getIndividualServices(locale);
  const topics = getWorkshopTopics(locale);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
      <PageHeader
        titleId="programs-title"
        eyebrow={dict.programs.eyebrow}
        title={dict.programs.title}
        intro={dict.programs.intro}
      />

      <section
        aria-labelledby="principles-title"
        className="surface-blue relative overflow-hidden bg-blue py-20 text-cream sm:py-24"
      >
        <Cantuta
          tone="pink"
          className="absolute -right-10 top-10 h-40 w-auto rotate-12 opacity-30"
        />
        <LeafBranch
          tone="green"
          className="absolute -left-8 bottom-0 h-24 w-auto opacity-30"
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <h2
            id="principles-title"
            className="font-display text-5xl leading-[0.9] text-cream sm:text-6xl lg:text-7xl"
          >
            {dict.programs.principlesTitle}
          </h2>

          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {dict.programs.principles.map((principle, index) => (
              <li
                key={principle.title}
                className="rounded-[1.75rem] bg-cream p-6 text-blue shadow-soft sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <p className="sticker bg-blue text-cream">0{index + 1}</p>
                  <span
                    aria-hidden="true"
                    className={`h-4 w-4 rounded-full ${principleAccents[index]}`}
                  />
                </div>
                <h3 className="mt-6 font-display text-3xl leading-[0.95] text-blue">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-blue/90">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="workshops-title"
        className="relative overflow-hidden border-t border-blue/15 bg-cream py-20 sm:py-24"
      >
        <Cantuta
          tone="green"
          className="absolute -right-10 top-10 h-44 w-auto rotate-12 opacity-20"
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="eyebrow text-blue/80">
                {dict.programs.eyebrow}
              </p>
              <h2
                id="workshops-title"
                className="mt-4 font-display text-5xl leading-[0.9] text-blue sm:text-6xl lg:text-7xl"
              >
                {dict.programs.workshopsTitle}
              </h2>
            </div>
            <p className="pretty max-w-xl text-base leading-relaxed text-blue sm:text-lg lg:col-span-6 lg:justify-self-end">
              {dict.programs.workshopsIntro}
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-blue/20 bg-blue/20 sm:grid-cols-2">
            {topics.map((topic) => (
              <li key={topic.id} className="bg-cream p-6 sm:p-8">
                <h3 className="font-display text-3xl leading-[0.95] text-blue">
                  {topic.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-blue">
                  {topic.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="individual-title"
        className="border-t border-blue/15 bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="eyebrow text-blue/80">
                {dict.programs.eyebrow}
              </p>
              <h2
                id="individual-title"
                className="mt-4 font-display text-5xl leading-[0.9] text-blue sm:text-6xl lg:text-7xl"
              >
                {dict.programs.individualTitle}
              </h2>
            </div>
            <p className="pretty max-w-xl text-base leading-relaxed text-blue sm:text-lg lg:col-span-6 lg:justify-self-end">
              {dict.programs.individualIntro}
            </p>
          </div>

          <div className="mt-10">
            <IndividualServicesTabs
              groups={groups}
              label={dict.programs.tabListLabel}
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="retreats-title"
        className="surface-blue relative overflow-hidden border-t border-blue/15 bg-blue py-20 text-cream sm:py-24"
      >
        <Cloud
          tone="yellow"
          className="absolute right-[8%] top-12 h-12 w-auto opacity-80"
        />
        <LeafBranch
          tone="green"
          className="absolute -right-10 bottom-0 h-28 w-auto rotate-180 opacity-35"
        />
        <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 xl:px-16">
          <div className="lg:col-span-6">
            <p className="eyebrow text-cream/85">{dict.programs.eyebrow}</p>
            <h2
              id="retreats-title"
              className="mt-4 font-display text-5xl leading-[0.9] text-cream sm:text-6xl lg:text-7xl"
            >
              {dict.programs.retreatsTitle}
            </h2>
            <p className="pretty mt-5 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
              {dict.programs.retreatsIntro}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="space-y-4 text-sm leading-relaxed text-cream/90 sm:text-base">
              {dict.programs.retreatsBody.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <Link
              href={`/${locale}/contact`}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-yellow px-7 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-blue transition-colors hover:bg-cream"
            >
              {dict.programs.retreatsCta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <DonateBanner dict={dict.home.donate} a11y={dict.a11y} />
    </main>
  );
}
