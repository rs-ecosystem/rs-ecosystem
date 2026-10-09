// Penpot MCP helpers for page "07 · Landing Page" (file "Rs Ecosystem").
// Paste wireframe-helpers.js first (it sets storage.W), then this file (it sets storage.L).
// Plugin storage resets when Penpot reloads, so paste both again whenever storage.L is missing.
// The plugin can only change the active page: open "07 · Landing Page" before building.
const W = storage.W, U = penpotUtils, P = penpot;
if (P.currentFile.name !== "Rs Ecosystem") throw new Error("wrong file: " + P.currentFile.name);
const L = {};
// Rs Password screenshots (3x image fills) from the store hero on "06 · Store preview": read-only reuse.
const pg6 = U.getPageByName("06 · Store preview"); const hero6 = pg6.root.children.find(c => c.name.startsWith("Hero"));
L.img = {}; for (const ph of hero6.children.filter(c => c.name.startsWith("iPhone"))) L.img[ph.name.replace("iPhone 18 Pro · ", "")] = ph.children.find(k => k.name === "Screen").fills;
L.markComp = P.library.local.components.find(c => c.name === "Rs mark");
L.shadow = (s, y = 24, blur = 48, op = 0.16) => { s.shadows = [{ style: "drop-shadow", offsetX: 0, offsetY: y, blur, spread: 0, hidden: false, color: { color: "#000000", opacity: op } }]; };
// Phone: 414×868 bezel around a 390×844 screen, filled with an image (o.img) or a clone of a live 390×844 board (o.board = id).
L.phone = (parent, name, o) => { const f = W.box(parent, "Phone · " + name, { w: 414, h: 868, r: 58 }); f.fills = [{ fillColor: "#0B0B0C", fillOpacity: 1 }]; f.strokes = [{ strokeColor: "#3A3A3C", strokeOpacity: 1, strokeWidth: 2, strokeAlignment: "inner" }];
  const scr = W.box(f, "Screen", { w: 390, h: 844, r: 46, x: 12, y: 12 }); scr.clipContent = true; scr.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }];
  if (o.img) { const r = P.createRectangle(); r.name = "Screenshot"; scr.appendChild(r); r.resize(390, 844); U.setParentXY(r, 0, 0); r.fills = o.img; }
  if (o.board) { const b = U.findShapeById(o.board).clone(); scr.appendChild(b); U.setParentXY(b, 0, 0); }
  const di = W.box(f, "Dynamic Island", { w: 120, h: 34, r: 17, x: 147, y: 23 }); di.fills = [{ fillColor: "#000000", fillOpacity: 1 }];
  if (o.shadow !== false) L.shadow(f, 30, 60, 0.18); return f; };
// App icon tile: Rs mark on #262626 (as in the app icons); o.word adds a wordmark under it (e.g. "finance").
L.appIcon = (parent, size = 40, o = {}) => { const t = W.box(parent, "App icon", { w: size, h: size, r: Math.round(size * 0.23), dir: "column", align: "center", justify: "center", gap: Math.round(size * 0.04), lh: "fix", lv: "fix" }); t.fills = [{ fillColor: "#262626", fillOpacity: 1 }];
  const m = L.markComp.instance(); t.appendChild(m); const mw = Math.round(size * (o.word ? 0.5 : 0.62)); m.resize(mw, Math.round(mw * 29 / 48));
  for (const p of U.findShapes(s => s.type === "path", m)) p.fills = [{ fillColor: "#F5F5F5", fillOpacity: 1 }];
  if (o.word) W.t(t, o.word, { size: Math.max(7, Math.round(size * 0.16)), w: 600 }).fills = [{ fillColor: "#F5F5F5", fillOpacity: 1 }];
  return t; };
L.pill = (parent, label, icon, o = {}) => { const p = W.box(parent, "Pill · " + label, { dir: "row", gap: 8, align: "center", pad: o.pad || [6, 14, 6, 12], r: 999, border: "border", bg: "background" }); L.shadow(p, 1, 3, 0.05);
  if (o.dot) W.box(p, "Dot", { w: 8, h: 8, r: 4, bg: o.dot }); if (icon) W.icon(p, icon, 16, o.iconColor); W.t(p, label, { size: o.size || 13, w: 500 }); if (o.trail) W.icon(p, o.trail, 16, "muted-foreground"); return p; };
// Section kicker: 16 px rule + uppercase 12/600 label.
L.kicker = (parent, label) => { const k = W.box(parent, "Kicker", { dir: "row", gap: 8, align: "center" }); W.box(k, "Line", { w: 16, h: 2, r: 1, bg: "foreground" }); W.t(k, label.toUpperCase(), { size: 12, w: 600, ls: 1.2, color: "muted-foreground" }); return k; };
L.heading = (parent, kicker, title, sub, o = {}) => { const h = W.box(parent, "Heading · " + title, { dir: "column", gap: 14, align: o.center ? "center" : "start", hs: o.center ? "fill" : undefined }); if (kicker) L.kicker(h, kicker);
  W.t(h, title, { size: o.size || 40, w: 600, lh: 1.15, ls: -0.8, width: o.width || 720, align: o.center ? "center" : "left" }); if (sub) W.t(h, sub, { size: 17, lh: 1.6, color: "muted-foreground", width: o.subWidth || 620, align: o.center ? "center" : "left" }); return h; };
// Desktop section: padding 112/120 (content width 1200).
L.section = (root, name, o = {}) => W.box(root, "Section · " + name, { dir: "column", gap: o.gap ?? 48, pad: o.pad || [112, 120, 112, 120], hs: "fill", align: o.align, bg: o.bg });
L.sep = (root) => { const s = W.box(root, "Divider", { h: 1, bg: "border", hs: "fill", lv: "fix" }); s.resize(1440, 1); s.layoutChild.horizontalSizing = "fill"; return s; };
// Button with a trailing icon (W.btn puts it in front).
L.btnT = (parent, label, icon, o = {}) => { const b = W.btn(parent, label, { ...o, icon }); const i = b.children.find(k => k.type !== "text"); if (i) i.setParentIndex(0); return b; };
storage.L = L;
