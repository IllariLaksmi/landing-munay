import type { Dictionary } from "@/types/dictionary";
import { Cantuta, Cloud, LeafBranch } from "@/components/ui/BrandShapes";
import { DonateButton } from "@/components/ui/DonateButton";

interface DonateBannerProps {
  dict: Dictionary["home"]["donate"];
  a11y: Dictionary["a11y"];
}

export function DonateBanner({ dict, a11y }: DonateBannerProps) {
  return (
    <section
      aria-labelledby="donate-banner-title"
      className="surface-blue relative isolate overflow-hidden bg-blue py-20 text-cream sm:py-24 lg:py-28"
    >
      <Cantuta
        tone="pink"
        className="absolute -left-8 bottom-0 h-44 w-auto opacity-40 sm:h-56"
      />
      <LeafBranch
        tone="green"
        className="absolute -right-8 top-0 h-32 w-auto rotate-180 opacity-40 sm:h-44"
      />
      <Cloud
        tone="yellow"
        className="absolute bottom-8 right-[34%] h-10 w-auto opacity-70"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-12 xl:px-16">
        <div className="lg:col-span-8">
          <p className="eyebrow text-cream/85">{dict.eyebrow}</p>
          <h2
            id="donate-banner-title"
            className="display-balance mt-5 max-w-3xl font-display text-5xl leading-[0.88] text-cream sm:text-6xl lg:text-7xl"
          >
            {dict.title}
          </h2>
          <p className="pretty mt-6 max-w-2xl text-base leading-relaxed text-cream/90 sm:text-lg">
            {dict.body}
          </p>
        </div>

        <div className="lg:col-span-4 lg:justify-self-end">
          <DonateButton
            label={dict.cta}
            a11y={a11y}
            variant="accent"
            className="min-h-14 px-8"
          />
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-cream/80">
            {dict.note}
          </p>
        </div>
      </div>
    </section>
  );
}
