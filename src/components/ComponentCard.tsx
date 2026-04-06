import type { ReactNode } from "react";
import type { AssetItem } from "../data/assetRegistry";
import { StatusBadge } from "./StatusBadge";
import { CopyButton } from "./CopyButton";
import { FileText } from "lucide-react";

interface ComponentCardProps {
  asset: AssetItem;
  preview: ReactNode;
  onToggleDocs: (id: string) => void;
  docsOpen: boolean;
}

export function ComponentCard({ asset, preview, onToggleDocs, docsOpen }: ComponentCardProps) {
  const isPlaceholder = asset.placeholder;

  return (
    <div
      style={{
        background: "var(--ds-card-bg)",
        border: `1px ${isPlaceholder ? "dashed" : "solid"} var(--ds-card-border)`,
        borderRadius: "var(--ds-card-radius)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header row — single flex row, no wrap */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: 12,
          borderBottom: "1px solid var(--ds-card-border)",
          flexWrap: "nowrap",
          minWidth: 0,
        }}
      >
        <StatusBadge status={asset.status} compact />
        {isPlaceholder && (
          <span
            style={{
              fontSize: "var(--text-xs)",
              padding: "1px 6px",
              borderRadius: 4,
              background: "var(--color-surface)",
              color: "var(--color-text-muted)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Placeholder
          </span>
        )}
        <span
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--color-text)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}
        >
          {asset.name}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, flexShrink: 0 }}>
          <CopyButton value={asset.copyValue} />
          <button
            onClick={() => onToggleDocs(asset.id)}
            title="Toggle docs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              border: `1px solid ${docsOpen ? "var(--color-primary)" : "var(--color-border)"}`,
              borderRadius: 6,
              background: docsOpen ? "var(--color-primary)" : "transparent",
              color: docsOpen ? "#fff" : "var(--color-text-secondary)",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <FileText size={14} />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div
        style={{
          padding: 12,
          maxHeight: 200,
          overflow: "hidden",
          opacity: isPlaceholder ? 0.7 : 1,
        }}
      >
        {preview}
      </div>

      {/* Description */}
      <div
        style={{
          padding: "0 12px 12px",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {asset.description}
      </div>
    </div>
  );
}
