import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { ValuesList } from "@/components/sections/ValuesList";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { BoardList } from "@/components/sections/BoardList";
import { DonateBanner } from "@/components/sections/DonateBanner";
import { Cloud, LeafBranch } from "@/components/ui/BrandShapes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    title: `${dict.about.eyebrow} — Munay`,
    description: dict.about.intro,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        es: "/es/about",
        en: "/en/about",
        "x-default": "/es/about",
      },
    },
  };
}

export default async function AboutPage({
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
        titleId="about-title"
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        intro={dict.about.intro}
      />

      <section
        aria-labelledby="mission-title"
        className="relative overflow-hidden bg-cream py-20 sm:py-24 lg:py-28"
      >
        <Cloud
          tone="purple"
          className="absolute right-[10%] top-16 h-14 w-auto opacity-25"
        />
        <LeafBranch
          tone="green"
          className="absolute -left-10 bottom-10 h-20 w-auto rotate-12 opacity-25"
        />
        <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 xl:px-16">
          <article className="lg:col-span-6">
            <span className="sticker bg-yellow text-blue">01</span>
            <h2
              id="mission-title"
              className="mt-4 font-display text-5xl leading-[0.88] text-blue sm:text-6xl lg:text-7xl"
            >
              {dict.about.missionTitle}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-[1.85] text-blue">
              {dict.about.missionBody.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </article>

          <article className="lg:col-span-6 lg:border-l lg:border-blue/20 lg:pl-16">
            <span className="sticker bg-blue text-cream">02</span>
            <h2
              id="vision-title"
              className="mt-4 font-display text-5xl leading-[0.88] text-blue sm:text-6xl lg:text-7xl"
            >
              {dict.about.visionTitle}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-[1.85] text-blue">
              {dict.about.visionBody.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <ValuesList dict={dict.about} locale={locale} />
      <TeamGrid dict={dict.about} locale={locale} />
      <BoardList dict={dict.about} locale={locale} />
      <DonateBanner dict={dict.home.donate} a11y={dict.a11y} />
    </main>
  );
}
