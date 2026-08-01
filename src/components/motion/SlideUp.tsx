import { motion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE_OUT, slideUpVariants } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface SlideUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

/** Fade + slide Y 16px — the standard page transition. */
export function SlideUp({
  children,
  delay = 0,
  duration = DURATION.normal,
  ...props
}: SlideUpProps) {
  const motionPref = useMotionPreference();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={
        motionPref.reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
          : slideUpVariants
      }
      transition={{ duration: motionPref.duration(duration), delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
