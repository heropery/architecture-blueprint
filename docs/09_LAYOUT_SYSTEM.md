# 09 — Layout & Responsive Rules (WATCHER-RESPONSIVE-001)

## Document Information
* **Document ID**: `WATCHER-RESPONSIVE-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Frozen`
* **Last Updated**: `2026-07-30`

---

## 1. Responsive Breakpoints & Layout Matrix
- **Desktop (>= 1280px)**: Full Multi-column Bento Grid Admin Dashboard + Live Mobile Preview Frame Side-by-side
- **Tablet (768px - 1279px)**: 2 Columns Bento Grid Stack
- **Mobile Phone (< 768px)**: Single Column Vertical Flow Layout (Thumb friendly touch target 48x48px, Bottom Nav 72px)
- **Foldable & Landscape**: Auto Scaled Container Grid with zero horizontal scroll

---

## 2. Acceptance Criteria
- ✓ รองรับการแสดงผลทุกขนาดหน้าจอโดยไม่มี Content Overflow หรือ Layout Shift (CLS = 0)
