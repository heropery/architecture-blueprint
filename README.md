# Architecture Blueprint

Read every document inside this project starting from 00_START_HERE.md before making any changes.

Do not generate any production code yet.

Your first task is to perform M0: Architecture Lock by reading all markdown files in docs/, prompts/, and README.md, then producing an Architecture Lock Report covering:

1. Complete Folder Structure (Feature-First Architecture) & Module Boundaries

2. Full Route Tree

3. Database Tables (Supabase PostgreSQL) & Row Level Security (RLS) Strategy

4. Component Hierarchy & Design Tokens List (Colors, Glass 24px, Radius 24px, Spacing Grid)

5. State Management Strategy (Zustand Stores)

6. StageFlow Sync & Realtime Integration Strategy (Read-Only Queue Consumer)

7. Identified Risks & Technical Assumptions

STRICT CONSTRAINTS TO OBEY WITHOUT EXCEPTION:

- DO NOT REDESIGN. Do not simplify, do not rename, do not alter UX, and do not change colors or layouts on your own.

- NO SIDEBAR. NO MEGA MENU. Admin Dashboard MUST use Bento Grid + Navigation Glass Drawer (Blur 24px, Opacity 70%, Scale 95%->100%, 280ms) and Live Mobile Preview Frame.

- READ-ONLY STAGEFLOW SYNC: Watcher reads queue/songs from StageFlow API. Watcher DOES NOT generate its own queue timer.

- FRAMER MOTION ONLY: All UI animations, ticket printing (Top-Down 900ms), and transitions MUST use Framer Motion. DO NOT USE LOTTIE.

- Follow every specification exactly. If any requirement is unclear, ASK FIRST.

Do NOT write production code until I approve this Architecture Lock Report.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c5b260cb-f282-404a-a530-06495a7f7d8b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
