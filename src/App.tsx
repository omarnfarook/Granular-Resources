import { useState, useEffect, useMemo } from "react";
import {
  Palette, Type, Grip, AlignJustify, Box,
  LayoutDashboard, PanelLeft, CreditCard,
  MessageSquareMore, Table2, FileInput, Search,
  Sun, Moon, ChevronLeft, ChevronRight, ChevronDown,
  Home, ArrowLeft, ArrowRight, ChevronDown as ChevDown, ChevronUp,
  Menu, X, ExternalLink, MoreHorizontal, Settings,
  Plus, Trash2, Edit, Copy, Download,
  Check, AlertCircle, Info, AlertTriangle, XCircle,
  File, FileText, Image, Link, Bookmark, Tag,
  Mail, MessageSquare, Bell, Send,
  Play, Pause, Volume2, Maximize, Minimize,
  Star, Heart, Eye, EyeOff, Lock, Unlock, Filter,
  RefreshCw, RotateCcw, Zap, Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getInitialTheme, applyTheme, toggleTheme, type Theme } from "./components/ThemeSync";
import {
  getAssetsByGroup,
  getReadyCount,
  getTotalCount,
  type AssetItem,
} from "./data/assetRegistry";
import { StatusBadge } from "./components/StatusBadge";
import { CopyButton } from "./components/CopyButton";
import { DocPanel } from "./components/DocPanel";
import { ComponentCard } from "./components/ComponentCard";
import { FormLayoutPattern } from "./patterns/FormLayout";

// ─── Types ─────────────────────────────────────────────────

type Page =
  | "colors" | "typography" | "icons" | "spacing" | "shadows" | "components"
  | "nav-bar" | "sidebar" | "card" | "modal" | "data-table" | "form-layout" | "search";

interface SidebarItem {
  id: Page;
  label: string;
  icon: LucideIcon;
  section: "design-system" | "patterns";
}

const sidebarItems: SidebarItem[] = [
  { id: "colors", label: "Colors", icon: Palette, section: "design-system" },
  { id: "typography", label: "Typography", icon: Type, section: "design-system" },
  { id: "icons", label: "Icons", icon: Grip, section: "design-system" },
  { id: "spacing", label: "Spacing & Layout", icon: AlignJustify, section: "design-system" },
  { id: "shadows", label: "Shadows", icon: Box, section: "design-system" },
  { id: "components", label: "Components", icon: LayoutDashboard, section: "design-system" },
  { id: "nav-bar", label: "Nav Bar", icon: Menu, section: "patterns" },
  { id: "sidebar", label: "Sidebar", icon: PanelLeft, section: "patterns" },
  { id: "card", label: "Card", icon: CreditCard, section: "patterns" },
  { id: "modal", label: "Modal / Dialog", icon: MessageSquareMore, section: "patterns" },
  { id: "data-table", label: "Data Table", icon: Table2, section: "patterns" },
  { id: "form-layout", label: "Form Layout", icon: FileInput, section: "patterns" },
  { id: "search", label: "Search", icon: Search, section: "patterns" },
];

const pageTitles: Record<Page, string> = {
  colors: "Colors",
  typography: "Typography",
  icons: "Icons",
  spacing: "Spacing & Layout",
  shadows: "Shadows",
  components: "Components",
  "nav-bar": "Nav Bar",
  sidebar: "Sidebar",
  card: "Card",
  modal: "Modal / Dialog",
  "data-table": "Data Table",
  "form-layout": "Form Layout",
  search: "Search",
};

const isPatternPage = (page: Page): boolean =>
  ["nav-bar", "sidebar", "card", "modal", "data-table", "form-layout", "search"].includes(page);

// Get the first asset for a given page to show status in topbar
function getPageAsset(page: Page): AssetItem | undefined {
  if (page === "components") return undefined;
  const groupMap: Record<string, string> = {
    colors: "colors", typography: "typography", icons: "icons",
    spacing: "spacing", shadows: "shadows",
    "nav-bar": "nav-bar", sidebar: "sidebar", card: "card",
    modal: "modal", "data-table": "data-table",
    "form-layout": "form-layout", search: "search",
  };
  const group = groupMap[page];
  if (!group) return undefined;
  const assets = getAssetsByGroup(group);
  return assets[0];
}

// ─── Icon Registry for Icons page ──────────────────────────

interface IconEntry {
  name: string;
  icon: LucideIcon;
  category: string;
}

const allIcons: IconEntry[] = [
  // Navigation
  { name: "Home", icon: Home, category: "Navigation" },
  { name: "ArrowLeft", icon: ArrowLeft, category: "Navigation" },
  { name: "ArrowRight", icon: ArrowRight, category: "Navigation" },
  { name: "ChevronDown", icon: ChevDown, category: "Navigation" },
  { name: "ChevronUp", icon: ChevronUp, category: "Navigation" },
  { name: "Menu", icon: Menu, category: "Navigation" },
  { name: "X", icon: X, category: "Navigation" },
  { name: "ExternalLink", icon: ExternalLink, category: "Navigation" },
  { name: "MoreHorizontal", icon: MoreHorizontal, category: "Navigation" },
  // Actions
  { name: "Plus", icon: Plus, category: "Actions" },
  { name: "Trash2", icon: Trash2, category: "Actions" },
  { name: "Edit", icon: Edit, category: "Actions" },
  { name: "Copy", icon: Copy, category: "Actions" },
  { name: "Download", icon: Download, category: "Actions" },
  { name: "Search", icon: Search, category: "Actions" },
  { name: "Settings", icon: Settings, category: "Actions" },
  { name: "Filter", icon: Filter, category: "Actions" },
  { name: "RefreshCw", icon: RefreshCw, category: "Actions" },
  { name: "RotateCcw", icon: RotateCcw, category: "Actions" },
  // Status
  { name: "Check", icon: Check, category: "Status" },
  { name: "AlertCircle", icon: AlertCircle, category: "Status" },
  { name: "Info", icon: Info, category: "Status" },
  { name: "AlertTriangle", icon: AlertTriangle, category: "Status" },
  { name: "XCircle", icon: XCircle, category: "Status" },
  // Content
  { name: "File", icon: File, category: "Content" },
  { name: "FileText", icon: FileText, category: "Content" },
  { name: "Image", icon: Image, category: "Content" },
  { name: "Link", icon: Link, category: "Content" },
  { name: "Bookmark", icon: Bookmark, category: "Content" },
  { name: "Tag", icon: Tag, category: "Content" },
  // Communication
  { name: "Mail", icon: Mail, category: "Communication" },
  { name: "MessageSquare", icon: MessageSquare, category: "Communication" },
  { name: "Bell", icon: Bell, category: "Communication" },
  { name: "Send", icon: Send, category: "Communication" },
  // Media
  { name: "Play", icon: Play, category: "Media" },
  { name: "Pause", icon: Pause, category: "Media" },
  { name: "Volume2", icon: Volume2, category: "Media" },
  { name: "Maximize", icon: Maximize, category: "Media" },
  { name: "Minimize", icon: Minimize, category: "Media" },
  // Extra
  { name: "Star", icon: Star, category: "Actions" },
  { name: "Heart", icon: Heart, category: "Actions" },
  { name: "Eye", icon: Eye, category: "Actions" },
  { name: "EyeOff", icon: EyeOff, category: "Actions" },
  { name: "Lock", icon: Lock, category: "Status" },
  { name: "Unlock", icon: Unlock, category: "Status" },
  { name: "Zap", icon: Zap, category: "Status" },
  { name: "Globe", icon: Globe, category: "Content" },
];

// ─── Foundation Page: Colors ───────────────────────────────

function ColorsPage({ onToggleDocs, docsOpenId }: ContentProps) {
  const assets = getAssetsByGroup("colors");
  const colorSwatches: Record<string, { label: string; value: string }[]> = {
    "color-primary": [
      { label: "50", value: "var(--indigo-50)" },
      { label: "200", value: "var(--indigo-200)" },
      { label: "300", value: "var(--indigo-300)" },
      { label: "400", value: "var(--indigo-400)" },
      { label: "500", value: "var(--indigo-500)" },
      { label: "600", value: "var(--indigo-600)" },
      { label: "800", value: "var(--indigo-800)" },
      { label: "900", value: "var(--indigo-900)" },
    ],
    "color-secondary": [
      { label: "50", value: "var(--lime-50)" },
      { label: "200", value: "var(--lime-200)" },
      { label: "300", value: "var(--lime-300)" },
      { label: "400", value: "var(--lime-400)" },
      { label: "500", value: "var(--lime-500)" },
      { label: "600", value: "var(--lime-600)" },
      { label: "800", value: "var(--lime-800)" },
      { label: "900", value: "var(--lime-900)" },
    ],
    "color-neutral": [
      { label: "Primary", value: "#161819" },
      { label: "Secondary", value: "#252627" },
      { label: "Tertiary", value: "#111112" },
      { label: "Border", value: "#323232" },
    ],
    "color-extended": [
      { label: "NG-50", value: "var(--neutral-50)" },
      { label: "NG-300", value: "var(--neutral-300)" },
      { label: "NG-500", value: "var(--neutral-500)" },
      { label: "CG-50", value: "var(--coolgrey-50)" },
      { label: "CG-300", value: "var(--coolgrey-300)" },
      { label: "CG-500", value: "var(--coolgrey-500)" },
    ],
    "color-semantic": [
      { label: "Success", value: "var(--green-400)" },
      { label: "Warning", value: "var(--orange-300)" },
      { label: "Error", value: "var(--coral-400)" },
      { label: "Info", value: "var(--teal-400)" },
    ],
  };

  // Gradient preview for the gradients card
  const gradientPreview = (
    <div style={{ display: "flex", gap: 6 }}>
      <div style={{ width: 56, height: 40, borderRadius: 6, background: "linear-gradient(90deg, var(--indigo-800), var(--indigo-500), var(--teal-600), var(--lime-500))" }} />
      <div style={{ width: 56, height: 40, borderRadius: 6, background: "linear-gradient(135deg, rgba(98,69,242,0.05) 50%, rgba(98,69,242,0.20) 100%)", border: "1px solid var(--color-border)" }} />
      <div style={{ width: 56, height: 40, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,131,120,0.10) 50%, rgba(255,131,120,0.30) 100%)", border: "1px solid var(--color-border)" }} />
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, padding: 20 }}>
      {assets.map((asset) => (
        <ComponentCard
          key={asset.id}
          asset={asset}
          docsOpen={docsOpenId === asset.id}
          onToggleDocs={onToggleDocs}
          preview={
            asset.id === "color-gradients" ? gradientPreview : (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(colorSwatches[asset.id] ?? []).map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                        background: s.value,
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )
          }
        />
      ))}
    </div>
  );
}

// ─── Foundation Page: Typography ───────────────────────────

function TypographyPage({ onToggleDocs, docsOpenId }: ContentProps) {
  const assets = getAssetsByGroup("typography");

  const previews: Record<string, React.ReactNode> = {
    "type-heading": (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: "var(--text-3xl)", fontWeight: 700, lineHeight: "var(--leading-tight)", color: "var(--color-text)" }}>Heading 1</div>
        <div style={{ fontSize: "var(--text-2xl)", fontWeight: 600, lineHeight: "var(--leading-tight)", color: "var(--color-text)" }}>Heading 2</div>
        <div style={{ fontSize: "var(--text-xl)", fontWeight: 600, lineHeight: "var(--leading-tight)", color: "var(--color-text)" }}>Heading 3</div>
      </div>
    ),
    "type-body": (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--color-text)", margin: 0 }}>
          Body text at 16px — the quick brown fox jumps over the lazy dog.
        </p>
        <p style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--color-text-secondary)", margin: 0 }}>
          Small text at 14px — secondary content and descriptions.
        </p>
      </div>
    ),
    "type-mono": (
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text)", background: "var(--color-bg)", padding: 8, borderRadius: 4 }}>
        const x = 42;<br />
        console.log(x);
      </div>
    ),
    "type-scale": (
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {[
          { size: "var(--text-xs)", label: "xs · 12px" },
          { size: "var(--text-sm)", label: "sm · 14px" },
          { size: "var(--text-base)", label: "base · 16px" },
          { size: "var(--text-lg)", label: "lg · 18px" },
          { size: "var(--text-xl)", label: "xl · 20px" },
          { size: "var(--text-2xl)", label: "2xl · 24px" },
        ].map((t) => (
          <div key={t.label} style={{ fontSize: t.size, color: "var(--color-text)", lineHeight: 1.4 }}>
            {t.label}
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, padding: 20 }}>
      {assets.map((asset) => (
        <ComponentCard
          key={asset.id}
          asset={asset}
          docsOpen={docsOpenId === asset.id}
          onToggleDocs={onToggleDocs}
          preview={previews[asset.id] ?? <div style={{ color: "var(--color-text-muted)" }}>Preview</div>}
        />
      ))}
    </div>
  );
}

// ─── Foundation Page: Icons ────────────────────────────────

function IconsPage({ onToggleDocs, docsOpenId }: ContentProps) {
  const assets = getAssetsByGroup("icons");
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const iconSizes = [12, 14, 16, 18, 20, 24, 32, 40];
  const sizeUsage: Record<number, string> = {
    12: "badge icons, inline indicators",
    14: "sidebar nav, dropdown menus, compact buttons",
    16: "alongside body text, form field icons",
    18: "standard button icons, tab icons",
    20: "primary buttons, toolbar icons (DEFAULT)",
    24: "nav bar icons, section headers",
    32: "empty states, feature callouts",
    40: "landing page features, splash screens",
  };

  const categories = ["All", ...Array.from(new Set(allIcons.map((i) => i.category)))];

  const filteredIcons = allIcons.filter((icon) => {
    const matchesText = !filter || icon.name.toLowerCase().includes(filter.toLowerCase());
    const matchesCat = categoryFilter === "All" || icon.category === categoryFilter;
    return matchesText && matchesCat;
  });

  return (
    <div style={{ padding: 20 }}>
      {/* Size Scale — always show the first asset card */}
      {assets.length > 0 && (
        <ComponentCard
          asset={assets[0]}
          docsOpen={docsOpenId === assets[0].id}
          onToggleDocs={onToggleDocs}
          preview={
            <div>
              <div style={{ display: "flex", alignItems: "end", gap: 16, marginBottom: 12 }}>
                {iconSizes.map((size) => (
                  <div key={size} style={{ textAlign: "center" }}>
                    <Star size={size} style={{ color: "var(--color-text)" }} />
                    <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 4 }}>{size}px</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 12px", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                {iconSizes.map((size) => (
                  <div key={size} style={{ display: "contents" }}>
                    <span style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>{size}px</span>
                    <span>{sizeUsage[size]}</span>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      )}

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, margin: "16px 0", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
          <input
            type="text"
            placeholder="Filter icons..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              paddingLeft: 28,
              padding: "6px 8px 6px 28px",
              fontSize: "var(--text-sm)",
              border: "1px solid var(--color-border)",
              borderRadius: 6,
              background: "var(--color-bg)",
              color: "var(--color-text)",
              outline: "none",
              width: 200,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: "4px 10px",
                fontSize: "var(--text-xs)",
                borderRadius: 4,
                border: "1px solid var(--color-border)",
                background: categoryFilter === cat ? "var(--color-primary)" : "transparent",
                color: categoryFilter === cat ? "#fff" : "var(--color-text-secondary)",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Icon grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8 }}>
        {filteredIcons.map((entry) => {
          const Icon = entry.icon;
          return (
            <div
              key={entry.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: 12,
                borderRadius: 6,
                border: "1px dashed var(--ds-card-border)",
                background: "var(--ds-card-bg)",
                opacity: 0.7,
              }}
            >
              <Icon size={20} style={{ color: "var(--color-text)" }} />
              <span style={{ fontSize: 10, color: "var(--color-text-muted)", textAlign: "center", wordBreak: "break-all" }}>
                {entry.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Foundation Page: Spacing ──────────────────────────────

function SpacingPage({ onToggleDocs, docsOpenId }: ContentProps) {
  const assets = getAssetsByGroup("spacing");
  const spacingValues = [
    { token: "--space-0", px: 0 },
    { token: "--space-1", px: 4 },
    { token: "--space-2", px: 8 },
    { token: "--space-3", px: 12 },
    { token: "--space-4", px: 16 },
    { token: "--space-5", px: 20 },
    { token: "--space-6", px: 24 },
    { token: "--space-8", px: 32 },
    { token: "--space-10", px: 40 },
    { token: "--space-12", px: 48 },
    { token: "--space-16", px: 64 },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, padding: 20 }}>
      {assets.map((asset) => (
        <ComponentCard
          key={asset.id}
          asset={asset}
          docsOpen={docsOpenId === asset.id}
          onToggleDocs={onToggleDocs}
          preview={
            asset.id === "spacing-scale" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {spacingValues.map((s) => (
                  <div key={s.token} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, color: "var(--color-text-muted)", width: 60, textAlign: "right", flexShrink: 0 }}>
                      {s.token.replace("--space-", "")} · {s.px}px
                    </span>
                    <div
                      style={{
                        height: 8,
                        width: s.px || 2,
                        background: "var(--color-primary)",
                        borderRadius: 2,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[4, 8, 16, 24, 32].map((px) => (
                  <div
                    key={px}
                    style={{
                      width: px + 16,
                      height: px + 16,
                      border: "1px dashed var(--color-border)",
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {px}
                  </div>
                ))}
              </div>
            )
          }
        />
      ))}
    </div>
  );
}

// ─── Foundation Page: Shadows ──────────────────────────────

function ShadowsPage({ onToggleDocs, docsOpenId }: ContentProps) {
  const assets = getAssetsByGroup("shadows");
  const shadowVars: Record<string, string> = {
    "shadow-xs": "var(--shadow-xs)",
    "shadow-sm": "var(--shadow-sm)",
    "shadow-md": "var(--shadow-md)",
    "shadow-lg": "var(--shadow-lg)",
    "shadow-xl": "var(--shadow-xl)",
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, padding: 20 }}>
      {assets.map((asset) => (
        <ComponentCard
          key={asset.id}
          asset={asset}
          docsOpen={docsOpenId === asset.id}
          onToggleDocs={onToggleDocs}
          preview={
            <div style={{ display: "flex", justifyContent: "center", padding: 16 }}>
              <div
                style={{
                  width: 80,
                  height: 50,
                  borderRadius: 8,
                  background: "var(--color-bg-raised)",
                  boxShadow: shadowVars[asset.id],
                  border: "1px solid var(--color-border-subtle)",
                }}
              />
            </div>
          }
        />
      ))}
    </div>
  );
}

// ─── Components Page ───────────────────────────────────────

function ComponentsPage({ onToggleDocs, docsOpenId }: ContentProps) {
  const sections: { title: string; group: string }[] = [
    { title: "Buttons & Actions", group: "buttons-actions" },
    { title: "Inputs & Forms", group: "inputs-forms" },
    { title: "Feedback", group: "feedback" },
    { title: "Data Display", group: "data-display" },
  ];

  const placeholderPreview = (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: 60, color: "var(--color-text-muted)", fontSize: "var(--text-sm)",
      border: "1px dashed var(--color-border)", borderRadius: 6,
    }}>
      Component preview
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      {sections.map((section) => {
        const assets = getAssetsByGroup(section.group);
        return (
          <div key={section.group} style={{ marginBottom: 32 }}>
            <h3 style={{
              fontSize: "var(--text-lg)", fontWeight: 600,
              color: "var(--color-text)", margin: "0 0 12px",
              borderBottom: "1px solid var(--color-border-subtle)",
              paddingBottom: 8,
            }}>
              {section.title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
              {assets.map((asset) => (
                <ComponentCard
                  key={asset.id}
                  asset={asset}
                  docsOpen={docsOpenId === asset.id}
                  onToggleDocs={onToggleDocs}
                  preview={placeholderPreview}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Pattern Placeholder ───────────────────────────────────

function PatternPlaceholder({ page }: { page: Page }) {
  const title = pageTitles[page];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      width: "100%",
      maxWidth: 480,
    }}>
      {/* Wireframe sketch */}
      <div style={{
        width: "100%",
        padding: 24,
        border: "2px dashed var(--color-border)",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {/* Wireframe header */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: "var(--color-surface)", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 10, borderRadius: 3, background: "var(--color-surface)", marginBottom: 6, width: "60%" }} />
            <div style={{ height: 8, borderRadius: 3, background: "var(--color-surface)", width: "40%" }} />
          </div>
        </div>
        {/* Wireframe body lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ height: 8, borderRadius: 3, background: "var(--color-surface)", width: "100%" }} />
          <div style={{ height: 8, borderRadius: 3, background: "var(--color-surface)", width: "85%" }} />
          <div style={{ height: 8, borderRadius: 3, background: "var(--color-surface)", width: "70%" }} />
        </div>
        {/* Wireframe footer */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <div style={{ width: 64, height: 28, borderRadius: 6, background: "var(--color-surface)" }} />
          <div style={{ width: 64, height: 28, borderRadius: 6, background: "var(--color-surface)" }} />
        </div>
      </div>

      <div style={{
        fontSize: "var(--text-sm)",
        color: "var(--color-text-muted)",
        textAlign: "center",
      }}>
        <span style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>{title}</span>
        <br />
        Not yet built — describe this pattern to start
      </div>
    </div>
  );
}

// ─── Content Dispatcher ────────────────────────────────────

interface ContentProps {
  onToggleDocs: (id: string) => void;
  docsOpenId: string | null;
}

// Map of built pattern components
const patternComponents: Partial<Record<Page, React.ReactNode>> = {
  "form-layout": <FormLayoutPattern />,
};

function ContentArea({ page, onToggleDocs, docsOpenId }: ContentProps & { page: Page }) {
  if (isPatternPage(page)) {
    const builtPattern = patternComponents[page];
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 0%",
        minHeight: 0,
        overflow: "auto",
      }}>
        {builtPattern ?? <PatternPlaceholder page={page} />}
      </div>
    );
  }

  const pages: Record<string, React.ReactNode> = {
    colors: <ColorsPage onToggleDocs={onToggleDocs} docsOpenId={docsOpenId} />,
    typography: <TypographyPage onToggleDocs={onToggleDocs} docsOpenId={docsOpenId} />,
    icons: <IconsPage onToggleDocs={onToggleDocs} docsOpenId={docsOpenId} />,
    spacing: <SpacingPage onToggleDocs={onToggleDocs} docsOpenId={docsOpenId} />,
    shadows: <ShadowsPage onToggleDocs={onToggleDocs} docsOpenId={docsOpenId} />,
    components: <ComponentsPage onToggleDocs={onToggleDocs} docsOpenId={docsOpenId} />,
  };

  return (
    <div style={{ flex: "1 1 0%", minHeight: 0, overflow: "auto" }}>
      {pages[page]}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [page, setPage] = useState<Page>("colors");
  const [collapsed, setCollapsed] = useState(false);
  const [docsOpenId, setDocsOpenId] = useState<string | null>(null);
  const [topBarDocsOpen, setTopBarDocsOpen] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => setTheme(toggleTheme(theme));

  const handleToggleDocs = (id: string) => {
    setDocsOpenId((prev) => (prev === id ? null : id));
  };

  const pageAsset = useMemo(() => getPageAsset(page), [page]);

  const readyCount = getReadyCount();
  const totalCount = getTotalCount();
  const readyPercent = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

  const dsItems = sidebarItems.filter((i) => i.section === "design-system");
  const patternItems = sidebarItems.filter((i) => i.section === "patterns");

  // Get status for sidebar dot
  const getItemStatus = (id: Page) => {
    const assets = getAssetsByGroup(id === "components" ? "buttons-actions" : id);
    if (assets.length === 0) return "draft" as const;
    return assets[0].status;
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: collapsed ? 48 : 220,
          flexShrink: 0,
          background: "var(--ds-sidebar-bg)",
          borderRight: "1px solid var(--ds-sidebar-border)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 200ms ease",
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: collapsed ? "12px 8px" : "12px 16px",
            borderBottom: "1px solid var(--ds-sidebar-border)",
            justifyContent: collapsed ? "center" : "flex-start",
            flexShrink: 0,
          }}
        >
          {!collapsed && (
            <>
              <LayoutDashboard size={18} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--color-text)", whiteSpace: "nowrap" }}>
                ACME DS
              </span>
            </>
          )}
          <button
            onClick={handleToggleTheme}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            style={{
              marginLeft: collapsed ? 0 : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              border: "none",
              borderRadius: 6,
              background: "transparent",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              flexShrink: 0,
              padding: 0,
            }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Sidebar content */}
        <div style={{ flex: 1, overflow: "auto", padding: collapsed ? "8px 4px" : "8px" }}>
          {/* Design System section */}
          {!collapsed && (
            <div style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.05em", color: "var(--color-text-muted)",
              padding: "8px 8px 4px", whiteSpace: "nowrap",
            }}>
              Design System
            </div>
          )}
          {dsItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            const status = getItemStatus(item.id);
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: collapsed ? "8px 0" : "6px 8px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  border: "none",
                  borderRadius: 6,
                  background: active ? "var(--color-surface)" : "transparent",
                  color: active ? "var(--color-primary-text)" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontSize: "var(--text-sm)",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{item.label}</span>
                    <StatusBadge status={status} compact />
                  </>
                )}
              </button>
            );
          })}

          {/* Patterns section */}
          {!collapsed && (
            <div style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.05em", color: "var(--color-text-muted)",
              padding: "16px 8px 4px", whiteSpace: "nowrap",
              borderTop: "1px solid var(--ds-sidebar-border)",
              marginTop: 8,
            }}>
              Patterns
            </div>
          )}
          {collapsed && <div style={{ borderTop: "1px solid var(--ds-sidebar-border)", margin: "8px 0" }} />}
          {patternItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            const status = getItemStatus(item.id);
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: collapsed ? "8px 0" : "6px 8px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  border: "none",
                  borderRadius: 6,
                  background: active ? "var(--color-surface)" : "transparent",
                  color: active ? "var(--color-primary-text)" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontSize: "var(--text-sm)",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{item.label}</span>
                    <StatusBadge status={status} compact />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar footer */}
        <div style={{
          borderTop: "1px solid var(--ds-sidebar-border)",
          padding: collapsed ? "8px 4px" : "8px 12px",
          flexShrink: 0,
        }}>
          {!collapsed && (
            <div style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              marginBottom: 6,
            }}>
              {readyCount} assets · {readyPercent}% ready
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: 6,
              width: "100%",
              padding: "4px 0",
              border: "none",
              background: "transparent",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              fontSize: "var(--text-xs)",
            }}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            {!collapsed && "Collapse"}
          </button>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden", height: "100%" }}>
        {/* Top Bar — always full width, never constrained */}
        <div
          style={{
            width: "100%",
            height: "var(--ds-topbar-height)",
            minHeight: "var(--ds-topbar-height)",
            flexShrink: 0,
            background: "var(--ds-topbar-bg)",
            borderBottom: "1px solid var(--ds-topbar-border)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--color-text)", whiteSpace: "nowrap" }}>
            {pageTitles[page]}
          </span>
          {pageAsset && <StatusBadge status={pageAsset.status} />}
          <div style={{ flex: 1 }} />
          {pageAsset && <CopyButton value={pageAsset.copyValue} />}
          <button
            onClick={() => setTopBarDocsOpen(!topBarDocsOpen)}
            title="Toggle documentation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              border: `1px solid ${topBarDocsOpen ? "var(--color-primary)" : "var(--color-border)"}`,
              borderRadius: 6,
              background: topBarDocsOpen ? "var(--color-primary)" : "transparent",
              color: topBarDocsOpen ? "#fff" : "var(--color-text-secondary)",
              cursor: "pointer",
              fontSize: "var(--text-xs)",
              flexShrink: 0,
            }}
          >
            <FileText size={12} />
            Docs
            <ChevronDown size={12} style={{ transform: topBarDocsOpen ? "rotate(180deg)" : "none", transition: "transform 150ms" }} />
          </button>
        </div>

        {/* Doc Panel (collapsible) */}
        {topBarDocsOpen && pageAsset && (
          <DocPanel asset={pageAsset} open={topBarDocsOpen} />
        )}

        {/* Content Area */}
        <ContentArea page={page} onToggleDocs={handleToggleDocs} docsOpenId={docsOpenId} />
      </div>
    </div>
  );
}
