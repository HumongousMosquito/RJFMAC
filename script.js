// Renders content.js onto the page and handles tab switching.
// You shouldn't need to edit this file.

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "long", day: "numeric", year: "numeric",
  });
}

function renderAnnouncements() {
  const list = document.getElementById("announcement-list");
  const items = [...ANNOUNCEMENTS].sort((a, b) => b.date.localeCompare(a.date));
  if (!items.length) {
    list.innerHTML = `<p class="empty">No announcements yet.</p>`;
    return;
  }
  list.innerHTML = items.map(a => `
    <article class="entry announcement">
      <time datetime="${a.date}">${formatDate(a.date)}</time>
      <div>
        <h3>${a.title}</h3>
        <p>${a.body}</p>
      </div>
    </article>`).join("");
}

// True if today falls within the 7 days starting on weekOf.
function isCurrentWeek(weekOf) {
  const [y, m, d] = weekOf.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const end = new Date(y, m - 1, d + 7);
  const now = new Date();
  return now >= start && now < end;
}

function renderProblems() {
  const list = document.getElementById("problem-list");
  if (!PROBLEMS.length) {
    list.innerHTML = `<p class="empty">The first problem will be posted soon.</p>`;
    return;
  }

  // Group problems by week, newest week first.
  const weeks = {};
  for (const p of PROBLEMS) (weeks[p.week] ||= []).push(p);
  const order = Object.keys(weeks).map(Number).sort((a, b) => b - a);

  list.innerHTML = order.map(w => {
    const problems = weeks[w];
    const weekOf = problems[0].weekOf;
    return `
    <section class="week">
      <div class="week-head">
        <h3>Week ${w}</h3>
        <p class="meta">${formatDate(weekOf)}</p>
        ${isCurrentWeek(weekOf) ? `<span class="current">Double points this week</span>` : ""}
      </div>
      ${problems.map(p => `
        <article class="entry problem">
          <div class="problem-title">
            <h4>${p.title}</h4>
            ${p.points != null ? `<span class="points">${p.points} ${p.points === 1 ? "pt" : "pts"}</span>` : ""}
          </div>
          <div class="statement">
            ${p.statement}
            ${p.image ? `<img class="diagram" src="${p.image}" alt="${escapeHtml(p.imageAlt || "Diagram for " + p.title)}" loading="lazy">` : ""}
          </div>
        </article>`).join("")}
    </section>`;
  }).join("");
}

function renderRules() {
  document.getElementById("rule-list").innerHTML =
    RULES.map(r => `<li><span>${r}</span></li>`).join("");
}

function renderFaq() {
  document.getElementById("faq-list").innerHTML = FAQ.map(f => `
    <details class="faq">
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>`).join("");
}

function renderResources() {
  const list = document.getElementById("resource-list");
  if (!RESOURCES.length) {
    list.innerHTML = `<p class="empty">Nothing here yet.</p>`;
    return;
  }
  list.innerHTML = RESOURCES.map(r => `
    <article class="entry resource">
      <h3><a href="${r.link}" target="_blank" rel="noopener">${r.title}</a> <span class="arrow" aria-hidden="true">↗</span></h3>
      ${r.description ? `<p>${r.description}</p>` : ""}
    </article>`).join("");
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

async function renderLeaderboard() {
  const box = document.getElementById("leaderboard-table");
  const updated = document.getElementById("leaderboard-updated");
  let data;
  try {
    const res = await fetch("scores.json", { cache: "no-cache" });
    data = await res.json();
  } catch {
    box.innerHTML = `<p class="empty">The leaderboard couldn't be loaded.</p>`;
    return;
  }

  const teams = [...(data.teams || [])].sort((a, b) => b.score - a.score);
  if (data.updated) updated.textContent = `Updated ${formatDate(data.updated)}`;
  if (!teams.length) {
    box.innerHTML = `<p class="empty">No scores yet.</p>`;
    return;
  }

  // Tied scores share the same rank (1, 2, 2, 4, ...).
  let rank = 0;
  const rows = teams.map((t, i) => {
    if (i === 0 || t.score !== teams[i - 1].score) rank = i + 1;
    const top = rank === 1 ? ` class="top-1"` : "";
    return `<tr${top}><td class="rank">${rank}</td><td class="team">${escapeHtml(t.name)}</td><td class="score">${t.score}</td></tr>`;
  }).join("");

  box.innerHTML = `
    <table class="leaderboard">
      <thead><tr><th class="rank">Rank</th><th>Team</th><th class="score">Score</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function showTab(name) {
  const valid = ["announcements", "rules", "potw", "leaderboard", "resources", "register", "faq", "questions"];
  if (!valid.includes(name)) name = "announcements";
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.dataset.panel === name));
  document.querySelectorAll(".tab").forEach(t => {
    const on = t.dataset.tab === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
    if (on) t.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll(".tab").forEach(t =>
  t.addEventListener("click", () => { location.hash = t.dataset.tab; }));
window.addEventListener("hashchange", () => showTab(location.hash.slice(1)));

document.getElementById("register-link").href = LINKS.register;
document.getElementById("team-register-link").href = LINKS.teamRegister;
document.getElementById("questions-link").href = LINKS.questions;
document.getElementById("potw-link").href = LINKS.potw;

renderAnnouncements();
renderProblems();
renderLeaderboard();
renderResources();
renderRules();
renderFaq();
showTab(location.hash.slice(1));

renderMathInElement(document.body, {
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
  ],
});
