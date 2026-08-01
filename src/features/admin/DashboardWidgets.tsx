import {
  MoreHorizontal,
  TrendingUp,
  Play,
  Volume2,
  Calendar,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Capacity Donut Ring Chart */
function CapacityRing({ percent }: { percent: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-16 shrink-0">
      <svg viewBox="0 0 64 64" className="size-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#10B981"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(percent / 100) * c} ${c}`}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xs font-bold text-emerald-400 tabular-nums">
        {percent}%
      </span>
    </div>
  );
}

/** Visitors Today Card - Obsidian dark card with emerald badge & capacity ring */
export function VisitorsTodayCard() {
  return (
    <div className="bg-[#14161B] border border-white/[0.07] rounded-2xl p-5 flex items-center justify-between gap-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-zinc-400">Visitors</p>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold tracking-tight text-white">452</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
            <TrendingUp className="size-3" />
            +23.5%
          </span>
        </div>
      </div>
      <CapacityRing percent={53} />
    </div>
  );
}

export const STAT_CARDS = [
  {
    label: "Students",
    value: "320",
    pillBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    label: "Teachers",
    value: "58",
    pillBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    label: "Guests",
    value: "54",
    pillBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
];

/** Dark Stat Card with subtle pill badges */
export function StatCard({ label, value, pillBg }: (typeof STAT_CARDS)[number]) {
  return (
    <div className="bg-[#14161B] border border-white/[0.07] rounded-2xl p-5 flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-zinc-400">{label}</p>
        <span className={cn("px-2.5 py-0.5 rounded-full border text-xs font-semibold tabular-nums", pillBg)}>
          {value}
        </span>
      </div>
      <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
    </div>
  );
}

/** Live Stage Bento Card */
export function LiveStageCard() {
  return (
    <div className="bg-[#14161B] border border-white/[0.07] rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Live Stage</h2>
        <span className="text-xs text-zinc-500">•••</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0B0C0E]/50 border border-white/[0.05] p-4 rounded-xl">
        <div className="size-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-pink-500/10">
          🎵
        </div>
        <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
          <p className="text-base font-bold text-white truncate">Performing Artist</p>
          <p className="text-xs text-zinc-400 truncate">Current performing artist · 2ottago</p>

          {/* Waveform & playback bar */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="size-7 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
            >
              <Play className="size-3.5 fill-current translate-x-0.5" />
            </button>
            <div className="flex-1 flex items-center gap-0.5 h-6">
              {[40, 60, 30, 80, 100, 70, 40, 90, 60, 30, 70, 80, 50, 90, 40, 70, 100, 60, 30, 80, 50, 70, 40].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full bg-white/30 hover:bg-white transition-colors"
                    style={{ height: `${h}%` }}
                  />
                )
              )}
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">0:09</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCHEDULE_ITEMS = [
  { time: "7:00pm - 2:30pm", name: "Altena", tag: "Coben" },
  { time: "8:30 pm", name: "First tatch", tag: null },
  { time: "7:30 pm", name: "Performing", tag: null },
  { time: "Wistonerly", name: "Registration", tag: null },
];

/** Next Up Schedule Card */
export function ScheduleCard() {
  return (
    <div className="bg-[#14161B] border border-white/[0.07] rounded-2xl p-5 space-y-3 h-full">
      <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">next up</h2>
      <div className="space-y-2">
        {SCHEDULE_ITEMS.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 shrink-0">
                {idx === 0 ? "🎤" : idx === 1 ? "👜" : idx === 2 ? "🕒" : "⏱️"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                <p className="text-[11px] text-zinc-500 truncate">{item.time}</p>
              </div>
            </div>
            {item.tag && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-medium border border-amber-500/20">
                {item.tag}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const HOURLY_DATA = [
  { h: "00", v: 20 },
  { h: "01", v: 35 },
  { h: "02", v: 50 },
  { h: "03", v: 90 },
  { h: "04", v: 130 },
  { h: "05", v: 180 },
  { h: "06", v: 150 },
  { h: "07", v: 110 },
  { h: "08", v: 140 },
  { h: "09", v: 95 },
  { h: "10", v: 70 },
  { h: "112", v: 40 },
  { h: "13", v: 25 },
];

/** Hourly Peak Registration Bar Chart Card */
export function RegistrationChartCard() {
  const max = 200;
  return (
    <div className="bg-[#14161B] border border-white/[0.07] rounded-2xl p-5 space-y-4">
      <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">hourly peak registration</h2>
      <div className="h-36 flex items-end gap-2 pt-4 border-b border-white/[0.05] pb-2">
        {HOURLY_DATA.map((bar) => (
          <div key={bar.h} className="flex-1 flex flex-col items-center gap-2 group">
            <div
              className="w-full bg-zinc-700/60 group-hover:bg-blue-500 rounded-t transition-colors"
              style={{ height: `${(bar.v / max) * 100}%` }}
            />
            <span className="text-[10px] text-zinc-500 font-mono">{bar.h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

