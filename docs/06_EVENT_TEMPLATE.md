# 06 — Event Template Specification (WATCHER-EVENT-TEMPLATE-001)

## Document Information
* **Document ID**: `WATCHER-EVENT-TEMPLATE-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดข้อกำหนดแม่แบบอีเวนต์ล่วงหน้า (Event Presets & Template Specification) เพื่อให้ผู้จัดงานสามารถเลือกประเภทงานและรับชุดข้อมูลตั้งต้น (Default Categories, Banners, Navigation Layouts) ได้ทันทีเมื่อสร้าง Event ใหม่

---

## 2. Template Presets Catalog

| Template Name | Target Event Type | Default Categories | Layout Specialization |
| :--- | :--- | :--- | :--- |
| **Freshy Night** | งานรับน้อง / กิจกรรมมหาวิทยาลัย | Student, Teacher, Guest, Staff, VIP | High-energy Glow Theme & Live Stage Focus |
| **Concert & Festival**| คอนเสิร์ต / เทศกาลดนตรี | General, VIP, Media, Artist Pass | Artist Detail & Live Song Highlight Focus |
| **Academic Seminar** | งานประชุมวิชาการ / สัมมนา | Speaker, Attendee, Press, Staff | Schedule Timeline & External Presentation Links |
| **Exhibition & Fair** | งานนิทรรศการ / ออกบูธ | Visitor, Exhibitor, Buyer, VIP | Photo Gallery Polaroid & Sponsor Focus |
| **Open House** | งานเปิดบ้าน / กิจกรรมโรงเรียน | Student, Parent, Alumni, Teacher | Fast QR Check-in & Department Station Links |
| **Workshop** | กิจกรรมเวิร์กช็อป | Participant, Mentor, Instructor | Simple Live Queue & Certificate PDF Export |

---

## 3. Acceptance Criteria
- ✓ ผู้จัดงานเลือก Template แล้วระบบสร้าง Default Categories และ Theme Tokens ให้อัตโนมัติใน 1 คลิก
