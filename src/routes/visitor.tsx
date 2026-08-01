import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BottomNav, PhoneFrame, type VisitorTab } from "@/features/visitor/PhoneFrame";
import {
  VISITOR_SCREENS,
  VisitorScreenView,
  type VisitorScreen,
} from "@/features/visitor/VisitorScreens";
import { cn } from "@/lib/utils";

const TITLE = "Watcher Visitor App — Freshy Night 2027";
const DESCRIPTION =
  "Companion app shells for event visitors: registration, ticket print animation, home, artists, schedule, gallery and event landing.";

export const Route = createFileRoute("/visitor")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VisitorAppPage,
});

const SCREEN_TO_TAB: Partial<Record<VisitorScreen, VisitorTab>> = {
  home: "home",
  artists: "artists",
  artist: "artists",
  schedule: "schedule",
  about: "more",
  gallery: "more",
};

function VisitorAppPage() {
  const [screen, setScreen] = useState<VisitorScreen>("home");
  const tab = SCREEN_TO_TAB[screen] ?? "home";

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-[20px] font-bold">Visitor App</h1>
          <p className="text-caption text-muted-foreground truncate">
            9 screen shells · thumb-friendly 48px targets
          </p>
        </div>
        <Link
          to="/"
          className="border-border hover:bg-surface inline-flex min-h-12 items-center rounded-[var(--radius-button)] border px-4 text-[14px] font-medium"
        >
          Back to Admin
        </Link>
      </header>

      <div className="flex flex-col items-center gap-6 p-4 sm:p-6">
        <div className="flex flex-wrap justify-center gap-2">
          {VISITOR_SCREENS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setScreen(s.key)}
              className={cn(
                "min-h-12 rounded-[var(--radius-button)] px-4 text-[14px] transition-colors",
                s.key === screen
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border-border text-muted-foreground hover:bg-surface border",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <PhoneFrame>
          <div className="flex h-full flex-col">
            <div className="min-h-0 flex-1">
              <VisitorScreenView screen={screen} />
            </div>
            <BottomNav
              active={tab}
              onChange={(next) =>
                setScreen(
                  next === "home"
                    ? "home"
                    : next === "artists"
                      ? "artists"
                      : next === "schedule"
                        ? "schedule"
                        : "about",
                )
              }
            />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
