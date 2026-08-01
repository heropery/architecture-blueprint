import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BentoGrid } from "@/components/bento/BentoGrid";
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
import { Eye, Plus, ExternalLink, Search, Bell, HelpCircle } from "lucide-react";

const TITLE = "Watcher OS — Command Center (Freshy Night 2027)";
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

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#0B0C0E] text-zinc-100 font-sans selection:bg-blue-500/30">
      {/* Pane 1: Left Sidebar */}
      <AdminSidebar activeNav={activeNav} onNavSelect={setActiveNav} />

      {/* Pane 2: Middle Bento Command Feed */}
      <div className="flex-1 h-full p-6 flex flex-col space-y-4 overflow-y-auto custom-scrollbar min-w-0">
        {/* Header Bar */}
        <header className="flex items-center justify-between gap-4 pb-2 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-white">Main feed</h1>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400 font-medium flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#14161B] border border-white/[0.07] rounded-xl pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50"
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
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-blue-500" />
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors"
            >
              <Plus className="size-3.5" />
              Quick Action
            </button>
          </div>
        </header>

        {/* Bento Grid Feed */}
        <div className="flex-1 space-y-4">
          {/* Top Row: Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitorsTodayCard />
            {STAT_CARDS.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Middle Row: Live Stage Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <LiveStageCard />
            </div>
            <div>
              <ScheduleCard />
            </div>
          </div>

          {/* Bottom Row: Registration Peak Analytics */}
          <div className="grid grid-cols-1 gap-4">
            <RegistrationChartCard />
          </div>
        </div>
      </div>

      {/* Pane 3: Right Detail Panel (Mobile Live Preview) */}
      <aside className="w-[380px] h-full bg-[#0F1015] border-l border-white/[0.07] p-5 flex flex-col justify-between items-center shrink-0 hidden xl:flex">
        <div className="w-full flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Detail panel</h2>
          <span className="text-xs text-zinc-600">•••</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <PhoneFrame scale={0.88}>
            <div className="flex h-full flex-col bg-[#0B0C0E]">
              <div className="min-h-0 flex-1 overflow-hidden">
                <VisitorScreenView screen={TAB_TO_SCREEN[tab]} />
              </div>
              <BottomNav active={tab} onChange={setTab} />
            </div>
          </PhoneFrame>
        </div>
      </aside>
    </div>
  );
}

