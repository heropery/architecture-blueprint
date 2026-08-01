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
import {
  Plus,
  ExternalLink,
  Search,
  Bell,
  HelpCircle,
  Monitor,
  Users,
  CheckCircle2,
  Clock,
  Radio,
  Music2,
  Calendar,
  Sparkles,
  ChevronRight,
  Filter,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TITLE = "Watcher OS — Ultimate Command Center";
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

/** Visitors & Attendees Management View */
function VisitorsView() {
  const [filter, setFilter] = useState("all");
  const visitorsList = [
    { name: "ปุณณภา ศรีสุข", code: "VIS-8842", type: "Student", time: "18:42", status: "Checked In" },
    { name: "Kittipong W.", code: "VIS-8843", type: "Teacher", time: "18:40", status: "Checked In" },
    { name: "Areeya T.", code: "VIS-8844", type: "Guest", time: "18:38", status: "Checked In" },
    { name: "ธนกฤต บุญมี", code: "VIS-8845", type: "Student", time: "18:35", status: "Checked In" },
    { name: "Saran C.", code: "VIS-8846", type: "Student", time: "18:30", status: "Registered" },
    { name: "Dr. Somchai P.", code: "VIS-8847", type: "Teacher", time: "18:25", status: "Checked In" },
  ];

  const filtered = visitorsList.filter((v) =>
    filter === "all" ? true : v.type.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#14161B] border border-white/[0.07] p-4 rounded-2xl">
        <div>
          <h2 className="text-base font-bold text-white">Visitors Directory</h2>
          <p className="text-xs text-zinc-400">Total registered: 452 · Checked in: 432</p>
        </div>
        <div className="flex items-center gap-2">
          {["all", "student", "teacher", "guest"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1 rounded-xl text-xs font-medium capitalize transition-colors",
                filter === f
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white/[0.05] text-zinc-400 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#14161B] border border-white/[0.07] rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.07] text-zinc-400 bg-white/[0.02]">
              <th className="p-3 font-semibold">Visitor Name</th>
              <th className="p-3 font-semibold">ID Code</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Check-in Time</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {filtered.map((v) => (
              <tr key={v.code} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3 font-medium text-white flex items-center gap-2">
                  <div className="size-7 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-300 font-bold shrink-0">
                    {v.name.slice(0, 2)}
                  </div>
                  <span>{v.name}</span>
                </td>
                <td className="p-3 font-mono text-zinc-400">{v.code}</td>
                <td className="p-3">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                      v.type === "Student"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                        : v.type === "Teacher"
                        ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                        : "bg-orange-500/10 text-orange-300 border-orange-500/20"
                    )}
                  >
                    {v.type}
                  </span>
                </td>
                <td className="p-3 text-zinc-400 font-mono">{v.time}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
                    <CheckCircle2 className="size-3" />
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Performers & Lineup Management View */
function PerformersView() {
  const lineup = [
    { time: "19:00 - 19:30", name: "ArtShuu Band", status: "NOW PLAYING", genre: "Indie Pop", stage: "Main Stage" },
    { time: "19:30 - 20:10", name: "Safeplanet", status: "NEXT UP", genre: "Indie Rock", stage: "Main Stage" },
    { time: "20:10 - 20:50", name: "Nont Tanont", status: "COMING", genre: "Pop / R&B", stage: "Main Stage" },
    { time: "20:50 - 21:30", name: "Slot Machine", status: "COMING", genre: "Rock", stage: "Main Stage" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-[#14161B] border border-white/[0.07] p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Music2 className="size-5 text-purple-400" />
            StageFlow Performers Lineup
          </h2>
          <p className="text-xs text-zinc-400">Freshy Night 2027 · Main Stage Schedule</p>
        </div>
        <button
          type="button"
          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-600/20 transition-colors flex items-center gap-1.5"
        >
          <Plus className="size-3.5" />
          Add Performer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lineup.map((p) => (
          <div key={p.name} className="bg-[#14161B] border border-white/[0.07] p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">{p.time}</span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                  p.status === "NOW PLAYING"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse"
                    : p.status === "NEXT UP"
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                    : "bg-white/[0.05] text-zinc-400 border-white/[0.07]"
                )}
              >
                {p.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-base shrink-0">
                🎵
              </div>
              <div>
                <p className="text-sm font-bold text-white">{p.name}</p>
                <p className="text-xs text-zinc-400">{p.genre} · {p.stage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  const [tab, setTab] = useState<VisitorTab>("home");
  const [activeNav, setActiveNav] = useState("Dashboard");
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
            <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white">{activeNav}</h1>
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
                placeholder="Search command (Ctrl+K)..."
                className="w-full bg-[#14161B] border border-white/[0.07] rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <button
              type="button"
              className="p-2 rounded-xl bg-[#14161B] border border-white/[0.07] text-zinc-400 hover:text-white transition-colors"
              title="Help"
            >
              <HelpCircle className="size-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-xl bg-[#14161B] border border-white/[0.07] text-zinc-400 hover:text-white transition-colors relative"
              title="Notifications"
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

        {/* Dynamic View Feed Content */}
        <div className="space-y-4 flex-1">
          {activeNav === "Visitors" || activeNav === "Students" || activeNav === "Teachers" || activeNav === "Guests" ? (
            <VisitorsView />
          ) : activeNav === "Performers" || activeNav === "Live Stage" ? (
            <PerformersView />
          ) : (
            <>
              {/* Stat Cards Row */}
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
            </>
          )}
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
