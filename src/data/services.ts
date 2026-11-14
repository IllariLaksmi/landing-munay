import type { Locale } from "@/lib/i18n";
import type { LocalizedText } from "@/data/values";

export type ServiceGroupId = "mind" | "body" | "soul";

export interface ServiceItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
}

export interface ServiceGroup {
  id: ServiceGroupId;
  name: LocalizedText;
  summary: LocalizedText;
  services: ServiceItem[];
}

/** The three pillars of Munay's individual healing work. */
export const individualServices: ServiceGroup[] = [
  {
    id: "mind",
    name: { en: "Mind Healing", es: "Sanación de la mente" },
    summary: {
      en: "Space to name what happened, reconnect with your story and recover a sense of safety.",
      es: "Un espacio para nombrar lo ocurrido, reconectar con tu historia y recuperar una sensación de seguridad.",
    },
    services: [
      {
        id: "intuitive-sex-therapy",
        name: {
          en: "Intuitive Sex Therapy Individual",
          es: "Sexoterapia intuitiva individual",
        },
        description: {
          en: "A consent-led, trauma-informed space to explore desire, pleasure, boundaries and the messages you received about sexuality.",
          es: "Un espacio guiado por el consentimiento y el cuidado del trauma para explorar el deseo, el placer, los límites y los mensajes que recibiste sobre la sexualidad.",
        },
      },
      {
        id: "intuitive-talk-therapy",
        name: {
          en: "Intuitive Talk Therapy",
          es: "Terapia conversacional intuitiva",
        },
        description: {
          en: "Conversation that follows your pace. We make meaning together without diagnosing, rushing or forcing a narrative.",
          es: "Una conversación que sigue tu ritmo. Construimos sentido en conjunto, sin diagnosticar, apurar ni imponer un relato.",
        },
      },
    ],
  },
  {
    id: "body",
    name: { en: "Body Healing", es: "Sanación del cuerpo" },
    summary: {
      en: "Hands-on and movement-based care to release stored tension and return to the body.",
      es: "Cuidado manual y en movimiento para liberar tensión acumulada y volver al cuerpo.",
    },
    services: [
      {
        id: "acupuncture",
        name: { en: "Acupuncture", es: "Acupuntura" },
        description: {
          en: "A gentle, traditional practice that supports the nervous system, sleep, pain and emotional regulation.",
          es: "Una práctica tradicional y suave que acompaña al sistema nervioso, el sueño, el dolor y la regulación emocional.",
        },
      },
      {
        id: "pelvic-floor-therapy",
        name: {
          en: "Pelvic Floor Therapy",
          es: "Terapia del piso pélvico",
        },
        description: {
          en: "Trauma-informed, consent-based care for pelvic pain, tension and the deep connection between body and autonomy.",
          es: "Cuidado informado en el trauma y basado en el consentimiento para el dolor pélvico, la tensión y la conexión profunda entre cuerpo y autonomía.",
        },
      },
      {
        id: "massage",
        name: { en: "Massage", es: "Masaje" },
        description: {
          en: "Therapeutic touch at your chosen pressure, always with clear boundaries and ongoing consent.",
          es: "Toque terapéutico con la presión que elijas, siempre con límites claros y consentimiento continuo.",
        },
      },
      {
        id: "yoga",
        name: { en: "Yoga", es: "Yoga" },
        description: {
          en: "Accessible, choice-rich movement that invites breath, stability and rest rather than performance.",
          es: "Movimiento accesible y lleno de opciones que invita a la respiración, la estabilidad y el descanso, no al rendimiento.",
        },
      },
    ],
  },
  {
    id: "soul",
    name: { en: "Soul Healing", es: "Sanación del alma" },
    summary: {
      en: "Ancestral and energetic practices to remember connection, meaning and inner balance.",
      es: "Prácticas ancestrales y energéticas para recordar la conexión, el sentido y el equilibrio interior.",
    },
    services: [
      {
        id: "andean-energy-healing",
        name: {
          en: "Andean Energy Healing",
          es: "Sanación energética andina",
        },
        description: {
          en: "A gentle practice rooted in Andean reciprocity, inviting balance and a renewed relationship with the living world.",
          es: "Una práctica suave arraigada en la reciprocidad andina que invita al equilibrio y a una relación renovada con el mundo vivo.",
        },
      },
      {
        id: "reiki",
        name: { en: "Reiki", es: "Reiki" },
        description: {
          en: "Light-touch energy work to support relaxation, grounding and the body's own capacity to restore itself.",
          es: "Trabajo energético de toque ligero para acompañar la relajación, el enraizamiento y la capacidad natural del cuerpo de restaurarse.",
        },
      },
    ],
  },
];

export const workshopTopics: ServiceItem[] = [
  {
    id: "sexual-education",
    name: { en: "Positive sexual education", es: "Educación sexual positiva" },
    description: {
      en: "Consent, pleasure, anatomy, boundaries and communication, taught without shame and adapted to each community.",
      es: "Consentimiento, placer, anatomía, límites y comunicación, enseñados sin vergüenza y adaptados a cada comunidad.",
    },
  },
  {
    id: "trauma-informed-care",
    name: {
      en: "Trauma-informed care",
      es: "Cuidado informado en el trauma",
    },
    description: {
      en: "Practical tools to recognize triggers, regulate the nervous system and support survivors with dignity.",
      es: "Herramientas prácticas para reconocer detonantes, regular el sistema nervioso y acompañar a sobrevivientes con dignidad.",
    },
  },
  {
    id: "somatic-education",
    name: { en: "Somatic education", es: "Educación somática" },
    description: {
      en: "Breath, movement and body literacy as everyday resources for safety and self-trust.",
      es: "Respiración, movimiento y alfabetización corporal como recursos cotidianos para la seguridad y la confianza en una misma.",
    },
  },
  {
    id: "community-dialogue",
    name: { en: "Community dialogue", es: "Diálogo comunitario" },
    description: {
      en: "Facilitated circles where families, educators and neighbors can talk about sexuality and healing without fear.",
      es: "Círculos facilitados donde familias, educadores y vecinos pueden hablar de sexualidad y sanación sin miedo.",
    },
  },
];

export function getIndividualServices(locale: Locale) {
  return individualServices.map((group) => ({
    id: group.id,
    name: group.name[locale],
    summary: group.summary[locale],
    services: group.services.map((service) => ({
      id: service.id,
      name: service.name[locale],
      description: service.description[locale],
    })),
  }));
}

export function getWorkshopTopics(locale: Locale) {
  return workshopTopics.map((topic) => ({
    id: topic.id,
    name: topic.name[locale],
    description: topic.description[locale],
  }));
}
