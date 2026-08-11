<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: Owais Khan — Portfolio (v2)

A dark, motion-led portfolio built on shadcn/ui, Motion and GSAP, showing 2026
client and collaborative work to prospective clients. Static: no database, no
environment variables, no API routes, no images.

**Read `README.md` first** — it covers the stack, the folder layout and the two
content files that drive every page. **`docs/PROGRESS.md`** records why specific
decisions were made; read it before "simplifying" any motion code, because
several things that look redundant are load-bearing.

## Repository conventions

These match the rest of the owner's repositories. Follow them rather than
framework defaults:

- **No `src/` directory.** `app/` sits at the repository root.
- **Underscore-prefixed private folders** inside `app/`: `_components`, `_lib`,
  `_data`, `_styles`. Next.js excludes these from routing.
- **Components grouped by feature**, not by type: `_components/home/`,
  `_components/layout/`, `_components/motion/`, `_components/shared/`, plus
  `_components/ui/` for shadcn primitives.
- **Plain JavaScript**, not TypeScript. `jsconfig.json` provides the `@/*`
  alias; import as `@/app/_components/...`.
- **Tailwind v4 via `@tailwindcss/postcss`** with `@theme` tokens in
  `app/_styles/globals.css`. There is no `tailwind.config.js` and one should not
  be added.
- Flat `eslint.config.mjs`, `next.config.mjs`, `postcss.config.mjs`.
- `CLAUDE.md` is a one-line `@AGENTS.md` include.

## shadcn/ui

`components.json` points the CLI at this layout: `tsx: false`, components at
`@/app/_components`, ui at `@/app/_components/ui`, utils at `@/app/_lib/utils`.
`npx shadcn@latest add <component>` lands files in the right place. Every ui/
component keeps its shadcn source shape and its `cn()` import — do not
hand-restyle them; pass classes at the call site instead.

The colour tokens in `globals.css` keep shadcn's variable names
(`--color-primary`, `--color-muted-foreground`, …) so a freshly added component
is styled correctly with no rewiring.

## Content lives in data files, not components

Adding or editing a project means editing `app/_data/projects.js` only. Each
entry generates both its card in the work grid and its case-study page via
`generateStaticParams`. Never hard-code a project into a component, and never
create a route by hand under `app/work/`.

Site-level copy — name, headline, intro, about, nav, services, process, stack,
marquee, FAQ, stats — lives in `app/_lib/siteConfig.js`.

## Things most likely to bite you

- **Never set `overflow-x: hidden` on `html` or `body`.** On those elements it
  computes `overflow-y` to `auto`, which makes them a scroll container and stops
  ScrollTrigger finding the real scroller. Every scroll reveal on the page then
  stays stuck at `opacity: 0`. Use `overflow-x: clip`, which is already set.
- **`[data-reveal]`, `[data-hero-fade]` and `[data-stagger] > *` are pre-hidden
  at `opacity: 0` in CSS.** That is deliberate — GSAP fades them in from an
  effect that runs after first paint, so without the pre-hide there is a visible
  flash. If you remove the GSAP that reveals them they stay invisible forever.
  The `<noscript>` block in `app/layout.js` is the no-JS safety net and must be
  kept in sync with the selector list.
- **Don't put a display size and `fade-text` through `cn()` together.**
  `tailwind-merge` reads `fade-text`'s predecessor `text-fade` as a font-size
  utility and drops `text-headline`. The class was renamed to `fade-text` for
  exactly this reason; do not rename it back into the `text-*` namespace.
- **`MagneticButton` puts its transform on a wrapper, not on the Button.**
  Wrapping the Button's *children* in a motion element looks equivalent but is
  not: with `asChild`, Radix's Slot clones that wrapper and the real `<a>` ends
  up nested inside the pill, leaving only the text clickable.
- **Never call `setState` on a scroll or pointer frame.** The stat counters, the
  terminal type-on and the tilt spotlight write `textContent`, `style` and CSS
  custom properties directly through refs. ESLint's
  `react-hooks/set-state-in-effect` rule rejects the naive version too — see
  `Cursor.jsx` for the `useSyncExternalStore` pattern used for capability
  detection.
- **`TiltCard` is a motion component and does not forward a ref.** Anything that
  needs a GSAP context scope inside one must put the ref on an inner element —
  `TerminalCard` does this, and the animation silently does nothing if it
  doesn't.
- **Reduced motion degrades to the *final* state, never to a faster tween.**
  Every animation checks `prefersReducedMotion()` from `app/_lib/gsap.js`.

## Verifying a change

There is no test suite. Verify visually:

```bash
npm run build && npm run start   # then drive it with Playwright
```

Chromium is preinstalled at `/opt/pw-browsers/chromium-*/chrome-linux/chrome`.
Check at **1440x900 and 1440x768** (the short viewport is where the hero CTA
falls below the fold first), at **390x844**, and with **reduced motion forced
on** — nothing may be left at `opacity: 0`.

When scripting the check, scroll with `behavior: "instant"`. The page sets
`scroll-behavior: smooth`, and a queue of smooth scrolls never lands where the
loop thinks it does, which makes working reveals look broken.
