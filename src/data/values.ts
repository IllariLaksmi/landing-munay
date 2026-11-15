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
 * The eight values that guide Munay's work. Copy is taken from the
 * organization's content document; order mirrors that document.
 */
export const values: ValueItem[] = [
  {
    id: "sacred-reciprocity",
    number: "01",
    name: { en: "Sacred Reciprocity", es: "Reciprocidad sagrada" },
    description: {
      en: "We honor reciprocity as the foundation of all healing. Our spaces, physical, emotional, and energetic, are held with intention, consent, and deep respect for earth and community, allowing participants to retreat, breathe, and reconnect without fear or judgment.",
      es: "Honramos la reciprocidad como el fundamento de toda sanación. Nuestros espacios —físicos, emocionales y energéticos— se sostienen con intención, consentimiento y un profundo respeto por la tierra y la comunidad, permitiendo que las participantes se retiren, respiren y reconecten sin miedo ni juicio.",
    },
  },
  {
    id: "embodied-reconnection",
    number: "02",
    name: { en: "Embodied Reconnection", es: "Reconexión encarnada" },
    description: {
      en: "We believe healing encompasses the reconnection with the body. Through Andean healing and holistic practices, we support individuals in rebuilding their relationship with their bodies, restoring trust in their inner wisdom, and soothing the parts of themselves that trauma has silenced.",
      es: "Creemos que la sanación abarca la reconexión con el cuerpo. A través de la sanación andina y las prácticas holísticas, acompañamos a las personas a reconstruir su relación con el cuerpo, restaurar la confianza en su sabiduría interior y calmar las partes de sí mismas que el trauma ha silenciado.",
    },
  },
  {
    id: "compassion",
    number: "03",
    name: { en: "Compassion", es: "Compasión" },
    description: {
      en: "We meet every person with gentleness, patience, and understanding. Our work is grounded in a deep understanding of principles that honor each survivor's pace, story, and lived experience, especially those from underserved and marginalized communities.",
      es: "Recibimos a cada persona con gentileza, paciencia y comprensión. Nuestro trabajo se fundamenta en una comprensión profunda de principios que honran el ritmo, la historia y la experiencia vivida de cada sobreviviente, especialmente de quienes provienen de comunidades desatendidas y marginadas.",
    },
  },
  {
    id: "holistic-ancestral-wisdom",
    number: "04",
    name: {
      en: "Holistic & Ancestral Wisdom",
      es: "Sabiduría holística y ancestral",
    },
    description: {
      en: "We integrate mind, body, soul, and energy in our approach to healing. Drawing from Andean traditions and other holistic modalities, we recognize that transformation can be created in community spaces through a spiritual and embodied perspective.",
      es: "Integramos mente, cuerpo, alma y energía en nuestro enfoque de sanación. Inspirándonos en las tradiciones andinas y otras modalidades holísticas, reconocemos que la transformación puede generarse en espacios comunitarios desde una perspectiva espiritual y encarnada.",
    },
  },
  {
    id: "equity-access",
    number: "05",
    name: { en: "Equity & Access", es: "Equidad y acceso" },
    description: {
      en: "We are committed to making healing accessible to those who have historically been excluded from safe, affirming, and culturally grounded spaces. Our work centers the voices and needs of underserved populations.",
      es: "Nos comprometemos a hacer accesible la sanación a quienes históricamente han sido excluidas de espacios seguros, afirmativos y culturalmente arraigados. Nuestro trabajo centra las voces y necesidades de las poblaciones desatendidas.",
    },
  },
  {
    id: "community-connection",
    number: "06",
    name: { en: "Community & Connection", es: "Comunidad y conexión" },
    description: {
      en: "Healing in community is the way our ancestors did it. We cultivate community spaces where survivors can build supportive relationships, reconnect with others, and experience belonging as part of their healing journey.",
      es: "La sanación en comunidad es la forma en que lo hacían nuestros ancestros. Cultivamos espacios comunitarios donde las sobrevivientes pueden construir relaciones de apoyo, reconectar con otras personas y experimentar la pertenencia como parte de su proceso de sanación.",
    },
  },
  {
    id: "transformation-liberation",
    number: "07",
    name: {
      en: "Transformation & Liberation",
      es: "Transformación y liberación",
    },
    description: {
      en: "We believe in the possibility of profound change. Our work supports individuals in releasing what no longer serves them, reclaiming their power, and stepping into a life rooted in reconnection and liberation.",
      es: "Creemos en la posibilidad de un cambio profundo. Nuestro trabajo acompaña a las personas a soltar lo que ya no les sirve, recuperar su poder y avanzar hacia una vida arraigada en la reconexión y la liberación.",
    },
  },
  {
    id: "reverence-pachamama",
    number: "08",
    name: { en: "Reverence for Pachamama", es: "Reverencia por la Pachamama" },
    description: {
      en: "We honor the earth as a teacher and healer. Our practices are grounded in reciprocity, gratitude, and the understanding that healing ourselves is inseparable from healing our relationship with the natural world.",
      es: "Honramos la tierra como maestra y sanadora. Nuestras prácticas se fundamentan en la reciprocidad, la gratitud y la comprensión de que sanarnos a nosotras mismas es inseparable de sanar nuestra relación con el mundo natural.",
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
