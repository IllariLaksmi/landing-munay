import localFont from "next/font/local";

/**
 * Licensed brand typography (same configuration re-exported by `fonts.ts`).
 *
 * The files live in `public/fonts/`:
 * - BelloScriptPro.woff2
 * - InterVariable.ttf
 */
export const displayFont = localFont({
  src: "../../public/fonts/BelloScriptPro.woff2",
  variable: "--font-munay-display",
  display: "swap",
  weight: "400",
  fallback: ["Yellowtail", "cursive"],
  adjustFontFallback: "Arial",
});

export const sansFont = localFont({
  src: "../../public/fonts/InterVariable.ttf",
  variable: "--font-munay-sans",
  display: "swap",
  weight: "100 900",
  style: "normal",
  fallback: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});
