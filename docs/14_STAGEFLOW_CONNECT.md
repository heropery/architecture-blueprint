# 14 — StageFlow Integration Specification (WATCHER-STAGEFLOW-001)

## Document Information
* **Document ID**: `WATCHER-STAGEFLOW-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดคู่มือและสเปกการเชื่อมต่อระบบ Watcher เข้ากับ StageFlow (StageFlow Integration Specification) โดยยึดปรัชญา **Watcher ไม่จัดการ Queue เอง แต่เป็นเพียงผู้บริโภคข้อมูล (Queue Reader) จาก StageFlow เท่านั้น**

---

## 2. Scope
ครอบคลุม Connection Workflow, Data Sync Protocol, Realtime Updates, UI Performance Binding, Offline Fallbacks, และ Disconnect Procedures

---

## 3. Integration Workflow & Pairing
```text
StageFlow -> Share QR / Room Code -> Watcher Connect -> Live Sync -> Visitor Display
```
1. Admin กดปุ่ม **"Connect StageFlow"** บน Admin Dashboard
2. ระบบแสดง QR Code หรือให้กรอก **Room Code** จาก StageManager
3. Watcher สแกน/กรอกรหัสเพื่อจับคู่กับ Event ทันที

---

## 4. Synchronized Data Schema
Watcher อ่านข้อมูล Realtime ต่อไปนี้จาก StageFlow:
- **Current Artist**: ชื่อวง/ศิลปินที่กำลังแสดงบนเวที
- **Next Artist**: ศิลปินคิวถัดไป
- **Queue List**: ลำดับการแสดง (NOW, NEXT, COMING)
- **Song List & Current Song**: รายชื่อเพลงและเพลงที่กำลังเล่นอยู่
- **Performance Status**: สถานะเวที (NOW, PAUSED, FINISHED)
- **Remaining Time**: เวลาที่เหลือของเพลง/โชว์ปัจจุบัน

---

## 5. Sync Protocol & Realtime Behavior
- **Realtime Sync**: สตรีมข้อมูลผ่าน Supabase Realtime Channels / WebSockets
- **Fallback Polling**: หากการเชื่อมต่อ Realtime ขัดข้อง ให้สลับเป็น Polling API ทุก **3 วินาที** อัตโนมัติ
- **UI Realtime Updates**:
  - *Live Card*: แสดงข้อมูล NOW PLAYING, ชื่อเพลง และ เวลาที่เหลือ Realtime
  - *Artist Detail View*: อัปเดตไฮไลต์เพลงอัตโนมัติทันทีที่ StageFlow เปลี่ยนเพลง
  - *Queue View*: อัปเดตป้ายสถานะ NOW / NEXT / COMING ทันที
- **Offline Handling**: หาก StageFlow ขาดการติดต่อ แสดงข้อความ warning `Last Updated 2 min ago` บนหน้าจอ
- **Manual Disconnect**: Admin สามารถกด Disconnect ยุติการเชื่อมต่อกับ StageFlow ได้ตลอดเวลา

---

## 6. Future Expansion
รองรับการเชื่อมต่อกับหลายเวทีพร้อมกันใน Event เดียว (e.g. Main Stage, Mini Stage, Workshop Area)

---

## 7. Acceptance Criteria
- ✓ Watcher ซิงค์ข้อมูลคิวและเพลงจาก StageFlow ได้อย่างสมบูรณ์โดยมี Delay < 500ms
- ✓ เมื่อ StageFlow เปลี่ยนเพลง หน้าจอ Artist Detail ใน Visitor App ไฮไลต์เพลงใหม่ทันทีโดยไม่ต้อง Refresh
