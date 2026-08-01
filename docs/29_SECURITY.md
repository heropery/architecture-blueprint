# 29 — Security & Permission Specification (WATCHER-SECURITY-001)

## Document Information
* **Document ID**: `WATCHER-SECURITY-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดข้อกำหนดความปลอดภัยและการจัดการสิทธิ์การเข้าถึงข้อมูล (Security & Permission Specification) ในระบบ Watcher ครอบคลุมการยืนยันตัวตน, Row Level Security (RLS), สิทธิ์ตามบทบาท (RBAC) และนโยบายความปลอดภัยของไฟล์สื่อ

---

## 2. Scope
ครอบคลุม Authentication Flow, 3 System Roles (Owner, Admin, Visitor), Data Privacy Rules (Public vs Private Data), Storage Buckets Security, Audit Logging, และ Session Lifetime Policies

---

## 3. Authentication & Roles Architecture

### 3.1 Auth Flow
Google OAuth -> Supabase Auth -> JWT Token Generation -> Session Context Binding

### 3.2 Role Permission Matrix

| Role | Permissions & Access Level |
| :--- | :--- |
| **Owner** | สิทธิ์สูงสุด: สร้าง/ลบ Event, Export ข้อมูล, เชื่อม StageFlow, ตั้งค่าระบบ, ดู Analytics ทั้งหมด |
| **Admin** | แก้ไขและจัดการข้อมูลภายใน Event เฉพาะที่ได้รับมอบหมายเท่านั้น |
| **Visitor** | อ่านข้อมูลที่เป็น Public ของ Event เท่านั้น (ไม่มีสิทธิ์ดูข้อมูลผู้ลงทะเบียนคนอื่น) |

### 3.3 Data Privacy Classification
- **Public Data** (Visitor เข้าถึงได้): Artist Profiles, Live Queue, Gallery Photos, Sponsor Banners, Landing Links
- **Private Data** (Owner/Admin เท่านั้น): Registrations List, Analytics Data, Audit Logs, Data Export, Event Settings

---

## 4. Technical Security Rules

### 4.1 Row Level Security (RLS) Policies
ทุก Table ในฐานข้อมูลต้องมีคอลัมน์ `owner_id` และ `event_id` และตรวจสอบ RLS ก่อนคำสั่ง `SELECT`, `INSERT`, `UPDATE`, และ `DELETE` เสมอ

### 4.2 Storage Security
จัดเก็บไฟล์ใน Buckets แยกตาม `event-id/`:
```text
event-id/gallery/
event-id/artist/
event-id/ticket/
event-id/banner/
```

### 4.3 Upload Validation & API Limits
- ตรวจสอบไฟล์ฝั่ง Client ก่อนอัปโหลด: File Type, Aspect Ratio, Size (<= 10MB)
- API Security: ตรวจสอบ JWT ในทุก Request พร้อมจำกัด Rate Limit `100 requests/min` ต่อ User

### 4.4 Audit Log Engine
บันทึกประวัติการกระทำสำคัญทุกครั้งในตาราง `activity_logs`: `Login`, `Export`, `Upload`, `Delete`, `Update`

### 4.5 Session Expiration
- Session ปกติหมดอายุภายใน **24 ชั่วโมง**
- โหมด "Remember Me" หมดอายุภายใน **30 วัน**

---

## 5. Future Ready Features
รองรับการขยายระบบความปลอดภัยในอนาคต: Multi-Factor Authentication (MFA), Email Login, Organization Multi-tenant, และ Team Member Permissions

---

## 6. Acceptance Criteria
- ✓ RLS Policies บังคับใช้ในทุก Table และบล็อกการสอบถามข้อมูลข้าม Event 100%
- ✓ บันทึก Audit Log ทุกครั้งที่มีการ Export หรือลบข้อมูลสำคัญ
