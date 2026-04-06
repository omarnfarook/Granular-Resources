import { useRef, useEffect, useState } from "react";
import type { AssetItem } from "../data/assetRegistry";
import { getAssetById } from "../data/assetRegistry";
import CopyButton from "./CopyButton";

interface DocPanelProps {
  asset: AssetItem;
  open: boolean;
}

export default function DocPanel({ asset, open }: DocPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [open, asset]);

  return (
    <div
      className="overflow-hidden transition-all"
      style={{
        maxHeight: open ? `${height}px` : "0px",
        opacity: open ? 1 : 0,
        transitionDuration: "200ms",
      }}
    >
      <div
        ref={ref}
        className="pt-3 mt-3 space-y-3 text-sm"
        style={{ borderTop: "1px solid var(--ds-doc-border)" }}
      >
        <Section title="Description">
          <p style={{ color: "var(--ds-doc-text)" }}>{asset.description}</p>
        </Section>

        <Section title="Usage">
          <p style={{ color: "var(--ds-doc-text)" }}>{asset.usage}</p>
        </Section>

        {asset.doNots && asset.doNots.length > 0 && (
          <Section title="Don'ts" titleColor="var(--color-error-text)">
            <ul className="list-none p-0 m-0 space-y-1">
              {asset.doNots.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5" style={{ color: "var(--ds-doc-text)" }}>
                  <span style={{ color: "var(--color-error-text)" }}>✕</span>
                  {d}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {asset.codeExamples.length > 0 && (
          <Section title="Code Examples">
            <div className="space-y-2">
              {asset.codeExamples.map((ex, i) => (
                <div key={i} className="rounded-md overflow-hidden" style={{ border: "1px solid var(--ds-code-border)" }}>
                  <div
                    className="flex items-center justify-between px-3 py-1"
                    style={{ backgroundColor: "var(--ds-code-bg)", borderBottom: "1px solid var(--ds-code-border)" }}
                  >
                    <span className="text-[0.6875rem] font-medium" style={{ color: "var(--color-text-muted)" }}>{ex.label}</span>
                    <CopyButton value={ex.code} size={12} />
                  </div>
                  <pre
                    className="p-3 text-[0.8125rem] leading-relaxed m-0 overflow-x-auto"
                    style={{ backgroundColor: "var(--ds-code-bg)", color: "var(--ds-code-text)", fontFamily: "var(--font-mono)" }}
                  >
                    <code>{ex.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </Section>
        )}

        {asset.relatedIds && asset.relatedIds.length > 0 && (
          <Section title="Related">
            <div className="flex flex-wrap gap-1.5">
              {asset.relatedIds.map((rid) => {
                const related = getAssetById(rid);
                return (
                  <span
                    key={rid}
                    className="px-2 py-0.5 rounded text-[0.6875rem]"
                    style={{ backgroundColor: "var(--color-bg-hover)", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
                  >
                    {related?.name ?? rid}
                  </span>
                );
              })}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, titleColor, children }: { title: string; titleColor?: string; children: React.ReactNode }) {
  return (
    <div>
      <h4
        className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-1"
        style={{ color: titleColor ?? "var(--color-text-muted)" }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}
