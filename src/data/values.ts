import type { Locale } from "@/lib/i18n";

export interface LocalizedText {
  en: string;
  es: string;
}

export interface ValueItem {
  id: string;
  number: string;
  name: LocalizedText;
  description: LocalizedText;
}

/**
 * The eight values that guide Munay's work. Order is intentional: it mirrors
 * the sequence used in the organization's founding documents.
 */
export const values: ValueItem[] = [
  {
    id: "sacred-reciprocity",
    number: "01",
    name: { en: "Sacred Reciprocity", es: "Reciprocidad sagrada" },
    description: {
      en: "We practice ayni: give and receive in balance. Every offering, from a workshop to a shared meal, is a relationship of mutual care rather than a transaction.",
      es: "Practicamos el ayni: dar y recibir en equilibrio. Cada ofrenda, desde un taller hasta una comida compartida, es una relación de cuidado mutuo y no una transacción.",
    },
  },
  {
    id: "embodied-reconnection",
    number: "02",
    name: { en: "Embodied Reconnection", es: "Reconexión encarnada" },
    description: {
      en: "The body is not an obstacle to healing; it is the place where healing happens. We listen to its rhythm, its limits and its wisdom with curiosity and consent.",
      es: "El cuerpo no es un obstáculo para la sanación; es el lugar donde la sanación ocurre. Escuchamos su ritmo, sus límites y su sabiduría con curiosidad y consentimiento.",
    },
  },
  {
    id: "compassion",
    number: "03",
    name: { en: "Compassion", es: "Compasión" },
    description: {
      en: "Compassion is a daily practice: meeting every person, including ourselves, without judgment and with the tenderness that survival sometimes makes hard to remember.",
      es: "La compasión es una práctica diaria: encontrarnos con cada persona, incluida nosotras mismas, sin juicio y con la ternura que a veces la supervivencia dificulta recordar.",
    },
  },
  {
    id: "holistic-ancestral-wisdom",
    number: "04",
    name: { en: "Holistic & Ancestral Wisdom", es: "Sabiduría holística y ancestral" },
    description: {
      en: "We honor the knowledge held by our lineages while integrating contemporary, trauma-informed approaches to mental, emotional, physical and spiritual wellbeing.",
      es: "Honramos el conocimiento que habita en nuestros linajes e integramos enfoques contemporáneos informados en el trauma para el bienestar mental, emocional, físico y espiritual.",
    },
  },
  {
    id: "equity-access",
    number: "05",
    name: { en: "Equity & Access", es: "Equidad y acceso" },
    description: {
      en: "Healing should not depend on a bank account. We design accessible services, sliding-scale options and partnerships so care reaches underserved communities.",
      es: "La sanación no debería depender de una cuenta bancaria. Diseñamos servicios accesibles, opciones de pago proporcional y alianzas para que el cuidado llegue a comunidades desatendidas.",
    },
  },
  {
    id: "community-connection",
    number: "06",
    name: { en: "Community & Connection", es: "Comunidad y conexión" },
    description: {
      en: "No one heals alone. We create small, intentional circles where stories can be witnessed, rest can be shared and belonging can be rebuilt.",
      es: "Nadie sana en soledad. Creamos círculos pequeños e intencionales donde las historias pueden ser testificadas, el descanso puede compartirse y la pertenencia puede reconstruirse.",
    },
  },
  {
    id: "transformation-liberation",
    number: "07",
    name: { en: "Transformation & Liberation", es: "Transformación y liberación" },
    description: {
      en: "We believe healing is also collective and political. As people reclaim their bodies and stories, they make room for a freer, safer world for everyone.",
      es: "Creemos que la sanación también es colectiva y política. Cuando las personas recuperan sus cuerpos e historias, abren espacio para un mundo más libre y seguro para todas.",
    },
  },
  {
    id: "reverence-pachamama",
    number: "08",
    name: { en: "Reverence for Pachamama", es: "Reverencia por la Pachamama" },
    description: {
      en: "The Earth is our first teacher and our shared home. We care for her through reciprocity, responsible practices and reverence for the places that hold us.",
      es: "La Tierra es nuestra primera maestra y nuestro hogar compartido. La cuidamos desde la reciprocidad, las prácticas responsables y la reverencia por los lugares que nos sostienen.",
    },
  },
];

export function getValues(locale: Locale) {
  return values.map((value) => ({
    id: value.id,
    number: value.number,
    name: value.name[locale],
    description: value.description[locale],
  }));
}
