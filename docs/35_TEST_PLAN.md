# 35 — Quality Assurance & Test Plan (WATCHER-QA-001)

## Document Information
* **Document ID**: `WATCHER-QA-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. QA Testing Framework & Checklist
- **Unit & Component Testing**: React Testing Library & Vitest สำหรับ Core UI Components
- **End-to-End Testing**: Playwright Automation Test Suite สำหรับ Visitor Flow (Scan -> Register -> Ticket Print -> Home)
- **Performance & Accessibility Testing**:
  - *Lighthouse Performance Score*: >= 90
  - *Accessibility Score (WCAG AA)*: >= 95
  - *CLS Metric*: 0 (Zero Layout Shift)
- **Manual Verification Checklist**:
  - [x] Responsive Check (Mobile, Tablet, Desktop, Touch TV)
  - [x] Browser Console (0 Errors, 0 Warnings)
  - [x] TypeScript Strict Mode (0 Type Errors)
  - [x] Animation Frame Rate (Smooth 60fps)
  - [x] Memory Leak Audit (Clean Unmount on Destroy)

---

## 2. Acceptance Criteria
- ✓ ผ่านการทดสอบตาม QA Checklist ทุกข้อก่อน Deploy สู่ Production
