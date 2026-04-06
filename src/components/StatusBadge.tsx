import type { AssetStatus } from "../data/assetRegistry";

interface StatusBadgeProps {
  status: AssetStatus;
  compact?: boolean;
}

const config: Record<AssetStatus, { label: string; dot: string; bg: string; text: string }> = {
  "dev-ready": { label: "Dev Ready", dot: "var(--ds-badge-ready-dot)", bg: "var(--ds-badge-ready-bg)", text: "var(--ds-badge-ready-text)" },
  "in-progress": { label: "In Progress", dot: "var(--ds-badge-progress-dot)", bg: "var(--ds-badge-progress-bg)", text: "var(--ds-badge-progress-text)" },
  deprecated: { label: "Deprecated", dot: "var(--ds-badge-deprecated-dot)", bg: "var(--ds-badge-deprecated-bg)", text: "var(--ds-badge-deprecated-text)" },
  draft: { label: "Draft", dot: "var(--ds-badge-draft-dot)", bg: "var(--ds-badge-draft-bg)", text: "var(--ds-badge-draft-text)" },
};

export default function StatusBadge({ status, compact }: StatusBadgeProps) {
  const c = config[status];
  if (compact) {
    return (
      <span
        className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: c.dot }}
        title={c.label}
      />
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[0.6875rem] font-medium leading-none whitespace-nowrap"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
      {c.label}
    </span>
  );
}
