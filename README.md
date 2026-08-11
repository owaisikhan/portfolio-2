# Owais Khan — Portfolio (v2)

A dark, motion-led portfolio built to be shown to prospective clients. It lists
2026 work drawn from the repositories I own or collaborate on, with a full
case-study page per project.

Sections: hero, stats, selected work, about, services, process, stack, FAQ and
contact — plus `/work/[slug]` for each project.

## Stack

- **Next.js 16** (App Router, Turbopack, `app/` at the repository root — no `src/`)
- **React 19**
- **Tailwind CSS v4** — design tokens declared with `@theme` in
  `app/_styles/globals.css`, no `tailwind.config.js`
- **shadcn/ui** — Button, Card, Badge, Accordion, Separator, in
  `app/_components/ui/`, configured for plain JS via `components.json`
- **GSAP + ScrollTrigger** — scroll choreography: reveals, staggers, the
  kinetic headline, the terminal type-on, the process spine, stat counters
- **Motion** — pointer-driven interaction: magnetic buttons, tilt cards, the
  custom cursor, the scroll progress bar, the mobile menu
- **Geist Sans / Geist Mono**, self-hosted through the `geist` package
- Plain JavaScript with `jsconfig.json` path aliases (`@/*`), flat
  `eslint.config.mjs`

No database, no environment variables, no API routes, no images.

## Project structure

```
app/
  _components/
    layout/   Navbar, Footer
    home/     Hero, TerminalCard, Stats, Work, About, Services,
              Process, Stack, Faq, Contact
    motion/   Reveal, StaggerGroup, KineticHeading, MagneticButton,
              TiltCard, Marquee, Counter, ScrollProgress, Cursor
    shared/   SectionHeading
    ui/       shadcn primitives (button, card, badge, accordion, separator)
  _data/      projects.js    — every project shown on the site
  _lib/       siteConfig.js  — name, copy, nav, services, process, stack, FAQ
              gsap.js        — plugin registration + reduced-motion helper
              utils.js       — cn()
  _styles/    globals.css    — @theme tokens and global rules
  work/[slug]/page.js        — case-study pages (statically generated)
  layout.js
  page.js
  not-found.js
  icon.svg
docs/
  PROGRESS.md                — why things are built the way they are
components.json              — shadcn CLI configuration
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Editing content

Everything visitor-facing lives in two files — no component edits needed for
routine updates:

- **`app/_lib/siteConfig.js`** — name, role, availability, headline, intro,
  about paragraphs, nav links, services, process steps, stack groups, marquee
  items, FAQ entries and the stat tiles.
- **`app/_data/projects.js`** — the project list. Each entry drives both its
  card in the work grid and its generated case-study page, so adding a project
  is one object; no route needs to be created.

### Project fields

| Field | Purpose |
| --- | --- |
| `slug` | URL segment for `/work/[slug]` |
| `name`, `tagline`, `summary` | Card and case-study headers |
| `problem`, `approach`, `outcome` | The three case-study body sections |
| `highlights` | Bullet list on the case study |
| `stack` | Chips; the first four show on the card |
| `links` | `[{ label, href }]` — **leave empty for private client work** |
| `isPrivate` | Adds the "Client / private" badge and swaps the links block for a "happy to walk through it on a call" note |
| `accent` | Per-project colour used for the card rule, case-study glow and highlight ticks |
| `kind`, `role`, `year` | Metadata shown on the card and case study |

The header comment in that file records which 2026 repositories were considered
and why each one is in or out, so the list can be re-checked later without
re-deriving it.

### Adding a shadcn component

`components.json` is wired to this layout, so the CLI works unchanged:

```bash
npx shadcn@latest add tooltip
```

It lands in `app/_components/ui/` as plain JSX with a `@/app/_lib/utils`
import.

## Motion notes

- **Reduced motion is respected throughout.** Every animation checks
  `prefers-reduced-motion` and degrades to the *final* state rather than to a
  faster animation. `app/_lib/gsap.js` exports the helper.
- **Reveal elements are pre-hidden in CSS** so GSAP can fade them in without a
  flash of already-visible content. A `<noscript>` block in `app/layout.js`
  puts them back for visitors without JavaScript, so the page is never blank.
- **Scroll- and pointer-frame updates write to the DOM directly**, not through
  React state — the stat counters, terminal type-on and tilt spotlight would
  otherwise re-render on every frame.
- **`html` uses `overflow-x: clip`, never `hidden`.** See `docs/PROGRESS.md`;
  `hidden` silently breaks every ScrollTrigger on the page.

## Deployment

A standard Next.js app with no server-side data dependencies, environment
variables or database. Every route is prerendered (`/`, `/work/[slug]`,
`/_not-found`), so it deploys as-is to Vercel, Netlify or any static host.
