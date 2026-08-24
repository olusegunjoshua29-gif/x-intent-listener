const $ = id => document.getElementById(id);
const intent = $("intent"), keywords = $("keywords"), results = $("results"), status = $("status"), queryBox = $("query"), mode = $("mode");

async function health() {
  try {
    const r = await fetch("/api/health");
    const d = await r.json();
    mode.textContent = d.mode === "live" ? "LIVE X API" : "DEMO MODE";
  } catch { mode.textContent = "Offline"; }
}
function timeAgo(iso) {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  return mins < 60 ? `${mins}m ago` : `${Math.round(mins/60)}h ago`;
}
function render(posts) {
  if (!posts.length) { results.innerHTML = '<div class="empty">No matching posts found. Try broader terms.</div>'; return; }
  results.innerHTML = posts.map(p => `
    <article class="card">
      <div class="top">
        <div><span class="author">${escapeHtml(p.authorName || p.author)}</span> <span class="handle">@${escapeHtml(p.author)}</span></div>
        <div class="score">${p.relevance}% intent</div>
      </div>
     <div class="text">${escapeHtml(p.text)}</div>

${p.reasons?.length ? `
  <div class="reasons">
    <strong>Why it matched:</strong>
    <ul>
      ${p.reasons.map(reason => `<li>${escapeHtml(reason)}</li>`).join("")}
    </ul>
  </div>
` : ""}
      <div class="meta">
        <span>${timeAgo(p.created_at)}</span>
        <span>♥ ${p.public_metrics?.like_count || 0}</span>
        <a href="${p.url}" target="_blank" rel="noopener">View on X ↗</a>
      </div>
    </article>`).join("");
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
async function search() {
  const i = intent.value.trim(), k = keywords.value.trim();
  if (!i && !k) return;
  $("search").disabled = true; status.textContent = "Searching…"; results.innerHTML = "";
  try {
    const r = await fetch("/api/search", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({intent:i,keywords:k})});
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || "Search failed");
    queryBox.textContent = d.query;
    status.textContent = `${d.posts.length} result(s) • ${d.mode === "live" ? "live X API" : "demo data"} • ${new Date(d.fetchedAt).toLocaleTimeString()}`;
    render(d.posts);
    mode.textContent = d.mode === "live" ? "LIVE X API" : "DEMO MODE";
  } catch(e) {
    status.textContent = e.message; results.innerHTML = '<div class="empty">Search failed. Check your X credentials and server log.</div>';
  } finally { $("search").disabled = false; }
}
$("search").onclick = search;
$("demo").onclick = () => {
  intent.value = "Find people on X looking for someone to build a custom AI workflow or automation";
  keywords.value = "AI automation workflow";
  search();
};
health();