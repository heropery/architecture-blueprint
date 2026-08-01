# 28 — Backend API Specifications (WATCHER-API-001)

## Document Information
* **Document ID**: `WATCHER-API-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
กำหนดข้อกำหนดมาตรฐานการพัฒนา REST API สำหรับระบบ Watcher (API Specification) ที่ใช้หลักการ REST API First โดยทุก Endpoint ถูก Prefix ด้วย `/v1/event/:eventId` เพื่อรองรับ Multi-tenant Event Architecture

---

## 2. Scope
ครอบคลุม Authentication Layer, Event APIs, Registration APIs, Content Management APIs (Artist, Song, Gallery, Sponsor, Landing), Analytics APIs, StageFlow Live Sync API, Standard Response Formats และ Rate Limits

---

## 3. Goals
- สร้างโครงสร้าง API ที่เป็นระเบียบ ทำงานรวดเร็ว และแยกข้อมูลระหว่าง Event อย่างสมบูรณ์
- บังคับใช้รูปแบบ Response เดียวกันทั่วทั้งระบบ (`success`, `data`, `message`)
- รองรับการคิวรีข้อมูลและการเชื่อมต่อแบบ Realtime ร่วมกับ Supabase PostgREST & Channels

---

## 4. Authentication Architecture
- **Auth Flow**: Google OAuth -> JWT Token -> Supabase Session Context
- **Header**: `Authorization: Bearer <JWT_TOKEN>`

---

## 5. API Endpoints Specification

### 5.1 Event Management APIs
- **Create Event**: `POST /v1/events` -> Returns `{ "id": "...", "title": "...", "slug": "..." }`
- **Get Event Details**: `GET /v1/events/:id`
- **Update Event**: `PATCH /v1/events/:id`
- **Delete Event**: `DELETE /v1/events/:id`

### 5.2 Registration APIs
- **Register Visitor**: `POST /v1/event/:eventId/registrations`
  - *Body*: `{ "fullname": "...", "nickname": "...", "category": "Student | Teacher | Parent | Guest | VIP" }`
  - *Response*: `{ "ticketNumber": "A001", "qr": "data:image/png;base64,..." }`
- **Visitor List**: `GET /v1/event/:eventId/registrations`
- **Data Export**: `GET /v1/event/:eventId/registrations/export?format=excel|csv|gsheet`

### 5.3 Content Management APIs
- **Artist Management**:
  - `GET /v1/event/:eventId/artists`
  - `POST /v1/event/:eventId/artists`
  - `PATCH /v1/event/:eventId/artists/:id`
  - `DELETE /v1/event/:eventId/artists/:id`
- **Song Management**:
  - `GET /v1/event/:eventId/songs`
  - `POST /v1/event/:eventId/songs`
- **Gallery Management**: `GET/POST/DELETE/SORT /v1/event/:eventId/gallery`
- **Sponsor Management**: Full CRUD `/v1/event/:eventId/sponsors`
- **Landing Management**: `POST/PATCH /v1/event/:eventId/landing` (Toggle Enabled/Disabled, URL)

### 5.4 Analytics APIs
- **Get Analytics**: `GET /v1/event/:eventId/analytics`
  - *Response*: `{ "total": 178, "students": 120, "teachers": 18, "guests": 40 }`

### 5.5 StageFlow Realtime API (Read-Only)
- **Get Live Performance**: `GET /v1/event/:eventId/stageflow/live`
  - *Response*: `{ "artist": "ABC Band", "song": "Blue Sky", "time": "02:33", "status": "NOW" }`

---

## 6. Standard Response & Status Codes

### 6.1 Standard JSON Formats
```json
// Success Format
{
  "success": true,
  "data": { ... }
}

// Error Format
{
  "success": false,
  "message": "Detailed error description here"
}
```

### 6.2 HTTP Status Codes
- `200 OK`: การประมวลผลสำเร็จ
- `201 Created`: สร้างทรัพยากรใหม่สำเร็จ (e.g. Registered)
- `400 Bad Request`: ข้อมูลนำเข้าไม่ถูกต้อง
- `401 Unauthorized`: ไม่พบ Token หรือ Token หมดอายุ
- `403 Forbidden`: ไม่มีสิทธิ์เข้าถึงข้อมูลของ Event นี้
- `404 Not Found`: ไม่พบข้อมูลในระบบ
- `500 Internal Server Error`: ข้อผิดพลาดในระบบฐานข้อมูลหรือเซิร์ฟเวอร์

---

## 7. Security & Rate Limiting Rules
- **Rate Limit**: ไม่เกิน `100 requests / minute` ต่อ 1 IP/User
- **Versioning**: บังคับใช้ `/v1/` Prefix เพื่อรองรับ v2 ในอนาคต

---

## 8. Acceptance Criteria
- ✓ ทุก API ต้องมี Prefix `/v1/` และโครงสร้าง Response ตามรูปแบบมาตรฐาน
- ✓ StageFlow API ทำหน้าที่อ่านข้อมูลเท่านั้น (Read-Only) ห้ามมีคำสั่งเปลี่ยนแปลงข้อมูลคิวจาก Watcher
