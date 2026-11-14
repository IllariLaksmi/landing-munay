import Link from "next/link";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { getTeam } from "@/data/team";
import { PhotoPending } from "@/components/ui/PhotoPending";
import { Cantuta, Cloud, Hummingbird } from "@/components/ui/BrandShapes";

interface OurStoryProps {
  dict: Dictionary["home"]["story"];
  locale: Locale;
}

export function OurStory({ dict, locale }: OurStoryProps) {
  const founder = getTeam(locale).find((member) => member.founder);

  return (
    <section
      id="our-story"
      aria-labelledby="story-title"
      className="relative overflow-hidden border-t border-blue/15 bg-cream py-20 sm:py-24 lg:py-32"
    >
      <Cloud
        tone="purple"
        className="absolute -right-10 top-12 h-16 w-auto opacity-25"
      />
      <Hummingbird
        tone="pink"
        className="absolute -left-6 bottom-14 h-20 w-auto rotate-12 opacity-30"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow text-blue/80">{dict.eyebrow}</p>
            <h2
              id="story-title"
              className="display-balance mt-5 max-w-2xl font-display text-5xl leading-[0.9] text-blue sm:text-6xl lg:text-7xl"
            >
              {dict.title}
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-[1.85] text-blue sm:text-lg">
              {dict.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>

          {founder ? (
            <aside
              aria-labelledby="founder-spotlight-title"
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-blue p-5 text-cream sm:p-7">
                <Cantuta
                  tone="purple"
                  className="absolute -right-8 -top-6 h-32 w-auto rotate-12 opacity-30"
                />
                <p className="eyebrow relative text-cream/80">
                  {dict.founderEyebrow}
                </p>

                <figure className="relative mt-5">
                  <PhotoPending
                    label={dict.founderPhotoLabel}
                    note={dict.founderPhotoNote}
                    className="shadow-soft"
                  />
                </figure>

                <h3
                  id="founder-spotlight-title"
                  className="relative mt-6 font-display text-4xl leading-[0.9] text-cream sm:text-5xl"
                >
                  {founder.name}
                </h3>
                <p className="relative mt-3 text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-cream/75">
                  {founder.role}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-cream/90">
                  {founder.bio}
                </p>
                <Link
                  href={`/${locale}/about#team`}
                  className="relative mt-6 inline-flex min-h-11 items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cream underline underline-offset-4 hover:decoration-2"
                >
                  {dict.founderLink}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
