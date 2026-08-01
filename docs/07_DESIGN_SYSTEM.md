# 07 — Design System, Tokens & Typography (WATCHER-DESIGN-TOKEN-001)

## Document Information
* **Document ID**: `WATCHER-DESIGN-TOKEN-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Design Tokens Architecture (Figma Variables Equivalent)
- **Color System**:
  - `Background`: `#09090B` (Zinc 950) | `Surface`: `#18181B` (Zinc 900)
  - `Primary Accent`: `#3B82F6` (Blue 500) | `Secondary Accent`: `#8B5CF6` (Purple 500 Glow)
  - `Success`: `#22C55E` (Green 500) | `Danger`: `#EF4444` (Red 500) | `Warning`: `#F59E0B` (Amber 500)
  - `Glass Base`: `rgba(24, 24, 27, 0.70)` | `Glass Border`: `1px solid rgba(255, 255, 255, 0.10)`
- **Typography Scale**:
  - *Display XL*: 48px / Line Height 1.1 / Weight 800 (Bold)
  - *Display L*: 36px / Line Height 1.2 / Weight 700
  - *Heading M*: 24px / Line Height 1.3 / Weight 600
  - *Body Regular*: 16px / Line Height 1.5 / Weight 400
  - *Caption Small*: 12px / Line Height 1.4 / Weight 500
- **Radius & Shadows**:
  - `Card Corner Radius`: `24px` | `Button Corner Radius`: `16px`
  - `Elevation Shadow`: `0 8px 30px rgba(0, 0, 0, 0.35)` | `Glass Blur`: `backdrop-filter: blur(24px)`

---

## 2. Acceptance Criteria
- ✓ โทเค็นทั้งหมดตรงตามระบบ Figma Variables และใช้งานผ่าน Tailwind Config
