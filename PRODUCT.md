# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
React (TypeScript), Vite, Tailwind CSS, Express, MongoDB, Redis + BullMQ, Cloudinary, Google Gemini AI

## Users
Students who take whiteboard/slide photos in classroom settings to study and revise for exams.

## Product Purpose
Revly automatically transforms lecture photos into clean, organized, subject-wise markdown revision notes with AI summaries in the background, relieving students from manual organization and forgotten gallery photos.

## Positioning
Zero-effort background conversion of photos to structured notes without changing existing student habits or requiring prompt writing/text copying.

## Operating Context
- Lectures and classroom sessions where slides or whiteboards are photographed.
- Exam preparation periods when organized, searchable, and concise revision notes are crucial.

## Capabilities and Constraints
- Background AI processing using Google Gemini for OCR and markdown note generation.
- Automated subject-based classification and organization.
- Secure email/password and Google OAuth login.
- Cloud image storage via Cloudinary and background task queuing via Redis and BullMQ.
- Focus: Currently targeting a redesign of the landing page.

## Brand Commitments
- Name: Revly
- Logo: `frontend/public/logo.png`
- Aesthetic/Vibe: Modern, premium, signifies study and learning, clean, beautiful.

## Evidence on Hand
- Live demo at `https://revly-notes.vercel.app`
- Complete code structure with functional authentication, note dashboard, subject categories, and backend processing pipelines.

## Product Principles
1. **Zero Habit Change:** Keep using the default camera app; Revly handles all extraction and organization.
2. **Instant Searchability:** AI-summarized notes must be searchable and easily accessible when study season hits.
3. **Exams-First Design:** Direct utility for fast, comprehensive exam preparation.

## Accessibility & Inclusion
- Target Standard: WCAG 2.1 AA (color contrast, clean hierarchy, keyboard accessibility).
