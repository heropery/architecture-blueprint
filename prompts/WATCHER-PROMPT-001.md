# 39 — AI Prompt Library & Master Build Prompt (WATCHER-PROMPT-001)

## Document Information
* **Document ID**: `WATCHER-PROMPT-001`
* **System**: Watcher Event Operating System (ARTSHUU Platform)
* **Version**: `1.0.0`
* **Status**: `Production Locked`
* **Last Updated**: `2026-07-30`

---

## 1. Primary Instruction for AI Assistant

You are the Lead Engineer building **Watcher** — The Event Companion & Operating System within the **ARTSHUU Platform Ecosystem**.

### STRICT NON-NEGOTIABLE AI RULES:
- **DO NOT REDESIGN**. Do not simplify, do not rename, do not alter UX, and do not change colors or layouts on your own.
- **FOLLOW SPECIFICATIONS EXACTLY**. If any requirement is unclear, ASK FOR CLARIFICATION FIRST before coding.
- **M0 ARCHITECTURE LOCK FIRST**: Generate Architecture Lock Report and wait for approval before writing production code.
- **DESIGN SYSTEM FIRST**: Build Theme -> Tokens -> UI Components -> Layouts BEFORE constructing screen views.
- **NO LOTTIE / FRAMER MOTION ONLY**: Use Framer Motion for all animations (Ticket Print 900ms, Spring Drop, Glass Drawer).

---

## 2. Phase 4 Initial Analysis Prompt (Copy & Paste Ready)

```text
Read every document inside this project starting from 00_START_HERE.md before making any changes.

Do not generate any code yet.

Your first task is to perform M0: Architecture Lock by producing an Architecture Lock Report covering:
1. Complete Folder Structure & Module Boundaries
2. Full Route Tree
3. Database Tables & RLS Strategy
4. Component Hierarchy & Design Tokens List
5. State Management Strategy (Zustand Stores)
6. StageFlow Sync & Realtime Strategy
7. Identified Risks & Technical Assumptions

Strict Constraints:
- Do not redesign. Do not simplify. Do not rename. Do not alter UX or colors on your own.
- If any requirement is unclear, ask first.

Do NOT write production code until I approve this Architecture Lock Report.
```

---

## 3. Phase 6 Milestone 1 Design System Prompt (Copy & Paste Ready)

```text
Architecture Lock Approved! Now proceed to Milestone 1 (M1: Design System & Tokens):

Build the Design System Foundations FIRST before constructing any screen pages:
1. CSS Variables & Tailwind Config for Colors, Typography, Glass Blur (24px), Radius (24px), 8pt Spacing Grid.
2. Atomic UI Components: Primary/Secondary/Ghost/Danger Buttons, Glass Card, Input, Toast, Badge.
3. Framer Motion Wrappers (Fade, Slide, Scale, Spring Drop).
4. Layout Primitives (Container, Bento Grid Shell, Glass Overlay Nav Drawer).

Do not build Dashboard or Visitor screens yet.
```
