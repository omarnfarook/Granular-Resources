import { useState, useCallback, type ReactNode } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import type { AssetItem } from "../data/assetRegistry";
import StatusBadge from "./StatusBadge";
import DocPanel from "./DocPanel";

interface ComponentCardProps {
  asset: AssetItem;
  children: ReactNode;
  className?: string;
}

export default function ComponentCard({ asset, children, className = "" }: ComponentCardProps) {
  const [docsOpen, setDocsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(asset.copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [asset.copyValue]);

  return (
    <div
      className={`rounded-lg p-4 transition-colors animate-fade-in ${className}`}
      style={{
        backgroundColor: "var(--ds-card-bg)",
        border: "1px solid var(--ds-card-border)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={asset.status} />
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs cursor-pointer transition-colors"
            style={{
              backgroundColor: copied ? "var(--color-success-bg)" : "transparent",
              color: copied ? "var(--color-success-text)" : "var(--color-text-muted)",
              border: "none",
            }}
            title={`Copy: ${asset.copyValue}`}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
          <button
            onClick={() => setDocsOpen((p) => !p)}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs cursor-pointer transition-colors"
            style={{
              backgroundColor: docsOpen ? "var(--color-accent-bg)" : "transparent",
              color: docsOpen ? "var(--color-accent-text)" : "var(--color-text-muted)",
              border: "none",
            }}
          >
            <span>Docs</span>
            <ChevronDown
              size={13}
              className="transition-transform"
              style={{ transform: docsOpen ? "rotate(180deg)" : "rotate(0)" }}
            />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="mb-3">{children}</div>

      {/* Name and description */}
      <div className="mb-1 text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
        {asset.name}
      </div>
      <div
        className="text-xs leading-relaxed"
        style={{ color: "var(--color-text-muted)" }}
      >
        {asset.description}
      </div>

      {/* Expandable docs */}
      <DocPanel asset={asset} open={docsOpen} />
    </div>
  );
}
