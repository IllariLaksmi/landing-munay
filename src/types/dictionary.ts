import type es from "@/dictionaries/es.json";

/**
 * The Spanish dictionary is the canonical shape of the content model.
 * `en.json` is type-checked against this type in `src/lib/dictionaries.ts`,
 * so a missing translation fails the build instead of shipping a blank page.
 */
export type Dictionary = typeof es;
