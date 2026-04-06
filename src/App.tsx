import { useState, useCallback, useMemo } from "react";
import {
  Palette, Type, Grid3x3, Box, Layers, Component,
  Navigation, PanelLeft, SquareStack, AppWindow,
  Table2, FileInput, Search as SearchIcon,
  Sun, Moon, ChevronDown, Hexagon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { initTheme, applyTheme, type Theme } from "./components/ThemeSync";
import StatusBadge from "./components/StatusBadge";
import CopyButton from "./components/CopyButton";
import ComponentCard from "./components/ComponentCard";
import {
  getAssetsByGroup, getReadyCount, getTotalCount,
  type AssetItem, type AssetStatus,
} from "./data/assetRegistry";

// ─── Sidebar item definitions ────────────────────────────

type SidebarItemId =
  | "colors" | "typography" | "icons" | "spacing" | "shadows" | "components"
  | "nav-bar" | "sidebar" | "card" | "modal" | "data-table" | "form-layout" | "search";

interface SidebarEntry {
  id: SidebarItemId;
  label: string;
  icon: React.ReactNode;
  group: string; // matches registry group for status lookup
}

const DS_ITEMS: SidebarEntry[] = [
  { id: "colors", label: "Colors", icon: <Palette size={14} />, group: "colors" },
  { id: "typography", label: "Typography", icon: <Type size={14} />, group: "typography" },
  { id: "icons", label: "Icons", icon: <Grid3x3 size={14} />, group: "icons" },
  { id: "spacing", label: "Spacing & Layout", icon: <Box size={14} />, group: "spacing" },
  { id: "shadows", label: "Shadows", icon: <Layers size={14} />, group: "shadows" },
  { id: "components", label: "Components", icon: <Component size={14} />, group: "buttons-actions" },
];

const PATTERN_ITEMS: SidebarEntry[] = [
  { id: "nav-bar", label: "Nav Bar", icon: <Navigation size={14} />, group: "nav-bar" },
  { id: "sidebar", label: "Sidebar", icon: <PanelLeft size={14} />, group: "sidebar" },
  { id: "card", label: "Card", icon: <SquareStack size={14} />, group: "card" },
  { id: "modal", label: "Modal / Dialog", icon: <AppWindow size={14} />, group: "modal" },
  { id: "data-table", label: "Data Table", icon: <Table2 size={14} />, group: "data-table" },
  { id: "form-layout", label: "Form Layout", icon: <FileInput size={14} />, group: "form-layout" },
  { id: "search", label: "Search", icon: <SearchIcon size={14} />, group: "search" },
];

function getBestStatus(group: string): AssetStatus {
  const items = getAssetsByGroup(group);
  if (items.some((i) => i.status === "dev-ready")) return "dev-ready";
  if (items.some((i) => i.status === "in-progress")) return "in-progress";
  if (items.some((i) => i.status === "deprecated")) return "deprecated";
  return "draft";
}

// For "components" sidebar item, check across all component groups
function getComponentsStatus(): AssetStatus {
  const groups = ["buttons-actions", "inputs-forms", "feedback", "data-display"];
  for (const g of groups) {
    const items = getAssetsByGroup(g);
    if (items.some((i) => i.status === "dev-ready")) return "dev-ready";
  }
  for (const g of groups) {
    const items = getAssetsByGroup(g);
    if (items.some((i) => i.status === "in-progress")) return "in-progress";
  }
  return "draft";
}

// ─── Main App ────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>(initTheme);
  const [selected, setSelected] = useState<SidebarItemId>("colors");
  const [docsOpen, setDocsOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  // Get current item's top-bar info
  const currentEntry = useMemo(() => {
    return [...DS_ITEMS, ...PATTERN_ITEMS].find((e) => e.id === selected)!;
  }, [selected]);

  const currentStatus = useMemo(() => {
    if (selected === "components") return getComponentsStatus();
    return getBestStatus(currentEntry.group);
  }, [selected, currentEntry]);

  // For the top bar copy: the first item's copyValue in the group
  const firstItem = useMemo(() => {
    if (selected === "components") {
      return getAssetsByGroup("buttons-actions")[0];
    }
    return getAssetsByGroup(currentEntry.group)[0];
  }, [selected, currentEntry]);

  const readyCount = getReadyCount();
  const totalCount = getTotalCount();
  const readyPct = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

  return (
    <div className="flex min-h-dvh">
      {/* ── LEFT SIDEBAR ────────────────────────────────── */}
      <aside
        className="w-56 shrink-0 flex flex-col overflow-y-auto"
        style={{
          backgroundColor: "var(--ds-sidebar-bg)",
          borderRight: "1px solid var(--ds-topbar-border)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--ds-topbar-border)" }}>
          <Hexagon size={18} style={{ color: "var(--color-accent)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>ACME DS</span>
        </div>

        {/* Design System section */}
        <div className="px-3 pt-4 pb-1">
          <div className="text-[0.625rem] font-semibold uppercase tracking-widest px-2 mb-1.5" style={{ color: "var(--color-text-muted)" }}>
            Design System
          </div>
          {DS_ITEMS.map((item) => (
            <SidebarButton
              key={item.id}
              entry={item}
              active={selected === item.id}
              status={item.id === "components" ? getComponentsStatus() : getBestStatus(item.group)}
              onClick={() => { setSelected(item.id); setDocsOpen(false); }}
            />
          ))}
        </div>

        {/* Patterns section */}
        <div className="px-3 pt-3 pb-1">
          <div className="text-[0.625rem] font-semibold uppercase tracking-widest px-2 mb-1.5" style={{ color: "var(--color-text-muted)" }}>
            Patterns
          </div>
          {PATTERN_ITEMS.map((item) => (
            <SidebarButton
              key={item.id}
              entry={item}
              active={selected === item.id}
              status={getBestStatus(item.group)}
              onClick={() => { setSelected(item.id); setDocsOpen(false); }}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-auto px-4 py-3" style={{ borderTop: "1px solid var(--ds-topbar-border)" }}>
          <div className="text-[0.6875rem]" style={{ color: "var(--color-text-muted)" }}>
            {totalCount} assets · {readyPct}% ready
          </div>
        </div>
      </aside>

      {/* ── RIGHT SIDE ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Bar — 40px */}
        <div
          className="h-10 shrink-0 flex items-center gap-2 px-4"
          style={{
            backgroundColor: "var(--ds-topbar-bg)",
            borderBottom: "1px solid var(--ds-topbar-border)",
          }}
        >
          <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
            {currentEntry.label}
          </span>
          <StatusBadge status={currentStatus} />
          <div className="flex-1" />
          {firstItem && <CopyButton value={firstItem.copyValue} label />}
          <button
            onClick={() => setDocsOpen((p) => !p)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs cursor-pointer transition-colors"
            style={{
              background: docsOpen ? "var(--color-accent-bg)" : "none",
              border: "none",
              color: docsOpen ? "var(--color-accent-text)" : "var(--color-text-muted)",
            }}
          >
            Docs
            <ChevronDown
              size={12}
              className="transition-transform"
              style={{ transform: docsOpen ? "rotate(180deg)" : "rotate(0)" }}
            />
          </button>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs cursor-pointer transition-colors"
            style={{ background: "none", border: "none", color: "var(--color-text-muted)" }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Content pane */}
        <div className="flex-1 overflow-y-auto p-6">
          <ContentPane selected={selected} docsOpen={docsOpen} />
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Button ──────────────────────────────────────

function SidebarButton({ entry, active, status, onClick }: {
  entry: SidebarEntry;
  active: boolean;
  status: AssetStatus;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-[0.8125rem] text-left cursor-pointer transition-colors"
      style={{
        backgroundColor: active ? "var(--ds-sidebar-active-bg)" : "transparent",
        color: active ? "var(--ds-sidebar-active-text)" : "var(--ds-sidebar-text)",
        border: "none",
      }}
    >
      <span style={{ color: active ? "var(--color-accent)" : "var(--color-text-muted)" }}>{entry.icon}</span>
      <span className="flex-1 truncate">{entry.label}</span>
      <StatusBadge status={status} compact />
    </button>
  );
}

// ─── Content Pane Router ─────────────────────────────────

function ContentPane({ selected, docsOpen }: { selected: SidebarItemId; docsOpen: boolean }) {
  switch (selected) {
    case "colors": return <ColorsSection docsOpen={docsOpen} />;
    case "typography": return <TypographySection docsOpen={docsOpen} />;
    case "icons": return <IconsSection docsOpen={docsOpen} />;
    case "spacing": return <SpacingSection docsOpen={docsOpen} />;
    case "shadows": return <ShadowsSection docsOpen={docsOpen} />;
    case "components": return <ComponentsSection docsOpen={docsOpen} />;
    default: return <PatternSection group={selected} docsOpen={docsOpen} />;
  }
}

// ─── Colors ──────────────────────────────────────────────

function ColorsSection({}: { docsOpen: boolean }) {
  const items = getAssetsByGroup("colors");
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
      {items.map((asset) => (
        <ColorCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}

function ColorCard({ asset }: { asset: AssetItem }) {
  return (
    <ComponentCard asset={asset}>
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg shrink-0"
          style={{
            backgroundColor: asset.colorValue ?? "var(--color-neutral-300)",
            border: "1px solid var(--color-border-subtle)",
          }}
        />
        <div className="min-w-0">
          <div className="text-xs truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>
            {asset.copyValue}
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}

// ─── Typography ──────────────────────────────────────────

const TYPE_STYLES: Record<string, { fontSize: string; fontWeight: string; lineHeight: string; fontFamily?: string; sample: string }> = {
  "type-heading-xl": { fontSize: "2.25rem", fontWeight: "700", lineHeight: "1.2", sample: "Heading XL" },
  "type-heading-lg": { fontSize: "1.5rem", fontWeight: "600", lineHeight: "1.3", sample: "Heading Large" },
  "type-heading-md": { fontSize: "1.25rem", fontWeight: "600", lineHeight: "1.4", sample: "Heading Medium" },
  "type-heading-sm": { fontSize: "1rem", fontWeight: "600", lineHeight: "1.5", sample: "Heading Small" },
  "type-body": { fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.6", sample: "Body text is the standard reading size for paragraphs and general content throughout the application." },
  "type-body-sm": { fontSize: "0.75rem", fontWeight: "400", lineHeight: "1.5", sample: "Small body text for captions and timestamps." },
  "type-mono": { fontSize: "0.8125rem", fontWeight: "400", lineHeight: "1.6", fontFamily: "var(--font-mono)", sample: "const token = 'var(--color-primary-400)';" },
};

function TypographySection({}: { docsOpen: boolean }) {
  const items = getAssetsByGroup("typography");
  return (
    <div className="space-y-3 max-w-3xl">
      {items.map((asset) => {
        const style = TYPE_STYLES[asset.id];
        return (
          <ComponentCard key={asset.id} asset={asset}>
            {style ? (
              <div style={{
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                lineHeight: style.lineHeight,
                fontFamily: style.fontFamily ?? "var(--font-sans)",
                color: "var(--color-text-primary)",
              }}>
                {style.sample}
              </div>
            ) : (
              <div style={{ color: "var(--color-text-muted)" }}>{asset.name}</div>
            )}
          </ComponentCard>
        );
      })}
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────

const ICON_SIZES = [12, 14, 16, 18, 20, 24, 32, 40] as const;
const ICON_SIZE_USAGE: Record<number, string> = {
  12: "Badge icons, inline indicators",
  14: "Sidebar nav, dropdown menus, compact buttons",
  16: "Alongside body text, form field icons",
  18: "Standard button icons, tab icons",
  20: "Primary buttons, toolbar icons (DEFAULT)",
  24: "Nav bar icons, section headers",
  32: "Empty states, feature callouts",
  40: "Landing page features, splash screens",
};

const ICON_CAT_LABELS: Record<string, string> = {
  navigation: "Navigation",
  actions: "Actions",
  status: "Status",
  content: "Content",
  communication: "Communication",
  media: "Media",
};

function IconsSection({}: { docsOpen: boolean }) {
  const items = getAssetsByGroup("icons");
  const [filter, setFilter] = useState("");
  const filtered = filter
    ? items.filter((i) => i.name.toLowerCase().includes(filter.toLowerCase()))
    : items;

  // Group by category
  const categories = useMemo(() => {
    const map = new Map<string, AssetItem[]>();
    for (const item of filtered) {
      const cat = item.iconCategory ?? "actions";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return map;
  }, [filtered]);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Size Scale */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Size Scale</h3>
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: "var(--ds-card-bg)", border: "1px dashed var(--ds-card-border)" }}
        >
          <div className="flex items-end gap-4 flex-wrap">
            {ICON_SIZES.map((sz) => (
              <div key={sz} className="flex flex-col items-center gap-1.5">
                <LucideIcons.Star size={sz} style={{ color: "var(--color-text-primary)" }} />
                <span className="text-[0.625rem]" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{sz}px</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
            {ICON_SIZES.map((sz) => (
              <div key={sz} className="flex items-center gap-2 text-[0.6875rem]">
                <span style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-mono)", width: "32px" }}>{sz}px</span>
                <span style={{ color: "var(--color-text-muted)" }}>{ICON_SIZE_USAGE[sz]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="relative max-w-xs">
        <SearchIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter icons..."
          className="w-full pl-8 pr-3 py-1.5 rounded-md text-sm outline-none"
          style={{
            backgroundColor: "var(--color-bg-tertiary)",
            border: "1px solid var(--color-border-default)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-sans)",
          }}
        />
      </div>

      {/* Categorized icons */}
      {Array.from(categories.entries()).map(([cat, catItems]) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
            {ICON_CAT_LABELS[cat] ?? cat}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {catItems.map((asset) => (
              <IconCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function IconCard({ asset }: { asset: AssetItem }) {
  const IconComp = asset.iconName
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? ((LucideIcons as any)[asset.iconName] as React.ComponentType<{ size?: number }> | undefined)
    : undefined;

  return (
    <div
      data-placeholder={asset.placeholder}
      className="flex flex-col items-center gap-1.5 p-3 rounded-lg text-center"
      style={{
        backgroundColor: "var(--ds-card-bg)",
        border: `1px ${asset.placeholder ? "dashed" : "solid"} var(--ds-card-border)`,
      }}
    >
      <div style={{ color: "var(--color-text-primary)" }}>
        {IconComp ? <IconComp size={20} /> : <LucideIcons.HelpCircle size={20} />}
      </div>
      <span className="text-[0.625rem] truncate w-full" style={{ color: "var(--color-text-muted)" }}>
        {asset.name}
      </span>
      <CopyButton value={asset.copyValue} size={11} />
    </div>
  );
}

// ─── Spacing ─────────────────────────────────────────────

function SpacingSection({}: { docsOpen: boolean }) {
  const items = getAssetsByGroup("spacing");
  const spaceItems = items.filter((i) => i.id.startsWith("space-"));
  const radiusItems = items.filter((i) => i.id.startsWith("radius-"));

  return (
    <div className="space-y-6 max-w-3xl">
      {spaceItems.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Spacing Scale</h3>
          <div className="space-y-2">
            {spaceItems.map((asset) => (
              <ComponentCard key={asset.id} asset={asset}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-6 rounded"
                    style={{
                      width: `${asset.spacingPx ?? 16}px`,
                      minWidth: `${asset.spacingPx ?? 16}px`,
                      backgroundColor: "var(--color-accent)",
                      opacity: 0.6,
                    }}
                  />
                  <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>
                    {asset.spacingPx}px
                  </span>
                </div>
              </ComponentCard>
            ))}
          </div>
        </div>
      )}
      {radiusItems.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Border Radius</h3>
          <div className="grid grid-cols-3 gap-3">
            {radiusItems.map((asset) => (
              <ComponentCard key={asset.id} asset={asset}>
                <div className="flex items-center justify-center">
                  <div
                    className="w-14 h-14"
                    style={{
                      borderRadius: asset.copyValue,
                      backgroundColor: "var(--color-accent-bg)",
                      border: "2px solid var(--color-accent)",
                    }}
                  />
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

function ShadowsSection({}: { docsOpen: boolean }) {
  const items = getAssetsByGroup("shadows");
  return (
    <div className="grid grid-cols-3 gap-4 max-w-3xl">
      {items.map((asset) => (
        <ComponentCard key={asset.id} asset={asset}>
          <div className="flex items-center justify-center py-2">
            <div
              className="w-20 h-14 rounded-lg"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                boxShadow: asset.copyValue,
              }}
            />
          </div>
        </ComponentCard>
      ))}
    </div>
  );
}

// ─── Components (scrollable page with section headers) ───

const COMP_SECTIONS: { label: string; group: string }[] = [
  { label: "Buttons & Actions", group: "buttons-actions" },
  { label: "Inputs & Forms", group: "inputs-forms" },
  { label: "Feedback", group: "feedback" },
  { label: "Data Display", group: "data-display" },
];

function ComponentsSection({}: { docsOpen: boolean }) {
  return (
    <div className="space-y-8 max-w-4xl">
      {COMP_SECTIONS.map((section) => {
        const items = getAssetsByGroup(section.group);
        if (items.length === 0) return null;
        return (
          <div key={section.group}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
              {section.label}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {items.map((asset) => (
                <ComponentCard key={asset.id} asset={asset}>
                  <ComponentPreview asset={asset} />
                </ComponentCard>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ComponentPreview({ asset }: { asset: AssetItem }) {
  // Placeholder component previews
  if (asset.group === "buttons-actions") {
    return (
      <div className="flex items-center gap-2">
        <div
          className="px-3 py-1.5 rounded-md text-xs"
          style={{
            backgroundColor: asset.id.includes("danger") ? "var(--color-error-300)"
              : asset.id.includes("secondary") ? "transparent"
              : "var(--color-accent)",
            color: asset.id.includes("secondary") ? "var(--color-text-primary)" : "var(--color-text-inverse)",
            border: asset.id.includes("secondary") ? "1px solid var(--color-border-default)" : "none",
          }}
        >
          {asset.name}
        </div>
      </div>
    );
  }
  if (asset.id === "comp-badge") {
    return (
      <div className="flex gap-2">
        <span className="px-2 py-0.5 rounded-full text-[0.6875rem]" style={{ backgroundColor: "var(--color-accent-bg)", color: "var(--color-accent-text)" }}>Badge</span>
        <span className="px-2 py-0.5 rounded-full text-[0.6875rem]" style={{ backgroundColor: "var(--color-success-bg)", color: "var(--color-success-text)" }}>Active</span>
      </div>
    );
  }
  if (asset.id === "comp-input" || asset.id === "comp-textarea" || asset.id === "comp-select") {
    return (
      <div
        className="px-3 py-1.5 rounded-md text-xs"
        style={{ backgroundColor: "var(--color-bg-tertiary)", border: "1px solid var(--color-border-default)", color: "var(--color-text-muted)" }}
      >
        {asset.name}...
      </div>
    );
  }
  if (asset.id === "comp-progress") {
    return (
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-bg-tertiary)" }}>
        <div className="h-full rounded-full" style={{ width: "65%", backgroundColor: "var(--color-accent)" }} />
      </div>
    );
  }
  if (asset.id === "comp-skeleton") {
    return (
      <div className="space-y-2">
        <div className="h-3 w-3/4 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
        <div className="h-3 w-1/2 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
      </div>
    );
  }
  if (asset.id === "comp-avatar") {
    return (
      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: "var(--color-accent-bg)", border: "2px solid var(--color-accent)" }} />
    );
  }
  if (asset.id === "comp-toggle") {
    return (
      <div className="w-9 h-5 rounded-full relative" style={{ backgroundColor: "var(--color-bg-hover)" }}>
        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full" style={{ backgroundColor: "var(--color-text-muted)" }} />
      </div>
    );
  }
  if (asset.id === "comp-checkbox") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ border: "2px solid var(--color-border-strong)" }} />
        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Option</span>
      </div>
    );
  }
  // Generic placeholder
  return (
    <div className="text-xs py-2" style={{ color: "var(--color-text-muted)" }}>
      {asset.name} preview
    </div>
  );
}

// ─── Pattern Section ─────────────────────────────────────

function PatternSection({ group }: { group: string; docsOpen: boolean }) {
  const items = getAssetsByGroup(group);
  if (items.length === 0) return null;
  const asset = items[0];

  return (
    <div className="max-w-3xl">
      <ComponentCard asset={asset}>
        <PatternPreview asset={asset} />
      </ComponentCard>
    </div>
  );
}

function PatternPreview({ asset }: { asset: AssetItem }) {
  // Wireframe-style placeholder previews for each pattern
  const muted = "var(--color-text-muted)";
  const border = "var(--color-border-default)";
  const bg = "var(--color-bg-tertiary)";

  if (asset.group === "nav-bar") {
    return (
      <div className="rounded-md p-3" style={{ backgroundColor: bg, border: `1px dashed ${border}` }}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
          <div className="flex gap-3 flex-1">
            {["Home", "About", "Contact"].map((l) => (
              <div key={l} className="text-[0.6875rem]" style={{ color: muted }}>{l}</div>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "var(--color-bg-hover)" }} />
        </div>
      </div>
    );
  }
  if (asset.group === "sidebar") {
    return (
      <div className="flex rounded-md overflow-hidden" style={{ border: `1px dashed ${border}`, height: "120px" }}>
        <div className="w-32 shrink-0 p-2 space-y-1.5" style={{ backgroundColor: bg }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 rounded" style={{ backgroundColor: "var(--color-bg-hover)", width: `${60 + i * 8}%` }} />
          ))}
        </div>
        <div className="flex-1 p-2" style={{ backgroundColor: "var(--color-bg-primary)" }}>
          <div className="h-3 w-1/2 rounded mb-2" style={{ backgroundColor: "var(--color-bg-hover)" }} />
          <div className="h-2 w-3/4 rounded mb-1" style={{ backgroundColor: "var(--color-bg-tertiary)" }} />
          <div className="h-2 w-2/3 rounded" style={{ backgroundColor: "var(--color-bg-tertiary)" }} />
        </div>
      </div>
    );
  }
  if (asset.group === "card") {
    return (
      <div className="rounded-lg p-3 space-y-2" style={{ backgroundColor: bg, border: `1px dashed ${border}` }}>
        <div className="h-3 w-1/3 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
        <div className="h-2 w-full rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
        <div className="h-2 w-2/3 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
          <div className="h-5 w-16 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
        </div>
      </div>
    );
  }
  if (asset.group === "modal") {
    return (
      <div className="relative rounded-lg p-1" style={{ backgroundColor: "var(--color-bg-hover)", minHeight: "100px" }}>
        <div className="absolute inset-4 rounded-lg p-3" style={{ backgroundColor: bg, border: `1px dashed ${border}` }}>
          <div className="h-3 w-1/3 rounded mb-2" style={{ backgroundColor: "var(--color-bg-hover)" }} />
          <div className="h-2 w-full rounded mb-1" style={{ backgroundColor: "var(--color-bg-hover)" }} />
          <div className="h-2 w-1/2 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
        </div>
      </div>
    );
  }
  if (asset.group === "data-table") {
    return (
      <div className="rounded-md overflow-hidden" style={{ border: `1px dashed ${border}` }}>
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="flex gap-4 px-3 py-1.5"
            style={{
              backgroundColor: row === 0 ? bg : "transparent",
              borderBottom: row < 3 ? `1px solid var(--color-border-subtle)` : undefined,
            }}
          >
            {[1, 2, 3].map((col) => (
              <div key={col} className="h-2.5 flex-1 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (asset.group === "form-layout") {
    return (
      <div className="space-y-3 p-3 rounded-md" style={{ backgroundColor: bg, border: `1px dashed ${border}` }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="h-2 w-16 rounded" style={{ backgroundColor: "var(--color-bg-hover)" }} />
            <div className="h-7 w-full rounded-md" style={{ border: `1px solid var(--color-border-subtle)` }} />
          </div>
        ))}
        <div className="h-7 w-24 rounded-md" style={{ backgroundColor: "var(--color-bg-hover)" }} />
      </div>
    );
  }
  if (asset.group === "search") {
    return (
      <div className="space-y-2 p-3 rounded-md" style={{ backgroundColor: bg, border: `1px dashed ${border}` }}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ border: `1px solid var(--color-border-default)` }}>
          <LucideIcons.Search size={12} style={{ color: muted }} />
          <span className="text-xs" style={{ color: muted }}>Search...</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-2 rounded" style={{ backgroundColor: "var(--color-bg-hover)", width: `${80 - i * 12}%` }} />
        ))}
      </div>
    );
  }
  return <div className="text-xs" style={{ color: muted }}>Pattern preview</div>;
}
