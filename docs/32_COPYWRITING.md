# 32 — Error Handling & Copywriting (WATCHER-ERROR-001)

## Document Information
* **Document ID**: `WATCHER-ERROR-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Standard Error Messages & UI Handling

| Trigger / Condition | Toast / UI Message | User Recovery Action / CTA |
| :--- | :--- | :--- |
| **Network Offline** | `You're offline. Some live data unavailable` | ปุ่ม Retry & Offline Indicator Bar |
| **StageFlow Disconnected** | `StageFlow Reconnecting... Last updated 2 min ago` | Auto Reconnect 3s + Manual Sync Button |
| **Invalid QR Scan** | `Invalid QR Code. Please try scanning again` | ปุ่ม Re-scan QR |
| **Google Login Failed** | `Google Authentication failed. Please retry` | ปุ่ม Sign in with Google |
| **Upload File Too Large** | `File exceeds 10MB limit. Please compress image` | Client-side File Filter Alert |
| **404 Not Found** | `Page Not Found - Return to Event Home` | ปุ่ม Back to Home |
| **500 Server Error** | `Server error occurred. Please try again later` | ปุ่ม Refresh Page |

---

## 2. Acceptance Criteria
- ✓ ทุก Error State มี UI Error Message สุภาพ ชัดเจน และปุ่ม CTA สำหรับให้ผู้ใช้แก้ไขเสมอ (No Dead Ends)
