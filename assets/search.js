/* ============================================================
   search.js — site-wide fuzzy search.
   Loads Fuse.js from CDN, builds an index across recipes,
   techniques, glossary, troubleshoot, reviews and insider.
   Falls back gracefully if the CDN fails (main.js has a basic
   substring search built in).
   ============================================================ */

(function () {
  "use strict";

  let fuse = null;
  let docs = [];

  function buildIndex() {
    const types = [
      { key: "RECIPES",      type: "recipe",       path: "recipes" },
      { key: "TECHNIQUES",   type: "technique",    path: "techniques" },
      { key: "INSIDER",      type: "insider",      path: "insider" },
      { key: "REVIEWS",      type: "review",       path: "reviews" },
      { key: "TROUBLESHOOT", type: "troubleshoot", path: "troubleshoot" },
      { key: "GLOSSARY",     type: "glossary",     path: "glossary" },
      { key: "NOTEBOOK",     type: "notebook",     path: "notebook" },
    ];
    docs = [];
    types.forEach(t => {
      (window[t.key] || []).forEach(item => {
        if (item.draft) return;
        const ingredients = (item.ingredients || []).flatMap(g => g.items.map(i => i.item)).join(", ");
        docs.push({
          type: t.type,
          path: t.path,
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle || "",
          cuisine: item.cuisine || "",
          ingredients,
        });
      });
    });

    if (typeof Fuse !== "undefined") {
      fuse = new Fuse(docs, {
        keys: [
          { name: "title",       weight: 0.5 },
          { name: "subtitle",    weight: 0.2 },
          { name: "ingredients", weight: 0.2 },
          { name: "cuisine",     weight: 0.1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      });
    }
  }

  function search(query) {
    if (!query) return [];
    if (fuse) return fuse.search(query).slice(0, 20).map(r => r.item);
    const q = query.toLowerCase();
    return docs.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.subtitle.toLowerCase().includes(q) ||
      d.ingredients.toLowerCase().includes(q)
    ).slice(0, 20);
  }

  window.openSiteSearch = function () {
    buildIndex();
    const overlay = document.createElement("div");
    overlay.className = "search-overlay visible";
    overlay.innerHTML = `
      <div class="search-modal">
        <input type="text" placeholder="Search recipes, techniques, ingredients…" autofocus />
        <div class="search-results"></div>
      </div>`;
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });

    const input = overlay.querySelector("input");
    const results = overlay.querySelector(".search-results");

    function update() {
      const q = input.value.trim();
      results.innerHTML = "";
      if (!q) return;
      const hits = search(q);
      if (!hits.length) {
        const empty = document.createElement("div");
        empty.style.padding = "20px 28px";
        empty.style.color = "var(--c-mute)";
        empty.textContent = "No matches. Try a simpler word.";
        results.appendChild(empty);
        return;
      }
      hits.forEach(h => {
        const a = document.createElement("a");
        a.href = `/${h.path}/${h.slug}/`;
        a.innerHTML = `<div class="r-title">${h.title}</div><div class="r-sub">${h.subtitle || h.type}</div>`;
        results.appendChild(a);
      });
    }

    input.addEventListener("input", update);
    input.addEventListener("keydown", e => { if (e.key === "Escape") overlay.remove(); });
    document.body.appendChild(overlay);
    setTimeout(() => input.focus(), 50);
  };
})();
