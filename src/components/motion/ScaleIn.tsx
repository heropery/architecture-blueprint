import { motion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE_OUT, scaleVariants } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

/** Scale 95% -> 100% + fade. Used by the Glass Drawer (280ms) and dialogs. */
export function ScaleIn({
  children,
  delay = 0,
  duration = DURATION.drawer,
  ...props
}: ScaleInProps) {
  const motionPref = useMotionPreference();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={
        motionPref.reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
          : scaleVariants
      }
      transition={{ duration: motionPref.duration(duration), delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
