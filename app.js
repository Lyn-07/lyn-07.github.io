/* Builds the page from data.js, runs the studio, count-ups, work cards and navigation.
   URLs: #work #writing #about #photography #world #world/computer #case/seo */
(() => {
  "use strict";
  const D = window.PORTFOLIO, root = document.getElementById("lyn");
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Safe emphasis: escape everything first, then turn **text** into <strong>. No other HTML is possible.
  const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const svg = (p, s = 18, w = 2.2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const icon = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    ext: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
    x: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    door: svg('<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3 21h18M14.5 12.5h.01"/>')
  };
  const OBJ = {
    computer: '<path d="M3 4.5h18v11H3zM8 20h8M12 15.5V20"/>',
    board: '<path d="M3 4h18v13H3zM7 8h4v5H7zM14 8h3M14 11h3M8 21l1.5-4M16 21l-1.5-4"/>',
    camera: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
    wall: '<path d="M4 20V11M10 20V5M16 20v-7M21 20H3"/>',
    shelf: '<path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5 1-3 14.5-3.5-1z"/>',
    window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>'
  };
  const objIcon = (id, s = 26) => svg(OBJ[id] || "", s, 1.8);
  const PLAT = {
    instagram: { label: "Instagram", icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>' },
    facebook: { label: "Facebook", icon: '<path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7h4v-7h3l1-4h-4V7.5A1 1 0 0 1 13 6.5h2z"/>' },
    youtube: { label: "YouTube", icon: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z"/>' },
    web: { label: "Article", icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>' }
  };
  const playIcon = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => mq.matches || root.dataset.motion === "reduced";
  const baseTitle = document.title;
  const ctx = { from: null, obj: null, caseId: null };
  let canHistory = true;
  const objForCase = (id) => (D.room.find((r) => r.caseId === id) || {}).id || null;
  const focusEl = (el) => { try { el && el.focus({ preventScroll: true }); } catch (e) {} };
  const pushHash = (h, st) => { try { history.pushState(st, "", h); } catch (e) { canHistory = false; } };
  const replaceHash = (h, st) => { try { history.replaceState(st, "", h); } catch (e) { canHistory = false; } };
  const toTop = () => { try { $("#main").scrollIntoView({ block: "start", behavior: reduced() ? "auto" : "smooth" }); } catch (e) {} };
  const published = () => (D.articles || []).filter((a) => a.status === "published" && a.url);
  const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return ""; } };

  const photo = (p, cls = "") => {
    if (!p) return "";
    return `<figure class="photo ${cls}"><div class="frame" style="--ar:${p.ratio || "3/4"};--pos:${p.position || "50% 50%"}" data-fallback="LL" data-note="Add ${esc(p.src)}"><img src="${esc(p.src)}" alt="${esc(p.alt)}"${p.w ? ` width="${p.w}" height="${p.h}"` : ""} loading="lazy" decoding="async" onerror="this.parentNode.classList.add('missing')"></div>${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}</figure>`;
  };

  /* ---------- Thumbnail frame: real image on top, honest text cover underneath ----------
     If the file is missing (or the src is empty), the image hides itself and the
     designed text cover shows. Nothing is ever replaced with an unrelated image. */
  const thumb = (src, ratio, pos, fallback, extra = "") =>
    `<span class="wk-thumb${src ? "" : " no-img"}" style="--ar:${ratio || "16/10"};--pos:${pos || "50% 50%"}">` +
    (src ? `<img src="${esc(src)}" alt="" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('no-img')">` : "") +
    fallback + extra +
    (D.site.showPlaceholders && src ? `<span class="wk-note">Upload ${esc(src)}</span>` : "") +
    `</span>`;

  /* ---------- Count-up metrics + bar fills (one shared system) ---------- */
  const parseMetric = (s) => {
    const m = String(s).match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/);
    if (!m) return null;
    const raw = m[2];
    return { pre: m[1], val: parseFloat(raw.replace(/,/g, "")), dec: (raw.split(".")[1] || "").length, comma: raw.includes(","), suf: m[3] };
  };
  const fmt = (p, v) => p.pre + (p.comma ? v.toLocaleString("en-US", { minimumFractionDigits: p.dec, maximumFractionDigits: p.dec }) : v.toFixed(p.dec)) + p.suf;
  // Screen readers always get the final value; the animated digits are hidden from them.
  const metric = (v) => parseMetric(v)
    ? `<span class="metric" data-count="${esc(v)}"><span class="sr-only">${esc(v)}</span><span class="cnt" aria-hidden="true" style="min-width:${String(v).length}ch">${esc(v)}</span></span>`
    : `<span class="word">${esc(v)}</span>`;
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); play(en.target); } }), { threshold: 0.35 })
    : null;

  /* Subtle fade-in for cards (opacity only). Skipped entirely with reduced motion. */
  const rio = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { rio.unobserve(en.target); en.target.classList.add("in"); } }), { threshold: 0.12 })
    : null;
  if (rio && !reduced()) root.classList.add("can-reveal");
  function armReveal(scope) {
    $$(".reveal:not(.in)", scope).forEach((el) => { if (!rio || reduced()) el.classList.add("in"); else rio.observe(el); });
  }

  function arm(scope) {
    armReveal(scope);
    $$(".metric:not([data-armed])", scope).forEach((el) => {
      el.dataset.armed = "1";
      if (reduced() || !io) return;                     // reduced motion: final number shows immediately
      $(".cnt", el).textContent = fmt(parseMetric(el.dataset.count), 0);
      io.observe(el);
    });
    $$(".fill[data-w]:not([data-armed])", scope).forEach((el) => {
      el.dataset.armed = "1";
      if (reduced() || !io) { el.style.width = el.dataset.w + "%"; return; }
      io.observe(el);
    });
  }
  function play(el) {
    if (el.classList.contains("fill")) { el.style.width = el.dataset.w + "%"; return; }
    const p = parseMetric(el.dataset.count), c = $(".cnt", el);
    if (reduced()) { c.textContent = el.dataset.count; return; }
    const t0 = performance.now(), dur = 1500;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);   // ease-out
      c.textContent = k < 1 ? fmt(p, p.val * e) : el.dataset.count;          // always ends on the exact original text
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  /* Replays ALL numeric evidence and bars in this case, including 4 / 100+ / 2. */
  function replayEvidence(secEl) {
    if (!secEl) return;
    $$(".metric", secEl).forEach((el) => {
      const p = parseMetric(el.dataset.count), c = $(".cnt", el);
      if (!p || !c) return;
      if (reduced()) { c.textContent = el.dataset.count; return; }
      c.textContent = fmt(p, 0);
      play(el);
    });
    $$(".fill[data-w]", secEl).forEach((el) => {
      if (reduced()) { el.style.width = el.dataset.w + "%"; return; }
      el.style.transition = "none";
      el.style.width = "0%";
      void el.offsetWidth;
      el.style.transition = "";
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = el.dataset.w + "%"; }));
    });
  }

  /* ---------- Home ---------- */
  if (D.site.showPlaceholders) { $("#draft").hidden = false; root.classList.add("draft-on"); }
  $("#proofs").innerHTML = D.proofs.map((p) => `<li><p><b>${metric(p.value)}</b> ${rich(p.text)}</p><small>${esc(p.note)}</small></li>`).join("");

  // Homepage: original V3 text-only Selected Work list, retained across V4 case-study images.
  // Images are deliberately kept INSIDE each case study, not on this overview.
  const workList = $("#work-list");
  workList.className = "work";
  workList.innerHTML = D.cases.map((c) => `<li><button type="button" data-go="case:${c.id}" aria-label="Read case study: ${esc(c.title)}"><span class="w-disc">${esc(c.discipline)}</span><span><span class="w-title">${esc(c.title)}</span><span class="w-sum">${rich(c.short)}</span></span><span class="w-when">${esc(c.period)}</span><span class="w-go"><span class="w-go-label">View case study</span><span class="w-go-icon">${icon.arrow}</span></span></button></li>`).join("");

  const linkRow = (l) => {
    const unv = l.verified === false;
    return `<a class="linkout" href="${esc(l.url)}" target="_blank" rel="noopener"><span><b>${esc(l.label || l.title)}</b>${l.publisher ? `<small>${esc(l.publisher)}${l.date ? `, ${esc(l.date)}` : ""}</small>` : ""}${l.description ? `<span class="desc">${rich(l.description)}</span>` : ""}${l.note ? `<small>${esc(l.note)}</small>` : ""}${unv ? `<span class="flag" style="margin:6px 0 0">Check before publishing</span>` : ""}</span>${icon.ext}</a>`;
  };
  $("#articles").innerHTML = published().map(linkRow).join("");
  $("#localisation").innerHTML = (D.localisation || []).filter((l) => l.status === "published" && l.url).map(linkRow).join("");
  const A = D.about;
  $("#about-photos").innerHTML = photo(A.portrait) + photo(A.atWork, "small");
  $("#about-text").innerHTML = A.paragraphs.map((p) => `<p>${rich(p)}</p>`).join("");
  const tl = (t) => `<li><span class="t-when">${esc(t.when)}</span><span class="t-what"><b>${esc(t.role)}</b><span>${esc(t.org)}</span>${t.detail ? `<span class="t-detail">${rich(t.detail)}</span>` : ""}${t.link ? `<a class="link" href="${esc(t.link.url)}" target="_blank" rel="noopener">${esc(t.link.label)}</a>` : ""}</span></li>`;
  $("#timeline").innerHTML = A.timeline.map(tl).join("");
  $("#education").innerHTML = A.education.map(tl).join("");
  $("#tools").innerHTML = A.tools.map((t) => `<li>${esc(t)}</li>`).join("");

  // Photography gallery with category tabs
  (function photos() {
    const P = D.photography, sec = $("#photography");
    const cats = P.categories.map((c) => ({ ...c, shown: c.photos.filter((p) => p.ready !== false || D.site.showPlaceholders) })).filter((c) => c.shown.length);
    if (!cats.length) { sec.hidden = true; return; }
    $("#photo-intro").innerHTML = rich(P.intro);
    const tabs = $("#photo-tabs"), grid = $("#photo-grid");
    tabs.hidden = cats.length < 2;
    tabs.innerHTML = cats.map((c, i) => `<button type="button" class="tab" role="tab" id="tab-${c.id}" aria-controls="photo-grid" aria-selected="${i === 0}" data-tab="${c.id}">${esc(c.label)}</button>`).join("");
    const draw = (id) => {
      const c = cats.find((x) => x.id === id);
      grid.dataset.category = id;
      if (id === "graduation") {
        // Three independent columns avoid tall portraits leaving an empty slot
        // between the group performance photo and the solo boy portrait.
        const columns = [[], [], []];
        c.shown.forEach((p, i) => {
          const col = i === 0 || i === 3 ? 0 : i === 1 || i === 4 ? 1 : i === 2 || i === 5 || i === 6 ? 2 : (i - 7) % 3;
          columns[col].push(p);
        });
        grid.innerHTML = columns.map((items) => `<div class="gallery-column">${items.map((p) => photo(p)).join("")}</div>`).join("");
      } else {
        grid.innerHTML = c.shown.map((p) => photo(p)).join("");
      }
      grid.setAttribute("aria-labelledby", "tab-" + id);
      $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === id)));
    };
    draw(cats[0].id);
    tabs.addEventListener("click", (e) => { const t = e.target.closest("[data-tab]"); if (t) draw(t.dataset.tab); });
  })();

  const mail = $("#mail"); mail.href = "mailto:" + D.site.email; mail.textContent = D.site.email;
  $("#linkedin").href = D.site.linkedin;
  $("#cv").href = D.site.resume;
  $("#cv-note").textContent = D.site.resumeNote;
  $("#year").textContent = new Date().getFullYear();   // keeps the footer year current automatically
  $("#jump").innerHTML = D.room.map((o) => `<button type="button" data-obj-btn="${o.id}" aria-pressed="false">${objIcon(o.id, 16)}${esc(o.label)}</button>`).join("");
  arm(document);

  /* ---------- Work cards (Selected Work gallery inside each case) ---------- */
  const newTab = '<span class="sr-only"> (opens in a new tab)</span>';
  function videoCard(w, wide) {
    const p = PLAT[w.platform] || PLAT.web;
    const fb = `<span class="wk-fallback"><span class="wk-fb-icon">${svg(p.icon, 36, 1.6)}</span><span class="wk-fb-title">${esc(w.title)}</span><span class="wk-fb-src">${esc(p.label)}</span></span>`;
    const unv = w.verified === false ? `<span class="flag" style="margin:4px 0 0">Check before publishing</span>` : "";
    return `<a class="wk-card wk-video reveal${wide ? " wide" : ""}" href="${esc(w.url)}" target="_blank" rel="noopener">${thumb(w.thumb, w.ratio || "1/1", w.position, fb, `<span class="wk-play" aria-hidden="true">${playIcon}</span>`)}<span class="wk-body"><span class="wk-src">${svg(p.icon, 15, 1.8)}${esc(w.source || p.label)}</span><span class="wk-title">${esc(w.title)}</span>${w.description ? `<span class="wk-desc">${rich(w.description)}</span>` : ""}${w.stats ? `<span class="wk-stats">${esc(w.stats)}</span>${w.statsNote ? `<span class="wk-stats-date">${esc(w.statsNote)}</span>` : ""}` : ""}${unv}<span class="wk-cta">${esc(w.cta || "Watch")}${icon.ext}${newTab}</span></span></a>`;
  }
  function articleCard(a) {
    const fb = `<span class="wk-page"><span class="wk-page-kicker">${esc(a.publisher)}</span><span class="wk-page-h">${esc(a.title)}</span><span class="wk-page-tag">Published article</span></span>`;
    return `<a class="wk-card wk-article reveal" href="${esc(a.url)}" target="_blank" rel="noopener"><span class="wk-browser"><span class="wk-bar" aria-hidden="true"><i></i><i></i><i></i><span class="wk-url">${esc(hostOf(a.url))}</span></span>${thumb(a.thumb, "16/10", a.position || "50% 0%", fb)}</span><span class="wk-body"><span class="wk-src">${svg(PLAT.web.icon, 15, 1.8)}${esc(a.publisher)}${a.date ? `, ${esc(a.date)}` : ""}</span><span class="wk-title">${esc(a.title)}</span>${a.description ? `<span class="wk-desc">${rich(a.description)}</span>` : ""}<span class="wk-cta">Read Article${icon.ext}${newTab}</span></span></a>`;
  }
  function demoCard(w) {
    const rows = (w.rows || []).map((r) => `<span class="wk-demo-row${r === w.highlight ? " hl" : ""}">${esc(r)}</span>`).join("");
    return `<button type="button" class="wk-card wk-demo wide reveal" data-act="scroll" data-target="${esc(w.target)}"><span class="wk-thumb" style="--ar:16/10"><span class="wk-demo-ui"><span class="flag">Demonstration</span>${rows}</span></span><span class="wk-body"><span class="wk-src">${svg(OBJ.wall, 15, 1.8)}${esc(w.source || "")}</span><span class="wk-title">${esc(w.title)}</span>${w.description ? `<span class="wk-desc">${rich(w.description)}</span>` : ""}<span class="wk-cta">${esc(w.cta || "View")}${icon.arrow}</span></span></button>`;
  }
  function previewCard(w) {
    const facts = `<span class="wk-fallback wk-type">${(w.facts || []).map((f) => `<span class="wk-type-item"><b>${esc(f.value)}</b><span>${esc(f.label)}</span></span>`).join("")}</span>`;
    return `<button type="button" class="wk-card wk-preview wide reveal" data-act="scroll" data-target="${esc(w.target)}">${thumb(w.thumb, "16/10", w.position, facts)}<span class="wk-body"><span class="wk-src">${svg(PLAT.facebook.icon, 15, 1.8)}${esc(w.source || "")}</span><span class="wk-title">${esc(w.title)}</span>${w.description ? `<span class="wk-desc">${rich(w.description)}</span>` : ""}<span class="wk-cta">${esc(w.cta || "See the Evidence")}${icon.arrow}</span></span></button>`;
  }
  const workCard = (w, wide) => w.kind === "article" ? articleCard(w) : w.kind === "demo" ? demoCard(w) : w.kind === "preview" ? previewCard(w) : videoCard(w, wide);

  function workSection(c) {
    const items = [
      ...(c.workFromArticles ? published().map((a) => ({ ...a, kind: "article" })) : []),
      ...(c.work || []).filter((w) => w.kind === "demo" || w.kind === "preview" || (w.url && (w.verified !== false || D.site.showPlaceholders)))
    ];
    if (!items.length) return "";
    const meta = c.workGroups || {}, byGroup = {}, order = [];
    items.forEach((w) => { const g = w.group || "main"; if (!byGroup[g]) { byGroup[g] = []; order.push(g); } byGroup[g].push(w); });
    order.sort((a, b) => (a === "main" ? -1 : b === "main" ? 1 : 0));
    const body = order.map((g) => {
      const list = byGroup[g], m = meta[g] || {};
      const allVideo = list.every((w) => w.kind === "video");
      const single = allVideo && list.length === 1;
      const cols = allVideo && list.length >= 3 ? "three" : "two";
      return `${m.title ? `<h3 class="h3 work-subheading">${esc(m.title)}</h3>` : ""}${m.note ? `<p class="later-note">${rich(m.note)}</p>` : ""}<div class="wk-grid ${cols}">${list.map((w) => workCard(w, single)).join("")}</div>`;
    }).join("");
    return `<section class="wk-panel" aria-labelledby="wk-h"><div class="case-section-heading"><h2 id="wk-h">Selected Work</h2></div>${c.workIntro ? `<p class="wk-intro">${rich(c.workIntro)}</p>` : ""}${body}</section>`;
  }

  /* ---------- Case studies ---------- */
  const sec = (t, b, id) => `<section${id ? ` id="${id}"` : ""}><div class="case-section-heading"><h2>${esc(t)}</h2>${t === "Evidence" ? '<button type="button" class="replay-metrics" data-act="replay-evidence" aria-label="Replay evidence number and chart animations">↻ Replay Numbers & Charts</button>' : ''}</div>${b}</section>`;
  const fig = (f) => {
    if (f.type === "ga4demo") return `<figure class="fig" id="ga4-demo"><span class="flag">${esc(f.flag)}</span><div class="ga"><div><p class="fig-t">${esc(f.groupName)}</p><ol>${f.order.map((o) => `<li${o === f.highlight ? ' class="hl"' : ""}>${esc(o)}</li>`).join("")}</ol></div><div class="rule"><p class="fig-t">${esc(f.highlight)}</p><p>${esc(f.condition)}</p><code>${esc(f.regex)}</code></div></div><figcaption>${esc(f.caption)}</figcaption></figure>`;
    const max = Math.max(...f.rows.map((r) => r.value));
    return `<figure class="fig"><p class="fig-t">${esc(f.title)}</p><div class="bars">${f.rows.map((r) => {
      const w = f.percent ? r.value : (r.value / max) * 100;    // % bars use a 0–100 scale; absolute bars scale to the largest value
      const shown = f.percent ? r.value.toFixed(1) + "%" : r.value.toLocaleString("en-US");
      return `<div class="row"><span>${esc(r.label)}</span><span class="track"><span class="fill" data-w="${Math.max(w, 0.6).toFixed(1)}"></span></span><span class="num">${metric(shown)}</span></div>`;
    }).join("")}</div><figcaption>${esc(f.caption)}</figcaption></figure>`;
  };
  function navButtons(fromWorld, light) {
    const p = light ? "btn-blue" : "btn-light", s = light ? "btn-ghost-blue" : "btn-ghost-light";
    return fromWorld
      ? `<button type="button" class="btn ${p} btn-sm" data-act="back-world">${icon.back}Back to My World</button><button type="button" class="btn ${s} btn-sm" data-go="work">All Work</button>`
      : `<button type="button" class="btn ${p} btn-sm" data-go="work">${icon.back}All work</button><button type="button" class="btn ${s} btn-sm" data-act="visit-world">${icon.door}Visit My World</button>`;
  }
  // Order: Header → Selected Work → Challenge → What I Did → Evidence → Numbers → Learned → Navigation
  function renderCase(id) {
    const i = D.cases.findIndex((c) => c.id === id);
    if (i < 0) return false;
    const n = D.cases.length, c = D.cases[i], prev = D.cases[(i - 1 + n) % n], next = D.cases[(i + 1) % n];
    const fromWorld = ctx.from === "world";
    const o = D.room.find((r) => r.caseId === id);
    const meta = [["Role", c.role], ["When", c.period], ["For", c.org], ["Tools", c.tools]].map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
    const fromLine = o ? `<div class="case-from"><span class="case-badge">${objIcon(o.id)}</span><span>${fromWorld ? `You opened this from the ${esc(o.name.toLowerCase())} in my studio.` : `In my studio, this project lives on the ${esc(o.name.toLowerCase())}.`}</span></div>` : "";
    let h = `<article aria-labelledby="case-h"><header class="case-head on-blue"><div class="wrap"><div class="case-nav">${navButtons(fromWorld, false)}</div>${fromLine}<p class="case-disc">${esc(c.discipline)}</p><h1 class="case-title" id="case-h" tabindex="-1">${esc(c.title)}</h1><p class="case-sum">${rich(c.summary)}</p><dl class="meta">${meta}</dl></div></header><div class="case-main"><div class="wrap">${workSection(c)}<div class="case-panel"><div class="case-body">`;
    h += sec("The Challenge", `<p>${rich(c.challenge)}</p>`);
    h += sec("What I Did", `<ol class="steps">${c.process.map((s) => `<li><div><b>${esc(s.title)}</b><p>${rich(s.text)}</p></div></li>`).join("")}</ol>`);
    h += sec("Evidence", `<ul class="evidence">${c.evidence.map((e) => {
      const v = e.value === "auto:articles" ? String(published().length) : e.value;
      return `<li><b>${metric(v)}</b><span class="lbl">${esc(e.label)}</span>${e.note ? `<small>${esc(e.note)}</small>` : ""}</li>`;
    }).join("")}</ul>${c.coverage ? `<p class="coverage">${rich(c.coverage)}</p>` : ""}${(c.figures || []).map(fig).join("")}`, "case-evidence");
    h += sec("What the Numbers Don't Show", `<div class="limits"><p>${rich(c.limits)}</p></div>`);
    h += sec("What I Learned", c.lessons.map((p) => `<p>${rich(p)}</p>`).join(""));
    h += `<nav class="pager" aria-label="More case studies"><button type="button" data-act="pager" data-target="${prev.id}"><small>Previous</small><b>${esc(prev.title)}</b></button><button type="button" class="next" data-act="pager" data-target="${next.id}"><small>Next</small><b>${esc(next.title)}</b></button></nav><div class="case-end">${navButtons(fromWorld, true)}</div></div></div></div></div></article>`;
    $("#view-case").innerHTML = h;
    document.title = c.title + " | " + D.site.name;
    return true;
  }

  /* ---------- Studio ---------- */
  const stage = $("#stage"), scene = $("#scene"), card = $("#room-card"), shell = $("#stage-shell");
  const mobileStudio = window.matchMedia("(max-width: 639px)");
  // Swap only the SVG coordinate space; the same original objects remain interactive.
  function syncStudioViewport() {
    const portrait = mobileStudio.matches;
    scene.setAttribute("viewBox", portrait ? "0 0 620 850" : "0 0 1000 640");
    // Medium-width tablets keep the original direct project shortcuts.
    const jumpEl = $("#jump"), toggleEl = $("#studio-projects-toggle");
    if (jumpEl && toggleEl) jumpEl.hidden = portrait && toggleEl.getAttribute("aria-expanded") !== "true";
    if (portrait) scene.style.transformOrigin = "50% 50%";
  }
  syncStudioViewport();
  window.addEventListener("resize", syncStudioViewport);
  /* Studio micro-interactions: the ceiling lamp cycles day -> warm -> night -> day.
     It's deliberately decorative; no navigation, persistence, or account access. */
  const lightingModes = ["day", "warm", "night"];
  const lamp = $("#lamp-switch"), lampTip = $("#lamp-tip");
  let lightIndex = 0;
  function cycleLamp() {
    lightIndex = (lightIndex + 1) % lightingModes.length;
    syncLamp();
    // Touch has no persistent hover: briefly confirm the next light action.
    if (!window.matchMedia("(hover: hover)").matches) showStudioTip("lamp", true);
  }
  function syncLamp() {
    stage.dataset.light = lightingModes[lightIndex];
    const next = ["Turn on warm lighting", "Switch to night mode", "Turn lights off and return to daytime"][lightIndex];
    const state = ["off (daytime)", "on (warm)", "night mode"][lightIndex];
    lamp.setAttribute("aria-label", `Ceiling lamp: ${state}. ${next}.`);
    lampTip.textContent = next;
  }
  syncLamp();

  const plant = $("#plant-switch"), plantMessage = $("#plant-message");
  const plantGreetings = [
    "You weren't supposed to find this. 👀",
    "Secret unlocked: You're officially curious.",
    "You found my secret leaf! 🍃",
    "Oh, hello there! Didn't see you coming.",
    "You came all this way to see me? 🥹"
  ];
  const plantComfort = [
    "You can rest here for a moment.",
    "Some days, just being here is enough.",
    "Here's a little peace for your day. 🍃"
  ];
  const plantEncouragement = [
    "A little progress is still progress.",
    "Good things take time to grow.",
    "Bloom at your own pace.",
    "Every little step counts.",
    "Stay curious. Keep creating.",
    "Create first. Perfect later.",
    "Dare to try something different.",
    "Psst... the plant believes in you.",
    "Leaf your worries behind. 🍃"
  ];
  // Keep the stage across navigation within this page, reset on a new page load.
  // Once stage three begins, shuffle all nine messages without replacement.
  let plantClicks = 0, plantQueue = [], lastPlantLine = null, plantTimer = null;
  const randomFrom = (lines) => lines[Math.floor(Math.random() * lines.length)];
  function newPlantQueue() {
    const shuffled = [...plantEncouragement];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // A freshly shuffled cycle should not open with the prior cycle's last line.
    if (shuffled[0] === lastPlantLine) [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    return shuffled;
  }
  function surprisePlant() {
    hideStudioTip();
    const line = plantClicks === 0 ? randomFrom(plantGreetings)
      : plantClicks === 1 ? randomFrom(plantComfort)
      : (plantQueue.length || (plantQueue = newPlantQueue()), plantQueue.shift());
    plantClicks++;
    lastPlantLine = line;
    plantMessage.textContent = line;
    plantMessage.hidden = false;
    plant.classList.remove("is-sparkling");
    void plant.getBoundingClientRect();
    plant.classList.add("is-sparkling");
    clearTimeout(plantTimer);
    plantTimer = setTimeout(() => { plantMessage.hidden = true; plant.classList.remove("is-sparkling"); }, 4200);
  }

  // Custom compact hints replace native SVG <title> rectangles.
  let tipTimer = null;
  function showStudioTip(which, brief = false) {
    clearTimeout(tipTimer);
    stage.dataset.hint = which;
    if (brief) tipTimer = setTimeout(hideStudioTip, 1900);
  }
  function hideStudioTip() {
    clearTimeout(tipTimer);
    delete stage.dataset.hint;
  }
  for (const [el, which] of [[lamp, "lamp"], [plant, "plant"]]) {
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch" && !(which === "plant" && !plantMessage.hidden)) showStudioTip(which);
    });
    el.addEventListener("pointerleave", () => hideStudioTip());
    el.addEventListener("focus", () => showStudioTip(which));
    el.addEventListener("blur", () => hideStudioTip());
  }

  let lastHot = null, activeObj = null;
  const hotFor = (id) => $(`.hot[data-obj="${id}"]`, stage);
  const objectLabel = $("#studio-object-label");
  function syncObjectLabel(id) {
    if (!id || !objectLabel || !card.hidden) {
      if (objectLabel) objectLabel.hidden = true;
      return;
    }
    const hot = hotFor(id), art = hot && $(".obj", hot);
    if (!art) { objectLabel.hidden = true; return; }
    const originalTag = $(".tag text", hot);
    objectLabel.textContent = originalTag ? originalTag.textContent.trim() : (D.room.find(o => o.id === id) || {}).label || id;
    objectLabel.hidden = false;
    const sr = scene.getBoundingClientRect(), r = art.getBoundingClientRect();
    const w = objectLabel.offsetWidth;
    const center = r.left + r.width / 2 - sr.left;
    const left = Math.max(8, Math.min(center - w / 2, sr.width - w - 8));
    const top = Math.max(10, Math.min(r.top - sr.top - objectLabel.offsetHeight - 7, sr.height - objectLabel.offsetHeight - 10));
    objectLabel.style.left = Math.round(left) + "px";
    objectLabel.style.top = Math.round(top) + "px";
  }
  function setActive(id) {
    activeObj = id;
    syncObjectLabel(id);
    $$(".hot", stage).forEach((h) => h.classList.toggle("is-active", h.dataset.obj === id));
    $$("#jump button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.objBtn === id)));
  }
  $$(".hot", stage).forEach((hot) => {
    hot.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch" && !activeObj) syncObjectLabel(hot.dataset.obj);
    });
    hot.addEventListener("pointerleave", () => syncObjectLabel(activeObj));
    hot.addEventListener("focus", () => { if (!activeObj) syncObjectLabel(hot.dataset.obj); });
    hot.addEventListener("blur", () => syncObjectLabel(activeObj));
  });
  function placeCard(id) {
    if (mobileStudio.matches) { card.style.left = card.style.top = card.style.width = ""; return; }
    const h = hotFor(id); if (!h) return;
    const sr = shell.getBoundingClientRect(), r = $(".obj", h).getBoundingClientRect();
    const w = Math.min(300, sr.width * 0.42);
    card.style.width = w + "px";
    const cx = r.left + r.width / 2 - sr.left;
    let left = cx > sr.width / 2 ? r.left - sr.left - w - 18 : r.right - sr.left + 18;
    left = Math.max(14, Math.min(left, sr.width - w - 14));
    const ch = card.offsetHeight;
    let top = r.top - sr.top + r.height / 2 - ch / 2;
    top = Math.max(70, Math.min(top, stage.offsetHeight - ch - 14));
    card.style.left = left + "px";
    card.style.top = Math.max(14, top) + "px";
  }
  function openObj(id, o = {}) {
    const { focus = true, updateUrl = true } = o;
    const ob = D.room.find((r) => r.id === id); if (!ob) return;
    stage.classList.add("explored");
    // The camera now uses a steady, brighter red recording indicator instead of a flash.
    setActive(id);
    const c = ob.caseId ? D.cases.find((x) => x.id === ob.caseId) : null;
    const pts = c ? c.highlights : ob.points || [];
    const buttonText = c ? (mobileStudio.matches ? "View Case Study" : "Open the Case Study") : ob.cta;
    card.innerHTML = `<button type="button" class="rc-close" data-close aria-label="Close preview">${icon.x}</button><p class="rc-label">${objIcon(ob.id, 18)}${esc(ob.name)}</p><h2 class="rc-title" tabindex="-1">${esc(c ? c.title : ob.title)}</h2><p>${esc(ob.line)}</p>${pts.length ? `<ul class="rc-points">${pts.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}<button type="button" class="btn btn-blue btn-sm" data-act="open" data-target="${ob.id}">${esc(buttonText)}${icon.arrow}</button>`;
    card.hidden = false;
    stage.classList.add("preview-open");
    objectLabel.hidden = true;
    placeCard(id);
    if (focus) focusEl($(".rc-title", card));
    if (updateUrl) replaceHash("#world/" + id, { view: "world", obj: id });
    // Fixed mobile preview stays in place without scrolling the room out of view.
  }
  function closeCard(o = {}) {
    const { refocus = true, updateUrl = true } = o;
    setActive(null);
    card.hidden = true;
    stage.classList.remove("preview-open");
    if (updateUrl && !$("#view-world").hidden) replaceHash("#world", { view: "world", obj: null });
    if (refocus && lastHot) focusEl(lastHot);
  }
  window.addEventListener("resize", () => syncObjectLabel(activeObj));
  function setOrigin(h) {
    const r = $(".obj", h).getBoundingClientRect(), sr = scene.getBoundingClientRect();
    if (!sr.width) return;
    scene.style.transformOrigin = `${((r.left + r.width / 2 - sr.left) / sr.width * 100).toFixed(1)}% ${((r.top + r.height / 2 - sr.top) / sr.height * 100).toFixed(1)}%`;
  }
  function zoomInto(id, done) {
    if (reduced()) { done(); return; }
    setOrigin(hotFor(id));
    card.hidden = true;
    stage.classList.remove("preview-open");
    scene.classList.add("zoom");
    setTimeout(() => { done(); scene.classList.remove("zoom"); }, 480);
  }
  function zoomOut(id) {
    const h = hotFor(id); if (!h || reduced()) return;
    setOrigin(h);
    scene.style.transition = "none";
    scene.classList.add("zoom");
    void scene.getBoundingClientRect();
    scene.style.transition = "";
    scene.classList.remove("zoom");
  }
  function openFromObject(id) {
    const ob = D.room.find((r) => r.id === id); if (!ob) return;
    if (!ob.caseId) { showHome(ob.go); return; }          // window → photography, shelf → about
    zoomInto(id, () => openCase(ob.caseId, { from: "world", obj: id, fromWorldEntry: true }));
  }

  const tt = $("#type-text"), qs = D.site.searchQueries;
  let qi = 0, ci = 0, del = false, timer = null;
  function tick() {
    if (reduced()) { tt.textContent = qs[0]; return; }
    const q = qs[qi];
    ci += del ? -1 : 1;
    tt.textContent = q.slice(0, ci);
    let wait = del ? 40 : 95;
    if (!del && ci >= q.length) { del = true; wait = 1700; }
    else if (del && ci <= 0) { del = false; qi = (qi + 1) % qs.length; wait = 400; }
    timer = setTimeout(tick, wait);
  }
  const startTyping = () => { clearTimeout(timer); ci = 0; del = false; tick(); };
  const stopTyping = () => clearTimeout(timer);

  const depths = $$(".depth", stage);
  stage.addEventListener("pointermove", (e) => {
    if (reduced()) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    depths.forEach((g) => { const d = +g.dataset.d; g.style.transform = `translate(${(-px * d).toFixed(1)}px,${(-py * d * 0.5).toFixed(1)}px)`; });
  });
  stage.addEventListener("pointerleave", () => depths.forEach((g) => (g.style.transform = "")));

  const mbtn = $("#motion-btn");
  let stored = null;
  try { stored = localStorage.getItem("lyn-motion"); } catch (e) {}
  if (stored === "reduced") { root.dataset.motion = "reduced"; root.classList.remove("can-reveal"); $$(".reveal").forEach((el) => el.classList.add("in")); }
  const syncMotion = () => {
    const on = reduced();
    for (const btn of [mbtn, $("#motion-btn-mobile")]) {
      if (!btn) continue;
      btn.setAttribute("aria-pressed", String(on));
      btn.textContent = mq.matches ? "Motion reduced by system" : on ? "Motion reduced" : "Reduce motion";
    }
  };
  syncMotion();
  function toggleMotion() {
    if (root.dataset.motion === "reduced") delete root.dataset.motion; else root.dataset.motion = "reduced";
    try { localStorage.setItem("lyn-motion", root.dataset.motion || "full"); } catch (e) {}
    if (reduced()) { root.classList.remove("can-reveal"); $$(".reveal").forEach((el) => el.classList.add("in")); }
    syncMotion();
    depths.forEach((g) => (g.style.transform = ""));
    if (!$("#view-world").hidden) startTyping();
  }

  /* Mobile-only compact controls. They do not change desktop Studio. */
  const settingsToggle = $("#studio-settings-toggle");
  const settingsMenu = $("#studio-settings-menu");
  const projectsToggle = $("#studio-projects-toggle");
  const projectMenu = $("#jump");
  function setStudioSettings(open) {
    settingsMenu.hidden = !open;
    settingsToggle.setAttribute("aria-expanded", String(open));
  }
  function setProjectMenu(open) {
    projectMenu.hidden = !open;
    projectsToggle.setAttribute("aria-expanded", String(open));
  }
  /* ---------- Views and history ---------- */
  function show(v) {
    root.classList.toggle("studio-open", v === "world");
    if (v !== "world") {
      setStudioSettings(false);
      setProjectMenu(false);
    }
    ["home", "world", "case"].forEach((n) => { $("#view-" + n).hidden = n !== v; });
    if (v === "world") startTyping(); else { stopTyping(); setActive(null); card.hidden = true; stage.classList.remove("preview-open"); }
  }
  function showHome(id, o = {}) {
    const { push = true } = o;
    show("home");
    document.title = baseTitle;
    if (push) pushHash(id ? "#" + id : location.pathname + location.search, { view: "home", section: id });
    if (id) {
      const el = document.getElementById(id);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" }));
    } else toTop();
  }
  function enterWorld(o = {}) {
    const { obj = null, push = true, animate = false, origin = null, returning = false } = o;
    const was = !$("#view-world").hidden;
    show("world");
    document.title = "Lyn's studio | " + D.site.name;
    if (push) pushHash(obj ? "#world/" + obj : "#world", { view: "world", obj });
    if (!was) toTop();
    const v = $("#view-world");
    if (animate && !reduced()) {
      v.style.setProperty("--rx", (origin ? origin.x : 50) + "%");
      v.style.setProperty("--ry", (origin ? origin.y : 30) + "%");
      v.classList.remove("world-enter"); void v.offsetWidth; v.classList.add("world-enter");
    }
    requestAnimationFrame(() => {
      if (obj) {
        if (returning && !reduced()) { zoomOut(obj); setTimeout(() => openObj(obj, { updateUrl: false }), 520); }
        else openObj(obj, { updateUrl: false });
      } else { card.hidden = true; stage.classList.remove("preview-open"); setActive(null); focusEl(mobileStudio.matches ? $("#world-mobile-h") : $("#world-h")); }
    });
  }
  $("#view-world").addEventListener("animationend", (e) => { if (e.target.id === "view-world") e.target.classList.remove("world-enter"); });

  function openCase(id, o = {}) {
    const { from = null, obj = null, push = true, replace = false, fromWorldEntry = false } = o;
    const prevSt = history.state || {};
    ctx.from = from; ctx.obj = obj || objForCase(id); ctx.caseId = id;
    if (!renderCase(id)) return;
    show("case");
    const st = { view: "case", id, from, obj: ctx.obj,
      worldEntry: fromWorldEntry || (replace && !!prevSt.worldEntry),
      origObj: fromWorldEntry ? ctx.obj : (replace ? prevSt.origObj || null : null) };
    if (from === "home" && push && !replace) replaceHash("#work", { view: "home", section: "work" });
    if (replace) replaceHash("#case/" + id, st); else if (push) pushHash("#case/" + id, st);
    toTop();
    focusEl($("#case-h"));
    arm($("#view-case"));   // start count-ups, bar fills and card fade-ins for this case
  }
  function backToWorld() {
    const st = history.state;
    if (canHistory && st && st.worldEntry && st.origObj === ctx.obj) { history.back(); return; }
    enterWorld({ obj: ctx.obj, returning: true });
  }
  const originFrom = (e) => (e && e.detail > 0 ? { x: Math.round(e.clientX / window.innerWidth * 100), y: Math.min(70, Math.round(e.clientY / window.innerHeight * 100)) } : null);

  root.addEventListener("click", (e) => {
    const g = e.target.closest("[data-go]");
    if (g) {
      e.preventDefault();
      const t = g.dataset.go;
      if (t === "world") enterWorld({ animate: true, origin: originFrom(e) });
      else if (t.startsWith("case:")) openCase(t.slice(5), { from: "home" });
      else showHome(t === "home" ? null : t);
      return;
    }
    const a = e.target.closest("[data-act]");
    if (a) {
      const k = a.dataset.act;
      if (k === "replay-evidence") replayEvidence(a.closest("section"));
      else if (k === "scroll") {
        const el = document.getElementById(a.dataset.target);
        if (el) { el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" }); el.setAttribute("tabindex", "-1"); focusEl(el); }
      }
      else if (k === "back-world") backToWorld();
      else if (k === "visit-world") enterWorld({ obj: ctx.obj || objForCase(ctx.caseId), animate: true, origin: originFrom(e) });
      else if (k === "open") openFromObject(a.dataset.target);
      else if (k === "leave") showHome(null);
      else if (k === "motion") toggleMotion();
      else if (k === "studio-settings") setStudioSettings(settingsMenu.hidden);
      else if (k === "toggle-projects") setProjectMenu(projectMenu.hidden);
      else if (k === "lamp") cycleLamp();
      else if (k === "plant") surprisePlant();
      else if (k === "top") toTop();
      else if (k === "pager") { const t = a.dataset.target; openCase(t, { from: ctx.from, obj: ctx.from === "world" ? objForCase(t) : null, replace: true }); }
      return;
    }
    if (e.target.closest("[data-close]")) { closeCard(); return; }
    const h = e.target.closest(".hot");
    if (h) { lastHot = h; openObj(h.dataset.obj); return; }
    const j = e.target.closest("[data-obj-btn]");
    if (j) { lastHot = j; setProjectMenu(false); openObj(j.dataset.objBtn); return; }
    if (!e.target.closest(".studio-settings-area")) setStudioSettings(false);
  });
  stage.addEventListener("keydown", (e) => {
    const interactive = e.target.closest && e.target.closest(".lamp-switch, .plant-hot");
    if (interactive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      if (interactive === lamp) cycleLamp(); else surprisePlant();
      return;
    }
    const h = e.target.closest && e.target.closest(".hot");
    if (!h) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lastHot = h; openObj(h.dataset.obj); }
    else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const hs = $$(".hot", stage), i = hs.indexOf(h);
      hs[(i + (e.key === "ArrowRight" ? 1 : -1) + hs.length) % hs.length].focus();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || $("#view-world").hidden) return;
    if (!settingsMenu.hidden) { setStudioSettings(false); focusEl(settingsToggle); }
    else if (!card.hidden) closeCard();
    else if (!projectMenu.hidden) { setProjectMenu(false); focusEl(projectsToggle); }
  });
  window.addEventListener("resize", () => { if (activeObj && !card.hidden) placeCard(activeObj); });

  function route() {
    const [a, b] = location.hash.slice(1).split("/");
    const st = history.state || {};
    if (a === "case" && b) { openCase(b, { from: st.from || null, obj: st.obj || null, push: false }); return; }
    if (a === "world") { const fromCase = !$("#view-case").hidden; enterWorld({ obj: b || null, push: false, returning: fromCase }); return; }
    showHome(a && document.getElementById(a) ? a : null, { push: false });
  }
  window.addEventListener("popstate", route);
  route();
})();
