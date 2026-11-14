import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { getTeam } from "@/data/team";
import { PhotoPending } from "@/components/ui/PhotoPending";
import { Cantuta, LeafBranch } from "@/components/ui/BrandShapes";

interface TeamGridProps {
  dict: Dictionary["about"];
  locale: Locale;
}

export function TeamGrid({ dict, locale }: TeamGridProps) {
  const team = getTeam(locale);

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative overflow-hidden border-t border-blue/15 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <Cantuta
        tone="green"
        className="absolute -right-10 top-20 h-52 w-auto rotate-12 opacity-25 sm:h-64"
      />
      <LeafBranch
        tone="pink"
        className="absolute -left-12 bottom-16 h-24 w-auto rotate-12 opacity-25"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-blue/80">{dict.eyebrow}</p>
            <h2
              id="team-title"
              className="display-balance mt-5 font-display text-5xl leading-[0.92] text-blue sm:text-6xl lg:text-7xl"
            >
              {dict.teamTitle}
            </h2>
          </div>
          <p className="pretty max-w-xl text-base leading-relaxed text-blue sm:text-lg lg:col-span-6 lg:justify-self-end">
            {dict.teamIntro}
          </p>
        </div>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:mt-16 lg:gap-10">
          {team.map((member) => (
            <article key={member.id}>
              <figure className="relative">
                <PhotoPending
                  label={dict.teamPhotoLabel}
                  note={dict.teamPhotoNote}
                  className="shadow-soft"
                />
                {member.founder ? (
                  <span className="sticker absolute left-4 top-4 bg-yellow text-blue">
                    {dict.teamTitle}
                  </span>
                ) : null}
              </figure>

              <div className="mt-7 border-t-2 border-blue/20 pt-5">
                <h3 className="font-display text-4xl leading-[0.9] text-blue sm:text-5xl">
                  {member.name}
                </h3>
                <p className="mt-3 text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-blue/90">
                  {member.role}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
