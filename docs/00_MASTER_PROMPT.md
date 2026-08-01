# 00 — Master Prompt & Global Constitution

## Document Information
* **Document ID**: `WATCHER-SPEC-000`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen (Master Constitution)`
* **Last Updated**: `2026-07-29`

---

## 1. Purpose
เป็นรัฐธรรมนูญและกฎสูงสุดของระบบ Watcher ที่กำหนดปรัชญา กฎการออกแบบ การพัฒนา UI/UX แอนิเมชัน และการจัดการ AI

---

## 2. Scope
ครอบคลุมทุก Module, UI, Service, Architecture และ Codebase ทั้งหมดของ Watcher

---

## 3. Goals
- กำหนดมาตรฐานสูงสุดและกรอบความคิดแบบ One Screen One Purpose
- รับประกัน Performance 60fps และ Zero Layout Shift (CLS ต่ำที่สุด)
- สร้างระบบ UX ให้ผู้ใช้ต้องการเปิดค้างไว้ตลอดทั้งงาน ไม่ใช่แค่สแกนแล้วปิด

---

## 4. User Stories
- As a Developer / AI System, I need clear global rules so that every feature built aligns perfectly with Watcher philosophy.
- As a Visitor, I want a slick, fast, dark-themed experience that consumes minimum battery and responds instantly.

---

## 5. Functional Requirements
- Product Name: Watcher | Tagline: Every Visitor. Every Stage. Every Moment.
- Navigation Rule: ใช้ Navigation Drawer เพียงรูปแบบเดียวเท่านั้น (No Sidebar, No Mega Menu, No Universal Search)
- Layout Rule: Admin ใช้ Bento Grid Layout | User ใช้ Vertical Flow Layout
- Glassmorphism Rule: ใช้เฉพาะใน Drawer, Dialog, Bottom Sheet, และ Popup เท่านั้น (ห้ามใช้ทั้งระบบ)
- Theme Engine: Dark Theme เป็นค่าเริ่มต้น ผสมผสานโทน Purple & Blue Minimal
- AI Prompt Library: ทุก Prompt ต้องเก็บไว้ใน Prompt Library (39_AI_PROMPT_LIBRARY.md) ห้ามกระจายทั่วโปรเจกต์

---

## 6. Non-functional Requirements
- Performance: Animation 60fps, Cumulative Layout Shift (CLS) = 0
- Accessibility: รองรับ Reduced Motion, Keyboard Navigation, Screen Reader, และ Contrast AA Level
- Image Rules: ทุกภาพต้องระบุ Aspect Ratio, Recommended Size และ Safe Area ห้าม Upload แบบเดาเอง

---

## 7. UI/UX Guidelines
- Philosophy: Watcher คือ Experience Platform ไม่ใช่แค่ระบบลงทะเบียนหรือเช็กชื่อ
- Core Principle: ถามตัวเองเสมอ "ผู้ใช้จะเปิดหน้านี้นานเกิน 3 วินาทีหรือไม่" ถ้าไม่ -> ตัดออก!
- Motion Rule: แอนิเมชันต้องมีเหตุผล ห้ามใส่เพื่อความสวยอย่างเดียว ต้องช่วย Feedback, Focus หรือ Guidance เท่านั้น

---

## 8. Technical Notes
- Coding Principles: Reusable First, Composable, Atomic Architecture, Headless Logic
- Architecture Standard: Single Event Container architecture, Single Source of Truth

---

## 9. Future Expansion
- รองรับ Progressive Web App (PWA)
- รองรับ Native Mobile App (iOS / Android)
- รองรับ Offline Sync & Cache Management
- รองรับ Push Notification System และ Multi-Event Platform Operating System

---

## 10. Acceptance Criteria
- ✓ ระบบทั้งหมดต้องรองรับและแสดงผลสมบูรณ์บน Mobile, Tablet, Desktop, Touch Screen และ TV Screen
- ✓ ไม่มี Sidebar, Mega Menu หรือ Universal Search ในระบบ
- ✓ ทุก Motion เป็นไปตาม 60fps constraint และ Layout Shift = 0
