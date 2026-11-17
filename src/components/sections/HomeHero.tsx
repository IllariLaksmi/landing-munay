import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { media } from "@/data/media";
import { Cantuta, Cloud, Hummingbird, LeafBranch } from "@/components/ui/BrandShapes";
import { DonateButton } from "@/components/ui/DonateButton";

interface HomeHeroProps {
  hero: Dictionary["hero"];
  a11y: Dictionary["a11y"];
  locale: Locale;
}

export function HomeHero({ hero, a11y, locale }: HomeHeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface-blue relative overflow-hidden bg-blue pb-16 pt-32 text-cream sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      <Cloud
        tone="pink"
        className="absolute right-[6%] top-24 h-12 w-auto opacity-90 sm:h-16"
      />
      <LeafBranch
        tone="green"
        className="absolute -right-10 top-10 h-32 w-auto rotate-180 opacity-60 sm:h-40"
      />
      <Cantuta
        tone="purple"
        className="absolute -left-12 bottom-0 h-52 w-auto rotate-12 opacity-30 sm:h-64"
      />
      <Hummingbird
        tone="yellow"
        className="absolute left-[46%] top-24 hidden h-16 w-auto -rotate-6 opacity-90 lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 xl:px-16">
        <div className="lg:col-span-7">
          <p className="eyebrow text-cream/80">{hero.eyebrow}</p>

          <h1 id="hero-title" className="display-balance mt-4 text-cream">
            <span className="block font-display text-[clamp(3.75rem,9vw,8rem)] leading-[0.82] tracking-[-0.01em]">
              {hero.titleLine1}
            </span>
            <span className="mt-2 block font-display text-[clamp(3.75rem,9vw,8rem)] leading-[0.82] tracking-[-0.01em] text-yellow">
              {hero.titleLine2}
            </span>
          </h1>

          <p className="pretty mt-7 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/programs`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-cream px-7 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-blue transition-colors hover:bg-white"
            >
              {hero.primaryCta}
            </Link>
            <DonateButton
              label={hero.secondaryCta}
              a11y={a11y}
              variant="accent"
              className="min-h-12 px-7"
            />
          </div>

          <p className="mt-10 flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream/75">
            <span aria-hidden="true" className="block h-8 w-px bg-cream/40" />
            {hero.scroll}
          </p>
        </div>

        <figure className="relative lg:col-span-5">
          <div className="relative aspect-square">
            <Image
              src={media.hero.src}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
            />
          </div>
          <Cantuta
            tone="pink"
            className="absolute -bottom-10 -left-6 h-32 w-auto -rotate-12 sm:h-40"
          />
          <LeafBranch
            tone="yellow"
            className="absolute -right-6 -top-8 h-16 w-auto rotate-12 sm:h-20"
          />
        </figure>
      </div>
    </section>
  );
}
