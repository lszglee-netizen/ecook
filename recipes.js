/* ============================================================
   recipes.js — all recipe data lives here.
   Add a new recipe by appending one object to the RECIPES array.
   After editing, regenerate the site by either:
     • Opening /tools/build.html in a browser and clicking "Build", OR
     • Running `node tools/build.js` from the repo root, OR
     • Pushing to GitHub — the workflow rebuilds automatically.
   ------------------------------------------------------------
   RECIPE SCHEMA — every field is required unless marked optional.
   ------------------------------------------------------------
   slug            URL slug, kebab-case, also the image folder name.
   title           Display name.
   subtitle        One-line hook under the title.
   category        One of: mains | noodles | soups | sides | sweet
   cuisine         Region tag: Sichuan | Cantonese | Huaiyang | Shanghai | Northern | Hong Kong …
   date            ISO publish date (YYYY-MM-DD). Drives "fresh" sort.
   lastModified    ISO modified date. Refresh periodically for SEO.
   score           0–5, internal quality flag (not shown to users in v1).
   totalTime       Minutes, integer.
   prepTime        Minutes, integer.   (Recipe Schema breakdown)
   cookTime        Minutes, integer.   (Recipe Schema breakdown)
   difficulty      Easy | Medium | Hard
   servings        Integer.
   spiceLevel      0–5
   cover           Cover image path (relative to site root). 16:9 ideal.
   coverAlt        Alt text — describes the dish, used by Google Image Search.
   metaTitle       <title> tag for SEO. ≤60 chars best.
   metaDescription <meta description>. 140–160 chars.
   story           2–3 paragraphs. Set scene, share a small story / cultural note.
   whyThisWorks    2–4 sentences from Chef Li Shi'an's professional viewpoint.
                   THIS IS THE ANTI-AI MOAT — every recipe must have one.
   ingredients     Array of groups: { group, items: [{qty, item, note?}] }
   instructions    Array of steps: { text, image?, imageAlt? }
   notes           Array of strings — Shi'an's personal testing notes.
   faqs            Array of {q, a} — feeds FAQPage Schema.
   relatedRecipes  Array of recipe slugs.
   relatedTechniques (optional) Array of technique slugs.
   relatedGlossary (optional) Array of glossary slugs.
   draft           Boolean — set true to hide from the site.
   ============================================================ */

window.RECIPES = [

  /* ============================================================
     1. MAPO TOFU  — fully-written reference recipe
     Copy this block and fill in the new dish; everything is
     either text or simple arrays. No code involved.
     ============================================================ */
  {
    slug: "mapo-tofu",
    title: "Mapo Tofu",
    subtitle: "Sichuan's most famous tofu — done the way a restaurant kitchen does it.",
    category: "mains",
    cuisine: "Sichuan",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.9,
    totalTime: 25,
    prepTime: 10,
    cookTime: 15,
    difficulty: "Medium",
    servings: 2,
    spiceLevel: 3,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Mapo+Tofu&font=playfair",
    coverAlt: "Mapo tofu in a small clay bowl, glossy red oil pooling around silken tofu cubes, scattered with green scallion.",
    metaTitle: "Mapo Tofu Recipe — How a Chinese Chef Actually Makes It",
    metaDescription:
      "Authentic Sichuan mapo tofu in 25 minutes. From Chef Li Shi'an's 30 years in Chinese kitchens — with the four restaurant tricks home cooks usually miss.",
    story:
      "Mapo tofu doesn't need a romantic origin story to be loved, but it has one anyway. The version most people know — silken tofu trembling in a red, numbing sauce — comes from a small restaurant in late-Qing Chengdu run by a pockmarked woman everyone called Old Mrs Chen. \"Ma\" means pockmarked. \"Po\" is grandma. The name stuck.\n\nI've cooked this dish in five different kitchens over thirty years, and I'll tell you something: most home versions taste flat not because the recipe is wrong, but because of four small things that get rushed. None of them are hard. They just need attention. Get those right and you'll have something that tastes like a restaurant served it — without the restaurant.",
    whyThisWorks:
      "Three things make this work. First, a brief soak in warm salted water firms the tofu just enough that it survives the stir without falling apart — but doesn't toughen it. Second, the doubanjiang is cooked low and slow until the oil turns deep red; this is where the chilli compounds and esters actually dissolve into the fat. Rush this step and the sauce tastes raw and sharp. Third, the sauce is thickened in three small additions of slurry rather than one big one — Sichuan calls this 三勾芡 (sān gōu qiàn). It gives the glossy, clinging texture a flat pour-and-stir version can't reach.",
    ingredients: [
      {
        group: "Main",
        items: [
          { qty: "14 oz",   item: "soft or silken tofu",       note: "(400 g — cut into 3/4-inch / 2 cm cubes)" },
          { qty: "4 oz",    item: "ground beef or pork",       note: "(110 g — beef is traditional)" },
          { qty: "2 tbsp",  item: "neutral oil",               note: "" },
          { qty: "2",       item: "scallions",                 note: "(white and green parts separated, sliced thin)" },
          { qty: "3 cloves", item: "garlic",                   note: "(minced)" },
          { qty: "1-inch piece", item: "ginger",               note: "(minced)" },
        ],
      },
      {
        group: "Sauce",
        items: [
          { qty: "2 tbsp",  item: "Pixian doubanjiang",        note: "(豆瓣酱 — Sichuan fermented broad-bean paste)" },
          { qty: "1 tsp",   item: "douchi",                    note: "(豆豉 — fermented black beans, rinsed and roughly chopped) — optional but worth it" },
          { qty: "1 tsp",   item: "Sichuan chilli powder",     note: "(or 1/2 tsp regular chilli flakes)" },
          { qty: "1 cup",   item: "chicken or pork stock",     note: "(240 ml — water works in a pinch)" },
          { qty: "1 tsp",   item: "light soy sauce",           note: "" },
          { qty: "1/2 tsp", item: "sugar",                     note: "" },
        ],
      },
      {
        group: "Slurry & Finish",
        items: [
          { qty: "1 tbsp",  item: "cornstarch",                note: "(whisked into 3 tbsp cold water)" },
          { qty: "1 tsp",   item: "Sichuan peppercorns",       note: "(toasted and ground — add just before serving)" },
          { qty: "1 tsp",   item: "toasted sesame oil",        note: "" },
        ],
      },
    ],
    instructions: [
      { text: "Bring 4 cups of water to a bare simmer, salt it lightly (about 1/2 tsp), and slip the tofu cubes in. Let them sit off the heat while you do everything else. This firms the tofu just enough that it survives the stir.",
        image: "/images/mapo-tofu/step-1.jpg",
        imageAlt: "Tofu cubes warming in a pot of lightly salted water." },
      { text: "Heat a wok or wide skillet over medium-high. Add the oil, then the ground meat. Press it flat against the pan and let it crisp without stirring for about 90 seconds before breaking it up. You want browned, not steamed.",
        image: "/images/mapo-tofu/step-2.jpg",
        imageAlt: "Ground beef browning in a hot wok." },
      { text: "Push the meat to one side. Turn the heat to medium-low. Add the doubanjiang to the empty space and cook it slowly, stirring, for 60–90 seconds — you'll see the oil turn deep red and the paste smell sweet rather than sharp. Don't rush this.",
        image: "/images/mapo-tofu/step-3.jpg",
        imageAlt: "Doubanjiang frying slowly in oil, turning deep red." },
      { text: "Add the garlic, ginger, douchi and chilli powder. Stir for 30 seconds — just until you can smell them.",
        image: "/images/mapo-tofu/step-4.jpg",
        imageAlt: "Aromatics added to the wok." },
      { text: "Pour in the stock, soy sauce, sugar, and the scallion whites. Drain the tofu and slide it in gently. Bring to a gentle simmer — don't stir hard or the tofu will break. Cook 3 minutes so the tofu drinks in the sauce.",
        image: "/images/mapo-tofu/step-5.jpg",
        imageAlt: "Tofu simmering in the red sauce." },
      { text: "Add the cornstarch slurry in three additions, swirling the pan between each, waiting 10 seconds for the sauce to tighten before the next. This is the trick that gives you the glossy clinging texture.",
        image: "/images/mapo-tofu/step-6.jpg",
        imageAlt: "Sauce thickening to a glossy red glaze." },
      { text: "Off heat: drizzle the sesame oil, scatter the scallion greens, and shower the ground Sichuan peppercorn on top. Serve immediately, on rice, with the sauce still bubbling.",
        image: "/images/mapo-tofu/step-7.jpg",
        imageAlt: "Finished mapo tofu in a clay bowl, scallions and ground Sichuan peppercorn on top." },
    ],
    notes: [
      "I tested this with five brands of doubanjiang. Pixian (郫县) labelled stuff is consistently the best — anything else is using the same word for something else. If the oil doesn't turn deep red in step 3, your doubanjiang isn't right.",
      "Silken tofu gives the silkier texture; soft tofu holds together a little better. I use silken at home and soft when feeding people who haven't had it before.",
      "Toast Sichuan peppercorns dry in a pan for 60 seconds before grinding — they go from harsh and lemon-soapy to floral and tingly. This is the single biggest upgrade most home cooks can make.",
      "First time I cooked this for service in 1991, I rushed step 3 and the chef-master made me redo the whole pot. He was right.",
    ],
    faqs: [
      { q: "Can I make mapo tofu without doubanjiang?",
        a: "No — doubanjiang isn't a substitute-able ingredient here, it's the dish. If your store doesn't carry it, order it online. Look for the word 'Pixian' on the label." },
      { q: "Is mapo tofu very spicy?",
        a: "The dish has heat, but more than that it has má (麻) — a tingling, fizzy sensation from Sichuan peppercorn — and a deep fermented savouriness. You can dial the chilli powder down without losing what makes the dish itself." },
      { q: "What do I serve with mapo tofu?",
        a: "Plain steamed jasmine rice. A simple stir-fried green vegetable like garlic bok choy. Nothing else competes well — let the tofu lead." },
      { q: "Can I make it vegetarian?",
        a: "Yes — replace the ground meat with finely chopped shiitake mushrooms (about 5 oz, browned the same way) and use vegetable stock. The texture changes a little but the dish still works." },
    ],
    relatedRecipes: ["kung-pao-chicken", "dan-dan-noodles", "garlic-bok-choy"],
    relatedTechniques: ["velveting"],
    relatedGlossary: ["doubanjiang", "sichuan-peppercorn"],
    draft: false,
  },

  /* ============================================================
     2. KUNG PAO CHICKEN
     Image hint: search "kung pao chicken" on Unsplash or Pexels;
     pick a dark wok shot with peanuts and red chillies visible.
     ============================================================ */
  {
    slug: "kung-pao-chicken",
    title: "Kung Pao Chicken",
    subtitle: "Sichuan's most travelled dish — the original, before American takeout got hold of it.",
    category: "mains",
    cuisine: "Sichuan",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.7,
    totalTime: 30,
    prepTime: 15,
    cookTime: 10,
    difficulty: "Medium",
    servings: 2,
    spiceLevel: 2,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Kung+Pao+Chicken&font=playfair",
    coverAlt: "Kung pao chicken in a dark wok — diced chicken glossed with red sauce, surrounded by toasted peanuts and dried red chillies, scattered with sliced scallion.",
    metaTitle: "Kung Pao Chicken — The Original Sichuan Recipe, from a Chef",
    metaDescription:
      "Authentic Sichuan kung pao chicken in 30 minutes. The real version — sharp, numbing, with crisp peanuts. From Chef Li Shi'an's 30 years cooking it.",
    story:
      "Kung pao chicken is named after Ding Baozhen, a Qing official whose imperial title — Gongbao — translates loosely as palace guard. He liked it spicy. He was governor of Sichuan in the 1870s and his household kitchen made him a version of this dish; that's where the name came from.\n\nThe kung pao that travelled west into American-Chinese restaurants is a different animal — cornstarch-thick, sweet, sometimes red, often with bell peppers, almost never with Sichuan peppercorn. The original is leaner: chicken cubes, peanuts, dried chillies, scallion whites, and the floral tingle of Sichuan peppercorn. That's the whole supporting cast. The flavour is sweet and sour and savoury and numbing, all four moving at once.\n\nI trained on this dish for two years before the senior chef at my hotel let me cook it for paying customers. He made me practise it twice a day for three months — same wok, same ingredients — until my hands knew on their own how big to dice the chicken and when to pull the pan from the heat. Home cooks don't need to do that. But you can borrow the principle: kung pao is a short dish. Treat it like a sprint and everything stays bright.",
    whyThisWorks:
      "Two technical things matter here, and almost every home recipe gets at least one wrong. First, velveting (上浆): the cornstarch and oil in the marinade form a thin protective film on the chicken cubes that holds in moisture during the very fast cooking. Skip it and your chicken comes out chalky no matter what else you do. Second, order of operations: the dried chillies and Sichuan peppercorns go into cool-to-warm oil first, alone, until the oil takes on their fragrance and turns a faint red. Hot oil burns them in seconds; cool oil pulls out their aromatics cleanly. Reverse the order — chicken first, then chillies — and you lose the floral, smoky note that defines the dish.",
    ingredients: [
      { group: "Main", items: [
        { qty: "12 oz",    item: "boneless chicken thigh",    note: "(340 g — diced into 1/2-inch / 1.5 cm cubes)" },
        { qty: "1/3 cup",  item: "raw peanuts",               note: "(skin-on or skinned, both fine)" },
        { qty: "8",        item: "dried red chillies",        note: "(snapped in half, seeds shaken out if you want it milder)" },
        { qty: "1 tsp",    item: "Sichuan peppercorns",       note: "" },
        { qty: "2 cloves", item: "garlic",                    note: "(minced)" },
        { qty: "2",        item: "scallions",                 note: "(white and green parts separated, sliced thin on the bias)" },
        { qty: "2 tbsp",   item: "neutral oil",               note: "" },
      ]},
      { group: "Marinade", items: [
        { qty: "1 tbsp",   item: "Shaoxing wine",             note: "" },
        { qty: "1 tsp",    item: "light soy sauce",           note: "" },
        { qty: "1 tsp",    item: "cornstarch",                note: "(this is the velveting layer — do not skip)" },
      ]},
      { group: "Sauce", items: [
        { qty: "1 tbsp",   item: "Chinkiang vinegar",         note: "" },
        { qty: "1 tbsp",   item: "light soy sauce",           note: "" },
        { qty: "1 tsp",    item: "dark soy sauce",            note: "" },
        { qty: "2 tsp",    item: "sugar",                     note: "" },
        { qty: "1 tsp",    item: "cornstarch",                note: "" },
        { qty: "3 tbsp",   item: "water",                     note: "(or chicken stock if you have it)" },
      ]},
    ],
    instructions: [
      { text: "Marinate the diced chicken in the Shaoxing wine, light soy, and cornstarch. Rub it in with your fingers — actually massage the cornstarch onto the meat. Rest 15 minutes while you do everything else. This is the velveting step.",
        image: "/images/kung-pao-chicken/step-1.jpg",
        imageAlt: "Diced chicken being mixed with cornstarch and soy in a bowl." },
      { text: "Whisk the sauce ingredients together in a small bowl. Set within arm's reach of the stove — once you start cooking you won't have time to reach for it.",
        image: "/images/kung-pao-chicken/step-2.jpg",
        imageAlt: "Whisked dark sauce in a small bowl." },
      { text: "In a dry wok over medium heat, toast the raw peanuts, shaking often, until they smell faintly browned and bite hard — about 4 minutes. Tip into a bowl. (Skip this step if using roasted unsalted.)",
        image: "/images/kung-pao-chicken/step-3.jpg",
        imageAlt: "Peanuts toasting in a dry wok." },
      { text: "Wipe the wok dry. Add the oil and set to medium-low. Add the dried chillies and Sichuan peppercorns. Stir gently for 30–45 seconds — the chillies should darken to mahogany, not black, and the oil should pick up a faint red shimmer. This is the most important step in the dish.",
        image: "/images/kung-pao-chicken/step-4.jpg",
        imageAlt: "Dried chillies and Sichuan peppercorns sizzling in shimmering red oil." },
      { text: "Turn the heat to high. Tip in the chicken in one pile. Wait 15 seconds without stirring — you want a sear — then stir-fry hard for 45 seconds. The cubes will go from pink to just-white.",
        image: "/images/kung-pao-chicken/step-5.jpg",
        imageAlt: "Chicken cubes searing in the wok with chillies." },
      { text: "Push the chicken to the side. Add the garlic and scallion whites to the empty space. Stir 10 seconds, then fold everything together.",
        image: "/images/kung-pao-chicken/step-6.jpg",
        imageAlt: "Garlic and scallion whites added to the wok." },
      { text: "Pour the sauce around the side of the wok — not over the chicken — so it hits the hot metal and starts to bubble immediately. Stir as it thickens, about 15 seconds.",
        image: "/images/kung-pao-chicken/step-7.jpg",
        imageAlt: "Sauce thickening to a dark glossy glaze in the wok." },
      { text: "Off the heat: fold in the toasted peanuts and scallion greens. Plate immediately, on rice, with the chillies and peppercorns scattered on top.",
        image: "/images/kung-pao-chicken/step-8.jpg",
        imageAlt: "Finished kung pao chicken plated on rice, peanuts and chillies visible." },
    ],
    notes: [
      "The chillies must never go black. If they do, throw the whole batch out and start over — there is no rescue for burnt chilli oil, it tastes acrid through the entire dish. Mahogany red is the colour you want.",
      "Peanuts go in at the very end so they stay crisp. The mistake almost every home recipe makes is stir-frying them with the chicken — that's how you get the soft, oily peanuts of cheap takeout. Crisp peanut on the tooth is half of what makes this dish itself.",
      "I always use chicken thigh, never breast. Thigh stays tender even if you slightly overcook it; breast turns to dry shreds in under a minute past doneness. There is no virtue in breast for this dish.",
      "Your peppercorns should smell of citrus peel and pine when you crack one between your fingers. If they smell of nothing, they are too old — buy new ones. The má (麻 — tingling sensation) you should feel on your lower lip for ten minutes after eating depends entirely on the peppercorn being alive.",
    ],
    faqs: [
      { q: "Can I leave out the Sichuan peppercorns?",
        a: "You can, but then please call it something else — 'Sichuan-style chicken with chillies and peanuts'. The peppercorn's numbing tingle is half of what makes this dish kung pao. Old, grey, supermarket-shelf peppercorns won't deliver it. Buy fresh ones from a Chinese grocer or online; they should smell of citrus peel and pine." },
      { q: "My chicken came out dry. What went wrong?",
        a: "Almost always one of three things: (1) you used breast instead of thigh — thigh forgives, breast doesn't; (2) you skipped the cornstarch in the marinade — that's the velveting layer that protects the meat in the very fast cooking; or (3) you cooked it too long. Kung pao is a 60–90 second job from chicken-in to sauce-coated. If you find yourself standing at the wok for three minutes, the chicken is already past tender." },
      { q: "Can I use roasted peanuts from a jar?",
        a: "Yes — use unsalted. Salted peanuts will throw the sauce balance off. If the jar has been open a while, toast them briefly in the dry wok before starting; it wakes them back up." },
      { q: "How is this different from the kung pao chicken at my local takeout?",
        a: "Different dish, same name. The takeout version is cornstarch-thickened to a gloopy sauce, often sweet with hoisin or extra sugar, frequently has bell pepper and onion, and almost never has Sichuan peppercorn. The original Sichuan version is darker, drier, sharper, and has only four supporting ingredients — peanuts, chillies, peppercorns, scallion. Cook the Sichuan one once and you'll see why people who grew up with it consider the takeout version a different animal." },
    ],
    relatedRecipes: ["mapo-tofu", "twice-cooked-pork", "mouthwatering-chicken"],
    relatedTechniques: ["velveting"],
    relatedGlossary: ["sichuan-peppercorn", "shaoxing-wine", "chinkiang-vinegar"],
    draft: false,  // ← review the content; flip to false to publish
  },

  /* ============================================================
     3. RED-BRAISED PORK BELLY (Hong Shao Rou)
     ============================================================ */
  {
    slug: "red-braised-pork-belly",
    title: "Red-Braised Pork Belly",
    subtitle: "Glossy, sweet, deeply savoury — Chairman Mao's favourite, and a Sunday classic.",
    category: "mains",
    cuisine: "Shanghai",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.8,
    totalTime: 90,
    prepTime: 15,
    cookTime: 75,
    difficulty: "Easy",
    servings: 4,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Red-Braised+Pork+Belly&font=playfair",
    coverAlt: "Glossy red-braised pork belly cubes in a dark sauce.",
    metaTitle: "Red-Braised Pork Belly Recipe (Hong Shao Rou)",
    metaDescription: "Authentic Shanghai-style red-braised pork belly — caramel-sugar lacquered, slow-braised to fall-apart tender. 90 minutes, mostly hands-off.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "2 lb",   item: "skin-on pork belly", note: "(900 g — cut into 1.5-inch cubes)" },
        { qty: "3 tbsp", item: "rock sugar",        note: "(or granulated sugar)" },
        { qty: "3 slices", item: "ginger",          note: "" },
        { qty: "2",      item: "star anise",        note: "" },
        { qty: "1 stick", item: "cinnamon",         note: "" },
        { qty: "3 tbsp", item: "Shaoxing wine",     note: "" },
        { qty: "2 tbsp", item: "light soy sauce",   note: "" },
        { qty: "1 tbsp", item: "dark soy sauce",    note: "" },
      ]},
    ],
    instructions: [
      { text: "Blanch the pork belly for 3 minutes. Rinse and pat dry." },
      { text: "Caramelise the sugar in a heavy pot until amber." },
      { text: "PLACEHOLDER — fill remaining steps." },
    ],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["yangzhou-fried-rice", "garlic-bok-choy"],
    relatedTechniques: [],
    relatedGlossary: ["shaoxing-wine"],
    draft: false,
  },

  /* ============================================================
     4. BEEF AND BROCCOLI
     ============================================================ */
  {
    slug: "beef-broccoli",
    title: "Beef and Broccoli",
    subtitle: "The American-Chinese classic, taken back to its Cantonese roots.",
    category: "mains",
    cuisine: "Cantonese",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.5,
    totalTime: 25,
    prepTime: 15,
    cookTime: 10,
    difficulty: "Easy",
    servings: 2,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Beef+and+Broccoli&font=playfair",
    coverAlt: "Glossy slices of beef and bright green broccoli in a brown sauce.",
    metaTitle: "Beef and Broccoli — Restaurant-Style Stir-Fry at Home",
    metaDescription: "The trick to restaurant-tender beef in 10 minutes — velveting, hot wok, and a four-ingredient brown sauce.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "12 oz", item: "flank steak",   note: "(sliced thin against the grain)" },
        { qty: "1 lb",  item: "broccoli florets", note: "" },
        { qty: "3 cloves", item: "garlic",    note: "(minced)" },
      ]},
    ],
    instructions: [
      { text: "Velvet the beef with cornstarch, baking soda, soy and oil for 15 minutes." },
      { text: "PLACEHOLDER — fill remaining steps." },
    ],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["kung-pao-chicken", "yangzhou-fried-rice"],
    relatedTechniques: ["velveting"],
    relatedGlossary: [],
    draft: false,
  },

  /* ============================================================
     5. TWICE-COOKED PORK (Hui Guo Rou)
     ============================================================ */
  {
    slug: "twice-cooked-pork",
    title: "Twice-Cooked Pork",
    subtitle: "Boiled, sliced, fried again — Sichuan's smartest way with leftover pork belly.",
    category: "mains",
    cuisine: "Sichuan",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.7,
    totalTime: 50,
    prepTime: 20,
    cookTime: 30,
    difficulty: "Medium",
    servings: 3,
    spiceLevel: 2,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Twice-Cooked+Pork&font=playfair",
    coverAlt: "Curled slices of twice-cooked pork belly with leeks in a red oily sauce.",
    metaTitle: "Twice-Cooked Pork (Hui Guo Rou) — Authentic Sichuan Recipe",
    metaDescription: "The original twice-cooked pork: belly boiled until firm, sliced, then fried with doubanjiang and leeks until the edges curl.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "1 lb", item: "skin-on pork belly", note: "" },
        { qty: "2 stalks", item: "Chinese leek or thick scallion", note: "(cut diagonal)" },
        { qty: "2 tbsp", item: "Pixian doubanjiang", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["mapo-tofu", "red-braised-pork-belly"],
    relatedTechniques: [],
    relatedGlossary: ["doubanjiang"],
    draft: false,
  },

  /* ============================================================
     6. YANGZHOU FRIED RICE
     ============================================================ */
  {
    slug: "yangzhou-fried-rice",
    title: "Yangzhou Fried Rice",
    subtitle: "The benchmark fried rice — egg, shrimp, ham, peas, and that elusive smoky breath.",
    category: "noodles",
    cuisine: "Huaiyang",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.6,
    totalTime: 20,
    prepTime: 10,
    cookTime: 10,
    difficulty: "Medium",
    servings: 2,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Yangzhou+Fried+Rice&font=playfair",
    coverAlt: "Loose, glossy yangzhou fried rice with egg, shrimp, peas and diced ham.",
    metaTitle: "Yangzhou Fried Rice — The Real, Restaurant Version",
    metaDescription: "Why your fried rice tastes like home cook's fried rice — and the four restaurant tricks that fix it.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "3 cups", item: "day-old cooked jasmine rice", note: "" },
        { qty: "3", item: "eggs", note: "(beaten)" },
        { qty: "1/2 cup", item: "small shrimp",  note: "(peeled)" },
        { qty: "1/3 cup", item: "ham or Chinese sausage", note: "(diced)" },
        { qty: "1/3 cup", item: "frozen peas", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["tomato-egg-noodles", "scallion-oil-noodles"],
    relatedTechniques: [],
    relatedGlossary: [],
    draft: false,
  },

  /* ============================================================
     7. SCALLION OIL NOODLES
     ============================================================ */
  {
    slug: "scallion-oil-noodles",
    title: "Scallion Oil Noodles",
    subtitle: "Five ingredients. Twenty minutes. Shanghai's most loved cheap meal.",
    category: "noodles",
    cuisine: "Shanghai",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.8,
    totalTime: 25,
    prepTime: 5,
    cookTime: 20,
    difficulty: "Easy",
    servings: 2,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Scallion+Oil+Noodles&font=playfair",
    coverAlt: "Dark, glossy scallion-oil noodles in a small white bowl with crisped scallion on top.",
    metaTitle: "Scallion Oil Noodles (Cong You Ban Mian) — 5 Ingredients",
    metaDescription: "Shanghai's most loved everyday noodle — slowly crisped scallions, dark soy, sugar, and a hot pour over fresh noodles.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "8", item: "scallions", note: "(cut into 2-inch lengths)" },
        { qty: "1/2 cup", item: "neutral oil", note: "" },
        { qty: "3 tbsp", item: "light soy sauce", note: "" },
        { qty: "2 tbsp", item: "dark soy sauce", note: "" },
        { qty: "1 tbsp", item: "sugar", note: "" },
        { qty: "8 oz", item: "fresh wheat noodles", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["yangzhou-fried-rice", "tomato-egg-noodles"],
    relatedTechniques: [],
    relatedGlossary: [],
    draft: false,
  },

  /* ============================================================
     8. TOMATO EGG NOODLE SOUP
     ============================================================ */
  {
    slug: "tomato-egg-noodles",
    title: "Tomato and Egg Noodles",
    subtitle: "The single most-cooked dish in Chinese homes. Comfort in a bowl.",
    category: "noodles",
    cuisine: "Northern Chinese",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.4,
    totalTime: 20,
    prepTime: 5,
    cookTime: 15,
    difficulty: "Easy",
    servings: 2,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Tomato+%26+Egg+Noodles&font=playfair",
    coverAlt: "Bowl of noodles in a tomato-egg broth, scallion on top.",
    metaTitle: "Tomato Egg Noodle Soup — Chinese Comfort Food",
    metaDescription: "The dish every Chinese kid eats first when they're sick — silky egg, sweet-tart tomato, hand-pulled wheat noodles. 20 minutes.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "3", item: "ripe tomatoes", note: "(roughly chopped)" },
        { qty: "3", item: "eggs", note: "(beaten with a pinch of salt)" },
        { qty: "8 oz", item: "wheat noodles", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["scallion-oil-noodles", "egg-drop-soup"],
    relatedTechniques: [],
    relatedGlossary: [],
    draft: false,
  },

  /* ============================================================
     9. HOT AND SOUR SOUP
     ============================================================ */
  {
    slug: "hot-sour-soup",
    title: "Hot and Sour Soup",
    subtitle: "Pepper-hot, vinegar-sharp, silky with egg. Restaurant-grade in 30 minutes.",
    category: "soups",
    cuisine: "Northern Chinese",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.6,
    totalTime: 30,
    prepTime: 15,
    cookTime: 15,
    difficulty: "Medium",
    servings: 4,
    spiceLevel: 2,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Hot+%26+Sour+Soup&font=playfair",
    coverAlt: "Dark brown hot and sour soup with shredded ingredients, egg ribbons floating on top.",
    metaTitle: "Hot and Sour Soup — Real Chinese Restaurant Recipe",
    metaDescription: "Black pepper heat, dark vinegar tang, silky egg ribbons, and the shredded mushroom-tofu mix that makes it real. 30 minutes.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "6", item: "dried wood-ear mushrooms", note: "(rehydrated and sliced)" },
        { qty: "4", item: "dried shiitake", note: "(rehydrated and sliced)" },
        { qty: "8 oz", item: "firm tofu", note: "(julienned)" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["egg-drop-soup", "mapo-tofu"],
    relatedTechniques: [],
    relatedGlossary: ["chinkiang-vinegar"],
    draft: false,
  },

  /* ============================================================
     10. TOMATO EGG DROP SOUP
     ============================================================ */
  {
    slug: "egg-drop-soup",
    title: "Tomato Egg Drop Soup",
    subtitle: "The most-cooked soup in Chinese homes. Five ingredients. Ten minutes. Healing.",
    category: "soups",
    cuisine: "Northern Chinese",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.4,
    totalTime: 15,
    prepTime: 5,
    cookTime: 10,
    difficulty: "Easy",
    servings: 4,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Tomato+Egg+Drop+Soup&font=playfair",
    coverAlt: "Pale yellow tomato egg drop soup in a small bowl, egg ribbons floating.",
    metaTitle: "Tomato Egg Drop Soup — 10 Minute Chinese Comfort",
    metaDescription: "Five ingredients, ten minutes — the silky tomato-egg soup that every Chinese kitchen knows by heart.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "2", item: "ripe tomatoes", note: "(chopped)" },
        { qty: "3", item: "eggs", note: "(beaten)" },
        { qty: "4 cups", item: "chicken stock", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["hot-sour-soup", "tomato-egg-noodles"],
    relatedTechniques: [],
    relatedGlossary: [],
    draft: false,
  },

  /* ============================================================
     11. SMASHED CUCUMBER SALAD
     ============================================================ */
  {
    slug: "smashed-cucumber",
    title: "Smashed Cucumber Salad",
    subtitle: "Five-minute cold dish — the one your Chinese grandmother makes when guests arrive.",
    category: "sides",
    cuisine: "Northern Chinese",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.5,
    totalTime: 10,
    prepTime: 10,
    cookTime: 0,
    difficulty: "Easy",
    servings: 2,
    spiceLevel: 1,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Smashed+Cucumber&font=playfair",
    coverAlt: "Smashed cucumber pieces in a glossy garlicky dressing.",
    metaTitle: "Smashed Cucumber Salad — Five Minute Chinese Side",
    metaDescription: "Smash, salt, dress. The cold cucumber side that goes with every Chinese meal — sharp, garlicky, lightly numbing.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "2", item: "Persian or English cucumbers", note: "" },
        { qty: "4 cloves", item: "garlic", note: "(grated)" },
        { qty: "1 tbsp", item: "Chinkiang vinegar", note: "" },
        { qty: "1 tsp", item: "light soy sauce", note: "" },
        { qty: "1 tsp", item: "sugar", note: "" },
        { qty: "1 tbsp", item: "chilli oil", note: "(optional)" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["garlic-bok-choy", "mouthwatering-chicken"],
    relatedTechniques: [],
    relatedGlossary: ["chinkiang-vinegar"],
    draft: false,
  },

  /* ============================================================
     12. GARLIC BOK CHOY
     ============================================================ */
  {
    slug: "garlic-bok-choy",
    title: "Garlic Bok Choy",
    subtitle: "The two-minute side that finishes every Chinese meal.",
    category: "sides",
    cuisine: "Cantonese",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.3,
    totalTime: 8,
    prepTime: 5,
    cookTime: 3,
    difficulty: "Easy",
    servings: 2,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Garlic+Bok+Choy&font=playfair",
    coverAlt: "Glossy stir-fried bok choy with golden garlic slices.",
    metaTitle: "Garlic Bok Choy — 8 Minute Chinese Vegetable Stir-Fry",
    metaDescription: "Hot wok, sliced garlic, bok choy. Three things — but the order and timing are everything.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "1 lb", item: "baby bok choy", note: "(halved or quartered lengthwise)" },
        { qty: "6 cloves", item: "garlic", note: "(thinly sliced)" },
        { qty: "2 tbsp", item: "neutral oil", note: "" },
        { qty: "1/2 tsp", item: "salt", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["mapo-tofu", "beef-broccoli"],
    relatedTechniques: [],
    relatedGlossary: [],
    draft: false,
  },

  /* ============================================================
     13. MOUTHWATERING CHICKEN (Kou Shui Ji)
     ============================================================ */
  {
    slug: "mouthwatering-chicken",
    title: "Mouthwatering Chicken",
    subtitle: "Cold poached chicken under a red-oil dressing that lives up to its name.",
    category: "sides",
    cuisine: "Sichuan",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.7,
    totalTime: 60,
    prepTime: 15,
    cookTime: 45,
    difficulty: "Medium",
    servings: 4,
    spiceLevel: 3,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Mouthwatering+Chicken&font=playfair",
    coverAlt: "Cold sliced chicken under a red, sesame-scattered dressing.",
    metaTitle: "Mouthwatering Chicken (Kou Shui Ji) — Sichuan Cold Dish",
    metaDescription: "Gentle poach, ice bath, sliced cold under a red-oil dressing with vinegar, chilli, sugar and sesame. The proper Sichuan cold chicken.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "1 whole",   item: "chicken or 2 chicken legs", note: "" },
      ]},
      { group: "Dressing", items: [
        { qty: "3 tbsp", item: "Sichuan chilli oil", note: "(with sediment)" },
        { qty: "2 tbsp", item: "Chinkiang vinegar", note: "" },
        { qty: "1 tbsp", item: "light soy sauce", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["smashed-cucumber", "kung-pao-chicken"],
    relatedTechniques: [],
    relatedGlossary: ["chinkiang-vinegar", "sichuan-peppercorn"],
    draft: false,
  },

  /* ============================================================
     14. MANGO POMELO SAGO
     ============================================================ */
  {
    slug: "mango-pomelo-sago",
    title: "Mango Pomelo Sago",
    subtitle: "Hong Kong's most loved summer dessert — three fruits, coconut, tiny pearls.",
    category: "sweet",
    cuisine: "Hong Kong",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.6,
    totalTime: 30,
    prepTime: 15,
    cookTime: 15,
    difficulty: "Easy",
    servings: 4,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=Mango+Pomelo+Sago&font=playfair",
    coverAlt: "Bowl of mango pomelo sago — pale orange purée, sago pearls, pomelo strands.",
    metaTitle: "Mango Pomelo Sago — Hong Kong Dessert Recipe",
    metaDescription: "The famous Hong Kong summer dessert — ripe mango, pomelo strands, sago pearls, evaporated and coconut milk. 30 minutes, served cold.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Main", items: [
        { qty: "3", item: "ripe mangoes", note: "" },
        { qty: "1/4 cup", item: "small sago pearls", note: "" },
        { qty: "1 cup", item: "coconut milk", note: "" },
        { qty: "1/2 cup", item: "evaporated milk", note: "" },
        { qty: "1/2 cup", item: "pomelo segments", note: "(or grapefruit)" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["egg-custard-tarts"],
    relatedTechniques: [],
    relatedGlossary: [],
    draft: false,
  },

  /* ============================================================
     15. HONG KONG EGG CUSTARD TARTS
     ============================================================ */
  {
    slug: "egg-custard-tarts",
    title: "Hong Kong Egg Custard Tarts",
    subtitle: "Wobbly yellow custard in a flaky shell. The dim sum trolley's favourite.",
    category: "sweet",
    cuisine: "Hong Kong",
    date: "2026-05-13",
    lastModified: "2026-05-13",
    score: 4.5,
    totalTime: 90,
    prepTime: 60,
    cookTime: 30,
    difficulty: "Hard",
    servings: 12,
    spiceLevel: 0,
    cover: "https://placehold.co/1600x900/F4ECE0/8B6F47/png?text=HK+Egg+Custard+Tarts&font=playfair",
    coverAlt: "Half-eaten Hong Kong egg tart showing flaky shell and yellow custard.",
    metaTitle: "Hong Kong Egg Custard Tarts — Dim Sum Recipe",
    metaDescription: "The flaky, layered Hong Kong dim sum classic — silky egg custard in a buttery shell. The pastry technique explained step by step.",
    story: "PLACEHOLDER",
    whyThisWorks: "PLACEHOLDER",
    ingredients: [
      { group: "Pastry", items: [
        { qty: "1 1/2 cups", item: "all-purpose flour", note: "" },
        { qty: "1/2 cup",   item: "lard or shortening", note: "(cold)" },
        { qty: "1/2 cup",   item: "unsalted butter",    note: "(cold)" },
      ]},
      { group: "Custard", items: [
        { qty: "3", item: "eggs", note: "" },
        { qty: "1/3 cup", item: "sugar", note: "" },
        { qty: "1 cup",   item: "whole milk", note: "" },
      ]},
    ],
    instructions: [{ text: "PLACEHOLDER" }],
    notes: ["PLACEHOLDER"],
    faqs: [{ q: "PLACEHOLDER?", a: "PLACEHOLDER." }],
    relatedRecipes: ["mango-pomelo-sago"],
    relatedTechniques: [],
    relatedGlossary: [],
    draft: false,
  },

];
