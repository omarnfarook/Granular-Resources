# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

npm run dev        # Start Vite dev server
npm run build      # TypeScript type-check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build locally

No test framework is configured. No environment variables are needed.

## Architecture

**Design System Explorer** is a React 19 + TypeScript + Tailwind CSS 4 empty design system workspace built with Vite 7. It has the full UI shell, navigation, and infrastructure, but all asset slots are placeholder entries waiting for the user to provide real brand values via follow-up prompts.

### Tech Stack
- **React 19** with functional components and hooks (no external state management)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin — no PostCSS config needed
- **Lucide React** for icons

### Source Layout
All source lives in `/src`. Components in `/src/components/`, patterns in `/src/patterns/`.

- `App.tsx` — Single persistent two-column layout with useState navigation
- `index.css` — 3-layer design token system, theme definitions, keyframe animations
- `src/data/assetRegistry.ts` — Central registry of all design system items
- `src/components/` — Small reusable UI components (StatusBadge, CopyButton, etc.)
- `src/patterns/` — Larger composed views (NavBar, Card, etc. — added as user builds)

### Two Content Modes
- **Foundation/Component items** → rendered as **card grids** using ComponentCard
- **Pattern items** → rendered as **full-bleed live previews** (no card wrapping)

### Key Components
- **Sidebar** — Left column, always visible (collapsible to icon rail)
- **TopBar** — Thin strip above right pane: title, status, copy, docs toggle. Always full-width. NO theme toggle here.
- **ComponentCard** — Wraps Foundation/Component items with status badge, copy, docs, placeholder styling. NOT used for Patterns.
- **CopyButton** — Clipboard with execCommand fallback
- **DocPanel** — Expandable inline documentation panel
- **StatusBadge** — Dev Ready / In Progress / Deprecated / Draft pill (compact mode: dot only with tooltip)
- **ThemeSync** — Theme initialization and localStorage persistence

---

## CRITICAL LAYOUT RULE — NO NESTED NAVIGATION

The entire app is a single persistent two-column layout. There is NEVER a second level of navigation, NEVER a drilldown, NEVER a page transition, and NEVER a top-nav-with-back-button pattern.

```
┌────────────────────────────────────────────────────────────┐
│ LEFT SIDEBAR (fixed)      │  TOP BAR (contextual)         │
│                            │──────────────────────────────│
│ Always visible.            │  RIGHT CONTENT PANE          │
│ 200-240px fixed width.     │  (scrollable)                │
│                            │                              │
│ Clicking an item sets      │  Content renders here.       │
│ `selected` state and       │  Always beside the sidebar.  │
│ updates the right pane.    │  Never a separate page.      │
│ That is the ONLY thing     │  Never a nested view.        │
│ that happens.              │                              │
└────────────────────────────────────────────────────────────┘
```

Rules:
- ONE component renders this layout. All navigation is useState.
- Sidebar is ALWAYS visible. Can be collapsed to ~48px icon rail.
- There is NO TopNav with a back button. NONE.
- Right-pane components render with embedded prop, no chrome.

---

## Sidebar Structure

### Sidebar Header
Logo/icon + "ACME DS" text + light/dark mode toggle (Sun/Moon icon) on the same row. The theme toggle lives ONLY here — nowhere else.

### Collapsible Sidebar
Toggle at bottom of sidebar. Collapsed state shows ~48px rail with only icons + theme toggle icon. Chevron button expands it back.

### DESIGN SYSTEM section
Colors, Typography, Icons, Spacing & Layout, Shadows, Components

"Components" is a single sidebar item that opens a scrollable page showing ALL small reusable UI pieces grouped by type with section headers INSIDE the content pane:
- Buttons & Actions
- Inputs & Forms
- Feedback (Badge, Toast, Alert, Progress, Skeleton)
- Data Display (Avatar, Tooltip, Tag/Chip)

### PATTERNS section
Each pattern is its own sidebar item:
Nav Bar, Sidebar, Card, Modal / Dialog, Data Table, Form Layout, Search

---

## Top Bar
Always full-width across the content area. Height: 40px. Contains: item title, status badge, spacer, copy button, docs toggle. NO theme toggle in the top bar.

---

## Card Overflow Rules
- Cards have overflow-hidden on outer container
- Top row is a SINGLE flex row with flex-wrap: nowrap
- Status badge + placeholder chip on left; copy + docs on right with ml-auto
- Compact badge mode (dot only) when space is tight, full label on hover tooltip
- Card padding: 12px minimum
- Preview area has fixed max-height
- Name/description truncate with ellipsis
- Foundation grids: 3-column with minmax(280px, 1fr)
- Component grids: 2-column with minmax(360px, 1fr)

---

## File Structure: components/ vs patterns/
- `src/components/` — Small reusable components (Button, Input, Badge, etc.)
- `src/patterns/` — Larger composed views (NavBar, Card, Modal, etc.)
- Components render as card grids; Patterns render as full-bleed previews

---

## Edit Path Map

When the user provides brand assets, follow this map:

┌──────────────────────┬──────────────────────────────────────┐
│ User says            │ Claude edits                         │
├──────────────────────┼──────────────────────────────────────┤
│ "My colors are..."   │ 1. index.css — replace palette in   │
│                      │    :root and [data-theme="light"]    │
│                      │ 2. assetRegistry.ts — replace color  │
│                      │    entries, placeholder: false       │
│                      │ UI auto-updates (reads CSS vars)     │
├──────────────────────┼──────────────────────────────────────┤
│ "Our fonts are..."   │ 1. index.css — update --font-sans,  │
│                      │    --font-mono, add @import          │
│                      │ 2. assetRegistry.ts — replace type   │
│                      │    entries, placeholder: false       │
│                      │ 3. index.html — add font <link>     │
├──────────────────────┼──────────────────────────────────────┤
│ "Button styles..."   │ 1. assetRegistry.ts — update entries │
│                      │ 2. Button component — update variants│
│                      │ 3. index.css — add component tokens  │
├──────────────────────┼──────────────────────────────────────┤
│ "Spacing scale..."   │ 1. index.css — replace spacing vars  │
│                      │ 2. assetRegistry.ts — replace entries │
├──────────────────────┼──────────────────────────────────────┤
│ "Add these icons"    │ 1. assetRegistry.ts — add entries    │
│                      │ Icon grid auto-renders from registry │
├──────────────────────┼──────────────────────────────────────┤
│ "New component: X"   │ 1. Create src/components/X.tsx       │
│                      │ 2. assetRegistry.ts — add entry      │
│                      │ Sidebar + pane auto-pick it up       │
├──────────────────────┼──────────────────────────────────────┤
│ "Build pattern: X"   │ 1. Create src/patterns/X.tsx         │
│                      │ 2. assetRegistry.ts — update entry,  │
│                      │    placeholder: false                 │
│                      │ 3. Pattern renders as full-bleed     │
│                      │    preview (no card wrapping)         │
├──────────────────────┼──────────────────────────────────────┤
│ "Mark X as ready"    │ 1. assetRegistry.ts — change status  │
│                      │ Badges auto-update everywhere        │
└──────────────────────┴──────────────────────────────────────┘

---

## Placeholder Replacement Rules

When the user provides real assets:

1. FIND the existing placeholder entry in assetRegistry.ts by matching the category. Don't create duplicates.

2. UPDATE IN PLACE:
   - Set placeholder: false
   - Set status: "dev-ready" (unless user says otherwise)
   - Update: name, description, usage, copyValue, codeExamples
   - Update doNots if relevant

3. If it's a Foundation (color, font, spacing):
   - Update CSS tokens in index.css
   - UI auto-updates because it reads live CSS vars

4. If it's a Component:
   - Create or update the .tsx file in src/components/
   - The ComponentCard preview renders the real component

5. If it's a Pattern:
   - Create or update the .tsx file in src/patterns/
   - Patterns render full-bleed, NOT in cards

6. NEVER leave orphan placeholders. If the user says "here are ALL my buttons," replace ALL button placeholders.

7. If a Pattern uses Components that are still placeholders, inform the user: "This uses [X] which is still a placeholder. Should I build that too?"

8. Sidebar never changes structure during replacement. Items go from placeholder → real in place.

---

## Adding New Items

If the user wants something with no existing placeholder:
1. Add new entry to assetRegistry.ts with correct category
2. Set placeholder: false (it's real from the start)
3. Create component/pattern file if needed
4. Sidebar and content pane auto-render it

---

## Sync Rules — Single Source of Truth

There is ONE copy of every component. Patterns import Components. Components reference Foundations. Never duplicate.

**WHEN BUILDING A PATTERN:**
- If you create a reusable UI piece inside a Pattern, extract it into src/components/ and add it to the registry. The Pattern imports it. Never inline a reusable piece.
- If you introduce a new color, font, spacing, or shadow value, add it to index.css as a token and to the registry as a Foundation entry. Replace the hardcoded value with the token. Never leave a one-off style.
- If you use an existing Component inside a Pattern, import the real component. Never copy-paste its code.

**WHEN EDITING A COMPONENT:**
- Changes automatically propagate to every Pattern that uses it. No manual sync needed.

**WHEN ADDING A NEW STYLE:**
- Any new color → index.css + registry (foundation/colors)
- Any new font/size → index.css + registry (foundation/typography)
- Any new spacing → index.css + registry (foundation/spacing)
- Any new shadow → index.css + registry (foundation/shadows)
- This is mandatory. No hardcoded one-off styles.

---

## Design Token Architecture (3-Layer System)

All layers live in `index.css`.

**Layer 1 — Raw Palette**: Five shades per semantic color (100-500), defined per theme.
**Layer 2 — Resolved Semantic Tokens**: Purpose-based mapping (e.g., `--color-warning-text`). Dark picks vibrant shades, light picks darker shades.
**Layer 3 — Component Tokens**: Scoped namespaces referencing Layer 2 (e.g., `--ds-sidebar-bg: var(--color-neutral-100)`).

Rules:
- Component tokens point to Layer 2 — never hardcode a raw shade.
- No rgba() or hardcoded opacity in components — use theme-aware tokens.
- Every new token must appear in the registry.

---

## Icon Sizing Reference

| Size | Use Case |
|------|----------|
| 12px | Badge icons, inline indicators |
| 14px | Sidebar nav, dropdown menus, compact buttons |
| 16px | Alongside body text, form field icons |
| 18px | Standard button icons, tab icons |
| 20px | Primary buttons, toolbar icons (DEFAULT) |
| 24px | Nav bar icons, section headers |
| 32px | Empty states, feature callouts |
| 40px | Landing page features, splash screens |

---

## Component Conventions
- Props interfaces named `ComponentNameProps`, defined above the component
- Inline Tailwind classes (no CSS modules)
- All styling uses CSS custom properties from the token system
- Placeholder items have `placeholder: true` in the registry and render with dashed borders, muted opacity, and a "Placeholder" chip
- Patterns render full-bleed, never in cards

When the user provides brand assets, follow the Edit Path Map. Set placeholder: false. Verify tokens in index.css. Patterns render full-bleed, never in cards.
