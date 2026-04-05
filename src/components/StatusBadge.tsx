import type { AssetStatus } from "../data/assetRegistry";

interface StatusBadgeProps {
  status: AssetStatus;
  className?: string;
}

const config: Record<AssetStatus, { label: string; bg: string; text: string }> = {
  "dev-ready": {
    label: "Dev Ready",
    bg: "var(--ds-badge-ready-bg)",
    text: "var(--ds-badge-ready-text)",
  },
  "in-progress": {
    label: "In Progress",
    bg: "var(--ds-badge-progress-bg)",
    text: "var(--ds-badge-progress-text)",
  },
  deprecated: {
    label: "Deprecated",
    bg: "var(--ds-badge-deprecated-bg)",
    text: "var(--ds-badge-deprecated-text)",
  },
  draft: {
    label: "Draft",
    bg: "var(--ds-badge-draft-bg)",
    text: "var(--ds-badge-draft-text)",
  },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.6875rem] font-medium leading-none whitespace-nowrap ${className}`}
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {c.label}
    </span>
  );
}
