# 03 — System Architecture

## Document Information
* **Document ID**: `WATCHER-ARCH-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Architecture Freeze`
* **Last Updated**: `2026-07-29`

---

## 1. Purpose
กำหนดสถาปัตยกรรมระบบ Service Flow สิทธิ์การเข้าถึง และการเชื่อมต่อระหว่าง Watcher และ StageFlow

---

## 2. Scope
สถาปัตยกรรมภาพรวมของ Watcher, Authentication, Core Services, Queue Sync และ Data Isolation

---

## 3. Goals
- ออกแบบ Event Operating System ที่แบ่งเป็น 8 Core Services โดยใช้ Event ID เป็นศูนย์กลาง
- เชื่อมต่อ StageFlow เป็น Single Source of Truth สำหรับ Queue API โดย Watcher ไม่ต้องสร้างระบบ Timer เอง
- รักษาความปลอดภัยและแยกข้อมูล (Data Isolation) ระหว่างแต่ละ Event อย่างสมบูรณ์

---

## 4. User Stories
- As a Developer, I want Watcher to stream queue status from StageFlow so that we maintain exact synchronization without timer drift.
- As an Administrator, I need isolated event data so that my event data is strictly private and secure.

---

## 5. Functional Requirements
- Authentication Layer: Google Login สำหรับ Admin & Staff
- 8 Core Services: Authentication, Event, Registration, Queue, Gallery, Landing, Sponsor, Export
- Single Event Container: ข้อมูลทั้งหมดผูกกับ Event ID (No floating data)
- Queue Source: Watcher อ่านคิวจาก StageFlow Queue API -> Live Queue (Watcher ไม่ได้สร้างคิวเอง)
- Registration Flow: QR -> Register -> Ticket Animation -> Home -> Live Queue -> Gallery -> Landing
- Landing Integration: ไม่สร้างในระบบ ใช้การวาง URL สายนอก (เช่น Framer, Webflow, Lovable, GitHub Pages)
- Export Layer: Excel, CSV, Google Sheets via OAuth
- Theme Engine: ปรับเปลี่ยน Light / Dark / Custom ผ่าน JSON Design Tokens (Primary, Secondary, Accent, Radius, Shadow)

---

## 6. Non-functional Requirements
- Image Pipeline: Admin Upload -> Validate -> Resize -> Compress -> Storage -> CDN -> Client
- Security: Data Isolation โดย Owner -> Admins -> Visitors แยกกันเด็ดขาด

---

## 7. UI/UX Guidelines
- Admin Dashboard ใช้ Bento Grid System | Visitor App ใช้ Vertical Flow

---

## 8. Technical Notes
- Architecture Principles: Single Event, Single Source of Truth, StageFlow = Queue, Watcher = Visitor Experience

---

## 9. Future Expansion
- Edge Gateway API Caching สำหรับงานที่มีผู้ชมหลักหมื่นคน

---

## 10. Acceptance Criteria
- ✓ Queue ไม่มีระบบ Timer ภายใน Watcher แต่ดึงจาก StageFlow สตรีมแบบ Realtime
- ✓ ทุก Event แยกข้อมูลเด็ดขาด ไม่สามารถดึงข้อมูลข้าม Event ได้
