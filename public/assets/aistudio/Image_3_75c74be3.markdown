---
name: Synthetic Vanguard
colors:
  surface: '#121318'
  surface-dim: '#121318'
  surface-bright: '#38393f'
  surface-container-lowest: '#0d0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#292a2f'
  surface-container-highest: '#34343a'
  on-surface: '#e3e1e9'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e3e1e9'
  inverse-on-surface: '#2f3036'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#a078ff'
  on-tertiary-container: '#340080'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#121318'
  on-background: '#e3e1e9'
  surface-variant: '#34343a'
  surface-base: '#090A0F'
  surface-raised: '#0E1017'
  surface-glass: rgba(14, 16, 23, 0.65)
  text-primary: '#F8FAFC'
  text-muted: '#94A3B8'
  border-subtle: rgba(255, 255, 255, 0.08)
  border-highlight: rgba(99, 102, 241, 0.35)
  glow-cyan: rgba(6, 182, 212, 0.25)
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-tech:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-ui:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-refined, high-fidelity portfolio aesthetic tailored for an elite AI Automation Engineer. It blends dark-mode minimalism with ethereal glassmorphic layers and precise technical instrumentation. 

The emotional target is engineering authority, architectural precision, and computational power. It rejects bloated visual noise and speculative hype in favor of tactile system feedback, razor-sharp typography, and structural luminescence. 

Key attributes:
- **Atmospheric Dark Core**: Dominant near-black canvas surfaces that make luminescence meaningful rather than decorative.
- **Glassmorphic Cartography**: Frosted, semi-translucent interaction panels featuring hairline inner-borders and subtle gradient refractions.
- **Computational Precision**: Monospace-leaning technical metadata paired with high-clarity human-readable display typography.

## Colors

The palette is engineered around visual contrast on an OLED-grade dark canvas. 

- **Primary (`#6366F1`) & Tertiary (`#8B5CF6`)**: Form an energetic indigo-to-violet spectrum used for primary interactive states, key system transitions, and atmospheric radial backdrops.
- **Secondary (`#06B6D4`)**: A vibrant digital cyan reserved for live pipeline statuses, execution nodes, and directional micro-accents.
- **Neutral Canvas (`#090A0F` & `#0E1017`)**: Non-distracting, ultra-low-albedo surfaces absorbing ambient light to make layered UI elevations appear weightless.
- **Text & Accents**: `#F8FAFC` guarantees accessible readability for primary headers, while `#94A3B8` anchors technical documentation, descriptions, and data parameters without visual competition.

## Typography

The typographic hierarchy combines the structured, geometric attitude of **Space Grotesk** for system titles and operational labels with the balanced, highly legible texture of **Inter** for descriptions, specifications, and architecture walkthroughs.

- Headlines leverage negative tracking to compact character forms, giving titles an authoritative, monolithic presence.
- Numerical indices, technical attributes, runtime speeds, and code metadata employ `label-tech` in uppercase with expanded tracking (`0.05em`).
- Body text maintains an open line-height (`1.6x`) against dark backgrounds to eliminate optical fatigue.

## Layout & Spacing

The layout is built upon a 12-column responsive fluid grid with maximum constrained container widths (1280px) to safeguard readability on ultra-wide viewports.

- **Desktop (1024px+)**: 12 columns, 1.5rem gutter, 3rem screen margins. Complex AI architectures, timeline steps, and project breakdowns utilize multi-column asymmetry (e.g., 7/5 or 8/4 splits).
- **Tablet (768px - 1023px)**: 8 columns, 1.25rem gutter, 2rem screen margins. Side-by-side elements gracefully stack or collapse into two-column formats.
- **Mobile (&lt;768px)**: 4 columns, 1rem gutter, 1.25rem screen margins. Interactive pipeline cards and metrics collapse to a direct vertical rhythm with tactile finger-tap safe targets (minimum 44px height).

## Elevation & Depth

Depth is defined through light containment and blur diffusion rather than traditional drop shadows:

1. **Base Ground (`#090A0F`)**: Deepest level, housing slow-moving, low-opacity indigo/cyan atmospheric radial gradients (`filter: blur(120px); opacity: 0.12`).
2. **Glass Level 1 (Panels & Surfaces)**: Backdrops use `rgba(14, 16, 23, 0.65)` layered with `backdrop-filter: blur(16px)` and a crisp 1px perimeter border of `rgba(255, 255, 255, 0.08)`.
3. **Glass Level 2 (Interactive Floating Elements)**: Modals, active hover states, and tech stack chips incorporate a top-border highlight (`linear-gradient(90deg, rgba(99, 102, 241, 0.4), rgba(6, 182, 212, 0.2))`) alongside a micro-diffused indigo outer aura (`box-shadow: 0 8px 32px -4px rgba(99, 102, 241, 0.15)`).

## Shapes

The design uses balanced, modern curves (`roundedness: 2`) that ground the futuristic aesthetic without straying into overly playful territory:

- Default controls and inputs maintain an 8px (`0.5rem`) radius.
- Cards, workflow nodes, and technical display panels utilize a 16px (`1rem`) corner radius.
- System status indicators, pill chips, and automation workflow badges use full pill radii (`9999px`) to create clear differentiation between containers and interactive tags.

## Components

### Buttons
- **Primary Action**: Solid gradient background (`linear-gradient(135deg, #6366F1, #8B5CF6)`), crisp `#F8FAFC` label, 0.5rem radius, and a subtle glowing box shadow. On hover, the indigo glow expands (`box-shadow: 0 0 24px rgba(99, 102, 241, 0.45)`).
- **Secondary / Ghost**: Translucent glass fill with 1px border (`border-subtle`), shifting to `border-highlight` on hover with an internal cyan accent tint.

### Cards & Architecture Nodes
- Surface cards leverage blurred glassmorphism with an explicit inset hairline highlight along the top border to simulate physical edge lighting.
- When focused or hovered, cards invoke a refined translateY(-2px) elevation shift and activate a 1px gradient stroke.

### Technical Badges & Chips
- Fully rounded pill geometry with dark translucent fill (`rgba(255, 255, 255, 0.04)`) and micro-borders (`border-subtle`).
- Badges feature leading live-status pings (4px glowing dot: cyan for active, indigo for queued/completed).

### Input Fields & Controls
- Form controls sit on raised surface tones (`#0E1017`) with inset borders. Focus rings deploy an outer 2px violet glow with no abrupt edge break.

### Workflow & Pipeline Connectors
- Dedicated custom nodes linked by dashed or luminous vector lines with animated gradient flow strokes showing pipeline data progression.