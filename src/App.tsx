import { useState, useCallback } from "react";
import { initTheme, applyTheme, type Theme } from "./components/ThemeSync";
import TopNav from "./components/TopNav";
import Home from "./components/Home";
import StyleKit, { type StyleKitTab } from "./StyleKit";

type Page =
  | { kind: "home" }
  | { kind: "stylekit"; tab: StyleKitTab };

export default function App() {
  const [theme, setTheme] = useState<Theme>(initTheme);
  const [page, setPage] = useState<Page>({ kind: "home" });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  const goHome = useCallback(() => setPage({ kind: "home" }), []);
  const goToTab = useCallback(
    (tab: StyleKitTab) => setPage({ kind: "stylekit", tab }),
    []
  );

  return (
    <div className="flex flex-col min-h-dvh">
      <TopNav
        onBack={page.kind !== "home" ? goHome : undefined}
        theme={theme}
        onToggleTheme={toggleTheme}
        title={page.kind === "stylekit" ? "Design System Explorer" : undefined}
      />

      {page.kind === "home" && <Home onNavigate={goToTab} />}
      {page.kind === "stylekit" && <StyleKit initialTab={page.tab} />}
    </div>
  );
}
