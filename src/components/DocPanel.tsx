import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { AssetItem } from "../data/assetRegistry";
import { getAssetById } from "../data/assetRegistry";

interface DocPanelProps {
  asset: AssetItem;
  open: boolean;
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 500 }}>
          {label}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "transparent",
            border: "none",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            fontSize: "var(--text-xs)",
            padding: "2px 4px",
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        style={{
          background: "var(--color-bg)",
          border: "1px solid var(--ds-doc-border)",
          borderRadius: 6,
          padding: "8px 12px",
          margin: 0,
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          lineHeight: 1.6,
          overflow: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "var(--color-text)",
        }}
      >
        {code}
      </pre>
    </div>
  );
}

export function DocPanel({ asset, open }: DocPanelProps) {
  if (!open) return null;

  const related = (asset.relatedIds ?? [])
    .map(getAssetById)
    .filter((a): a is AssetItem => !!a);

  return (
    <div
      style={{
        flexShrink: 0,
        borderBottom: "1px solid var(--ds-doc-border)",
        background: "var(--ds-doc-bg)",
        padding: "12px 20px",
        overflow: "auto",
        maxHeight: 300,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left column */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 4px", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text)" }}>
              Description
            </h4>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              {asset.description}
            </p>
          </div>

          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 4px", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text)" }}>
              Usage
            </h4>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              {asset.usage}
            </p>
          </div>

          {asset.doNots && asset.doNots.length > 0 && (
            <div>
              <h4 style={{ margin: "0 0 4px", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-error-text)" }}>
                Don'ts
              </h4>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                {asset.doNots.map((d, i) => (
                  <li key={i} style={{ marginBottom: 2 }}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {related.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text)" }}>
                Related
              </h4>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {related.map((r) => (
                  <span
                    key={r.id}
                    style={{
                      fontSize: "var(--text-xs)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "var(--color-surface)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {r.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column — code examples */}
        <div>
          <h4 style={{ margin: "0 0 8px", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text)" }}>
            Code Examples
          </h4>
          {asset.codeExamples.map((ex, i) => (
            <CodeBlock key={i} label={ex.label} code={ex.code} />
          ))}
        </div>
      </div>
    </div>
  );
}
