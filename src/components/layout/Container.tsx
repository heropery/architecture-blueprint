import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `app` = admin max width, `mobile` = visitor vertical flow width. */
  width?: "app" | "mobile";
}

/**
 * Container — 8pt-grid gutters, no horizontal overflow at any breakpoint.
 * docs/09_LAYOUT_SYSTEM.md
 */
export function Container({ width = "app", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        width === "app" ? "max-w-[1440px]" : "max-w-[480px]",
        className,
      )}
      {...props}
    />
  );
}
