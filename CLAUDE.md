# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

npm run dev        # Start Vite dev server
npm run build      # TypeScript type-check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build locally

No test framework is configured. No environment variables are needed.

## Architecture

**Design System Explorer** is a React 19 + TypeScript + Tailwind CSS 4 interactive design system browser built with Vite 7.

### Tech Stack
- **React 19** with functional components and hooks (no external state management)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin — no PostCSS config needed
- **Lucide React** for icons

### Source Layout
All source lives in `/src`. Components are flat in `/src/components/` (no subdirectories).

- `App.tsx` — Page router using a union type with `onGoHome()` callback navigation
- `index.css` — Design token system, theme definitions, and keyframe animations
- `StyleKit.tsx` — Master design system showcase (the main attraction)

### Key Components
- **Home** — Navigation hub listing all views and components
- **TopNav** — Back button + dark/light theme toggle bar
- **StyleKit** — Multi-tab design system explorer with copy/docs/status features
- **ComponentCard** — Reusable card that wraps any asset item with status badge, copy button, and docs panel
- **CodeBlock** — Syntax-highlighted copyable code snippet
- **DocPanel** — Expandable inline documentation panel
- **StatusBadge** — Dev-ready / dev-not-ready tag

### Styling Patterns

Design tokens are CSS custom properties in `index.css`:
- Colors: `--color-neutral-*`, `--color-success-*`, `--color-error-*`, `--color-warning-*`
- Fonts: `--font-sans` (Inter), `--font-mono` (JetBrains Mono or Fira Code)
- Component tokens: `--ds-*` namespace for design system UI itself

Theme switching uses `data-theme` attribute on `<html>`.

Tailwind CSS v4 note: Utility classes are generated on-demand. Use inline `style={{}}` for one-off spacing if a Tailwind class doesn't exist.

### Component Conventions
- Props interfaces named `ComponentNameProps`, defined above the component
- Inline Tailwind classes (no CSS modules)
- `memo()` used selectively for performance

## Component & Prototype Architecture

### Home Page Hub
The home page lists every available view with clickable paths. Every view must have a way to return home — no dead ends.

### Navigation
Every view includes TopNav with back button and theme toggle.

### New Component Workflow
When building a new component, always create both the component and its standalone demo wrapper at the same time. Demo wrappers are thin — they import the real component and add TopNav + demo props.

## Style Guide Rule
Any new color, token, font, or spacing value must be added to the token system in `index.css` AND reflected in StyleKit.tsx. No hardcoded one-off styles.

## Design Token Architecture (3-Layer System)

All layers live in `index.css`.

**Layer 1 — Raw Palette**: Five shades per semantic color (100-500), defined per theme.
**Layer 2 — Resolved Semantic Tokens**: Purpose-based mapping (e.g., `--color-warning-text`). Dark picks vibrant shades, light picks darker shades.
**Layer 3 — Component Tokens**: Scoped namespaces referencing Layer 2 (e.g., `--ds-sidebar-bg: var(--color-neutral-100)`).

Rules:
- Component tokens point to Layer 2 — never hardcode a raw shade.
- No `rgba()` or hardcoded opacity in components — use theme-aware tokens.
- Every new token must appear in StyleKit.tsx.

## Asset Item System

Every displayable item in the design system (color swatch, typography sample, component demo, token, spacing value, icon, pattern) is an **Asset Item**. All asset items share these capabilities:

### Status Badges
- **Dev Ready** (green badge) — Approved for production use. Code is final.
- **In Progress** (amber badge) — Being built. Not safe to use in prod.
- **Deprecated** (red badge) — Scheduled for removal. Shows migration path in docs.
- **Draft** (gray badge) — Exploratory. May change or be removed.

Status is defined per-item in a central registry (`assetRegistry.ts`).

### One-Click Code Copy
Every asset item has a copy button that copies its usage code to clipboard:
- Color tokens → copies `var(--color-name)` or the Tailwind class
- Typography → copies the CSS class or font-family declaration
- Components → copies the JSX import + usage snippet
- Spacing/radius → copies the token reference
- Icons → copies the Lucide import

### Expandable Documentation Panel
Every asset item has a docs toggle (chevron or "Docs" button) that expands an inline panel showing:
- **Description** — What it is and when to use it
- **Usage guidelines** — Do's and don'ts
- **Code examples** — Multiple usage patterns
- **Related tokens** — Links to related items in the system
- **Changelog** — When it was added, modified, or deprecated
