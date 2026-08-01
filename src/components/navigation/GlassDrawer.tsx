import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { DURATION, EASE_OUT } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { cn } from "@/lib/utils";

export interface GlassDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

/**
 * Navigation Glass Drawer — the ONLY navigation pattern in Watcher.
 * No sidebar, no mega menu, no universal search (docs/00_MASTER_PROMPT.md §5).
 * Blur 24px, Opacity 70%, Scale 95% -> 100%, 280ms.
 */
export function GlassDrawer({ open, onOpenChange, title, children, trigger }: GlassDrawerProps) {
  const motionPref = useMotionPreference();
  const duration = motionPref.duration(DURATION.drawer);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration, ease: EASE_OUT }}
                className="fixed inset-0 z-50 bg-black/50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: motionPref.offset(0.95, 1) }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: motionPref.offset(0.95, 1) }}
                transition={{ duration, ease: EASE_OUT }}
                className={cn(
                  "glass-surface elevation fixed top-1/2 left-1/2 z-50 w-[min(92vw,420px)]",
                  "-translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-dialog)] p-6",
                )}
              >
                <div className="mb-6 flex items-center justify-between">
                  <Dialog.Title className="text-heading-m">{title}</Dialog.Title>
                  <Dialog.Close
                    aria-label="Close navigation"
                    className="hover:bg-muted flex size-12 items-center justify-center rounded-[var(--radius-button)] transition-opacity"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Watcher navigation menu
                </Dialog.Description>
                <nav className="flex flex-col gap-2">{children}</nav>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Hamburger — always top-left (docs/08_COMPONENT_LIBRARY.md §5.2). */
export function HamburgerButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Open navigation"
      className={cn(
        "border-border bg-surface hover:bg-muted flex size-12 items-center justify-center rounded-[var(--radius-button)] border transition-colors",
        className,
      )}
      {...props}
    >
      <Menu className="size-5" aria-hidden="true" />
    </button>
  );
}
