export type AssetStatus = "dev-ready" | "in-progress" | "deprecated" | "draft";
export type AssetCategory =
  | "color"
  | "typography"
  | "component"
  | "token"
  | "spacing"
  | "icon"
  | "pattern";

export interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  copyValue: string;
  description: string;
  usage: string;
  doNots?: string[];
  codeExamples: { label: string; code: string }[];
  relatedIds?: string[];
  addedVersion?: string;
  updatedVersion?: string;
  deprecationNote?: string;
}

export const assetRegistry: AssetItem[] = [
  // ── Colors: Neutrals ──────────────────────────────────
  {
    id: "color-neutral-100",
    name: "Neutral 100",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-neutral-100)",
    description: "Darkest neutral shade. Used for card backgrounds and sidebar in dark theme.",
    usage: "Use as the primary surface color for cards and containers in dark mode.",
    doNots: ["Don't use for text — too dark to read on dark backgrounds."],
    codeExamples: [
      { label: "CSS Variable", code: "background-color: var(--color-neutral-100);" },
      { label: "Inline Style", code: 'style={{ backgroundColor: "var(--color-neutral-100)" }}' },
    ],
    relatedIds: ["color-neutral-200", "color-neutral-300"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-neutral-200",
    name: "Neutral 200",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-neutral-200)",
    description: "Secondary neutral. Used for elevated surfaces and hover states.",
    usage: "Apply to secondary containers, borders, or subtle dividers.",
    codeExamples: [
      { label: "CSS Variable", code: "background-color: var(--color-neutral-200);" },
    ],
    relatedIds: ["color-neutral-100", "color-neutral-300"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-neutral-300",
    name: "Neutral 300",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-neutral-300)",
    description: "Mid neutral. Primary border color and separator tone.",
    usage: "Use for borders, dividers, and subtle outlines.",
    codeExamples: [
      { label: "CSS Variable", code: "border-color: var(--color-neutral-300);" },
    ],
    relatedIds: ["color-neutral-200", "color-neutral-400"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-neutral-400",
    name: "Neutral 400",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-neutral-400)",
    description: "Muted text neutral. Used for placeholder text and disabled states.",
    usage: "Apply to secondary/muted text, icons, and disabled UI elements.",
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--color-neutral-400);" },
    ],
    relatedIds: ["color-neutral-300", "color-neutral-500"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-neutral-500",
    name: "Neutral 500",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-neutral-500)",
    description: "Lightest neutral in dark theme. Used for secondary body text.",
    usage: "Use for body text, secondary labels, and descriptions.",
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--color-neutral-500);" },
    ],
    relatedIds: ["color-neutral-400"],
    addedVersion: "1.0.0",
  },

  // ── Colors: Primary ───────────────────────────────────
  {
    id: "color-primary-300",
    name: "Primary 300",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-primary-300)",
    description: "Core brand color. Used for primary buttons and key interactive elements.",
    usage: "Use for primary call-to-action buttons, active states, and brand highlights.",
    doNots: ["Don't use for large background areas — too saturated.", "Don't pair with error red."],
    codeExamples: [
      { label: "CSS Variable", code: "background-color: var(--color-primary-300);" },
      { label: "Semantic Token", code: "color: var(--color-accent);" },
    ],
    relatedIds: ["color-primary-400", "color-primary-100"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-primary-400",
    name: "Primary 400",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-primary-400)",
    description: "Vibrant primary. Used for accent text and links in dark theme.",
    usage: "Use for links, accent text, and highlighted interactive elements.",
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--color-primary-400);" },
    ],
    relatedIds: ["color-primary-300", "color-primary-500"],
    addedVersion: "1.0.0",
  },

  // ── Colors: Semantic ──────────────────────────────────
  {
    id: "color-success-300",
    name: "Success Green",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-success-300)",
    description: "Success indicator. Used for positive states, confirmations, and dev-ready badges.",
    usage: "Apply to success messages, checkmarks, positive metrics, and approval indicators.",
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--color-success-text);" },
      { label: "Background", code: "background-color: var(--color-success-bg);" },
    ],
    relatedIds: ["color-success-400"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-warning-300",
    name: "Warning Amber",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-warning-300)",
    description: "Warning indicator. Used for caution states and in-progress badges.",
    usage: "Use for warning banners, in-progress indicators, and caution messages.",
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--color-warning-text);" },
    ],
    relatedIds: ["color-warning-400"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-error-300",
    name: "Error Red",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-error-300)",
    description: "Error indicator. Used for destructive actions and error states.",
    usage: "Use for error messages, destructive button backgrounds, and validation errors.",
    doNots: ["Don't use for non-error emphasis — use warning or primary instead."],
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--color-error-text);" },
    ],
    relatedIds: ["color-error-400"],
    addedVersion: "1.0.0",
  },
  {
    id: "color-bg-primary",
    name: "Background Primary",
    category: "color",
    status: "dev-ready",
    copyValue: "var(--color-bg-primary)",
    description: "Main page background. The darkest surface in dark theme, white in light.",
    usage: "Apply to the root page background and full-bleed sections.",
    codeExamples: [
      { label: "CSS Variable", code: "background-color: var(--color-bg-primary);" },
    ],
    relatedIds: ["color-bg-secondary", "color-bg-tertiary"],
    addedVersion: "1.0.0",
  },

  // ── Typography ────────────────────────────────────────
  {
    id: "type-heading-xl",
    name: "Heading XL",
    category: "typography",
    status: "dev-ready",
    copyValue: "font-size: 2.25rem; line-height: 1.2; font-weight: 700;",
    description: "Extra-large heading. Used for page titles and hero sections.",
    usage: "Use for top-level page headings. Only one per page.",
    doNots: ["Don't use more than one XL heading per view."],
    codeExamples: [
      { label: "CSS", code: "font-size: 2.25rem;\nline-height: 1.2;\nfont-weight: 700;\nfont-family: var(--font-sans);" },
      { label: "Tailwind", code: 'className="text-4xl font-bold leading-tight"' },
    ],
    relatedIds: ["type-heading-lg", "type-heading-md"],
    addedVersion: "1.0.0",
  },
  {
    id: "type-heading-lg",
    name: "Heading LG",
    category: "typography",
    status: "dev-ready",
    copyValue: "font-size: 1.5rem; line-height: 1.3; font-weight: 600;",
    description: "Large heading. Used for section titles within a page.",
    usage: "Use for major section headings. Pair with body text below.",
    codeExamples: [
      { label: "CSS", code: "font-size: 1.5rem;\nline-height: 1.3;\nfont-weight: 600;" },
      { label: "Tailwind", code: 'className="text-2xl font-semibold"' },
    ],
    relatedIds: ["type-heading-xl", "type-heading-md"],
    addedVersion: "1.0.0",
  },
  {
    id: "type-heading-md",
    name: "Heading MD",
    category: "typography",
    status: "dev-ready",
    copyValue: "font-size: 1.25rem; line-height: 1.4; font-weight: 600;",
    description: "Medium heading. Used for card titles and subsections.",
    usage: "Use for card headers, dialog titles, and secondary sections.",
    codeExamples: [
      { label: "CSS", code: "font-size: 1.25rem;\nline-height: 1.4;\nfont-weight: 600;" },
      { label: "Tailwind", code: 'className="text-xl font-semibold"' },
    ],
    relatedIds: ["type-heading-lg", "type-heading-sm"],
    addedVersion: "1.0.0",
  },
  {
    id: "type-heading-sm",
    name: "Heading SM",
    category: "typography",
    status: "dev-ready",
    copyValue: "font-size: 1rem; line-height: 1.5; font-weight: 600;",
    description: "Small heading. Used for labels, group headers, and compact titles.",
    usage: "Use for form labels, sidebar group titles, and compact card headers.",
    codeExamples: [
      { label: "CSS", code: "font-size: 1rem;\nline-height: 1.5;\nfont-weight: 600;" },
      { label: "Tailwind", code: 'className="text-base font-semibold"' },
    ],
    relatedIds: ["type-heading-md", "type-body"],
    addedVersion: "1.0.0",
  },
  {
    id: "type-body",
    name: "Body Text",
    category: "typography",
    status: "dev-ready",
    copyValue: "font-size: 0.875rem; line-height: 1.6; font-weight: 400;",
    description: "Standard body text. The default reading size for content.",
    usage: "Use for paragraphs, descriptions, and general content.",
    codeExamples: [
      { label: "CSS", code: "font-size: 0.875rem;\nline-height: 1.6;\nfont-weight: 400;\nfont-family: var(--font-sans);" },
      { label: "Tailwind", code: 'className="text-sm leading-relaxed"' },
    ],
    relatedIds: ["type-body-sm", "type-heading-sm"],
    addedVersion: "1.0.0",
  },
  {
    id: "type-body-sm",
    name: "Body Small",
    category: "typography",
    status: "dev-ready",
    copyValue: "font-size: 0.75rem; line-height: 1.5; font-weight: 400;",
    description: "Small body text. Used for captions, footnotes, and meta information.",
    usage: "Use for timestamps, helper text, and secondary labels.",
    codeExamples: [
      { label: "CSS", code: "font-size: 0.75rem;\nline-height: 1.5;\nfont-weight: 400;" },
      { label: "Tailwind", code: 'className="text-xs"' },
    ],
    relatedIds: ["type-body"],
    addedVersion: "1.0.0",
  },
  {
    id: "type-mono",
    name: "Monospace",
    category: "typography",
    status: "dev-ready",
    copyValue: "font-family: var(--font-mono);",
    description: "Monospace font for code, tokens, and technical content.",
    usage: "Use for inline code, code blocks, token names, and file paths.",
    codeExamples: [
      { label: "CSS", code: "font-family: var(--font-mono);\nfont-size: 0.8125rem;" },
      { label: "Tailwind", code: 'className="font-mono text-[0.8125rem]"' },
    ],
    relatedIds: ["type-body-sm"],
    addedVersion: "1.0.0",
  },

  // ── Components ────────────────────────────────────────
  {
    id: "comp-button",
    name: "Button",
    category: "component",
    status: "dev-ready",
    copyValue: '<button className="px-4 py-2 rounded-md bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-medium text-sm">Label</button>',
    description: "Primary interactive button component. Supports multiple variants.",
    usage: "Use for primary actions, form submissions, and CTAs. Choose variant based on hierarchy.",
    doNots: ["Don't use more than one primary button per section.", "Don't use for navigation — use links instead."],
    codeExamples: [
      { label: "Primary", code: '<button className="px-4 py-2 rounded-md bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-medium text-sm hover:opacity-90">\n  Save Changes\n</button>' },
      { label: "Secondary", code: '<button className="px-4 py-2 rounded-md border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-medium text-sm hover:bg-[var(--color-bg-hover)]">\n  Cancel\n</button>' },
      { label: "Danger", code: '<button className="px-4 py-2 rounded-md bg-[var(--color-error-300)] text-white font-medium text-sm">\n  Delete\n</button>' },
    ],
    relatedIds: ["comp-badge", "comp-card"],
    addedVersion: "1.0.0",
  },
  {
    id: "comp-badge",
    name: "Badge",
    category: "component",
    status: "dev-ready",
    copyValue: '<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent-bg)] text-[var(--color-accent-text)]">Badge</span>',
    description: "Small label component for status, counts, and categorization.",
    usage: "Use to indicate status, count, or category. Keep text short (1-2 words).",
    doNots: ["Don't use for long text.", "Don't nest badges inside other badges."],
    codeExamples: [
      { label: "Default", code: '<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent-bg)] text-[var(--color-accent-text)]">\n  New\n</span>' },
      { label: "Success", code: '<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-success-bg)] text-[var(--color-success-text)]">\n  Active\n</span>' },
    ],
    relatedIds: ["comp-button"],
    addedVersion: "1.0.0",
  },
  {
    id: "comp-card",
    name: "Card",
    category: "component",
    status: "in-progress",
    copyValue: '<div className="rounded-lg border border-[var(--ds-card-border)] bg-[var(--ds-card-bg)] p-4">Content</div>',
    description: "Container component for grouping related content with a subtle border.",
    usage: "Use to group related information. Cards can be nested but avoid more than 2 levels.",
    doNots: ["Don't nest more than 2 levels of cards."],
    codeExamples: [
      { label: "Basic Card", code: '<div className="rounded-lg border border-[var(--ds-card-border)] bg-[var(--ds-card-bg)] p-4">\n  <h3>Title</h3>\n  <p>Content here</p>\n</div>' },
    ],
    relatedIds: ["comp-button", "comp-badge"],
    addedVersion: "1.0.0",
    updatedVersion: "1.1.0",
  },

  // ── Spacing & Layout ──────────────────────────────────
  {
    id: "space-1",
    name: "Space 1 (4px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--space-1)",
    description: "Tightest spacing unit. Used for inline element gaps and icon padding.",
    usage: "Use between tightly packed inline elements, icon-to-text gaps.",
    codeExamples: [
      { label: "CSS", code: "gap: var(--space-1);" },
      { label: "Tailwind", code: 'className="gap-1"' },
    ],
    relatedIds: ["space-2", "space-3"],
    addedVersion: "1.0.0",
  },
  {
    id: "space-2",
    name: "Space 2 (8px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--space-2)",
    description: "Small spacing. Used for padding inside compact elements.",
    usage: "Use for inner padding of buttons, badges, and compact containers.",
    codeExamples: [
      { label: "CSS", code: "padding: var(--space-2);" },
      { label: "Tailwind", code: 'className="p-2"' },
    ],
    relatedIds: ["space-1", "space-3"],
    addedVersion: "1.0.0",
  },
  {
    id: "space-4",
    name: "Space 4 (16px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--space-4)",
    description: "Base spacing unit. Used for standard padding and gaps.",
    usage: "Use as the default padding for cards, sections, and layout gaps.",
    codeExamples: [
      { label: "CSS", code: "padding: var(--space-4);\ngap: var(--space-4);" },
      { label: "Tailwind", code: 'className="p-4 gap-4"' },
    ],
    relatedIds: ["space-2", "space-6"],
    addedVersion: "1.0.0",
  },
  {
    id: "space-6",
    name: "Space 6 (24px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--space-6)",
    description: "Medium spacing. Used for section padding and card gaps.",
    usage: "Use for spacing between cards, section padding, and dialog padding.",
    codeExamples: [
      { label: "CSS", code: "padding: var(--space-6);\nmargin-bottom: var(--space-6);" },
    ],
    relatedIds: ["space-4", "space-8"],
    addedVersion: "1.0.0",
  },
  {
    id: "space-8",
    name: "Space 8 (32px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--space-8)",
    description: "Large spacing. Used for major section breaks and page margins.",
    usage: "Use between major page sections and as outer page margins.",
    codeExamples: [
      { label: "CSS", code: "margin-top: var(--space-8);\npadding: var(--space-8);" },
    ],
    relatedIds: ["space-6", "space-12"],
    addedVersion: "1.0.0",
  },
  {
    id: "radius-md",
    name: "Radius MD (6px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--radius-md)",
    description: "Default border radius for buttons, inputs, and small cards.",
    usage: "Use as the standard radius for interactive elements and compact containers.",
    codeExamples: [
      { label: "CSS", code: "border-radius: var(--radius-md);" },
      { label: "Tailwind", code: 'className="rounded-md"' },
    ],
    relatedIds: ["radius-lg", "radius-sm"],
    addedVersion: "1.0.0",
  },
  {
    id: "radius-lg",
    name: "Radius LG (8px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--radius-lg)",
    description: "Larger radius for cards and containers.",
    usage: "Use for cards, dialogs, and larger container elements.",
    codeExamples: [
      { label: "CSS", code: "border-radius: var(--radius-lg);" },
      { label: "Tailwind", code: 'className="rounded-lg"' },
    ],
    relatedIds: ["radius-md", "radius-xl"],
    addedVersion: "1.0.0",
  },
  {
    id: "radius-sm",
    name: "Radius SM (4px)",
    category: "spacing",
    status: "dev-ready",
    copyValue: "var(--radius-sm)",
    description: "Small radius for badges and tight UI elements.",
    usage: "Use for badges, code blocks, and small inline elements.",
    codeExamples: [
      { label: "CSS", code: "border-radius: var(--radius-sm);" },
    ],
    relatedIds: ["radius-md"],
    addedVersion: "1.0.0",
  },

  // ── Icons ─────────────────────────────────────────────
  {
    id: "icon-search",
    name: "Search",
    category: "icon",
    status: "dev-ready",
    copyValue: 'import { Search } from "lucide-react";',
    description: "Search/magnifying glass icon. Used for search inputs and find actions.",
    usage: "Place inside search input fields or as a trigger for search functionality.",
    codeExamples: [
      { label: "Import", code: 'import { Search } from "lucide-react";' },
      { label: "Usage", code: "<Search size={16} />" },
    ],
    addedVersion: "1.0.0",
  },
  {
    id: "icon-copy",
    name: "Copy",
    category: "icon",
    status: "dev-ready",
    copyValue: 'import { Copy } from "lucide-react";',
    description: "Copy-to-clipboard icon. Used for code copy actions throughout the system.",
    usage: "Place next to copyable content. Show confirmation state after click.",
    codeExamples: [
      { label: "Import", code: 'import { Copy } from "lucide-react";' },
      { label: "Usage", code: "<Copy size={14} />" },
    ],
    addedVersion: "1.0.0",
  },
  {
    id: "icon-check",
    name: "Check",
    category: "icon",
    status: "dev-ready",
    copyValue: 'import { Check } from "lucide-react";',
    description: "Checkmark icon. Used for success states and confirmation feedback.",
    usage: "Use after successful actions (copy, save) and for selected/active states.",
    codeExamples: [
      { label: "Import", code: 'import { Check } from "lucide-react";' },
      { label: "Usage", code: "<Check size={14} />" },
    ],
    addedVersion: "1.0.0",
  },
  {
    id: "icon-sun",
    name: "Sun",
    category: "icon",
    status: "dev-ready",
    copyValue: 'import { Sun } from "lucide-react";',
    description: "Sun icon. Used for light theme toggle indicator.",
    usage: "Use in the theme toggle button to represent light mode.",
    codeExamples: [
      { label: "Import", code: 'import { Sun } from "lucide-react";' },
      { label: "Usage", code: "<Sun size={16} />" },
    ],
    relatedIds: ["icon-moon"],
    addedVersion: "1.0.0",
  },
  {
    id: "icon-moon",
    name: "Moon",
    category: "icon",
    status: "dev-ready",
    copyValue: 'import { Moon } from "lucide-react";',
    description: "Moon icon. Used for dark theme toggle indicator.",
    usage: "Use in the theme toggle button to represent dark mode.",
    codeExamples: [
      { label: "Import", code: 'import { Moon } from "lucide-react";' },
      { label: "Usage", code: "<Moon size={16} />" },
    ],
    relatedIds: ["icon-sun"],
    addedVersion: "1.0.0",
  },
  {
    id: "icon-chevron-down",
    name: "Chevron Down",
    category: "icon",
    status: "dev-ready",
    copyValue: 'import { ChevronDown } from "lucide-react";',
    description: "Downward chevron. Used for expandable sections and dropdowns.",
    usage: "Use as a disclosure indicator for collapsible panels and select menus.",
    codeExamples: [
      { label: "Import", code: 'import { ChevronDown } from "lucide-react";' },
      { label: "Rotatable", code: '<ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }} />' },
    ],
    addedVersion: "1.0.0",
  },
  {
    id: "icon-arrow-left",
    name: "Arrow Left",
    category: "icon",
    status: "dev-ready",
    copyValue: 'import { ArrowLeft } from "lucide-react";',
    description: "Left arrow. Used for back navigation and return actions.",
    usage: "Use in top navigation bars for back-to-home navigation.",
    codeExamples: [
      { label: "Import", code: 'import { ArrowLeft } from "lucide-react";' },
      { label: "Usage", code: "<ArrowLeft size={16} />" },
    ],
    addedVersion: "1.0.0",
  },
];

export function getAssetsByCategory(cat: AssetCategory): AssetItem[] {
  return assetRegistry.filter((a) => a.category === cat);
}

export function getAssetsByStatus(status: AssetStatus): AssetItem[] {
  return assetRegistry.filter((a) => a.status === status);
}

export function getAssetById(id: string): AssetItem | undefined {
  return assetRegistry.find((a) => a.id === id);
}
