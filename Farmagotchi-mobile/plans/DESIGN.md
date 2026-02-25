# Farmagotchi Mobile - Brand Identity & Design Guide

## Core Aesthetic
**Keywords:** Warm, Comfortable, Agricultural, Earthy, Playful, Trusted.

The design of Farmagotchi should feel like stepping onto a sunlit, welcoming farm. It must balance the serious utility of an agricultural management tool with the cozy, rewarding feeling of taking care of a digital pet. The interface should avoid sterile, overly corporate aesthetics in favor of organic shapes, soft lighting, and earthy textures.

## 1. Color Palette

The color palette is inspired by nature: rich soils, golden wheat, leafy greens, and soft sunrises.

### Primary Colors (The Earth & Growth)
- **Earthy Green (Primary Brand Color):** `#4A7C59` - Represents healthy crops, growth, and vitality. Used for primary buttons, active states, and the main app header.
- **Sunlit Gold (Accent/Secondary):** `#F4D35E` - Represents sunshine, harvest, and rewards. Used for notifications, happiness indicators, stars, and important highlights.
- **Rich Soil Brown (Deep Neutral):** `#4B3F35` - Represents the foundation, stability, and earth. Used for primary text, deep borders, and solid backgrounds.

### Backgrounds & Surfaces (Warmth & Comfort)
- **Morning Mist (App Background):** `#F9F6F0` - A warm, off-white with a hint of cream. Far softer on the eyes than pure white, giving a "parchment" or "canvas" feel.
- **Soft Clay (Card Background):** `#F0E9DF` - Used for task cards, input fields, and widget backgrounds to create subtle elevation against the app background.

### Semantic/Feedback Colors
- **Harvest Red (Error/Alert):** `#C85A5A` - Used for critical crop alerts, missed tasks, or low pet happiness. Muted slightly so it doesn't clash with the natural palette.
- **Clear Sky Blue (Information):** `#7FB3D5` - Used for weather updates, AI tips, and general information.

## 2. Typography

Typography should be legible for utility but retain a friendly, slightly rustic or rounded character.

- **Headings (Friendly & Sturdy):** A rounded sans-serif or a modern serif with soft edges (e.g., *Nunito*, *Quicksand*, or *Zilla Slab* if choosing a serif). This font should make the app feel approachable.
- **Body Text (Clean & Readable):** A highly legible, simple sans-serif (e.g., *Inter* or *Roboto* but utilizing slightly increased letter-spacing and line-height).

*Styling Rule:* Use the `Rich Soil Brown` for primary text rather than pure black (`#000000`) to maintain the warm aesthetic.

## 3. UI Components & Shapes

- **Corner Radii:** Embrace soft, rounded corners. Buttons, cards, and modals should have a generous border-radius (e.g., `rounded-2xl` or `rounded-3xl` in Tailwind) to feel tactile and safe. Avoid sharp 90-degree angles.
- **Shadows:** Use soft, diffused, warm drop-shadows rather than harsh, dark gray ones. A shadow should look like sunlight hitting an object, not a harsh spotlight.
- **Borders:** Instead of thin gray lines, consider using slightly darker shades of the background color (e.g., a darker `Soft Clay`) to create separation, keeping the interface feeling cohesive and organic.

## 4. Imagery & Illustration Style

- **The Pets (Farmagotchis):** 2D vector illustrations with thick, expressive outlines and solid, warm colors. They should look hand-drawn but clean, highly expressive, and clearly react to the user's actions.
- **Icons:** Use filled, slightly rounded icons (e.g., *Feather Icons* modified to be thicker, or a custom set). Avoid overly thin, sharp "tech" icons.
- **Empty States & Onboarding:** Utilize watercolor-style or flat-vector illustrations of farm landscapes, barns, watering cans, and sprouting plants.

## 5. Motion & Interaction (The "Comfort" Factor)

- **Bounciness:** Interactions should feel responsive but gentle. Use spring animations (via `react-native-reanimated`) for button presses, modal appearances, and pet reactions. It shouldn't snap aggressively; it should settle smoothly.
- **Micro-interactions:** 
  - Checking off a task should trigger a small burst of golden particles or a soft scaling animation.
  - The pet should always have a subtle idle animation (breathing, blinking, swaying slightly) so the app feels "alive" even when the user is just reading stats.

## 6. Tone of Voice

- **Farmagotchi Chat & Prompts:** The language should be encouraging, folksy, and supportive. 
  - *Instead of:* "Error: Soil moisture below 20%. Action required."
  - *Use:* "Looks like the soil is getting a bit dry out there! Let's get some water on those crops soon to keep them happy."
- **Feedback:** Celebrate small wins. Completing all daily tasks should feel like a genuine achievement, praised by the pet.