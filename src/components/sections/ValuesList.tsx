import { getValues } from "@/data/values";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { Cantuta } from "@/components/ui/BrandShapes";

interface ValuesListProps {
  dict: Dictionary["about"];
  locale: Locale;
}

/** Eight values rendered as a two-column, numbered editorial list. */
export function ValuesList({ dict, locale }: ValuesListProps) {
  const values = getValues(locale);

  return (
    <section
      id="values"
      aria-labelledby="values-title"
      className="relative overflow-hidden border-t border-blue/15 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <Cantuta
        tone="purple"
        className="absolute -right-10 top-16 h-44 w-auto rotate-12 opacity-20"
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-blue/80">{dict.eyebrow}</p>
            <h2
              id="values-title"
              className="display-balance mt-5 font-display text-5xl leading-[0.9] text-blue sm:text-6xl lg:text-7xl"
            >
              {dict.valuesTitle}
            </h2>
          </div>
          <p className="pretty max-w-xl text-base leading-relaxed text-blue sm:text-lg lg:col-span-6 lg:justify-self-end">
            {dict.valuesIntro}
          </p>
        </div>

        <ol className="mt-12 grid gap-x-12 border-t border-blue/20 lg:mt-16 lg:grid-cols-2">
          {values.map((value) => (
            <li
              key={value.id}
              className="border-b border-blue/20 py-7 sm:py-8"
            >
              <article className="grid grid-cols-[auto_1fr] gap-5 sm:gap-6">
                <p
                  aria-hidden="true"
                  className="pt-1 font-display text-3xl leading-none text-purple sm:text-4xl"
                >
                  {value.number}
                </p>
                <div>
                  <h3 className="font-display text-3xl leading-[0.95] text-blue sm:text-4xl">
                    {value.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-blue">
                    {value.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
