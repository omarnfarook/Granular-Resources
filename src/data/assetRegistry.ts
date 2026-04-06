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
  iconName?: string;
  iconCategory?: "navigation" | "actions" | "status" | "content" | "communication" | "media";
  colorValue?: string;
  spacingPx?: number;
}

const P = true; // shorthand for placeholder
const D: AssetStatus = "draft";

// ── Colors ───────────────────────────────────────────────
const colors: AssetItem[] = [
  { id: "color-neutral-100", name: "Neutral 100", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-neutral-100)", description: "Darkest neutral surface.", usage: "Card backgrounds in dark mode.", codeExamples: [{ label: "CSS", code: "background: var(--color-neutral-100);" }], colorValue: "var(--color-neutral-100)" },
  { id: "color-neutral-200", name: "Neutral 200", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-neutral-200)", description: "Secondary neutral surface.", usage: "Elevated surfaces, code blocks.", codeExamples: [{ label: "CSS", code: "background: var(--color-neutral-200);" }], colorValue: "var(--color-neutral-200)" },
  { id: "color-neutral-300", name: "Neutral 300", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-neutral-300)", description: "Border neutral.", usage: "Borders, separators.", codeExamples: [{ label: "CSS", code: "border-color: var(--color-neutral-300);" }], colorValue: "var(--color-neutral-300)" },
  { id: "color-neutral-400", name: "Neutral 400", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-neutral-400)", description: "Muted text neutral.", usage: "Placeholder text, disabled states.", codeExamples: [{ label: "CSS", code: "color: var(--color-neutral-400);" }], colorValue: "var(--color-neutral-400)" },
  { id: "color-neutral-500", name: "Neutral 500", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-neutral-500)", description: "Secondary text neutral.", usage: "Body text, descriptions.", codeExamples: [{ label: "CSS", code: "color: var(--color-neutral-500);" }], colorValue: "var(--color-neutral-500)" },
  { id: "color-primary-300", name: "Primary 300", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-primary-300)", description: "Core brand color.", usage: "Primary buttons, CTAs.", codeExamples: [{ label: "CSS", code: "background: var(--color-primary-300);" }], colorValue: "var(--color-primary-300)" },
  { id: "color-primary-400", name: "Primary 400", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-primary-400)", description: "Accent text and links.", usage: "Links, accent highlights.", codeExamples: [{ label: "CSS", code: "color: var(--color-primary-400);" }], colorValue: "var(--color-primary-400)" },
  { id: "color-success", name: "Success", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-success-text)", description: "Positive state.", usage: "Success messages.", codeExamples: [{ label: "CSS", code: "color: var(--color-success-text);" }], colorValue: "var(--color-success-300)" },
  { id: "color-warning", name: "Warning", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-warning-text)", description: "Caution state.", usage: "Warning banners.", codeExamples: [{ label: "CSS", code: "color: var(--color-warning-text);" }], colorValue: "var(--color-warning-300)" },
  { id: "color-error", name: "Error", category: "foundation", group: "colors", status: D, placeholder: P, copyValue: "var(--color-error-text)", description: "Destructive/error state.", usage: "Error messages.", codeExamples: [{ label: "CSS", code: "color: var(--color-error-text);" }], colorValue: "var(--color-error-300)" },
];

// ── Typography ───────────────────────────────────────────
const typography: AssetItem[] = [
  { id: "type-heading-xl", name: "Heading XL", category: "foundation", group: "typography", status: D, placeholder: P, copyValue: "font-size: 2.25rem; font-weight: 700;", description: "Page title.", usage: "Top-level headings.", codeExamples: [{ label: "CSS", code: "font-size: 2.25rem;\nline-height: 1.2;\nfont-weight: 700;" }] },
  { id: "type-heading-lg", name: "Heading LG", category: "foundation", group: "typography", status: D, placeholder: P, copyValue: "font-size: 1.5rem; font-weight: 600;", description: "Section title.", usage: "Major sections.", codeExamples: [{ label: "CSS", code: "font-size: 1.5rem;\nline-height: 1.3;\nfont-weight: 600;" }] },
  { id: "type-heading-md", name: "Heading MD", category: "foundation", group: "typography", status: D, placeholder: P, copyValue: "font-size: 1.25rem; font-weight: 600;", description: "Card title.", usage: "Card headers, dialogs.", codeExamples: [{ label: "CSS", code: "font-size: 1.25rem;\nline-height: 1.4;\nfont-weight: 600;" }] },
  { id: "type-heading-sm", name: "Heading SM", category: "foundation", group: "typography", status: D, placeholder: P, copyValue: "font-size: 1rem; font-weight: 600;", description: "Label/group header.", usage: "Form labels, group titles.", codeExamples: [{ label: "CSS", code: "font-size: 1rem;\nline-height: 1.5;\nfont-weight: 600;" }] },
  { id: "type-body", name: "Body", category: "foundation", group: "typography", status: D, placeholder: P, copyValue: "font-size: 0.875rem;", description: "Standard body text.", usage: "Paragraphs, descriptions.", codeExamples: [{ label: "CSS", code: "font-size: 0.875rem;\nline-height: 1.6;" }] },
  { id: "type-body-sm", name: "Body Small", category: "foundation", group: "typography", status: D, placeholder: P, copyValue: "font-size: 0.75rem;", description: "Captions.", usage: "Timestamps, helper text.", codeExamples: [{ label: "CSS", code: "font-size: 0.75rem;\nline-height: 1.5;" }] },
  { id: "type-mono", name: "Monospace", category: "foundation", group: "typography", status: D, placeholder: P, copyValue: "font-family: var(--font-mono);", description: "Code font.", usage: "Code blocks, tokens.", codeExamples: [{ label: "CSS", code: "font-family: var(--font-mono);\nfont-size: 0.8125rem;" }] },
];

// ── Icons ────────────────────────────────────────────────
function ic(id: string, name: string, iconName: string, cat: "navigation"|"actions"|"status"|"content"|"communication"|"media", desc: string): AssetItem {
  return { id: `icon-${id}`, name, category: "foundation", group: "icons", status: D, placeholder: P, copyValue: `import { ${iconName} } from "lucide-react";`, description: desc, usage: `Use ${name} icon.`, codeExamples: [{ label: "Usage", code: `<${iconName} size={20} />` }], iconName, iconCategory: cat };
}
const icons: AssetItem[] = [
  ic("home", "Home", "Home", "navigation", "Home/dashboard."),
  ic("arrow-left", "Arrow Left", "ArrowLeft", "navigation", "Back navigation."),
  ic("arrow-right", "Arrow Right", "ArrowRight", "navigation", "Forward navigation."),
  ic("chevron-down", "Chevron Down", "ChevronDown", "navigation", "Expand indicator."),
  ic("chevron-right", "Chevron Right", "ChevronRight", "navigation", "Forward indicator."),
  ic("menu", "Menu", "Menu", "navigation", "Hamburger menu."),
  ic("x", "X / Close", "X", "navigation", "Close/dismiss."),
  ic("plus", "Plus", "Plus", "actions", "Add/create."),
  ic("trash", "Trash", "Trash2", "actions", "Delete."),
  ic("edit", "Edit", "Pencil", "actions", "Edit action."),
  ic("copy", "Copy", "Copy", "actions", "Copy to clipboard."),
  ic("download", "Download", "Download", "actions", "Download file."),
  ic("search", "Search", "Search", "actions", "Search/find."),
  ic("filter", "Filter", "Filter", "actions", "Filter list."),
  ic("settings", "Settings", "Settings", "actions", "Preferences."),
  ic("external-link", "External Link", "ExternalLink", "actions", "Open in new tab."),
  ic("check", "Check", "Check", "status", "Success/confirmed."),
  ic("alert-circle", "Alert Circle", "AlertCircle", "status", "Error/alert."),
  ic("info", "Info", "Info", "status", "Information."),
  ic("alert-triangle", "Warning", "AlertTriangle", "status", "Warning."),
  ic("x-circle", "X Circle", "XCircle", "status", "Error/rejected."),
  ic("loader", "Loader", "Loader2", "status", "Loading spinner."),
  ic("file", "File", "File", "content", "Generic file."),
  ic("file-text", "File Text", "FileText", "content", "Document."),
  ic("image", "Image", "ImageIcon", "content", "Image/photo."),
  ic("link", "Link", "Link2", "content", "Hyperlink."),
  ic("bookmark", "Bookmark", "Bookmark", "content", "Save/bookmark."),
  ic("tag", "Tag", "Tag", "content", "Label/tag."),
  ic("mail", "Mail", "Mail", "communication", "Email."),
  ic("message", "Message", "MessageSquare", "communication", "Chat/comment."),
  ic("bell", "Bell", "Bell", "communication", "Notification."),
  ic("send", "Send", "Send", "communication", "Send message."),
  ic("play", "Play", "Play", "media", "Play media."),
  ic("pause", "Pause", "Pause", "media", "Pause media."),
  ic("volume", "Volume", "Volume2", "media", "Audio volume."),
  ic("maximize", "Maximize", "Maximize", "media", "Fullscreen."),
  ic("minimize", "Minimize", "Minimize", "media", "Exit fullscreen."),
];

// ── Spacing ──────────────────────────────────────────────
const spacing: AssetItem[] = [
  { id: "space-1", name: "4px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-1)", description: "Tightest spacing.", usage: "Icon gaps.", codeExamples: [{ label: "CSS", code: "gap: var(--space-1);" }], spacingPx: 4 },
  { id: "space-2", name: "8px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-2)", description: "Small spacing.", usage: "Button padding.", codeExamples: [{ label: "CSS", code: "padding: var(--space-2);" }], spacingPx: 8 },
  { id: "space-3", name: "12px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-3)", description: "Compact spacing.", usage: "Compact cards.", codeExamples: [{ label: "CSS", code: "padding: var(--space-3);" }], spacingPx: 12 },
  { id: "space-4", name: "16px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-4)", description: "Base spacing.", usage: "Standard padding.", codeExamples: [{ label: "CSS", code: "padding: var(--space-4);" }], spacingPx: 16 },
  { id: "space-6", name: "24px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-6)", description: "Medium spacing.", usage: "Section padding.", codeExamples: [{ label: "CSS", code: "padding: var(--space-6);" }], spacingPx: 24 },
  { id: "space-8", name: "32px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-8)", description: "Large spacing.", usage: "Section breaks.", codeExamples: [{ label: "CSS", code: "margin: var(--space-8);" }], spacingPx: 32 },
  { id: "space-12", name: "48px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-12)", description: "XL spacing.", usage: "Page margins.", codeExamples: [{ label: "CSS", code: "padding: var(--space-12);" }], spacingPx: 48 },
  { id: "space-16", name: "64px", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--space-16)", description: "Max spacing.", usage: "Hero sections.", codeExamples: [{ label: "CSS", code: "padding: var(--space-16);" }], spacingPx: 64 },
  { id: "radius-sm", name: "Radius SM (4px)", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--radius-sm)", description: "Small radius.", usage: "Badges, code blocks.", codeExamples: [{ label: "CSS", code: "border-radius: var(--radius-sm);" }] },
  { id: "radius-md", name: "Radius MD (6px)", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--radius-md)", description: "Default radius.", usage: "Buttons, inputs.", codeExamples: [{ label: "CSS", code: "border-radius: var(--radius-md);" }] },
  { id: "radius-lg", name: "Radius LG (8px)", category: "foundation", group: "spacing", status: D, placeholder: P, copyValue: "var(--radius-lg)", description: "Card radius.", usage: "Cards, dialogs.", codeExamples: [{ label: "CSS", code: "border-radius: var(--radius-lg);" }] },
];

// ── Shadows ──────────────────────────────────────────────
const shadows: AssetItem[] = [
  { id: "shadow-sm", name: "Shadow SM", category: "foundation", group: "shadows", status: D, placeholder: P, copyValue: "var(--shadow-sm)", description: "Subtle elevation.", usage: "Buttons, small cards.", codeExamples: [{ label: "CSS", code: "box-shadow: var(--shadow-sm);" }] },
  { id: "shadow-md", name: "Shadow MD", category: "foundation", group: "shadows", status: D, placeholder: P, copyValue: "var(--shadow-md)", description: "Medium elevation.", usage: "Dropdowns, popovers.", codeExamples: [{ label: "CSS", code: "box-shadow: var(--shadow-md);" }] },
  { id: "shadow-lg", name: "Shadow LG", category: "foundation", group: "shadows", status: D, placeholder: P, copyValue: "var(--shadow-lg)", description: "High elevation.", usage: "Modals, dialogs.", codeExamples: [{ label: "CSS", code: "box-shadow: var(--shadow-lg);" }] },
];

// ── Components ───────────────────────────────────────────
const components: AssetItem[] = [
  { id: "comp-btn-primary", name: "Button Primary", category: "component", group: "buttons-actions", status: D, placeholder: P, copyValue: "<Button variant=\"primary\">Label</Button>", description: "Primary action button.", usage: "Main CTA, form submit.", codeExamples: [{ label: "JSX", code: '<Button variant="primary">Save</Button>' }] },
  { id: "comp-btn-secondary", name: "Button Secondary", category: "component", group: "buttons-actions", status: D, placeholder: P, copyValue: "<Button variant=\"secondary\">Label</Button>", description: "Secondary action.", usage: "Cancel, dismiss.", codeExamples: [{ label: "JSX", code: '<Button variant="secondary">Cancel</Button>' }] },
  { id: "comp-btn-danger", name: "Button Danger", category: "component", group: "buttons-actions", status: D, placeholder: P, copyValue: "<Button variant=\"danger\">Label</Button>", description: "Destructive action.", usage: "Delete, remove.", codeExamples: [{ label: "JSX", code: '<Button variant="danger">Delete</Button>' }] },
  { id: "comp-btn-icon", name: "Icon Button", category: "component", group: "buttons-actions", status: D, placeholder: P, copyValue: "<IconButton icon={Pencil} />", description: "Icon-only button.", usage: "Toolbars, compact actions.", codeExamples: [{ label: "JSX", code: "<IconButton icon={Pencil} />" }] },
  { id: "comp-input", name: "Text Input", category: "component", group: "inputs-forms", status: D, placeholder: P, copyValue: '<Input placeholder="..." />', description: "Standard text input.", usage: "Forms, search.", codeExamples: [{ label: "JSX", code: '<Input placeholder="Enter text..." />' }] },
  { id: "comp-textarea", name: "Textarea", category: "component", group: "inputs-forms", status: D, placeholder: P, copyValue: "<Textarea />", description: "Multi-line input.", usage: "Long-form text.", codeExamples: [{ label: "JSX", code: "<Textarea rows={4} />" }] },
  { id: "comp-select", name: "Select", category: "component", group: "inputs-forms", status: D, placeholder: P, copyValue: "<Select options={[...]} />", description: "Dropdown select.", usage: "Choose from options.", codeExamples: [{ label: "JSX", code: '<Select options={["A","B"]} />' }] },
  { id: "comp-checkbox", name: "Checkbox", category: "component", group: "inputs-forms", status: D, placeholder: P, copyValue: "<Checkbox />", description: "Checkbox input.", usage: "Multi-select, agreements.", codeExamples: [{ label: "JSX", code: "<Checkbox label=\"Accept\" />" }] },
  { id: "comp-toggle", name: "Toggle", category: "component", group: "inputs-forms", status: D, placeholder: P, copyValue: "<Toggle />", description: "On/off switch.", usage: "Boolean settings.", codeExamples: [{ label: "JSX", code: "<Toggle checked={on} onChange={setOn} />" }] },
  { id: "comp-badge", name: "Badge", category: "component", group: "feedback", status: D, placeholder: P, copyValue: '<Badge>Label</Badge>', description: "Small status label.", usage: "Counts, status.", codeExamples: [{ label: "JSX", code: '<Badge variant="success">Active</Badge>' }] },
  { id: "comp-toast", name: "Toast", category: "component", group: "feedback", status: D, placeholder: P, copyValue: "toast('Saved!')", description: "Temporary notification.", usage: "Action confirmations.", codeExamples: [{ label: "JSX", code: "toast({ message: 'Saved!' })" }] },
  { id: "comp-alert", name: "Alert", category: "component", group: "feedback", status: D, placeholder: P, copyValue: '<Alert>Message</Alert>', description: "Inline alert banner.", usage: "Persistent messages.", codeExamples: [{ label: "JSX", code: '<Alert variant="warning">Check input.</Alert>' }] },
  { id: "comp-progress", name: "Progress", category: "component", group: "feedback", status: D, placeholder: P, copyValue: "<Progress value={75} />", description: "Progress indicator.", usage: "Upload progress.", codeExamples: [{ label: "JSX", code: "<Progress value={75} max={100} />" }] },
  { id: "comp-skeleton", name: "Skeleton", category: "component", group: "feedback", status: D, placeholder: P, copyValue: "<Skeleton />", description: "Loading placeholder.", usage: "Content loading.", codeExamples: [{ label: "JSX", code: '<Skeleton className="h-4 w-48" />' }] },
  { id: "comp-avatar", name: "Avatar", category: "component", group: "data-display", status: D, placeholder: P, copyValue: '<Avatar src="..." />', description: "User avatar.", usage: "Profiles, user lists.", codeExamples: [{ label: "JSX", code: '<Avatar src="/avatar.jpg" size={32} />' }] },
  { id: "comp-tooltip", name: "Tooltip", category: "component", group: "data-display", status: D, placeholder: P, copyValue: '<Tooltip content="...">child</Tooltip>', description: "Hover tooltip.", usage: "Extra context.", codeExamples: [{ label: "JSX", code: '<Tooltip content="Info">Hover</Tooltip>' }] },
  { id: "comp-tag", name: "Tag / Chip", category: "component", group: "data-display", status: D, placeholder: P, copyValue: '<Tag>Label</Tag>', description: "Removable tag.", usage: "Filters, categories.", codeExamples: [{ label: "JSX", code: "<Tag onRemove={fn}>React</Tag>" }] },
];

// ── Patterns ─────────────────────────────────────────────
const patterns: AssetItem[] = [
  { id: "pattern-nav-bar", name: "Nav Bar", category: "pattern", group: "nav-bar", status: D, placeholder: P, copyValue: "<NavBar />", description: "Top navigation bar.", usage: "App header.", codeExamples: [{ label: "JSX", code: "<NavBar />" }] },
  { id: "pattern-sidebar", name: "Sidebar", category: "pattern", group: "sidebar", status: D, placeholder: P, copyValue: "<Sidebar />", description: "Vertical sidebar nav.", usage: "App sidebar.", codeExamples: [{ label: "JSX", code: "<Sidebar />" }] },
  { id: "pattern-card", name: "Card", category: "pattern", group: "card", status: D, placeholder: P, copyValue: "<Card />", description: "Content card.", usage: "Grouped content.", codeExamples: [{ label: "JSX", code: "<Card>Content</Card>" }] },
  { id: "pattern-modal", name: "Modal / Dialog", category: "pattern", group: "modal", status: D, placeholder: P, copyValue: "<Modal />", description: "Modal dialog.", usage: "Confirmations, forms.", codeExamples: [{ label: "JSX", code: "<Modal open={open}>Content</Modal>" }] },
  { id: "pattern-data-table", name: "Data Table", category: "pattern", group: "data-table", status: D, placeholder: P, copyValue: "<DataTable />", description: "Data table.", usage: "Tabular data.", codeExamples: [{ label: "JSX", code: "<DataTable columns={cols} data={rows} />" }] },
  { id: "pattern-form-layout", name: "Form Layout", category: "pattern", group: "form-layout", status: D, placeholder: P, copyValue: "<FormLayout />", description: "Structured form.", usage: "Settings, create forms.", codeExamples: [{ label: "JSX", code: "<FormLayout>...</FormLayout>" }] },
  { id: "pattern-search", name: "Search", category: "pattern", group: "search", status: D, placeholder: P, copyValue: "<SearchBar />", description: "Search bar.", usage: "Global search.", codeExamples: [{ label: "JSX", code: "<SearchBar onSearch={fn} />" }] },
];

export const assetRegistry: AssetItem[] = [...colors, ...typography, ...icons, ...spacing, ...shadows, ...components, ...patterns];

export function getAssetById(id: string) { return assetRegistry.find((a) => a.id === id); }
export function getAssetsByCategory(cat: AssetCategory) { return assetRegistry.filter((a) => a.category === cat); }
export function getAssetsByGroup(group: string) { return assetRegistry.filter((a) => a.group === group); }
export function getAssetsByStatus(status: AssetStatus) { return assetRegistry.filter((a) => a.status === status); }
export function getPlaceholders() { return assetRegistry.filter((a) => a.placeholder); }
export function getReadyCount() { return assetRegistry.filter((a) => a.status === "dev-ready").length; }
export function getTotalCount() { return assetRegistry.length; }
