# Proposal Flipbook — Cinematic Interactive Letter

A cinematic, production-quality interactive proposal website built with **React**, **Vite**, **GSAP**, and **CSS3 3D Transforms**.

The site feels like a physical handwritten letter resting under moonlight that unfolds, reveals 6 intimate pages with physical page-turning physics, builds toward a heartfelt proposal with respectful response options, and folds back in reverse 3D into a closed envelope with a lasting ending message.

---

## 🌟 The Experience Journey

```text
LOADING
   ↓
INTRO / FLOATING PAPER (Levitating letter, wax seal, "OPEN THIS")
   ↓
OPENING ANIMATION (Physical 3D unfold: BOTTOM-LEFT ↗ TOP-RIGHT)
   ↓
PAGE 01: Where It Started (Large serif title, drop cap, introductory note)
   ↓
PAGE 02: The Little Things (Vintage polaroid memory & heartfelt text)
   ↓
PAGE 03: Things I Never Said (Intimate journal lines & handwritten script)
   ↓
PAGE 04: Somewhere Along The Way (Milestone chapters & photo thumbnail)
   ↓
PAGE 05: Why I'm Telling You (Large pull-quote & sincerity statement)
   ↓
PAGE 06: One Last Page (Suspense & anticipation leading to the question)
   ↓
FINAL PROPOSAL (Paced emotional reveal: "Before you close this letter..." → Question)
   ├── [ YES ] → Warm golden paper glow, soft particles, beautiful acceptance message
   └── [ I NEED SOME TIME ] → Calming, respectful understanding response
   ↓
CLOSING ANIMATION (Reverse physical 3D fold: TOP-RIGHT ↙ BOTTOM-LEFT)
   ↓
CLOSED PAPER (Resting folded letter under moonlight)
   ↓
ENDING MESSAGE ("Whatever happens next, thank you for opening this." + Replay option)
```

---

## 🚀 Quickstart

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production build
```bash
npm run build
npm run preview
```

---

## ✍️ Content Customization (Extremely Easy)

All text, images, dates, and response messages are separated from code. You **never** need to touch GSAP or CSS to change text or images!

### 1. Customize Flipbook Pages (`src/data/pages.js`)
Edit any of the 6 pages:
```javascript
{
  id: 1,
  title: "Where It Started",
  subtitle: "A small beginning",
  date: "A quiet evening",
  content: [
    "Your custom paragraph here...",
    "Another thought..."
  ],
  handwrittenNote: "Your intimate note...",
  image: null // or { src: "/images/memories/...", caption: "..." }
}
```

### 2. Customize the Proposal & Responses (`src/data/proposal.js`)
Edit the staged question reveal and both answer branches:
```javascript
export const proposalData = {
  steps: {
    step1: "Before you close this letter...",
    step2: "There is one thing I've been wanting to ask you.",
    confession: "I have feelings for you.",
    question: "Would you give me a chance to see where this could go?"
  },
  options: {
    yes: {
      message: "Thank you for giving this little letter a beautiful ending.",
      subMessage: "..."
    },
    time: {
      message: "That's completely okay.",
      subMessage: "Take all the time you need..."
    }
  },
  ending: {
    line1: "Whatever happens next,",
    line2: "thank you for opening this.",
    line3: "Some things are worth writing down.",
    signature: "— From me, to you."
  }
};
```

### 3. Add Your Photos (`src/data/memories.js` & `public/images/`)
Drop your photos into `public/images/memories/` and reference them in `src/data/memories.js` or `src/data/pages.js`.
The built-in `<SafeImage />` component automatically handles missing or loading images gracefully with an artistic sketch placeholder so your layout never breaks.

---

## 🎨 Visual & Audio Features

- **Paper Realism**: Warm cream stationery (`#faf5eb`), deckle borders, realistic crease lines, multi-layer drop shadows, and subtle fibrous grain.
- **Atmospheric Effects**: Drifting dust motes, twinkling celestial stars, moonlight radial beam, and cinematic vignette.
- **Audio Engine (`src/utils/audioUtils.js`)**:
  - Dual-engine: Preloads HTML5 audio (`.mp3` / `.wav`) with an automatic real-time **Web Audio API procedural synthesizer** fallback.
  - Zero latency, zero decode crashes, guaranteed playback across all browsers and devices.
  - Ambient soundtrack: Soft, warm romantic pentatonic chords gently cycling in the background.
  - Foley sound effects: Tactile paper rustle (`paper-open`), realistic page flip (`page-turn`), crease fold snap (`paper-fold`), and gentle click (`click`).
  - Subtle top-right toggle (`♫ SOUND ON / SOUND OFF`).
- **Interactive Controls**:
  - Keyboard navigation: `ArrowRight` (Next), `ArrowLeft` (Previous), `Spacebar` (Advance/Select), `Escape` (Replay).
  - Touch gestures: Swipe left to turn forward, swipe right to turn backward on mobile and tablet.
  - Desktop custom cursor: Smooth dot cursor that expands on clickable paper and ripples on click. Auto-disabled on touch devices.
