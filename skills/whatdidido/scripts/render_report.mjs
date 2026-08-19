#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/render_report.mjs <input.json> <output.html>");
  process.exit(1);
}

const data = JSON.parse(await readFile(inputPath, "utf8"));

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const items = Array.isArray(data.items) ? data.items : [];
const inProgress = Array.isArray(data.inProgress) ? data.inProgress : [];
const caveats = Array.isArray(data.caveats) ? data.caveats : [];
const projects = [...new Set(items.map((item) => item.project || "General"))];
const timeframe = data.window || {};
const scanned = data.scanned || {};

const formatDate = (value, options) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return escapeHtml(value);
  try {
    return new Intl.DateTimeFormat("en-NZ", {
      timeZone: timeframe.timezone || undefined,
      ...options,
    }).format(date);
  } catch {
    return date.toLocaleString("en-NZ", options);
  }
};

const longDate = (value) => formatDate(value, {
  weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
});
const timeOnly = (value) => formatDate(value, { hour: "numeric", minute: "2-digit" });

const projectCounts = new Map();
for (const item of items) {
  const project = item.project || "General";
  projectCounts.set(project, (projectCounts.get(project) || 0) + 1);
}

const cards = items.map((item, index) => {
  const project = item.project || "General";
  const details = (Array.isArray(item.details) ? item.details : [])
    .map((detail) => `<li>${escapeHtml(detail)}</li>`).join("");
  return `
    <article class="work-card" data-project="${escapeHtml(project)}" style="--delay:${index * 55}ms">
      <div class="card-rail" aria-hidden="true"></div>
      <div class="card-main">
        <div class="eyebrow-row">
          <span class="kind">${escapeHtml(item.kind || "Completed")}</span>
          <span class="project">${escapeHtml(project)}</span>
          <time datetime="${escapeHtml(item.completedAt || "")}">${escapeHtml(timeOnly(item.completedAt))}</time>
        </div>
        <h3>${escapeHtml(item.title || "Completed work")}</h3>
        <p class="summary">${escapeHtml(item.summary || "")}</p>
        ${details ? `<ul class="details">${details}</ul>` : ""}
      </div>
    </article>`;
}).join("");

const projectButtons = projects.map((project) => `
  <button class="filter" type="button" data-filter="${escapeHtml(project)}">
    ${escapeHtml(project)} <span>${projectCounts.get(project)}</span>
  </button>`).join("");

const motionCards = inProgress.map((item) => `
  <article class="motion-card">
    <span>${escapeHtml(item.project || "General")}</span>
    <h3>${escapeHtml(item.title || "Work in progress")}</h3>
    <p>${escapeHtml(item.summary || "")}</p>
  </article>`).join("");

const caveatItems = caveats.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
const emptyState = `
  <div class="empty-state">
    <div class="empty-mark" aria-hidden="true">0</div>
    <h3>No completed outcomes found</h3>
    <p>The accessible task history contained no completion evidence inside this exact window.</p>
  </div>`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(timeframe.label || "Recent work")} · What did I do?</title>
  <style>
    :root { --ink:#17201d; --muted:#66716d; --paper:#f4f0e7; --card:#fffdf7; --line:#d8d2c6; --lime:#c8f56a; --green:#1d573f; --coral:#ee775f; }
    * { box-sizing:border-box; }
    html { background:var(--paper); color:var(--ink); font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
    body { margin:0; min-width:280px; background:radial-gradient(circle at 85% 3%,rgba(200,245,106,.34),transparent 27rem),var(--paper); }
    button { font:inherit; }
    .shell { width:min(1120px,calc(100% - 32px)); margin:0 auto; padding:38px 0 64px; }
    .masthead { display:flex; justify-content:space-between; gap:20px; align-items:center; border-bottom:1px solid var(--line); padding-bottom:17px; }
    .brand { display:flex; align-items:center; gap:10px; text-transform:uppercase; letter-spacing:.12em; font-weight:850; font-size:.78rem; }
    .brand-mark { display:grid; place-items:center; width:30px; height:30px; border-radius:50%; background:var(--ink); color:var(--lime); font-size:.95rem; }
    .range { color:var(--muted); font-size:.86rem; text-align:right; }
    .hero { display:grid; grid-template-columns:minmax(0,1.6fr) minmax(230px,.65fr); gap:42px; padding:68px 0 54px; align-items:end; }
    .command { display:inline-flex; margin-top:18px; border:1px solid var(--line); border-radius:999px; background:rgba(255,253,247,.72); padding:9px 13px; color:var(--green); font:700 .82rem ui-monospace,SFMono-Regular,Menlo,monospace; }
    .kicker { display:flex; align-items:center; gap:10px; color:var(--green); font-weight:800; text-transform:uppercase; letter-spacing:.13em; font-size:.76rem; }
    .kicker::before { content:""; width:32px; height:3px; background:var(--coral); }
    h1 { max-width:820px; margin:16px 0 20px; font-family:Georgia,"Times New Roman",serif; font-size:clamp(3rem,7vw,6.8rem); font-weight:500; letter-spacing:-.055em; line-height:.91; text-wrap:balance; }
    .lede { max-width:760px; color:#49544f; font-size:clamp(1.05rem,2vw,1.3rem); line-height:1.62; }
    .window-card { background:var(--ink); color:#f8f3e8; border-radius:22px; padding:24px; box-shadow:11px 11px 0 var(--lime); }
    .window-card small { color:#bac4bf; text-transform:uppercase; letter-spacing:.12em; }
    .window-card strong { display:block; margin-top:10px; font-family:Georgia,serif; font-size:1.65rem; font-weight:500; line-height:1.15; }
    .window-card span { display:block; margin-top:14px; color:var(--lime); font-size:.83rem; }
    .stats { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); border:1px solid var(--line); border-radius:18px; overflow:hidden; background:rgba(255,253,247,.72); }
    .stat { padding:25px 28px; border-right:1px solid var(--line); }
    .stat:last-child { border:0; }
    .stat b { display:block; font-family:Georgia,serif; font-size:2.2rem; font-weight:500; }
    .stat span { color:var(--muted); font-size:.82rem; text-transform:uppercase; letter-spacing:.1em; }
    .section-heading { display:flex; justify-content:space-between; gap:18px; align-items:end; margin:58px 0 22px; }
    .section-heading h2 { margin:0; font-family:Georgia,serif; font-size:clamp(2rem,4vw,3.25rem); font-weight:500; letter-spacing:-.035em; }
    .section-heading p { max-width:480px; margin:0; color:var(--muted); text-align:right; }
    .filters { display:flex; flex-wrap:wrap; gap:9px; margin:0 0 20px; }
    .filter { cursor:pointer; border:1px solid var(--line); border-radius:999px; background:transparent; padding:8px 12px; color:var(--ink); }
    .filter span { display:inline-grid; place-items:center; min-width:22px; height:22px; margin-left:5px; border-radius:999px; background:rgba(23,32,29,.08); font-size:.76rem; }
    .filter[aria-pressed="true"] { border-color:var(--ink); background:var(--ink); color:white; }
    .filter[aria-pressed="true"] span { background:var(--lime); color:var(--ink); }
    .work-list { display:grid; gap:14px; }
    .work-card { display:grid; grid-template-columns:8px minmax(0,1fr); overflow:hidden; border:1px solid var(--line); border-radius:18px; background:var(--card); box-shadow:0 10px 34px rgba(44,52,48,.045); animation:rise .45s ease both; animation-delay:var(--delay); }
    .work-card[hidden] { display:none; }
    .card-rail { background:var(--green); }
    .work-card:nth-child(3n+2) .card-rail { background:var(--coral); }
    .work-card:nth-child(3n+3) .card-rail { background:#e2c04e; }
    .card-main { min-width:0; padding:25px 28px 27px; }
    .eyebrow-row { display:flex; flex-wrap:wrap; gap:9px; align-items:center; color:var(--muted); font-size:.76rem; text-transform:uppercase; letter-spacing:.09em; }
    .kind { color:var(--green); font-weight:850; }
    .project { border-left:1px solid var(--line); padding-left:9px; }
    .eyebrow-row time { margin-left:auto; text-transform:none; letter-spacing:0; }
    .work-card h3,.motion-card h3 { margin:13px 0 8px; font-family:Georgia,serif; font-size:clamp(1.45rem,3vw,2rem); font-weight:500; letter-spacing:-.02em; }
    .summary { margin:0; color:#4b5651; line-height:1.58; }
    .details { display:grid; gap:7px; margin:18px 0 0; padding:0; list-style:none; }
    .details li { position:relative; padding-left:20px; line-height:1.48; }
    .details li::before { content:"↳"; position:absolute; left:0; color:var(--coral); font-weight:900; }
    .motion-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
    .motion-card { min-width:0; border:1px dashed #a9a397; border-radius:18px; padding:24px 26px; background:rgba(255,253,247,.48); }
    .motion-card span { color:var(--green); font-size:.76rem; font-weight:800; text-transform:uppercase; letter-spacing:.1em; }
    .motion-card h3 { font-size:1.55rem; }
    .motion-card p { color:var(--muted); line-height:1.55; }
    .evidence { margin-top:54px; border-top:1px solid var(--line); padding-top:24px; display:grid; grid-template-columns:1fr 2fr; gap:28px; }
    .evidence h2 { margin:0; font-family:Georgia,serif; font-weight:500; }
    .evidence ul { margin:0; padding-left:18px; color:var(--muted); line-height:1.6; }
    .footer { display:flex; justify-content:space-between; gap:20px; margin-top:48px; padding-top:17px; border-top:1px solid var(--line); color:var(--muted); font-size:.78rem; }
    .empty-state { text-align:center; padding:60px 24px; border:1px dashed var(--line); border-radius:18px; }
    .empty-mark { width:68px; height:68px; margin:0 auto 16px; display:grid; place-items:center; border-radius:50%; background:var(--ink); color:var(--lime); font:500 2rem Georgia,serif; }
    .empty-state h3 { margin:0 0 8px; font:500 1.7rem Georgia,serif; }
    .empty-state p { color:var(--muted); }
    @keyframes rise { from { opacity:0; transform:translateY(8px); } }
    @media (max-width:760px) {
      .shell { width:min(100% - 22px,1120px); padding-top:20px; }
      .masthead,.footer { align-items:flex-start; }
      .hero { grid-template-columns:1fr; padding:48px 0 42px; }
      .stats { grid-template-columns:1fr; }
      .stat { border-right:0; border-bottom:1px solid var(--line); }
      .section-heading,.evidence { display:block; }
      .section-heading p { margin-top:9px; text-align:left; }
      .motion-grid { grid-template-columns:1fr; }
    }
    @media (max-width:500px) {
      .masthead,.footer { display:block; }
      .range { margin-top:10px; text-align:left; }
      .card-main { padding:21px 19px 23px; }
      .eyebrow-row time { width:100%; margin:0; }
    }
    @media print {
      body { background:white; }
      .shell { width:100%; padding:0; }
      .filters { display:none; }
      .work-card { break-inside:avoid; box-shadow:none; }
    }
    @media (prefers-reduced-motion:reduce) { * { animation:none!important; scroll-behavior:auto!important; } }
  </style>
</head>
<body>
  <main class="shell">
    <header class="masthead">
      <div class="brand"><span class="brand-mark">✓</span> What did I do?</div>
      <div class="range">${escapeHtml(longDate(timeframe.start))} → ${escapeHtml(longDate(timeframe.end))}</div>
    </header>

    <section class="hero">
      <div>
        <div class="kicker">${escapeHtml(timeframe.label || "Recent work")}</div>
        <h1>${escapeHtml(data.overview?.headline || "Your work, made visible.")}</h1>
        <p class="lede">${escapeHtml(data.overview?.summary || "A concise recap of completed work in the requested time window.")}</p>
        ${data.invocation ? `<code class="command">${escapeHtml(data.invocation)}</code>` : ""}
      </div>
      <aside class="window-card" aria-label="Report scope">
        <small>Evidence window</small>
        <strong>${escapeHtml(timeframe.label || "Custom range")}</strong>
        <span>${escapeHtml(timeframe.timezone || "Local time")}</span>
      </aside>
    </section>

    <section class="stats" aria-label="Overview statistics">
      <div class="stat"><b>${items.length}</b><span>Completed outcomes</span></div>
      <div class="stat"><b>${escapeHtml(scanned.threads ?? "—")}</b><span>Tasks scanned</span></div>
      <div class="stat"><b>${projects.length}</b><span>Projects advanced</span></div>
    </section>

    <section>
      <div class="section-heading">
        <h2>Completed work</h2>
        <p>Evidence-backed outcomes, grouped from completed task turns inside the selected window.</p>
      </div>
      ${projects.length > 1 ? `<div class="filters" aria-label="Filter by project"><button class="filter" type="button" data-filter="all" aria-pressed="true">All <span>${items.length}</span></button>${projectButtons}</div>` : ""}
      <div class="work-list">${cards || emptyState}</div>
    </section>

    ${inProgress.length ? `<section><div class="section-heading"><h2>Still in motion</h2><p>Started in the window, but deliberately excluded from the completed count.</p></div><div class="motion-grid">${motionCards}</div></section>` : ""}

    ${caveats.length ? `<aside class="evidence"><h2>Scope notes</h2><ul>${caveatItems}</ul></aside>` : ""}

    <footer class="footer"><span>Generated ${escapeHtml(longDate(data.generatedAt))}</span><span>${escapeHtml(scanned.completedTurns ?? items.length)} completed turns inspected</span></footer>
  </main>
  <script>
    const buttons = [...document.querySelectorAll('.filter')];
    const cards = [...document.querySelectorAll('.work-card')];
    for (const button of buttons) button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      for (const candidate of buttons) candidate.setAttribute('aria-pressed', String(candidate === button));
      for (const card of cards) card.hidden = filter !== 'all' && card.dataset.project !== filter;
    });
  </script>
</body>
</html>`;

await writeFile(outputPath, html, "utf8");
console.log(`Rendered ${items.length} completed outcomes to ${path.resolve(outputPath)}`);
