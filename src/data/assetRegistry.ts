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
  /** For icons: the Lucide component name (PascalCase) */
  iconName?: string;
  /** For icons: which category grouping */
  iconCategory?: "navigation" | "actions" | "status" | "content" | "communication" | "media";
  /** For colors: the CSS variable value for preview */
  colorValue?: string;
  /** For spacing: the pixel value */
  spacingPx?: number;
}

// ─── Foundation: Colors ──────────────────────────────────

const colorEntries: AssetItem[] = [
  { id: "color-neutral-100", name: "Neutral 100", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-neutral-100)", description: "Darkest neutral surface.", usage: "Card backgrounds in dark mode.", codeExamples: [{ label: "CSS", code: "background-color: var(--color-neutral-100);" }], colorValue: "var(--color-neutral-100)" },
  { id: "color-neutral-200", name: "Neutral 200", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-neutral-200)", description: "Secondary neutral surface.", usage: "Elevated surfaces, code blocks.", codeExamples: [{ label: "CSS", code: "background-color: var(--color-neutral-200);" }], colorValue: "var(--color-neutral-200)" },
  { id: "color-neutral-300", name: "Neutral 300", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-neutral-300)", description: "Border and divider neutral.", usage: "Borders, separators, outlines.", codeExamples: [{ label: "CSS", code: "border-color: var(--color-neutral-300);" }], colorValue: "var(--color-neutral-300)" },
  { id: "color-neutral-400", name: "Neutral 400", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-neutral-400)", description: "Muted text neutral.", usage: "Placeholder text, disabled states.", codeExamples: [{ label: "CSS", code: "color: var(--color-neutral-400);" }], colorValue: "var(--color-neutral-400)" },
  { id: "color-neutral-500", name: "Neutral 500", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-neutral-500)", description: "Secondary text neutral.", usage: "Body text, descriptions.", codeExamples: [{ label: "CSS", code: "color: var(--color-neutral-500);" }], colorValue: "var(--color-neutral-500)" },
  { id: "color-primary-300", name: "Primary 300", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-primary-300)", description: "Core brand color.", usage: "Primary buttons, key interactive elements.", codeExamples: [{ label: "CSS", code: "background-color: var(--color-primary-300);" }], colorValue: "var(--color-primary-300)" },
  { id: "color-primary-400", name: "Primary 400", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-primary-400)", description: "Accent text and links.", usage: "Links, accent highlights.", codeExamples: [{ label: "CSS", code: "color: var(--color-primary-400);" }], colorValue: "var(--color-primary-400)" },
  { id: "color-success", name: "Success Green", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-success-text)", description: "Positive state indicator.", usage: "Success messages, confirmations.", codeExamples: [{ label: "CSS", code: "color: var(--color-success-text);" }], colorValue: "var(--color-success-300)" },
  { id: "color-warning", name: "Warning Amber", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-warning-text)", description: "Caution state indicator.", usage: "Warning banners, in-progress states.", codeExamples: [{ label: "CSS", code: "color: var(--color-warning-text);" }], colorValue: "var(--color-warning-300)" },
  { id: "color-error", name: "Error Red", category: "foundation", group: "colors", status: "draft", placeholder: true, copyValue: "var(--color-error-text)", description: "Destructive/error indicator.", usage: "Error messages, destructive actions.", codeExamples: [{ label: "CSS", code: "color: var(--color-error-text);" }], colorValue: "var(--color-error-300)" },
];

// ─── Foundation: Typography ──────────────────────────────

const typographyEntries: AssetItem[] = [
  { id: "type-heading-xl", name: "Heading XL", category: "foundation", group: "typography", status: "draft", placeholder: true, copyValue: "font-size: 2.25rem; font-weight: 700;", description: "Page title. One per page.", usage: "Top-level page headings.", codeExamples: [{ label: "CSS", code: "font-size: 2.25rem;\nline-height: 1.2;\nfont-weight: 700;" }] },
  { id: "type-heading-lg", name: "Heading LG", category: "foundation", group: "typography", status: "draft", placeholder: true, copyValue: "font-size: 1.5rem; font-weight: 600;", description: "Section title.", usage: "Major section headings.", codeExamples: [{ label: "CSS", code: "font-size: 1.5rem;\nline-height: 1.3;\nfont-weight: 600;" }] },
  { id: "type-heading-md", name: "Heading MD", category: "foundation", group: "typography", status: "draft", placeholder: true, copyValue: "font-size: 1.25rem; font-weight: 600;", description: "Card/subsection title.", usage: "Card headers, dialog titles.", codeExamples: [{ label: "CSS", code: "font-size: 1.25rem;\nline-height: 1.4;\nfont-weight: 600;" }] },
  { id: "type-heading-sm", name: "Heading SM", category: "foundation", group: "typography", status: "draft", placeholder: true, copyValue: "font-size: 1rem; font-weight: 600;", description: "Label/group header.", usage: "Form labels, sidebar group titles.", codeExamples: [{ label: "CSS", code: "font-size: 1rem;\nline-height: 1.5;\nfont-weight: 600;" }] },
  { id: "type-body", name: "Body", category: "foundation", group: "typography", status: "draft", placeholder: true, copyValue: "font-size: 0.875rem; font-weight: 400;", description: "Standard body text.", usage: "Paragraphs, descriptions.", codeExamples: [{ label: "CSS", code: "font-size: 0.875rem;\nline-height: 1.6;\nfont-weight: 400;" }] },
  { id: "type-body-sm", name: "Body Small", category: "foundation", group: "typography", status: "draft", placeholder: true, copyValue: "font-size: 0.75rem; font-weight: 400;", description: "Captions and meta text.", usage: "Timestamps, helper text.", codeExamples: [{ label: "CSS", code: "font-size: 0.75rem;\nline-height: 1.5;" }] },
  { id: "type-mono", name: "Monospace", category: "foundation", group: "typography", status: "draft", placeholder: true, copyValue: "font-family: var(--font-mono);", description: "Code and token text.", usage: "Code blocks, token names, file paths.", codeExamples: [{ label: "CSS", code: "font-family: var(--font-mono);\nfont-size: 0.8125rem;" }] },
];

// ─── Foundation: Icons ───────────────────────────────────

const iconEntries: AssetItem[] = [
  // Navigation
  { id: "icon-home", name: "Home", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Home } from "lucide-react";', description: "Home/dashboard icon.", usage: "Main navigation home link.", codeExamples: [{ label: "Usage", code: "<Home size={20} />" }], iconName: "Home", iconCategory: "navigation" },
  { id: "icon-arrow-left", name: "Arrow Left", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { ArrowLeft } from "lucide-react";', description: "Back navigation.", usage: "Return actions.", codeExamples: [{ label: "Usage", code: "<ArrowLeft size={20} />" }], iconName: "ArrowLeft", iconCategory: "navigation" },
  { id: "icon-arrow-right", name: "Arrow Right", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { ArrowRight } from "lucide-react";', description: "Forward navigation.", usage: "Next/forward actions.", codeExamples: [{ label: "Usage", code: "<ArrowRight size={20} />" }], iconName: "ArrowRight", iconCategory: "navigation" },
  { id: "icon-chevron-down", name: "Chevron Down", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { ChevronDown } from "lucide-react";', description: "Expand/dropdown indicator.", usage: "Collapsible sections, select menus.", codeExamples: [{ label: "Usage", code: "<ChevronDown size={20} />" }], iconName: "ChevronDown", iconCategory: "navigation" },
  { id: "icon-chevron-right", name: "Chevron Right", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { ChevronRight } from "lucide-react";', description: "Forward/expand indicator.", usage: "Breadcrumbs, tree items.", codeExamples: [{ label: "Usage", code: "<ChevronRight size={20} />" }], iconName: "ChevronRight", iconCategory: "navigation" },
  { id: "icon-menu", name: "Menu", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Menu } from "lucide-react";', description: "Hamburger menu.", usage: "Mobile nav toggle.", codeExamples: [{ label: "Usage", code: "<Menu size={20} />" }], iconName: "Menu", iconCategory: "navigation" },
  { id: "icon-x", name: "X / Close", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { X } from "lucide-react";', description: "Close/dismiss.", usage: "Close dialogs, dismiss banners.", codeExamples: [{ label: "Usage", code: "<X size={20} />" }], iconName: "X", iconCategory: "navigation" },
  // Actions
  { id: "icon-plus", name: "Plus", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Plus } from "lucide-react";', description: "Add/create action.", usage: "Add new items.", codeExamples: [{ label: "Usage", code: "<Plus size={20} />" }], iconName: "Plus", iconCategory: "actions" },
  { id: "icon-trash", name: "Trash", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Trash2 } from "lucide-react";', description: "Delete action.", usage: "Remove items.", codeExamples: [{ label: "Usage", code: "<Trash2 size={20} />" }], iconName: "Trash2", iconCategory: "actions" },
  { id: "icon-edit", name: "Edit", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Pencil } from "lucide-react";', description: "Edit action.", usage: "Edit items, inline editing.", codeExamples: [{ label: "Usage", code: "<Pencil size={20} />" }], iconName: "Pencil", iconCategory: "actions" },
  { id: "icon-copy", name: "Copy", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Copy } from "lucide-react";', description: "Copy to clipboard.", usage: "Copy code snippets, tokens.", codeExamples: [{ label: "Usage", code: "<Copy size={20} />" }], iconName: "Copy", iconCategory: "actions" },
  { id: "icon-download", name: "Download", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Download } from "lucide-react";', description: "Download action.", usage: "Export files, download assets.", codeExamples: [{ label: "Usage", code: "<Download size={20} />" }], iconName: "Download", iconCategory: "actions" },
  { id: "icon-search", name: "Search", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Search } from "lucide-react";', description: "Search/find.", usage: "Search inputs, find actions.", codeExamples: [{ label: "Usage", code: "<Search size={20} />" }], iconName: "Search", iconCategory: "actions" },
  { id: "icon-filter", name: "Filter", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Filter } from "lucide-react";', description: "Filter action.", usage: "Filter lists and tables.", codeExamples: [{ label: "Usage", code: "<Filter size={20} />" }], iconName: "Filter", iconCategory: "actions" },
  { id: "icon-settings", name: "Settings", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Settings } from "lucide-react";', description: "Settings/preferences.", usage: "Settings pages, config.", codeExamples: [{ label: "Usage", code: "<Settings size={20} />" }], iconName: "Settings", iconCategory: "actions" },
  { id: "icon-external-link", name: "External Link", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { ExternalLink } from "lucide-react";', description: "Open in new tab.", usage: "External links.", codeExamples: [{ label: "Usage", code: "<ExternalLink size={20} />" }], iconName: "ExternalLink", iconCategory: "actions" },
  // Status
  { id: "icon-check", name: "Check", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Check } from "lucide-react";', description: "Success/confirmed.", usage: "Confirmation, selected state.", codeExamples: [{ label: "Usage", code: "<Check size={20} />" }], iconName: "Check", iconCategory: "status" },
  { id: "icon-alert-circle", name: "Alert Circle", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { AlertCircle } from "lucide-react";', description: "Error/alert.", usage: "Error states, form validation.", codeExamples: [{ label: "Usage", code: "<AlertCircle size={20} />" }], iconName: "AlertCircle", iconCategory: "status" },
  { id: "icon-info", name: "Info", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Info } from "lucide-react";', description: "Information.", usage: "Tooltips, info messages.", codeExamples: [{ label: "Usage", code: "<Info size={20} />" }], iconName: "Info", iconCategory: "status" },
  { id: "icon-alert-triangle", name: "Alert Triangle", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { AlertTriangle } from "lucide-react";', description: "Warning.", usage: "Warning banners.", codeExamples: [{ label: "Usage", code: "<AlertTriangle size={20} />" }], iconName: "AlertTriangle", iconCategory: "status" },
  { id: "icon-x-circle", name: "X Circle", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { XCircle } from "lucide-react";', description: "Error/rejected.", usage: "Failed states, rejection.", codeExamples: [{ label: "Usage", code: "<XCircle size={20} />" }], iconName: "XCircle", iconCategory: "status" },
  { id: "icon-loader", name: "Loader", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Loader2 } from "lucide-react";', description: "Loading spinner.", usage: "Loading states.", codeExamples: [{ label: "Usage", code: '<Loader2 size={20} className="animate-spin" />' }], iconName: "Loader2", iconCategory: "status" },
  // Content
  { id: "icon-file", name: "File", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { File } from "lucide-react";', description: "Generic file.", usage: "File references.", codeExamples: [{ label: "Usage", code: "<File size={20} />" }], iconName: "File", iconCategory: "content" },
  { id: "icon-file-text", name: "File Text", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { FileText } from "lucide-react";', description: "Document/text file.", usage: "Document links.", codeExamples: [{ label: "Usage", code: "<FileText size={20} />" }], iconName: "FileText", iconCategory: "content" },
  { id: "icon-image", name: "Image", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { ImageIcon } from "lucide-react";', description: "Image/photo.", usage: "Image uploads, galleries.", codeExamples: [{ label: "Usage", code: '<ImageIcon size={20} />' }], iconName: "ImageIcon", iconCategory: "content" },
  { id: "icon-link", name: "Link", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Link2 } from "lucide-react";', description: "Hyperlink.", usage: "Link actions, URL references.", codeExamples: [{ label: "Usage", code: "<Link2 size={20} />" }], iconName: "Link2", iconCategory: "content" },
  { id: "icon-bookmark", name: "Bookmark", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Bookmark } from "lucide-react";', description: "Save/bookmark.", usage: "Save for later.", codeExamples: [{ label: "Usage", code: "<Bookmark size={20} />" }], iconName: "Bookmark", iconCategory: "content" },
  { id: "icon-tag", name: "Tag", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Tag } from "lucide-react";', description: "Label/tag.", usage: "Categorization, labels.", codeExamples: [{ label: "Usage", code: "<Tag size={20} />" }], iconName: "Tag", iconCategory: "content" },
  // Communication
  { id: "icon-mail", name: "Mail", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Mail } from "lucide-react";', description: "Email.", usage: "Email links, messaging.", codeExamples: [{ label: "Usage", code: "<Mail size={20} />" }], iconName: "Mail", iconCategory: "communication" },
  { id: "icon-message", name: "Message", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { MessageSquare } from "lucide-react";', description: "Chat/comment.", usage: "Comments, chat features.", codeExamples: [{ label: "Usage", code: "<MessageSquare size={20} />" }], iconName: "MessageSquare", iconCategory: "communication" },
  { id: "icon-bell", name: "Bell", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Bell } from "lucide-react";', description: "Notification.", usage: "Notification indicators.", codeExamples: [{ label: "Usage", code: "<Bell size={20} />" }], iconName: "Bell", iconCategory: "communication" },
  { id: "icon-send", name: "Send", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Send } from "lucide-react";', description: "Send message.", usage: "Submit messages.", codeExamples: [{ label: "Usage", code: "<Send size={20} />" }], iconName: "Send", iconCategory: "communication" },
  // Media
  { id: "icon-play", name: "Play", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Play } from "lucide-react";', description: "Play media.", usage: "Video/audio playback.", codeExamples: [{ label: "Usage", code: "<Play size={20} />" }], iconName: "Play", iconCategory: "media" },
  { id: "icon-pause", name: "Pause", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Pause } from "lucide-react";', description: "Pause media.", usage: "Pause playback.", codeExamples: [{ label: "Usage", code: "<Pause size={20} />" }], iconName: "Pause", iconCategory: "media" },
  { id: "icon-volume", name: "Volume", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Volume2 } from "lucide-react";', description: "Audio volume.", usage: "Volume controls.", codeExamples: [{ label: "Usage", code: "<Volume2 size={20} />" }], iconName: "Volume2", iconCategory: "media" },
  { id: "icon-maximize", name: "Maximize", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Maximize } from "lucide-react";', description: "Fullscreen.", usage: "Expand to fullscreen.", codeExamples: [{ label: "Usage", code: "<Maximize size={20} />" }], iconName: "Maximize", iconCategory: "media" },
  { id: "icon-minimize", name: "Minimize", category: "foundation", group: "icons", status: "draft", placeholder: true, copyValue: 'import { Minimize } from "lucide-react";', description: "Exit fullscreen.", usage: "Collapse from fullscreen.", codeExamples: [{ label: "Usage", code: "<Minimize size={20} />" }], iconName: "Minimize", iconCategory: "media" },
];

// ─── Foundation: Spacing ─────────────────────────────────

const spacingEntries: AssetItem[] = [
  { id: "space-1", name: "4px (space-1)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-1)", description: "Tightest spacing.", usage: "Icon gaps, inline spacing.", codeExamples: [{ label: "CSS", code: "gap: var(--space-1);" }], spacingPx: 4 },
  { id: "space-2", name: "8px (space-2)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-2)", description: "Small spacing.", usage: "Button padding, badge gaps.", codeExamples: [{ label: "CSS", code: "padding: var(--space-2);" }], spacingPx: 8 },
  { id: "space-3", name: "12px (space-3)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-3)", description: "Compact spacing.", usage: "Compact card padding.", codeExamples: [{ label: "CSS", code: "padding: var(--space-3);" }], spacingPx: 12 },
  { id: "space-4", name: "16px (space-4)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-4)", description: "Base spacing.", usage: "Standard card padding, gaps.", codeExamples: [{ label: "CSS", code: "padding: var(--space-4);" }], spacingPx: 16 },
  { id: "space-6", name: "24px (space-6)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-6)", description: "Medium spacing.", usage: "Section padding.", codeExamples: [{ label: "CSS", code: "padding: var(--space-6);" }], spacingPx: 24 },
  { id: "space-8", name: "32px (space-8)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-8)", description: "Large spacing.", usage: "Major section breaks.", codeExamples: [{ label: "CSS", code: "margin-top: var(--space-8);" }], spacingPx: 32 },
  { id: "space-12", name: "48px (space-12)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-12)", description: "Extra large spacing.", usage: "Page margins.", codeExamples: [{ label: "CSS", code: "padding: var(--space-12);" }], spacingPx: 48 },
  { id: "space-16", name: "64px (space-16)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--space-16)", description: "Maximum spacing.", usage: "Hero sections.", codeExamples: [{ label: "CSS", code: "padding: var(--space-16);" }], spacingPx: 64 },
  { id: "radius-sm", name: "Radius SM (4px)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--radius-sm)", description: "Small radius for badges.", usage: "Badges, code blocks.", codeExamples: [{ label: "CSS", code: "border-radius: var(--radius-sm);" }] },
  { id: "radius-md", name: "Radius MD (6px)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--radius-md)", description: "Default radius for buttons.", usage: "Buttons, inputs.", codeExamples: [{ label: "CSS", code: "border-radius: var(--radius-md);" }] },
  { id: "radius-lg", name: "Radius LG (8px)", category: "foundation", group: "spacing", status: "draft", placeholder: true, copyValue: "var(--radius-lg)", description: "Card radius.", usage: "Cards, dialogs.", codeExamples: [{ label: "CSS", code: "border-radius: var(--radius-lg);" }] },
];

// ─── Foundation: Shadows ─────────────────────────────────

const shadowEntries: AssetItem[] = [
  { id: "shadow-sm", name: "Shadow SM", category: "foundation", group: "shadows", status: "draft", placeholder: true, copyValue: "var(--shadow-sm)", description: "Subtle elevation.", usage: "Buttons, small cards.", codeExamples: [{ label: "CSS", code: "box-shadow: var(--shadow-sm);" }] },
  { id: "shadow-md", name: "Shadow MD", category: "foundation", group: "shadows", status: "draft", placeholder: true, copyValue: "var(--shadow-md)", description: "Medium elevation.", usage: "Dropdown menus, popovers.", codeExamples: [{ label: "CSS", code: "box-shadow: var(--shadow-md);" }] },
  { id: "shadow-lg", name: "Shadow LG", category: "foundation", group: "shadows", status: "draft", placeholder: true, copyValue: "var(--shadow-lg)", description: "High elevation.", usage: "Modals, dialogs.", codeExamples: [{ label: "CSS", code: "box-shadow: var(--shadow-lg);" }] },
];

// ─── Components ──────────────────────────────────────────

const componentEntries: AssetItem[] = [
  // Buttons & Actions
  { id: "comp-button-primary", name: "Button Primary", category: "component", group: "buttons-actions", status: "draft", placeholder: true, copyValue: '<button className="btn-primary">Label</button>', description: "Primary action button.", usage: "Main CTA, form submissions.", codeExamples: [{ label: "JSX", code: '<button className="btn-primary">Save</button>' }] },
  { id: "comp-button-secondary", name: "Button Secondary", category: "component", group: "buttons-actions", status: "draft", placeholder: true, copyValue: '<button className="btn-secondary">Label</button>', description: "Secondary action button.", usage: "Cancel, dismiss, alternative actions.", codeExamples: [{ label: "JSX", code: '<button className="btn-secondary">Cancel</button>' }] },
  { id: "comp-button-danger", name: "Button Danger", category: "component", group: "buttons-actions", status: "draft", placeholder: true, copyValue: '<button className="btn-danger">Label</button>', description: "Destructive action button.", usage: "Delete, remove actions.", codeExamples: [{ label: "JSX", code: '<button className="btn-danger">Delete</button>' }] },
  { id: "comp-icon-button", name: "Icon Button", category: "component", group: "buttons-actions", status: "draft", placeholder: true, copyValue: '<button className="btn-icon"><Icon /></button>', description: "Icon-only button.", usage: "Toolbars, compact actions.", codeExamples: [{ label: "JSX", code: '<button className="btn-icon"><Pencil size={16} /></button>' }] },
  // Inputs & Forms
  { id: "comp-input", name: "Text Input", category: "component", group: "inputs-forms", status: "draft", placeholder: true, copyValue: '<input type="text" className="input" />', description: "Standard text input.", usage: "Form fields, search.", codeExamples: [{ label: "JSX", code: '<input type="text" className="input" placeholder="Enter text..." />' }] },
  { id: "comp-textarea", name: "Textarea", category: "component", group: "inputs-forms", status: "draft", placeholder: true, copyValue: '<textarea className="textarea" />', description: "Multi-line text input.", usage: "Long-form text entry.", codeExamples: [{ label: "JSX", code: '<textarea className="textarea" rows={4} />' }] },
  { id: "comp-select", name: "Select", category: "component", group: "inputs-forms", status: "draft", placeholder: true, copyValue: '<select className="select"><option>...</option></select>', description: "Dropdown select.", usage: "Choose from predefined options.", codeExamples: [{ label: "JSX", code: '<select className="select">\n  <option>Option 1</option>\n</select>' }] },
  { id: "comp-checkbox", name: "Checkbox", category: "component", group: "inputs-forms", status: "draft", placeholder: true, copyValue: '<input type="checkbox" className="checkbox" />', description: "Checkbox input.", usage: "Multi-select, toggles, agreements.", codeExamples: [{ label: "JSX", code: '<label>\n  <input type="checkbox" /> Accept terms\n</label>' }] },
  { id: "comp-toggle", name: "Toggle", category: "component", group: "inputs-forms", status: "draft", placeholder: true, copyValue: "<Toggle />", description: "On/off toggle switch.", usage: "Boolean settings.", codeExamples: [{ label: "JSX", code: "<Toggle checked={on} onChange={setOn} />" }] },
  // Feedback
  { id: "comp-badge", name: "Badge", category: "component", group: "feedback", status: "draft", placeholder: true, copyValue: '<span className="badge">Label</span>', description: "Small status label.", usage: "Status indicators, counts.", codeExamples: [{ label: "JSX", code: '<span className="badge badge-success">Active</span>' }] },
  { id: "comp-toast", name: "Toast", category: "component", group: "feedback", status: "draft", placeholder: true, copyValue: "showToast({ message: '...' })", description: "Temporary notification.", usage: "Action confirmations, brief alerts.", codeExamples: [{ label: "JSX", code: "showToast({ message: 'Saved!', type: 'success' })" }] },
  { id: "comp-alert", name: "Alert", category: "component", group: "feedback", status: "draft", placeholder: true, copyValue: '<div className="alert">Message</div>', description: "Inline alert banner.", usage: "Persistent messages, form errors.", codeExamples: [{ label: "JSX", code: '<div className="alert alert-warning">Check your input.</div>' }] },
  { id: "comp-progress", name: "Progress Bar", category: "component", group: "feedback", status: "draft", placeholder: true, copyValue: "<ProgressBar value={75} />", description: "Progress indicator.", usage: "Upload progress, step completion.", codeExamples: [{ label: "JSX", code: "<ProgressBar value={75} max={100} />" }] },
  { id: "comp-skeleton", name: "Skeleton", category: "component", group: "feedback", status: "draft", placeholder: true, copyValue: '<div className="skeleton" />', description: "Loading placeholder.", usage: "Content loading states.", codeExamples: [{ label: "JSX", code: '<div className="skeleton h-4 w-48" />' }] },
  // Data Display
  { id: "comp-avatar", name: "Avatar", category: "component", group: "data-display", status: "draft", placeholder: true, copyValue: '<Avatar src="..." alt="..." />', description: "User avatar.", usage: "Profile pictures, user lists.", codeExamples: [{ label: "JSX", code: '<Avatar src="/avatar.jpg" alt="User" size={32} />' }] },
  { id: "comp-tooltip", name: "Tooltip", category: "component", group: "data-display", status: "draft", placeholder: true, copyValue: "<Tooltip content='...'>child</Tooltip>", description: "Hover tooltip.", usage: "Extra context on hover.", codeExamples: [{ label: "JSX", code: '<Tooltip content="More info">\n  <button>Hover me</button>\n</Tooltip>' }] },
  { id: "comp-tag", name: "Tag / Chip", category: "component", group: "data-display", status: "draft", placeholder: true, copyValue: '<span className="tag">Label</span>', description: "Removable tag/chip.", usage: "Selected filters, categories.", codeExamples: [{ label: "JSX", code: '<span className="tag">React <X size={12} /></span>' }] },
];

// ─── Patterns ────────────────────────────────────────────

const patternEntries: AssetItem[] = [
  { id: "pattern-nav-bar", name: "Nav Bar", category: "pattern", group: "nav-bar", status: "draft", placeholder: true, copyValue: "<NavBar />", description: "Top navigation bar pattern.", usage: "App header with logo, nav links, and actions.", codeExamples: [{ label: "JSX", code: "<NavBar />" }] },
  { id: "pattern-sidebar", name: "Sidebar", category: "pattern", group: "sidebar", status: "draft", placeholder: true, copyValue: "<Sidebar />", description: "Vertical sidebar navigation pattern.", usage: "App sidebar with sections and links.", codeExamples: [{ label: "JSX", code: "<Sidebar />" }] },
  { id: "pattern-card", name: "Card", category: "pattern", group: "card", status: "draft", placeholder: true, copyValue: "<Card />", description: "Content card pattern.", usage: "Grouped content with header, body, footer.", codeExamples: [{ label: "JSX", code: "<Card>\n  <CardHeader>Title</CardHeader>\n  <CardBody>Content</CardBody>\n</Card>" }] },
  { id: "pattern-modal", name: "Modal / Dialog", category: "pattern", group: "modal", status: "draft", placeholder: true, copyValue: "<Modal />", description: "Modal dialog pattern.", usage: "Confirmations, forms, detail views.", codeExamples: [{ label: "JSX", code: "<Modal open={open} onClose={close}>\n  Content\n</Modal>" }] },
  { id: "pattern-data-table", name: "Data Table", category: "pattern", group: "data-table", status: "draft", placeholder: true, copyValue: "<DataTable />", description: "Data table with sorting and pagination.", usage: "Tabular data display.", codeExamples: [{ label: "JSX", code: "<DataTable columns={cols} data={rows} />" }] },
  { id: "pattern-form-layout", name: "Form Layout", category: "pattern", group: "form-layout", status: "draft", placeholder: true, copyValue: "<FormLayout />", description: "Structured form pattern.", usage: "Settings forms, create/edit forms.", codeExamples: [{ label: "JSX", code: "<FormLayout>\n  <Field label='Name'><Input /></Field>\n</FormLayout>" }] },
  { id: "pattern-search", name: "Search", category: "pattern", group: "search", status: "draft", placeholder: true, copyValue: "<SearchBar />", description: "Search bar with results pattern.", usage: "Global search, filtered lists.", codeExamples: [{ label: "JSX", code: "<SearchBar onSearch={handleSearch} />" }] },
];

// ─── Full Registry ───────────────────────────────────────

export const assetRegistry: AssetItem[] = [
  ...colorEntries,
  ...typographyEntries,
  ...iconEntries,
  ...spacingEntries,
  ...shadowEntries,
  ...componentEntries,
  ...patternEntries,
];

// ─── Helpers ─────────────────────────────────────────────

export function getAssetById(id: string): AssetItem | undefined {
  return assetRegistry.find((a) => a.id === id);
}

export function getAssetsByCategory(cat: AssetCategory): AssetItem[] {
  return assetRegistry.filter((a) => a.category === cat);
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
