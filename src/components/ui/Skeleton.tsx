import { cn } from "@/lib/utils";

export type SkeletonShape = "card" | "list" | "image" | "timeline" | "text";

const SHAPES: Record<SkeletonShape, string> = {
  card: "h-40 rounded-[var(--radius-card)]",
  list: "h-12 rounded-[var(--radius-button)]",
  image: "aspect-[4/3] w-full rounded-[var(--radius-card)]",
  timeline: "h-20 rounded-[var(--radius-card)]",
  text: "h-4 rounded-full",
};

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonShape;
}

/**
 * Skeleton — shimmer gradient loop, 1.2s (docs/10_ANIMATION_SYSTEM.md §5.14).
 * The shimmer is a token-driven gradient sweep, not a decorative animation.
 */
export function Skeleton({ shape = "text", className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("watcher-shimmer bg-muted overflow-hidden", SHAPES[shape], className)}
      {...props}
    />
  );
}
