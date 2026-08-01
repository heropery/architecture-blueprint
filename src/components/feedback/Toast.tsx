import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, TriangleAlert, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { DURATION, EASE_OUT } from "@/constants/motion";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { cn } from "@/lib/utils";

export type ToastStatus = "success" | "warning" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  status: ToastStatus;
}

const TONES: Record<ToastStatus, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
  info: "text-info",
};

const ICONS = {
  success: CheckCircle2,
  warning: TriangleAlert,
  error: XCircle,
  info: Info,
} as const;

/** Toast duration is frozen at 2500ms by docs/08_COMPONENT_LIBRARY.md §5.4. */
const TOAST_DURATION_MS = 2500;

interface ToastContextValue {
  toast: (message: string, status?: ToastStatus) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider />");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const motionPref = useMotionPreference();

  const toast = useCallback((message: string, status: ToastStatus = "success") => {
    const id = nextId.current++;
    setItems((current) => [...current, { id, message, status }]);
    setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex flex-col items-center gap-2 px-4"
      >
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const Icon = ICONS[item.status];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: motionPref.offset(16, 0) }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: motionPref.offset(8, 0) }}
                transition={{ duration: motionPref.duration(DURATION.normal), ease: EASE_OUT }}
                className="glass-surface elevation flex w-full max-w-sm items-center gap-3 rounded-[var(--radius-button)] px-4 py-3"
              >
                <Icon className={cn("size-5 shrink-0", TONES[item.status])} aria-hidden="true" />
                <span className="text-[14px]">{item.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
