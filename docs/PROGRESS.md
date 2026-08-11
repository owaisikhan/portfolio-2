# Progress & decisions

Why things are built the way they are. Read this before "simplifying" the
motion code — several things that look redundant are load-bearing.

## Where the project list came from

The site exists to show 2026 work, so the list was built by scanning every
repository the account owns or collaborates on and filtering to 2026 activity.
The full in/out ledger — including why the course-follow-along repositories
(`the-wild-oasis`, `Hotel-Website`, `Hotel-Management-App`, `Pizza_Made_BY_US`,
`react-pizza`) and the scratch repositories (`practice-react`, `test`) are
excluded — is in the header comment of `app/_data/projects.js`. Keep that
comment current when the list changes; it is the only record of the decision.

Three entries are private client repositories. They carry `links: []` and
`isPrivate: true` on purpose: a client clicking through to a GitHub 404 looks
worse than no link at all, so the case study offers a walkthrough call instead.

## Design direction

Modelled on the dark developer-showcase template genre the site was briefed
against: near-black ground, one signature accent, hairline borders, oversized
display type, a floating pill nav, a tech marquee, numbered service cards, a
timeline, an FAQ accordion, and the name set as large as the viewport allows
across the footer.

The reference site itself could not be loaded — this environment's egress proxy
blocks `webflow.io` — so the layout was built from the conventions of that
genre rather than copied section for section. If the visual direction needs to
track the reference more literally, that is the thing to re-check first.

Two deliberate departures:

- **No portrait.** The brief said not to use a photo at this stage, so the slot
  a template fills with a headshot holds `TerminalCard` — a terminal transcript
  that types itself out. It carries the same information a bio photo block
  would (who, stack, shipped work, availability) and suits a developer
  portfolio better than a placeholder avatar.
- **No testimonials section.** The genre expects one, but there are no real
  client quotes to put in it and inventing them would be fabricating a record.
  The slot is spent on `Process` instead, which is honest and does similar work
  in the page rhythm.

## Motion architecture

GSAP and Motion are split by what they are each good at, not used
interchangeably:

- **GSAP + ScrollTrigger** owns anything driven by scroll position or by a
  timeline: reveals, staggers, the kinetic headline mask, the terminal type-on,
  the process spine draw, the stat counters, the hero parallax.
- **Motion** owns anything driven by the pointer or by presence: magnetic
  buttons, tilt cards, the cursor ring, the scroll progress spring, the mobile
  menu's enter/exit.

`app/_lib/gsap.js` is the single plugin registration point. Import `gsap` from
there, never from the package, so ScrollTrigger is guaranteed registered.

## Bugs found while building, and what they cost

These are the non-obvious ones. Each was found by rendering the page, not by
reading the code.

### `overflow-x: hidden` on `body` broke every scroll reveal

Symptom: every `[data-reveal]` and `[data-stagger]` element stayed at
`opacity: 0` forever, while the hero's plain timeline animations worked fine.

Cause: on `html`/`body`, `overflow-x: hidden` computes `overflow-y` to `auto`.
That turns the element into a scroll container and ScrollTrigger can no longer
identify the real scroller, so no trigger ever fires. Nothing errors.

Fix: `overflow-x: clip` on both. It trims the same overflow without creating a
scroll container. **Do not change this back.**

### `tailwind-merge` silently dropped a display font size

The case-study `<h1>` rendered at body size. The class list was
`text-headline max-w-4xl font-semibold text-fade`, passed through `cn()`.
`tailwind-merge` classifies `text-fade` as a font-size utility, decides it
conflicts with `text-headline`, and keeps only the last one.

Fix: the custom utility was renamed out of the `text-*` namespace to
`fade-text`. Do not rename it back.

### `asChild` swallowed the magnetic button's wrapper

`MagneticButton` originally wrapped the Button's *children* in a `motion.span`
for a label parallax effect. With `asChild`, Radix's Slot clones its single
child — which was that span — so the rendered pill was a span and the real
`<a href>` ended up nested inside it. Only the text was clickable, and the
Button's `whitespace-nowrap` never reached the label, so "See the work" wrapped
onto two lines.

Fix: the transform moved to a wrapper *outside* the Button, leaving `asChild`
free to make the anchor the button. The label parallax was dropped; it was not
worth a broken hit area.

### A GSAP context scoped to a ref that was never attached

`TerminalCard` held a `ref` that was never placed on an element, because
`TiltCard` is a motion component and does not forward refs. The effect hit
`if (!el) return` and the card rendered permanently empty — no error, no
warning. The scope now lives on an inner element that is an ancestor of every
animated line.

### The verification harness lied before the page did

The first automated pass reported reveals as broken when they were not: the
script scrolled with `window.scrollTo(0, y)` in a loop while the page sets
`scroll-behavior: smooth`, so the queued smooth scrolls never landed where the
loop assumed. Scripted checks must use `behavior: "instant"`.

A stale `next start` also served HTML referencing a CSS chunk from a previous
build, which surfaced as a phantom 500. Rebuild and restart the server together
before trusting a visual check.

## Accessibility decisions

- `KineticHeading` splits a heading into per-line masked spans. The spans are
  `aria-hidden` and the whole phrase is exposed once in an `sr-only` copy, so a
  screen reader hears one sentence rather than a list of fragments.
- `TerminalCard` writes into empty spans, which are invisible to assistive tech
  until the timeline runs, so the finished transcript is exposed once up front
  and the animated lines are `aria-hidden`.
- `Marquee` renders its item list twice for a seamless loop; the second copy is
  `aria-hidden`.
- The footer's oversized name is decorative and `aria-hidden` — the accessible
  name of the site is already in the header and in `<title>`.
- `Cursor` renders nothing at all on coarse pointers or under reduced motion,
  via `useSyncExternalStore` so the server snapshot matches first client paint.
- There is a skip link, and `scroll-padding-top` keeps the floating nav from
  covering an anchored section heading.

## Verified

Built and driven with Playwright against the production build at 1440x900,
1440x768 and 390x844, plus a reduced-motion pass. Checks: no console errors, no
element left below `opacity: 0.05` after a full scroll-through, no horizontal
overflow, and the hero CTA is a single-line anchor with a full-size hit area.
`npm run lint` and `npm run build` are clean; all 11 routes prerender.

## Not done yet

- No Open Graph image. `opengraph-image.js` would need a design pass.
- `metadataBase` is a placeholder (`https://owaiskhan.dev`) — set it to the
  real domain before launch or social cards will resolve against the wrong
  host.
- No sitemap or `robots.txt`.
- The reference site was never loadable from this environment, so the visual
  direction is genre-accurate rather than reference-exact.
