import {
  LayoutDashboard,
  Home,
  Radio,
  GraduationCap,
  Users,
  UserCheck,
  Wrench,
  Link2,
  Calendar,
  Settings,
  Mail,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { label: string; icon: any; section?: string };

const MAIN_NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Home", icon: Home },
];

const SECONDARY_NAV: NavItem[] = [
  { label: "Live Stage", icon: Radio },
  { label: "Students", icon: GraduationCap },
  { label: "Teachers", icon: UserCheck },
  { label: "Guests", icon: Users },
];

const SYSTEM_NAV: NavItem[] = [
  { label: "Maintenance", icon: Wrench },
  { label: "Links", icon: Link2 },
  { label: "Events", icon: Calendar },
  { label: "Settings", icon: Settings },
  { label: "Contact us", icon: Mail },
];

export function AdminSidebar({
  activeNav = "Home",
  onNavSelect,
}: {
  activeNav?: string;
  onNavSelect?: (label: string) => void;
}) {
  const renderLink = (item: NavItem) => {
    const isActive = item.label === activeNav;
    return (
      <li key={item.label}>
        <button
          type="button"
          onClick={() => onNavSelect?.(item.label)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all",
            isActive
              ? "bg-white/[0.08] text-white shadow-sm"
              : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
          )}
        >
          <item.icon className="size-4 shrink-0 opacity-80" />
          <span className="truncate">{item.label}</span>
        </button>
      </li>
    );
  };

  return (
    <aside className="w-60 h-full bg-[#0F1015] border-r border-white/[0.07] p-4 flex flex-col justify-between shrink-0 select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="size-6 rounded-lg bg-white/10 flex items-center justify-center font-black text-xs text-white">
            W
          </div>
          <span className="text-base font-bold text-white tracking-tight">Watcher</span>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-5">
          <ul className="space-y-1">{MAIN_NAV.map(renderLink)}</ul>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              Main
            </p>
            <ul className="space-y-1">{SECONDARY_NAV.map(renderLink)}</ul>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              System
            </p>
            <ul className="space-y-1">{SYSTEM_NAV.map(renderLink)}</ul>
          </div>
        </nav>
      </div>

      {/* User Account Footer */}
      <div className="pt-4 border-t border-white/[0.07]">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
              👤
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">User account</p>
              <p className="text-[11px] text-zinc-500 truncate">@venccount</p>
            </div>
          </div>
          <ChevronDown className="size-3.5 text-zinc-500 shrink-0" />
        </button>
      </div>
    </aside>
  );
}

