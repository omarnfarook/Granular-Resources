import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  value: string;
  size?: number;
}

export function CopyButton({ value, size = 14 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy code"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        border: "1px solid var(--color-border)",
        borderRadius: 6,
        background: "transparent",
        color: copied ? "var(--color-success-text)" : "var(--color-text-secondary)",
        cursor: "pointer",
        flexShrink: 0,
        padding: 0,
      }}
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
    </button>
  );
}
