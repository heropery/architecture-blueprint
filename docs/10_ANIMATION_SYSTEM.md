# 10 — Animation & Motion System (WATCHER-MOTION-001)

## Document Information
* **Document ID**: `WATCHER-MOTION-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดระบบแอนิเมชันและการเคลื่อนไหว (Motion Design System) โดยเน้นหลักการ "Motion with Purpose" — ทุกการเคลื่อนไหวต้องอธิบายสถานะของระบบ ช่วยในการสื่อสาร Feedback, Focus หรือ Guidance แก่ผู้ใช้งาน ห้ามใส่เพื่อความสวยงามเพียงอย่างเดียว

---

## 2. Scope
ครอบคลุม Motion Levels, Durations, Easing curves, Page Transitions, Component Animations, Sequence Timings, และข้อกำหนด Accessibility (Reduced Motion)

---

## 3. Goals
- สร้างความรู้สึกตอบสนอง (Tactile & Liquid Feedback) ที่ลื่นไหล 60fps
- ให้ผู้ใช้รู้สถานะการทำงานผ่านแอนิเมชัน เช่น ทราบว่าการลงทะเบียนเสร็จสิ้นจากการดูเอฟเฟกต์การปริ้นตั๋ว
- บังคับใช้ไลบรารี Framer Motion เพียงไลบรารีเดียวตลอดทั้งโปรเจกต์ (No Lottie)

---

## 4. Motion Architecture & Timings

### 4.1 Motion Levels
- **Level 1 (Micro Interactions)**: Hover, Active, Tap Feedback
- **Level 2 (UI Transitions)**: Modal, Bottom Sheet, Drawer, Card Expand
- **Level 3 (Story Animations)**: Ticket Receipt Print Sequence, Registration Flow

### 4.2 Standard Duration Scale
- **Fast**: `150ms` (Button Feedback, Hover)
- **Normal**: `250ms` (Bottom Sheet, Tooltip)
- **Medium**: `400ms` (Card Expand, Gallery Polaroid)
- **Slow**: `700ms` (Ticket Drop Spring)
- **Story**: `900ms` (Receipt Printing Sequence)

### 4.3 Easing Functions
- **Primary Curve**: `easeOut` (คายตัวนุ่มนวล)
- **Spring Curve**: `type: "spring", stiffness: 300, damping: 25` (ใช้กับ Ticket Drop & Bottom Sheet)

---

## 5. Detailed Component Animation Specifications

1. **Page Transition**: Fade + Slide Y `16px` (`250ms`)
2. **Navigation Drawer**: Scale `95% -> 100%`, Opacity `0 -> 1` (`280ms`)
3. **Button Interactions**: Hover Scale `1.02` | Tap Active Scale `0.98`
4. **Card Hover**: Y `-6px` Shift + Elevation Shadow Increase
5. **Bento Card Scroll**: Fade + Rise Y `24px` เมื่อเลื่อนมาถึง viewport
6. **Registration & Ticket Sequence (~2.5s Total)**:
   - *Scan -> Verified -> Ticket Drop (Spring) -> Printer Print (Top-Down 900ms) -> Receipt Drop -> Home*
7. **Queue NOW Status**: Glow Pulsate + Scale Animation (`NOW -> LIVE`)
8. **Song Change**: Crossfade Transition `300ms`
9. **Gallery Expand**: Polaroid Expand Modal Animation `400ms`
10. **Artist Detail Sheet**: Bottom Sheet Spring Motion
11. **Sponsor Banner**: Auto Slide ทุก `5 วินาที`
12. **Landing Button**: Ripple Effect + Subtle Glow
13. **Glass Menu Overlay**: Blur `24px` + Fade + Scale Animation
14. **Skeleton Loader**: Shimmer Gradient Loop `1.2 วินาที`

---

## 6. Accessibility & Reduced Motion
- ทุกแอนิเมชันต้องตรวจสอบสื่อความต้องการของผู้ใช้ผ่าน media query `prefers-reduced-motion`
- เมื่อ Reduced Motion ถูกเปิดใช้งาน ให้ปิด Transition ขนาดใหญ่ทั้งหมด และเปลี่ยนเป็น Instant Fade (`100ms`)

---

## 7. Acceptance Criteria
- ✓ ใช้ Framer Motion เพียงไลบรารีเดียวตลอดทั้งระบบ (ไม่พบ Lottie หรือ CSS Keyframes อิสระ)
- ✓ ลำดับการปริ้นตั๋ว (Receipt Print) ทำงานสมบูรณ์แบบ Top-Down ภายใน 900ms
- ✓ สลับหน้าจอและแสดงผลด้วยเฟรมเรต 60fps โดยไม่มี Layout Shift (CLS = 0)
