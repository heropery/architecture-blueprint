# 39 — AI Prompt Library & Master Build Prompt (WATCHER-PROMPT-001)

## Document Information
* **Document ID**: `WATCHER-PROMPT-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Production Locked`
* **Last Updated**: `2026-07-30`

---

## 1. Objective
สั่งงาน AI Assistant (Lovable, Cursor, Claude, Antigravity) เพื่อสร้าง Web Application ชื่อ **Watcher** สำหรับจัดการงาน Event โดยใช้ React, TypeScript, TailwindCSS, Framer Motion, และ Supabase โดยยึดตามเอกสารระบบทั้ง 41 ไฟล์ 100% ห้ามออกแบบใหม่เองหากเอกสารระบุไว้แล้ว

---

## 2. Core Principles & Tech Stack

### 2.1 Core Principles
- **Design Philosophy**: Mobile First, Responsive, Glassmorphism, Bento Grid, Hamburger Navigation, One Screen One Job
- **Architecture**: Feature First Architecture
- **Theme**: Dark Theme Minimalist, Primary Accent (Blue/Purple), Glass Blur 24px, Rounded 24px, 8pt Grid Spacing

### 2.2 Tech Stack Standard
- **Core**: React 18+, TypeScript (Strict Mode), Vite / Lovable
- **Styling & Components**: TailwindCSS, Framer Motion, shadcn/ui, Lucide React
- **State & Router**: Zustand, React Router v6, TanStack Query (React Query)
- **Forms & Validation**: React Hook Form, Zod
- **Backend & DB**: Supabase (PostgreSQL, Auth, Realtime, Storage)

---

## 3. Project Rules & Sub-Specification Mapping
1. **Folder Structure**: ยึดตาม `WATCHER-FOLDER-001` (`33_FOLDER_STRUCTURE.md`) ห้ามสร้างไฟล์มั่ว
2. **Motion System**: ยึดตาม `WATCHER-MOTION-001` (`10_ANIMATION_SYSTEM.md`) ใช้ Framer Motion เท่านั้น
3. **Database Schema**: ยึดตาม `WATCHER-DB-001` (`04_DATABASE_SCHEMA.md`)
4. **UX Guidelines**: ยึดตาม `WATCHER-UX-001` (`21_USER_APP.md`)
5. **Security & RLS**: ยึดตาม `WATCHER-SECURITY-001` (`29_SECURITY.md` & `05_PERMISSION_SYSTEM.md`)
6. **API Specs**: ยึดตาม `WATCHER-API-001` (`28_API_SPEC.md`)
7. **UI Component Library**: ยึดตาม `WATCHER-COMPONENT-001` (`08_COMPONENT_LIBRARY.md`)
8. **Export System**: ยึดตาม `WATCHER-EXPORT-001` (`19_EXPORT.md`)
9. **StageFlow Sync**: ยึดตาม `WATCHER-STAGEFLOW-001` (`14_STAGEFLOW_CONNECT.md`)
10. **Asset Standards**: ยึดตาม `WATCHER-ASSET-001` (`11_ASSET_SPECIFICATION.md`)

---

## 4. Key Workflows & Features Specification
- **Authentication**: Google Login -> Dashboard -> Create Event ทันที (ไม่มี Super Admin ใน v1.0)
- **Admin Bento Dashboard**: Bento Layout รวม KPI, Registration, StageFlow, Gallery, Landing, Sponsor, Analytics, Export และ **Live Mobile Preview Container** (อัปเดต Realtime เมื่อแก้ไขข้อมูล)
- **Visitor Flow & Ticket Motion**: Scan QR -> Register -> Ticket Animation Sequence (Scan -> Verify -> Ticket Drop -> Receipt Printer Top-Down 900ms -> Receipt Fall -> Tap Anywhere -> Home) -> Artist -> Gallery (Polaroid Expand) -> Landing
- **Queue Source**: อ่านข้อมูลจาก StageFlow API เท่านั้น Watcher ไม่จัดการคิวเอง
- **Landing Integration**: ใช้เพียง External URL เปิดลิงก์ตรง ไม่มี Editor ในระบบ
- **Export Engine**: รองรับ 1-Click Export (Excel OpenXML, CSV UTF-8 BOM, Google Sheets API)

---

## 5. Coding Standards & QA Checklist
- **Coding Standard**: TypeScript Strict, ESLint, Prettier, Absolute Import (`@/`), Reusable Components, No Inline Styles, No Magic Numbers, No Duplicated Components
- **Accessibility (WCAG AA)**: Keyboard Navigation, Reduced Motion, Alt Images, Screen Reader Support
- **Performance**: Lazy Loading, Image Compression (WebP), Skeleton Loaders, Code Splitting, Memoization
- **QA Checklist Before Push**: Responsive, No Console Errors, No Type Errors, Lighthouse >= 90, Accessibility >= 95, Performance >= 90, SEO >= 90, No Overflow, No Memory Leak

---

## 6. Master System Prompt Text (Copy & Paste Ready)

```text
You are the Lead Engineer building WATCHER (Final) — The Event Companion & Operating System.

Your task is to build a Production-Ready Web Application using React, TypeScript, TailwindCSS, Framer Motion, and Supabase based 100% strictly on the 41 SDD Specification files in docs/.

KEY RULES:
- Architecture: Feature-First (docs/33_FOLDER_STRUCTURE.md), Absolute imports (@/).
- UI/UX: Mobile-First, Dark Minimal Theme, Glassmorphism (Blur 24px, Radius 24px), Bento Grid Admin Dashboard with Live Mobile Preview, No Sidebar, No Mega Menu.
- Visitor App: 7-step journey (Scan -> Register -> Ticket Print Sequence -> Home -> Live Queue -> Artist -> Gallery Polaroid Expand -> Landing).
- Ticket Animation: 4-stage Framer Motion sequence (Top-Down Receipt Print 900ms, Spring Drop). NO LOTTIE.
- StageFlow: Read-Only Queue & Song consumer via Realtime WebSockets/Polling. Watcher DOES NOT generate queue timers.
- Backend: Supabase PostgreSQL Event-Centric schema (docs/04_DATABASE_SCHEMA.md) with strict RLS policies (docs/29_SECURITY.md).
- Quality: 60fps animations, 0 Layout Shift (CLS=0), WCAG AA contrast, Lighthouse >= 90.

Output code ready to deploy on Lovable directly.
```
