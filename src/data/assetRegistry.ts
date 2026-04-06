export type AssetStatus = "dev-ready" | "in-progress" | "deprecated" | "draft";
export type AssetCategory = "foundation" | "component" | "pattern";
export type FoundationGroup = "colors" | "typography" | "icons" | "spacing" | "shadows";
export type ComponentGroup = "buttons-actions" | "inputs-forms" | "feedback" | "data-display";
export type PatternGroup = "nav-bar" | "sidebar" | "card" | "modal" | "data-table" | "form-layout" | "search";

export interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  group: FoundationGroup | ComponentGroup | PatternGroup;
  status: AssetStatus;
  placeholder: boolean;
  copyValue: string;
  description: string;
  usage: string;
  doNots?: string[];
  codeExamples: { label: string; code: string }[];
  relatedIds?: string[];
}

// ─── Foundation: Colors ────────────────────────────────────

const colorAssets: AssetItem[] = [
  {
    id: "color-primary",
    name: "Primary",
    category: "foundation",
    group: "colors",
    status: "draft",
    placeholder: true,
    copyValue: "var(--color-primary)",
    description: "Primary brand color used for key actions and focus states.",
    usage: "Buttons, links, active indicators, focus rings.",
    doNots: ["Don't use for large background areas", "Don't use for body text"],
    codeExamples: [{ label: "CSS Variable", code: "color: var(--color-primary);" }],
  },
  {
    id: "color-neutral",
    name: "Neutral",
    category: "foundation",
    group: "colors",
    status: "draft",
    placeholder: true,
    copyValue: "var(--neutral-500)",
    description: "Neutral gray scale for backgrounds, borders, and secondary text.",
    usage: "Backgrounds, borders, muted text, dividers.",
    codeExamples: [{ label: "CSS Variable", code: "background: var(--color-surface);" }],
  },
  {
    id: "color-success",
    name: "Success",
    category: "foundation",
    group: "colors",
    status: "draft",
    placeholder: true,
    copyValue: "var(--color-success-text)",
    description: "Indicates successful operations or positive states.",
    usage: "Success messages, valid inputs, completion indicators.",
    doNots: ["Don't use as the only indicator — pair with text/icons"],
    codeExamples: [{ label: "CSS Variable", code: "color: var(--color-success-text);" }],
  },
  {
    id: "color-warning",
    name: "Warning",
    category: "foundation",
    group: "colors",
    status: "draft",
    placeholder: true,
    copyValue: "var(--color-warning-text)",
    description: "Indicates caution or non-critical issues.",
    usage: "Warning banners, pending states, attention-needed indicators.",
    codeExamples: [{ label: "CSS Variable", code: "color: var(--color-warning-text);" }],
  },
  {
    id: "color-error",
    name: "Error",
    category: "foundation",
    group: "colors",
    status: "draft",
    placeholder: true,
    copyValue: "var(--color-error-text)",
    description: "Indicates errors or destructive actions.",
    usage: "Error messages, invalid inputs, destructive buttons.",
    codeExamples: [{ label: "CSS Variable", code: "color: var(--color-error-text);" }],
  },
  {
    id: "color-semantic-bg",
    name: "Backgrounds",
    category: "foundation",
    group: "colors",
    status: "draft",
    placeholder: true,
    copyValue: "var(--color-bg)",
    description: "Background color tokens for surfaces and layers.",
    usage: "Page background, cards, overlays, raised surfaces.",
    codeExamples: [
      { label: "Base", code: "background: var(--color-bg);" },
      { label: "Raised", code: "background: var(--color-bg-raised);" },
    ],
  },
];

// ─── Foundation: Typography ────────────────────────────────

const typographyAssets: AssetItem[] = [
  {
    id: "type-heading",
    name: "Headings",
    category: "foundation",
    group: "typography",
    status: "draft",
    placeholder: true,
    copyValue: "font-family: var(--font-sans);",
    description: "Heading styles from H1 to H4.",
    usage: "Page titles, section headings, card titles.",
    doNots: ["Don't skip heading levels", "Don't use for body text styling"],
    codeExamples: [
      { label: "H1", code: "font-size: var(--text-4xl); font-weight: 700; line-height: var(--leading-tight);" },
      { label: "H2", code: "font-size: var(--text-3xl); font-weight: 600; line-height: var(--leading-tight);" },
    ],
  },
  {
    id: "type-body",
    name: "Body Text",
    category: "foundation",
    group: "typography",
    status: "draft",
    placeholder: true,
    copyValue: "font-size: var(--text-base);",
    description: "Body text styles for paragraphs and general content.",
    usage: "Paragraphs, descriptions, list items.",
    codeExamples: [
      { label: "Base", code: "font-size: var(--text-base); line-height: var(--leading-normal);" },
      { label: "Small", code: "font-size: var(--text-sm); line-height: var(--leading-normal);" },
    ],
  },
  {
    id: "type-mono",
    name: "Monospace",
    category: "foundation",
    group: "typography",
    status: "draft",
    placeholder: true,
    copyValue: "font-family: var(--font-mono);",
    description: "Monospace font for code, data, and technical content.",
    usage: "Code blocks, inline code, data tables with fixed-width data.",
    codeExamples: [{ label: "Usage", code: "font-family: var(--font-mono);" }],
  },
  {
    id: "type-scale",
    name: "Type Scale",
    category: "foundation",
    group: "typography",
    status: "draft",
    placeholder: true,
    copyValue: "--text-base: 16px;",
    description: "The full type size scale from xs to 4xl.",
    usage: "Reference for choosing appropriate text sizes.",
    codeExamples: [
      { label: "Scale", code: "--text-xs: 12px;\n--text-sm: 14px;\n--text-base: 16px;\n--text-lg: 18px;\n--text-xl: 20px;\n--text-2xl: 24px;\n--text-3xl: 30px;\n--text-4xl: 36px;" },
    ],
  },
];

// ─── Foundation: Icons ─────────────────────────────────────

const iconAssets: AssetItem[] = [
  {
    id: "icon-size-scale",
    name: "Icon Size Scale",
    category: "foundation",
    group: "icons",
    status: "draft",
    placeholder: true,
    copyValue: '<Star size={20} />',
    description: "Standard icon sizes from 12px to 40px.",
    usage: "Use the size guide to pick the right icon size for each context.",
    codeExamples: [
      { label: "Default (20px)", code: 'import { Star } from "lucide-react";\n<Star size={20} />' },
      { label: "Small (14px)", code: '<Star size={14} />' },
    ],
  },
  {
    id: "icon-navigation",
    name: "Navigation Icons",
    category: "foundation",
    group: "icons",
    status: "draft",
    placeholder: true,
    copyValue: 'import { Home } from "lucide-react";',
    description: "Icons used for navigation and wayfinding.",
    usage: "Sidebars, breadcrumbs, menus, back/forward actions.",
    codeExamples: [{ label: "Import", code: 'import { Home, ArrowLeft, ChevronDown, Menu, X } from "lucide-react";' }],
  },
  {
    id: "icon-actions",
    name: "Action Icons",
    category: "foundation",
    group: "icons",
    status: "draft",
    placeholder: true,
    copyValue: 'import { Plus } from "lucide-react";',
    description: "Icons for user actions and operations.",
    usage: "Toolbar buttons, action menus, inline actions.",
    codeExamples: [{ label: "Import", code: 'import { Plus, Trash2, Edit, Copy, Download, Search } from "lucide-react";' }],
  },
  {
    id: "icon-status",
    name: "Status Icons",
    category: "foundation",
    group: "icons",
    status: "draft",
    placeholder: true,
    copyValue: 'import { Check } from "lucide-react";',
    description: "Icons indicating state or feedback.",
    usage: "Alerts, toasts, validation messages, status indicators.",
    codeExamples: [{ label: "Import", code: 'import { Check, AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react";' }],
  },
  {
    id: "icon-content",
    name: "Content Icons",
    category: "foundation",
    group: "icons",
    status: "draft",
    placeholder: true,
    copyValue: 'import { File } from "lucide-react";',
    description: "Icons for content types and objects.",
    usage: "File lists, content type indicators, media references.",
    codeExamples: [{ label: "Import", code: 'import { File, FileText, Image, Link, Bookmark, Tag } from "lucide-react";' }],
  },
  {
    id: "icon-communication",
    name: "Communication Icons",
    category: "foundation",
    group: "icons",
    status: "draft",
    placeholder: true,
    copyValue: 'import { Mail } from "lucide-react";',
    description: "Icons for messaging and communication features.",
    usage: "Inbox, notifications, chat, messaging interfaces.",
    codeExamples: [{ label: "Import", code: 'import { Mail, MessageSquare, Bell, Send } from "lucide-react";' }],
  },
  {
    id: "icon-media",
    name: "Media Icons",
    category: "foundation",
    group: "icons",
    status: "draft",
    placeholder: true,
    copyValue: 'import { Play } from "lucide-react";',
    description: "Icons for media controls and display.",
    usage: "Video players, audio controls, fullscreen toggles.",
    codeExamples: [{ label: "Import", code: 'import { Play, Pause, Volume2, Maximize, Minimize } from "lucide-react";' }],
  },
];

// ─── Foundation: Spacing ───────────────────────────────────

const spacingAssets: AssetItem[] = [
  {
    id: "spacing-scale",
    name: "Spacing Scale",
    category: "foundation",
    group: "spacing",
    status: "draft",
    placeholder: true,
    copyValue: "var(--space-4)",
    description: "Base spacing scale from 0 to 64px.",
    usage: "Margins, padding, gaps between elements.",
    doNots: ["Don't use arbitrary pixel values — stick to the scale"],
    codeExamples: [
      { label: "Padding", code: "padding: var(--space-4);" },
      { label: "Gap", code: "gap: var(--space-3);" },
    ],
  },
  {
    id: "spacing-layout",
    name: "Layout Spacing",
    category: "foundation",
    group: "spacing",
    status: "draft",
    placeholder: true,
    copyValue: "var(--space-8)",
    description: "Larger spacing values for section and page layout.",
    usage: "Section gaps, page margins, card grids.",
    codeExamples: [{ label: "Section gap", code: "gap: var(--space-8);" }],
  },
  {
    id: "spacing-component",
    name: "Component Spacing",
    category: "foundation",
    group: "spacing",
    status: "draft",
    placeholder: true,
    copyValue: "var(--space-2)",
    description: "Tight spacing for internal component structure.",
    usage: "Icon-to-label gap, input padding, button padding.",
    codeExamples: [{ label: "Button padding", code: "padding: var(--space-2) var(--space-4);" }],
  },
];

// ─── Foundation: Shadows ───────────────────────────────────

const shadowAssets: AssetItem[] = [
  {
    id: "shadow-xs",
    name: "Extra Small Shadow",
    category: "foundation",
    group: "shadows",
    status: "draft",
    placeholder: true,
    copyValue: "var(--shadow-xs)",
    description: "Subtle shadow for minimal elevation.",
    usage: "Flat cards, subtle hover states.",
    codeExamples: [{ label: "Usage", code: "box-shadow: var(--shadow-xs);" }],
  },
  {
    id: "shadow-sm",
    name: "Small Shadow",
    category: "foundation",
    group: "shadows",
    status: "draft",
    placeholder: true,
    copyValue: "var(--shadow-sm)",
    description: "Light shadow for low elevation.",
    usage: "Cards, dropdowns at rest.",
    codeExamples: [{ label: "Usage", code: "box-shadow: var(--shadow-sm);" }],
  },
  {
    id: "shadow-md",
    name: "Medium Shadow",
    category: "foundation",
    group: "shadows",
    status: "draft",
    placeholder: true,
    copyValue: "var(--shadow-md)",
    description: "Standard shadow for mid-level elevation.",
    usage: "Popovers, hover-expanded cards.",
    codeExamples: [{ label: "Usage", code: "box-shadow: var(--shadow-md);" }],
  },
  {
    id: "shadow-lg",
    name: "Large Shadow",
    category: "foundation",
    group: "shadows",
    status: "draft",
    placeholder: true,
    copyValue: "var(--shadow-lg)",
    description: "Prominent shadow for high elevation.",
    usage: "Modals, floating panels.",
    codeExamples: [{ label: "Usage", code: "box-shadow: var(--shadow-lg);" }],
  },
  {
    id: "shadow-xl",
    name: "Extra Large Shadow",
    category: "foundation",
    group: "shadows",
    status: "draft",
    placeholder: true,
    copyValue: "var(--shadow-xl)",
    description: "Maximum elevation shadow.",
    usage: "Full-screen overlays, splash modals.",
    codeExamples: [{ label: "Usage", code: "box-shadow: var(--shadow-xl);" }],
  },
];

// ─── Components ────────────────────────────────────────────

const componentAssets: AssetItem[] = [
  // Buttons & Actions
  {
    id: "comp-button",
    name: "Button",
    category: "component",
    group: "buttons-actions",
    status: "draft",
    placeholder: true,
    copyValue: '<Button variant="primary">Label</Button>',
    description: "Primary interactive element for triggering actions.",
    usage: "Form submissions, dialogs, CTAs.",
    doNots: ["Don't use for navigation — use links", "Don't disable without explanation"],
    codeExamples: [
      { label: "Primary", code: '<Button variant="primary">Save</Button>' },
      { label: "Secondary", code: '<Button variant="secondary">Cancel</Button>' },
    ],
  },
  {
    id: "comp-icon-button",
    name: "Icon Button",
    category: "component",
    group: "buttons-actions",
    status: "draft",
    placeholder: true,
    copyValue: '<IconButton icon={Plus} label="Add" />',
    description: "Button with only an icon, no text label.",
    usage: "Toolbars, compact actions, close buttons.",
    doNots: ["Always provide an aria-label"],
    codeExamples: [{ label: "Usage", code: '<IconButton icon={X} label="Close" />' }],
  },
  {
    id: "comp-link",
    name: "Link",
    category: "component",
    group: "buttons-actions",
    status: "draft",
    placeholder: true,
    copyValue: '<Link href="#">Label</Link>',
    description: "Text link for navigation.",
    usage: "Inline links, breadcrumbs, navigational text.",
    codeExamples: [{ label: "Usage", code: '<a href="#" className="ds-link">Learn more</a>' }],
  },
  // Inputs & Forms
  {
    id: "comp-input",
    name: "Text Input",
    category: "component",
    group: "inputs-forms",
    status: "draft",
    placeholder: true,
    copyValue: '<Input placeholder="Enter text..." />',
    description: "Single-line text input field.",
    usage: "Forms, search bars, inline editing.",
    codeExamples: [{ label: "Basic", code: '<Input placeholder="Email address" />' }],
  },
  {
    id: "comp-select",
    name: "Select",
    category: "component",
    group: "inputs-forms",
    status: "draft",
    placeholder: true,
    copyValue: "<Select options={options} />",
    description: "Dropdown select for choosing from a list.",
    usage: "Filters, settings, form fields with finite options.",
    codeExamples: [{ label: "Basic", code: '<Select options={[{label:"A",value:"a"}]} />' }],
  },
  {
    id: "comp-checkbox",
    name: "Checkbox",
    category: "component",
    group: "inputs-forms",
    status: "draft",
    placeholder: true,
    copyValue: "<Checkbox label=\"Agree\" />",
    description: "Toggle for boolean selections.",
    usage: "Settings, multi-select lists, terms acceptance.",
    codeExamples: [{ label: "Basic", code: '<Checkbox label="Remember me" />' }],
  },
  {
    id: "comp-toggle",
    name: "Toggle Switch",
    category: "component",
    group: "inputs-forms",
    status: "draft",
    placeholder: true,
    copyValue: "<Toggle />",
    description: "On/off switch for binary settings.",
    usage: "Settings pages, feature flags, preferences.",
    codeExamples: [{ label: "Basic", code: "<Toggle checked={true} onChange={fn} />" }],
  },
  // Feedback
  {
    id: "comp-badge",
    name: "Badge",
    category: "component",
    group: "feedback",
    status: "draft",
    placeholder: true,
    copyValue: '<Badge variant="info">New</Badge>',
    description: "Small label for status or count.",
    usage: "Notification counts, status labels, tags.",
    codeExamples: [{ label: "Usage", code: '<Badge variant="success">Active</Badge>' }],
  },
  {
    id: "comp-toast",
    name: "Toast",
    category: "component",
    group: "feedback",
    status: "draft",
    placeholder: true,
    copyValue: 'toast("Saved successfully")',
    description: "Brief, non-blocking notification.",
    usage: "Action confirmations, background process updates.",
    codeExamples: [{ label: "Success", code: 'toast.success("File uploaded")' }],
  },
  {
    id: "comp-alert",
    name: "Alert",
    category: "component",
    group: "feedback",
    status: "draft",
    placeholder: true,
    copyValue: '<Alert variant="warning">Heads up!</Alert>',
    description: "Persistent inline message for important information.",
    usage: "Form validation summaries, system warnings, info banners.",
    codeExamples: [{ label: "Warning", code: '<Alert variant="warning">Check your input</Alert>' }],
  },
  {
    id: "comp-progress",
    name: "Progress Bar",
    category: "component",
    group: "feedback",
    status: "draft",
    placeholder: true,
    copyValue: "<Progress value={60} />",
    description: "Visual indicator of completion.",
    usage: "File uploads, multi-step wizards, loading states.",
    codeExamples: [{ label: "Usage", code: "<Progress value={75} max={100} />" }],
  },
  {
    id: "comp-skeleton",
    name: "Skeleton",
    category: "component",
    group: "feedback",
    status: "draft",
    placeholder: true,
    copyValue: "<Skeleton width={200} height={20} />",
    description: "Loading placeholder that mimics content layout.",
    usage: "Content loading states, lazy-loaded sections.",
    codeExamples: [{ label: "Usage", code: '<Skeleton className="h-4 w-48" />' }],
  },
  // Data Display
  {
    id: "comp-avatar",
    name: "Avatar",
    category: "component",
    group: "data-display",
    status: "draft",
    placeholder: true,
    copyValue: '<Avatar src="url" alt="Name" />',
    description: "User or entity image representation.",
    usage: "User profiles, comment threads, team lists.",
    codeExamples: [{ label: "With fallback", code: '<Avatar fallback="JD" />' }],
  },
  {
    id: "comp-tooltip",
    name: "Tooltip",
    category: "component",
    group: "data-display",
    status: "draft",
    placeholder: true,
    copyValue: '<Tooltip content="Help text">Hover me</Tooltip>',
    description: "Small popup with contextual information.",
    usage: "Icon buttons without labels, truncated text, helper hints.",
    doNots: ["Don't put interactive content in tooltips"],
    codeExamples: [{ label: "Usage", code: '<Tooltip content="Delete item"><IconButton icon={Trash2} /></Tooltip>' }],
  },
  {
    id: "comp-tag",
    name: "Tag / Chip",
    category: "component",
    group: "data-display",
    status: "draft",
    placeholder: true,
    copyValue: '<Tag>Label</Tag>',
    description: "Compact element for labels, filters, or categories.",
    usage: "Filter chips, category tags, selected items.",
    codeExamples: [{ label: "Removable", code: '<Tag onRemove={fn}>React</Tag>' }],
  },
];

// ─── Patterns ──────────────────────────────────────────────

const patternAssets: AssetItem[] = [
  {
    id: "pattern-nav-bar",
    name: "Nav Bar",
    category: "pattern",
    group: "nav-bar",
    status: "draft",
    placeholder: true,
    copyValue: "<NavBar />",
    description: "Top-level horizontal navigation bar.",
    usage: "App shell header with logo, links, and user menu.",
    codeExamples: [{ label: "Basic", code: "<NavBar logo={<Logo />} items={navItems} />" }],
  },
  {
    id: "pattern-sidebar",
    name: "Sidebar",
    category: "pattern",
    group: "sidebar",
    status: "draft",
    placeholder: true,
    copyValue: "<Sidebar />",
    description: "Vertical side navigation panel.",
    usage: "App shell side navigation, settings panels.",
    codeExamples: [{ label: "Basic", code: "<Sidebar items={menuItems} />" }],
  },
  {
    id: "pattern-card",
    name: "Card",
    category: "pattern",
    group: "card",
    status: "draft",
    placeholder: true,
    copyValue: "<Card />",
    description: "Content container with header, body, and footer.",
    usage: "Dashboards, content listings, feature highlights.",
    codeExamples: [{ label: "Basic", code: "<Card title=\"Title\" description=\"Description\">\n  Content here\n</Card>" }],
  },
  {
    id: "pattern-modal",
    name: "Modal / Dialog",
    category: "pattern",
    group: "modal",
    status: "draft",
    placeholder: true,
    copyValue: "<Modal />",
    description: "Overlay dialog for focused interactions.",
    usage: "Confirmations, forms, detail views, alerts.",
    codeExamples: [{ label: "Basic", code: '<Modal title="Confirm" onClose={fn}>\n  Are you sure?\n</Modal>' }],
  },
  {
    id: "pattern-data-table",
    name: "Data Table",
    category: "pattern",
    group: "data-table",
    status: "draft",
    placeholder: true,
    copyValue: "<DataTable />",
    description: "Tabular data display with sorting and pagination.",
    usage: "Admin panels, reports, data-heavy views.",
    codeExamples: [{ label: "Basic", code: "<DataTable columns={cols} data={rows} />" }],
  },
  {
    id: "pattern-form-layout",
    name: "Form Layout",
    category: "pattern",
    group: "form-layout",
    status: "dev-ready",
    placeholder: false,
    copyValue: '<FormLayoutPattern />',
    description: "Page Settings panel with labeled fields, dropdown select, textarea, and action buttons.",
    usage: "Settings pages, data entry, project configuration.",
    codeExamples: [
      { label: "Import", code: 'import { FormLayoutPattern } from "./patterns/FormLayout";' },
      { label: "Usage", code: "<FormLayoutPattern />" },
    ],
  },
  {
    id: "pattern-search",
    name: "Search",
    category: "pattern",
    group: "search",
    status: "draft",
    placeholder: true,
    copyValue: "<SearchBar />",
    description: "Search input with results dropdown.",
    usage: "Global search, filtered lists, command palettes.",
    codeExamples: [{ label: "Basic", code: '<SearchBar placeholder="Search..." onSearch={fn} />' }],
  },
];

// ─── Full Registry ─────────────────────────────────────────

export const assetRegistry: AssetItem[] = [
  ...colorAssets,
  ...typographyAssets,
  ...iconAssets,
  ...spacingAssets,
  ...shadowAssets,
  ...componentAssets,
  ...patternAssets,
];

// ─── Helpers ───────────────────────────────────────────────

export function getAssetById(id: string): AssetItem | undefined {
  return assetRegistry.find((a) => a.id === id);
}

export function getAssetsByCategory(category: AssetCategory): AssetItem[] {
  return assetRegistry.filter((a) => a.category === category);
}

export function getAssetsByGroup(group: string): AssetItem[] {
  return assetRegistry.filter((a) => a.group === group);
}

export function getAssetsByStatus(status: AssetStatus): AssetItem[] {
  return assetRegistry.filter((a) => a.status === status);
}

export function getPlaceholders(): AssetItem[] {
  return assetRegistry.filter((a) => a.placeholder);
}

export function getReadyCount(): number {
  return assetRegistry.filter((a) => a.status === "dev-ready").length;
}

export function getTotalCount(): number {
  return assetRegistry.length;
}
