import { motion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE_OUT, hoverScale, tapScale } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "md" | "sm";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "bg-transparent text-foreground border border-border hover:bg-surface hover:border-foreground/20",
  ghost: "bg-transparent text-foreground hover:opacity-70",
  danger: "bg-danger text-danger-foreground hover:bg-danger/90",
};

const SIZES: Record<ButtonSize, string> = {
  /** 48px height — the thumb-friendly default (docs/21_USER_APP.md §6). */
  md: "h-12 px-6 text-[16px]",
  sm: "h-12 px-4 text-[14px]",
};

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * Button — 4 standard types, Radius 16px, Height 48px.
 * docs/08_COMPONENT_LIBRARY.md §5.1
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const motionPref = useMotionPreference();

  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileHover={disabled || motionPref.reduced ? undefined : hoverScale}
      whileTap={disabled || motionPref.reduced ? undefined : tapScale}
      transition={{ duration: motionPref.duration(DURATION.fast), ease: EASE_OUT }}
      className={cn(
        "inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium",
        "focus-visible:ring-ring focus-visible:ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
