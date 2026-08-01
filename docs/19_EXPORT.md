# 19 — Data Export System (WATCHER-EXPORT-001)

## Document Information
* **Document ID**: `WATCHER-EXPORT-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดข้อกำหนดระบบการส่งออกข้อมูล (Export System Specification) ของ Watcher โดยยึดปรัชญา **ข้อมูลทุกอย่างต้องสามารถ Export ได้ภายใน 1 คลิก** เพื่อความสะดวกสูงสุดของผู้จัดงาน

---

## 2. Scope
ครอบคลุมรูปแบบไฟล์ที่รองรับ (Excel, CSV, Google Sheets, PDF Summary), โครงสร้างข้อมูลแต่ละชุด, การประมวลผลภาษาไทย (UTF-8 BOM), Performance Batching, และ Audit History Logging

---

## 3. Export Data Datasets

1. **Registration Export**: `Ticket No.`, `Full Name`, `Nickname`, `Category`, `Register Time`
2. **Analytics Export**: `Students`, `Teachers`, `Guests`, `VIP`, `Total Visitors Count`
3. **Artist Export**: `Artist Name`, `Genre`, `Songs List`, `Contact Info`
4. **Gallery Export**: `Image URL`, `Caption`, `Upload Date`
5. **Event Summary Report**: `Event Name`, `Duration`, `Visitors`, `Artists`, `Sponsors`, `Gallery Count`, `Landing Clicks`

---

## 4. Technical Engine Specifications
- **Google Sheets API**: เชื่อมต่อผ่าน Google API Append/Create New Sheet ลงใน Google Drive ของผู้จัดงานโดยตรง
- **Excel Engine**: สร้างไฟล์ด้วย OpenXML Standard รองรับภาษาไทยและ Unicode 100%
- **CSV Engine**: บังคับใส่ **UTF-8 BOM** เพื่อเปิดบน Microsoft Excel ได้ทันทีโดยไม่เป็นตัวอักษรต่างดาว
- **Export Audit History**: บันทึก Log ทุกครั้งประกอบด้วย (`Who`, `When`, `Format`)
- **Performance Benchmark**: รองรับการ Export ข้อมูลสูงสุด **50,000 Records** ต่อครั้ง โดยประมวลผลแบบ Batch Batching ภายใน < 5 วินาที

---

## 5. Acceptance Criteria
- ✓ ส่งออกไฟล์ CSV และ Excel ภาษาไทยเปิดใน Microsoft Excel ได้ถูกต้อง 100%
- ✓ ข้อมูล 50,000 รายการประมวลผลและดาวน์โหลดเสร็จสิ้นภายใน 5 วินาที
