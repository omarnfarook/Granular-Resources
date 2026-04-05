import { useRef, useEffect, useState } from "react";
import type { AssetItem } from "../data/assetRegistry";
import { getAssetById } from "../data/assetRegistry";
import CodeBlock from "./CodeBlock";

interface DocPanelProps {
  asset: AssetItem;
  open: boolean;
}

export default function DocPanel({ asset, open }: DocPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open, asset]);

  return (
    <div
      className="overflow-hidden transition-all"
      style={{
        maxHeight: open ? `${height}px` : "0px",
        opacity: open ? 1 : 0,
        transitionDuration: "250ms",
        transitionTimingFunction: "ease",
      }}
    >
      <div
        ref={contentRef}
        className="pt-3 mt-3 space-y-3"
        style={{ borderTop: "1px solid var(--ds-doc-border)" }}
      >
        {/* Description */}
        <div>
          <h4
            className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Description
          </h4>
          <p className="text-sm" style={{ color: "var(--ds-doc-text)" }}>
            {asset.description}
          </p>
        </div>

        {/* Usage Guidelines */}
        <div>
          <h4
            className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Usage
          </h4>
          <p className="text-sm" style={{ color: "var(--ds-doc-text)" }}>
            {asset.usage}
          </p>
        </div>

        {/* Don'ts */}
        {asset.doNots && asset.doNots.length > 0 && (
          <div>
            <h4
              className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-1"
              style={{ color: "var(--color-error-text)" }}
            >
              Don'ts
            </h4>
            <ul className="list-none p-0 m-0 space-y-1">
              {asset.doNots.map((d, i) => (
                <li
                  key={i}
                  className="text-sm flex items-start gap-1.5"
                  style={{ color: "var(--ds-doc-text)" }}
                >
                  <span style={{ color: "var(--color-error-text)" }}>✕</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Code Examples */}
        {asset.codeExamples.length > 0 && (
          <div>
            <h4
              className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              Code Examples
            </h4>
            <div className="space-y-2">
              {asset.codeExamples.map((ex, i) => (
                <CodeBlock key={i} label={ex.label} code={ex.code} />
              ))}
            </div>
          </div>
        )}

        {/* Related Tokens */}
        {asset.relatedIds && asset.relatedIds.length > 0 && (
          <div>
            <h4
              className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Related
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {asset.relatedIds.map((rid) => {
                const related = getAssetById(rid);
                return (
                  <span
                    key={rid}
                    className="inline-flex px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: "var(--color-bg-hover)",
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    {related?.name ?? rid}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Version info */}
        {(asset.addedVersion || asset.updatedVersion || asset.deprecationNote) && (
          <div
            className="text-[0.6875rem] space-y-0.5 pt-2"
            style={{
              color: "var(--color-text-muted)",
              borderTop: "1px solid var(--ds-doc-border)",
            }}
          >
            {asset.addedVersion && <div>Added in v{asset.addedVersion}</div>}
            {asset.updatedVersion && <div>Updated in v{asset.updatedVersion}</div>}
            {asset.deprecationNote && (
              <div style={{ color: "var(--color-error-text)" }}>
                Deprecated: {asset.deprecationNote}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
