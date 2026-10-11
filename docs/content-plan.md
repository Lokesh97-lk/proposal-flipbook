# Content Architecture Plan

## Data Files Mapping
- `src/data/pages.js`: Flipbook Pages 1–6 content, titles, dates, layouts, quotes, milestones, and polaroid links.
- `src/data/proposal.js`: Staged reveal lines, YES / I NEED SOME TIME response texts, and folded letter ending messages.
- `src/data/memories.js`: Memories catalogue and photo metadata.
- `src/data/settings.js`: Global timing constants, audio volume defaults, and visual toggles.

## Modular Component Structure
- `src/components/Pages/Page01/` to `Page06/`: Each page exports its own standalone component and re-exports its data from `content.js` for independent styling and testing.
