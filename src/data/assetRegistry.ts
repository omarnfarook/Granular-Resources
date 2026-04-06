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
    name: "Brand Primary \u00b7 Indigo",
    category: "foundation",
    group: "colors",
    status: "dev-ready",
    placeholder: false,
    copyValue: "var(--indigo-500) /* #6245F2 */",
    description: "Indigo is the primary brand color used for CTAs, focus rings, and key interactive elements. Scale runs from 50 (#FFF4FF) to 900 (#1F0D87).",
    usage: "Primary buttons, links, active indicators, focus rings, selected states.",
    doNots: ["Don't use for large background fills", "Don't use indigo-500 on dark backgrounds without sufficient contrast"],
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--indigo-500); /* #6245F2 */" },
      { label: "Hover state", code: "color: var(--indigo-400); /* #8068F3 */" },
      { label: "Full scale", code: "--indigo-50: #FFF4FF;\n--indigo-100: #E4D1FF;\n--indigo-200: #CBB8FF;\n--indigo-300: #927FEF;\n--indigo-400: #8068F3;\n--indigo-500: #6245F2;\n--indigo-600: #5442EE;\n--indigo-700: #4936EC;\n--indigo-800: #3123AF;\n--indigo-900: #1F0D87;" },
    ],
  },
  {
    id: "color-secondary",
    name: "Brand Secondary \u00b7 Lime",
    category: "foundation",
    group: "colors",
    status: "dev-ready",
    placeholder: false,
    copyValue: "var(--lime-500) /* #B8FF22 */",
    description: "Lime is the secondary brand accent for highlights, badges, and secondary CTAs. Scale runs from 50 (#FDFFFA) to 900 (#3D5900).",
    usage: "Secondary buttons, accent highlights, promotional badges, hover accents.",
    doNots: ["Don't use lime text on white backgrounds", "Don't pair lime-500 with indigo-500 at small sizes"],
    codeExamples: [
      { label: "CSS Variable", code: "color: var(--lime-500); /* #B8FF22 */" },
      { label: "Full scale", code: "--lime-50: #FDFFFA;\n--lime-100: #F7FFE5;\n--lime-200: #EFFFCC;\n--lime-300: #DEFF99;\n--lime-400: #CEFF66;\n--lime-500: #B8FF22;\n--lime-600: #AEFF00;\n--lime-700: #9EE800;\n--lime-800: #6FA202;\n--lime-900: #3D5900;" },
    ],
  },
  {
    id: "color-neutral",
    name: "Neutral Backgrounds",
    category: "foundation",
    group: "colors",
    status: "dev-ready",
    placeholder: false,
    copyValue: "var(--color-bg) /* #161819 */",
    description: "Dark-mode background layers: primary #161819, secondary #252627, tertiary #111112. Border: #323232. Text: white / #B9BABA / #5C5D5E.",
    usage: "Page backgrounds, cards, overlays, raised surfaces, border colors, text hierarchy.",
    codeExamples: [
      { label: "Backgrounds", code: "background: var(--color-bg);        /* #161819 primary */\nbackground: var(--color-bg-raised);  /* #252627 secondary */\nbackground: var(--color-bg-overlay); /* #111112 tertiary */" },
      { label: "Borders", code: "border-color: var(--color-border);        /* #323232 */\nborder-color: var(--color-border-subtle);  /* #252627 */" },
      { label: "Text", code: "color: var(--color-text);           /* #ffffff */\ncolor: var(--color-text-secondary); /* #B9BABA */\ncolor: var(--color-text-muted);     /* #5C5D5E */" },
    ],
  },
  {
    id: "color-extended",
    name: "Extended Palette",
    category: "foundation",
    group: "colors",
    status: "dev-ready",
    placeholder: false,
    copyValue: "var(--neutral-500) /* #5C5D5E */",
    description: "Extended neutral grey (10-900) and cool grey (10-900) scales. Neutral grey for dark-mode surfaces; cool grey for light-mode surfaces. Plus tertiary accents: Lilac #D0C6FA, Violet #927FEF, Teal #8FEFEF, Seafoam #76FFC1, Peach #FFA45F, Coral #FF8378.",
    usage: "Surface colors, text hierarchy, light-mode backgrounds, decorative accents.",
    codeExamples: [
      { label: "Neutral grey", code: "--neutral-10: #FAFAFA;\n--neutral-50: #F1F1F1;\n--neutral-100: #E8E8E8;\n--neutral-300: #B9BABA;\n--neutral-500: #5C5D5E;\n--neutral-700: #252627;\n--neutral-900: #161819;" },
      { label: "Cool grey", code: "--coolgrey-10: #FAFBFC;\n--coolgrey-50: #F3F5F7;\n--coolgrey-100: #E9ECF0;\n--coolgrey-300: #AEB3B9;\n--coolgrey-500: #575F6A;\n--coolgrey-700: #323C48;\n--coolgrey-900: #141B24;" },
      { label: "Accent colors", code: "/* Tertiary accents */\nLilac:   #D0C6FA\nViolet:  #927FEF\nTeal:    #8FEFEF\nSeafoam: #76FFC1\nPeach:   #FFA45F\nCoral:   #FF8378" },
    ],
  },
  {
    id: "color-semantic",
    name: "Semantic Colors",
    category: "foundation",
    group: "colors",
    status: "dev-ready",
    placeholder: false,
    copyValue: "var(--color-success-text)",
    description: "Semantic intent colors: Success (green), Warning (orange), Error (coral/red), Info (teal). Each has a full 50-900 scale.",
    usage: "Success messages, warning banners, error states, informational callouts.",
    doNots: ["Don't use color alone to convey meaning \u2014 pair with text/icons"],
    codeExamples: [
      { label: "Success", code: "color: var(--green-400); /* #34D38B dark mode */\ncolor: var(--green-500); /* #10B96D light mode */\nbackground: var(--color-success-bg);" },
      { label: "Warning", code: "color: var(--orange-300); /* #FFA45F dark mode */\ncolor: var(--orange-500); /* #F5700B light mode */\nbackground: var(--color-warning-bg);" },
      { label: "Error", code: "color: var(--coral-400); /* #FF8378 dark mode */\ncolor: var(--coral-500); /* #EA6559 light mode */\nbackground: var(--color-error-bg);" },
      { label: "Info (Teal)", code: "color: var(--teal-400); /* #27E0E0 */\ncolor: var(--teal-500); /* #19B0AF */" },
    ],
  },
  {
    id: "color-gradients",
    name: "Gradients",
    category: "foundation",
    group: "colors",
    status: "dev-ready",
    placeholder: false,
    copyValue: "background: linear-gradient(90deg, var(--indigo-800), var(--indigo-500), var(--teal-600), var(--lime-500));",
    description: "Brand gradients for borders, cards, and decorative elements. Radial border, linear border, indigo transparent, and coral transparent variants.",
    usage: "Hero sections, card borders, promotional banners, decorative accents.",
    doNots: ["Don't use gradients for body text backgrounds", "Don't layer multiple gradients without design review"],
    codeExamples: [
      { label: "Linear Border", code: "background: linear-gradient(90deg, var(--indigo-800), var(--indigo-500), var(--teal-600), var(--lime-500));" },
      { label: "Radial Border", code: "background: radial-gradient(circle, var(--lime-500), var(--indigo-800), var(--indigo-500), var(--teal-600), var(--lime-500));" },
      { label: "Indigo Transparent 45\u00b0", code: "background: linear-gradient(45deg, rgba(98,69,242,0.05) 50%, rgba(98,69,242,0.20) 100%);" },
      { label: "Coral Transparent", code: "background: linear-gradient(45deg, rgba(255,131,120,0.10) 50%, rgba(255,131,120,0.30) 100%);" },
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
