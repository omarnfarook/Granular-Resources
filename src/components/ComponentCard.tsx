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
      className={`rounded-lg p-4 animate-fade-in ${className}`}
      style={{
        backgroundColor: "var(--ds-card-bg)",
        border: `1px ${asset.placeholder ? "dashed" : "solid"} var(--ds-card-border)`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <StatusBadge status={asset.status} />
        {asset.placeholder && (
          <span
            className="text-[0.625rem] px-1.5 py-0.5 rounded font-medium"
            style={{ backgroundColor: "var(--color-bg-hover)", color: "var(--color-text-muted)" }}
          >
            Placeholder
          </span>
        )}
        <div className="flex-1" />
        <CopyButton value={asset.copyValue} label />
        <button
          onClick={() => setDocsOpen((p) => !p)}
          className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md text-xs cursor-pointer transition-colors"
          style={{
            background: docsOpen ? "var(--color-accent-bg)" : "none",
            border: "none",
            color: docsOpen ? "var(--color-accent-text)" : "var(--color-text-muted)",
          }}
        >
          Docs
          <ChevronDown
            size={12}
            className="transition-transform"
            style={{ transform: docsOpen ? "rotate(180deg)" : "rotate(0)" }}
          />
        </button>
      </div>

      {/* Preview */}
      <div className="card-preview mb-3">{children}</div>

      {/* Name + description */}
      <div className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{asset.name}</div>
      <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{asset.description}</div>

      {/* Docs */}
      <DocPanel asset={asset} open={docsOpen} />
    </div>
  );
}
