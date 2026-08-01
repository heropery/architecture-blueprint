import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Music2,
  Star,
  Ticket,
  Youtube,
} from "lucide-react";
import { DURATION, EASE_OUT } from "@/constants/motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { cn } from "@/lib/utils";

export const VISITOR_SCREENS = [
  { key: "register", label: "Registration" },
  { key: "ticket", label: "Ticket Print" },
  { key: "home", label: "Home" },
  { key: "artist", label: "Artist Detail" },
  { key: "artists", label: "All Artists" },
  { key: "schedule", label: "Schedule" },
  { key: "gallery", label: "Gallery" },
  { key: "about", label: "About Event" },
  { key: "menu", label: "Drawer Menu" },
] as const;

export type VisitorScreen = (typeof VISITOR_SCREENS)[number]["key"];

const CATEGORIES = [
  "นักเรียน",
  "นักศึกษา",
  "ครู",
  "อาจารย์",
  "ผู้ปกครอง",
  "บุคคลทั่วไป",
  "VIP",
];

const Screen = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex h-full flex-col gap-4 overflow-y-auto p-5 pt-12", className)}>
    {children}
  </div>
);

function RegistrationScreen() {
  return (
    <Screen>
      <div className="text-center">
        <p className="text-caption text-muted-foreground">Freshy Night 2027</p>
        <h2 className="text-[24px] font-bold">ลงทะเบียนเข้างาน</h2>
      </div>
      <Input label="ชื่อจริง" placeholder="กรอกชื่อจริง" />
      <Input label="ชื่อเล่น" placeholder="กรอกชื่อเล่น" />
      <div>
        <p className="text-caption text-muted-foreground mb-2">ประเภทผู้เข้าร่วม</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c, i) => (
            <span
              key={c}
              className={cn(
                "text-caption rounded-full px-4 py-2",
                i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <Button fullWidth className="mt-auto">
        Confirm
      </Button>
    </Screen>
  );
}

function TicketScreen() {
  const pref = useMotionPreference();
  return (
    <Screen className="items-center justify-center">
      <div className="bg-surface border-border w-full overflow-hidden rounded-[var(--radius-card)] border">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: pref.duration(DURATION.story), ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <div className="p-6 text-center">
            <Ticket className="text-primary mx-auto size-8" aria-hidden="true" />
            <p className="text-caption text-muted-foreground mt-3">ADMISSION TICKET</p>
            <p className="mt-1 text-[24px] font-bold">ปุณณภา</p>
            <Badge tone="success" className="mt-2">
              ✓ Registered
            </Badge>
            <div className="bg-background mx-auto mt-5 grid size-28 place-items-center rounded-[16px]">
              <span className="text-caption text-muted-foreground">QR</span>
            </div>
          </div>
        </motion.div>
      </div>
      <p className="text-caption text-muted-foreground mt-4">Tap anywhere to continue</p>
    </Screen>
  );
}

function HomeScreen() {
  return (
    <Screen>
      <div className="from-primary/30 to-secondary/30 grid aspect-[16/9] place-items-center rounded-[var(--radius-card)] bg-gradient-to-br">
        <span className="text-caption text-muted-foreground">Hero Banner 16:9</span>
      </div>
      <div className="border-primary/30 bg-primary/10 rounded-[var(--radius-card)] border p-4">
        <Badge tone="success">● NOW PLAYING</Badge>
        <p className="mt-2 text-[18px] font-bold">ArtShuu Band</p>
        <p className="text-muted-foreground text-[13px]">คิดถึงเธอทุกวินาที · 02:31</p>
      </div>
      <div>
        <p className="text-caption text-muted-foreground mb-2">คิวถัดไป</p>
        <ul className="flex flex-col gap-2">
          {["Safeplanet · 19:30", "Nont Tanont · 20:10", "Slot Machine · 20:50"].map((q) => (
            <li
              key={q}
              className="border-border flex min-h-12 items-center justify-between rounded-[var(--radius-button)] border px-4 text-[14px]"
            >
              <span className="truncate">{q}</span>
              <ArrowRight className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-muted aspect-square rounded-[12px]" />
        ))}
      </div>
    </Screen>
  );
}

function ArtistDetailScreen() {
  return (
    <Screen className="p-0 pt-0">
      <div className="from-secondary/40 to-primary/20 grid aspect-square w-full shrink-0 place-items-center bg-gradient-to-br">
        <span className="text-caption text-muted-foreground">Artist Cover 1:1</span>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <h2 className="text-[24px] font-bold">ArtShuu Band</h2>
          <p className="text-muted-foreground text-[14px]">Indie Pop · Bangkok</p>
        </div>
        <div>
          <p className="text-caption text-muted-foreground mb-2">Band Members</p>
          <div className="flex gap-2">
            {["A", "R", "T", "S"].map((m) => (
              <div key={m} className="bg-muted grid size-12 place-items-center rounded-full text-[14px]">
                {m}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-caption text-muted-foreground mb-2">Song List</p>
          <ul className="flex flex-col gap-2">
            {["คิดถึงเธอทุกวินาที", "ปลายทาง", "แสงสุดท้าย"].map((s, i) => (
              <li
                key={s}
                className={cn(
                  "flex min-h-12 items-center gap-2 rounded-[var(--radius-button)] px-4 text-[14px]",
                  i === 0 ? "bg-primary/15 text-primary font-semibold" : "border-border border",
                )}
              >
                {i === 0 && <Music2 className="size-4 shrink-0" aria-hidden="true" />}
                <span className="truncate">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          {[Facebook, Instagram, Youtube, Globe].map((Icon, i) => (
            <div
              key={i}
              className="border-border grid size-12 place-items-center rounded-full border"
            >
              <Icon className="size-4" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function AllArtistsScreen() {
  return (
    <Screen>
      <h2 className="text-[24px] font-bold">Artists</h2>
      <ul className="flex flex-col gap-3">
        {["ArtShuu Band", "Safeplanet", "Nont Tanont", "Slot Machine", "The Wanderers"].map((a) => (
          <li key={a} className="border-border flex items-center gap-3 rounded-[var(--radius-card)] border p-3">
            <div className="from-secondary/40 to-primary/20 size-14 shrink-0 rounded-[16px] bg-gradient-to-br" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold">{a}</p>
              <p className="text-caption text-muted-foreground">Main Stage</p>
            </div>
            <ArrowRight className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function ScheduleScreen() {
  const rows = [
    { t: "18:00", n: "Opening Ceremony", s: "done" },
    { t: "18:40", n: "The Wanderers", s: "done" },
    { t: "19:00", n: "ArtShuu Band", s: "now" },
    { t: "19:30", n: "Safeplanet", s: "next" },
    { t: "20:10", n: "Nont Tanont", s: "coming" },
    { t: "20:50", n: "Slot Machine", s: "coming" },
  ];
  return (
    <Screen>
      <h2 className="text-[24px] font-bold">Schedule</h2>
      <ol className="flex flex-col">
        {rows.map((r) => (
          <li key={r.t} className="flex gap-4">
            <span className="text-caption text-muted-foreground w-12 shrink-0 pt-4 tabular-nums">
              {r.t}
            </span>
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-5 size-3 shrink-0 rounded-full",
                  r.s === "now" ? "bg-primary animate-pulse" : r.s === "done" ? "bg-muted" : "bg-secondary",
                )}
              />
              <span className="bg-border w-px flex-1" />
            </div>
            <div className="min-w-0 flex-1 py-3">
              <div
                className={cn(
                  "rounded-[var(--radius-button)] px-4 py-3",
                  r.s === "now" ? "bg-primary/15 text-primary font-semibold" : "border-border border",
                )}
              >
                <span className="block truncate text-[14px]">{r.n}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Screen>
  );
}

function GalleryScreen() {
  return (
    <Screen>
      <h2 className="text-[24px] font-bold">Gallery</h2>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <figure key={i} className="bg-surface border-border rounded-[12px] border p-2 pb-6">
            <div className="bg-muted aspect-[4/3] rounded-[8px]" />
            <figcaption className="text-caption text-muted-foreground mt-2 truncate">
              Moment #{i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </Screen>
  );
}

function AboutScreen() {
  return (
    <Screen>
      <h2 className="text-[24px] font-bold">About Event</h2>
      <div className="border-border rounded-[var(--radius-card)] border p-5">
        <p className="text-[14px] leading-relaxed">
          Freshy Night 2027 — คอนเสิร์ตต้อนรับน้องใหม่ พร้อมศิลปินรับเชิญตลอดค่ำคืน
        </p>
      </div>
      <div className="border-border rounded-[var(--radius-card)] border p-4">
        <div className="flex items-center gap-2">
          <Star className="text-warning size-4" aria-hidden="true" />
          <p className="text-[14px] font-semibold">Sponsors</p>
        </div>
        <div className="from-primary/20 to-secondary/20 mt-3 grid aspect-[4/1] place-items-center rounded-[12px] bg-gradient-to-r">
          <span className="text-caption text-muted-foreground">Sponsor Banner</span>
        </div>
      </div>
      <Button fullWidth className="mt-auto">
        <ExternalLink className="size-4" aria-hidden="true" />
        Open Event Website
      </Button>
    </Screen>
  );
}

function DrawerMenuScreen() {
  return (
    <div className="relative h-full">
      <div className="pointer-events-none opacity-40">
        <HomeScreen />
      </div>
      <div className="absolute inset-0 grid place-items-center bg-black/50 p-5">
        <div className="glass-surface elevation w-full rounded-[var(--radius-dialog)] p-6">
          <p className="text-heading-m mb-4">Menu</p>
          <nav className="flex flex-col gap-2">
            {["Home", "Artists", "Schedule", "Gallery", "About Event", "My Ticket"].map((m) => (
              <button
                key={m}
                type="button"
                className="hover:bg-muted flex min-h-12 items-center rounded-[var(--radius-button)] px-4 text-left text-[14px]"
              >
                {m}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export function VisitorScreenView({ screen }: { screen: VisitorScreen }) {
  switch (screen) {
    case "register":
      return <RegistrationScreen />;
    case "ticket":
      return <TicketScreen />;
    case "artist":
      return <ArtistDetailScreen />;
    case "artists":
      return <AllArtistsScreen />;
    case "schedule":
      return <ScheduleScreen />;
    case "gallery":
      return <GalleryScreen />;
    case "about":
      return <AboutScreen />;
    case "menu":
      return <DrawerMenuScreen />;
    default:
      return <HomeScreen />;
  }
}
