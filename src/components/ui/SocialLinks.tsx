import type { JSX } from "react";
import type { Dictionary } from "@/types/dictionary";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants";

export type SocialNetwork = "instagram" | "facebook" | "linkedin";

interface SocialLinksProps {
  labels: Record<SocialNetwork, string>;
  a11y: Dictionary["a11y"];
  /** Shows the network name beside each icon (contact page). */
  showLabels?: boolean;
  /** `light` adapts the links to blue surfaces. */
  tone?: "default" | "light";
  className?: string;
}

const networks: Array<{
  id: SocialNetwork;
  name: string;
  href: string;
  icon: () => JSX.Element;
}> = [
  {
    id: "instagram",
    name: "Instagram",
    href: INSTAGRAM_URL,
    icon: InstagramIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    href: FACEBOOK_URL,
    icon: FacebookIcon,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: LINKEDIN_URL,
    icon: LinkedInIcon,
  },
];

/** Social profiles with accessible names and 44px touch targets. */
export function SocialLinks({
  labels,
  a11y,
  showLabels = false,
  tone = "default",
  className = "",
}: SocialLinksProps) {
  const light = tone === "light";

  return (
    <ul className={["flex flex-wrap items-center gap-2", className].join(" ").trim()}>
      {networks.map(({ id, name, href, icon: Icon }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels[id]}. ${a11y.externalLink}`}
            className={[
              "inline-flex min-h-11 items-center justify-center rounded-full border transition-colors",
              showLabels ? "gap-2 px-4" : "min-w-11",
              light
                ? "border-cream/35 text-cream hover:border-cream hover:bg-cream/10"
                : "border-blue/30 text-blue hover:border-blue hover:bg-blue/10",
            ].join(" ")}
          >
            <Icon />
            {showLabels ? (
              <span className="text-sm font-medium">{name}</span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
