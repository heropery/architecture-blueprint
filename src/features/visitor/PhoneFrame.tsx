import { Home, Music2, CalendarDays, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const VISITOR_TABS = [
  { key: "home", label: "Home", icon: Home },
  { key: "artists", label: "Artists", icon: Music2 },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "more", label: "More", icon: MoreHorizontal },
] as const;

export type VisitorTab = (typeof VISITOR_TABS)[number]["key"];

/** iPhone-style device frame used by both the admin live preview and the visitor shell. */
export function PhoneFrame({
  children,
  className,
  scale = 1,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[390px] shrink-0 rounded-[52px] border-[3px] border-[rgba(255,255,255,0.14)] bg-[#1b1c22] p-[10px]",
        className,
      )}
      style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
    >
      <div
        className="bg-background relative overflow-hidden rounded-[42px]"
        style={{ height: 824 }}
      >
        {/* Dynamic Island */}
        <div className="pointer-events-none absolute top-3 left-1/2 z-30 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full overflow-hidden pt-2">{children}</div>
        {/* iOS Home Indicator */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/70" />
      </div>
    </div>
  );
}


export function BottomNav({
  active,
  onChange,
}: {
  active: VisitorTab;
  onChange: (tab: VisitorTab) => void;
}) {
  return (
    <nav className="border-border bg-surface/95 flex h-[92px] shrink-0 items-start border-t pt-2 pb-5 backdrop-blur-[var(--blur-glass)]">
      {VISITOR_TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex min-h-12 flex-1 flex-col items-center justify-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <tab.icon className="size-5" aria-hidden="true" />
            <span className="text-caption">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
