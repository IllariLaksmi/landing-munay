import { Cantuta, Cloud, LeafBranch } from "@/components/ui/BrandShapes";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  titleId: string;
}

/** Shared editorial page header for interior routes. */
export function PageHeader({ eyebrow, title, intro, titleId }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-blue/20 bg-cream pb-14 pt-36 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
      <Cloud
        tone="purple"
        className="absolute right-[8%] top-24 h-14 w-auto opacity-30"
      />
      <LeafBranch
        tone="green"
        className="absolute -right-10 bottom-0 h-24 w-auto rotate-12 opacity-30"
      />
      <Cantuta
        tone="pink"
        className="absolute -left-12 top-28 h-40 w-auto rotate-12 opacity-20"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <p className="eyebrow text-blue/80">{eyebrow}</p>
        <h1
          id={titleId}
          className="display-balance mt-5 max-w-4xl font-display text-5xl leading-[0.88] text-blue sm:text-6xl lg:text-7xl"
        >
          {title}
        </h1>
        {intro ? (
          <p className="pretty mt-6 max-w-2xl text-base leading-relaxed text-blue sm:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
