# 33 — Project Folder Structure (WATCHER-FOLDER-001)

## Document Information
* **Document ID**: `WATCHER-FOLDER-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดสเปกโครงสร้างไฟล์โปรเจกต์ (Project Structure Specification) สำหรับ React + Vite + TypeScript + Tailwind CSS บน Lovable / Cursor โดยยึดปรัชญา **Feature-First Architecture** แยกการทำงานตามฟีเจอร์ ไม่แยกตามประเภทไฟล์

---

## 2. Root Architecture Hierarchy

```text
src/
├── app/                  # Application initialization & Providers
├── routes/               # App routing configuration
├── layouts/              # Admin Layout (Bento) & Visitor Layout (Vertical)
├── components/           # Reusable Atomic Components
│   ├── ui/               # Primary Buttons, Cards, Inputs
│   ├── layout/           # Containers, Section Dividers
│   ├── navigation/       # Glass Drawer, Top Bar, Hamburger
│   ├── feedback/         # Toast, Badges, Alert Banners
│   ├── motion/           # Framer Motion Wrappers
│   ├── bento/            # Bento Grid & Bento Card Components
│   ├── glass/            # Glassmorphism Cards & Modals
│   ├── cards/            # Artist, Gallery & Sponsor Cards
│   ├── forms/            # Registration & Asset Upload Forms
│   ├── dialogs/          # QR Modal, Confirmation Modals
│   ├── preview/          # Live Mobile Device Preview Frame
│   ├── ticket/           # Ticket Card & Receipt Print Animation
│   └── gallery/          # Polaroid Photo Grid & Lightbox
├── features/             # Feature-First Modules
│   ├── dashboard/        # KPI, Overview Bento Widgets
│   ├── registration/     # QR Check-in, Visitor Form
│   ├── artists/          # Artist Profiles, Songs Catalog
│   ├── queue/            # Live Queue Timeline (StageFlow)
│   ├── gallery/          # Event Photo Management
│   ├── landing/          # External Landing URL Controls
│   ├── sponsor/          # Sponsor Banners & Priorities
│   ├── analytics/        # Visitor Growth & Peak Charts
│   ├── export/           # Excel/CSV/Google Sheets Engine
│   ├── stageflow/        # Realtime WebSocket Pairing
│   └── settings/         # Event Theme & Security Setup
├── lib/                  # Third-party Library Wrappers & Supabase Client
├── hooks/                # Custom React Hooks (useStageFlow, useRegistration)
├── services/             # API Services (supabase, export, google, stageflow, upload)
├── stores/               # Zustand Global State Stores
│   ├── authStore.ts
│   ├── eventStore.ts
│   ├── artistStore.ts
│   ├── galleryStore.ts
│   ├── queueStore.ts
│   └── analyticsStore.ts
├── providers/            # AuthProvider, ThemeProvider, QueryProvider
├── types/                # TypeScript Interfaces & Supabase DB Types
├── assets/               # Icons, Logos, Illustrations, Mockups, Animations
├── styles/               # CSS Files (globals.css, variables.css, glass.css, motion.css)
├── utils/                # Formatters, Validation Rules, Helper Functions
└── constants/            # Colors, Roles, Motion, Breakpoints, Permissions, Theme
```

---

## 3. Production Conventions & Strict Rules
- **Naming Rules**:
  - *Components*: `PascalCase` (e.g. `ArtistCard.tsx`, `TicketAnimation.tsx`)
  - *Functions & Hooks*: `camelCase` (e.g. `useStageFlow.ts`, `formatTicketNumber.ts`)
  - *Routes & URLs*: `kebab-case` (e.g. `/dashboard`, `/artist-detail`)
- **Import Rule**: ใช้ **Absolute Import** ผ่าน Prefix `@/` เสมอ (e.g. `import { Button } from "@/components/ui/Button"`)
- **Dependency Constraint**: Feature **ห้ามเรียก Feature ตรง ๆ** ให้สื่อสารผ่าน Service หรือ Custom Hook เท่านั้น
- **Production Ready**: ออกแบบคอมโพเนนต์ให้รองรับ PWA, Mobile, Tablet, และ Desktop โดยอัตโนมัติ

---

## 4. Acceptance Criteria
- ✓ ซอร์สโค้ดจัดโครงสร้างตาม Feature-First และไม่มีการ Import ข้าม Feature โดยตรง
- ✓ Absolute Import `@/` ถูกตั้งค่าสมบูรณ์ใน `tsconfig.json` และ `vite.config.ts`
