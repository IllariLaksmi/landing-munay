import type { Dictionary } from "@/types/dictionary";
import { CONTACT_EMAIL } from "@/lib/constants";

interface SubscribeCtaProps {
  dict: Dictionary["subscribe"];
  tone?: "default" | "light";
}

/**
 * Newsletter call to action. Opens the visitor's email client with a
 * pre-filled subject so requests land in the Munay inbox.
 */
export function SubscribeCta({ dict, tone = "default" }: SubscribeCtaProps) {
  const light = tone === "light";

  return (
    <a
      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(dict.subject)}`}
      className={[
        "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors",
        light
          ? "bg-yellow text-blue hover:bg-cream"
          : "bg-blue text-cream hover:bg-blue/90",
      ].join(" ")}
    >
      {dict.cta}
    </a>
  );
}
