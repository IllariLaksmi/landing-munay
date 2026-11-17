import type { Locale } from "@/lib/i18n";
import type { LocalizedText } from "@/data/values";

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  /** Portrait shown on the team grid and founder spotlight. */
  photo?: {
    src: string;
    width: number;
    height: number;
  };
  /** Kept for members whose real portrait is still pending. */
  photoStatus: "pending" | "ready";
  founder?: boolean;
}

export interface BoardMember {
  id: string;
  position: "chair" | "secretary" | "treasurer";
  positionLabel: LocalizedText;
  name: string;
  /** Board members are never rendered until their appointment is public. */
  published: boolean;
}

export const team: TeamMember[] = [
  {
    id: "estefania-simich-munoz",
    name: "Dr. Estefanía Simich Muñoz",
    founder: true,
    role: {
      en: "Founder",
      es: "Fundadora",
    },
    bio: {
      en: "Dr. Estefanía Simich Muñoz is a Peruvian psychotherapist, educator, researcher and advocate for sex positivity. Her work focuses on the intersection of trauma and sexuality, and the ways that geographical movement shapes the perception of intimacy, identity and belonging. After years of accompanying people with limited access to culturally rooted spaces to talk about their sexuality and experiences, she founded Munay in 2026 to turn that gap into a place of care. Her practice is trauma-informed, community-led and deeply rooted in the Andean principles of Ayni (reciprocity), Munay (unconditional love), Yachay (wisdom to learn from our experiences) and Llan’kay (our purpose in action). Connected with her roots she has been initiated and trained in the Q’ero tradition as a Paqo Ñusta in Andean healing modalities. Her commitment towards wellbeing and healing in community are the main motivators for holding the space that Munay can offer. Estefanía travels often to Peru and Egypt to connect with other healers and bring back ancestral medicine to the spaces she holds.\n\nEstefanía holds a PhD in Human Sexuality and is an AASECT Certified Sex Therapist and Supervisor, a Licensed Clinical Professional Counselor and Supervisor in Maryland, as well as a professor in Critical Studies of Human Sexuality.",
      es: "La Dra. Estefanía Simich Muñoz es psicoterapeuta, educadora, investigadora y defensora de la positividad sexual peruana. Su trabajo se centra en la intersección entre el trauma y la sexualidad, y en cómo el movimiento geográfico moldea la percepción de la intimidad, la identidad y la pertenencia. Tras años acompañando a personas con acceso limitado a espacios culturalmente arraigados para hablar de su sexualidad y sus experiencias, fundó Munay en 2026 para convertir esa brecha en un lugar de cuidado. Su práctica está informada en el trauma, es liderada por la comunidad y está profundamente arraigada en los principios andinos de Ayni (reciprocidad), Munay (amor incondicional), Yachay (sabiduría para aprender de nuestras experiencias) y Llan’kay (nuestro propósito en acción). Conectada con sus raíces, ha sido iniciada y formada en la tradición Q’ero como Paqo Ñusta en modalidades de sanación andina. Su compromiso con el bienestar y la sanación en comunidad son los principales motores para sostener el espacio que Munay puede ofrecer. Estefanía viaja con frecuencia a Perú y Egipto para conectar con otras sanadoras y llevar medicina ancestral a los espacios que sostiene.\n\nEstefanía tiene un doctorado en Sexualidad Humana y es Terapeuta Sexual Certificada y Supervisora por AASECT, Consejera Clínica Profesional Licenciada y Supervisora en Maryland, además de profesora de Estudios Críticos de la Sexualidad Humana.",
    },
    photo: {
      src: "/brand/team-estefania.jpg",
      width: 1280,
      height: 854,
    },
    photoStatus: "ready",
  },
  {
    id: "ivy-rueda-diederichs",
    name: "Ivy Rueda Diederichs",
    role: {
      en: "Operations Lead · Yoga RYT-500 · Reiki Practitioner & Intuitive Tarot Reader",
      es: "Líder de Operaciones · Yoga RYT-500 · Practicante de Reiki y lectora intuitiva de Tarot",
    },
    bio: {
      en: "Ivy currently serves as Operations Lead for Munay, where she brings more than 15 years of experience in the corporate world working with Fortune-ranked clients at a global, top-tier communications agency. In this prior role, she honed leadership skills, strategic thinking, and the ability to navigate complex challenges.\n\nAfter years of working in high-pressure environments, Ivy felt a calling to explore a more meaningful and balanced path. In this spiritual journey, she has lived life-changing experiences such as Andean energy medicine and shamanism in Peru (her second home), plant medicine in Colombia (where she was born) and sacred cacao from Guatemala.\n\nIvy is a Registered Yoga Teacher (RYT) with a 500-hour certification. She is also trained in the Usui Shiki Ryoho lineage as a Reiki Practitioner and is an intuitive Tarot reader – a gift passed down from her maternal lineage.",
      es: "Ivy es actualmente Líder de Operaciones de Munay, donde aporta más de 15 años de experiencia en el mundo corporativo trabajando con clientes del ranking Fortune en una agencia de comunicaciones líder a nivel global. En ese rol previo perfeccionó habilidades de liderazgo, pensamiento estratégico y la capacidad de navegar desafíos complejos.\n\nTras años en entornos de alta presión, Ivy sintió el llamado a explorar un camino más significativo y equilibrado. En este viaje espiritual ha vivido experiencias transformadoras como la medicina energética andina y el chamanismo en Perú (su segundo hogar), la medicina de plantas en Colombia (donde nació) y el cacao sagrado de Guatemala.\n\nIvy es profesora de yoga registrada (RYT) con certificación de 500 horas. También está formada en el linaje Usui Shiki Ryoho como practicante de Reiki y es lectora intuitiva de Tarot, un don heredado de su linaje materno.",
    },
    photo: {
      src: "/brand/team-ivy.jpg",
      width: 854,
      height: 1280,
    },
    photoStatus: "ready",
  },
  {
    id: "nia",
    name: "Nia",
    role: {
      en: "Team member",
      es: "Integrante del equipo",
    },
    bio: {
      en: "Bio coming soon.",
      es: "Biografía próximamente.",
    },
    photoStatus: "pending",
  },
];

/**
 * Board seats are published by role while the named appointments are pending.
 * `name` is intentionally empty: BoardList renders `boardPendingName` instead
 * of inventing a person. Replace `name` with the real appointee before launch.
 */
export const boardMembers: BoardMember[] = [
  {
    id: "chair",
    position: "chair",
    positionLabel: { en: "Chair", es: "Presidencia" },
    name: "",
    published: true,
  },
  {
    id: "secretary",
    position: "secretary",
    positionLabel: { en: "Secretary", es: "Secretaría" },
    name: "",
    published: true,
  },
  {
    id: "treasurer",
    position: "treasurer",
    positionLabel: { en: "Treasurer", es: "Tesorería" },
    name: "",
    published: true,
  },
];

export function getTeam(locale: Locale) {
  return team.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role[locale],
    bio: member.bio[locale],
    photo: member.photo,
    photoStatus: member.photoStatus,
    founder: member.founder ?? false,
  }));
}

export function getPublishedBoardMembers(locale: Locale) {
  return boardMembers
    .filter((member) => member.published)
    .map((member) => ({
      id: member.id,
      name: member.name.trim(),
      position: member.position,
      positionLabel: member.positionLabel[locale],
    }));
}
