import type { SVGProps } from "react";

export type BrandTone =
  | "blue"
  | "cream"
  | "pink"
  | "purple"
  | "green"
  | "yellow";

const toneClasses: Record<BrandTone, string> = {
  blue: "text-blue",
  cream: "text-cream",
  pink: "text-pink",
  purple: "text-purple",
  green: "text-green",
  yellow: "text-yellow",
};

function shapeClass(tone: BrandTone, className = "") {
  return ["pointer-events-none select-none", toneClasses[tone], className]
    .join(" ")
    .trim();
}

type ShapeProps = Omit<SVGProps<SVGSVGElement>, "aria-hidden" | "focusable"> & {
  tone?: BrandTone;
};

/** Cantuta branch: Munay's core botanical symbol, drawn as a solid silhouette. */
export function Cantuta({ tone = "pink", className, ...props }: ShapeProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={shapeClass(tone, className)}
    >
      <path
        d="M79 214c-3-43 1-87 8-129"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="57" cy="158" rx="28" ry="12" transform="rotate(-32 57 158)" fill="currentColor" fillOpacity=".82" />
      <ellipse cx="99" cy="134" rx="30" ry="12" transform="rotate(29 99 134)" fill="currentColor" fillOpacity=".82" />
      <ellipse cx="50" cy="121" rx="26" ry="11" transform="rotate(-36 50 121)" fill="currentColor" fillOpacity=".68" />
      <ellipse cx="105" cy="100" rx="26" ry="11" transform="rotate(35 105 100)" fill="currentColor" fillOpacity=".68" />
      <path
        d="M87 88c-23-13-33-34-27-60 22 9 33 30 27 60Z"
        fill="currentColor"
        fillOpacity=".9"
      />
      <path
        d="M90 88c21-14 29-36 21-62-21 11-29 33-21 62Z"
        fill="currentColor"
        fillOpacity=".72"
      />
      <path
        d="M88 87c-4-22 3-42 21-57 7 22 0 42-21 57Z"
        fill="currentColor"
      />
      <circle cx="80" cy="83" r="10" fill="currentColor" fillOpacity=".55" />
      <path
        d="M78 77c-3-13 1-24 11-33 5 12 1 24-11 33Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Simple leafy sprig used to frame cards and photography. */
export function LeafBranch({ tone = "green", className, ...props }: ShapeProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 220 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={shapeClass(tone, className)}
    >
      <path
        d="M10 96C58 82 118 50 204 18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M53 82C42 54 50 35 76 22c9 27 1 47-23 60Z" fill="currentColor" />
      <path d="M102 63C89 36 96 17 121 3c10 27 3 47-19 60Z" fill="currentColor" fillOpacity=".8" />
      <path d="M152 41c-12-25-4-43 20-54 8 26 1 45-20 54Z" fill="currentColor" />
      <path d="M79 67c-24 1-40-7-48-27 26-3 43 6 48 27Z" fill="currentColor" fillOpacity=".72" />
      <path d="M127 47c-24 0-40-9-47-29 26-2 42 8 47 29Z" fill="currentColor" fillOpacity=".9" />
      <path d="M177 27c-23 0-38-10-44-29 25-1 40 9 44 29Z" fill="currentColor" fillOpacity=".7" />
    </svg>
  );
}

/** Hummingbird silhouette from the brand graphic system. */
export function Hummingbird({ tone = "purple", className, ...props }: ShapeProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 180 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={shapeClass(tone, className)}
    >
      <path
        d="M21 69c21-13 39-15 57-8 5-19 20-35 43-41 2 13-2 24-12 34 11 1 20 6 28 15-12 8-25 10-39 5-7 16-20 28-39 36-5-9-4-19 3-29-15 2-28-2-41-12Z"
        fill="currentColor"
      />
      <path
        d="M84 91c-2 14 3 25 15 33 2-14-3-25-15-33Z"
        fill="currentColor"
        fillOpacity=".75"
      />
      <path
        d="M146 55c11-2 20 1 28 10-10 4-20 2-28-10Z"
        fill="currentColor"
        fillOpacity=".7"
      />
      <circle cx="132" cy="43" r="3.2" fill="currentColor" fillOpacity=".35" />
    </svg>
  );
}

/** Rounded cloud used across the brand's social and print pieces. */
export function Cloud({ tone = "pink", className, ...props }: ShapeProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 180 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={shapeClass(tone, className)}
    >
      <path
        d="M29 78h120c17 0 25-11 21-24-4-12-17-17-29-13-1-18-17-30-34-25-7-13-25-17-37-8-9 7-12 18-8 28-18-3-32 8-35 23-2 10 4 19 12 19Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Abstract sun/leaf cluster for hero corners and section edges. */
export function SunBurst({ tone = "yellow", className, ...props }: ShapeProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={shapeClass(tone, className)}
    >
      <circle cx="80" cy="80" r="31" fill="currentColor" />
      {Array.from({ length: 12 }).map((_, index) => (
        <rect
          key={index}
          x="76"
          y="8"
          width="8"
          height="24"
          rx="4"
          fill="currentColor"
          transform={`rotate(${index * 30} 80 80)`}
        />
      ))}
    </svg>
  );
}
