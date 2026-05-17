/* ============================================================
   ecook.wiki — site-wide configuration
   Everything that the layout / templates need to know lives here.
   To rebrand the site you only edit this file.
   ============================================================ */

window.SITE = {
  /* ----------- Identity ----------- */
  name: "ecook.wiki",
  domain: "ecook.wiki",
  url: "https://ecook.wiki",
  tagline: "A retired Chinese chef writes down what 30 years taught him.",
  description:
    "Recipes, techniques, and industry honesty from Chef Li Shi'an — 30 years in professional Chinese kitchens, now writing it all down.",
  copyrightYear: 2026,

  /* ----------- Author (used in About, Schema.org Person, every Recipe author field) ----------- */
  author: {
    name: "Li Shi'an",
    nameZh: "李时安",
    jobTitle: "Chef (retired)",
    bornIn: "Suzhou, Jiangsu, China",
    yearsInKitchen: 30,
    cuisines: ["Huaiyang", "Cantonese", "Sichuan", "Northern Chinese"],
    bio:
      "Li Shi'an spent thirty years in professional Chinese kitchens — from a state-owned Suzhou hotel kitchen at sixteen, to a Michelin-starred Cantonese restaurant in Hong Kong, to his own eight-table private kitchen in Beijing. He now writes for ecook.wiki to put down, properly and precisely, what those years taught him.",
    email: "shian@ecook.wiki",
    sameAs: [
      // Add Pinterest / YouTube / Twitter URLs here as accounts are created
      // "https://pinterest.com/ecookwiki",
      // "https://youtube.com/@ecookwiki",
    ],
  },

  /* ----------- Contact ----------- */
  contact: {
    email: "hello@ecook.wiki",
    responseTime: "within 3 business days",
  },

  /* ----------- AdSense (fill in after approval) ----------- */
  adsense: {
    enabled: false,                  // flip to true after approval
    publisherId: "ca-pub-XXXXXXXX",  // your AdSense publisher ID
    slots: {
      articleTop: "0000000000",
      articleMid: "0000000000",
      articleEnd: "0000000000",
    },
  },

  /* ----------- Newsletter (Buttondown / Substack) ----------- */
  newsletter: {
    enabled: true,
    provider: "buttondown",
    // Buttondown handle: ecook
    formAction: "https://buttondown.com/api/emails/embed-subscribe/ecook",
    publicSubscribeUrl: "https://buttondown.com/ecook",
    headline: "Shi'an's Notebook",
    pitch:
      "One short letter each Sunday — a story from the kitchen, a technique worth keeping, sometimes a new recipe.",
  },

  /* ----------- Comments (Giscus — turn on after D40) ----------- */
  giscus: {
    enabled: false,
    repo: "your-username/ecook-comments",
    repoId: "REPLACE_AFTER_GISCUS_SETUP",
    category: "Recipe comments",
    categoryId: "REPLACE_AFTER_GISCUS_SETUP",
  },

  /* ----------- Cookie banner copy (GDPR-friendly) ----------- */
  cookies: {
    message:
      "We use cookies to remember your saved recipes and (soon) to support the site with non-personalised ads. No tracking beyond that.",
    accept: "Got it",
    learnMore: "Privacy",
  },

  /* ----------- Categories shown on homepage tabs ----------- */
  categories: [
    { id: "all",      label: "All",                 emoji: "" },
    { id: "mains",    label: "Mains",               emoji: "" },
    { id: "noodles",  label: "Noodles & Rice",      emoji: "" },
    { id: "soups",    label: "Soups & Stews",       emoji: "" },
    { id: "sides",    label: "Sides & Salads",      emoji: "" },
    { id: "sweet",    label: "Sweet & Dessert",     emoji: "" },
    { id: "saved",    label: "♥ Saved",             emoji: "" },
  ],

  /* ----------- Sorting thresholds ----------- */
  sort: {
    // Recipes published within this many days float to the top of the list
    freshDays: 3,
  },

  /* ----------- Social share image fallback (used when a recipe has no cover) ----------- */
  defaultShareImage: "https://placehold.co/1200x630/F4ECE0/8B6F47/png?text=ecook.wiki&font=playfair",
};
