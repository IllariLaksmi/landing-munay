import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { getNextEvent } from "@/data/events";
import { SubscribeForm } from "@/components/sections/SubscribeForm";
import { Cantuta, Cloud } from "@/components/ui/BrandShapes";

interface NextEventProps {
  dict: Dictionary["home"]["event"];
  calendar: Dictionary["calendar"];
  subscribe: Dictionary["subscribe"];
  locale: Locale;
}

export function NextEvent({ dict, calendar, subscribe, locale }: NextEventProps) {
  const event = getNextEvent(locale);

  if (!event) return null;

  const isTbd = event.status === "date-tbd";

  return (
    <section
      id="next-event"
      aria-labelledby="next-event-title"
      className="relative overflow-hidden border-t border-blue/15 bg-cream py-20 sm:py-24 lg:py-32"
    >
      <Cloud
        tone="green"
        className="absolute -right-8 top-10 h-14 w-auto opacity-30"
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-7">
            <p className="eyebrow text-blue/80">{dict.eyebrow}</p>
            <h2
              id="next-event-title"
              className="display-balance mt-5 font-display text-5xl leading-[0.9] text-blue sm:text-6xl lg:text-7xl"
            >
              {dict.title}
            </h2>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-blue/20 bg-cream">
              <div className="relative aspect-[16/9]">
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="sticker bg-yellow text-blue">
                    {isTbd ? calendar.statusTbd : calendar.statusScheduled}
                  </span>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-blue/80">
                    {event.location}
                  </span>
                </div>
                <p className="mt-5 text-base leading-relaxed text-blue">
                  {dict.body}
                </p>
                <Link
                  href={`/${locale}/calendar`}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue underline underline-offset-4 hover:decoration-2"
                >
                  {dict.link}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>

          <aside
            aria-labelledby="event-subscribe-title"
            className="lg:col-span-5 lg:pt-24"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-blue p-7 text-cream shadow-soft sm:p-9">
              <Cantuta
                tone="pink"
                className="absolute -right-8 -top-8 h-28 w-auto rotate-12 opacity-30"
              />
              <p className="eyebrow relative text-cream/85">{subscribe.eyebrow}</p>
              <h2
                id="event-subscribe-title"
                className="mt-4 font-display text-4xl leading-none text-cream sm:text-5xl"
              >
                {subscribe.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/90">
                {subscribe.body}
              </p>
              <div className="mt-7">
                <SubscribeForm
                  dict={subscribe}
                  tone="light"
                  idPrefix="next-event"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
