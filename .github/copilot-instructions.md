# Copilot / AI agent instructions for OPTOMweb

This repository is a small static website for OPTOMweb. Below are concise, actionable instructions to help an AI code assistant be immediately productive when making edits, fixes, or small enhancements.

- Project type: static HTML/CSS/JS site (no build system). Key files: `index.html`, `servicios.html`, `contacto.html` at repo root.
- Layout assets:
  - CSS: `css/` (includes `bootstrap.min.css`, `style.css`)
  - JS: `js/` (includes `bootstrap.bundle.js`, `main.js`)
  - Images/docs: `docs/` and `img/` (subfolders: `iconos/`, `logos/`, `proyectos/`, `servicios/`)

Quick orientation (why the layout is this way)
- The site is served as static files with all dependencies committed locally (Bootstrap CSS/JS are local). Expect changes to be live by opening the HTML files in a browser or running a lightweight static server.
- HTML files reference assets with relative paths (e.g., `css/`, `js/`, `docs/`), so maintain those relative locations when adding or moving files.

Common tasks and examples
- To change header/footer or navbar links: update `index.html` and mirror changes in `servicios.html` / `contacto.html`.
- To add a new image for a service: place the image under `docs/servicios/` or `img/` and reference it from the HTML using the same relative path. Example: `<img src="docs/servicios/new-image.jpg" alt="...">`.
- To edit styles: modify `css/style.css`. Avoid editing `bootstrap.min.css` unless updating Bootstrap.
- To edit client-side logic: modify `js/main.js`. Keep changes minimal and test by refreshing the page (no build step required).

Developer workflows (practical commands)
- Quick local preview (PowerShell):
  - Python (if installed): `python -m http.server 8000` from the repository root, then open `http://localhost:8000`.
  - VS Code: Use the Live Server extension or open the folder and right-click `index.html` -> "Open with Live Server".

Conventions and notable patterns
- Language: content and filenames contain Spanish (e.g., `servicios.html`, `contacto.html`) — preserve naming and navigation labels.
- No package manager or build pipeline present; patching files should not introduce tooling unless explicitly added and coordinated.
- Keep Bootstrap usage consistent: use Bootstrap classes rather than adding many inline styles.

Integration points and external dependencies
- There are no external service integrations in the current codebase (no server-side code or APIs visible). Expect purely client-side behavior.
- If adding external libraries, prefer adding them locally (consistent with current repo style) or clearly document any new CDN additions.

What to avoid / quick do's
- Avoid adding complex build tooling unless requested — keep the site static and simple.
- When editing images, preserve directory structure and update paths in HTML.
- Confirm changes by running the local server and visually checking `index.html` and any pages that share common fragments (header/footer).

Key files to inspect for patterns
- `index.html`, `servicios.html`, `contacto.html` — main pages and navigation examples.
- `css/style.css` — site-specific styles.
- `js/main.js` — page behavior and interactions.
- `docs/` and `img/` — where images and grouped assets live.

If something is unclear or you need more detailed conventions (naming rules for images, expected image sizes, or a design system), ask for specifics and I will update this file.

— end of guidance —
