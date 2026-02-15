# 🎬 Shot Studio

> **What would you shoot with infinite budget?**

Cinematic AI image generator with **director-style controls** — focal length, aperture, film stock presets, voice input, and a local gallery. One prompt, one click, one frame that looks like it cost a fortune.

[![Next.js](https://img.shields.io/badge/Next.js-14-000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Replicate FLUX](https://img.shields.io/badge/Replicate-FLUX_Schnell-FF6B35?style=flat-square)](https://replicate.com/black-forest-labs/flux-schnell)

---

## ✨ Why it’s different

- **Not just a prompt box** — Camera semantics (focal length, aperture) and film looks (Kodak 5219, Noir, Neon) are baked into the prompt so the model outputs real cinematic frames.
- **Infinite budget templates** — One-click scenarios: fantasy battle, heist, sci‑fi, noir, romance, documentary.
- **Voice input** — Describe the scene by voice; it’s appended to the prompt.
- **Reproducible** — Optional seed; last seed shown on the result so you can iterate or share exact setups.
- **Gallery** — Last 24 shots in the browser (localStorage), lightbox, “Use this shot,” remove.

---

## 🚀 Quick start

```bash
git clone https://github.com/YOUR_USERNAME/shot-studio.git
cd shot-studio
npm install
cp .env.local.example .env.local   # add REPLICATE_API_TOKEN
npm run dev
```

Open **http://localhost:3000**. Get an API token at [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens).  
You need [Replicate credit](https://replicate.com/account/billing#billing) to generate images.

> ⚠️ **Never commit `.env.local`** — it’s in `.gitignore`. Put only your token there.

---

## 🎞️ Features

| Feature | What it does |
|--------|----------------|
| **Templates** | One-click prompts: fantasy battle, heist, sci‑fi, noir, romance, documentary |
| **Film stock** | Neutral, Kodak 5219, Fuji Eterna, Noir, Bleach Bypass, Vintage, Neon/Synth — each changes the prompt for a distinct look |
| **Director’s note** | Optional line for lighting/mood (e.g. “Golden hour, backlit”) |
| **Camera** | Focal length 24–135mm, aperture f/1.4–f/8, aspect ratio 16:9, 21:9, 9:16, 1:1, 4:5 |
| **Quality** | 1 / 2 / 4 megapixels; optional seed for reproducibility |
| **Voice** | Browser speech-to-text → appends to prompt |
| **Shortcut** | ⌘↵ / Ctrl+Enter to generate |
| **Result** | REGENERATE, DOWNLOAD, COPY LINK, NEW SHOT |
| **Gallery** | Last 24 shots in localStorage, grid + lightbox |
| **UI** | Dark theme, glass panels, Framer Motion, onboarding |

---

## 🛠 Tech stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS** (custom design tokens)
- **Framer Motion** for animations and onboarding
- **Replicate** — FLUX Schnell for image generation (prompt, aspect_ratio, megapixels, seed)

---

## 📁 Project structure

```
shot-studio/
├── app/
│   ├── api/generate/route.ts   # POST → image URL + seed
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx · Hero.tsx · PromptInput.tsx · PromptTemplates.tsx
│   ├── DirectorNote.tsx · FilmStockPresets.tsx · CameraControls.tsx
│   ├── QualityAndSeed.tsx · VoiceInput.tsx · ResultPanel.tsx
│   ├── Gallery.tsx · Onboarding.tsx
├── lib/
│   ├── buildPrompt.ts          # Cinematic + film stock + director note
│   ├── promptTemplates.ts
│   └── galleryStorage.ts
├── .env.local.example
└── README.md
```

---

## 👀 For recruiters

- **Product thinking** — Camera and film semantics mapped into prompt engineering; templates and voice for fast iteration.
- **Full-stack** — Next.js API route, env handling, client state, localStorage gallery, 402/billing handling.
- **Design** — Dark theme, glass panels, motion, onboarding, responsive layout.
- **API** — Replicate integration with seed, quality, and clear error messages (e.g. “Add credit” link on 402).

---

## 📄 License

MIT.
