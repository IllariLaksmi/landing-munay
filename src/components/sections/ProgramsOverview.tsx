import Link from "next/link";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { Cantuta, Cloud, LeafBranch } from "@/components/ui/BrandShapes";

interface ProgramsOverviewProps {
  dict: Dictionary["home"]["programs"];
  programs: Dictionary["programs"];
  locale: Locale;
}

const accents = ["bg-pink", "bg-purple", "bg-green"] as const;

export function ProgramsOverview({ dict, programs, locale }: ProgramsOverviewProps) {
  const items = [
    {
      number: "01",
      title: programs.workshopsTitle,
      description: programs.workshopsIntro,
    },
    {
      number: "02",
      title: programs.individualTitle,
      description: programs.individualIntro,
    },
    {
      number: "03",
      title: programs.retreatsTitle,
      description: programs.retreatsIntro,
    },
  ];

  return (
    <section
      id="programs-overview"
      aria-labelledby="programs-overview-title"
      className="surface-blue relative overflow-hidden bg-blue py-20 text-cream sm:py-24 lg:py-32"
    >
      <Cantuta
        tone="pink"
        className="absolute -left-10 bottom-0 h-48 w-auto opacity-30"
      />
      <LeafBranch
        tone="green"
        className="absolute -right-10 top-4 h-28 w-auto rotate-12 opacity-35"
      />
      <Cloud
        tone="purple"
        className="absolute right-[12%] top-10 h-12 w-auto opacity-60"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-cream/80">{dict.eyebrow}</p>
            <h2
              id="programs-overview-title"
              className="display-balance mt-5 max-w-2xl font-display text-5xl leading-[0.9] text-cream sm:text-6xl lg:text-7xl"
            >
              {dict.title}
            </h2>
          </div>
          <p className="pretty max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg lg:col-span-5 lg:justify-self-end">
            {dict.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.number}
              className="flex flex-col rounded-[1.75rem] bg-cream p-6 text-blue shadow-soft sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="sticker bg-blue text-cream">
                  {item.number}
                </p>
                <span
                  aria-hidden="true"
                  className={`h-4 w-4 rounded-full ${accents[index]}`}
                />
              </div>
              <h3 className="mt-8 font-display text-4xl leading-[0.9] text-blue sm:text-5xl">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-blue/90">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <Link
          href={`/${locale}/programs`}
          className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-yellow px-7 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-blue transition-colors hover:bg-cream"
        >
          {dict.link}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
