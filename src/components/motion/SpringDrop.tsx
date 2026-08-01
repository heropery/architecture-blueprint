import { motion, type HTMLMotionProps } from "framer-motion";
import { SPRING } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface SpringDropProps extends HTMLMotionProps<"div"> {
  /** Distance the element falls from, in px. */
  from?: number;
  delay?: number;
}

/** Spring drop — stiffness 300 / damping 25. Ticket drop & bottom sheets. */
export function SpringDrop({ children, from = -120, delay = 0, ...props }: SpringDropProps) {
  const motionPref = useMotionPreference();

  return (
    <motion.div
      initial={{ opacity: 0, y: motionPref.offset(from, 0) }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: motionPref.offset(from / 2, 0) }}
      transition={motionPref.reduced ? { duration: 0.1, delay } : { ...SPRING, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
