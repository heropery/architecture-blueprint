import { useReducedMotion } from "framer-motion";

/**
 * Returns motion timing that respects the user's reduced-motion preference.
 * docs/10_ANIMATION_SYSTEM.md §6 — large transitions become a 100ms fade.
 */
export function useMotionPreference() {
  const reduced = useReducedMotion() ?? false;

  return {
    reduced,
    /** Scale a spec duration (seconds) down to an instant fade when reduced. */
    duration: (seconds: number) => (reduced ? 0.1 : seconds),
    /** Drop y/scale offsets when reduced so only opacity animates. */
    offset: <T,>(value: T, fallback: T) => (reduced ? fallback : value),
  };
}
