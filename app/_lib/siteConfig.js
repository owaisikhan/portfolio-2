/**
 * Everything visitor-facing that is not a project lives here. Components read
 * from this file; none of this copy should be typed into a component.
 */
export const siteConfig = {
  name: "Owais Khan",
  shortName: "Owais",
  initials: "OK",
  role: "Full-Stack Product Engineer",
  location: "Pakistan · working remotely",
  email: "owasikhan22@gmail.com",
  github: "https://github.com/owaisikhan",
  availability: "Available for client work",

  /* Hero -------------------------------------------------------------------- */
  headline: ["Software", "businesses", "actually run on."],
  intro:
    "I design and ship full-stack products end to end — offline desktop software that runs a petrol pump with no internet, e-commerce platforms with real admin tooling, AI agents that answer questions against a live database, and trading dashboards fed by public market data.",

  /* About ------------------------------------------------------------------- */
  about: [
    "Most of what I build is not a landing page. It is software that has to be correct on a Tuesday afternoon while someone is counting cash, reconciling stock, or deciding whether to buy a position — so I care far more about the boring parts than the pretty ones: data integrity, failure modes, and what happens when the network is gone.",
    "I work mostly in the Next.js App Router with React and Postgres, and I package products as desktop apps with Electron when a business needs to own its software rather than rent it. When a project calls for AI, I keep it grounded — read-only database roles, query guards, retrieval over real documents, and a cache so it stays affordable.",
    "I also care about how an interface feels. Motion here is not decoration for its own sake: it directs attention, shows hierarchy, and makes a product feel considered.",
  ],

  nav: [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#stack", label: "Stack" },
    { href: "#faq", label: "FAQ" },
  ],

  /* Services ---------------------------------------------------------------- */
  services: [
    {
      title: "Full-stack web applications",
      body: "Next.js App Router products with Postgres or Supabase behind them — authentication, admin panels, dashboards, reporting and payments.",
      points: ["App Router + RSC", "Row-level security", "Admin back offices"],
    },
    {
      title: "Offline desktop software",
      body: "Electron builds with a bundled database, licence keys and background self-update, for businesses that cannot rely on an internet connection.",
      points: ["Bundled Postgres", "Licensing & updates", "Encrypted backups"],
    },
    {
      title: "Applied AI features",
      body: "Text-to-SQL over your own catalog, retrieval over your own documents, streamed responses — built behind hard security boundaries, not prompt-level promises.",
      points: ["Text-to-SQL", "RAG pipelines", "Semantic caching"],
    },
    {
      title: "Motion-led interfaces",
      body: "GSAP and Motion work that makes a product feel deliberate without getting in the user's way — and that degrades cleanly when reduced motion is on.",
      points: ["ScrollTrigger", "Micro-interactions", "Reduced-motion safe"],
    },
  ],

  /* Process ----------------------------------------------------------------- */
  process: [
    {
      title: "Understand the numbers",
      body: "Before any code, I work out which figures have to reconcile and what the business already does by hand. Most product bugs are really a misunderstood rule.",
    },
    {
      title: "Model the data first",
      body: "Constraints go in Postgres, not in the form. If a value cannot legally exist, the database should be the thing that says so — not one particular screen.",
    },
    {
      title: "Ship a usable slice",
      body: "A narrow path that works end to end beats a broad one that half works. You get something real to react to early, and the direction gets corrected cheaply.",
    },
    {
      title: "Verify against reality",
      body: "Indicators checked against TradingView, totals checked against the cash in the drawer, screens checked by rendering them. Output, not assumptions.",
    },
  ],

  /* Stack ------------------------------------------------------------------- */
  stack: [
    {
      group: "Frontend",
      items: [
        "React 19",
        "Next.js 16",
        "App Router",
        "Tailwind CSS v4",
        "shadcn/ui",
        "Redux Toolkit",
        "TanStack Query",
        "Recharts",
      ],
    },
    {
      group: "Motion",
      items: ["GSAP", "ScrollTrigger", "Motion", "View Transitions"],
    },
    {
      group: "Backend & data",
      items: [
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Redis",
        "LangGraph",
        "Google Gemini",
        "Python",
        "FastAPI",
      ],
    },
    {
      group: "Platform",
      items: [
        "Electron",
        "electron-builder",
        "Vercel",
        "Render",
        "Docker",
        "Vite",
        "Git",
      ],
    },
  ],

  marquee: [
    "Next.js",
    "React",
    "Electron",
    "PostgreSQL",
    "Supabase",
    "GSAP",
    "Motion",
    "Tailwind v4",
    "shadcn/ui",
    "LangGraph",
    "Gemini",
    "Redis",
    "FastAPI",
    "Docker",
  ],

  /* FAQ --------------------------------------------------------------------- */
  faq: [
    {
      q: "Why can't I see the code for some of these projects?",
      a: "Three of them are private client repositories — a petrol-pump management system and an e-commerce platform I built with a collaborator. Linking them would send you to a 404. I'm happy to walk through the code, the schema and the trade-offs live on a call.",
    },
    {
      q: "Do you work alone or with a team?",
      a: "Both. Several of the projects here are collaborations where I work as a repository collaborator alongside another engineer, and others I've taken from empty repo to shipped product on my own. I'm comfortable owning a codebase or joining one.",
    },
    {
      q: "Can you build something that runs without the internet?",
      a: "Yes, and I've shipped it. The Offline Petrol Pump Manager installs like a normal Windows program, boots a bundled PostgreSQL binary and a Next.js server as child processes bound to loopback only, and runs with no server, no Docker and no cloud account.",
    },
    {
      q: "How do you handle AI features safely?",
      a: "The security boundary is never the prompt. Model-generated SQL runs through a restricted Postgres role that can only SELECT from the catalog tables, behind a guard that rejects anything which isn't a single read-only statement — so orders, addresses and profiles stay unreachable no matter what the model writes.",
    },
    {
      q: "What does a project usually start with?",
      a: "A call about the numbers the business already tracks by hand, then a short written scope with a first slice we can ship and react to. I'd rather correct direction in week one than in month three.",
    },
    {
      q: "What's your stack, and can you work in mine?",
      a: "My default is the Next.js App Router with React, Tailwind and PostgreSQL or Supabase, packaged with Electron when it needs to run locally. I've also shipped in Vite, Redux Toolkit, TanStack Query and Python/FastAPI, so an existing codebase is not a problem.",
    },
  ],
};

/**
 * Stat tiles. `value` is animated by Counter, which parses the number out of
 * the string and keeps whatever prefix/suffix is around it.
 */
export const stats = [
  { value: "7", label: "Products shipped in 2026" },
  { value: "3", label: "Businesses served" },
  { value: "2", label: "Desktop apps packaged" },
  { value: "6", label: "Repositories collaborated on" },
];
