import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n";
import { getPublishedBoardMembers } from "@/data/team";

interface BoardListProps {
  dict: Dictionary["about"];
  locale: Locale;
}

/**
 * Board of Directors. Renders nothing at all until at least one member is
 * published, so the site never shows placeholder or "pending" copy.
 */
export function BoardList({ dict, locale }: BoardListProps) {
  const members = getPublishedBoardMembers(locale);

  if (members.length === 0) return null;

  return (
    <section
      id="board"
      aria-labelledby="board-title"
      className="border-t border-blue/15 bg-cream py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <p className="eyebrow text-blue/80">{dict.boardTitle}</p>
        <h2
          id="board-title"
          className="display-balance mt-5 font-display text-5xl leading-[0.9] text-blue sm:text-6xl lg:text-7xl"
        >
          {dict.boardTitle}
        </h2>
        <p className="pretty mt-5 max-w-2xl text-base leading-relaxed text-blue">
          {dict.boardIntro}
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {members.map((member) => (
            <li
              key={member.id}
              className="rounded-[1.5rem] border border-blue/20 p-6"
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-blue/80">
                {member.positionLabel}
              </p>
              <p className="mt-3 font-display text-3xl leading-none text-blue">
                {member.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
