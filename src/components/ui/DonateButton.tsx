import { DONATE_URL } from "@/lib/constants";
import type { Dictionary } from "@/types/dictionary";

type Variant = "primary" | "accent" | "outline" | "cream";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-cream hover:bg-blue/90",
  accent: "bg-yellow text-blue hover:bg-cream",
  outline:
    "border border-blue/40 bg-transparent text-blue hover:border-blue hover:bg-blue/5",
  cream: "bg-cream text-blue hover:bg-yellow",
};

interface DonateButtonProps {
  label: string;
  a11y: Dictionary["a11y"];
  variant?: Variant;
  className?: string;
}

/**
 * External donation link. The accessible name explicitly announces that the
 * link opens in a new tab, as required for WCAG 2.1 AA link purpose.
 */
export function DonateButton({
  label,
  a11y,
  variant = "primary",
  className = "",
}: DonateButtonProps) {
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors",
        variants[variant],
        className,
      ]
        .join(" ")
        .trim()}
    >
      {label}
      <span aria-hidden="true" className="text-sm">
        ↗
      </span>
      <span className="sr-only">({a11y.externalLink})</span>
    </a>
  );
}
