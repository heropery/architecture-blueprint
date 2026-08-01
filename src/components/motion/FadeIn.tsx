import { motion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE_OUT, fadeVariants } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

/** Fade entrance — default 250ms (docs/10_ANIMATION_SYSTEM.md §4.2). */
export function FadeIn({ children, delay = 0, duration = DURATION.normal, ...props }: FadeInProps) {
  const motionPref = useMotionPreference();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
      transition={{ duration: motionPref.duration(duration), delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
