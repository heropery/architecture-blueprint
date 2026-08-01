# 01 — Project Overview

## Document Information
* **Document ID**: `WATCHER-SPEC-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Approved`
* **Last Updated**: `2026-07-29`

---

## 1. Purpose
กำหนดวิสัยทัศน์ ปัญหา โซลูชัน กลุ่มเป้าหมาย และเป้าหมายระยะยาวของระบบ Watcher

---

## 2. Scope
ภาพรวมระบบ Watcher ทั้งหมด ทั้งฝั่ง Admin Dashboard, Visitor App, StageFlow Sync, Analytics และ Export

---

## 3. Goals
- แก้ปัญหาการจัดงานที่ข้อมูลกระจัดกระจายระหว่าง Google Form, Excel, Line, Messenger และ Stage Manager
- ลดเวลาลงทะเบียนให้เหลือน้อยกว่า 30 วินาที และรวมข้อมูลทุกอย่างมาไว้ที่จุดเดียวแบบ Realtime
- สร้างระบบ Operating System สำหรับงานอีเวนต์โรงเรียน มหาวิทยาลัย คอนเสิร์ต และงานจัดแสดง

---

## 4. User Stories
- As an Event Organizer, I want a single platform that consolidates registration, live queue, gallery, and analytics so that I do not need multiple disconnected tools.
- As an Event Attendee, I want an interactive event companion app to check queue status and performer info effortlessly.

---

## 5. Functional Requirements
- Core Modules: Registration, Event Management, Artist, Gallery, Sponsor, Announcement, Analytics, Export, StageFlow Sync, Landing
- Integration: อ่านคิวเรียลไทม์จาก StageFlow API
- Out of Scope (v1): Payment, Chat, Push Notification, Marketplace, Ticket Selling, AI Recommendation
- Business Model: เปิดใช้งานฟรีในช่วงแรก และพัฒนา Premium Features ในอนาคต

---

## 6. Non-functional Requirements
- Registration Time: < 30 วินาที
- Export Generation Time: < 5 วินาที
- Realtime Sync Delay: < 500ms
- Dashboard Load Time: < 2 วินาที

---

## 7. UI/UX Guidelines
- รวม Registration, Realtime Stage, Performer, Gallery, Analytics และ Export ไว้ในประสบการณ์ผู้ใช้ที่เรียบง่าย
- เน้นสร้าง Engagement ให้ผู้ชมอยากเปิดใช้งานแอปพลิเคชันค้างไว้ตลอดทั้งงาน

---

## 8. Technical Notes
- Product Structure: Watcher -> Admin Dashboard, Visitor App, StageFlow Sync, Analytics, Export, Landing Integration

---

## 9. Future Expansion
- ก้าวสู่การเป็น Operating System ของงานอีเวนต์ทุกประเภท
- โมเดลธุรกิจแบบ SaaS / Freemium Enterprise

---

## 10. Acceptance Criteria
- ✓ ทุก Feature ต้องตอบโจทย์ "ทำให้ผู้จัดงานทำงานง่ายขึ้น" หรือ "ทำให้ผู้ร่วมงานอยากเปิดแอปต่อ" อย่างน้อยหนึ่งข้อ
