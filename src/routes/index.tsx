import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { AdminHeader } from "@/features/admin/AdminHeader";
import { GlassDrawer, HamburgerButton } from "@/components/navigation/GlassDrawer";
import {
  AnnouncementsCard,
  ExportCard,
  LiveStageCard,
  RecentCheckinsCard,
  RegistrationChartCard,
  STAT_CARDS,
  ScheduleCard,
  SponsorBannerCard,
  StageFlowSyncCard,
  StatCard,
  VisitorsTodayCard,
} from "@/features/admin/DashboardWidgets";
import { BottomNav, PhoneFrame, type VisitorTab } from "@/features/visitor/PhoneFrame";
import { VisitorScreenView, type VisitorScreen } from "@/features/visitor/VisitorScreens";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Radio,
  Music2,
  CalendarDays,
  Image as ImageIcon,
  Star,
  Download,
  Settings,
  History,
  Smartphone,
} from "lucide-react";

const TITLE = "Watcher OS — Event Command Center";
const DESCRIPTION =
  "Spec-compliant Watcher Bento Command Center: fixed header, live StageFlow queue, registration analytics, and realtime visitor app preview.";

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

const DRAWER_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Visitors Directory", icon: Users, path: "/" },
  { label: "Registration", icon: UserPlus, path: "/" },
  { label: "StageFlow Connect", icon: Radio, path: "/" },
  { label: "Performers Lineup", icon: Music2, path: "/" },
  { label: "Event Schedule", icon: CalendarDays, path: "/" },
  { label: "Gallery Manager", icon: ImageIcon, path: "/" },
  { label: "Sponsor Banners", icon: Star, path: "/" },
  { label: "Export Engine", icon: Download, path: "/" },
  { label: "Settings", icon: Settings, path: "/" },
  { label: "Activity Log", icon: History, path: "/" },
];

function AdminDashboardPage() {
  const [tab, setTab] = useState<VisitorTab>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-background text-foreground h-screen w-screen overflow-hidden flex flex-col font-sans">
      {/* Top Header Bar with Hamburger Button */}
      <header className="border-border bg-background/80 sticky top-0 z-30 flex items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur-[var(--blur-glass)] sm:px-6 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger Button — Open Glass Drawer (docs/12_ADMIN_DASHBOARD.md §5.1) */}
          <HamburgerButton onClick={() => setDrawerOpen(true)} />
          <div className="min-w-0">
            <h1 className="truncate text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Watcher Command Center
            </h1>
            <p className="text-caption text-muted-foreground truncate">
              Freshy Night 2027 · Main Stage Live
            </p>
          </div>
        </div>

        <AdminHeader title="" />
      </header>

      {/* Main Content Area: Bento Grid (Left) + Mobile Live Preview (Right) */}
      <main className="flex-1 flex min-h-0 overflow-y-auto p-4 sm:p-6 gap-6 custom-scrollbar">
        {/* Left Side: Bento Grid Dashboard Cards */}
        <div className="flex-1 min-w-0">
          <BentoGrid className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <VisitorsTodayCard />
            {STAT_CARDS.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
            <LiveStageCard />
            <ScheduleCard />
            <RegistrationChartCard />
            <StageFlowSyncCard />
            <ExportCard />
            <RecentCheckinsCard />
            <AnnouncementsCard />
            <SponsorBannerCard />
          </BentoGrid>
        </div>

        {/* Right Side: Live Mobile Preview Container (PhoneFrame) */}
        <aside className="hidden 2xl:block shrink-0 w-[380px]">
          <div className="sticky top-0 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-caption text-muted-foreground uppercase font-semibold tracking-wider">
                Mobile Live Preview
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Stream
              </span>
            </div>

            <PhoneFrame scale={0.88}>
              <div className="flex h-full flex-col bg-background">
                <div className="min-h-0 flex-1 overflow-hidden">
                  <VisitorScreenView screen={TAB_TO_SCREEN[tab]} />
                </div>
                <BottomNav active={tab} onChange={setTab} />
              </div>
            </PhoneFrame>
          </div>
        </aside>
      </main>

      {/* Navigation Glass Drawer (Blur 24px, Opacity 70%, Scale 95% -> 100%, 280ms) */}
      <GlassDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Watcher Navigation"
      >
        <div className="space-y-1">
          {DRAWER_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="flex min-h-11 w-full items-center gap-3 rounded-[var(--radius-button)] px-3 text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <item.icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </GlassDrawer>
    </div>
  );
}
