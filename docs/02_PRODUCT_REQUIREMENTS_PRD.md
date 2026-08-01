# 02 — Product Requirements Document (PRD)

## Document Information
* **Document ID**: `WATCHER-SPEC-002`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Approved`
* **Last Updated**: `2026-07-29`

---

## 1. Purpose
กำหนดรายละเอียดข้อกำหนดความต้องการทางฟังก์ชันและนอนฟังก์ชันทั้งหมดสำหรับ Watcher v1.0

---

## 2. Scope
ครอบคลุมสิทธิ์ผู้ใช้งาน (Personas), ฟีเจอร์หลัก (Functional Reqs), และเกณฑ์การประเมินผล

---

## 3. Goals
- กำหนด Personas 4 ระดับ (Super Admin, Event Admin, Staff, Visitor)
- สร้างระบบลงทะเบียน QR และการเชื่อมต่อคิวการแสดงกับ StageFlow
- ให้บริการระบบจัดการคอนเทนต์ (Artist, Gallery, Sponsor, Landing) และระบบรายงาน Export

---

## 4. User Stories
- As a Super Admin, I want to manage system permissions and monitor overall system health.
- As an Event Admin, I want to create events, upload assets, connect StageFlow rooms, and export reports.
- As a Staff member, I want to scan visitor QR codes for check-in without changing event settings.
- As a Visitor, I want to register quickly, view live queue, check artist profiles, and view event galleries.

---

## 5. Functional Requirements
- Event Management: สร้าง/แก้ไขอีเวนต์, เปิด/ปิดลงทะเบียน, กำหนดวันเวลาสถานที่
- Registration: QR Check-in, ฟอร์มกำหนดเอง, Validation และบันทึกข้อมูลผู้ร่วมงาน
- StageFlow Integration: เชื่อม Room ID/QR, แสดงคิวเรียลไทม์, Now Playing / Next / Finished
- Content Management: จัดการ Artist, Sponsor, Gallery, Landing Links, Announcements
- Reporting: Export Excel, CSV, Google Sheets, Dashboard Analytics

---

## 6. Non-functional Requirements
- Responsive (Mobile First) & Touch Screen Optimized
- Page Load Time: หน้าแรกโหลดไม่เกิน 2 วินาที
- Concurrency: รองรับ 500+ Concurrent Users ต่อ 1 อีเวนต์
- Accessibility: รองรับ Reduced Motion & Dark Theme เป็นค่าเริ่มต้น
- Animation Constraints: ใช้ Framer Motion เพียงไลบรารีเดียว และไม่มี Layout Shift

---

## 7. UI/UX Guidelines
- ออกแบบ Mobile First สำหรับ Visitor App และ Bento Grid สำหรับ Admin Dashboard

---

## 8. Technical Notes
- การจัดเก็บข้อมูลผ่าน Supabase Database & Realtime Subscription

---

## 9. Future Expansion
- รองรับการสแกนบัตรออฟไลน์และซิงค์ภายหลัง
- รองรับ Multi-stage support ภายในอีเวนต์เดียว

---

## 10. Acceptance Criteria
- ✓ ผู้จัดงานสามารถสร้างอีเวนต์ เชื่อม StageFlow เปิดรับลงทะเบียน ดูข้อมูลแบบเรียลไทม์ และส่งออกรายงานได้โดยไม่ต้องพึ่งเครื่องมือภายนอก
