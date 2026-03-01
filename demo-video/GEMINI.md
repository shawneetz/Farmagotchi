# Project Overview
This is a **Remotion** project named `demo-video`, designed for creating programmatic videos using React, TypeScript, and Tailwind CSS.

## Tech Stack
- **Framework:** [Remotion](https://www.remotion.dev/) (v4.0.429)
- **UI Library:** React (v19.2.3)
- **Styling:** Tailwind CSS (v4.0.0) with `@remotion/tailwind-v4`
- **Language:** TypeScript
- **Linting:** ESLint with `@remotion/eslint-config-flat`

## Architecture
- `src/index.ts`: The entry point that registers the Remotion root.
- `src/Root.tsx`: Defines the compositions, including IDs, dimensions, FPS, and duration.
- `src/Composition.tsx`: The main component where the video animation logic resides.
- `remotion.config.ts`: Configuration file for the Remotion CLI, enabling Tailwind v4 and setting rendering preferences (e.g., JPEG format).
- `src/index.css`: Global styles, primarily importing Tailwind CSS.

## Building and Running

### Development
Start the Remotion Studio to preview your video:
```bash
npm run dev
```

### Rendering
Render the video to a file:
```bash
npx remotion render
```
*Note: The current configuration defaults to JPEG frames and will overwrite existing output.*

### Other Commands
- **Lint & Typecheck:** `npm run lint`
- **Bundle:** `npm run build`
- **Upgrade Remotion:** `npm run upgrade`

## Development Conventions
- **Styling:** Use Tailwind CSS v4 utility classes.
- **Animations:** Follow Remotion's interpolation and spring primitives.
- **Best Practices:** Refer to the local documentation in `.agents/skills/remotion-best-practices/SKILL.md` for domain-specific guidance on audio, captions, transitions, and more.
- **File Length:** Keep files under 400 lines of code as per global instructions.

## Memories
- **2026-02-28:** Initial project analysis and creation of `GEMINI.md`. Identified Remotion v4 + Tailwind v4 stack. Refined `SCRIPT.md` with Remotion-specific timing, camera orchestration notes, and asset mapping. Set **Geist Pixel** as primary font and defined `neutral-100`/`primary-100` color scheme.
- **2026-02-28:** Rewrote `SCRIPT.md` as a 120s minimalistic product demo. Added technical implementation details for Remotion (Camera rig, Typewriter, Transitions, Spring configs). Mapped all video assets (`home.mp4`, `tasker.mp4`, etc.) to specific feature scenes.
- **2026-03-01:** Redesigned `Scene1.tsx` for a 3-second duration (180 frames). Updated background to `#f6ffe9`, font to **Questrial**, and text color to `#121212`. Enlarged logo to 300x300 and increased text sizes while removing bold weights and reducing letter spacing for a more compact, modern look. Implemented a global fade-out for the scene's final 30 frames. Fixed linting and font loading issues in `Scene2.tsx`.
- **2026-03-01:** Modified `Scene2.tsx` to implement a left-right split. Moved staggered text to the left side and placed the `home.mp4` video inside a phone-style container (rounded corners, thick grey borders, notch) on the right side.
- **2026-03-01:** Updated `Scene1.tsx` to use **Geist Pixel**, adjusted logo/text positions for better centering, and refactored "day[0]" to stagger letter by letter. Standardized font naming across components.
- **2026-03-01:** Implemented Scene 4 (Expense Tracking). Added orchestrated zoom and pan sequences (zoom to "manage", then to "add resource", then zoom out). Configured video timing for `finance.mp4` (starts at 3s, ends at 20s) and extended scene duration to 17s for a sustained zoom-out finish. Simplified `index.css` as font loading is now handled locally in each scene via `@remotion/fonts`.
- **2026-03-01:** Implemented Scene 9 (Outro) with a more casual, cinematic aesthetic. Replaced the punchy animations with smooth, slow springs and a continuous upward drift for the entire scene. Added a unique blur-to-focus text reveal, a smooth wipe-in effect for the "Farmagotchi" title alongside the logo, and a casual URL sign-off (`farmagotchi.app`) with an animated underline instead of a heavy CTA button.
- **2026-03-01:** Implemented `Scene5` (AI Crop Check) with a side-by-side split layout and a custom phone-styled video container. Integrated typewriter effects and smooth scene transitions.
- **2026-03-01:** Created `Scene2b.tsx` to insert a text-heavy interlude between Scene 2 and Scene 3 ("Your farm has feelings..."). Added an animated, inline SVG field of crops that scales up massively, bringing the camera down into the farm. Updated `Composition.tsx` sequence timings to account for the new 480-frame scene and adjusted `Root.tsx` duration to 5430 frames.
- **2026-03-01:** Optimized font loading by centralizing `loadFont` for "Geist Pixel" in `src/Root.tsx` and removing redundant local `loadFont` calls and `@remotion/fonts` imports from all individual scene files.
