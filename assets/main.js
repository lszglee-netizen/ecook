/* ============================================================
   ecook.wiki — main.js (router + hydrator)
   This file:
     • detects what kind of page is being viewed
     • renders the appropriate UI from data files (recipes.js, etc.)
     • injects meta tags and JSON-LD schema
     • wires up save / share / copy / cookie banner / newsletter
   ============================================================ */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Utility helpers
     --------------------------------------------------------- */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      node.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
    });
    return node;
  };
  const fmt = {
    minutes(m) {
      if (!m) return "—";
      if (m < 60) return `${m} min`;
      const h = Math.floor(m / 60), r = m % 60;
      return r ? `${h} hr ${r}` : `${h} hr`;
    },
    spice(n) { return n > 0 ? "🌶".repeat(Math.max(1, Math.min(5, n))) : "Mild"; },
    date(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    },
  };
  const escapeHtml = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  // If `path` already starts with http(s):// use it as-is; otherwise prepend site.url.
  // Lets recipes use either local paths ("/images/foo/cover.jpg") or absolute CDN URLs.
  const absUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return (window.SITE && window.SITE.url ? window.SITE.url : "") + path;
  };

  /* ---------------------------------------------------------
     Route detection
     --------------------------------------------------------- */
  function detectRoute() {
    const path = location.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    const explicit = window.PAGE_TYPE; // set on individual templates
    const parts = path.split("/").filter(Boolean);

    if (explicit) return { type: explicit, slug: window.SLUG || parts[parts.length - 1] };
    if (path === "/" || path === "")                       return { type: "home" };
    if (parts[0] === "recipes"     && parts[1]) return { type: "recipe",      slug: parts[1] };
    if (parts[0] === "techniques"  && parts[1]) return { type: "technique",   slug: parts[1] };
    if (parts[0] === "insider"     && parts[1]) return { type: "insider",     slug: parts[1] };
    if (parts[0] === "reviews"     && parts[1]) return { type: "review",      slug: parts[1] };
    if (parts[0] === "troubleshoot"&& parts[1]) return { type: "troubleshoot",slug: parts[1] };
    if (parts[0] === "glossary"    && parts[1]) return { type: "glossary",    slug: parts[1] };
    if (parts[0] === "notebook"    && parts[1]) return { type: "notebook",    slug: parts[1] };
    if (parts[0] === "about")    return { type: "about" };
    if (parts[0] === "contact")  return { type: "contact" };
    if (parts[0] === "privacy")  return { type: "privacy" };
    if (parts[0] === "terms")    return { type: "terms" };
    return { type: "404" };
  }

  /* ---------------------------------------------------------
     Meta tag injection (per-page TDK + OG)
     --------------------------------------------------------- */
  function setMeta({ title, description, image, url, type }) {
    const site = window.SITE;
    const fullTitle = title || `${site.name} — ${site.tagline}`;
    const desc = description || site.description;
    const img = image || absUrl(site.defaultShareImage);
    const canonicalUrl = url || site.url + location.pathname;

    document.title = fullTitle;
    const ensure = (selector, create) => $(selector) || document.head.appendChild(create());
    const setAttr = (selector, attr, value) => {
      const node = $(selector);
      if (node) node.setAttribute(attr, value);
    };

    ensure('meta[name="description"]',
      () => el("meta", { name: "description", content: desc }));
    setAttr('meta[name="description"]', "content", desc);

    // Open Graph
    const og = [
      ["og:type",        type || "website"],
      ["og:url",         canonicalUrl],
      ["og:title",       fullTitle],
      ["og:description", desc],
      ["og:image",       img],
      ["og:site_name",   site.name],
    ];
    og.forEach(([prop, val]) => {
      const sel = `meta[property="${prop}"]`;
      ensure(sel, () => el("meta", { property: prop, content: val }));
      setAttr(sel, "content", val);
    });

    // Twitter Card
    const tw = [
      ["twitter:card",        "summary_large_image"],
      ["twitter:title",       fullTitle],
      ["twitter:description", desc],
      ["twitter:image",       img],
    ];
    tw.forEach(([name, val]) => {
      const sel = `meta[name="${name}"]`;
      ensure(sel, () => el("meta", { name, content: val }));
      setAttr(sel, "content", val);
    });

    // Canonical
    const canonical = ensure('link[rel="canonical"]', () => el("link", { rel: "canonical", href: canonicalUrl }));
    canonical.setAttribute("href", canonicalUrl);
  }

  /* ---------------------------------------------------------
     JSON-LD injection
     --------------------------------------------------------- */
  function setJsonLd(data) {
    const id = "ld-json";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const s = el("script", { type: "application/ld+json", id });
    s.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------
     Saved recipes (localStorage)
     --------------------------------------------------------- */
  const SAVED_KEY = "ecook.saved.v1";
  const saved = {
    get() {
      try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); }
      catch (e) { return []; }
    },
    set(arr) { localStorage.setItem(SAVED_KEY, JSON.stringify(arr)); },
    has(slug) { return this.get().includes(slug); },
    toggle(slug) {
      const list = this.get();
      const i = list.indexOf(slug);
      if (i >= 0) list.splice(i, 1); else list.push(slug);
      this.set(list);
      return i < 0; // true if now saved
    },
  };

  /* ---------------------------------------------------------
     Cookie banner
     --------------------------------------------------------- */
  const COOKIE_KEY = "ecook.cookies.v1";
  function mountCookieBanner() {
    if (localStorage.getItem(COOKIE_KEY) === "ok") return;
    const c = window.SITE.cookies;
    const banner = el("div", { class: "cookie-banner visible" }, [
      el("span", { html: `${escapeHtml(c.message)} <a href="/privacy/">${escapeHtml(c.learnMore)}</a>` }),
      el("button", { onclick: () => { localStorage.setItem(COOKIE_KEY, "ok"); banner.remove(); } }, [c.accept]),
    ]);
    document.body.appendChild(banner);
  }

  /* ---------------------------------------------------------
     Site header + footer
     --------------------------------------------------------- */
  function mountHeader() {
    if ($(".site-header")) return; // already in HTML
    const site = window.SITE;
    const hdr = el("header", { class: "site-header" }, [
      el("div", { class: "wrap nav" }, [
        el("a", { class: "brand", href: "/" }, [site.name]),
        el("nav", { class: "nav-links" }, [
          el("a", { href: "/" }, ["Recipes"]),
          el("a", { href: "/about/" }, ["About"]),
          el("button", { class: "nav-search-btn", onclick: openSearch }, ["⌕ Search"]),
        ]),
      ]),
    ]);
    document.body.insertBefore(hdr, document.body.firstChild);
  }

  function mountFooter() {
    if ($(".site-footer")) return;
    const site = window.SITE;
    const ftr = el("footer", { class: "site-footer" }, [
      el("div", { class: "wrap" }, [
        el("div", { class: "foot-cols" }, [
          el("div", {}, [
            el("h4", {}, ["ecook.wiki"]),
            el("p", { html:
              `Recipes, techniques, and industry honesty from <a href="/about/">Chef ${escapeHtml(site.author.name)}</a> — thirty years in Chinese kitchens, now writing it all down.`
            }),
          ]),
          el("div", {}, [
            el("h4", {}, ["Explore"]),
            el("ul", {}, [
              el("li", {}, [el("a", { href: "/" }, ["All Recipes"])]),
              el("li", {}, [el("a", { href: "/tools/pantry/" }, ["What can I cook?"])]),
              el("li", {}, [el("a", { href: "/about/" }, ["About Li Shi'an"])]),
              site.newsletter && site.newsletter.publicSubscribeUrl
                ? el("li", {}, [el("a", { href: site.newsletter.publicSubscribeUrl, target: "_blank", rel: "noopener" }, ["Subscribe to Shi'an's Notebook →"])])
                : null,
            ]),
          ]),
          el("div", {}, [
            el("h4", {}, ["Legal"]),
            el("ul", {}, [
              el("li", {}, [el("a", { href: "/privacy/" }, ["Privacy"])]),
              el("li", {}, [el("a", { href: "/terms/" }, ["Terms"])]),
              el("li", {}, [el("a", { href: "/contact/" }, ["Contact"])]),
            ]),
          ]),
        ]),
        el("div", { class: "foot-bottom" }, [
          el("span", {}, [`© ${site.copyrightYear} ${site.name}. All recipes by ${site.author.name}.`]),
          el("span", {}, ["Made with care in a quiet kitchen."]),
        ]),
      ]),
    ]);
    document.body.appendChild(ftr);
    if (site.adsense && site.adsense.enabled) document.body.classList.add("ad-enabled");
  }

  /* ---------------------------------------------------------
     Newsletter block
     --------------------------------------------------------- */
  function newsletterBlock() {
    const nl = window.SITE.newsletter;
    if (!nl || !nl.enabled) return null;
    return el("section", { class: "newsletter" }, [
      el("h3", {}, [nl.headline]),
      el("p", {}, [nl.pitch]),
      el("form", {
        action: nl.formAction,
        method: "post",
        target: "popupwindow",
        onsubmit: () => { window.open(nl.formAction, "popupwindow"); return true; },
      }, [
        el("input", { type: "email", name: "email", required: "required", placeholder: "your@email.com" }),
        el("button", { type: "submit" }, ["Subscribe"]),
      ]),
    ]);
  }

  /* ---------------------------------------------------------
     HOME PAGE
     --------------------------------------------------------- */
  function renderHome(mount) {
    const site = window.SITE;
    setMeta({
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: site.url + "/",
      type: "website",
    });
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: site.name,
      url: site.url + "/",
      description: site.description,
      author: {
        "@type": "Person",
        name: site.author.name,
        jobTitle: site.author.jobTitle,
      },
    });

    const all = (window.RECIPES || []).filter(r => !r.draft);
    const fresh = (r) => {
      const days = (Date.now() - new Date(r.date).getTime()) / 86400000;
      return days < site.sort.freshDays;
    };
    const sorted = all.slice().sort((a, b) => {
      const af = fresh(a), bf = fresh(b);
      if (af !== bf) return af ? -1 : 1;
      if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
      return new Date(b.date) - new Date(a.date);
    });

    mount.appendChild(el("section", { class: "hero" }, [
      el("h1", {}, [site.tagline]),
      el("p", {}, [site.description]),
    ]));

    const tabs = el("div", { class: "tabs wrap" });
    site.categories.forEach((c, i) => {
      tabs.appendChild(el("button", {
        class: "tab" + (i === 0 ? " active" : ""),
        "data-cat": c.id,
        onclick: function () {
          $$(".tab").forEach(t => t.classList.remove("active"));
          this.classList.add("active");
          filterCards(c.id);
        },
      }, [c.label]));
    });
    mount.appendChild(tabs);

    const grid = el("section", { class: "grid wrap" });
    sorted.forEach(r => grid.appendChild(recipeCard(r)));
    mount.appendChild(grid);

    function filterCards(cat) {
      const savedList = saved.get();
      $$(".grid .card").forEach(card => {
        const c = card.dataset.cat;
        const slug = card.dataset.slug;
        if (cat === "all") card.classList.remove("hide");
        else if (cat === "saved") card.classList.toggle("hide", !savedList.includes(slug));
        else card.classList.toggle("hide", c !== cat);
      });
    }
  }

  function recipeCard(r) {
    const fresh = (Date.now() - new Date(r.date).getTime()) / 86400000 < window.SITE.sort.freshDays;
    return el("article", { class: "card", "data-cat": r.category, "data-slug": r.slug }, [
      el("a", { href: `/recipes/${r.slug}/` }, [
        el("img", { class: "card-cover", src: r.cover, alt: r.coverAlt, loading: "lazy" }),
        el("div", { class: "card-body" }, [
          fresh ? el("span", { class: "fresh-pill" }, ["Just added"]) : null,
          el("h3", { class: "card-title" }, [r.title]),
          el("p", { class: "card-sub" }, [r.subtitle]),
          el("div", { class: "card-meta" }, [
            el("span", {}, [fmt.minutes(r.totalTime)]),
            el("span", {}, [r.difficulty]),
            el("span", {}, [r.cuisine]),
          ]),
        ]),
      ]),
    ]);
  }

  /* ---------------------------------------------------------
     RECIPE PAGE
     --------------------------------------------------------- */
  function renderRecipe(mount, slug) {
    const r = (window.RECIPES || []).find(x => x.slug === slug);
    if (!r) return render404(mount);
    const site = window.SITE;

    setMeta({
      title: r.metaTitle || `${r.title} | ${site.name}`,
      description: r.metaDescription || r.subtitle,
      image: absUrl(r.cover),
      url: `${site.url}/recipes/${r.slug}/`,
      type: "article",
    });

    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: r.title,
      image: [absUrl(r.cover)],
      author: { "@type": "Person", name: site.author.name, jobTitle: site.author.jobTitle, url: site.url + "/about/" },
      datePublished: r.date,
      dateModified: r.lastModified || r.date,
      description: r.metaDescription || r.subtitle,
      recipeCuisine: r.cuisine,
      recipeCategory: r.category,
      prepTime: `PT${r.prepTime || 0}M`,
      cookTime: `PT${r.cookTime || 0}M`,
      totalTime: `PT${r.totalTime || 0}M`,
      recipeYield: `${r.servings} servings`,
      recipeIngredient: r.ingredients.flatMap(g => g.items.map(i =>
        `${i.qty} ${i.item}${i.note ? " " + i.note : ""}`)),
      recipeInstructions: r.instructions.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: s.text,
        image: s.image ? absUrl(s.image) : undefined,
      })),
      mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/recipes/${r.slug}/` },
    });

    // Add FAQPage Schema separately if FAQs exist
    if (r.faqs && r.faqs.length && r.faqs[0].q && !r.faqs[0].q.startsWith("PLACEHOLDER")) {
      const faqJson = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: r.faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
      const s = el("script", { type: "application/ld+json", id: "ld-faq" });
      s.textContent = JSON.stringify(faqJson);
      document.head.appendChild(s);
    }

    // ----- header
    mount.appendChild(el("div", { class: "wrap-narrow" }, [
      el("nav", { class: "breadcrumb" }, [
        el("a", { href: "/" }, ["Home"]), " / ",
        el("a", { href: `/?cat=${r.category}` }, [categoryLabel(r.category)]), " / ",
        el("span", {}, [r.title]),
      ]),
      el("header", { class: "article-header" }, [
        el("h1", {}, [r.title]),
        el("p", { class: "article-sub" }, [r.subtitle]),
      ]),
      el("div", { class: "cover-wrap" }, [
        el("img", { src: r.cover, alt: r.coverAlt, loading: "eager" }),
      ]),
      el("div", { class: "meta-card" }, [
        metaItem("Total time", fmt.minutes(r.totalTime)),
        metaItem("Difficulty", r.difficulty),
        metaItem("Servings", String(r.servings)),
        metaItem("Spice", fmt.spice(r.spiceLevel)),
      ]),
    ]));

    const body = el("article", { class: "wrap-narrow" });

    // story
    if (r.story && !/^PLACEHOLDER/.test(r.story)) {
      const div = el("section", { class: "story" });
      r.story.split(/\n+/).forEach(p => div.appendChild(el("p", {}, [p])));
      body.appendChild(div);
    }

    // ad slot — article top
    body.appendChild(el("div", { class: "ad-slot", "data-slot": "articleTop" }, ["Advertisement"]));

    // why this works
    if (r.whyThisWorks && !/^PLACEHOLDER/.test(r.whyThisWorks)) {
      body.appendChild(el("section", { class: "why-block" }, [
        el("h3", {}, ["Why this works"]),
        el("p", {}, [r.whyThisWorks]),
      ]));
    }

    // ingredients
    const ing = el("section", { class: "ingredients" }, [
      el("h3", {}, [
        document.createTextNode("Ingredients"),
        el("button", { class: "copy-btn", onclick: copyIngredients(r) }, ["Copy list"]),
      ]),
    ]);
    r.ingredients.forEach(g => {
      const groupDiv = el("div", { class: "ing-group" }, [
        el("h4", {}, [g.group]),
        el("ul", { class: "ing-list" },
          g.items.map(i => el("li", {}, [
            el("span", { class: "ing-qty" }, [i.qty]),
            el("span", {}, [
              i.item,
              i.note ? el("span", { class: "ing-note" }, [" " + i.note]) : null,
            ]),
          ])),
        ),
      ]);
      ing.appendChild(groupDiv);
    });
    body.appendChild(ing);

    // ad slot — mid
    body.appendChild(el("div", { class: "ad-slot", "data-slot": "articleMid" }, ["Advertisement"]));

    // instructions
    const steps = el("section", {}, [
      el("h3", {}, ["Instructions"]),
      el("ol", { class: "steps" },
        r.instructions.map(s => el("li", {}, [
          s.image
            ? el("img", { class: "step-img", src: s.image, alt: s.imageAlt || "", loading: "lazy" })
            : el("div", { class: "step-img" }),
          el("div", { class: "step-text" }, [el("p", {}, [s.text])]),
        ])),
      ),
    ]);
    body.appendChild(steps);

    // notes
    if (r.notes && r.notes.length && !/^PLACEHOLDER/.test(r.notes[0])) {
      body.appendChild(el("section", { class: "notes" }, [
        el("h3", {}, [`From ${window.SITE.author.name}'s notebook`]),
        el("ul", {}, r.notes.map(n => el("li", {}, [n]))),
      ]));
    }

    // faqs
    if (r.faqs && r.faqs.length && !/^PLACEHOLDER/.test(r.faqs[0].q)) {
      const faq = el("section", { class: "faq" }, [el("h3", {}, ["Questions readers ask"])]);
      r.faqs.forEach(f => {
        faq.appendChild(el("details", {}, [
          el("summary", {}, [f.q]),
          el("p", {}, [f.a]),
        ]));
      });
      body.appendChild(faq);
    }

    // actions
    body.appendChild(actionRow(r));

    // related
    if (r.relatedRecipes && r.relatedRecipes.length) {
      const related = (r.relatedRecipes || [])
        .map(s => (window.RECIPES || []).find(x => x.slug === s))
        .filter(Boolean);
      if (related.length) {
        body.appendChild(el("section", { class: "related" }, [
          el("h3", {}, ["You might cook next"]),
          el("div", { class: "related-grid" }, related.map(recipeCard)),
        ]));
      }
    }

    // newsletter
    const nl = newsletterBlock();
    if (nl) body.appendChild(nl);

    // ad slot — end
    body.appendChild(el("div", { class: "ad-slot", "data-slot": "articleEnd" }, ["Advertisement"]));

    mount.appendChild(body);
  }

  function metaItem(label, value) {
    return el("div", { class: "meta-item" }, [
      el("div", { class: "label" }, [label]),
      el("div", { class: "value" }, [value]),
    ]);
  }

  function categoryLabel(catId) {
    const c = window.SITE.categories.find(x => x.id === catId);
    return c ? c.label : catId;
  }

  /* ---------------------------------------------------------
     Action row (copy ingredients / save / share / print)
     --------------------------------------------------------- */
  function actionRow(r) {
    const isSaved = saved.has(r.slug);
    const row = el("div", { class: "actions" });

    // SAVE
    const saveBtn = el("button", { class: "save-btn" + (isSaved ? " saved" : ""), title: "Save to your reading list" });
    function paintSave() {
      saveBtn.textContent = saved.has(r.slug) ? "♥ Saved" : "♡ Save";
      saveBtn.classList.toggle("saved", saved.has(r.slug));
    }
    paintSave();
    saveBtn.addEventListener("click", () => { saved.toggle(r.slug); paintSave(); });
    row.appendChild(saveBtn);

    // SHARE
    const shareBtn = el("button", {}, ["↗ Share"]);
    shareBtn.addEventListener("click", async () => {
      const data = {
        title: r.title,
        text: r.subtitle,
        url: window.SITE.url + `/recipes/${r.slug}/`,
      };
      try {
        if (navigator.share) await navigator.share(data);
        else { await navigator.clipboard.writeText(data.url); shareBtn.textContent = "Link copied"; setTimeout(() => shareBtn.textContent = "↗ Share", 1500); }
      } catch (e) { /* user cancelled */ }
    });
    row.appendChild(shareBtn);

    // PINTEREST
    const pinBtn = el("a", {
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.SITE.url + `/recipes/${r.slug}/`)}&media=${encodeURIComponent(absUrl(r.cover))}&description=${encodeURIComponent(r.title + " — " + r.subtitle)}`,
      target: "_blank",
      rel: "noopener",
    }, ["Pin it"]);
    row.appendChild(pinBtn);

    // PRINT
    const printBtn = el("button", { onclick: () => window.print() }, ["⎙ Print"]);
    row.appendChild(printBtn);

    return row;
  }

  /* ---------------------------------------------------------
     Copy ingredients helper
     --------------------------------------------------------- */
  function copyIngredients(r) {
    return async function () {
      const lines = [`${r.title} — shopping list`, ""];
      r.ingredients.forEach(g => {
        lines.push(g.group + ":");
        g.items.forEach(i => {
          lines.push(`  • ${i.qty} ${i.item}${i.note ? " " + i.note : ""}`);
        });
        lines.push("");
      });
      lines.push(`Source: ${window.SITE.url}/recipes/${r.slug}/`);
      try {
        await navigator.clipboard.writeText(lines.join("\n"));
        this.textContent = "Copied!";
        this.classList.add("copied");
        setTimeout(() => { this.textContent = "Copy list"; this.classList.remove("copied"); }, 1800);
      } catch (e) {
        this.textContent = "Copy failed";
      }
    };
  }

  /* ---------------------------------------------------------
     SIMPLE CONTENT PAGES (technique / insider / review / etc.)
     --------------------------------------------------------- */
  function renderArticle(mount, type, slug) {
    const sources = {
      technique:   window.TECHNIQUES,
      insider:     window.INSIDER,
      review:      window.REVIEWS,
      troubleshoot:window.TROUBLESHOOT,
      glossary:    window.GLOSSARY,
      notebook:    window.NOTEBOOK,
    };
    const arr = sources[type] || [];
    const a = arr.find(x => x.slug === slug);
    if (!a) return render404(mount);
    const site = window.SITE;

    setMeta({
      title: a.metaTitle || `${a.title} | ${site.name}`,
      description: a.metaDescription || a.subtitle || "",
      image: a.cover ? absUrl(a.cover) : undefined,
      url: `${site.url}/${typeToPath(type)}/${a.slug}/`,
      type: "article",
    });

    setJsonLd({
      "@context": "https://schema.org",
      "@type": type === "review" ? "Review" : "Article",
      headline: a.title,
      image: a.cover ? [absUrl(a.cover)] : undefined,
      datePublished: a.date,
      dateModified: a.lastModified || a.date,
      author: { "@type": "Person", name: site.author.name, jobTitle: site.author.jobTitle, url: site.url + "/about/" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/${typeToPath(type)}/${a.slug}/` },
    });

    mount.appendChild(el("div", { class: "wrap-narrow" }, [
      el("nav", { class: "breadcrumb" }, [
        el("a", { href: "/" }, ["Home"]), " / ",
        el("span", {}, [typeLabel(type)]), " / ",
        el("span", {}, [a.title]),
      ]),
      el("header", { class: "article-header" }, [
        el("h1", {}, [a.title]),
        a.subtitle ? el("p", { class: "article-sub" }, [a.subtitle]) : null,
      ]),
      a.cover ? el("div", { class: "cover-wrap" }, [
        el("img", { src: a.cover, alt: a.coverAlt || a.title }),
      ]) : null,
    ]));

    const body = el("article", { class: "wrap-narrow" });
    if (a.intro) {
      const div = el("section", { class: "story" });
      a.intro.split(/\n+/).forEach(p => div.appendChild(el("p", {}, [p])));
      body.appendChild(div);
    }
    if (a.sections) {
      a.sections.forEach(s => {
        body.appendChild(el("h2", {}, [s.heading]));
        s.body.split(/\n+/).forEach(p => body.appendChild(el("p", {}, [p])));
      });
    }
    if (a.body) {
      a.body.split(/\n+/).forEach(p => body.appendChild(el("p", {}, [p])));
    }
    if (a.reasons) {
      body.appendChild(el("h2", {}, ["The causes — and the fix for each"]));
      a.reasons.forEach((r, i) => {
        body.appendChild(el("h3", {}, [`${i + 1}. ${r.cause}`]));
        body.appendChild(el("p", {}, [r.fix]));
      });
    }
    if (a.faqs && a.faqs.length) {
      const faq = el("section", { class: "faq" }, [el("h3", {}, ["FAQ"])]);
      a.faqs.forEach(f => faq.appendChild(el("details", {}, [
        el("summary", {}, [f.q]),
        el("p", {}, [f.a]),
      ])));
      body.appendChild(faq);
    }

    // related recipes
    if (a.relatedRecipes && a.relatedRecipes.length) {
      const related = a.relatedRecipes.map(s => (window.RECIPES || []).find(x => x.slug === s)).filter(Boolean);
      if (related.length) {
        body.appendChild(el("section", { class: "related" }, [
          el("h3", {}, ["Recipes that use this"]),
          el("div", { class: "related-grid" }, related.map(recipeCard)),
        ]));
      }
    }

    const nl = newsletterBlock(); if (nl) body.appendChild(nl);
    mount.appendChild(body);
  }

  function typeToPath(t) {
    return {
      technique: "techniques", insider: "insider", review: "reviews",
      troubleshoot: "troubleshoot", glossary: "glossary", notebook: "notebook",
    }[t] || t;
  }
  function typeLabel(t) {
    return {
      technique: "Techniques", insider: "Insider", review: "Reviews",
      troubleshoot: "Troubleshoot", glossary: "Glossary", notebook: "Notebook",
    }[t] || t;
  }

  /* ---------------------------------------------------------
     404 fallback
     --------------------------------------------------------- */
  function render404(mount) {
    setMeta({ title: "Not found | " + window.SITE.name, description: "This page doesn't exist." });
    // If the 404.html already pre-rendered its own content, leave it alone.
    if (mount.children.length > 0) return;
    mount.appendChild(el("div", { class: "wrap-narrow", style: "padding:80px 0; text-align:center;" }, [
      el("h1", {}, ["404"]),
      el("p", { class: "article-sub" }, ["The page you're looking for has wandered off."]),
      el("p", {}, [el("a", { href: "/" }, ["Take me home →"])]),
    ]));
  }

  /* ---------------------------------------------------------
     Search overlay
     --------------------------------------------------------- */
  function openSearch() {
    if (typeof window.openSiteSearch === "function") return window.openSiteSearch();
    // search.js may not be loaded — fallback to plain link list
    const overlay = el("div", { class: "search-overlay visible",
      onclick: function (e) { if (e.target === this) this.remove(); } });
    const modal = el("div", { class: "search-modal" });
    const input = el("input", { type: "text", placeholder: "Search recipes…", autofocus: "autofocus" });
    const results = el("div", { class: "search-results" });
    function update() {
      const q = input.value.trim().toLowerCase();
      results.innerHTML = "";
      if (!q) return;
      (window.RECIPES || []).filter(r => !r.draft).slice(0, 50).forEach(r => {
        const hay = (r.title + " " + r.subtitle + " " + r.cuisine + " " +
          r.ingredients.flatMap(g => g.items.map(i => i.item)).join(" ")).toLowerCase();
        if (hay.includes(q)) {
          results.appendChild(el("a", { href: `/recipes/${r.slug}/` }, [
            el("div", { class: "r-title" }, [r.title]),
            el("div", { class: "r-sub" }, [r.subtitle]),
          ]));
        }
      });
    }
    input.addEventListener("input", update);
    input.addEventListener("keydown", e => { if (e.key === "Escape") overlay.remove(); });
    modal.appendChild(input);
    modal.appendChild(results);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    setTimeout(() => input.focus(), 50);
  }

  /* ---------------------------------------------------------
     Bootstrap
     --------------------------------------------------------- */
  function boot() {
    mountHeader();
    const main = $("#app") || document.body.appendChild(el("main", { id: "app" }));
    const route = detectRoute();
    const isStatic = main.children.length > 0 && !window.PAGE_TYPE;

    if (isStatic) {
      // Page pre-rendered its own content (about / privacy / terms / contact / pantry tool / 404 etc.).
      // We only mount the chrome around it.
    } else if (route.type === "home")             renderHome(main);
    else if (route.type === "recipe")      renderRecipe(main, route.slug);
    else if (["technique","insider","review","troubleshoot","glossary","notebook"].includes(route.type))
                                            renderArticle(main, route.type, route.slug);
    else if (route.type === "404")         render404(main);

    mountFooter();
    mountCookieBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();
