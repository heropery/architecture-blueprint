# 04 — Database Schema & Data Models (WATCHER-DB-001)

## Document Information
* **Document ID**: `WATCHER-DB-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Approved`
* **Database Engine**: PostgreSQL (Supabase)
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดโครงสร้างฐานข้อมูล PostgreSQL บน Supabase ภายใต้สถาปัตยกรรม **Event-Centric Architecture** โดยทุกข้อมูลต้องผูกโยงกับ `event_id` เพื่อรับประกันความถูกต้อง ปลอดภัย และการแยกข้อมูล (Data Isolation) ระหว่างอีเวนต์

---

## 2. Scope
ครอบคลุม Schema ของตารางทั้งหมด (`users`, `events`, `registrations`, `artists`, `songs`, `galleries`, `gallery_images`, `sponsors`, `landing_links`, `analytics`, `activity_logs`, `queue_cache`), Storage Buckets, RLS Policies, และ Indexing Strategies

---

## 3. Goals
- สร้างโครงสร้างตาราง relational ที่กระชับ ไม่ซ้ำซ้อน และรองรับการคิวรีที่รวดเร็ว
- แยกข้อมูลระหว่างแต่ละ Event อย่างเด็ดขาด (No Floating Data Across Events)
- ออกแบบ Queue Cache Table เพื่อแคชข้อมูลคิวจาก StageFlow โดยไม่ต้องสร้างระบบ Timer เองใน DB

---

## 4. User Stories
- **As a Developer**, I want strict foreign key constraints referencing `event_id` so that cascading deletes and event resets clean up all related records automatically.
- **As a DBA**, I want indexed queries on `event_id`, `created_at`, and `ticket_number` for high throughput check-ins.

---

## 5. Functional Requirements (Table Schemas)

### 5.1 Core Tables
1. **`users`**: `id` (uuid, PK), `google_uid`, `email`, `display_name`, `avatar_url`, `created_at`, `updated_at`
2. **`events`**: `id` (uuid, PK), `owner_id` (FK users), `title`, `slug`, `description`, `location`, `start_date`, `end_date`, `theme` (jsonb), `logo`, `cover`, `status`, `created_at`
3. **`registrations`**: `id` (uuid, PK), `event_id` (FK events), `fullname`, `nickname`, `category` (Student, Teacher, Parent, Guest, VIP), `ticket_number`, `qr_token`, `checked_in_at`, `created_at`
4. **`artists`**: `id` (uuid, PK), `event_id` (FK events), `name`, `cover`, `description`, `genre`, `contact_email`, `facebook`, `instagram`, `youtube`, `spotify`, `website`
5. **`songs`**: `id` (uuid, PK), `artist_id` (FK artists), `title`, `duration`, `sort_order`, `is_current` (boolean)
6. **`galleries`**: `id` (uuid, PK), `event_id` (FK events), `title`, `description`, `cover`, `created_at`
7. **`gallery_images`**: `id` (uuid, PK), `gallery_id` (FK galleries), `image_url`, `caption`, `sort_order`
8. **`sponsors`**: `id` (uuid, PK), `event_id` (FK events), `name`, `logo`, `banner`, `website`, `priority`, `start_at`, `end_at`
9. **`landing_links`**: `id` (uuid, PK), `event_id` (FK events), `title`, `url`, `open_mode` (same_tab/new_tab), `enabled` (boolean)
10. **`analytics`**: `id` (uuid, PK), `event_id` (FK events), `total`, `students`, `teachers`, `parents`, `guests`, `vip`, `updated_at`
11. **`activity_logs`**: `id` (uuid, PK), `event_id` (FK events), `user_id` (FK users), `action`, `metadata` (jsonb), `created_at`

### 5.2 Queue Cache Schema (StageFlow Sync)
- **`queue_cache`**: `event_id` (PK, FK events), `stageflow_room`, `current_artist`, `current_song`, `queue_order`, `status`, `last_sync`

---

## 6. Storage & Security Specifications

### 6.1 Storage Buckets Structure
- **Buckets**: `events/`, `logos/`, `covers/`, `artists/`, `gallery/`, `ticket/`, `banner/`
- **File Validation**: รองรับ PNG, JPG, WEBP, SVG | ขนาดสูงสุด `10 MB` ต่อไฟล์

### 6.2 Security & Row Level Security (RLS)
- **Owner**: อ่านและแก้ไขได้ทุกข้อมูลใน Event ของตนเอง
- **Admin**: อ่านและแก้ไขข้อมูลเฉพาะ Event ที่ได้รับสิทธิ์
- **Visitor**: อ่านเฉพาะข้อมูลที่เป็น Public (Events, Artists, Songs, Galleries, Sponsors, Queue Cache)

---

## 7. Performance & Indexing Rules
- สร้าง Index บนคอลัมน์: `event_id`, `owner_id`, `created_at`, `ticket_number`, `category`
- สำรองข้อมูล (Backup): Daily Backup ย้อนหลัง 7 วัน พร้อมปุ่ม Export CSV

---

## 8. Technical Notes & Future Readiness
โครงสร้างฐานข้อมูลออกแบบรองรับการต่อขยายในอนาคตโดยไม่ต้องเปลี่ยน Schema หลัก:
- Multi Organization & Multi Language Support
- Offline Registration Sync & PWA Cache
- Native Mobile App & Push Notification Tokens
- Ticket Payment & Seat Reservation Modules

---

## 10. Acceptance Criteria
- ✓ ทุกตาราง (ยกเว้น `users`) ต้องมี `event_id` เป็น Foreign Key Constraint
- ✓ ไม่พบตารางหรือข้อมูลลอยข้าม Event (Strict Isolation)
- ✓ RLS Policies ผ่านการทดสอบความปลอดภัย ไม่เปิดเผยข้อมูลส่วนตัวของผู้ลงทะเบียนให้ผู้ใช้อื่น
