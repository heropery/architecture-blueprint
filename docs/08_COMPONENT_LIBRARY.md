# 08 — UI Component Library (WATCHER-COMPONENT-001)

## Document Information
* **Document ID**: `WATCHER-COMPONENT-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดคลังคอมโพเนนต์ส่วนเชื่อมต่อผู้ใช้ (Component Library Specification) ที่ยึดปรัชญาการออกแบบผสมผสาน Apple Human Interface + Linear + Arc Browser + Raycast + Glassmorphism เพื่อให้ทุกคอมโพเนนต์มีความ Minimal, Responsive, Reusable, Accessible และ Motion First

---

## 2. Scope
ครอบคลุมการจัดหมวดหมู่คอมโพเนนต์ 7 หมวด (Foundation, Navigation, Data Display, Forms, Feedback, Overlay, StageFlow/Gallery) และกฎ Reusability

---

## 3. Goals
- สร้าง Atomic UI Components ที่สามารถนำกลับมาใช้ซ้ำได้ในระบบอย่างน้อย 3 จุด
- ควบคุมมาตรฐานปุ่ม การ์ด ดรอเวอร์ ไดอะล็อก และแอนิเมชันให้เป็นหนึ่งเดียวกันทั้งแอปพลิเคชัน
- งดเว้นการใช้ Lottie โดยใช้ Framer Motion สำหรับ Motion First Components ทั้งหมด

---

## 4. User Stories
- **As a Front-end Developer**, I want clean component interfaces with exact props so I can build UI rapidly without CSS fragmentation.
- **As a User**, I want tactile, fast, glassmorphic UI elements that respond predictably to touches and clicks.

---

## 5. Functional Requirements

### 5.1 Component Categories & Specifications

#### 1. Foundation Components
- **Button (4 Standard Types)**:
  - *Primary*: Background Primary Color, Radius 16px, Height 48px (ใช้กับ Save, Continue, Register, Export)
  - *Secondary*: พื้นโปร่ง, Border Thin (ใช้กับ Cancel, Back)
  - *Ghost*: ไม่มีพื้นหลัง, Hover Opacity Change
  - *Danger*: สีแดง Alert (ใช้กับ Delete, Reset)
- **Card**: ทุก Card ใช้ Border Radius `24px` | Shadow `0 8px 30px rgba(0,0,0,0.12)` | Padding `24px`
- **Input**: รองรับ Text, Email, Phone, Number, Select, Search | Label อยู่ด้านบน, Helper Text อยู่ด้านล่าง

#### 2. Navigation Components
- **Hamburger Button**: ปุ่ม `☰` อยู่ตำแหน่ง Top-Left ของทุกหน้า
- **Navigation Drawer**: สลับเปิดด้วย Glass Overlay (`Blur 28px`, `Opacity 70%`, Scale `95% -> 100%`)

#### 3. Data Display Components
- **Stat Card**: ใช้ใน Dashboard (Visitors, Artists, Sponsors, Live Queue) รองรับ Icon, Trend, Percentage
- **Timeline**: แสดง StageFlow Status (NOW, NEXT, COMING)
- **Artist Card / Gallery Card / Sponsor Card**: แสดงข้อมูลสรุปพร้อมการแตะเพื่อเปิด Bottom Sheet / Lightbox

#### 4. Feedback & Overlay Components
- **Toast**: 4 Status Colors (Success, Warning, Error, Info) | Duration `2500ms`
- **Glass Dialog**: Glassmorphism (`Blur 24px`, `Radius 28px`)
- **Bottom Sheet**: ใช้สำหรับแสดงข้อมูล Artist, Song, Gallery, Event (เปิดเป็น Overlay ไม่เปลี่ยนหน้าใหม่)
- **QR Dialog**: แสดง QR Code, Logo, Title, Copy Link, Download

#### 5. Special StageFlow & Ticket Components
- **Ticket Component**: แสดง Header, Visitor Name, Ticket Number, QR Code, Footer
- **Receipt Animation Sequence**: Generate -> Ticket Drop -> Printer Animation -> Receipt -> Fade Out
- **Empty State**: มี Illustration + Copywriting + CTA ปุ่มเสมอ (เช่น `No Gallery Yet - Upload your first photo`)
- **Skeleton**: Component Skeleton Loader สำหรับ Card, List, Image, และ Timeline

---

## 6. Non-functional Requirements
- **Naming Conventions**: `Button`, `Card`, `ArtistCard`, `GalleryCard`, `SponsorCard`, `QueueTimeline`, `TicketAnimation`, `Drawer`, `BottomSheet`, `Toast`, `QRCodeModal`
- **Motion Constraint**: ใช้ Framer Motion เท่านั้น ห้ามใช้ Lottie Library

---

## 7. UI/UX Guidelines
- ทุก Interactive Component ต้องมี Active/Hover State และสนับสนุน Screen Readers
- Bottom Sheet และ Drawer ต้องรองรับ Gesture Drag-to-Dismiss บนอุปกรณ์ไร้สาย

---

## 8. Technical Notes
- สร้างด้วย React, TypeScript และ Tailwind CSS ร่วมกับ Headless UI / Radix Primitives
- ธีมถูกฉีดผ่าน CSS Custom Properties จาก Event Theme JSON Token

---

## 9. Future Expansion
- รองรับ Micro-interaction Sound Effects สำหรับเครื่องสแกนและตั๋วดิจิทัล

---

## 10. Acceptance Criteria
- ✓ ทุก Component สามารถนำกลับมาใช้ซ้ำ (Reusable) ได้อย่างน้อย 3 จุดในระบบ
- ✓ ไม่มี Component ใดสร้างด้วย Lottie (ใช้ Framer Motion 100%)
