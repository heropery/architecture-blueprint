# 11 — Asset & Image Specifications (WATCHER-ASSET-001)

## Document Information
* **Document ID**: `WATCHER-ASSET-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดข้อกำหนดการจัดการไฟล์ภาพ สื่อ และ Asset ทั้งหมดในระบบ Watcher (Asset Specification) เพื่อขจัดปัญหาการเดาสัดส่วนไฟล์ของผู้จัดงาน และรักษาระดับการประมวลผลเครือข่ายให้รวดเร็วที่สุด

---

## 2. Scope
ครอบคลุมตารางมิติไฟล์ภาพมาตรฐาน (Resolution Matrix), Naming Conventions, Directory Hierarchy, Validation Policies, และการประมวลผลไฟล์อัตโนมัติ (Compression & WebP Pipeline)

---

## 3. Goals
- บังคับใช้ขนาด Resolution และ Aspect Ratio ที่ชัดเจนสำหรับทุกประเภทการใช้งาน
- ป้องกันการอัปโหลดไฟล์ขนาดใหญ่เกินจำเป็นด้วยการจำกัดขนาดไฟล์ไม่เกิน 10MB
- จัดระบบโครงสร้างโฟลเดอร์สำหรับจัดเก็บสื่อบน Cloud Storage อย่างเป็นหมวดหมู่

---

## 4. Production Asset Matrix

| รายชื่อ Asset | มิติกำหนด (Resolution) | อัตราส่วน (Ratio) | ประเภทไฟล์ที่รองรับ | โฟลเดอร์ที่เก็บ |
| :--- | :--- | :--- | :--- | :--- |
| **Event Logo** | 512 × 512 px | 1:1 | PNG / SVG | `events/branding/` |
| **Event Cover** | 1920 × 1080 px | 16:9 | JPG / PNG | `events/covers/` |
| **Ticket Header** | 1080 × 320 px | แบนกว้าง | PNG | `tickets/` |
| **Artist Cover** | 1200 × 1200 px | 1:1 | JPG | `artists/` |
| **Artist Background**| 1920 × 1080 px | 16:9 | JPG | `artists/` |
| **Gallery Image** | 1600 × 1200 px | 4:3 | JPG | `gallery/` |
| **Sponsor Banner** | 1200 × 300 px | 4:1 | PNG | `sponsors/` |
| **Mobile Hero** | 1170 × 2532 px | 19.5:9 | JPG | `events/` |
| **Landing Thumbnail**| 1200 × 630 px | 1.91:1 | JPG | `events/` |
| **Social Share** | 1200 × 630 px | 1.91:1 | PNG / JPG | `branding/` |
| **Favicon Icons** | 512, 256, 64, 32, 16 px | 1:1 | PNG / ICO | `branding/` |

---

## 5. Storage Directory & Naming Conventions

### 5.1 Storage Folder Structure
```text
events/
├── branding/
├── covers/
artists/
gallery/
sponsors/
tickets/
```

### 5.2 Naming Standards
- Event Cover: `event-cover.jpg`
- Artist Cover: `artist-cover.jpg`
- Gallery Photo: `gallery-001.jpg`
- Sponsor Banner: `sponsor-01.png`

---

## 6. Client Auto Validation & WebP Pipeline
- **Validation Before Upload**: ตรวจสอบขนาดพิกเซล, สัดส่วน Ratio, ประเภทไฟล์ (PNG, JPG, WEBP, SVG) และขนาดไฟล์ <= 10MB
- **Compression & Conversion**: อัปโหลดขึ้นเซิร์ฟเวอร์ -> บีบอัดไฟล์ -> แปลงเป็นฟอร์แมต WebP อัตโนมัติ -> ส่งผ่าน CDN พร้อม Cache-Control Header
- **Default Placeholder**: หากไม่มีการอัปโหลดไฟล์ ระบบจะใช้ภาพ Placeholder ประจำประเภท Asset โดยอัตโนมัติ

---

## 7. Acceptance Criteria
- ✓ ไฟล์อัปโหลดทั้งหมดได้รับการตรวจสอบฝั่ง Client ก่อนส่งขึ้น Cloud
- ✓ ระบบแปลงไฟล์เป็น WebP และแจกจ่ายผ่าน CDN ด้วยเวลาโหลดเฉลี่ย < 200ms
