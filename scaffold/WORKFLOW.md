# WORKFLOW

This repo is a single-file UI preview scaffold. Read this before touching anything.

**Shell vs content.** The shell is chrome — sidebar, theme toggle, zoom widget, canvas. Content lives inside `<section class="shell-page" id="page-N">` elements. Anything class-prefixed `shell-*` (markup, CSS, JS, IDs like `shellZoom*`) is off-limits unless I explicitly ask for shell changes.

**Default target: the active page.** All design, styling, layout, and animation requests apply to the active page's content. Never the shell.

**Adding a page.** Exactly two edits: one `<button class="shell-nav-link" data-page="N">…</button>` inside `#shellNav`, and one matching `<section class="shell-page" id="page-N">…</section>` inside `#shellStage`. Nothing else.

**Theme tokens are shared.** `--bg`, `--text`, `--border`, `--muted` defined on `[data-theme]` flip both shell and content. Reuse existing tokens before adding new ones; if you add one, define both light and dark values.

**Scope page CSS.** Wrap each page's CSS under a class on its `<section>` (e.g. `.page-1-root .heading { … }`) so styles cannot leak into the shell or other pages.

**When ambiguous, assume content.** If a request could mean shell or content, treat it as content and ask before touching the shell.
