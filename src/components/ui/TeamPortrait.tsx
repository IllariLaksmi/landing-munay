import Image from "next/image";
import { PhotoPending } from "@/components/ui/PhotoPending";

interface TeamPortraitProps {
  photo?: {
    src: string;
    width: number;
    height: number;
  };
  /** Alt text for the real portrait. */
  alt: string;
  /** Fallback labels used only when no portrait exists yet. */
  pendingLabel: string;
  pendingNote?: string;
  className?: string;
}

/**
 * Renders a real team portrait when available, otherwise the branded
 * PhotoPending stand-in. Both share the same 3:4 frame so grids stay aligned.
 */
export function TeamPortrait({
  photo,
  alt,
  pendingLabel,
  pendingNote,
  className = "",
}: TeamPortraitProps) {
  if (!photo) {
    return (
      <PhotoPending
        label={pendingLabel}
        note={pendingNote}
        className={className}
      />
    );
  }

  return (
    <div
      className={[
        "relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-blue",
        className,
      ]
        .join(" ")
        .trim()}
    >
      <Image
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
