# Design System Explorer

## Build Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Lint with ESLint
npm run preview   # Preview production build
```

## Architecture

Two-column layout. Single `App.tsx` component. All navigation is `useState<Page>`.

### NO NESTED NAVIGATION RULE

The entire app is a single persistent two-column layout. There is NEVER a second
level of navigation, NEVER a drilldown, NEVER a page transition, and NEVER a
top-nav-with-back-button pattern.

Clicking a sidebar item sets `selected` state and updates the right pane.
That is the ONLY thing that happens.

### Outer Layout CSS (non-negotiable)

```
<div style="display: flex; height: 100vh; width: 100vw;">
  <Sidebar />          ← fixed width 200-240px (or 48px collapsed)
  <div style="display: flex; flex-direction: column; flex: 1;
              min-width: 0; overflow: hidden;">
    <TopBar />         ← flex-shrink: 0, width: 100%
    <DocPanel />       ← collapsible, flex-shrink: 0
    <ContentArea />    ← flex: 1, overflow: auto
  </div>
</div>
```

The right side is a flex COLUMN that takes all remaining space.
The TopBar, DocPanel, and ContentArea are stacked children of this column.

### Top Bar — Always Full Width (non-negotiable CSS)

- width: 100% of parent flex column
- NEVER constrained by content below, NEVER varies between pages
- NEVER has max-width or margin that shrinks it
- Height: 40px. flex-shrink: 0. border-bottom for separation.
- Background and border consistent across all pages.

Contents left to right:
1. Item title
2. Status badge
3. Spacer (flex-1)
4. Copy Code button
5. Docs dropdown toggle

Theme toggle is NOT here — it's in the sidebar header.

### Two Content Modes

**DESIGN SYSTEM items** (Colors, Typography, Icons, Spacing, Shadows, Components)
render as CARD GRIDS. Cards are aligned top-left in a scrollable container.

**PATTERN items** (Nav Bar, Sidebar, Card, Modal, Data Table, Form Layout, Search)
render as CENTERED LIVE PREVIEWS.

Pattern Preview CSS Requirements (non-negotiable):
```css
display: flex;
justify-content: center;
align-items: center;
flex: 1;
overflow: auto;
```
The pattern component sits CENTERED on both axes. Scrollbars appear ONLY when
the component overflows. NOT anchored top-left. NOT wrapped in a card.

### Sidebar Structure

```
┌─────────────────────────┐
│ [icon] ACME DS  [☀/🌙]  │  ← Logo + company + theme toggle
│─────────────────────────│
│ DESIGN SYSTEM            │
│  Colors                  │
│  Typography              │
│  Icons                   │
│  Spacing & Layout        │
│  Shadows                 │
│  Components              │
│─────────────────────────│
│ PATTERNS                 │
│  Nav Bar                 │
│  Sidebar                 │
│  Card                    │
│  Modal / Dialog          │
│  Data Table              │
│  Form Layout             │
│  Search                  │
│─────────────────────────│
│ 0 assets · 0% ready     │
│ [« Collapse]             │
└─────────────────────────┘
```

### Collapsible Sidebar

When collapsed, sidebar shrinks to ~48px showing only icons + theme toggle.
A chevron button expands it back.

### Theme Toggle

ONLY in the sidebar header. Sun/Moon icon. Nowhere else.

## Edit Path Map

| User says              | Claude edits                                    |
|------------------------|-------------------------------------------------|
| "My colors are..."    | 1. index.css — replace palette in :root and [data-theme="light"] |
|                        | 2. assetRegistry.ts — replace color entries, placeholder: false |
|                        | UI auto-updates (reads CSS vars)                |
| "Our fonts are..."    | 1. index.css — update --font-sans, --font-mono, add @import |
|                        | 2. assetRegistry.ts — replace type entries, placeholder: false |
|                        | 3. index.html — add font <link>                |
| "Button styles..."    | 1. assetRegistry.ts — update entries            |
|                        | 2. Button component — update variants           |
|                        | 3. index.css — add component tokens             |
| "Spacing scale..."    | 1. index.css — replace spacing vars             |
|                        | 2. assetRegistry.ts — replace entries           |
| "Add these icons"     | 1. assetRegistry.ts — add entries               |
|                        | Icon grid auto-renders from registry            |
| "New component: X"    | 1. Create src/components/X.tsx                  |
|                        | 2. assetRegistry.ts — add entry                |
|                        | Sidebar + pane auto-pick it up                  |
| "Build pattern: X"    | 1. Create src/patterns/X.tsx                    |
|                        | 2. assetRegistry.ts — update entry, placeholder: false |
|                        | 3. Pattern renders centered in pane (no card wrapping) |
| "Mark X as ready"     | 1. assetRegistry.ts — change status             |
|                        | Badges auto-update everywhere                   |

## Placeholder Replacement Rules

1. Find existing placeholder by category. No duplicates.
2. Update in place: placeholder: false, status: "dev-ready",
   update name/description/usage/copyValue/codeExamples.
3. Foundations → update index.css tokens too.
4. Components → create/update .tsx in src/components/.
5. Patterns → create/update .tsx in src/patterns/.
   Patterns render centered full-bleed, NOT in cards.
6. Replace ALL matching placeholders, not just one.
7. If Pattern needs placeholder Component, flag it.
8. Sidebar structure never changes during replacement.

## Adding New Items

If the user wants something with no existing placeholder:
1. Add new entry to assetRegistry.ts
2. Set placeholder: false
3. Create component/pattern file
4. Sidebar and content auto-render it

## Sync Rules — Single Source of Truth

ONE copy of every component. Patterns import Components.
Components reference Foundations. Never duplicate.

**WHEN BUILDING A PATTERN:**
- Extract reusable pieces into src/components/ + registry.
- New styles → index.css token + registry foundation entry.
- Import real components, never copy-paste.

**WHEN EDITING A COMPONENT:**
- Changes propagate to all Patterns automatically.

**WHEN ADDING A NEW STYLE:**
- color → index.css + registry (foundation/colors)
- font/size → index.css + registry (foundation/typography)
- spacing → index.css + registry (foundation/spacing)
- shadow → index.css + registry (foundation/shadows)
- Mandatory. No hardcoded one-off styles.

## Token Architecture (3 Layers)

1. **Layer 1 — Raw Palette**: `--neutral-50` through `--neutral-950`, `--primary-*`, `--success-*`, `--warning-*`, `--error-*`
2. **Layer 2 — Semantic**: `--color-bg`, `--color-text`, `--color-primary`, etc. Different in `:root` (dark) vs `[data-theme="light"]`
3. **Layer 3 — Component**: `--ds-sidebar-bg`, `--ds-topbar-bg`, `--ds-card-bg`, etc.

## Icon Sizing Reference

| Size | Usage                                    |
|------|------------------------------------------|
| 12px | badge icons, inline indicators           |
| 14px | sidebar nav, dropdown menus, compact btns|
| 16px | alongside body text, form field icons    |
| 18px | standard button icons, tab icons         |
| 20px | primary buttons, toolbar icons (DEFAULT) |
| 24px | nav bar icons, section headers           |
| 32px | empty states, feature callouts           |
| 40px | landing page features, splash screens    |

## File Structure

```
src/
  App.tsx                     ← Single layout component
  index.css                   ← 3-layer token system
  main.tsx                    ← Entry
  data/
    assetRegistry.ts          ← Central registry
  components/                 ← Small reusable components
    StatusBadge.tsx
    CopyButton.tsx
    DocPanel.tsx
    ComponentCard.tsx
    ThemeSync.ts
  patterns/                   ← Larger composed views
```

Components live in `src/components/`.
Patterns live in `src/patterns/`.

## Card Overflow Rules

- Cards have overflow-hidden on the outer container
- Top row is a SINGLE flex row with flex-wrap: nowrap
- Status badge and placeholder chip on the left
- Copy + Docs buttons on the right with ml-auto
- Status badge uses compact mode (dot only) — full label on hover
- Card padding: 12px minimum
- Preview area has max-height to prevent unbounded growth
- Text truncates with ellipsis if needed
- Foundation items: 3-column grid with minmax(280px, 1fr)
- Components page: 2-column grid with minmax(360px, 1fr)
- ComponentCards are ONLY for Design System items, NEVER for Patterns
