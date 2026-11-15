import type { Locale } from "@/lib/i18n";
import type { LocalizedText } from "@/data/values";

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  /** Portraits are intentionally absent until the real team photos arrive. */
  photoStatus: "pending";
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
      en: "Dr. Estefanía Simich Muñoz has worked across national and international communities to advocate for a sex positive approach to sexuality education and sexual healing following severe trauma. Her dedication to supporting others also shapes her community-based work, teaching, and research on the intersection of migration and sexuality.",
      es: "La Dra. Estefanía Simich Muñoz ha trabajado con comunidades nacionales e internacionales para abogar por un enfoque sexo positivo de la educación sexual y la sanación sexual tras trauma severo. Su dedicación a apoyar a otras personas también da forma a su trabajo comunitario, la enseñanza y la investigación sobre la intersección entre migración y sexualidad.",
    },
    photoStatus: "pending",
  },
  {
    id: "ivy-rueda",
    name: "Ivy Rueda",
    role: {
      en: "Operations · Yoga RYT-200 · Reiki Master & Intuitive Reader",
      es: "Operaciones · Yoga RYT-200 · Maestra de Reiki y lectora intuitiva",
    },
    bio: {
      en: "Ivy currently serves as Vice President of Operations for Pachamama Retreat, Training and Healing Center, where she brings more than 15 years of experience in the corporate world working with Fortune-ranked clients at a global top-tier communications agency. In this prior role, she honed leadership skills, strategic thinking, and the ability to navigate complex challenges. However, after years of working in high-pressure environments, Ivy felt a calling to explore a more meaningful and balanced path. In this spiritual journey, she has lived life-changing experiences such as Andean energy medicine and shamanism in Peru (her second home), plant medicine in Colombia (where she was born) and sacred cacao from Guatemala.\n\nIvy is a Registered Yoga Teacher (RYT) with a 200-hour certification. She is also trained in the Usui Shiki Ryoho lineage as a Reiki Master and is an intuitive Tarot reader – a gift passed down from her maternal lineage.",
      es: "Actualmente, Ivy se desempeña como Vicepresidenta de Operaciones de Pachamama Retreat, Training and Healing Center, donde aporta más de 15 años de experiencia en el mundo corporativo trabajando con clientes del ranking Fortune en una agencia de comunicaciones líder a nivel global. En ese rol previo perfeccionó habilidades de liderazgo, pensamiento estratégico y la capacidad de navegar desafíos complejos. Sin embargo, tras años en entornos de alta presión, Ivy sintió el llamado a explorar un camino más significativo y equilibrado. En este viaje espiritual ha vivido experiencias transformadoras como la medicina energética andina y el chamanismo en Perú (su segundo hogar), la medicina de plantas en Colombia (donde nació) y el cacao sagrado de Guatemala.\n\nIvy es profesora de yoga registrada (RYT) con certificación de 200 horas. También está formada en el linaje Usui Shiki Ryoho como maestra de Reiki y es lectora intuitiva de Tarot, un don heredado de su linaje materno.",
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
