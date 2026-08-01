# WATCHER-UI-MAP-001 — Master UI Architecture & Mapping Document

## Document Information
* **Document ID**: `WATCHER-UI-MAP-001`
* **System**: Watcher Event Operating System
* **Version**: `1.0.0`
* **Status**: `Production Freeze`
* **Last Updated**: `2026-07-30`

---

## 1. Purpose
เอกสารนี้เป็น **แผนที่ของทั้งระบบ (Master System UI Map)** ที่รวบรวมทุกหน้าจอของ Watcher พร้อมระบุ Components ที่ใช้, REST API Endpoints ที่เรียก, ตารางฐานข้อมูลที่เกี่ยวข้อง และ Animation ที่ใช้ประกอบ เพื่อให้ทีมพัฒนาเปิดหน้าไหนก็รู้ทันทีว่าต้องสร้างอะไร ใช้อะไร เชื่อมอะไร โดยไม่ต้องเดาหรือค้นหาเอกสารอื่น

---

## 2. Global System Hierarchy Tree

```text
Watcher System
├── Landing Page (External Redirect)
├── Login (Google OAuth)
├── Admin Dashboard (Bento Grid)
│   ├── KPI Widget
│   ├── Registration Widget
│   ├── StageFlow Connect Widget
│   ├── Gallery Manager Widget
│   ├── Landing Link Widget
│   ├── Sponsor Manager Widget
│   ├── Analytics Chart Widget
│   ├── Mobile Live Preview Widget
│   └── Data Export Widget
├── Visitor App (Vertical Flow)
│   ├── Step 1: Scan QR Code
│   ├── Step 2: Registration Form
│   ├── Step 3: Ticket Print Animation Sequence
│   ├── Step 4: Visitor Home
│   ├── Step 5: Live Queue & Schedule Timeline
│   ├── Step 6: Artist Detail Sheet
│   ├── Step 7: Polaroid Expand Gallery
│   └── Step 8: External Landing Button
└── Admin Settings & Security
```

---

## 3. Detailed Screen Specifications & Technical Mapping

### 3.1 Visitor Registration Screen
- **Components**: `HeaderLogo`, `VisitorFormInput` (Fullname, Nickname), `CategorySelector` (Student, Teacher, Parent, Guest, VIP), `SubmitButton`
- **APIs**: `POST /v1/event/:eventId/registrations`
- **Tables**: `registrations`
- **Animation**: `FadeIn` (250ms), `InputFocusGlow`, `ButtonTapScale` (0.98)

### 3.2 Visitor Ticket Animation Screen
- **Components**: `TicketCard`, `PrinterGraphic`, `ReceiptAnimationContainer`, `TapAnywhereCTA`
- **APIs**: None (Uses state from Step 2)
- **Tables**: `registrations`
- **Animation**: `Ticket4StageSequence` (QR Compress -> Center Float -> Printer Top-Down 900ms -> Spring Drop Fall)

### 3.3 Visitor Home Screen
- **Components**: `HeroBanner`, `LivePerformanceCard`, `QueueTimeline`, `SponsorCarousel`, `GalleryPreview`, `BottomNavigation`
- **APIs**: `GET /v1/events/:id`, `GET /v1/event/:id/stageflow/live`, `GET /v1/event/:id/sponsors`
- **Tables**: `events`, `queue_cache`, `sponsors`
- **Animation**: `FadeIn` (250ms), `LiveCardGlow`, `BannerAutoSlide` (5s)

### 3.4 Visitor Artist Detail View
- **Components**: `ArtistHeaderCover`, `BandMembersList`, `SongList`, `NowPlayingHighlight🎵`, `SocialBadges`
- **APIs**: `GET /v1/event/:eventId/artists/:id`, `GET /v1/event/:eventId/songs`
- **Tables**: `artists`, `songs`
- **Animation**: `BottomSheetSpring` (250ms), `SongGlowPulse`, `SocialIconHover`

### 3.5 Visitor Gallery Screen
- **Components**: `PolaroidPhotoGrid`, `LightboxModal`, `PhotoCaptionContainer`
- **APIs**: `GET /v1/event/:eventId/gallery`
- **Tables**: `galleries`, `gallery_images`
- **Animation**: `PolaroidExpandModal` (400ms), `SwipeNextTransition`

### 3.6 Admin Bento Dashboard
- **Components**: `BentoGridContainer`, `KPIStatCard`, `LiveQueueWidget`, `RegistrationChart`, `ArtistManagerWidget`, `GalleryManagerWidget`, `SponsorManagerWidget`, `LandingManagerWidget`, `ExportWidget`, `MobileLivePreviewContainer`, `GlassmorphismDrawerNav`
- **APIs**: `GET/POST/PATCH /v1/events/:id`, `GET /v1/event/:id/analytics`, `GET /v1/event/:id/stageflow/live`
- **Tables**: `events`, `registrations`, `artists`, `galleries`, `sponsors`, `analytics`, `activity_logs`
- **Animation**: `BentoCardScrollRise` (24px Y-shift), `GlassDrawerScale` (Scale 95%->100%, Blur 24px, 280ms), `MobilePreviewRealtimeSync`

---

## 4. Acceptance Criteria
- ✓ นักพัฒนาสามารถสร้างหน้าจอทั้งหมดได้ครบถ้วนโดยดู Component, API, Table และ Animation จากเอกสารนี้โดยไม่ต้องคาดเดา
