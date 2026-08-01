import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Removes the default 24px padding when the card owns its own layout. */
  flush?: boolean;
}

/**
 * Card — Radius 24px, Padding 24px, Elevation shadow.
 * docs/08_COMPONENT_LIBRARY.md §5.1
 */
export function Card({ className, flush = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground border-border elevation rounded-[var(--radius-card)] border",
        !flush && "p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-heading-m", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-caption text-muted-foreground", className)} {...props} />;
}
