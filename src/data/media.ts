export interface EditorialImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Editorial imagery now comes from the brand library. Team portraits are
 * intentionally excluded: they render as branded placeholders until the real
 * photos are available.
 */
export const media = {
  hero: {
    src: "/brand/hero-inclusive-spaces.png",
    width: 1400,
    height: 1400,
  },
} satisfies Record<string, EditorialImage>;
