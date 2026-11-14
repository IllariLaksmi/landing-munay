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
    src: "/brand/hero-community.jpg",
    width: 1040,
    height: 1081,
  },
} satisfies Record<string, EditorialImage>;
