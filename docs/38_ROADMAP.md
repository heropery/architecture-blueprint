# 36 — Deployment & Production Guide (WATCHER-DEPLOY-001)

## Document Information
* **Document ID**: `WATCHER-DEPLOY-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Production Locked`
* **Last Updated**: `2026-07-30`

---

## 1. Deployment Pipeline
```text
Lovable -> GitHub -> Supabase Managed Cloud -> Custom Domain SSL -> Production
```

---

## 2. Environments & Environment Variables
- **Environments**: Development -> Staging -> Production
- **Required Variables**:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `STAGEFLOW_API`
  - `GOOGLE_SHEET_API`

---

## 3. Infrastructure, Security & Monitoring
- **Domain & SSL**: Production Domain (`watcher.app` / `watcher.live` / `watcher.lovable.app`), HTTPS 100%
- **CDN & Storage**: Supabase Storage + CDN for static assets & compressed WebP images
- **Database Backup**: Daily Automated Backups with 30-day retention
- **Monitoring & Crash Reporting**:
  - *Telemetry*: Supabase Logs, Google Analytics, Microsoft Clarity
  - *Crash Reports*: Sentry Error Tracking with full stack trace capture
- **Security Checklist**: HTTPS Only, RLS Enabled, CSP Headers, XSS & CSRF Protection, Rate Limiting (100 req/min), JWT Session Validation (24h / 30d Remember Me)

---

## 4. Product Expansion Roadmap

### 4.1 Version 1.1 (Immediate Enhancements)
- Push Notifications System
- Email Invitation & QR Sender
- Multi-Event Template Selector
- Event Archive & Historical Logs

### 4.2 Version 2.0 (Multi-Organization System)
- Multi-Organization Accounts & Workspace Management
- Team Collaboration & Multi-Admin Roles
- Developer API Keys, Public API & Webhook Dispatcher
- Plugin & Third-party Extension System

### 4.3 Version 3.0 (Native Apps & AI Intelligence)
- Native iOS App (SwiftUI) & Native Android App (Kotlin)
- Full PWA Offline Scanning & Local Database Sync
- AI Event Analytics, AI Event Summary Generator, and AI Gallery Auto-Tagging

---

## 5. Definition of Done (DoD)
โปรเจกต์ถือว่า **"เสร็จสมบูรณ์ระดับ Production (Done)"** เมื่อผ่านเกณฑ์ประเมินดังต่อไปนี้:
- [x] ผู้จัดงานสามารถสร้าง Event ใหม่ได้เสร็จสิ้นภายใน 1 นาที
- [x] ผู้เข้าร่วมงานสแกน QR, ลงทะเบียน และเข้าสู่หน้าหลักได้ภายใน 15 วินาที
- [x] การเชื่อมต่อ StageFlow แสดงผลคิวและเพลงปัจจุบันแบบเรียลไทม์ (Delay < 500ms)
- [x] ส่งออกข้อมูลเป็น Excel (.xlsx), CSV (UTF-8 BOM), และ Google Sheets ได้สมบูรณ์ 100%
- [x] Admin Dashboard แสดง Mobile Preview แบบ Realtime ทุกครั้งที่แก้ไขข้อมูล
- [x] ทุกหน้ารองรับ Mobile, Tablet, Desktop, Touch Screen และ TV โดยไร้ข้อผิดพลาด
- [x] ผ่านการทดสอบ TypeScript (0 Errors), Lighthouse (>= 90), Accessibility (>= 95), และ Performance (>= 90)

---

## 6. Acceptance Criteria
- ✓ ระบบทั้งหมดพร้อมกด Deploy บน Lovable / Vercel และเชื่อมต่อ Supabase Cloud ทันที
