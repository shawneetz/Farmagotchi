# Demo video for Farmagotchi - 120 seconds

## Global Settings
- **Framerate:** 60 fps
- **Resolution:** 1920x1080
- **Duration:** 120 seconds (7200 frames total)
- **Font:** Geist Pixel (as per project spec)
- **Colors:** neutral-100 / primary-100
- **Global Remotion Notes:** Wrap all scenes in `<Sequence>` components with accurate `from` and `durationInFrames` props. Use `@remotion/transitions` or `interpolate` on `opacity` for smooth crossfades between scenes. 

---

## Scene 1 - Introduction
**Timing:** 0s - 5s (Frames 0 - 300)
**Content:** All elements centered.
- Logo appears, shifts to the left.
- "Farmagotchi" typewriter effect to the right of the logo.
- "TIL - DAY[0]" fades up from the bottom.
- Fade out entirely.
**Remotion Implementation Notes:**
- **Logo Shift:** Use `spring({ fps: 60, frame, config: { damping: 12 } })` mapped to a `translateX` transformation to create a bouncy, natural shift left.
- **Typewriter:** Do NOT use per-character opacity. Use string slicing `text.slice(0, Math.floor(frame / framesPerChar))` to organically "type" the letters. Add a blinking cursor character `|` that toggles every 30 frames.
- **Bottom Text:** Combine `interpolate(frame, [150, 180], [0, 1])` for opacity with a `translateY` interpolation `[20, 0]` for a smooth slide-up fade.

---

## Scene 2 - Home Dashboard
**Timing:** 5s - 15s (Frames 300 - 900)
**Content:**
- Staggered text fade from right word-by-word "All the info about your crops, in one place".
- Place `home.mp4` in the center.
**Remotion Implementation Notes:**
- **Video:** Use `<OffthreadVideo src={staticFile("home.mp4")} />`. Native length is 10.3s, so it fits perfectly in this 10s slot.
- **Staggered Text:** Split the string into an array of words. Inside a `map`, calculate `delay = index * 5`. Then apply `interpolate(frame - delay, [0, 15], [0, 1])` to each word's opacity. Wrap words in inline-blocks for smooth rendering.

---

## Scene 3 - Routine Tracker
**Timing:** 15s - 30s (Frames 900 - 1800)
**Content:**
- In center staggered text fade from right "Keep tabs on your routine." then slides out to the left word by word.
- Place `tasker.mp4` in center.
- Scale up video until zoomed into the bar, then pan out to full video view.
**Remotion Implementation Notes:**
- **Video Timing:** `tasker.mp4` is ~25s long. Use `<OffthreadVideo playbackRate={1.7} />` to compress it into the 15s timeframe.
- **Zoom/Pan:** Use `spring` mapped against `scale` (from 1 to 2.5) triggered mid-scene to zoom. Use `interpolate` on `translateX/Y` to frame the specific UI element (the bar), then reverse the interpolation back to 1.0 scale to "pan out".

---

## Scene 4 - Expense Tracking
**Timing:** 30s - 45s (Frames 1800 - 2700)
**Content:**
- Staggered text fade from right "Track your expenses." at top of screen.
- Place `finance.mp4` in center just below the text.
- Slide out text word by word to the left.
**Remotion Implementation Notes:**
- **Video Timing:** `finance.mp4` is ~25s long. Use `playbackRate={1.7}`.
- **Text Slide Out:** Stagger a `translateX` interpolation from `0` to `-100vw` using the word's index to calculate a delayed `startFrame`.

---

## Scene 5 - AI Crop Check
**Timing:** 45s - 60s (Frames 2700 - 3600)
**Content:**
- In center typewriter text "Think something's up? Give Farmagotchi a check".
- Fade text out.
- Place `scan.mp4` fully in the center of the screen.
**Remotion Implementation Notes:**
- **Video Timing:** `scan.mp4` is ~22s. Use `playbackRate={1.46}` to fit 15s. Ensure `objectFit="cover"` or a stylized container to keep it polished.
- **Typewriter Exit:** Instead of reversing the typewriter, simply wrap the text component in a container and apply a global opacity fade out using `interpolate(frame, [fadeStart, fadeStart + 30], [1, 0])`.

---

## Scene 6 - AI Insights
**Timing:** 60s - 75s (Frames 3600 - 4500)
**Content:**
- Top typewriter text "Keep your crops healthy."
- Delete "healthy." and re-type as "happy."
- Below text place `aiinsight.mp4`.
- Fade out text.
**Remotion Implementation Notes:**
- **Video Timing:** `aiinsight.mp4` is ~13.8s. Play at 1.0x speed (`playbackRate={1.0}`) and delay its start slightly to sync with the "happy." text completion.
- **Text Backspace Animation:** Implement via multiple frame checks. E.g., `frame < 120`: slice string normally. `frame >= 120 && frame < 150`: slice backwards to simulate backspacing "healthy.". `frame >= 150`: slice forward on the new string "happy.".

---

## Scene 7 - AI Chat
**Timing:** 75s - 95s (Frames 4500 - 5700)
**Content:**
- Center stagger fade in text "Got any more questions? Ask the crops yourself."
- stagger Fade out text.
- Play `aichat.mp4` in center.
**Remotion Implementation Notes:**
- **Video Timing:** `aichat.mp4` is long (~36s). Use `playbackRate={1.8}` to fit into this 20s scene.
- **Text Flow:** Use an `<AbsoluteFill>` to center the text above the video container. Fade in over 30 frames, hold for 90 frames, then fade out over 30 frames to reveal the video clearly.

---

## Scene 8 - Social & Plot Tracking
**Timing:** 95s - 110s (Frames 5700 - 6600)
**Content:**
- Center fade in text "Got more friends? Track them all in Farmagotchi".
- Play `newplotworkflow.mp4` below, sped up significantly.
- Fade out.
**Remotion Implementation Notes:**
- **Video Timing:** `newplotworkflow.mp4` is ~65s. Use `playbackRate={4.3}` or, better yet, use the `startFrom` and `endAt` props on `<OffthreadVideo>` to trim out the boring parts and show only the highlights at a more reasonable 2.0x speed.

---

## Scene 9 - Outro
**Timing:** 110s - 120s (Frames 6600 - 7200)
**Content:**
- Stagger right text "Your crops are now a friend in your pocket." (Fade out)
- Stagger right text "Keep your plants happy, Keep yourself happy." (Fade out)
- Logo appears, shifts to the left.
- "Farmagotchi" typewriter effect to the right of the logo.
**Remotion Implementation Notes:**
- **Sentence Sequence:** Use nested `<Sequence>` components staggered by 90-120 frames to handle the entry and exit of the two text blocks automatically.
- **Symmetry:** Re-use the exact same Logo and Typewriter components from Scene 1 with identical `spring` configurations to give the video a cohesive, symmetrical finish.
