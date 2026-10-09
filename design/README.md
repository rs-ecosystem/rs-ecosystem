# Design reference

The source of truth is the Penpot file **"Rs Ecosystem"** (design.penpot.app), duplicated from the "Rs Password" file. Do not edit the "Rs Password" or "Rs Finance" files from here. Pages:

- **01 · Components** and **02 · Icons** are shared with Rs Password: shadcn/ui base-nova (neutral), Geist, Lucide (`lucide-react@0.474.0` paths), with tokens in the Penpot token sets `shadcn/*` and `custom/*`.
- **03–06** are copies of the Rs Password pages (flows, wireframes, desktop & extension, store preview). They are kept for reference, and the landing page reuses the Rs Password screenshots from "06 · Store preview".
- **07 · Landing Page** holds the Rs Ecosystem landing page and portfolio:
  - `Desktop · Landing · Light` (1440 wide)
  - `Mobile · Landing · Light` (390 wide)
  - `Asset · Rs Finance · …` (the Rs Finance screens shown inside the phone mockups). The phones hold clones, so after changing an asset, rebuild the phone that shows it.

Sections, in order: Navbar, Hero, Stats, Aplikasi (Rs Finance, Rs Password, "Segera hadir": Rs Organizer, Rs Storage, Rs Media, Rs LifeOS, then Rs Cloud), Prinsip, Teknologi, Roadmap, Tentang pembuat, FAQ, CTA, Footer. Copy is in Indonesian. The name, email and initials in "Tentang pembuat" are placeholders.

## Editing with the Penpot MCP

The Penpot MCP drives the open file through the "Penpot MCP Plugin" running in the browser tab. Keep that tab active or visible. Before writing, check `penpot.currentFile.name === "Rs Ecosystem"`. The plugin can only change the **active** page, so open the page first; it cannot clone shapes from other pages, though it can still read them.

Helpers for `execute_code`. Plugin storage resets whenever the tab reloads, so paste them again in that case:

1. `penpot/wireframe-helpers.js` → `storage.W`: boxes, text, component instances, icons and buttons, with colors bound to the tokens (copied from Rs Password).
2. `penpot/landing-helpers.js` → `storage.L`: phone mockups, app icon tile, pills, section kicker and headings, sections and dividers, and buttons with a trailing icon.

Gotchas:
- After building, call `W.relayout(root)` (or `W.done`): auto-sized boards do not re-measure text created in the same call.
- A fill set by hand right after `W.t(...)` can be overwritten when the token binding is applied asynchronously. Set custom text colors after `W.relayout`, or set them again in a separate call.

## Tokens and measurements

The same as Rs Password / Rs Finance; see `tokens.json` (mirrored in `app/globals.css`) and `rs-password/design/README.md` for component sizes. Landing-specific:

| Item | Value |
|---|---|
| Desktop content | 1200 wide (padding 120); sections padded 112 top and bottom; 1 px `border` dividers between sections |
| Mobile content | padding 16; sections padded 56 top and bottom |
| Headline | 60/600 (mobile 36), line height 1.08, letter spacing −1.8 |
| Section title | 40/600 (36 in two-column sections, 28 on mobile), letter spacing −0.8; kicker 12/600 uppercase |
| Body text | 17–18 / line height 1.6, `muted-foreground` |
| Cards | `card` bg, 1 px `border`, radius 16–20, padding 24–28 |
| "Segera hadir" cards | `sidebar` bg, 1.5 px dashed #D4D4D4 border |
| Hero background | linear gradient #FFFFFF → #F4F6F9 → #EBEFF5, plus a radial #D6E2F3 glow (same as the Rs Password store hero) |
| Phone mockup | 414×868 bezel #0B0B0C, radius 58; screen 390×844, radius 46; shadow 0/30/60 at 18% |
| App icon | #262626 tile, radius 23%, Rs mark in #F5F5F5 |
