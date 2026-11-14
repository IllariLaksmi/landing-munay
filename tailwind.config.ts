import type { Config } from "tailwindcss";

/**
 * Munay design system — Tailwind CSS v4 mirror configuration.
 *
 * Tailwind v4 is CSS-first: the source of truth lives in
 * `src/app/globals.css` inside the `@theme` block (and is loaded here through
 * the `@config` directive). This file keeps the same tokens available to
 * editor tooling, legacy integrations and anyone migrating to a JS-based
 * Tailwind setup.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        blue: "var(--color-blue)",
        purple: "var(--color-purple)",
        pink: "var(--color-pink)",
        green: "var(--color-green)",
        yellow: "var(--color-yellow)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      borderColor: {
        DEFAULT: "rgb(24 64 170 / 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
