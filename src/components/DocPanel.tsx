import { useRef, useEffect, useState, type ReactNode } from "react";
import type { AssetItem } from "../data/assetRegistry";
import { getAssetById } from "../data/assetRegistry";
import CopyButton from "./CopyButton";

interface DocPanelProps {
  asset: AssetItem;
  open: boolean;
}

export default function DocPanel({ asset, open }: DocPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (ref.current) setH(ref.current.scrollHeight); }, [open, asset]);

  return (
    <div
      className="overflow-hidden"
      style={{ maxHeight: open ? `${h}px` : "0px", opacity: open ? 1 : 0, transition: "max-height 200ms ease, opacity 200ms ease" }}
    >
      <div ref={ref} className="pt-3 mt-3 space-y-3 text-sm" style={{ borderTop: "1px solid var(--ds-doc-border)" }}>
        <Sec title="Description"><p style={{ color: "var(--ds-doc-text)" }}>{asset.description}</p></Sec>
        <Sec title="Usage"><p style={{ color: "var(--ds-doc-text)" }}>{asset.usage}</p></Sec>
        {asset.doNots && asset.doNots.length > 0 && (
          <Sec title="Don'ts" color="var(--color-error-text)">
            <ul className="list-none p-0 m-0 space-y-1">
              {asset.doNots.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5" style={{ color: "var(--ds-doc-text)" }}>
                  <span style={{ color: "var(--color-error-text)" }}>✕</span>{d}
                </li>
              ))}
            </ul>
          </Sec>
        )}
        {asset.codeExamples.length > 0 && (
          <Sec title="Code Examples">
            <div className="space-y-2">
              {asset.codeExamples.map((ex, i) => (
                <div key={i} className="rounded-md overflow-hidden" style={{ border: "1px solid var(--ds-code-border)" }}>
                  <div className="flex items-center justify-between px-3 py-1" style={{ backgroundColor: "var(--ds-code-bg)", borderBottom: "1px solid var(--ds-code-border)" }}>
                    <span className="text-[0.6875rem] font-medium" style={{ color: "var(--color-text-muted)" }}>{ex.label}</span>
                    <CopyButton value={ex.code} size={12} />
                  </div>
                  <pre className="p-3 text-[0.8125rem] leading-relaxed m-0 overflow-x-auto" style={{ backgroundColor: "var(--ds-code-bg)", color: "var(--ds-code-text)", fontFamily: "var(--font-mono)" }}>
                    <code>{ex.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </Sec>
        )}
        {asset.relatedIds && asset.relatedIds.length > 0 && (
          <Sec title="Related">
            <div className="flex flex-wrap gap-1.5">
              {asset.relatedIds.map((rid) => (
                <span key={rid} className="px-2 py-0.5 rounded text-[0.6875rem]" style={{ backgroundColor: "var(--color-bg-hover)", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
                  {getAssetById(rid)?.name ?? rid}
                </span>
              ))}
            </div>
          </Sec>
        )}
      </div>
    </div>
  );
}

function Sec({ title, color, children }: { title: string; color?: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-1" style={{ color: color ?? "var(--color-text-muted)" }}>{title}</h4>
      {children}
    </div>
  );
}
