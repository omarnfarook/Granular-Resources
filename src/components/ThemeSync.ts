export type Theme = "dark" | "light";
const KEY = "ds-explorer-theme";
export function getInitialTheme(): Theme {
  const s = localStorage.getItem(KEY);
  if (s === "dark" || s === "light") return s;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
export function applyTheme(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem(KEY, t);
}
export function initTheme(): Theme {
  const t = getInitialTheme();
  applyTheme(t);
  return t;
}
