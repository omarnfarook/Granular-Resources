import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { AssetItem } from "../data/assetRegistry";
import StatusBadge from "./StatusBadge";
import CopyButton from "./CopyButton";
import DocPanel from "./DocPanel";

interface ComponentCardProps {
  asset: AssetItem;
  children: ReactNode;
  className?: string;
}

export default function ComponentCard({ asset, children, className = "" }: ComponentCardProps) {
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <div
      data-placeholder={asset.placeholder}
      className={`rounded-lg overflow-hidden animate-fade-in ${className}`}
      style={{
        backgroundColor: "var(--ds-card-bg)",
        border: `1px ${asset.placeholder ? "dashed" : "solid"} var(--ds-card-border)`,
        padding: "12px",
      }}
    >
      {/* Header row — single line, no wrap */}
      <div className="flex items-center gap-1.5 mb-3" style={{ flexWrap: "nowrap" }}>
        <StatusBadge status={asset.status} compact />
        {asset.placeholder && (
          <span className="text-[0.5625rem] px-1 py-0.5 rounded font-medium shrink-0" style={{ backgroundColor: "var(--color-bg-hover)", color: "var(--color-text-muted)" }}>
            Placeholder
          </span>
        )}
        <div className="ml-auto flex items-center gap-0.5 shrink-0">
          <CopyButton value={asset.copyValue} size={13} />
          <button
            onClick={() => setDocsOpen((p) => !p)}
            className="inline-flex items-center gap-0.5 px-1.5 py-1 rounded-md text-[0.6875rem] cursor-pointer shrink-0"
            style={{
              background: docsOpen ? "var(--color-accent-bg)" : "none",
              border: "none",
              color: docsOpen ? "var(--color-accent-text)" : "var(--color-text-muted)",
            }}
          >
            Docs
            <ChevronDown size={11} style={{ transform: docsOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 150ms" }} />
          </button>
        </div>
      </div>

      {/* Preview — capped height */}
      <div className="card-preview mb-2" style={{ maxHeight: "120px", overflow: "hidden" }}>{children}</div>

      {/* Name + description — truncate */}
      <div className="text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>{asset.name}</div>
      <div className="text-xs mt-0.5 truncate" style={{ color: "var(--color-text-muted)" }}>{asset.description}</div>

      <DocPanel asset={asset} open={docsOpen} />
    </div>
  );
}
