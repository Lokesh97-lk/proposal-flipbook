# 3D Animation & Physics Architecture

## 1. Opening Animation (BOTTOM-LEFT ↗ TOP-RIGHT)
- **Container**: `perspective: 1400px`, `transform-style: preserve-3d`.
- **Phase 1 (Lift)**: Paper floats towards the user (`scale: 1.08`, `y: -25px`, `rotateX: 8deg`). Ground shadow intensifies.
- **Phase 2 (Flap 1)**: Bottom-left quadrant swings open along its hinge (`rotateX: 0deg`, `rotateY: 0deg`), uncreasing the lower left fold.
- **Phase 3 (Flap 2)**: Top-right quadrant unrolls upward and outward toward the top-right corner.
- **Phase 4 (Settle & Sweep)**: Letter flattens squarely into Page 1; a soft light sweep passes across the parchment texture.

## 2. Page Turn Animation (3D Book Spine)
- **Transform Origin**: Left-center axis (`transform-origin: left center`).
- **Leaf Rotation**: `rotateY: 0deg → -180deg` for forward turning, `-180deg → 0deg` for backward.
- **Dynamic Curl Shadow**: Linear gradient shadow sweeps across the turning sheet (`opacity: 0 → 0.5 → 0`), simulating physical paper curl.
- **Audio Synchronization**: Triggers `page-turn` flutter sound on initiation.

## 3. Reverse Closing Animation (TOP-RIGHT ↙ BOTTOM-LEFT)
- Exact reverse of opening:
  - Top-right flap folds downward and inward.
  - Bottom-left flap folds over to seal the sheet.
  - Scale transitions from reading spread to compact folded envelope (`scale: 0.88`, `rotateZ: -1.5deg`).
- Settles back into the floating folded letter under moonlight.
