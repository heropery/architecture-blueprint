# 00_START_HERE.md — Smart AI Navigation & System Entry Point

> [!IMPORTANT]
> **ATTENTION AI DEVELOPMENT SYSTEM (Lovable / Cursor / Antigravity / Claude)**  
> Read this entire document BEFORE analyzing the codebase or generating any code!

---

## 🎯 1. Project Goal & System Purpose (จุดประสงค์ของโปรเจกต์)

**Watcher** คือ **Event Operating System & Companion App** สำหรับงานอีเวนต์ โรงเรียน มหาวิทยาลัย คอนเสิร์ต งานประชุม นิทรรศการ และกิจกรรมทุกประเภท ที่เชื่อมผู้จัดงาน ผู้เข้าร่วม และ StageFlow เข้าไว้ด้วยกันภายในระบบเดียว

### Core Philosophy:
- **Watcher คือ Experience Platform** ที่ผู้เข้าร่วมเปิดใช้งานตลอดทั้งงาน ไม่ใช่แค่ระบบสแกนลงทะเบียนหรือเช็กชื่อแล้วปิด
- **One Screen = One Job**: หนึ่งหน้าทำหนึ่งอย่าง ไม่มี Dashboard รวมทุกอย่างในหน้า Visitor
- **Mobile First & Thumb Friendly**: ออกแบบทุกปุ่มสัมผัสอย่างน้อย 48x48px และ Bottom Nav สูง 72px

---

## 🔒 2. Strict No-Redesign Rules (กฎห้าม AI เปลี่ยนดีไซน์หรือ UX เอง)

1. **DO NOT REDESIGN**. Do not simplify, do not rename, do not alter UX, and do not change colors or layouts on your own.
2. **NO SIDEBAR. NO MEGA MENU**. Admin Dashboard ใช้ Bento Grid + Navigation Glass Drawer (`Blur 24px`, `Opacity 70%`, Scale `95%->100%`, `280ms`) เท่านั้น
3. **READ-ONLY STAGEFLOW SYNC**: Watcher อ่านข้อมูลคิวและเพลงจาก StageFlow API เท่านั้น ห้ามสร้างคิวหรือระบบ Timer เองใน Watcher
4. **FRAMER MOTION ONLY**: ใช้ Framer Motion สำหรับแอนิเมชันทั้งหมด (รวมถึงการปริ้นตั๋ว Top-Down 900ms) ห้ามใช้ Lottie
5. **FOLLOW SPECIFICATIONS EXACTLY**. หากข้อกำหนดใดไม่ชัดเจน ให้ถามก่อนเสมอ ห้ามเดาหรือปรับแต่งเองเด็ดขาด

---

## 🏗️ 3. Development Entry Point: M0 Architecture Lock (จุดเริ่มต้นการพัฒนา)

### MANDATORY PRE-CODE PROTOCOL:
ก่อนที่จะเขียนโค้ด Production แม้แต่บรรทัดเดียว AI ต้องทำขั้นตอน **M0: Architecture Lock** เพื่อสร้างรายงาน **Architecture Lock Report** ดังต่อไปนี้:
- โครงสร้างโฟลเดอร์ (`src/features/`) และขอบเขตโมดูล
- Route Tree ทั้งหมด
- ตารางฐานข้อมูล Supabase PostgreSQL & RLS Policies
- Component Hierarchy & Design Tokens List
- Zustand State Management Stores
- StageFlow Sync & Realtime Integration Strategy
- ความเสี่ยงและข้อสันนิษฐานทางเทคนิค (Risks & Assumptions)

**หยุดรอการตรวจและอนุมัติจากผู้ใช้ก่อนเริ่มเขียนโค้ด M1 ทุกครั้ง!**

---

## 🚀 4. Milestone Roadmap (M0–M10) (ลำดับ Milestone การพัฒนา)

- **M0: Architecture Lock** (สร้าง Architecture Lock Report และหยุดรออนุมัติ)
- **M1: Design System & Tokens** (สร้าง Theme -> Color/Typography Tokens -> UI Component Library -> Layout Primitives ก่อนสร้างหน้าจอฟังก์ชันใด ๆ)
- **M2: Foundation & Base Routing** (ตั้งค่า React + TypeScript + Tailwind, Feature-First Structure, Routes)
- **M3: Authentication & Event Setup** (Google Login, Auth Context, Supabase Client, Event Creation)
- **M4: Admin Bento Dashboard** (Bento Grid, Glass Drawer Overlay, Mobile Live Preview Container)
- **M5: Visitor Experience & Ticket Motion** (Scan QR, Registration Form, 4-Stage Ticket Print Motion 900ms, Home Screen)
- **M6: StageFlow Realtime Sync** (Room Pairing, Queue Stream Subscription, Live Performance Card)
- **M7: Content & Gallery Management** (Artist Manager, Songs Catalog, Polaroid Expand Gallery)
- **M8: Landing & Sponsor Integration** (External URL Landing Button, Sponsor Banner Auto-Slide)
- **M9: Data Export Engine** (Excel OpenXML, CSV UTF-8 BOM, Google Sheets API)
- **M10: QA, Polish & Production Launch** (PWA Manifest, Sentry Telemetry, Custom Domain SSL Launch)

---

## 📖 5. Document Reading Order (ลำดับการอ่านเอกสาร)

ควรอ่านเอกสารตามลำดับชั้นต่อไปนี้:
1. **System Entry & Rules**: `00_START_HERE.md`, `README.md`, `docs/00_MASTER_PROMPT.md`, `docs/01_PROJECT_OVERVIEW.md`, `docs/02_PRODUCT_REQUIREMENTS_PRD.md`
2. **Master UI & Experience**: `docs/WATCHER-UI-MAP-001.md` (**MASTER UI MAP**), `docs/21_USER_APP.md`, `docs/12_ADMIN_DASHBOARD.md`, `docs/08_COMPONENT_LIBRARY.md`, `docs/10_ANIMATION_SYSTEM.md`, `docs/07_DESIGN_SYSTEM.md`, `docs/09_LAYOUT_SYSTEM.md`
3. **Backend & Integration**: `docs/04_DATABASE_SCHEMA.md`, `docs/28_API_SPEC.md`, `docs/29_SECURITY.md`, `docs/14_STAGEFLOW_CONNECT.md`, `docs/11_ASSET_SPECIFICATION.md`, `docs/19_EXPORT.md`
4. **Development & Launch**: `docs/33_FOLDER_STRUCTURE.md`, `docs/35_TEST_PLAN.md`, `docs/32_COPYWRITING.md`, `docs/36_DEPLOYMENT.md`, `prompts/WATCHER-PROMPT-001.md`

---

## 📋 6. Complete Document Manifest (รายชื่อเอกสารทั้งหมด 31 Enterprise Suite / 41 Files)

1. `00_MASTER_PROMPT.md` (`WATCHER-PROMPT-001` — Master Constitution & Rules)
2. `01_PROJECT_OVERVIEW.md` (`WATCHER-001` — Vision, Problem & Solution)
3. `02_PRODUCT_REQUIREMENTS_PRD.md` (`WATCHER-002` — Personas & PRD)
4. `03_SYSTEM_ARCHITECTURE.md` (`WATCHER-004` — 8 Core Services & Architecture)
5. `04_DATABASE_SCHEMA.md` (`WATCHER-DB-001` — Supabase PostgreSQL Schema)
6. `05_PERMISSION_SYSTEM.md` (`WATCHER-SECURITY-001` — Access Control & Roles)
7. `06_EVENT_TEMPLATE.md` (`WATCHER-EVENT-TEMPLATE-001` — Event Presets Catalog)
8. `07_DESIGN_SYSTEM.md` (`WATCHER-DESIGN-TOKEN-001` — Design Tokens, Color & Typography)
9. `08_COMPONENT_LIBRARY.md` (`WATCHER-COMPONENT-001` — Atomic UI Component Library)
10. `09_LAYOUT_SYSTEM.md` (`WATCHER-RESPONSIVE-001` — Bento Grid & Responsive Rules)
11. `10_ANIMATION_SYSTEM.md` (`WATCHER-MOTION-001` — Framer Motion 60fps System)
12. `11_ASSET_SPECIFICATION.md` (`WATCHER-ASSET-001` — Asset Resolution & Safe Area Matrix)
13. `12_ADMIN_DASHBOARD.md` (`WATCHER-ADMIN-001` — Bento Dashboard & Live Preview)
14. `13_REGISTRATION.md` (`WATCHER-SPEC-013` — Registration & Check-in Workflow)
15. `14_STAGEFLOW_CONNECT.md` (`WATCHER-STAGEFLOW-001` — Realtime StageFlow Sync)
16. `15_PERFORMER.md` (`WATCHER-SPEC-015` — Artist & Performer Management)
17. `16_GALLERY.md` (`WATCHER-SPEC-016` — Admin Gallery Management)
18. `17_SPONSOR.md` (`WATCHER-SPEC-017` — Sponsor Banners & Click Tracking)
19. `18_LANDING.md` (`WATCHER-SPEC-018` — External Landing URL Integration)
20. `19_EXPORT.md` (`WATCHER-EXPORT-001` — Multi-Format Data Export Engine)
21. `20_ANALYTICS.md` (`WATCHER-SPEC-020` — Visitor Analytics & Peak Charts)
22. `21_USER_APP.md` (`WATCHER-UX-001` — Visitor App Journey & 4-Stage Ticket Motion)
23. `22_TICKET_SYSTEM.md` (`WATCHER-SPEC-022` — Dynamic QR & Digital Ticket)
24. `23_HOME.md` (`WATCHER-SPEC-023` — Visitor Home Screen)
25. `24_ARTIST.md` (`WATCHER-SPEC-024` — Artist Detail View & Songs)
26. `25_SCHEDULE.md` (`WATCHER-SPEC-025` — Live Schedule & Queue Timeline)
27. `26_GALLERY_USER.md` (`WATCHER-SPEC-026` — User Polaroid Gallery & Lightbox)
28. `27_ABOUT_EVENT.md` (`WATCHER-SPEC-027` — Event Info & External Links)
29. `28_API_SPEC.md` (`WATCHER-API-001` — REST API First `/v1/event/:eventId`)
30. `29_SECURITY.md` (`WATCHER-SECURITY-001` — Supabase RLS Policies)
31. `30_STORAGE.md` (`WATCHER-SPEC-030` — Supabase Storage Buckets)
32. `31_BRANDING_GUIDE.md` (`WATCHER-BRAND-001` / `WATCHER-ICON-001` — Branding & Lucide Icons)
33. `32_COPYWRITING.md` (`WATCHER-ERROR-001` — Error Copywriting & Microcopy)
34. `33_FOLDER_STRUCTURE.md` (`WATCHER-FOLDER-001` — Feature-First Directory Structure)
35. `34_CODING_STANDARD.md` (`WATCHER-SPEC-034` — TypeScript & React Coding Standards)
36. `35_TEST_PLAN.md` (`WATCHER-QA-001` — QA Test Suite & Launch Gate Checklist)
37. `36_DEPLOYMENT.md` (`WATCHER-DEPLOY-001` / `WATCHER-LAUNCH-001` — Deployment Guide)
38. `37_CHANGELOG.md` (`WATCHER-SPEC-037` — System Migration & History Log)
39. `38_ROADMAP.md` (`WATCHER-ROADMAP-001` — Product Expansion Roadmap v1 to v3)
40. `39_AI_PROMPT_LIBRARY.md` (`WATCHER-PROMPT-001` — Master AI System Prompt)
41. `40_GLOSSARY.md` (`WATCHER-SPEC-040` — Project Glossary)
42. `WATCHER-UI-MAP-001.md` (**MASTER UI ARCHITECTURE & WIREFRAME MAP**)

---

> [!TIP]
> **Ready to Build**: Follow the Phase 4 prompt to perform M0 Architecture Lock before writing code!
