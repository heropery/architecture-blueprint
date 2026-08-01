import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  flush?: boolean;
}

/**
 * GlassCard — Blur 24px, opacity 70%, 1px white/10 border.
 * Glassmorphism is restricted to Drawer, Dialog, Bottom Sheet and Popup
 * surfaces (docs/00_MASTER_PROMPT.md §5). Never use it app-wide.
 */
export function GlassCard({ className, flush = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-surface elevation rounded-[var(--radius-card)]",
        !flush && "p-6",
        className,
      )}
      {...props}
    />
  );
}
