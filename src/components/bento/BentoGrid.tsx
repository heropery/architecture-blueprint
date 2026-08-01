import { motion } from "framer-motion";
import { DURATION, EASE_OUT, scrollRiseVariants } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { cn } from "@/lib/utils";

/**
 * BentoGrid — the admin layout system. Desktop multi-column, tablet 2 columns,
 * mobile single-column stack (docs/09_LAYOUT_SYSTEM.md).
 * There is no sidebar and no mega menu anywhere in Watcher.
 */
export function BentoGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}

export type BentoSpan = "sm" | "md" | "lg" | "tall" | "preview";

const SPANS: Record<BentoSpan, string> = {
  sm: "md:col-span-1 xl:col-span-1",
  md: "md:col-span-2 xl:col-span-2",
  lg: "md:col-span-2 xl:col-span-3",
  tall: "md:col-span-1 xl:col-span-1 row-span-2",
  preview: "md:col-span-1 xl:col-span-1 row-span-3",
};

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: BentoSpan;
}

/** BentoCard — scroll reveal: fade + rise Y 24px. */
export function BentoCard({ span = "sm", className, children, ...props }: BentoCardProps) {
  const motionPref = useMotionPreference();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={
        motionPref.reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
          : scrollRiseVariants
      }
      transition={{ duration: motionPref.duration(DURATION.medium), ease: EASE_OUT }}
      className={cn(
        "bg-card text-card-foreground border-border elevation rounded-[var(--radius-card)] border p-6",
        SPANS[span],
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
