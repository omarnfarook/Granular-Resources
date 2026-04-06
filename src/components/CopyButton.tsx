import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  value: string;
  label?: boolean;
  size?: number;
}

export default function CopyButton({ value, label, size = 14 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
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
      className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md text-xs cursor-pointer transition-colors"
      style={{
        background: "none",
        border: "none",
        color: copied ? "var(--color-success-text)" : "var(--color-text-muted)",
      }}
      title={`Copy: ${value}`}
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
      {label && <span>{copied ? "Copied!" : "Copy"}</span>}
    </button>
  );
}
