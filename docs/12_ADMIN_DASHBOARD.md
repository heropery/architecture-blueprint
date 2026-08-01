# 12 — Admin Dashboard (WATCHER-ADMIN-001)

## Document Information
* **Document ID**: `WATCHER-ADMIN-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Design Freeze`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดข้อกำหนดทางเทคนิคและการออกแบบหน้าจอ Admin Dashboard ของผู้จัดงาน โดยเน้นแนวคิด "เห็นทุกอย่างในหน้าเดียว" ผ่านโครงสร้าง Bento Dashboard ที่จัดวางข้อมูลอย่างเหมาะสมและอัปเดตแบบ Realtime

---

## 2. Scope
ครอบคลุม Bento Grid Layout, Navigation Drawer (Glassmorphism Overlay), 10 Core Dashboard Cards, Upload Specification Table, Realtime Mobile Preview System และ Responsive Behaviors

---

## 3. Goals
- รวมการบริหารจัดการงานอีเวนต์ทั้งหมด (คิว, ผู้เข้าร่วม, สื่อ, สปอนเซอร์, Export) ไว้ในหน้าเดียว
- ให้ผู้จัดงานเห็นตัวอย่างหน้าจอผู้เข้าร่วมงาน (Mobile Preview) แบบ Realtime ตลอดเวลาขณะแก้ไขข้อมูล
- ป้องกันข้อผิดพลาดในการอัปโหลดไฟล์สื่อโดยระบุ Upload Specification ชัดเจน

---

## 4. User Stories
- **As an Event Admin**, I want a Bento Grid overview so I can monitor live queue, registration stats, and system activities at a glance.
- **As an Event Admin**, I want a live mobile preview container that instantly updates when I edit artist info or sponsors.
- **As an Event Admin**, I want to upload correctly sized banners with automated client-side validation.

---

## 5. Functional Requirements

### 5.1 Bento Dashboard Layout & Navigation
- **Layout System**: Bento Grid แบบปรับเปลี่ยนขนาดได้ตามชนิดของข้อมูล (KPI, Live Queue, Mobile Preview, Banner, Registration, Artist, Gallery, Landing, Sponsor, Export, Activity)
- **Navigation Drawer**: ไม่มี Sidebar หรือ Mega Menu! ใช้ปุ่ม Hamburger (Top-Left) เมื่อกดจะแสดง Glassmorphism Overlay กลางหน้าจอ
  - *Blur*: `28px` | *Opacity*: `70%` | *Animation*: Scale `95% -> 100%` | *Duration*: `280ms`

### 5.2 10 Core Dashboard Cards
1. **KPI Card**: แสดงจำนวนผู้เข้าร่วมทั้งหมด, เช็กอินวันนี้, ศิลปิน, ภาพแกลเลอรี, และสปอนเซอร์
2. **Live Queue**: เชื่อมต่อ StageFlow สตรีมมิ่งสถานะ NOW, NEXT, COMING พร้อมชื่อเพลงปัจจุบันแบบ Realtime
3. **Visitor Preview**: จำลองหน้าจอมือถือ Live แสดงผลลัพธ์ทันทีเมื่อแก้ไขข้อมูล (No refresh needed)
4. **Registration Card**: แสดงสถิติแยกตามหมวดหมู่ (Visitors, Students, Teachers, Guests, VIP) พร้อมกราฟรายชั่วโมง
5. **Artist Manager**: เพิ่ม แก้ไข ลบ จัดลำดับ (Drag & Drop) รายชื่อวงดนตรีและศิลปิน
6. **Gallery Manager**: อัปโหลด จัดเรียงรูปภาพ แก้ไขคำบรรยาย และ Preview สไตล์ Polaroid
7. **Landing Manager**: ตั้งค่า Landing URL, Button Label, Open Mode (Same tab / New tab), Enable/Disable
8. **Sponsor Manager**: อัปโหลด Banner, กำหนด วันเริ่ม-สิ้นสุด, External Link, และ Priority Order
9. **Export Card**: ปุ่มส่งออกรายงาน Excel, CSV, Google Sheets (via OAuth), และ PDF Summary Report
10. **Activity Log**: แสดงบันทึกประวัติกิจกรรมล่าสุดในระบบ (e.g. `Added Artist`, `Export Excel`, `Connected StageFlow`)

### 5.3 Asset Upload Specification Matrix
| รายการ Asset | ขนาด (Resolution) | อัตราส่วน (Ratio) | ฟอร์แมตไฟล์ |
| :--- | :--- | :--- | :--- |
| **Event Logo** | 512 × 512 px | 1:1 | PNG / SVG |
| **Event Cover** | 1920 × 1080 px | 16:9 | JPG / PNG |
| **Ticket Header** | 1080 × 320 px | แบนกว้าง | PNG |
| **Artist Cover** | 1200 × 1200 px | 1:1 | JPG |
| **Gallery Image** | 1600 × 1200 px | 4:3 | JPG |
| **Sponsor Banner** | 1200 × 300 px | 4:1 | PNG |
| **Mobile Hero** | 1170 × 2532 px | 19.5:9 | JPG |

*ระบบจะทำการ Validate ขนาดและฟอร์แมตไฟล์ฝั่ง Client ก่อนอัปโหลดทุกครั้ง*

---

## 6. Non-functional Requirements
- **Responsive Layout**:
  - *Desktop*: Full Bento Grid Layout (Multi-column)
  - *Tablet*: 2 Columns Bento Grid Layout
  - *Mobile*: Single Column Stack Cards Layout
- **Realtime Sync**: Mobile Preview สตรีมมิ่งความเปลี่ยนแปลงจาก Form State ภายใน < 100ms

---

## 7. UI/UX Guidelines
- ออกแบบโทน Dark Theme สไตล์ Minimalist พร้อม Glassmorphism Cues สำหรับ Overlay
- การโต้ตอบ Drag & Drop ใน Artist และ Gallery ต้องมี Visual Feedback 60fps

---

## 8. Technical Notes
- ใช้ HTML5 Drag and Drop API หรือ Dnd-kit ร่วมกับ React
- Mobile Preview Container ใช้ iFrame แบบ Isolated หรือ Scaled Component Container

---

## 9. Future Expansion
- เพิ่มระบบ Preset Template สำหรับการจัดวาง Bento Grid ในอีเวนต์ประเภทต่าง ๆ

---

## 10. Acceptance Criteria
- ✓ Dashboard แสดงผล Bento Cards ทั้งหมดได้ภายในหน้าจอเดียวโดยไม่ต้องกดเปลี่ยนหน้า
- ✓ Mobile Preview อัปเดตการเปลี่ยนแปลงข้อมูลแบบ Realtime ทันทีที่พิมพ์
- ✓ การอัปโหลดไฟล์ที่มีขนาดหรือฟอร์แมตไม่ตรงตาม Matrix จะถูกปฏิเสธพร้อม Toast Error ชัดเจน
