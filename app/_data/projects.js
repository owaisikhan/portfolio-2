/**
 * Every project here is 2026 work, drawn from repositories I own or
 * collaborate on. Course-follow-along and practice repos are deliberately
 * left out — this list is meant to show shipped products, not exercises.
 *
 * Repositories considered in the 2026 scan, and why each is in or out:
 *
 *   in   Ammar-Sagheer/Offline-Petrol-Pump-Manager        (private)
 *   in   Ammar-Sagheer/Offline-Committee-Manager-App
 *   in   Ammar-Sagheer/Petrol-Pump-Management-Software    (private)
 *   in   Ammar-Sagheer/saam-s-store, saam-s-store-client1 (private)
 *   in   Ammar-Sagheer/Coffee-Shop-Website                (private)
 *   in   Ammar-Sagheer/ecommerce-reactive-chatbot
 *   in   Ammar-Sagheer/reactive-google-ai-agent
 *   in   Ammar-Sagheer/Stocks-RSI-Display
 *   in   owaisikhan/windows-app-stocks-RSI
 *   in   owaisikhan/merdian-consulting
 *   out  Hotel-Website / Hotel-Management-App / the-wild-oasis  — course work
 *   out  Pizza_Made_BY_US / react-pizza                          — course work
 *   out  practice-react / test                                   — scratch repos
 *   out  Pump-manager-releases                                   — release host,
 *        already described inside the Offline Petrol Pump Manager entry
 *
 * `isPrivate: true` means the source lives in a private client repository.
 * Those entries carry no repo link on purpose: a client clicking through to
 * a 404 looks worse than no link at all.
 */
export const projects = [
  {
    slug: "offline-petrol-pump-manager",
    name: "Offline Petrol Pump Manager",
    year: "2026",
    role: "Collaborator",
    kind: "Desktop software",
    accent: "#f97316",
    featured: true,
    isPrivate: true,
    tagline: "A petrol pump's entire back office, running on one laptop with no internet.",
    summary:
      "Desktop build of a petrol-pump management system, packaged with Electron so it installs like a normal Windows program — no server, no Docker, no cloud account, and no internet connection required to operate.",
    problem:
      "Fuel stations often sit on unreliable connections, and the people running them do not want a monthly subscription to read yesterday's takings. A cloud app was the wrong shape for the business.",
    approach:
      "Electron boots a bundled PostgreSQL binary and a Next.js server as child processes, both bound to loopback only, then opens the window once the server answers. The database ships inside the install, so first run is a double-click rather than a setup guide.",
    outcome:
      "The station runs the software fully offline. Encrypted local backups protect the data, a licence-key system controls installs, and a background self-updater checks a public releases repo whenever the machine does happen to be online.",
    highlights: [
      "Bundled Postgres — no external database to install or administer",
      "Loopback-only binding, so nothing is exposed on the network",
      "Encrypted local backup and restore",
      "Licence-key issuing plus a remote block-list for revocation",
      "Background self-update against a public releases repository",
    ],
    stack: ["Next.js", "Electron", "PostgreSQL", "electron-builder", "Recharts"],
    links: [],
  },
  {
    slug: "offline-committee-manager",
    name: "Offline Committee Manager",
    year: "2026",
    role: "Collaborator",
    kind: "Desktop software",
    accent: "#14b8a6",
    featured: true,
    isPrivate: false,
    tagline: "A rotating savings committee's books, on one laptop, with the rules living in the database.",
    summary:
      "Offline Windows desktop app for running a monthly committee — ten members paying in, one taking the pot each month and repaying it over the following fifteen. It installs like a normal program, keeps its books in its own bundled Postgres, and never touches the internet.",
    problem:
      "The committee's danger is invisible from the bank balance. With a ten-month rotation repaid over fifteen, full-size payouts go out while the repayment stream behind them is still building — on the real figures, an account holding Rs 520,000 is emptied by month 20 and bottoms out below zero by month 24. Half a million rupees looks like plenty right up to the month it is not.",
    approach:
      "The month-by-month cash flow is simulated rather than estimated: a binary search over that simulation finds the largest payout that never breaches the cushion, and a separate function sizes the three ways out — hand over less, repay faster, or raise everyone's contribution. Because the squeeze is a ramp rather than a ceiling, the app distinguishes \"cannot afford this\" from \"cannot afford this yet\".",
    outcome:
      "The manager runs the whole committee offline and prints the month's sheets for the other nine. Every rule that matters is a trigger or constraint in Postgres, so the ledger is append-only for everybody — a mistake is corrected by writing the opposite entry, and both stay visible and cancel out in every total.",
    highlights: [
      "Payout ceiling found by binary search over a real cash-flow simulation",
      "Append-only ledger — no update, no delete, for any role",
      "Overdrafts refused outright; policy breaches only with a recorded reason",
      "Members' stakes and the bank balance are one sum read two ways, so they cannot drift",
      "Bundled Postgres inside the install, bound to loopback and nowhere else",
      "Encrypted-folder backup that warns the books and their passwords must travel together",
    ],
    stack: ["Next.js 16", "React 19", "Electron", "PostgreSQL", "Recharts", "Tailwind CSS v4"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Ammar-Sagheer/Offline-Committee-Manager-App",
      },
    ],
  },
  {
    slug: "petrol-pump-management-software",
    name: "Petrol Pump Management Software",
    year: "2026",
    role: "Collaborator",
    kind: "Web application",
    accent: "#eab308",
    featured: true,
    isPrivate: true,
    tagline: "The web original the offline desktop build was cut from.",
    summary:
      "The hosted version of the pump management system: daily meter readings, stock movements, customer credit, cash reconciliation and monthly profit — the numbers a station owner checks against the cash in the drawer.",
    problem:
      "Fuel retail runs on a handful of figures that have to reconcile exactly: what the meters say went out, what stock is left, who bought on credit, and what is actually in the till at close.",
    approach:
      "A Next.js App Router application over PostgreSQL, with the money rules enforced in the database rather than in the UI, so a bad number cannot get in through a second entry point later.",
    outcome:
      "Became the product the offline Electron edition was later packaged from, sharing the same application code with the hosting step swapped out.",
    highlights: [
      "Daily readings, stock counts and cash-vs-credit splits",
      "Customer credit ledger with payments against balances",
      "Monthly profit reporting owners can check by hand",
      "Constraints enforced in Postgres, not just the form",
    ],
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Recharts"],
    links: [],
  },
  {
    slug: "saamj-store",
    name: "SAAMJ Store",
    year: "2026",
    role: "Collaborator",
    kind: "E-commerce",
    accent: "#ec4899",
    featured: true,
    isPrivate: true,
    tagline: "A storefront and admin panel built once, then deployed per client.",
    summary:
      "Full-stack e-commerce platform — browsing, search, cart, checkout, customer accounts and a complete admin back office — built deliberately as a reusable template so a second client deployment was a configuration job, not a rewrite.",
    problem:
      "Small retailers need a real store with real order management, but rebuilding the same catalog-cart-checkout-admin surface for every client is wasted work.",
    approach:
      "One codebase on Next.js and Supabase covering both the shopper-facing storefront and a dark-mode admin panel, with OAuth customer accounts, saved addresses, order history and bulk CSV catalog import.",
    outcome:
      "Shipped to a live client, then forked into a second client deployment that reuses the same core. Auth and session handling were hardened across the whole surface rather than per page.",
    highlights: [
      "Google OAuth customer accounts with addresses and order history",
      "Admin panel with bulk CSV catalog import",
      "Checkout flow wired for card and manual payment",
      "Row-level security across every customer-owned table",
      "Reused for a second client deployment without a rewrite",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS v4", "Stripe-ready"],
    links: [],
  },
  {
    slug: "roaster-coffee-shop",
    name: "Roaster Coffee Shop",
    year: "2026",
    role: "Collaborator",
    kind: "Marketing & ordering",
    accent: "#b45309",
    featured: false,
    isPrivate: true,
    tagline: "A specialty roastery site that prints what it paid the farmer.",
    summary:
      "Single-page site for a specialty coffee roastery and bar: the story, the espresso and filter menu, a pickup-order panel, and a sourcing table naming every farm the beans came from alongside the price paid for them.",
    problem:
      "A coffee shop with nine named farm partners and a two-week freshness window has a story that a generic menu page throws away — and the customer standing on the pavement mostly wants one thing, which is to order a flat white for pickup without downloading anything.",
    approach:
      "One scrolling page with anchored sections rather than a multi-page site, so nothing costs a navigation. The order panel sits inline — pick a drink, size, quantity and the name for the cup, with the total recalculating as you go — and a search field filters the espresso bar, filter coffee and retail bags in place.",
    outcome:
      "The whole page is statically prerendered and ships on Vercel, so there is no server to keep warm. Sourcing is treated as content rather than a claim: a table lists each farm, its origin, varietal and the per-pound price paid, which is the same figure printed on the bag.",
    highlights: [
      "Inline pickup ordering — drink, size, quantity, name for the cup, live total",
      "Type-ahead search across the espresso bar, filter coffee and retail bags",
      "Farm-by-farm sourcing table showing origin, varietal and price paid",
      "Anchored single-page layout, statically prerendered end to end",
      "Testimonial carousel and newsletter capture without a backend to run",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    links: [
      {
        label: "Live site",
        href: "https://coffee-shop-2-nu.vercel.app/",
      },
    ],
  },
  {
    slug: "ecommerce-reactive-chatbot",
    name: "E-commerce Reactive Chatbot",
    year: "2026",
    role: "Collaborator",
    kind: "Applied AI",
    accent: "#8b5cf6",
    featured: true,
    isPrivate: false,
    tagline: "Ask the store a question; it writes the SQL and answers out loud.",
    summary:
      "A storefront assistant that answers questions about products, prices and store policy by generating SQL against the real product catalog, grounding policy answers in retrieved store documents, and streaming both text and voice back live.",
    problem:
      "Shoppers ask questions a search box cannot answer — comparisons, availability, 'what does your returns policy actually say'. Hard-coding those answers does not scale with a catalog.",
    approach:
      "A LangGraph pipeline on Next.js: the question is embedded and checked against a semantic cache, then routed either to LLM-generated SQL over the Postgres catalog or to retrieval over store policy documents. Failed queries self-heal with one retry.",
    outcome:
      "Answers stream token-by-token instead of arriving as a wait-then-dump, chart-worthy results render as inline bar or line charts, and paraphrased repeat questions skip the model round-trip entirely via the semantic cache.",
    highlights: [
      "Text-to-SQL over a live Postgres catalog, with a self-healing retry",
      "RAG over store policy documents for non-catalog questions",
      "Semantic cache keyed on embeddings, so paraphrases hit the cache",
      "Token-by-token streaming, with optional spoken responses",
      "Inline charts when the answer is a comparison or a trend",
    ],
    stack: ["Next.js", "LangGraph", "Google Gemini", "PostgreSQL", "Redis"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Ammar-Sagheer/ecommerce-reactive-chatbot",
      },
    ],
  },
  {
    slug: "store-ai-agent",
    name: "Store AI Agent",
    year: "2026",
    role: "Collaborator",
    kind: "Applied AI",
    accent: "#06b6d4",
    featured: false,
    isPrivate: false,
    tagline: "A text-to-SQL backend that cannot read the tables it shouldn't.",
    summary:
      "Python service that turns a shopper's natural-language question into a read-only SQL query, runs it against the store's Supabase Postgres through a restricted role, and returns a written answer.",
    problem:
      "Letting a language model generate SQL against a production database is a security problem before it is a product feature. The interesting question is not whether it can answer — it is what happens when it generates something it shouldn't.",
    approach:
      "Defence in depth. The service connects as a `chatbot_readonly` Postgres role granted SELECT on three catalog tables and nothing else, so orders, addresses and profiles are unreachable no matter what SQL comes out of the model. A separate guard rejects anything that is not a single read-only SELECT before it reaches the database at all.",
    outcome:
      "A proven minimal loop — question, cache check, SQL generation, execute, self-heal once, summarise, cache — that the larger Next.js chatbot was then built out from.",
    highlights: [
      "Restricted Postgres role as the real security boundary",
      "SQL guard rejecting non-SELECT statements before execution",
      "Cosine-similarity semantic cache with a 0.87 threshold",
      "Failed and fallback answers are never cached",
      "Shared-secret API key plus CORS origin allow-listing",
    ],
    stack: ["Python", "FastAPI", "Google Gemini", "Supabase", "Docker"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Ammar-Sagheer/reactive-google-ai-agent",
      },
    ],
  },
  {
    slug: "psx-rsi-dashboard",
    name: "PSX RSI Dashboard",
    year: "2026",
    role: "Collaborator & maintainer",
    kind: "Web + desktop",
    accent: "#22c55e",
    featured: true,
    isPrivate: false,
    tagline: "A swing-trading screener for the Pakistan Stock Exchange, on the web and on the desktop.",
    summary:
      "Short-term trading dashboard for PSX equities: live prices and history from the exchange's public feed, RSI computed across multiple periods, and a screener that surfaces oversold names worth a one-to-two week hold.",
    problem:
      "Indicator values that disagree with what a trader sees on TradingView are worse than no indicator at all — and PSX price history contains splits and dividends that quietly wreck a naive RSI calculation.",
    approach:
      "The RSI pipeline was validated against TradingView output row by row. A corporate-action adjuster normalises historical prices, but only on drops — treating large rises as splits erased genuine rallies from the history, a bug found by comparing real output rather than reading the code.",
    outcome:
      "Ships in two forms from one codebase: the hosted web app, and a Windows desktop build where Electron replaces the hosting step by spawning the Next.js standalone server on a fixed loopback port. A liquidity floor tracks volume as a tri-state so a data outage cannot silently empty the screener.",
    highlights: [
      "RSI(14) and RSI(2) verified against TradingView on real data",
      "Corporate-action adjustment that fires on drops only, by design",
      "Fixed buy-signal rule, independent of the selected chart view",
      "Volume floor tracked as number / confirmed-null / unknown",
      "Electron desktop port with no database and no cloud account",
    ],
    stack: ["Next.js 16", "React 19", "Electron", "Recharts", "Tailwind CSS v4"],
    links: [
      {
        label: "Web app",
        href: "https://github.com/Ammar-Sagheer/Stocks-RSI-Display",
      },
      {
        label: "Desktop build",
        href: "https://github.com/owaisikhan/windows-app-stocks-RSI",
      },
    ],
  },
  {
    slug: "meridian-consulting",
    name: "Meridian Digital Consulting",
    year: "2026",
    role: "Solo",
    kind: "Marketing & intake",
    accent: "#6366f1",
    featured: false,
    isPrivate: false,
    tagline: "A consultancy site where the contact form asks better follow-up questions.",
    summary:
      "Marketing and client-intake site for a digital consultancy, with a multi-step intake flow that uses an LLM to generate follow-up questions from what the prospect has already described, and an admin dashboard for triaging the leads that come out of it.",
    problem:
      "A generic contact form produces leads you have to email three times before you know whether they are worth a call.",
    approach:
      "A staged intake — service selection, problem description, AI-generated follow-up, review and submit — persisted to Supabase, with a schema-validated model response so a bad generation cannot corrupt the lead record.",
    outcome:
      "Leads arrive already qualified, and the admin side has GSAP entrance choreography gated behind pre-hidden markup so nothing flashes at full opacity before it animates in.",
    highlights: [
      "Multi-step intake with AI-generated follow-up questions",
      "Zod-validated model output before anything is persisted",
      "Supabase auth-backed admin dashboard with lead status tracking",
      "Hand-tuned GSAP fade and stagger sequences, flash-free",
    ],
    stack: ["Next.js 16", "Supabase", "AI SDK", "GSAP", "Tailwind CSS v4"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/owaisikhan/merdian-consulting",
      },
    ],
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
