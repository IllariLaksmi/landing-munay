import Image from "next/image";
import { Cantuta, Hummingbird, LeafBranch } from "@/components/ui/BrandShapes";

interface PhotoPendingProps {
  /** Visible label, e.g. "Foto próximamente". */
  label: string;
  /** Optional supporting line shown under the label. */
  note?: string;
  className?: string;
}

/**
 * Branded stand-in for a team portrait that has not been updated yet.
 *
 * It deliberately contains no person, silhouette or stock photo: only the
 * brand graphic system plus a visible, translated label.
 */
export function PhotoPending({ label, note, className = "" }: PhotoPendingProps) {
  return (
    <div
      className={[
        "relative isolate aspect-[3/4] overflow-hidden rounded-[2rem] bg-blue",
        className,
      ]
        .join(" ")
        .trim()}
    >
      <div
        aria-hidden="true"
        className="blob absolute inset-x-[8%] top-[8%] h-[56%] bg-cream"
      />
      <Cantuta
        tone="pink"
        className="absolute -bottom-6 -right-6 h-40 w-auto rotate-12 opacity-95 sm:h-48"
      />
      <LeafBranch
        tone="green"
        className="absolute -right-8 top-4 h-24 w-auto rotate-[18deg] opacity-95 sm:h-28"
      />
      <Hummingbird
        tone="yellow"
        className="absolute right-3 top-1/2 h-12 w-auto -translate-y-1/2 rotate-[8deg] sm:h-16"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[8%] flex h-[56%] items-center justify-center"
      >
        <Image
          src="/brand/munay-mark-blue.png"
          alt=""
          width={422}
          height={249}
          className="h-auto w-[46%] max-w-[180px]"
        />
      </div>

      <div className="absolute inset-x-5 bottom-5 z-10">
        <p className="sticker bg-cream px-4 py-2 text-[0.72rem] text-blue shadow-soft">
          {label}
        </p>
        {note ? (
          <p className="mt-2 max-w-[13rem] text-[0.72rem] font-medium leading-snug text-cream">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}
