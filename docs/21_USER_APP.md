# 21 — User App Flow & Architecture (WATCHER-UX-001)

## Document Information
* **Document ID**: `WATCHER-UX-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Design Freeze`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดข้อกำหนดมาตรฐานประสบการณ์ผู้ใช้งาน (User Experience Flow Specification) สำหรับ Visitor App โดยถือเป็น Companion App สำหรับผู้เข้าร่วมงานที่ต้องใช้ง่าย ไม่ต้องมีเมนูซับซ้อน รองรับการใช้งานมือถือมือเดียว และผู้ใช้ใหม่สามารถใช้งานเป็นได้ภายใน 5 วินาที

---

## 2. Scope
ครอบคลุมปรัชญา UX, 5 UX Principles, Visitor Journey ทั้งหมด 7 ขั้นตอน (Scan -> Register -> Ticket Animation -> Home -> Live Queue -> Artist -> Gallery -> Landing), Error States, Success Feedback, Accessibility และ Animation Timings

---

## 3. Goals
- สร้าง Companion App ที่ผู้เข้าร่วมงานเปิดค้างไว้ตลอดทั้งงาน ไม่ใช่แค่สแกนแล้วปิด
- จำกัดจำนวนหน้าหลักไม่เกิน 7 หน้า เพื่อความเรียบง่ายสูงสุด
- การปฏิสัมพันธ์ทุกจุดต้องสอดคล้องกับ One Screen = One Job และ Progressive Disclosure

---

## 4. User Stories
- **As a Visitor**, I want to scan a QR code and register within 15 seconds without filling out complex forms.
- **As a Visitor**, I want to see a clear, high-impact ticket animation so that I know my registration was successful.
- **As a Visitor**, I want to see live performance status (Now Playing / Live Queue) updated in real-time so that I never miss my favorite stage.

---

## 5. Functional Requirements

### 5.1 Visitor Flow (7 Key Steps)
1. **Step 1: Scan QR** -> สแกน QR แล้วเปิดแอป Watcher ทันที
2. **Step 2: Registration** -> กรอก ชื่อจริง, ชื่อเล่น, และเลือกประเภทผู้เข้าร่วม (นักเรียน, นักศึกษา, ครู, อาจารย์, ผู้ปกครอง, บุคคลทั่วไป, VIP) แล้วกด Confirm
3. **Step 3: Ticket Animation (4 Stages)**
   - *Stage 1*: QR ยุบตัวกลายเป็นตั๋ว
   - *Stage 2*: ตั๋วลอยลงมาตรงกลางจอ
   - *Stage 3*: เครื่อง Printer ปริ้นตั๋วจากบนลงล่าง (ความเร็ว ~900ms)
   - *Stage 4*: ตั๋วหล่นลงลายนอกจอ พร้อมปุ่ม "Tap Anywhere" เข้าสู่ Home
4. **Step 4: Home Layout** -> Banner -> Live Performance (Now Playing) -> Queue (5 คิวถัดไป) -> Gallery -> About Event (เรียงลงด้านล่าง ไม่ต้อง Scroll เยอะ)
5. **Step 5: Artist Detail** -> แสดง Cover, Description, Band Members, Song List (Highlight เพลงปัจจุบันด้วย Glow 🎵), และ Social Contacts (FB, IG, YT, TikTok, Web)
6. **Step 6: Gallery** -> Polaroid Expand Animation (แตะรูป -> ขยาย -> อ่านคำบรรยาย -> ปัดต่อ)
7. **Step 7: Landing** -> กด About Event / Landing แล้วเปิด External URL (Framer, Webflow, Lovable ฯลฯ) ใน Tab ใหม่ทันที

### 5.2 Error & State Management
- **ไม่มีคิว**: แสดง `No performance yet`
- **ไม่มีรูปภาพ**: แสดง `Gallery coming soon`
- **ไม่มี Landing**: ซ่อน Card โดยอัตโนมัติ
- **Offline Mode**: แสดง `You're offline. Some live data unavailable`
- **Success Feedback**: มี Toast/Badge เสมอ (`✓ Registered`, `✓ Opened`, `✓ Copied`, `✓ Updated`)

---

## 6. Non-functional Requirements & Motion Timing
- **Thumb Friendly**: พื้นที่สัมผัส (Touch Target) ขั้นต่ำ `48 x 48 px` | Bottom Navigation สูง `72 px`
- **Animation Timings (Framer Motion Only)**:
  - Register Transition: `400 ms`
  - Ticket Drop: `500 ms`
  - Receipt Print: `900 ms`
  - Card Expand: `300 ms`
  - Gallery Expand: `400 ms`
  - Bottom Sheet: `250 ms`
  - Navigation Drawer: `280 ms`
- **Accessibility**: Contrast Ratio ขั้นต่ำ AA, รองรับ Dynamic Text, Reduced Motion, และ Screen Reader

---

## 7. UI/UX Guidelines
- **One Screen = One Job**: แต่ละหน้ามีหน้าที่เดียว ห้ามซ้อนข้อมูลที่ไม่เกี่ยวข้อง
- **Progressive Disclosure**: แสดงข้อมูลทีละระดับ เช่น คิวเห็นแค่ (ชื่อวง/เวลา/สถานะ) เมื่อแตะจึงขยายแสดง (เพลง/สมาชิก/ช่องทางติดต่อ)
- **No Dead End**: ทุกหน้าต้องมีปุ่มหรือ CTA ไปต่อเสมอ (ดูคิว -> ดูวง -> ดูภาพ -> กลับหน้าหลัก)
- **Motion with Purpose**: แอนิเมชันต้องใช้อธิบายสถานะระบบ (เช่น การปริ้นตั๋วสื่อถึงการลงทะเบียนสำเร็จ) ห้ามใส่เพื่อความสวยงามเพียงอย่างเดียว

---

## 8. Technical Notes
- สถานะ Now Playing ดึงจาก StageFlow Realtime API
- ข้อมูล Artist, Gallery และ Landing ถูกจัดเก็บใน Supabase และซิงค์ตาม `event_id`
- การสลับหน้าทั้งหมดใช้ Framer Motion Page Transition

---

## 9. Future Expansion
- รองรับ Dynamic QR Code Code Refresher สำหรับ VIP Tickets
- รองรับ Haptic Feedback ในอุปกรณ์มือถือขณะสแกนและรับตั๋ว

---

## 10. Acceptance Criteria
- ✓ สถาปัตยกรรม Visitor Journey ต้องไม่เกิน 7 หน้าหลัก
- ✓ การสัมผัสปุ่มทุกจุดต้องมีขนาดไม่ต่ำกว่า 48x48 px และตอบสนองภายใน 100ms
- ✓ สแกน QR และลงทะเบียนจนเสร็จสิ้นใช้เวลาไม่เกิน 15 วินาที
