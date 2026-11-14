import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { HomeHero } from "@/components/sections/HomeHero";
import { OurStory } from "@/components/sections/OurStory";
import { ProgramsOverview } from "@/components/sections/ProgramsOverview";
import { NextEvent } from "@/components/sections/NextEvent";
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
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
      <HomeHero hero={dict.hero} a11y={dict.a11y} locale={locale} />
      <OurStory dict={dict.home.story} locale={locale} />
      <ProgramsOverview
        dict={dict.home.programs}
        programs={dict.programs}
        locale={locale}
      />
      <NextEvent
        dict={dict.home.event}
        calendar={dict.calendar}
        subscribe={dict.subscribe}
        locale={locale}
      />
      <DonateBanner dict={dict.home.donate} a11y={dict.a11y} />
    </main>
  );
}
