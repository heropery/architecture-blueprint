import { Bell, Plus, Smartphone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

/** Admin top header bar — page title + primary actions. */
export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b px-4 py-4 backdrop-blur-[var(--blur-glass)] sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate text-[24px] leading-tight font-bold">{title}</h1>
        <p className="text-caption text-muted-foreground truncate">
          Freshy Night 2027 · Main Stage
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/visitor"
          className="border-border hover:bg-surface inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-button)] border px-4 text-[14px] font-medium transition-colors"
        >
          <Smartphone className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">View as User</span>
        </Link>
        <Button size="sm">
          <Plus className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Quick Action</span>
        </Button>
        <button
          type="button"
          aria-label="Notifications"
          className="border-border bg-surface hover:bg-muted relative flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] border transition-colors"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="bg-danger absolute top-3 right-3 size-2 rounded-full" />
        </button>
      </div>
    </header>
  );
}
