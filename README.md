# ecook.wiki

A retired Chinese chef writes down what 30 years taught him.
Recipes, techniques, and industry honesty from Chef Li Shi'an.

This is a pure static site for GitHub Pages — no build server required.
The site is data-driven: adding a new recipe means appending one
object to `recipes.js`. The build script regenerates per-slug pages
and the sitemap; the GitHub Action does it automatically on every push.

---

## Repo at a glance

```
config.js           Site-wide settings (name, author, AdSense, etc.)
recipes.js          Recipe data — one object per recipe
techniques.js       Technique long-form articles (start empty)
insider.js          Industry-insider articles (start empty)
reviews.js          Comparison reviews (start empty)
troubleshoot.js     Cooking-problem pages (start empty)
glossary.js         Ingredient definitions (start empty)
notebook.js         Shi'an's Notebook short essays / newsletter archive
index.html          Homepage shell (rendered by main.js)
recipe.html         Canonical recipe template (build.js copies it)
_template.html      Canonical non-recipe template
404.html            Branded 404 page
about/ contact/
privacy/ terms/     Static compliance pages
assets/
  style.css         All CSS (warm light theme, CSS variables)
  main.js           Router + hydrator (renders pages from data)
  search.js         Fuse.js-powered site search
recipes/<slug>/     Generated per-recipe pages (do not edit by hand)
tools/
  build.js          Node build script — regenerates pages + sitemap
  build.html        Browser-based build tool (downloads a ZIP)
  pantry/           "What can I cook?" — pantry → recipe finder
sitemap.xml         Auto-generated SEO sitemap
robots.txt          SEO
ads.txt             AdSense (fill in after approval)
CNAME               Custom domain
.nojekyll           Tells GitHub Pages to serve files as-is
.github/workflows/
  build.yml         GitHub Action that runs build.js on push
```

---

## How to add a new recipe (the most common task)

1. Open `recipes.js`.
2. Copy the first recipe object (Mapo Tofu) — it has the full schema.
3. Change the fields. The required ones are at the top of `recipes.js`
   in a long comment block; read it.
4. Put your photos in `images/<your-slug>/`:
   - `cover.jpg` (16:9, ~1600×900 px ideal)
   - `step-1.jpg`, `step-2.jpg`, … (4:3, ~800×600)
5. Regenerate the static pages. Three options:
   - **Easiest:** push to `main`. The GitHub Action runs `build.js`
     and commits the generated pages back. Wait ~1 minute.
   - **Local CLI:** run `node tools/build.js` from the repo root,
     then commit & push.
   - **No-Node fallback:** open `/tools/build.html` in your browser,
     click "Build", extract the downloaded ZIP at the repo root,
     commit & push.
6. Done. The new recipe is live at `https://ecook.wiki/recipes/<slug>/`.

If `draft: true` on a recipe, it is hidden from the site and not
included in the sitemap.

---

## Local preview

Any static-file server. The simplest:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or with Node:

```bash
npx serve .
```

---

## How the routing works

URLs like `/recipes/mapo-tofu/` resolve to
`/recipes/mapo-tofu/index.html`, which is a thin baked page that
sets `window.PAGE_TYPE = "recipe"` and `window.SLUG = "mapo-tofu"`.
`main.js` reads those, finds the recipe in `recipes.js`, and renders it.

This gives clean URLs **without** a 404-SPA hack — every URL is a
real 200-status file. SEO-friendly.

The build script keeps these baked pages in sync with `recipes.js`.

---

## The 60-day operating plan

The site is the easy part; getting Google traffic is the hard part.
Stick to this for the first 60 days.

### Day 0 — Launch
- 13–15 recipes live (Mapo Tofu fully written; others have placeholder
  bodies you'll fill in over the next 8 weeks)
- About page, four compliance pages, 404, pantry tool
- GitHub Pages live at ecook.wiki

### Day 1
- Add the site to **Google Search Console**, submit sitemap
- Add to **Bing Webmaster Tools** (Bing/Yahoo, ~10% of search traffic)
- Add to **Pinterest Business**, claim the domain

### Day 7
- Write a Pinterest pin (1000×1500) for each recipe — even basic ones
- Begin pinning 3-5 pins/week to a board called "Authentic Chinese
  recipes". Don't dump them all at once; pace it.

### Day 14
- Add 5 glossary entries to `glossary.js`:
  doubanjiang, shaoxing wine, chinkiang vinegar, sichuan peppercorn,
  light vs dark soy sauce
- Add 2 technique articles to `techniques.js`:
  "What is wok hei?" and "Velveting"
- Cross-link these in your existing recipe Notes

### Day 21
- Open Search Console. See which queries you're getting impressions on.
- Edit `metaTitle` / `metaDescription` of any recipe whose impressions
  are growing but clicks are not — your title isn't tempting enough.

### Day 30
- Apply for **Google AdSense**. You should have:
  - 15+ recipes (with real content, no placeholders)
  - 5 glossary, 2 techniques, About, 4 compliance pages = 27+ pages
  - 4+ weeks of original work history visible
- After approval, set `adsense.enabled = true` in `config.js` and fill
  in slot IDs.

### Day 40
- Set up **Giscus** (free, via GitHub Discussions) and enable
  `giscus.enabled = true` in `config.js`. Comments unlock the
  "real-people-cooking-this" social proof Google likes.

### Day 45
- Look at your Search Console "Performance" report. Pick 2 keywords
  where you're ranking 5-20 and write a *better* version of the recipe
  to push into the top 5.

### Day 55
- Write your first **Insider** article (e.g. "Why restaurant fried rice
  tastes different — 7 things you don't do").
- Post it to r/AsianCooking, r/Cooking. Not as the author but in
  honest "thought this was interesting" tone if appropriate, or just
  let it sit and pick up organic links.

### Day 60
- Write the first **Review** article (e.g. soy sauce ranking).
  Reviews are the highest-CPC AdSense content and the strongest
  backlink magnets.
- Set up the newsletter (Buttondown free tier, 100 subs free).
  Add the form action URL to `config.js`.

### Ongoing — 2-3 hour/week rhythm
- Week A: 1 new recipe
- Week B: 5 troubleshoot pages (batch — they're short)
- Week C: 1 new recipe
- Week D: 1 Insider OR 1 Review article (rotate)
- Every week: 5-10 Pinterest pins, 1 newsletter, respond to comments

---

## Pinterest SOP

Pinterest is the single biggest traffic source for recipe sites
in year 1 — often 30-50% of total visits.

1. Set up a Pinterest Business account, claim ecook.wiki.
2. Create boards: "Authentic Chinese Recipes", "Chinese Pantry Essentials",
   "Chinese Soups and Stews", "Sichuan Recipes".
3. For each recipe, create a 1000×1500 vertical pin:
   - Cover photo
   - Title overlaid in serif text at the top
   - "ecook.wiki" small at the bottom
4. Schedule 3-5 pins per week. Avoid pinning everything on day one.
5. Each pin links to the recipe page.

---

## Newsletter SOP (Buttondown)

Handle: `ecook.wiki` (already wired into `config.js`).

**Once Buttondown approves your account** (a few hours to a day):

1. **Confirm the subscribe form works.** Open your site, scroll to a
   recipe page, enter your own email in the Newsletter block, confirm
   you receive the welcome email.
2. **Set up RSS-to-email automation.** Buttondown has this built in —
   no API key needed:
   - Buttondown Dashboard → Automations → "RSS Email"
   - Source URL: `https://ecook.wiki/feed.xml`
   - Schedule: "Send draft for review every Sunday" (recommended for
     first month while you find your voice)
   - Template: pick a clean one; preview before activating
3. **Write the welcome email.** Buttondown's "Welcome email" setting.
   This is what new subscribers see — make it personal, ~150 words,
   in Shi'an's voice. Tell them what to expect.

After a month of "send draft for review", switch to "send
automatically" if the drafts have been good.

---

## X (Twitter) auto-post SOP

Don't pay for X API ($100/month). Use IFTTT free tier instead.

1. Register an X account in Shi'an's name (handle suggestions:
   `@ecookwiki`, `@chefshian`, `@lishianeats`).
2. Sign up for IFTTT free account at ifttt.com.
3. Create an Applet:
   - **If:** `RSS Feed → New feed item`. URL: `https://ecook.wiki/feed.xml`
   - **Then:** `Twitter → Post a tweet`. Template:
     ```
     New: {{EntryTitle}}
     {{EntryUrl}}
     ```
   - Authorise your X account.
4. Done. Each time you push a new recipe, IFTTT polls the feed every
   15-60 minutes and auto-tweets when it sees a new item.

**For Insider / Review articles:** don't rely on the auto-tweet alone.
Hand-craft a tweet with a real hook (a surprising line from the
article + the link). Auto-tweets get ignored on X; hand-written ones
get shared.

---

## Reddit SOP

Don't spam. The communities will smell it and ban you.

Lurk r/AsianCooking, r/Cooking, r/MealPrepSunday for a week. Comment
helpfully on other people's posts. When someone asks "best mapo tofu
recipe?" link yours and explain *why* it's worth their time. One link
per week max. Be a useful community member; the traffic follows.

---

## AdSense pre-flight checklist

Before applying:

- [ ] 25+ pages of original, useful content
- [ ] Every recipe has a real `metaTitle`, `metaDescription`, `story`
      and `whyThisWorks` — no PLACEHOLDER text
- [ ] About, Privacy, Terms, Contact pages all complete
- [ ] No copyrighted images (replace any stock photo whose license
      doesn't permit commercial use)
- [ ] Site renders properly on mobile
- [ ] `ads.txt` is at root and reachable
- [ ] No `noindex` on the homepage

When approved:

- [ ] Set `adsense.enabled = true` in `config.js`
- [ ] Fill in slot IDs in `config.js`
- [ ] Update `ads.txt` with the line from AdSense console
- [ ] Add the AdSense `<script>` snippet to `_template.html`, `recipe.html`,
      and all static HTML files (or to `main.js` — once per page is enough)

---

## Known tech debt — replace these before scale

1. **Cover images.** Most recipes ship with placeholder paths pointing
   to `/images/<slug>/cover.jpg` — these files don't exist yet. You
   need to either:
   - Place 13 cover images at those paths (your own or Unsplash with
     attribution in a NOTICE file), OR
   - Replace the `cover:` field with a real CDN URL
2. **Author portrait.** `/images/about/portrait.jpg` is referenced
   from the About page. Use a hand-on-cutting-board style photo —
   stock initially, then replace.
3. **Default share image.** `/images/share-default.jpg` is the OG
   fallback. 1200×630 px.
4. **Recipe ratings.** Schema deliberately omits `aggregateRating`
   until Giscus is live and you have real reviews to aggregate.
5. **Placeholder recipe bodies.** 14 of 15 recipes have PLACEHOLDER
   text in Story, Why this works, Notes. Replace these before
   applying for AdSense.

---

## Brand & voice rules

- First person, but never anxious. Shi'an has thirty years of practice;
  he's not performing competence.
- No exclamation marks unless something genuinely surprised him.
- No "easy", "quick", "delicious" without specifics. If a dish is easy,
  say *why* (5 ingredients, one pan, no marinating).
- No SEO keyword stuffing in headlines. The title should make a
  real reader want to click; Google rewards click-through rate
  more than keyword density now.
- No emoji in content. (UI elements like ⏱ in meta cards are fine.)

---

## License

All recipe text, photography (when added), and original writing on
ecook.wiki is © 2026 ecook.wiki. The site source code (HTML, CSS, JS)
is released under the MIT license — feel free to fork the architecture.
