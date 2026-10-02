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
    <article class="card">
      <time>${formatDate(a.date)}</time>
      <h3>${a.title}</h3>
      <p>${a.body}</p>
    </article>`).join("");
}

function renderProblems() {
  const list = document.getElementById("problem-list");
  const items = [...PROBLEMS].sort((a, b) => b.week - a.week);
  if (!items.length) {
    list.innerHTML = `<p class="empty">The first problem will be posted soon.</p>`;
    return;
  }
  list.innerHTML = items.map(p => `
    <article class="card problem">
      <div class="problem-head">
        <span class="badges">
          <span class="badge">Week ${p.week}</span>
          ${p.points != null ? `<span class="badge badge-points">${p.points} ${p.points === 1 ? "point" : "points"}</span>` : ""}
        </span>
        <span class="status">Week of ${formatDate(p.weekOf)}</span>
      </div>
      <h3>${p.title}</h3>
      <div class="statement">${p.statement}</div>
    </article>`).join("");
}

function renderRules() {
  const items = typeof RULES === "undefined" ? [] : RULES;
  document.getElementById("rule-list").innerHTML =
    items.map(r => `<li>${r}</li>`).join("");
}

function renderFaq() {
  const list = document.getElementById("faq-list");
  const items = typeof FAQ === "undefined" ? [] : FAQ;
  list.innerHTML = items.map(f => `
    <details class="card faq">
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>`).join("");
}

function renderResources() {
  const list = document.getElementById("resource-list");
  const items = typeof RESOURCES === "undefined" ? [] : RESOURCES;
  if (!items.length) {
    list.innerHTML = `<p class="empty">Resources coming soon.</p>`;
    return;
  }
  list.innerHTML = items.map(r => `
    <a class="card resource" href="${r.link}" target="_blank" rel="noopener">
      <h3>${r.title} <span class="arrow" aria-hidden="true">↗</span></h3>
      ${r.description ? `<p>${r.description}</p>` : ""}
    </a>`).join("");
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
  if (data.updated) updated.textContent = `Last updated ${formatDate(data.updated)}`;
  if (!teams.length) {
    box.innerHTML = `<p class="empty">No scores yet. Solve a problem to get your team on the board!</p>`;
    return;
  }

  // Tied scores share the same rank (1, 2, 2, 4, ...).
  let rank = 0;
  const rows = teams.map((t, i) => {
    if (i === 0 || t.score !== teams[i - 1].score) rank = i + 1;
    const top = rank <= 3 ? ` class="top top-${rank}"` : "";
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
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === name));
  document.querySelectorAll(".tab").forEach(t => {
    const on = t.dataset.tab === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
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
