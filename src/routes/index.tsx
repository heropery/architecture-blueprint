import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AdminSidebar,
} from "@/features/admin/AdminSidebar";
import {
  LiveStageCard,
  RegistrationChartCard,
  STAT_CARDS,
  ScheduleCard,
  StatCard,
  VisitorsTodayCard,
} from "@/features/admin/DashboardWidgets";
import { BottomNav, PhoneFrame, type VisitorTab } from "@/features/visitor/PhoneFrame";
import { VisitorScreenView, type VisitorScreen } from "@/features/visitor/VisitorScreens";
import { Plus, ExternalLink, Search, Bell, HelpCircle, LayoutGrid, Monitor } from "lucide-react";

const TITLE = "Watcher OS — Command Center";
const DESCRIPTION =
  "Zero-scroll 100vh three-pane command center: live StageFlow queue, registration analytics, and realtime visitor app preview.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AdminDashboardPage,
});

const TAB_TO_SCREEN: Record<VisitorTab, VisitorScreen> = {
  home: "home",
  artists: "artists",
  schedule: "schedule",
  more: "about",
};

function AdminDashboardPage() {
  const [tab, setTab] = useState<VisitorTab>("home");
  const [activeNav, setActiveNav] = useState("Home");
  const [showDetailPanel, setShowDetailPanel] = useState(true);

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#0B0C0E] text-zinc-100 font-sans selection:bg-blue-500/30">
      {/* Pane 1: Left Sidebar */}
      <AdminSidebar activeNav={activeNav} onNavSelect={setActiveNav} />

      {/* Pane 2: Middle Bento Command Feed */}
      <main className="flex-1 h-full p-4 lg:p-6 flex flex-col space-y-4 overflow-y-auto min-w-0 custom-scrollbar">
        {/* Header Bar */}
        <header className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.07] shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white">Main feed</h1>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-40 md:w-56 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#14161B] border border-white/[0.07] rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <button
              type="button"
              className="p-2 rounded-xl bg-[#14161B] border border-white/[0.07] text-zinc-400 hover:text-white transition-colors"
            >
              <HelpCircle className="size-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-xl bg-[#14161B] border border-white/[0.07] text-zinc-400 hover:text-white transition-colors relative"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-blue-500" />
            </button>
            <button
              type="button"
              onClick={() => setShowDetailPanel((v) => !v)}
              className="hidden lg:flex p-2 rounded-xl bg-[#14161B] border border-white/[0.07] text-zinc-400 hover:text-white transition-colors"
              title="Toggle Mobile Detail Panel"
            >
              <Monitor className="size-4" />
            </button>
            <a
              href="/visitor"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.07] text-xs font-medium text-zinc-300 transition-colors"
            >
              <ExternalLink className="size-3.5" />
              View as User
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors shrink-0"
            >
              <Plus className="size-3.5" />
              Quick Action
            </button>
          </div>
        </header>

        {/* Bento Feed Content */}
        <div className="space-y-4 flex-1">
          {/* Stat Cards Row: 2 columns on small screens, 4 columns on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
            <VisitorsTodayCard />
            {STAT_CARDS.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Live Stage & Schedule Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
            <div className="lg:col-span-2">
              <LiveStageCard />
            </div>
            <div>
              <ScheduleCard />
            </div>
          </div>

          {/* Registration Peak Analytics */}
          <div>
            <RegistrationChartCard />
          </div>
        </div>
      </main>

      {/* Pane 3: Right Detail Panel (Mobile Live Preview) */}
      {showDetailPanel && (
        <aside className="w-[320px] xl:w-[360px] h-full bg-[#0F1015] border-l border-white/[0.07] p-4 flex flex-col justify-between items-center shrink-0 hidden lg:flex">
          <div className="w-full flex items-center justify-between mb-1">
            <h2 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Detail panel</h2>
            <span className="text-xs text-zinc-600">•••</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
            <PhoneFrame scale={0.78}>
              <div className="flex h-full flex-col bg-[#0B0C0E]">
                <div className="min-h-0 flex-1 overflow-hidden">
                  <VisitorScreenView screen={TAB_TO_SCREEN[tab]} />
                </div>
                <BottomNav active={tab} onChange={setTab} />
              </div>
            </PhoneFrame>
          </div>
        </aside>
      )}
    </div>
  );
}


