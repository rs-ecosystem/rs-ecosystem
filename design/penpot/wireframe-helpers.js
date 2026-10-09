// Penpot MCP helper library for building wireframes on page "04 · Wireframes" (file "Rs Password").
// Paste this file's content into `execute_code` (it ends with `storage.W = W`); plugin storage
// resets when Penpot reloads, so re-run it whenever `storage.W` is missing.
// Uses real shadcn component instances from page "01 · Components" and Lucide icons from "02 · Icons".
const P = penpot, U = penpotUtils;
const geist = P.fonts.all.find(f => f.name === "Geist"); const V = w => geist.variants.find(v => String(v.fontWeight) === String(w) && v.fontStyle === "normal");
const tk = n => { const t = U.findTokenByName(n); if (!t) throw new Error("token " + n); return t; };
const W = {};
W.tk = tk; W.geist = geist; W.V = V;
W.fill = (s, n) => { const t = tk(n); s.fills = [{ fillColor: t.resolvedValue.slice(0, 7), fillOpacity: 1 }]; s.applyToken(t, ["fill"]); };
W.stroke = (s, n, w = 1, align = "inner") => { const t = tk(n); s.strokes = [{ strokeColor: t.resolvedValue.slice(0, 7), strokeOpacity: 1, strokeWidth: w, strokeAlignment: align }]; s.applyToken(t, ["strokeColor"]); };
W.size = (s, o) => { if (!s.layoutChild) return; if (o.hs) s.layoutChild.horizontalSizing = o.hs; if (o.vs) s.layoutChild.verticalSizing = o.vs; };
W.box = (parent, name, o = {}) => { const b = P.createBoard(); b.name = name; b.fills = []; if (o.w || o.h) b.resize(o.w || 100, o.h || 100); if (parent) parent.appendChild(b);
  if (o.bg) W.fill(b, o.bg); if (o.border) W.stroke(b, o.border, o.bw || 1); if (o.r != null) b.borderRadius = o.r;
  if (o.dir) { const l = b.addFlexLayout(); l.dir = o.dir; l.rowGap = o.gap || 0; l.columnGap = o.gap || 0; l.alignItems = o.align || "start"; l.justifyContent = o.justify || "start"; if (o.wrap) l.wrap = "wrap";
    const p = o.pad == null ? [0, 0, 0, 0] : Array.isArray(o.pad) ? (o.pad.length === 2 ? [o.pad[0], o.pad[1], o.pad[0], o.pad[1]] : o.pad) : [o.pad, o.pad, o.pad, o.pad];
    l.topPadding = p[0]; l.rightPadding = p[1]; l.bottomPadding = p[2]; l.leftPadding = p[3];
    l.horizontalSizing = o.lh || (o.w ? "fix" : "auto"); l.verticalSizing = o.lv || (o.h ? "fix" : "auto"); }
  if (parent) W.size(b, o); if (o.x != null) U.setParentXY(b, o.x, o.y || 0); return b; };
W.t = (parent, str, o = {}) => { const t = P.createText(str); geist.applyToText(t, V(o.w || 400)); t.fontSize = o.size || 14; t.lineHeight = o.lh || (o.size >= 24 ? 1.25 : o.size <= 12 ? 1.34 : 1.43); if (o.ls) t.letterSpacing = o.ls; t.name = o.name || "Text"; W.fill(t, o.color || "foreground");
  if (parent) parent.appendChild(t); if (o.width) { t.growType = "auto-height"; t.resize(o.width, 20); } else t.growType = "auto-width"; if (o.align) t.align = o.align; if (parent) W.size(t, o);
  if (o.width && t.layoutChild) { t.layoutChild.verticalSizing = "auto"; t.growType = "auto-height"; } if (o.x != null) U.setParentXY(t, o.x, o.y || 0); return t; };
const p1 = U.getPageByName("01 · Components"); const vc = {}; const walk = (s, d) => { if (d > 4) return; if (s.type === "board" && s.isVariantContainer && s.isVariantContainer()) { vc[s.name] = s; return; } if (s.children) for (const k of s.children) walk(k, d + 1); }; for (const s of p1.root.children) walk(s, 0);
W.vc = vc; W.cache = {};
W.comp = (name, props) => { const key = name + JSON.stringify(props); if (W.cache[key]) return W.cache[key]; const cont = W.vc[name]; if (!cont) throw new Error("no container " + name);
  const k = cont.children.find(k => { const c = k.component && k.component(); const vp = c && c.variantProps; return vp && Object.entries(props).every(([a, b]) => vp[a] === b); }); if (!k) throw new Error("no variant " + key); return (W.cache[key] = k.component()); };
W.plain = (path, name) => { const c = P.library.local.components.find(c => (c.path || "").trim() === path && c.name === name) || P.library.local.components.find(c => c.name === name && !(c.path || "").trim()); if (!c) throw new Error("no comp " + path + "/" + name); return c; };
W.setText = (root, map) => { for (const [n, v] of Object.entries(map)) { const t = U.findShape(s => s.type === "text" && s.name === n, root); if (t) t.characters = v; } };
W.inst = (parent, name, props, o = {}) => { const c = props ? W.comp(name, props) : W.plain(o.path || "", name); const i = c.instance(); if (parent) parent.appendChild(i); if (o.text) W.setText(i, o.text); if (o.w) i.resize(o.w, i.height); if (parent) W.size(i, o); return i; };
const ip = U.getPageByName("02 · Icons"); W.icons = {}; for (const s of ip.root.children) if (s.name.startsWith("Icons · ")) for (const k of s.children) if (k.type === "board" && /^icon ?\/ ?/.test(k.name)) W.icons[k.name.replace(/^icon ?\/ ?/, "")] = k;
W.icon = (parent, name, size = 16, color) => { const real = W.icons[name] ? name : "circle-help"; const cont = W.icons[real]; const key = "icon:" + real + size; let c = W.cache[key];
  if (!c) { const k = cont.children.find(k => { const cc = k.component && k.component(); return cc && cc.variantProps && cc.variantProps.Size === String(size); }); c = W.cache[key] = k.component(); }
  const i = c.instance(); if (parent) parent.appendChild(i); if (color && color !== "foreground") { const p = U.findShape(s => s.type === "path", i); if (p) { const t = tk(color); p.strokes = [{ ...p.strokes[0], strokeColor: t.resolvedValue.slice(0, 7) }]; p.applyToken(t, ["strokeColor"]); } } return i; };
// Button instances can't take new children: detach before swapping the icon.
W.iconBtn = (parent, icon, variant = "ghost", size = "icon", o = {}) => { const b = W.inst(parent, "Button", { Variant: variant, Size: size }, o); b.detach(); for (const k of [...b.children]) if (k.type === "group") k.remove(); W.icon(b, icon, size === "icon-lg" ? 20 : 16, o.color || (variant === "default" ? "primary-foreground" : "foreground")); b.name = "Button · " + icon; return b; };
W.screen = (name, x, y, o = {}) => { const f = W.box(null, "Mobile · " + name, { w: 390, h: 844, bg: "background" }); f.x = x; f.y = y; f.clipContent = true;
  const sb = W.box(f, "Status bar", { w: 390, h: 54, dir: "row", align: "center", justify: "space-between", pad: [0, 28, 0, 32], x: 0, y: 0 });
  W.t(sb, "9:41", { size: 16, w: 600 }); const r = W.box(sb, "Icons", { dir: "row", gap: 6, align: "center" }); W.icon(r, "wifi", 16); W.t(r, "100%", { size: 12, w: 600 });
  const tabH = o.tab ? 84 : 0;
  const body = W.box(f, "Body", { w: 390, h: 844 - 54 - tabH - (o.footer ? 96 : 0), dir: "column", gap: o.gap ?? 16, pad: o.pad ?? [8, 16, 24, 16], x: 0, y: 54, lh: "fix", lv: "fix", align: o.align }); body.clipContent = true;
  if (o.tab) { const tb = W.box(f, "Tab bar", { w: 390, h: 84, dir: "row", justify: "space-between", align: "start", pad: [8, 20, 0, 20], bg: "background", x: 0, y: 760 });
    W.box(f, "Tab bar border", { w: 390, h: 1, bg: "border", x: 0, y: 760 });
    for (const [id, label, icon] of o.tabItems || W.TABS) { // [[id, label, icon], …]; id "add" draws the center + button
      if (id === "add") { const a = W.box(tb, "Tab · Tambah", { w: 52, h: 52, r: 26, bg: "primary", dir: "row", align: "center", justify: "center", lh: "fix", lv: "fix" }); W.icon(a, "plus", 24, "primary-foreground"); continue; }
      const on = o.tab === id; const it = W.box(tb, "Tab · " + label, { w: 64, dir: "column", gap: 4, align: "center", pad: [4, 0, 0, 0], lh: "fix" }); W.icon(it, icon, 24, on ? "foreground" : "muted-foreground"); W.t(it, label, { size: 11, w: on ? 600 : 500, color: on ? "foreground" : "muted-foreground" }); } }
  if (o.footer) { const ft = W.box(f, "Footer", { w: 390, h: 96, dir: o.footerRow ? "row" : "column", gap: 12, pad: [12, 16, 34, 16], bg: "background", x: 0, y: 748, lh: "fix", lv: "fix" }); W.box(f, "Footer border", { w: 390, h: 1, bg: "border", x: 0, y: 748 }); W.lastFooter = ft; }
  W.lastFrame = f; return body; };
// Default mobile tab bar of Rs Password.
W.TABS = [["vault", "Brankas", "vault"], ["totp", "Kode 2FA", "shield-check"], ["add", "", "plus"], ["gen", "Generator", "dices"], ["set", "Pengaturan", "settings"]];
W.header = (parent, title, o = {}) => { const hd = W.box(parent, "Header", { dir: "row", justify: "space-between", align: "center", hs: "fill", gap: 8 });
  if (o.back) { const l = W.box(hd, "Left", { dir: "row", gap: 4, align: "center" }); W.iconBtn(l, o.backIcon || "chevron-left", "ghost", "icon"); W.t(l, title, { size: 16, w: 600 }); }
  else { const ht = W.box(hd, "Title", { dir: "column", gap: 2 }); if (o.kicker) W.t(ht, o.kicker, { size: 12, color: "muted-foreground" }); W.t(ht, title, { size: 24, w: 600 }); }
  if (o.actions && o.actions.length) { const r = W.box(hd, "Actions", { dir: "row", gap: 8, align: "center" }); for (const a of o.actions) { if (a.icon) W.iconBtn(r, a.icon, a.variant || "outline", "icon"); else W.inst(r, "Button", { Variant: a.variant || "outline", Size: "sm" }, { text: { Label: a.label } }); } } return hd; };
W.card = (parent, name, o = {}) => W.box(parent, name, { dir: "column", gap: o.gap ?? 12, pad: o.pad ?? 16, border: "border", r: 14, bg: "card", hs: "fill", ...o });
W.section = (parent, title, action) => { const h = W.box(parent, "Section header · " + title, { dir: "row", justify: "space-between", align: "center", hs: "fill" }); W.t(h, title, { size: 16, w: 600 }); if (action) W.inst(h, "Button", { Variant: "link", Size: "sm" }, { text: { Label: action } }); return h; };
// List row: 40 px muted icon circle, title 14/500 + optional subtitle 12 muted, optional trailing text / chevron.
W.row = (parent, icon, title, sub, o = {}) => { const r = W.box(parent, "Row · " + title, { dir: "row", gap: 12, align: "center", pad: o.pad || [10, 0, 10, 0], hs: "fill" });
  const ic = W.box(r, "Icon", { w: 40, h: 40, r: o.square ? 10 : 20, bg: "muted", dir: "row", align: "center", justify: "center", lh: "fix", lv: "fix" }); W.icon(ic, icon, 20);
  const tx = W.box(r, "Text", { dir: "column", gap: 2, hs: "fill" }); W.t(tx, title, { size: 14, w: 500 }); if (sub) W.t(tx, sub, { size: 12, color: "muted-foreground" });
  if (o.trailing) W.t(r, o.trailing, { size: 12, color: "muted-foreground" }); if (o.chevron) W.icon(r, "chevron-right", 16, "muted-foreground"); return r; };
W.tabs = (parent, labels, active = 0) => { const tabs = W.inst(parent, "List", null, { path: "Tabs", hs: "fill" }); tabs.detach(); const trig = tabs.children.filter(k => k.name.includes("Trigger"));
  trig.slice(labels.length).forEach(t => t.remove());
  labels.forEach((l, i) => { try { trig[i].switchVariant(1, i === active ? "active" : "inactive"); } catch (e) {} const t2 = tabs.children.filter(k => k.name.includes("Trigger"))[i]; U.findShape(s => s.type === "text", t2).characters = l; if (t2.layoutChild) t2.layoutChild.horizontalSizing = "fill"; });
  return tabs; };
W.field = (parent, label, comp, props, value, help) => { const f = W.box(parent, "Field · " + label, { dir: "column", gap: 8, hs: "fill" }); W.t(f, label, { size: 14, w: 500 }); W.inst(f, comp, props, { text: { Value: value }, hs: "fill" }); if (help) W.t(f, help, { size: 12, color: "muted-foreground", width: 358, hs: "fill" }); return f; };
W.progress = (parent, pct, o = {}) => { const w = o.w || 326, h = o.h || 6; const tr = W.box(parent, "Progress", { h, r: 3, bg: "muted", hs: "fill", lv: "fix", dir: "row" }); tr.clipContent = true; tr.resize(w, h);
  W.box(tr, "Fill", { w: Math.max(1, Math.round(w * pct)), h, r: 3, bg: o.color || "primary", lh: "fix", lv: "fix" }); return tr; };
W.badge = (parent, text, variant = "secondary") => W.inst(parent, "Badge", { Variant: variant }, { text: { Label: text } });
W.clone = (id, name, x, y) => { const s = P.currentPage.root.children.find(s => s.id === id); const c = s.clone(); c.name = "Mobile · " + name; c.x = x; c.y = y; return c; };
W.scrim = (frame, w = 390, h = 844) => { const r = P.createRectangle(); r.name = "Scrim"; frame.appendChild(r); r.resize(w, h); U.setParentXY(r, 0, 0); r.fills = [{ fillColor: "#000000", fillOpacity: 0.5 }]; return r; };
W.sheet = (frame, title, h) => { W.scrim(frame); const s = W.box(frame, "Sheet · " + title, { w: 390, h, dir: "column", gap: 14, pad: [10, 16, 34, 16], bg: "popover", x: 0, y: 844 - h, lh: "fix", lv: "fix" });
  s.borderRadiusTopLeft = 14; s.borderRadiusTopRight = 14; const hd = W.box(s, "Handle row", { dir: "row", justify: "center", hs: "fill" }); W.box(hd, "Handle", { w: 40, h: 4, r: 2, bg: "border" });
  if (title) W.t(s, title, { size: 16, w: 600 }); return s; };
// --- Rs Password additions ---------------------------------------------------------------
// Auto-sized boards don't re-measure text created in the same call: W.done/relayout forces it.
// No timers: browsers throttle them in background tabs, which made this time out.
W.relayout = async (root) => { const boards = U.findShapes(s => s.type === "board" && !!s.flex, root);
  const depth = s => { let d = 0, p = s.parent; while (p && p.id !== root.id) { d++; p = p.parent; } return d; };
  boards.sort((a, b) => depth(b) - depth(a));
  for (const b of boards) { const h = b.flex.horizontalSizing, v = b.flex.verticalSizing; b.flex.horizontalSizing = h === "auto" ? "fix" : h; b.flex.horizontalSizing = h; b.flex.verticalSizing = v === "auto" ? "fix" : v; b.flex.verticalSizing = v; } };
W.cap = (frame, text) => { const t = W.t(null, text, { size: 13, color: "muted-foreground", name: "Caption" }); t.x = frame.x; t.y = frame.y - 30; t.resize(frame.width, 18); t.growType = "auto-height"; return t; };
W.rowTitle = (text, y) => { const t = W.t(null, text, { size: 24, w: 600, name: "Row title" }); t.x = 0; t.y = y; return t; };
W.done = async (frame, cap) => { await W.relayout(frame); if (cap) W.cap(frame, cap); return frame.id; };
W.sep = (parent, inset = 0) => { const s = W.box(parent, "Separator", { h: 1, bg: "border", hs: "fill", lv: "fix" }); s.resize(100, 1); if (s.layoutChild) { s.layoutChild.horizontalSizing = "fill"; if (inset) s.layoutChild.leftMargin = inset; } return s; };
W.search = (parent, ph = "Cari di brankas") => { const s = W.box(parent, "Search", { h: 36, dir: "row", gap: 8, align: "center", pad: [0, 12, 0, 12], border: "input", r: 10, hs: "fill", lv: "fix" }); s.resize(358, 36); if (s.layoutChild) s.layoutChild.horizontalSizing = "fill"; W.icon(s, "search", 16, "muted-foreground"); W.t(s, ph, { size: 14, color: "muted-foreground" }); return s; };
W.chips = (parent, labels, active = 0) => { const r = W.box(parent, "Chips", { dir: "row", gap: 8, align: "center", hs: "fill" }); labels.forEach((l, i) => { const on = i === active; const c = W.box(r, "Chip · " + l, { h: 32, dir: "row", align: "center", pad: [0, 12, 0, 12], r: 16, lv: "fix", bg: on ? "primary" : null, border: on ? null : "border" }); W.t(c, l, { size: 13, w: 500, color: on ? "primary-foreground" : "foreground" }); }); return r; };
W.group = (parent, name) => W.box(parent, "Group · " + name, { dir: "column", border: "border", r: 12, bg: "card", hs: "fill" });
W.caption = (parent, str, right) => { const h = W.box(parent, "Caption · " + str, { dir: "row", justify: "space-between", align: "center", hs: "fill", pad: [4, 2, 0, 2] }); W.t(h, str, { size: 12, w: 500, color: "muted-foreground" }); if (right) W.t(h, right, { size: 12, color: "muted-foreground" }); return h; };
// Square tile with a letter or an icon (24 px icon from 56 px up).
W.tile = (parent, o = {}) => { const sz = o.size || 40; const big = sz >= 56 && !o.letter; const t = W.box(parent, "Tile", { w: sz, h: sz, r: o.round ? sz / 2 : (big ? 16 : 10), bg: o.bg || "muted", dir: "row", align: "center", justify: "center", lh: "fix", lv: "fix" });
  if (o.letter) W.t(t, o.letter, { size: sz >= 40 ? 16 : 13, w: 600, color: o.fg || "foreground" }); else W.icon(t, o.icon, big ? 24 : sz >= 40 ? 20 : 16, o.fg); return t; };
W.item = (parent, o) => { const r = W.box(parent, "Item · " + o.title, { dir: "row", gap: 12, align: "center", pad: o.pad || [10, 14, 10, 14], hs: "fill" });
  W.tile(r, o.tile || { letter: o.title[0] }); const tx = W.box(r, "Text", { dir: "column", gap: 2, hs: "fill" }); W.t(tx, o.title, { size: 14, w: 500 }); if (o.sub) W.t(tx, o.sub, { size: 12, color: "muted-foreground" });
  for (const b of o.badges || []) W.badge(r, b, o.badgeVariant || "outline");
  if (o.trailing) W.t(r, o.trailing, { size: 12, color: o.trailingColor || "muted-foreground" });
  for (const ic of o.actions || []) W.iconBtn(r, ic, "ghost", "icon-sm", { color: "muted-foreground" });
  if (o.chevron) W.icon(r, "chevron-right", 16, "muted-foreground"); return r; };
W.list = (parent, name, items, o = {}) => { const g = W.group(parent, name); items.forEach((it, i) => { if (i) W.sep(g, o.inset ?? 66); W.item(g, it); }); return g; };
// Button with optional leading icon (detached so the icon can be added).
W.btn = (parent, label, o = {}) => { const b = W.inst(parent, "Button", { Variant: o.variant || "default", Size: o.size || "default" }, { text: { Label: label } });
  if (o.icon) { b.detach(); const v = o.variant || "default"; const fg = v === "default" || v === "destructive" ? "primary-foreground" : "foreground"; const ic = W.icon(b, o.icon, 16, fg); if (b.flex) b.flex.columnGap = 6; ic.setParentIndex(b.children.length - 1); }
  if (o.fill && b.layoutChild) b.layoutChild.horizontalSizing = "fill"; return b; };
// Text input: state default | focus (2 px ring) | invalid; lead / trail icons; mono for secrets.
W.input = (parent, value, o = {}) => { const st = o.state || "default"; const bx = W.box(parent, "Input · " + (o.name || value), { h: o.h || 36, dir: "row", gap: 8, align: "center", pad: [0, 10, 0, 12], r: 10, hs: "fill", lv: "fix", border: st === "invalid" ? "destructive" : "input", bg: o.bg || "background" });
  bx.resize(358, o.h || 36); if (bx.layoutChild) bx.layoutChild.horizontalSizing = "fill";
  if (st === "focus") { const t = tk("ring"); bx.strokes = [{ strokeColor: t.resolvedValue.slice(0, 7), strokeOpacity: 1, strokeWidth: 2, strokeAlignment: "inner" }]; bx.applyToken(t, ["strokeColor"]); }
  if (o.lead) W.icon(bx, o.lead, 16, "muted-foreground");
  const tx = W.t(bx, value, { size: o.mono ? 15 : 14, w: o.mono ? 500 : 400, color: o.placeholder ? "muted-foreground" : "foreground", ls: o.mono ? 0.5 : 0 }); if (tx.layoutChild) tx.layoutChild.horizontalSizing = "fill";
  for (const ic of o.trail || []) W.icon(bx, ic, 16, "muted-foreground"); return bx; };
W.f = (parent, label, value, o = {}) => { const f = W.box(parent, "Field · " + (label || value), { dir: "column", gap: 6, hs: "fill" }); if (label) W.t(f, label, { size: 14, w: 500 }); W.input(f, value, o);
  if (o.error) W.t(f, o.error, { size: 12, w: 500, color: "destructive", width: 358, hs: "fill" }); else if (o.help) W.t(f, o.help, { size: 12, color: "muted-foreground", width: 358, hs: "fill" }); return f; };
// Password strength: level 0–4.
W.meter = (parent, level, label, o = {}) => { const m = W.box(parent, "Strength", { dir: "column", gap: 6, hs: "fill" }); const bars = W.box(m, "Bars", { dir: "row", gap: 4, hs: "fill" });
  const color = level <= 1 ? "destructive" : level === 2 ? "warning" : "success";
  for (let i = 0; i < 4; i++) { const s = W.box(bars, "Bar", { w: 84, h: 4, r: 2, bg: i < level ? color : "muted", lv: "fix" }); if (s.layoutChild) s.layoutChild.horizontalSizing = "fill"; }
  const r = W.box(m, "Label row", { dir: "row", justify: "space-between", hs: "fill" }); W.t(r, label, { size: 12, w: 500, color: level <= 1 ? "destructive" : "foreground" }); if (o.right) W.t(r, o.right, { size: 12, color: "muted-foreground" }); return m; };
W.info = (parent, icon, text, o = {}) => { const b = W.box(parent, "Info", { dir: "row", gap: 10, align: "start", pad: 12, r: 10, bg: o.bg || "muted", hs: "fill" }); W.icon(b, icon, 16, o.color || "foreground"); W.t(b, text, { size: 13, color: o.textColor || "foreground", width: 300, hs: "fill" }); return b; };
W.check = (parent, text, ok = true) => { const r = W.box(parent, "Check · " + text, { dir: "row", gap: 8, align: "center" }); W.icon(r, ok ? "circle-check" : "circle-x", 16, ok ? "success" : "muted-foreground"); W.t(r, text, { size: 13, color: ok ? "foreground" : "muted-foreground" }); return r; };
// Label + value row in a grouped list (detail screens), with trailing icon buttons.
W.kv = (parent, label, value, o = {}) => { const r = W.box(parent, "Field · " + label, { dir: "row", gap: 8, align: "center", pad: [10, 8, 10, 14], hs: "fill" });
  const tx = W.box(r, "Text", { dir: "column", gap: 2, hs: "fill" }); W.t(tx, label, { size: 12, color: "muted-foreground" });
  const vr = W.box(tx, "Value row", { dir: "row", gap: 8, align: "center" }); W.t(vr, value, { size: o.big ? 22 : 14, w: o.big ? 600 : 400, ls: o.big ? 2 : 0, color: o.color || "foreground" }); for (const bd of o.badges || []) W.badge(vr, bd, "outline");
  if (o.ring) W.ring(r, o.ring); for (const ic of o.actions || []) W.iconBtn(r, ic, "ghost", "icon", { color: "muted-foreground" }); return r; };
W.kvList = (parent, name, rows) => { const g = W.group(parent, name); rows.forEach((rw, i) => { if (i) W.sep(g, 14); W.kv(g, ...rw); }); return g; };
// TOTP countdown ring and code row.
W.ring = (parent, txt, color = "success") => { const rg = W.box(parent, "Countdown", { w: 32, h: 32, r: 16, dir: "row", align: "center", justify: "center", lh: "fix", lv: "fix" }); const t = tk(color); rg.strokes = [{ strokeColor: t.resolvedValue.slice(0, 7), strokeOpacity: 1, strokeWidth: 2.5, strokeAlignment: "inner" }]; W.t(rg, txt, { size: 11, w: 600, color: color === "success" ? "foreground" : color }); return rg; };
W.totp = (parent, o) => { const r = W.box(parent, "Code · " + o.issuer, { dir: "row", gap: 12, align: "center", pad: [12, 14, 12, 14], hs: "fill" });
  W.tile(r, { letter: o.issuer[0] }); const tx = W.box(r, "Text", { dir: "column", gap: 2, hs: "fill" });
  const nm = W.box(tx, "Name", { dir: "row", gap: 6 }); W.t(nm, o.issuer, { size: 13, w: 500 }); W.t(nm, o.account, { size: 13, color: "muted-foreground" });
  W.t(tx, o.code, { size: 24, w: 600, ls: 2, color: o.low ? "destructive" : "foreground" }); if (o.next) W.t(tx, "Berikutnya " + o.next, { size: 12, color: "muted-foreground" });
  W.ring(r, o.sec, o.low ? "destructive" : "success"); W.iconBtn(r, "copy", "ghost", "icon", { color: "muted-foreground" }); return r; };
W.sw = (parent, label, on = true, sub) => { const r = W.box(parent, "Switch · " + label, { dir: "row", gap: 12, align: "center", pad: [12, 14, 12, 14], hs: "fill" }); const tx = W.box(r, "Text", { dir: "column", gap: 2, hs: "fill" }); W.t(tx, label, { size: 14 }); if (sub) W.t(tx, sub, { size: 12, color: "muted-foreground", width: 260, hs: "fill" });
  W.inst(r, "Switch", { Size: "default", Checked: on ? "true" : "false", Disabled: "false" }); return r; };
W.slider = (parent, label, value) => { const b = W.box(parent, "Slider · " + label, { dir: "column", gap: 12, pad: [12, 14, 14, 14], hs: "fill" }); const h = W.box(b, "Head", { dir: "row", justify: "space-between", hs: "fill" }); W.t(h, label, { size: 14 }); W.t(h, value, { size: 14, w: 600 });
  const s = W.inst(b, "Slider", { Type: "single" }); s.resize(328, s.height); if (s.layoutChild) s.layoutChild.horizontalSizing = "fill"; return b; };
// Settings row: icon, title, optional badge / value, chevron (danger rows are red, no chevron).
W.setRow = (parent, icon, title, value, o = {}) => { const r = W.box(parent, "Row · " + title, { dir: "row", gap: 12, align: "center", pad: [12, 14, 12, 14], hs: "fill" }); W.icon(r, icon, 16, o.danger ? "destructive" : "foreground");
  const t = W.t(r, title, { size: 14, color: o.danger ? "destructive" : "foreground" }); if (t.layoutChild) t.layoutChild.horizontalSizing = "fill";
  if (o.badge) W.badge(r, o.badge, o.badgeVariant || "secondary"); if (value) W.t(r, value, { size: 14, color: "muted-foreground" }); if (!o.danger && !o.noChevron) W.icon(r, "chevron-right", 16, "muted-foreground"); return r; };
W.setGroup = (parent, cap, rows) => { W.caption(parent, cap); const g = W.group(parent, cap); rows.forEach((rw, i) => { if (i) W.sep(g); W.setRow(g, ...rw); }); return g; };
// Selectable card with a radio dot (export format, storage provider…).
W.choice = (parent, icon, title, sub, on, badge) => { const c = W.box(parent, "Choice · " + title, { dir: "row", gap: 12, align: "start", pad: 14, r: 12, border: on ? "foreground" : "border", bw: on ? 1.5 : 1, bg: on ? "accent" : "card", hs: "fill" });
  W.icon(c, icon, 20); const tx = W.box(c, "Text", { dir: "column", gap: 4, hs: "fill" }); const h = W.box(tx, "Title", { dir: "row", gap: 8, align: "center" }); W.t(h, title, { size: 14, w: 500 }); if (badge) W.badge(h, badge, "outline");
  W.t(tx, sub, { size: 12, color: "muted-foreground", width: 260, hs: "fill" });
  const rd = W.box(c, "Radio", { w: 16, h: 16, r: 8, border: on ? "foreground" : "input", dir: "row", align: "center", justify: "center", lh: "fix", lv: "fix" }); if (on) W.box(rd, "Dot", { w: 8, h: 8, r: 4, bg: "foreground" }); return c; };
storage.W = W;
