import {
  Palette,
  Type,
  Component,
  Layers,
  Box,
  Grid3x3,
  CheckCircle2,
  Clock,
  BarChart3,
} from "lucide-react";
import { assetRegistry, type AssetCategory } from "../data/assetRegistry";

type StyleKitTab = "colors" | "typography" | "components" | "tokens" | "spacing" | "icons";

interface HomeProps {
  onNavigate: (tab: StyleKitTab) => void;
}

interface NavItem {
  tab: StyleKitTab;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: AssetCategory | AssetCategory[];
}

const navItems: NavItem[] = [
  {
    tab: "colors",
    label: "Colors",
    description: "Palette tokens, semantic colors, and swatches",
    icon: <Palette size={18} />,
    category: "color",
  },
  {
    tab: "typography",
    label: "Typography",
    description: "Font families, sizes, weights, and line heights",
    icon: <Type size={18} />,
    category: "typography",
  },
  {
    tab: "components",
    label: "Components",
    description: "UI component patterns with props and usage",
    icon: <Component size={18} />,
    category: "component",
  },
  {
    tab: "tokens",
    label: "Tokens",
    description: "Raw CSS custom properties reference",
    icon: <Layers size={18} />,
    category: "token",
  },
  {
    tab: "spacing",
    label: "Spacing & Layout",
    description: "Spacing scale, radii, and shadows",
    icon: <Box size={18} />,
    category: "spacing",
  },
  {
    tab: "icons",
    label: "Icons",
    description: "Lucide icon library with copy-import",
    icon: <Grid3x3 size={18} />,
    category: "icon",
  },
];

function getCount(cat: AssetCategory | AssetCategory[]): number {
  const cats = Array.isArray(cat) ? cat : [cat];
  return assetRegistry.filter((a) => cats.includes(a.category)).length;
}

export default function Home({ onNavigate }: HomeProps) {
  const totalAssets = assetRegistry.length;
  const readyCount = assetRegistry.filter((a) => a.status === "dev-ready").length;
  const readyPct = Math.round((readyCount / totalAssets) * 100);
  const inProgressCount = assetRegistry.filter((a) => a.status === "in-progress").length;

  return (
    <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 overflow-y-auto p-4 flex flex-col gap-6"
        style={{
          backgroundColor: "var(--ds-sidebar-bg)",
          borderRight: "1px solid var(--ds-card-border)",
        }}
      >
        {/* Brand */}
        <div className="px-1">
          <h1
            className="text-base font-bold tracking-tight m-0"
            style={{ color: "var(--color-text-primary)" }}
          >
            Design System Explorer
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
            Interactive token & component browser
          </p>
        </div>

        {/* Design System Section */}
        <div>
          <div
            className="text-[0.6875rem] font-semibold uppercase tracking-wider px-1 mb-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            Design System
          </div>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => onNavigate(item.tab)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left text-sm cursor-pointer transition-colors w-full"
                style={{
                  color: "var(--ds-sidebar-text)",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--ds-sidebar-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span style={{ color: "var(--ds-sidebar-active)" }}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                <span
                  className="text-[0.6875rem]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {getCount(item.category)}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Prototypes Section */}
        <div>
          <div
            className="text-[0.6875rem] font-semibold uppercase tracking-wider px-1 mb-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            Prototypes
          </div>
          <div
            className="px-2.5 py-3 rounded-md text-xs italic"
            style={{
              color: "var(--color-text-muted)",
              backgroundColor: "var(--ds-sidebar-hover)",
            }}
          >
            Coming Soon — prototype views will appear here.
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2
              className="text-2xl font-bold m-0 mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Welcome to the Design System
            </h2>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Browse tokens, components, and patterns. Every item is copyable, documented, and tagged with its development status.
            </p>
          </div>

          {/* Quick Stats */}
          <div
            className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-3"
            style={{ color: "var(--color-text-muted)" }}
          >
            Quick Stats
          </div>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "var(--ds-card-bg)",
                border: "1px solid var(--ds-card-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={15} style={{ color: "var(--color-accent)" }} />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Total Assets
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {totalAssets}
              </div>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "var(--ds-card-bg)",
                border: "1px solid var(--ds-card-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={15} style={{ color: "var(--color-success-text)" }} />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Dev Ready
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {readyPct}%
              </div>
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {readyCount} of {totalAssets} assets
              </div>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "var(--ds-card-bg)",
                border: "1px solid var(--ds-card-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock size={15} style={{ color: "var(--color-warning-text)" }} />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  In Progress
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {inProgressCount}
              </div>
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                currently being built
              </div>
            </div>
          </div>

          {/* Section cards */}
          <div
            className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-3"
            style={{ color: "var(--color-text-muted)" }}
          >
            Explore Sections
          </div>
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => onNavigate(item.tab)}
                className="rounded-lg p-4 text-left cursor-pointer transition-colors"
                style={{
                  backgroundColor: "var(--ds-card-bg)",
                  border: "1px solid var(--ds-card-border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--ds-card-hover-border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--ds-card-border)")
                }
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span style={{ color: "var(--color-accent)" }}>{item.icon}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="ml-auto text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--color-bg-tertiary)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {getCount(item.category)}
                  </span>
                </div>
                <p className="text-xs m-0" style={{ color: "var(--color-text-muted)" }}>
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
