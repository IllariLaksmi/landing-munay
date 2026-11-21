import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { getEvents } from "@/data/events";
import { PageHeader } from "@/components/ui/PageHeader";
import { EventList } from "@/components/sections/EventList";
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
    title: `${dict.calendar.eyebrow} — Munay`,
    description: dict.calendar.intro,
    alternates: {
      canonical: `/${locale}/calendar`,
      languages: {
        es: "/es/calendar",
        en: "/en/calendar",
        "x-default": "/es/calendar",
      },
    },
  };
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const events = getEvents(locale);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
      <PageHeader
        titleId="calendar-title"
        eyebrow={dict.calendar.eyebrow}
        title={dict.calendar.title}
        intro={dict.calendar.intro}
      />
      <EventList
        events={events}
        calendar={dict.calendar}
        subscribe={dict.subscribe}
        a11y={dict.a11y}
      />
      <DonateBanner dict={dict.home.donate} a11y={dict.a11y} />
    </main>
  );
}
