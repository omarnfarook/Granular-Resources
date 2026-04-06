import type { AssetStatus } from "../data/assetRegistry";

const statusConfig: Record<AssetStatus, { color: string; bg: string; label: string }> = {
  "dev-ready": { color: "var(--color-success-text)", bg: "var(--color-success-bg)", label: "Dev Ready" },
  "in-progress": { color: "var(--color-warning-text)", bg: "var(--color-warning-bg)", label: "In Progress" },
  deprecated: { color: "var(--color-error-text)", bg: "var(--color-error-bg)", label: "Deprecated" },
  draft: { color: "var(--color-text-muted)", bg: "var(--color-surface)", label: "Draft" },
};

interface StatusBadgeProps {
  status: AssetStatus;
  compact?: boolean;
}

export function StatusBadge({ status, compact = false }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      title={compact ? config.label : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: compact ? "2px 6px" : "2px 10px",
        borderRadius: "var(--ds-badge-radius)",
        background: config.bg,
        fontSize: "var(--text-xs)",
        lineHeight: 1.5,
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: config.color,
          flexShrink: 0,
        }}
      />
      {!compact && (
        <span style={{ color: config.color, fontWeight: 500 }}>{config.label}</span>
      )}
    </span>
  );
}
