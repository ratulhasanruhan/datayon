# Datayon — বাংলা প্রযুক্তি ম্যাগাজিন

Official web site for **ডেটায়ন** (`datayon.bd`): responsive, SEO-friendly, Appwrite-ready.

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS v4** — light default, optional dark (navy) via `next-themes`
- **Appwrite** — `appwrite` (browser) + `node-appwrite` (server)

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Appwrite endpoint, project ID, and API key when ready.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description        |
| -------------- | ------------------ |
| `npm run dev`  | Development server |
| `npm run build`| Production build   |
| `npm run start`| Run production     |
| `npm run lint` | ESLint             |

## Project layout

- `src/app/` — routes (`/`, `/magazine`, `/articles`, `/about`)
- `src/components/` — layout, brand, UI
- `src/lib/brand.ts` — colours, name, tagline
- `src/lib/appwrite/` — server & browser clients (wire after you share Appwrite details)

## Branding

Colours: navy `#0d1b2a`, cream `#f0ebe0`, teal `#3a8fa3`. Logo: **dot-grid mark** (`LogoMark`). Fonts (same as datayon-pcard): **DM Sans**, **Noto Serif Bengali** (display), **Noto Sans Bengali** (body).
