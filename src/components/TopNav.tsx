import { ArrowLeft, Sun, Moon } from "lucide-react";
import type { Theme } from "./ThemeSync";

interface TopNavProps {
  onBack?: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  title?: string;
}

export default function TopNav({ onBack, theme, onToggleTheme, title }: TopNavProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-2.5"
      style={{
        backgroundColor: "var(--ds-nav-bg)",
        borderBottom: "1px solid var(--ds-nav-border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-sm cursor-pointer transition-colors"
            style={{
              color: "var(--color-text-secondary)",
              backgroundColor: "transparent",
              border: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-bg-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>
        )}
        {title && (
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {title}
          </span>
        )}
      </div>

      <button
        onClick={onToggleTheme}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors"
        style={{
          color: "var(--color-text-secondary)",
          backgroundColor: "var(--color-bg-tertiary)",
          border: "1px solid var(--color-border-subtle)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-border-default)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-border-subtle)")
        }
      >
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    </nav>
  );
}
