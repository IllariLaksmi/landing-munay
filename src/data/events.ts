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

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const events: EventItem[] = [
  {
    id: "zumbathon",
    name: { en: "Zumbathon", es: "Zumbatón" },
    status: "date-tbd",
    location: {
      en: "Community location to be announced",
      es: "Lugar comunitario por anunciar",
    },
    description: {
      en: "Our first community gathering: a joyful, all-levels dance session that celebrates movement as a path to healing. No experience needed — only comfortable clothes, water and the willingness to move at your own rhythm. Every step helps us create safe spaces for healing and sexual education.",
      es: "Nuestro primer encuentro comunitario: una sesión de baile alegre y para todos los niveles que celebra el movimiento como camino de sanación. No necesitas experiencia, solo ropa cómoda, agua y las ganas de moverte a tu propio ritmo. Cada paso nos ayuda a crear espacios seguros para la sanación y la educación sexual.",
    },
    image: {
      src: unsplash("photo-1524594152303-9fd13543fe6e"),
      alt: {
        en: "A diverse group of people dancing together in a bright community space.",
        es: "Un grupo diverso de personas bailando juntas en un espacio comunitario luminoso.",
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
