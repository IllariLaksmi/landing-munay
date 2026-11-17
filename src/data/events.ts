import type { Locale } from "@/lib/i18n";
import type { LocalizedText } from "@/data/values";

export type EventStatus = "date-tbd" | "scheduled";

export interface EventItem {
  id: string;
  name: LocalizedText;
  status: EventStatus;
  /** ISO date, only present when the status is `scheduled`. */
  date?: string;
  location: LocalizedText;
  description: LocalizedText;
  image: {
    src: string;
    alt: LocalizedText;
  };
  /** Optional link for registration or details. */
  href?: string;
}

export const events: EventItem[] = [
  {
    id: "zumbathon",
    name: { en: "Zumbathon", es: "Zumbatón" },
    status: "date-tbd",
    location: {
      en: "Location to be announced",
      es: "Lugar por anunciar",
    },
    description: {
      en: "Our first community event. The date is still to be confirmed.",
      es: "Nuestro primer evento comunitario. La fecha aún está por confirmar.",
    },
    image: {
      src: "/brand/event-zumbathon-inclusive.jpg",
      alt: {
        en: "A group doing Zumba outdoors, including a person dancing in a wheelchair.",
        es: "Un grupo haciendo zumba al aire libre, incluida una persona bailando en silla de ruedas.",
      },
    },
  },
];

export type LocalizedEvent = {
  id: string;
  name: string;
  status: EventStatus;
  date?: string;
  location: string;
  description: string;
  image: { src: string; alt: string };
  href?: string;
};

export function getEvents(locale: Locale): LocalizedEvent[] {
  return events.map((event) => ({
    id: event.id,
    name: event.name[locale],
    status: event.status,
    date: event.date,
    location: event.location[locale],
    description: event.description[locale],
    image: { src: event.image.src, alt: event.image.alt[locale] },
    href: event.href,
  }));
}

export function getNextEvent(locale: Locale) {
  return getEvents(locale)[0] ?? null;
}
