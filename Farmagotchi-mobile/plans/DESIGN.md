  Codebase Integration Rules (Figma & MCP)


  This document outlines the architecture, styling
  conventions, and integration rules for the Farmagotchi
  mobile application. Adhere to these guidelines when
  translating Figma designs into code.

  1. Design System Structure


  1.1 Token Definitions
  Design tokens are primarily managed through Tailwind CSS and
  a central TypeScript file.


   * Colors: Custom color tokens are defined in two locations
     that must stay synchronized:
       * tailwind.config.js (theme.extend.colors): Used for
         className styling via NativeWind.
       * src/lib/colors.ts: Exported as a strongly typed
         colors constant for inline styles or programmatic use
         in components where NativeWind cannot reach (e.g.,
         chart libraries, third-party component props).
   * Format: The project uses semantic naming for brand colors
     (earthy-green, sunlit-gold, rich-soil-brown,
     morning-mist, soft-clay, harvest-red, clear-sky-blue) and
     a scale system for functional colors (primary-100 to
     primary-900, neutral-100 to neutral-900).
   * Typography: The app uses a custom font named GeistPixel.
     It is configured in tailwind.config.js under
     fontFamily.geist and loaded globally in app/_layout.tsx
     using expo-font.

  2. Component Library


  2.1 Component Architecture
   * Location: Reusable UI components are stored in the
     /components/ directory (e.g., OptionModal.tsx).
   * Pattern: Components follow standard React functional
     component architecture using React Hooks.
   * Documentation: There is currently no Storybook or formal
     component documentation in place. Component usage must be
     inferred from existing implementations within the /app/
     directory.
   * Props: Components must be strictly typed using TypeScript
     interfaces.


  3. Frameworks & Libraries


  3.1 Core Stack
   * UI Framework: React Native (v0.81.5) and Expo (SDK 54).
   * Routing: Expo Router (expo-router) using file-based
     routing.
   * Styling: Tailwind CSS (v3.4.19) integrated via NativeWind
     (nativewind: latest).
   * Animations: react-native-reanimated is set up for
     high-performance animations.
   * Charting: react-native-gifted-charts is available for
     data visualization.


  3.2 Build System
   * Bundler: Metro Bundler configured to support NativeWind.

  4. Asset Management


  4.1 Storage & Usage
   * Location: All static assets (images, fonts, vector files)
     are stored in the /assets/ directory.
   * Images: For rendering images, prefer expo-image over the
     standard React Native Image component when performance
     and caching are a priority.
   * Fonts: The custom font GeistPixel-Square.ttf is located
     in /assets/ and pre-loaded in app/_layout.tsx using
     expo-splash-screen to prevent hiding the splash screen
     until assets are ready.

  5. Icon System


  5.1 Icon Libraries
  The project utilizes a hybrid approach to icons:
   1. Vector Icons: @expo/vector-icons is the primary icon
      library (e.g., MaterialCommunityIcons and Ionicons).
      This should be your first stop when implementing
      standard UI icons from a design.
   2. Custom SVGs: Custom SVG icons (like Lucide icons or
      brand-specific assets) are stored in /assets/lucide/
      (e.g., camera.svg, sprout.svg).
   3. Rendering SVGs: react-native-svg is installed for
      rendering these custom SVG assets natively.

  Example Usage (Vector Icons):


   1 import { MaterialCommunityIcons } from
     '@expo/vector-icons';
   2
   3 // Rendered inside a NativeWind styled view
   4 <View className="h-12 w-12 items-center justify-center
     rounded-full bg-primary-100">
   5   <MaterialCommunityIcons name="sprout-outline" size={26}
     color="#1d1b20" />
   6 </View>

  6. Styling Approach


  6.1 CSS Methodology
   * NativeWind (Tailwind CSS): The primary styling
     methodology is Utility-First CSS using the className
     prop.
   * Global Styles: Base Tailwind directives are injected via
     /global.css which is imported at the root in
     app/_layout.tsx.
   * Responsive Design: Given the mobile focus, responsive
     design primarily relies on flexbox (flex, flex-row,
     justify-between) and relative sizing rather than media
     query breakpoints.
   * Safe Areas: Always use useSafeAreaInsets from
     react-native-safe-area-context to handle notches and home
     indicators, rather than hardcoding paddings.

  Example Styling Pattern:


    1 import { View, Text } from 'react-native';
    2
    3 export default function Card({ title }: { title: string
      }) {
    4   return (
    5     // Utility classes mapping to tokens
    6     <View className="rounded-xl bg-neutral-100 p-4
      shadow-sm">
    7       <Text className="font-geist text-lg
      text-neutral-900">{title}</Text>
    8     </View>
    9   );
   10 }


  7. Project Structure

  The codebase follows the standard Expo Router project
  structure:


   * /app/: Contains the file-based routing logic.
       * /app/_layout.tsx: The root layout, responsible for
         global providers (SafeAreaProvider, fonts, splash
         screen).
       * /app/(tabs)/: Contains the main tab-based navigation
         views (index.tsx, plots.tsx, tasks.tsx, finance.tsx,
         etc.).
   * /assets/: Images, SVGs, and fonts.
   * /components/: Shared, reusable UI components.
   * /src/lib/: Core utilities and constants (e.g.,
     colors.ts).
   * /plans/: Contains markdown documentation detailing the
     product specs and feature plans.

  ---


  🎨 MCP Figma Implementation Workflow

  When asked to implement a Figma design using MCP, follow
  this workflow:


   1. Token Mapping: Extract hex codes from the Figma node and
      map them to the existing tokens in tailwind.config.js or
      src/lib/colors.ts. Do not introduce hardcoded hex colors
      (#FFFFFF) if a suitable token exists (e.g.,
      bg-neutral-100).
   2. Typography Validation: Check if the text layers in Figma
      map to the font-geist family or standard system fonts,
      and apply the correct Tailwind text utilities.
   3. Icon Strategy: Check if the icon exists in
      @expo/vector-icons first. If it's a completely custom
      SVG, export it from Figma, place it in /assets/lucide/,
      and implement it using react-native-svg.
   4. Layout Construction: Use flexbox via NativeWind
      className strings to match the Auto Layout
      configurations from Figma. Ensure padding accounts for
      useSafeAreaInsets where applicable.
