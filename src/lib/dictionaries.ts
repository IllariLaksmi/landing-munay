import en from "@/dictionaries/en.json";
import es from "@/dictionaries/es.json";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/types/dictionary";

/**
 * Both dictionaries are imported statically so TypeScript validates that
 * `en.json` has exactly the same shape as the canonical Spanish dictionary.
 */
const dictionaries: Record<Locale, Dictionary> = { es, en };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
