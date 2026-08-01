/**
 * Motion constants — docs/10_ANIMATION_SYSTEM.md (WATCHER-MOTION-001)
 * Framer Motion is the only animation library in this project. No Lottie.
 */
import type { Transition, Variants } from "framer-motion";

export const DURATION = {
  fast: 0.15,
  normal: 0.25,
  medium: 0.4,
  slow: 0.7,
  story: 0.9,
  drawer: 0.28,
} as const;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/** Bento card scroll reveal: fade + rise 24px */
export const scrollRiseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const tapScale = { scale: 0.98 };
export const hoverScale = { scale: 1.02 };
