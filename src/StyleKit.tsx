import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import {
  assetRegistry,
  type AssetItem,
  type AssetStatus,
  type AssetCategory,
} from "./data/assetRegistry";
import ComponentCard from "./components/ComponentCard";

export type StyleKitTab = "colors" | "typography" | "components" | "tokens" | "spacing" | "icons";

interface StyleKitProps {
  initialTab?: StyleKitTab;
}

const TAB_CONFIG: { key: StyleKitTab; label: string; categories: AssetCategory[] }[] = [
  { key: "colors", label: "Colors", categories: ["color"] },
  { key: "typography", label: "Typography", categories: ["typography"] },
  { key: "components", label: "Components", categories: ["component"] },
  { key: "tokens", label: "Tokens", categories: ["color", "typography", "spacing", "icon", "component", "pattern", "token"] },
  { key: "spacing", label: "Spacing & Layout", categories: ["spacing"] },
  { key: "icons", label: "Icons", categories: ["icon"] },
];

const ALL_STATUSES: AssetStatus[] = ["dev-ready", "in-progress", "deprecated", "draft"];

const STATUS_LABELS: Record<AssetStatus, string> = {
  "dev-ready": "Dev Ready",
  "in-progress": "In Progress",
  deprecated: "Deprecated",
  draft: "Draft",
};

// ── Color swatch helpers ─────────────────────────────────

const COLOR_VALUES_DARK: Record<string, string> = {
  "color-neutral-100": "#1a1a1f",
  "color-neutral-200": "#27272e",
  "color-neutral-300": "#3f3f48",
  "color-neutral-400": "#71717a",
  "color-neutral-500": "#a1a1aa",
  "color-primary-300": "#4f46e5",
  "color-primary-400": "#818cf8",
  "color-success-300": "#16a34a",
  "color-warning-300": "#ca8a04",
  "color-error-300": "#dc2626",
  "color-bg-primary": "#111113",
};

const COLOR_GROUPS: { label: string; ids: string[] }[] = [
  {
    label: "Neutrals",
    ids: ["color-neutral-100", "color-neutral-200", "color-neutral-300", "color-neutral-400", "color-neutral-500"],
  },
  { label: "Primary", ids: ["color-primary-300", "color-primary-400"] },
  {
    label: "Semantic",
    ids: ["color-success-300", "color-warning-300", "color-error-300"],
  },
  { label: "Backgrounds", ids: ["color-bg-primary"] },
];

// ── Icon preview component ───────────────────────────────

function IconPreview({ iconName }: { iconName: string }) {
  const pascalName = iconName
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComp = (LucideIcons as any)[pascalName] as React.ComponentType<{ size?: number }> | undefined;
  if (!IconComp) return <div className="w-10 h-10" />;
  return (
    <div
      className="flex items-center justify-center w-12 h-12 rounded-lg"
      style={{ backgroundColor: "var(--color-bg-tertiary)" }}
    >
      <IconComp size={22} />
    </div>
  );
}

// ── Main StyleKit Component ──────────────────────────────

export default function StyleKit({ initialTab = "colors" }: StyleKitProps) {
  const [activeTab, setActiveTab] = useState<StyleKitTab>(initialTab);
  const [search, setSearch] = useState("");
  const [activeStatuses, setActiveStatuses] = useState<Set<AssetStatus>>(
    new Set(ALL_STATUSES)
  );

  const toggleStatus = (s: AssetStatus) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(s)) {
        if (next.size > 1) next.delete(s);
      } else {
        next.add(s);
      }
      return next;
    });
  };

  // Filter items
  const filteredByTab = useMemo(() => {
    const tabConf = TAB_CONFIG.find((t) => t.key === activeTab)!;
    // For the tokens tab show everything; for others only the matching category
    if (activeTab === "tokens") return [...assetRegistry];
    return assetRegistry.filter((a) => tabConf.categories.includes(a.category));
  }, [activeTab]);

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return filteredByTab.filter((a) => {
      if (!activeStatuses.has(a.status)) return false;
      if (q && !a.name.toLowerCase().includes(q) && !a.description.toLowerCase().includes(q) && !a.id.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [filteredByTab, search, activeStatuses]);

  // Per-tab counts for badge
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of TAB_CONFIG) {
      if (t.key === "tokens") {
        counts[t.key] = assetRegistry.filter(
          (a) => activeStatuses.has(a.status) && (!search || matchesSearch(a, search))
        ).length;
      } else {
        counts[t.key] = assetRegistry.filter(
          (a) =>
            t.categories.includes(a.category) &&
            activeStatuses.has(a.status) &&
            (!search || matchesSearch(a, search))
        ).length;
      }
    }
    return counts;
  }, [search, activeStatuses]);

  // Status summary for current tab
  const statusSummary = useMemo(() => {
    const items = activeTab === "tokens" ? assetRegistry : assetRegistry.filter((a) => {
      const tabConf = TAB_CONFIG.find((t) => t.key === activeTab)!;
      return tabConf.categories.includes(a.category);
    });
    const ready = items.filter((a) => a.status === "dev-ready").length;
    const progress = items.filter((a) => a.status === "in-progress").length;
    const draft = items.filter((a) => a.status === "draft").length;
    const parts: string[] = [];
    if (ready) parts.push(`${ready} ready`);
    if (progress) parts.push(`${progress} in progress`);
    if (draft) parts.push(`${draft} draft`);
    return parts.join(" \u00b7 ");
  }, [activeTab]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Search + Filter bar */}
      <div
        className="px-4 py-3 space-y-3"
        style={{ borderBottom: "1px solid var(--ds-nav-border)" }}
      >
        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--ds-search-placeholder)" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets by name, description, or ID..."
            className="w-full pl-9 pr-8 py-2 rounded-md text-sm outline-none"
            style={{
              backgroundColor: "var(--ds-search-bg)",
              border: "1px solid var(--ds-search-border)",
              color: "var(--ds-search-text)",
              fontFamily: "var(--font-sans)",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ color: "var(--color-text-muted)", background: "none", border: "none" }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[0.6875rem] font-medium mr-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Status:
          </span>
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => toggleStatus(s)}
              className="px-2.5 py-1 rounded-full text-[0.6875rem] font-medium cursor-pointer transition-colors"
              style={{
                backgroundColor: activeStatuses.has(s)
                  ? "var(--color-accent-bg)"
                  : "var(--color-bg-tertiary)",
                color: activeStatuses.has(s)
                  ? "var(--color-accent-text)"
                  : "var(--color-text-muted)",
                border: activeStatuses.has(s)
                  ? "1px solid var(--color-accent)"
                  : "1px solid transparent",
              }}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="flex items-center gap-0 px-4 overflow-x-auto"
        style={{ borderBottom: "1px solid var(--ds-tab-border)" }}
      >
        {TAB_CONFIG.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className="relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors"
            style={{
              color:
                activeTab === t.key
                  ? "var(--ds-tab-active)"
                  : "var(--ds-tab-text)",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === t.key
                  ? "2px solid var(--ds-tab-active)"
                  : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {t.label}
            <span
              className="text-[0.625rem] px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor:
                  activeTab === t.key
                    ? "var(--color-accent-bg)"
                    : "var(--color-bg-tertiary)",
                color:
                  activeTab === t.key
                    ? "var(--color-accent-text)"
                    : "var(--color-text-muted)",
              }}
            >
              {tabCounts[t.key]}
            </span>
          </button>
        ))}

        {/* Status summary */}
        <div
          className="ml-auto text-[0.6875rem] whitespace-nowrap"
          style={{ color: "var(--color-text-muted)" }}
        >
          {statusSummary}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "colors" && <ColorsTab items={filteredItems} />}
        {activeTab === "typography" && <TypographyTab items={filteredItems} />}
        {activeTab === "components" && <ComponentsTab items={filteredItems} />}
        {activeTab === "tokens" && <TokensTab items={filteredItems} />}
        {activeTab === "spacing" && <SpacingTab items={filteredItems} />}
        {activeTab === "icons" && <IconsTab items={filteredItems} />}
      </div>
    </div>
  );
}

// ── Utility ──────────────────────────────────────────────

function matchesSearch(a: AssetItem, search: string): boolean {
  const q = search.toLowerCase().trim();
  if (!q) return true;
  return (
    a.name.toLowerCase().includes(q) ||
    a.description.toLowerCase().includes(q) ||
    a.id.toLowerCase().includes(q)
  );
}

// ── Colors Tab ───────────────────────────────────────────

function ColorsTab({ items }: { items: AssetItem[] }) {
  const itemMap = new Map(items.map((i) => [i.id, i]));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {COLOR_GROUPS.map((group) => {
        const groupItems = group.ids.map((id) => itemMap.get(id)).filter(Boolean) as AssetItem[];
        if (groupItems.length === 0) return null;
        return (
          <div key={group.label}>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              {group.label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {groupItems.map((asset) => (
                <ComponentCard key={asset.id} asset={asset}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-lg shrink-0"
                      style={{
                        backgroundColor: `var(--${asset.id.replace("color-", "color-")})`,
                        border: "1px solid var(--color-border-subtle)",
                      }}
                    />
                    <div>
                      <div
                        className="text-xs font-mono"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {asset.copyValue}
                      </div>
                      <div
                        className="text-[0.6875rem] font-mono mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {COLOR_VALUES_DARK[asset.id] ?? ""}
                      </div>
                    </div>
                  </div>
                </ComponentCard>
              ))}
            </div>
          </div>
        );
      })}

      {/* Show any colors not in groups */}
      {(() => {
        const grouped = new Set(COLOR_GROUPS.flatMap((g) => g.ids));
        const ungrouped = items.filter((i) => !grouped.has(i.id));
        if (ungrouped.length === 0) return null;
        return (
          <div>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              Other
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ungrouped.map((asset) => (
                <ComponentCard key={asset.id} asset={asset}>
                  <div
                    className="w-full h-10 rounded-lg"
                    style={{
                      backgroundColor: `var(--${asset.id.replace("color-", "color-")})`,
                      border: "1px solid var(--color-border-subtle)",
                    }}
                  />
                </ComponentCard>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ── Typography Tab ───────────────────────────────────────

const TYPE_SAMPLES: Record<string, { fontSize: string; fontWeight: string; lineHeight: string; fontFamily?: string; sampleText: string }> = {
  "type-heading-xl": { fontSize: "2.25rem", fontWeight: "700", lineHeight: "1.2", sampleText: "Heading XL" },
  "type-heading-lg": { fontSize: "1.5rem", fontWeight: "600", lineHeight: "1.3", sampleText: "Heading Large" },
  "type-heading-md": { fontSize: "1.25rem", fontWeight: "600", lineHeight: "1.4", sampleText: "Heading Medium" },
  "type-heading-sm": { fontSize: "1rem", fontWeight: "600", lineHeight: "1.5", sampleText: "Heading Small" },
  "type-body": { fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.6", sampleText: "Body text looks like this. It's the standard reading size used for paragraphs and content throughout the application." },
  "type-body-sm": { fontSize: "0.75rem", fontWeight: "400", lineHeight: "1.5", sampleText: "Small body text for captions and meta info." },
  "type-mono": { fontSize: "0.8125rem", fontWeight: "400", lineHeight: "1.6", fontFamily: "var(--font-mono)", sampleText: "const token = 'var(--color-primary-400)';" },
};

function TypographyTab({ items }: { items: AssetItem[] }) {
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((asset) => {
        const sample = TYPE_SAMPLES[asset.id];
        return (
          <ComponentCard key={asset.id} asset={asset}>
            {sample ? (
              <div
                style={{
                  fontSize: sample.fontSize,
                  fontWeight: sample.fontWeight,
                  lineHeight: sample.lineHeight,
                  fontFamily: sample.fontFamily ?? "var(--font-sans)",
                  color: "var(--color-text-primary)",
                }}
              >
                {sample.sampleText}
              </div>
            ) : (
              <div style={{ color: "var(--color-text-primary)" }}>{asset.name}</div>
            )}
          </ComponentCard>
        );
      })}
    </div>
  );
}

// ── Components Tab ───────────────────────────────────────

function ComponentsTab({ items }: { items: AssetItem[] }) {
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((asset) => (
        <ComponentCard key={asset.id} asset={asset}>
          <ComponentPreview asset={asset} />
        </ComponentCard>
      ))}
    </div>
  );
}

function ComponentPreview({ asset }: { asset: AssetItem }) {
  if (asset.id === "comp-button") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          className="px-4 py-2 rounded-md text-sm font-medium"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-text-inverse)",
          }}
        >
          Primary
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium"
          style={{
            backgroundColor: "transparent",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border-default)",
          }}
        >
          Secondary
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium"
          style={{
            backgroundColor: "var(--color-error-300)",
            color: "white",
          }}
        >
          Danger
        </button>
      </div>
    );
  }
  if (asset.id === "comp-badge") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: "var(--color-accent-bg)",
            color: "var(--color-accent-text)",
          }}
        >
          Default
        </span>
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: "var(--color-success-bg)",
            color: "var(--color-success-text)",
          }}
        >
          Success
        </span>
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: "var(--color-warning-bg)",
            color: "var(--color-warning-text)",
          }}
        >
          Warning
        </span>
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: "var(--color-error-bg)",
            color: "var(--color-error-text)",
          }}
        >
          Error
        </span>
      </div>
    );
  }
  if (asset.id === "comp-card") {
    return (
      <div
        className="rounded-lg p-3"
        style={{
          backgroundColor: "var(--color-bg-tertiary)",
          border: "1px solid var(--color-border-default)",
        }}
      >
        <div
          className="text-sm font-medium mb-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          Card Title
        </div>
        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          Card content goes here. This is a preview of the Card component.
        </div>
      </div>
    );
  }
  return (
    <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
      Component preview
    </div>
  );
}

// ── Tokens Tab ───────────────────────────────────────────

function TokensTab({ items }: { items: AssetItem[] }) {
  // Group by category
  const groups = useMemo(() => {
    const map = new Map<AssetCategory, AssetItem[]>();
    for (const item of items) {
      const arr = map.get(item.category) || [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {groups.map(([cat, catItems]) => (
        <div key={cat}>
          <h3
            className="text-sm font-semibold mb-3 capitalize"
            style={{ color: "var(--color-text-primary)" }}
          >
            {cat}
          </h3>
          <div
            className="rounded-lg overflow-hidden"
            style={{
              border: "1px solid var(--ds-card-border)",
            }}
          >
            {catItems.map((asset, i) => (
              <div
                key={asset.id}
                className="flex items-center gap-4 px-4 py-2.5 text-sm"
                style={{
                  backgroundColor: "var(--ds-card-bg)",
                  borderTop: i > 0 ? "1px solid var(--ds-card-border)" : undefined,
                }}
              >
                <span
                  className="w-36 shrink-0 font-mono text-xs truncate"
                  style={{ color: "var(--color-accent-text)" }}
                >
                  {asset.id}
                </span>
                <span
                  className="flex-1 text-xs truncate"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {asset.name}
                </span>
                <span
                  className="w-60 shrink-0 font-mono text-[0.6875rem] truncate text-right"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {asset.copyValue}
                </span>
                <CopyButton value={asset.copyValue} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="shrink-0 p-1 rounded cursor-pointer transition-colors"
      style={{
        background: "none",
        border: "none",
        color: copied ? "var(--color-success-text)" : "var(--color-text-muted)",
      }}
      title="Copy"
    >
      {copied ? <LucideIcons.Check size={13} /> : <LucideIcons.Copy size={13} />}
    </button>
  );
}

// ── Spacing Tab ──────────────────────────────────────────

const SPACING_VALUES: Record<string, number> = {
  "space-1": 4,
  "space-2": 8,
  "space-4": 16,
  "space-6": 24,
  "space-8": 32,
};

function SpacingTab({ items }: { items: AssetItem[] }) {
  const spacingItems = items.filter((i) => i.id.startsWith("space-"));
  const radiusItems = items.filter((i) => i.id.startsWith("radius-"));

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {spacingItems.length > 0 && (
        <div>
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Spacing Scale
          </h3>
          <div className="space-y-3">
            {spacingItems.map((asset) => {
              const px = SPACING_VALUES[asset.id] ?? 16;
              return (
                <ComponentCard key={asset.id} asset={asset}>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 rounded"
                      style={{
                        width: `${px}px`,
                        minWidth: `${px}px`,
                        backgroundColor: "var(--color-accent)",
                        opacity: 0.7,
                      }}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {px}px
                    </span>
                  </div>
                </ComponentCard>
              );
            })}
          </div>
        </div>
      )}

      {radiusItems.length > 0 && (
        <div>
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Border Radius
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {radiusItems.map((asset) => {
              return (
                <ComponentCard key={asset.id} asset={asset}>
                  <div className="flex items-center justify-center">
                    <div
                      className="w-16 h-16"
                      style={{
                        borderRadius: asset.copyValue,
                        backgroundColor: "var(--color-accent-bg)",
                        border: "2px solid var(--color-accent)",
                      }}
                    />
                  </div>
                </ComponentCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Icons Tab ────────────────────────────────────────────

function IconsTab({ items }: { items: AssetItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
      {items.map((asset) => {
        // Extract icon name from id: "icon-search" -> "search"
        const iconName = asset.id.replace("icon-", "");
        return (
          <ComponentCard key={asset.id} asset={asset}>
            <div className="flex items-center justify-center">
              <IconPreview iconName={iconName} />
            </div>
          </ComponentCard>
        );
      })}
    </div>
  );
}
