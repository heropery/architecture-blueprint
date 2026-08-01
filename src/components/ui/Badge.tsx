import { cn } from "@/lib/utils";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
  info: "bg-info/15 text-info",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** Badge — compact status pill used by queue states and success feedback. */
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-caption inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
