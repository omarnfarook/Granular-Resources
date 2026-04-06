import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export function FormLayoutPattern() {
  const [name, setName] = useState("New Project");
  const [category, setCategory] = useState("Marketing");
  const [keywords, setKeywords] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ["Marketing", "Engineering", "Design", "Sales", "Product"];

  return (
    <div
      style={{
        width: 304,
        background: "var(--color-bg-raised)",
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.12)",
        borderRadius: 8,
        border: "0.8px solid var(--color-border)",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      {/* Header */}
      <div
        style={{
          width: 280,
          height: 40,
          paddingLeft: 12,
          paddingRight: 8,
          background: "var(--color-bg-raised)",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottom: "1px solid var(--color-border)",
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            paddingTop: 4,
            paddingBottom: 4,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              color: "var(--color-text)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            Page Settings
          </span>
        </div>
      </div>

      {/* Form body */}
      <div
        style={{
          alignSelf: "stretch",
          paddingTop: 8,
          paddingBottom: 4,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Name field */}
        <div
          style={{
            alignSelf: "stretch",
            height: 32,
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label
            style={{
              color: "var(--color-text-secondary)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: 160,
              height: 32,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 6,
              paddingBottom: 6,
              background: "var(--color-surface)",
              borderRadius: 6,
              border: "none",
              outline: "none",
              color: "var(--color-text-secondary)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "16px",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Category field */}
        <div
          style={{
            alignSelf: "stretch",
            height: 32,
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label
            style={{
              color: "var(--color-text-secondary)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            Category
          </label>
          <div style={{ position: "relative", width: 160, height: 32 }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: "100%",
                height: "100%",
                padding: 8,
                background: "var(--color-surface)",
                borderRadius: 6,
                border: "none",
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  flex: 1,
                  color: "var(--color-text)",
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: "16px",
                  textAlign: "left",
                }}
              >
                {category}
              </span>
              <ChevronDown
                size={16}
                style={{
                  color: "var(--color-text-muted)",
                  flexShrink: 0,
                  transform: dropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 150ms",
                }}
              />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 34,
                  left: 0,
                  width: 160,
                  background: "var(--color-bg-raised)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 6,
                  boxShadow: "var(--shadow-md)",
                  zIndex: 10,
                  overflow: "hidden",
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setDropdownOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      background: cat === category ? "var(--color-surface)" : "transparent",
                      border: "none",
                      color: "var(--color-text)",
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: "16px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Keywords field */}
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              display: "inline-flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label
              style={{
                color: "var(--color-text-secondary)",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: "16px",
              }}
            >
              Keywords
            </label>
            <button
              style={{
                height: 28,
                padding: 8,
                background: "var(--color-bg-raised)",
                borderRadius: 6,
                border: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
              }}
            >
              <Sparkles size={16} style={{ color: "var(--color-primary)" }} />
              <span
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: "16px",
                }}
              >
                AI
              </span>
            </button>
          </div>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Add keywords and separate them with commas."
            style={{
              alignSelf: "stretch",
              height: 64,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 6,
              paddingBottom: 6,
              background: "var(--color-surface)",
              borderRadius: 6,
              border: "none",
              outline: "none",
              color: "var(--color-text)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "16px",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
        </div>

        {/* Action buttons */}
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <button
            style={{
              alignSelf: "stretch",
              height: 28,
              padding: 8,
              background: "var(--color-bg-raised)",
              borderRadius: 6,
              border: "1px solid var(--color-border)",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "16px",
              fontFamily: "inherit",
            }}
          >
            Publish as a template
          </button>
          <button
            style={{
              alignSelf: "stretch",
              height: 28,
              padding: 8,
              background: "var(--color-primary)",
              borderRadius: 6,
              border: "none",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "16px",
              fontFamily: "inherit",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
