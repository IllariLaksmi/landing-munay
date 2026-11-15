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
      en: "Founder & Executive Director",
      es: "Fundadora y directora ejecutiva",
    },
    bio: {
      en: "Dr. Estefanía Simich Muñoz is a Peruvian educator, researcher and advocate for positive sexuality. Her work centers the intersection of migration and sexuality, and the ways displacement shapes intimacy, identity and belonging. After years of accompanying people who had no affordable, culturally rooted space to talk about their bodies, she founded Munay in 2026 to turn that gap into a place of care. Her practice is trauma-informed, community-led and deeply rooted in Andean reciprocity.",
      es: "La Dra. Estefanía Simich Muñoz es educadora, investigadora y defensora de la sexualidad positiva peruana. Su trabajo sitúa la intersección entre migración y sexualidad, y las formas en que el desplazamiento moldea la intimidad, la identidad y la pertenencia. Tras años acompañando a personas que no tenían un espacio accesible y culturalmente arraigado para hablar de sus cuerpos, fundó Munay en 2026 para convertir esa brecha en un lugar de cuidado. Su práctica está informada en el trauma, es liderada por la comunidad y está profundamente enraizada en la reciprocidad andina.",
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
      en: "Ivy Rueda holds Munay's operations with the same care she brings to the mat. A certified Yoga teacher (RYT-200), Reiki Master and intuitive reader, she blends grounding movement, energy work and practical organization. Her role is to make sure every gathering feels held: from the first email to the last cup of tea. She believes that care is in the details, and that a well-held space is itself a form of healing.",
      es: "Ivy Rueda sostiene las operaciones de Munay con el mismo cuidado que lleva a la esterilla. Profesora de Yoga certificada (RYT-200), maestra de Reiki y lectora intuitiva, combina movimiento enraizante, trabajo energético y organización práctica. Su rol es asegurar que cada encuentro se sienta sostenido: desde el primer correo hasta la última taza de té. Cree que el cuidado está en los detalles y que un espacio bien sostenido es, en sí mismo, una forma de sanación.",
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
