import { useState, useCallback, useMemo } from "react";
import {
  Palette, Type, Grid3x3, Box, Layers, Component,
  Navigation, PanelLeft, SquareStack, AppWindow,
  Table2, FileInput, Search as SearchIcon,
  Sun, Moon, ChevronDown, ChevronLeft, ChevronRight, Hexagon, Star,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { initTheme, applyTheme, type Theme } from "./components/ThemeSync";
import StatusBadge from "./components/StatusBadge";
import CopyButton from "./components/CopyButton";
import ComponentCard from "./components/ComponentCard";
import DocPanel from "./components/DocPanel";
import {
  getAssetsByGroup, getReadyCount, getTotalCount,
  type AssetItem, type AssetStatus,
} from "./data/assetRegistry";

// ─── Sidebar definitions ─────────────────────────────────

type SidebarItemId =
  | "colors" | "typography" | "icons" | "spacing" | "shadows" | "components"
  | "nav-bar" | "sidebar" | "card" | "modal" | "data-table" | "form-layout" | "search";

interface SidebarEntry {
  id: SidebarItemId;
  label: string;
  icon: React.ReactNode;
  group: string;
  section: "ds" | "pattern";
}

const DS_ITEMS: SidebarEntry[] = [
  { id: "colors", label: "Colors", icon: <Palette size={14} />, group: "colors", section: "ds" },
  { id: "typography", label: "Typography", icon: <Type size={14} />, group: "typography", section: "ds" },
  { id: "icons", label: "Icons", icon: <Grid3x3 size={14} />, group: "icons", section: "ds" },
  { id: "spacing", label: "Spacing & Layout", icon: <Box size={14} />, group: "spacing", section: "ds" },
  { id: "shadows", label: "Shadows", icon: <Layers size={14} />, group: "shadows", section: "ds" },
  { id: "components", label: "Components", icon: <Component size={14} />, group: "buttons-actions", section: "ds" },
];

const PATTERN_ITEMS: SidebarEntry[] = [
  { id: "nav-bar", label: "Nav Bar", icon: <Navigation size={14} />, group: "nav-bar", section: "pattern" },
  { id: "sidebar", label: "Sidebar", icon: <PanelLeft size={14} />, group: "sidebar", section: "pattern" },
  { id: "card", label: "Card", icon: <SquareStack size={14} />, group: "card", section: "pattern" },
  { id: "modal", label: "Modal / Dialog", icon: <AppWindow size={14} />, group: "modal", section: "pattern" },
  { id: "data-table", label: "Data Table", icon: <Table2 size={14} />, group: "data-table", section: "pattern" },
  { id: "form-layout", label: "Form Layout", icon: <FileInput size={14} />, group: "form-layout", section: "pattern" },
  { id: "search", label: "Search", icon: <SearchIcon size={14} />, group: "search", section: "pattern" },
];

const ALL_ITEMS = [...DS_ITEMS, ...PATTERN_ITEMS];

function groupStatus(group: string): AssetStatus {
  const items = getAssetsByGroup(group);
  if (items.some((i) => i.status === "dev-ready")) return "dev-ready";
  if (items.some((i) => i.status === "in-progress")) return "in-progress";
  return "draft";
}

function componentsStatus(): AssetStatus {
  for (const g of ["buttons-actions", "inputs-forms", "feedback", "data-display"]) {
    if (getAssetsByGroup(g).some((i) => i.status === "dev-ready")) return "dev-ready";
  }
  for (const g of ["buttons-actions", "inputs-forms", "feedback", "data-display"]) {
    if (getAssetsByGroup(g).some((i) => i.status === "in-progress")) return "in-progress";
  }
  return "draft";
}

function itemStatus(entry: SidebarEntry): AssetStatus {
  return entry.id === "components" ? componentsStatus() : groupStatus(entry.group);
}

// ─── App ─────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>(initTheme);
  const [selected, setSelected] = useState<SidebarItemId>("colors");
  const [collapsed, setCollapsed] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((p) => { const n = p === "dark" ? "light" : "dark"; applyTheme(n); return n; });
  }, []);

  const current = useMemo(() => ALL_ITEMS.find((e) => e.id === selected)!, [selected]);
  const currentStatus = useMemo(() => itemStatus(current), [current]);
  const firstItem = useMemo(() => {
    if (selected === "components") return getAssetsByGroup("buttons-actions")[0];
    return getAssetsByGroup(current.group)[0];
  }, [selected, current]);

  const total = getTotalCount();
  const ready = getReadyCount();
  const pct = total > 0 ? Math.round((ready / total) * 100) : 0;

  return (
    <div className="flex min-h-dvh">
      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside
        className="shrink-0 flex flex-col overflow-y-auto overflow-x-hidden"
        style={{
          width: collapsed ? "48px" : "224px",
          transition: "width 200ms ease",
          backgroundColor: "var(--ds-sidebar-bg)",
          borderRight: "1px solid var(--ds-topbar-border)",
        }}
      >
        {/* Header: logo + theme toggle */}
        <div className="flex items-center gap-2 px-3 py-3 shrink-0" style={{ borderBottom: "1px solid var(--ds-topbar-border)", minHeight: "44px" }}>
          <Hexagon size={18} className="shrink-0" style={{ color: "var(--color-accent)" }} />
          {!collapsed && <span className="text-sm font-semibold truncate" style={{ color: "var(--color-text-primary)" }}>ACME DS</span>}
          <button
            onClick={toggleTheme}
            className="shrink-0 p-1 rounded-md cursor-pointer"
            style={{ background: "none", border: "none", color: "var(--color-text-muted)", marginLeft: collapsed ? "0" : "auto" }}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Design System section */}
        <div className="px-2 pt-3 pb-1">
          {!collapsed && <div className="text-[0.5625rem] font-semibold uppercase tracking-widest px-2 mb-1" style={{ color: "var(--color-text-muted)" }}>Design System</div>}
          {DS_ITEMS.map((e) => (
            <SidebarBtn key={e.id} entry={e} active={selected === e.id} collapsed={collapsed} status={itemStatus(e)} onClick={() => { setSelected(e.id); setDocsOpen(false); }} />
          ))}
        </div>

        {/* Patterns section */}
        <div className="px-2 pt-2 pb-1">
          {!collapsed && <div className="text-[0.5625rem] font-semibold uppercase tracking-widest px-2 mb-1" style={{ color: "var(--color-text-muted)" }}>Patterns</div>}
          {PATTERN_ITEMS.map((e) => (
            <SidebarBtn key={e.id} entry={e} active={selected === e.id} collapsed={collapsed} status={itemStatus(e)} onClick={() => { setSelected(e.id); setDocsOpen(false); }} />
          ))}
        </div>

        {/* Footer: stats + collapse */}
        <div className="mt-auto px-3 py-2 space-y-1" style={{ borderTop: "1px solid var(--ds-topbar-border)" }}>
          {!collapsed && <div className="text-[0.6875rem]" style={{ color: "var(--color-text-muted)" }}>{total} assets · {pct}% ready</div>}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="flex items-center gap-1.5 w-full px-1 py-1 rounded-md text-xs cursor-pointer"
            style={{ background: "none", border: "none", color: "var(--color-text-muted)" }}
          >
            {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* ── RIGHT SIDE ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar — always full width, 40px */}
        <div
          className="h-10 shrink-0 flex items-center gap-2 px-4 w-full"
          style={{ backgroundColor: "var(--ds-topbar-bg)", borderBottom: "1px solid var(--ds-topbar-border)" }}
        >
          <span className="text-sm font-medium shrink-0" style={{ color: "var(--color-text-primary)" }}>{current.label}</span>
          <StatusBadge status={currentStatus} />
          <div className="flex-1" />
          {firstItem && <CopyButton value={firstItem.copyValue} label size={13} />}
          <button
            onClick={() => setDocsOpen((p) => !p)}
            className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-xs cursor-pointer shrink-0"
            style={{ background: docsOpen ? "var(--color-accent-bg)" : "none", border: "none", color: docsOpen ? "var(--color-accent-text)" : "var(--color-text-muted)" }}
          >
            Docs
            <ChevronDown size={12} style={{ transform: docsOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 150ms" }} />
          </button>
        </div>

        {/* Docs panel (top-bar level, if a first item exists) */}
        {firstItem && docsOpen && (
          <div className="px-6 py-4 animate-fade-in" style={{ backgroundColor: "var(--color-bg-secondary)", borderBottom: "1px solid var(--ds-topbar-border)" }}>
            <DocPanel asset={firstItem} open={true} />
          </div>
        )}

        {/* Content pane */}
        <div className="flex-1 overflow-y-auto p-6">
          <ContentPane selected={selected} />
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Button ──────────────────────────────────────

function SidebarBtn({ entry, active, collapsed, status, onClick }: {
  entry: SidebarEntry; active: boolean; collapsed: boolean; status: AssetStatus; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-[0.8125rem] text-left cursor-pointer"
      style={{
        backgroundColor: active ? "var(--ds-sidebar-active-bg)" : "transparent",
        color: active ? "var(--ds-sidebar-active-text)" : "var(--ds-sidebar-text)",
        border: "none",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
      title={collapsed ? entry.label : undefined}
    >
      <span className="shrink-0" style={{ color: active ? "var(--color-accent)" : "var(--color-text-muted)" }}>{entry.icon}</span>
      {!collapsed && <span className="flex-1 truncate">{entry.label}</span>}
      {!collapsed && <StatusBadge status={status} compact />}
    </button>
  );
}

// ─── Content Router ──────────────────────────────────────

function ContentPane({ selected }: { selected: SidebarItemId }) {
  switch (selected) {
    case "colors": return <ColorsPane />;
    case "typography": return <TypographyPane />;
    case "icons": return <IconsPane />;
    case "spacing": return <SpacingPane />;
    case "shadows": return <ShadowsPane />;
    case "components": return <ComponentsPane />;
    default: return <PatternPane group={selected} />;
  }
}

// ─── Colors ──────────────────────────────────────────────

function ColorsPane() {
  const items = getAssetsByGroup("colors");
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
      {items.map((a) => (
        <ComponentCard key={a.id} asset={a}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg shrink-0" style={{ backgroundColor: a.colorValue ?? "var(--color-neutral-300)", border: "1px solid var(--color-border-subtle)" }} />
            <div className="text-xs truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>{a.copyValue}</div>
          </div>
        </ComponentCard>
      ))}
    </div>
  );
}

// ─── Typography ──────────────────────────────────────────

const TS: Record<string, { fs: string; fw: string; lh: string; ff?: string; sample: string }> = {
  "type-heading-xl": { fs: "2.25rem", fw: "700", lh: "1.2", sample: "Heading XL" },
  "type-heading-lg": { fs: "1.5rem", fw: "600", lh: "1.3", sample: "Heading Large" },
  "type-heading-md": { fs: "1.25rem", fw: "600", lh: "1.4", sample: "Heading Medium" },
  "type-heading-sm": { fs: "1rem", fw: "600", lh: "1.5", sample: "Heading Small" },
  "type-body": { fs: "0.875rem", fw: "400", lh: "1.6", sample: "Body text is the standard reading size for paragraphs and content." },
  "type-body-sm": { fs: "0.75rem", fw: "400", lh: "1.5", sample: "Small body text for captions and timestamps." },
  "type-mono": { fs: "0.8125rem", fw: "400", lh: "1.6", ff: "var(--font-mono)", sample: "const token = 'var(--color-primary-400)';" },
};

function TypographyPane() {
  const items = getAssetsByGroup("typography");
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
      {items.map((a) => {
        const s = TS[a.id];
        return (
          <ComponentCard key={a.id} asset={a}>
            {s ? (
              <div style={{ fontSize: s.fs, fontWeight: s.fw, lineHeight: s.lh, fontFamily: s.ff ?? "var(--font-sans)", color: "var(--color-text-primary)" }}>{s.sample}</div>
            ) : (
              <div style={{ color: "var(--color-text-muted)" }}>{a.name}</div>
            )}
          </ComponentCard>
        );
      })}
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────

const SIZES = [12, 14, 16, 18, 20, 24, 32, 40] as const;
const SIZE_USE: Record<number, string> = {
  12: "Badge icons, inline indicators", 14: "Sidebar nav, dropdown menus",
  16: "Body text, form fields", 18: "Button icons, tab icons",
  20: "Primary buttons, toolbar (DEFAULT)", 24: "Nav bar, section headers",
  32: "Empty states, feature callouts", 40: "Landing pages, splash screens",
};
const ICON_CAT_LABEL: Record<string, string> = {
  navigation: "Navigation", actions: "Actions", status: "Status",
  content: "Content", communication: "Communication", media: "Media",
};

function IconsPane() {
  const items = getAssetsByGroup("icons");
  const [filter, setFilter] = useState("");
  const filtered = filter ? items.filter((i) => i.name.toLowerCase().includes(filter.toLowerCase())) : items;
  const cats = useMemo(() => {
    const m = new Map<string, AssetItem[]>();
    for (const i of filtered) { const c = i.iconCategory ?? "actions"; if (!m.has(c)) m.set(c, []); m.get(c)!.push(i); }
    return m;
  }, [filtered]);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Size scale */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Size Scale</h3>
        <div className="rounded-lg p-4" style={{ backgroundColor: "var(--ds-card-bg)", border: "1px dashed var(--ds-card-border)" }}>
          <div className="flex items-end gap-5 flex-wrap mb-4">
            {SIZES.map((sz) => (
              <div key={sz} className="flex flex-col items-center gap-1">
                <Star size={sz} style={{ color: "var(--color-text-primary)" }} />
                <span className="text-[0.625rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>{sz}px</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
            {SIZES.map((sz) => (
              <div key={sz} className="flex gap-2 text-[0.6875rem]">
                <span style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-mono)", width: "28px" }}>{sz}</span>
                <span style={{ color: "var(--color-text-muted)" }}>{SIZE_USE[sz]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="relative max-w-xs">
        <SearchIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
        <input
          type="text" value={filter} onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter icons..."
          className="w-full pl-8 pr-3 py-1.5 rounded-md text-sm outline-none"
          style={{ backgroundColor: "var(--color-bg-tertiary)", border: "1px solid var(--color-border-default)", color: "var(--color-text-primary)" }}
        />
      </div>

      {/* Categories */}
      {Array.from(cats.entries()).map(([cat, catItems]) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>{ICON_CAT_LABEL[cat] ?? cat}</h3>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}>
            {catItems.map((a) => <IconCard key={a.id} asset={a} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function IconCard({ asset }: { asset: AssetItem }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IC = asset.iconName ? ((LucideIcons as any)[asset.iconName] as React.ComponentType<{ size?: number }> | undefined) : undefined;
  return (
    <div
      data-placeholder={asset.placeholder}
      className="flex flex-col items-center gap-1.5 p-3 rounded-lg text-center"
      style={{ backgroundColor: "var(--ds-card-bg)", border: `1px ${asset.placeholder ? "dashed" : "solid"} var(--ds-card-border)` }}
    >
      <div style={{ color: "var(--color-text-primary)" }}>{IC ? <IC size={20} /> : <Star size={20} />}</div>
      <span className="text-[0.5625rem] truncate w-full" style={{ color: "var(--color-text-muted)" }}>{asset.name}</span>
      <CopyButton value={asset.copyValue} size={11} />
    </div>
  );
}

// ─── Spacing ─────────────────────────────────────────────

function SpacingPane() {
  const items = getAssetsByGroup("spacing");
  const spaces = items.filter((i) => i.id.startsWith("space-"));
  const radii = items.filter((i) => i.id.startsWith("radius-"));
  return (
    <div className="space-y-6 max-w-4xl">
      {spaces.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Spacing Scale</h3>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {spaces.map((a) => (
              <ComponentCard key={a.id} asset={a}>
                <div className="flex items-center gap-3">
                  <div className="h-6 rounded" style={{ width: `${a.spacingPx ?? 16}px`, minWidth: `${a.spacingPx ?? 16}px`, backgroundColor: "var(--color-accent)", opacity: 0.6 }} />
                  <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>{a.spacingPx}px</span>
                </div>
              </ComponentCard>
            ))}
          </div>
        </div>
      )}
      {radii.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Border Radius</h3>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {radii.map((a) => (
              <ComponentCard key={a.id} asset={a}>
                <div className="flex items-center justify-center">
                  <div className="w-14 h-14" style={{ borderRadius: a.copyValue, backgroundColor: "var(--color-accent-bg)", border: "2px solid var(--color-accent)" }} />
                </div>
              </ComponentCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shadows ─────────────────────────────────────────────

function ShadowsPane() {
  const items = getAssetsByGroup("shadows");
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
      {items.map((a) => (
        <ComponentCard key={a.id} asset={a}>
          <div className="flex items-center justify-center py-2">
            <div className="w-20 h-14 rounded-lg" style={{ backgroundColor: "var(--color-bg-primary)", boxShadow: a.copyValue }} />
          </div>
        </ComponentCard>
      ))}
    </div>
  );
}

// ─── Components (card grids with section headers) ────────

const COMP_SECTIONS = [
  { label: "Buttons & Actions", group: "buttons-actions" },
  { label: "Inputs & Forms", group: "inputs-forms" },
  { label: "Feedback", group: "feedback" },
  { label: "Data Display", group: "data-display" },
];

function ComponentsPane() {
  return (
    <div className="space-y-8 max-w-5xl">
      {COMP_SECTIONS.map((sec) => {
        const items = getAssetsByGroup(sec.group);
        if (!items.length) return null;
        return (
          <div key={sec.group}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>{sec.label}</h3>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}>
              {items.map((a) => (
                <ComponentCard key={a.id} asset={a}>
                  <CompPreview asset={a} />
                </ComponentCard>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CompPreview({ asset }: { asset: AssetItem }) {
  if (asset.group === "buttons-actions") {
    const bg = asset.id.includes("danger") ? "var(--color-error-300)" : asset.id.includes("secondary") ? "transparent" : "var(--color-accent)";
    const fg = asset.id.includes("secondary") ? "var(--color-text-primary)" : "var(--color-text-inverse)";
    const bdr = asset.id.includes("secondary") ? "1px solid var(--color-border-default)" : "none";
    return <div className="inline-flex px-3 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: bg, color: fg, border: bdr }}>{asset.name}</div>;
  }
  if (asset.id === "comp-badge") return <div className="flex gap-2"><span className="px-2 py-0.5 rounded-full text-[0.6875rem]" style={{ backgroundColor: "var(--color-accent-bg)", color: "var(--color-accent-text)" }}>Badge</span><span className="px-2 py-0.5 rounded-full text-[0.6875rem]" style={{ backgroundColor: "var(--color-success-bg)", color: "var(--color-success-text)" }}>Active</span></div>;
  if (asset.id === "comp-progress") return <div className="w-full h-2 rounded-full" style={{ backgroundColor: "var(--color-bg-tertiary)" }}><div className="h-full rounded-full" style={{ width: "65%", backgroundColor: "var(--color-accent)" }} /></div>;
  if (asset.id === "comp-skeleton") return <div className="space-y-2"><div className="h-3 w-3/4 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} /><div className="h-3 w-1/2 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} /></div>;
  if (asset.id === "comp-avatar") return <div className="w-8 h-8 rounded-full" style={{ backgroundColor: "var(--color-accent-bg)", border: "2px solid var(--color-accent)" }} />;
  if (asset.id === "comp-toggle") return <div className="w-9 h-5 rounded-full relative" style={{ backgroundColor: "var(--color-bg-hover)" }}><div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full" style={{ backgroundColor: "var(--color-text-muted)" }} /></div>;
  if (asset.id === "comp-checkbox") return <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm" style={{ border: "2px solid var(--color-border-strong)" }} /><span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Option</span></div>;
  if (asset.group === "inputs-forms") return <div className="px-3 py-1.5 rounded-md text-xs" style={{ backgroundColor: "var(--color-bg-tertiary)", border: "1px solid var(--color-border-default)", color: "var(--color-text-muted)" }}>{asset.name}...</div>;
  return <div className="text-xs py-1" style={{ color: "var(--color-text-muted)" }}>{asset.name} preview</div>;
}

// ─── Patterns (full-bleed wireframe, NO cards) ───────────

function PatternPane({ group }: { group: string }) {
  const items = getAssetsByGroup(group);
  if (!items.length) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] max-w-3xl mx-auto">
      <PatternWireframe group={group} />
      <p className="text-xs mt-4" style={{ color: "var(--color-text-muted)" }}>
        Not yet built — describe this pattern to start
      </p>
    </div>
  );
}

function PatternWireframe({ group }: { group: string }) {
  const bar = "var(--color-bg-hover)";
  const bdr = "var(--color-border-default)";
  const bg = "var(--color-bg-tertiary)";

  if (group === "nav-bar") return (
    <div className="w-full rounded-lg p-4" style={{ backgroundColor: bg, border: `1px dashed ${bdr}` }}>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded" style={{ backgroundColor: bar }} />
        <div className="flex gap-4 flex-1">{["Home", "About", "Contact"].map((l) => <div key={l} className="text-[0.6875rem]" style={{ color: "var(--color-text-muted)" }}>{l}</div>)}</div>
        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: bar }} />
      </div>
    </div>
  );
  if (group === "sidebar") return (
    <div className="w-full flex rounded-lg overflow-hidden" style={{ border: `1px dashed ${bdr}`, height: "160px" }}>
      <div className="w-40 shrink-0 p-3 space-y-2" style={{ backgroundColor: bg }}>{[1,2,3,4,5].map((i) => <div key={i} className="h-3 rounded" style={{ backgroundColor: bar, width: `${50+i*8}%` }} />)}</div>
      <div className="flex-1 p-3"><div className="h-3 w-1/2 rounded mb-2" style={{ backgroundColor: bar }} /><div className="h-2 w-3/4 rounded mb-1" style={{ backgroundColor: "var(--color-bg-tertiary)" }} /><div className="h-2 w-2/3 rounded" style={{ backgroundColor: "var(--color-bg-tertiary)" }} /></div>
    </div>
  );
  if (group === "card") return (
    <div className="w-full max-w-sm rounded-lg p-4 space-y-2" style={{ backgroundColor: bg, border: `1px dashed ${bdr}` }}>
      <div className="h-3 w-1/3 rounded" style={{ backgroundColor: bar }} />
      <div className="h-2 w-full rounded" style={{ backgroundColor: bar }} />
      <div className="h-2 w-2/3 rounded" style={{ backgroundColor: bar }} />
      <div className="flex gap-2 pt-1"><div className="h-6 w-16 rounded" style={{ backgroundColor: bar }} /><div className="h-6 w-16 rounded" style={{ backgroundColor: bar }} /></div>
    </div>
  );
  if (group === "modal") return (
    <div className="w-full max-w-md relative rounded-lg p-2" style={{ backgroundColor: "var(--color-bg-hover)", minHeight: "140px" }}>
      <div className="absolute inset-6 rounded-lg p-4" style={{ backgroundColor: bg, border: `1px dashed ${bdr}` }}>
        <div className="h-3 w-1/3 rounded mb-3" style={{ backgroundColor: bar }} />
        <div className="h-2 w-full rounded mb-1" style={{ backgroundColor: bar }} />
        <div className="h-2 w-1/2 rounded mb-3" style={{ backgroundColor: bar }} />
        <div className="flex gap-2"><div className="h-6 w-16 rounded" style={{ backgroundColor: bar }} /><div className="h-6 w-16 rounded" style={{ backgroundColor: bar }} /></div>
      </div>
    </div>
  );
  if (group === "data-table") return (
    <div className="w-full rounded-lg overflow-hidden" style={{ border: `1px dashed ${bdr}` }}>
      {[0,1,2,3,4].map((r) => (
        <div key={r} className="flex gap-4 px-4 py-2" style={{ backgroundColor: r === 0 ? bg : "transparent", borderBottom: r < 4 ? `1px solid var(--color-border-subtle)` : undefined }}>
          {[1,2,3,4].map((c) => <div key={c} className="h-2.5 flex-1 rounded" style={{ backgroundColor: bar }} />)}
        </div>
      ))}
    </div>
  );
  if (group === "form-layout") return (
    <div className="w-full max-w-md space-y-4 p-4 rounded-lg" style={{ backgroundColor: bg, border: `1px dashed ${bdr}` }}>
      {[1,2,3].map((i) => (
        <div key={i} className="space-y-1">
          <div className="h-2 w-16 rounded" style={{ backgroundColor: bar }} />
          <div className="h-8 w-full rounded-md" style={{ border: `1px solid var(--color-border-subtle)` }} />
        </div>
      ))}
      <div className="h-8 w-24 rounded-md" style={{ backgroundColor: bar }} />
    </div>
  );
  if (group === "search") return (
    <div className="w-full max-w-md space-y-3 p-4 rounded-lg" style={{ backgroundColor: bg, border: `1px dashed ${bdr}` }}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ border: `1px solid var(--color-border-default)` }}>
        <LucideIcons.Search size={14} style={{ color: "var(--color-text-muted)" }} /><span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Search...</span>
      </div>
      {[1,2,3].map((i) => <div key={i} className="h-2 rounded" style={{ backgroundColor: bar, width: `${85-i*15}%` }} />)}
    </div>
  );
  return <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Pattern wireframe</div>;
}
