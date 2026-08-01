# M0 — Architecture Lock Report (Watcher Event OS v1.0)

Sources read: `00_START_HERE.md`, `README.md`, all 42 files in `docs/`, both files in `prompts/`.
Locked decisions from your answers: Glass Blur **24px everywhere**, **7 visitor categories**, StageFlow **adapter + `queue_cache` now**, routing stays **TanStack Start**.

No production code is written by this report. Approval unlocks M1 (Design System only).

---

## 1. Folder Structure & Module Boundaries

`33_FOLDER_STRUCTURE.md` is honoured verbatim except `src/app/` and the route-config file, which TanStack Start replaces with file-based routing in `src/routes/`. Providers move to `src/providers/` (already in the spec) and mount in `__root.tsx`.

```text
src/
├── routes/          # file-based routing (TanStack) — replaces src/app + route config
├── layouts/         # AdminBentoLayout, VisitorVerticalLayout
├── components/
│   ├── ui/ layout/ navigation/ feedback/ motion/ bento/ glass/
│   └── cards/ forms/ dialogs/ preview/ ticket/ gallery/
├── features/        # dashboard registration artists queue gallery landing
│                    # sponsor analytics export stageflow settings
├── lib/ hooks/ services/ stores/ providers/ types/
├── assets/ styles/ utils/ constants/
```

**Boundaries (enforced, from spec §3):** a feature never imports another feature. Cross-feature communication goes through `src/services/*` or a hook in `src/hooks/*`. Components are feature-agnostic. Absolute `@/` imports only. Components `PascalCase`, hooks/utils `camelCase`, routes `kebab-case`.

**Server boundary (stack requirement):** all Supabase writes and StageFlow calls run through `createServerFn` in `*.functions.ts` under `src/services/`; `*.server.ts` holds server-only helpers. Docs describe REST `/v1/event/:eventId` — this is preserved as the *service-layer contract naming*; transport is TanStack server functions, plus real server routes under `src/routes/api/public/*` only where an external caller needs raw HTTP (StageFlow webhook, export callback).

---

## 2. Full Route Tree

```text
/                         Landing entry (external redirect per 18_LANDING)
/auth                     Google OAuth (public)
/e/$eventSlug             Visitor shell (public, vertical flow)
  ├── /e/$eventSlug/register        Step 2 — registration form
  ├── /e/$eventSlug/ticket          Step 3 — 4-stage print motion
  ├── /e/$eventSlug/home            Step 4 — visitor home
  ├── /e/$eventSlug/schedule        Step 5 — live queue timeline
  ├── /e/$eventSlug/artist/$id      Step 6 — artist bottom sheet route
  ├── /e/$eventSlug/gallery         Step 7 — polaroid grid + lightbox
  └── /e/$eventSlug/about           Step 8 — about + external landing button
_authenticated/                     managed auth gate (ssr:false)
  ├── /dashboard                    Admin Bento Dashboard (all 10 cards, one screen)
  ├── /events                       Event list / create
  └── /settings                     Event theme, StageFlow pairing, security
api/public/stageflow/$eventId       read-only sync ingress (signature verified)
```

Step 1 (Scan QR) is the physical QR pointing at `/e/$eventSlug`. Visitor routes are public and SSR-on so OG metadata works; admin routes live under `_authenticated/`. Each route gets its own `head()` metadata. Admin uses **one** dashboard route — no sub-pages, no sidebar, no mega menu; the Glass Drawer navigates between visitor-preview contexts and settings only.

---

## 3. Database Tables & RLS Strategy

Tables exactly as `04_DATABASE_SCHEMA.md` §5: `users`, `events`, `registrations`, `artists`, `songs`, `galleries`, `gallery_images`, `sponsors`, `landing_links`, `analytics`, `activity_logs`, `queue_cache`.

Two additions required for correctness, no spec changes:

- `event_members(event_id, user_id, role)` — the spec grants Admin access to "assigned events" but defines no assignment table. Roles live in this separate table, never on `users`/`profiles`.
- `has_event_role(_event_id, _user_id, _role)` — `SECURITY DEFINER` function so policies never recurse.

`registrations.category` enum locked to the 7 values from `21_USER_APP.md`: student, university_student, teacher, lecturer, parent, general, vip.

**RLS strategy (per `29_SECURITY.md`):** RLS on every table; each migration includes `GRANT` statements alongside the policies.


| Audience                | Read                                                                                                                                   | Write                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Owner                   | everything in own events                                                                                                               | everything                      |
| Admin (`event_members`) | assigned events                                                                                                                        | content tables only             |
| Visitor (anon)          | `events`, `artists`, `songs`, `galleries`, `gallery_images`, `sponsors`, `landing_links`, `queue_cache` — published rows, safe columns | insert own `registrations` only |


`registrations`, `analytics`, `activity_logs` have **no anon read policy**. A visitor retrieves only their own ticket, by `qr_token`, through a server function — never a broad anon select. Every table carries `event_id` and is indexed on `event_id`, `owner_id`, `created_at`, `ticket_number`, `category`.

Storage buckets `events/ artists/ gallery/ sponsors/ tickets/ branding/`, pathed `event-id/...`, 10MB cap, PNG/JPG/WEBP/SVG, client-side ratio validation per the `11_ASSET_SPECIFICATION.md` matrix.

---

## 4. Component Hierarchy & Design Tokens

**Hierarchy (from `08_COMPONENT_LIBRARY.md` + `WATCHER-UI-MAP-001.md`):**

```text
Foundation   Button(Primary|Secondary|Ghost|Danger) Card Input Badge Skeleton EmptyState
Navigation   HamburgerButton GlassmorphismDrawerNav BottomNavigation TopBar
Motion       FadeIn SlideUp ScaleIn SpringDrop PageTransition ScrollRise
Bento        BentoGridContainer BentoCard KPIStatCard
Glass        GlassCard GlassDialog BottomSheet
Cards        ArtistCard GalleryCard SponsorCard LivePerformanceCard
Data         QueueTimeline RegistrationChart ActivityLog
Ticket       TicketCard PrinterGraphic ReceiptAnimationContainer TapAnywhereCTA
Gallery      PolaroidPhotoGrid LightboxModal PhotoCaptionContainer
Preview      MobileLivePreviewContainer
Dialogs      QRCodeModal ConfirmDialog
Feedback     Toast(2500ms, 4 states)
```

**Tokens** (`07_DESIGN_SYSTEM.md`, exposed as CSS custom properties + Tailwind theme; dark default, purple/blue minimal):

- Colors: bg `#09090B`, surface `#18181B`, primary `#3B82F6`, secondary `#8B5CF6`, success `#22C55E`, danger `#EF4444`, warning `#F59E0B`, glass base `rgba(24,24,27,0.70)`, glass border `1px rgba(255,255,255,0.10)`
- Glass: **blur 24px**, opacity 70% — Drawer, Dialog, Bottom Sheet, Popup only. Never app-wide.
- Radius: card **24px**, button 16px, glass dialog 28px
- Shadow: `0 8px 30px rgba(0,0,0,0.35)`
- Type: Display XL 48/1.1/800, Display L 36/1.2/700, Heading M 24/1.3/600, Body 16/1.5/400, Caption 12/1.4/500
- Spacing: 8pt grid; touch target ≥48×48px; bottom nav 72px
- Motion: fast 150 / normal 250 / medium 400 / slow 700 / story 900ms; `easeOut`; spring `stiffness 300, damping 25`; drawer 280ms scale 95→100%; bento scroll rise Y 24px; sponsor auto-slide 5s; shimmer 1.2s; `prefers-reduced-motion` → 100ms instant fade
- Breakpoints: ≥1280 full bento + side-by-side preview / 768–1279 two columns / <768 single column vertical
- Icons: Lucide only, per the `31_BRANDING_GUIDE.md` mapping

Framer Motion is the sole animation library. No Lottie, no standalone CSS keyframes.

---

## 5. State Management (Zustand)

Six stores exactly as specified, plus TanStack Query for all server data (already in the template). Zustand holds client/UI state only; it never mirrors query cache.


| Store            | Owns                                                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `authStore`      | session, current user, role in active event                                                                                              |
| `eventStore`     | active `event_id`, slug, theme JSON tokens, live preview form draft                                                                      |
| `artistStore`    | artist ordering/drag state, selected artist sheet                                                                                        |
| `galleryStore`   | lightbox index, upload queue, sort order                                                                                                 |
| `queueStore`     | StageFlow snapshot (NOW/NEXT/COMING, current song, remaining time, `lastSync`, connection status) — **written only by the sync adapter** |
| `analyticsStore` | chart range and filter selections                                                                                                        |


Drawer/sheet/toast open-state is local component state, not global.

---

## 6. StageFlow Sync (Read-Only Consumer)

Watcher never creates a queue and never runs a countdown timer. `queueStore` renders whatever the last snapshot said; any remaining-time display interpolates from StageFlow's own `remaining_time` + `last_sync` and stops at zero rather than counting on its own clock.

```text
StageFlow ──room code/QR pairing──▶ events.stageflow_room
StageFlow ──push──▶ /api/public/stageflow/$eventId ──▶ queue_cache (upsert)
queue_cache ──Supabase Realtime channel──▶ queueStore ──▶ Live cards
fallback: poll GET stageflow/live every 3s when the channel drops
```

- Adapter interface `StageFlowAdapter` in `src/services/stageflow.functions.ts`; base URL and key arrive later as secrets. Until then it is wired to `queue_cache` only, so the UI is complete and real data flips on without code changes.
- Single writer: `queue_cache`. No client anywhere issues a StageFlow mutation — enforced by the adapter exposing read methods only.
- Degradation: channel down → 3s polling; sync stale → `Last Updated N min ago` banner; never a blank Live card. Admin can Disconnect at any time.
- Target delay <500ms; song change re-highlights the artist song list without a refresh.

---

## 7. Risks & Technical Assumptions

1. **Lovable Cloud is not enabled yet.** Nothing in §3 exists until it is. First action of M3 (not M0) is enabling it and running the schema migration.
2. **StageFlow contract is unknown.** Room-code format, auth, payload shape and push-vs-pull are unspecified. The adapter is the isolation seam; a wrong guess costs one file, not the app.
3. **Docs 13, 16, 17, 18, 20, 22–27, 30, 34–37 are boilerplate** — same ten sections with the title swapped, no feature-specific rules. Those screens are built from `WATCHER-UI-MAP-001.md` and `21_USER_APP.md`. I will ask before inventing behaviour rather than filling the gaps myself.
4. **Errata recorded, not silently applied:** 08/12 say Blur 28px — overridden to 24px per your decision. 04/28 list 5 categories — overridden to 7. `08_COMPONENT_LIBRARY.md` card shadow `0.12` vs `07_DESIGN_SYSTEM.md` `0.35` — using 0.35 (the token doc wins).
5. **"Every table must have `owner_id`"** (29 §4.1) conflicts with the schema in 04, where ownership is reached via `event_id → events.owner_id`. Implementing the join form; adding `owner_id` everywhere would denormalise and risk drift.
6. **Google Sheets export needs OAuth credentials** from you at M9.
7. **50,000-record export in <5s** is not achievable in-browser; it will stream server-side in batches.
8. **Assumption:** the spec set will be committed into `docs/` and `prompts/` in this repo as the single source of truth, so every later milestone cites a file path.

---

## Deliverable of this milestone

Approving this report locks §1–§6 and unblocks **M1: Design System & Tokens only** — theme, CSS variables, atomic components, motion wrappers and layout primitives. No dashboard, no visitor screens, no backend.  
  
M0 Architecture Lock Report APPROVED! 

Proceed to Milestone 1 (M1: Design System & Tokens only):

1. Setup Tailwind Theme Config and CSS Custom Variables for Colors, Typography Scale, Glass Blur (24px), Card Radius (24px), and 8pt Spacing Grid per docs/07_DESIGN_[SYSTEM.md](http://SYSTEM.md).

2. Build Atomic UI Components in src/components/ui/ (Buttons, Glass Card, Input, Toast, Badge, Skeleton Loader).

3. Build Framer Motion Wrappers in src/components/motion/ (FadeIn, SlideUp, ScaleIn, SpringDrop).

4. Build Layout Primitives in src/components/layout/ (Container, Bento Grid Shell, Navigation Glass Drawer).

Do not build any dashboard, visitor screens, or backend endpoints yet.