import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  label?: string;
  className?: string;
}

export default function CodeBlock({ code, label, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className={`rounded-md overflow-hidden ${className}`}>
      {label && (
        <div
          className="flex items-center justify-between px-3 py-1.5 text-[0.6875rem] font-medium"
          style={{
            backgroundColor: "var(--ds-code-bg)",
            color: "var(--color-text-muted)",
            borderBottom: "1px solid var(--ds-code-border)",
          }}
        >
          <span>{label}</span>
        </div>
      )}
      <div
        className="relative group"
        style={{ backgroundColor: "var(--ds-code-bg)" }}
      >
        <pre
          className="p-3 text-[0.8125rem] leading-relaxed overflow-x-auto m-0"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--ds-code-text)",
          }}
        >
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          style={{
            backgroundColor: "var(--color-bg-hover)",
            color: copied ? "var(--color-success-text)" : "var(--color-text-muted)",
          }}
          title="Copy code"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
    </div>
  );
}
