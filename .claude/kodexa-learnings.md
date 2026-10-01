# kodexa-builder learnings

This file is how this repo teaches the kodexa-builder skill. Every session
that loads the skill reads it first and appends to it as the user corrects,
reverses or chooses things. Entries promoted into the skill are marked with
the version they landed in. See the skill's `references/self-improvement.md`
for the rules.

- **Project:** Owais Khan portfolio (v2, redesign to v3 in progress)
- **Type:** marketing-site (personal portfolio)
- **Who reads it daily:** prospective clients, mostly small-business owners, on a phone or laptop
- **Palette exceptions:** none
- **Skill version when started:** 1.4.0

## Summary

| ID | Date | Kind | Lesson (short) | Scope | Status |
|---|---|---|---|---|---|
| L-001 | 2026-10-01 | rule | Redesign starts with concepts, design language and a skeleton, agreed before any visual design or code | all | logged |
| L-002 | 2026-10-01 | gap | Portfolio projects carry a cover image on the home page and a walkthrough video on the case study | type: marketing-site | logged |

## Entries

### L-001 · 2026-10-01 · strong · rule
- **Said / saw:** "Before you render the design, before you develop it, first show me the possible concepts. Tell me what design language you're going to use and what design system you're going to use. First create a skeleton and show it to me. We'll agree on the skeleton first, then we'll go ahead and create the actual design." and "First, we'll finalize one page."
- **Context:** portfolio-2 redesign request (new projects, hero video, project media)
- **Lesson:** For a redesign or new site, the first deliverable is 2 to 3 named concepts (palette, type pairing, one-line rationale each), the design system plan, and a greyscale skeleton of one page. No visual design or code until the user agrees the skeleton; then finish one page before starting the next.
- **Scope:** all projects
- **Target in skill:** references/types/marketing-site.md, section 8 "Redesigns and variants"
- **Status:** logged

### L-002 · 2026-10-01 · medium · gap
- **Said / saw:** "for each project shipped also add an image on the home page and in the detail page add a walk through video of the site/product and suggest improvements too"
- **Context:** portfolio-2, project data model
- **Lesson:** Portfolio project entries need a cover image (home grid) and a walkthrough video with chapters (case study), plus a "what I would improve next" list. Plan the data fields (`cover`, `walkthrough`, `improvements`) at skeleton stage so the layout reserves space for them.
- **Scope:** type: marketing-site (portfolios)
- **Target in skill:** references/types/marketing-site.md, section 7 "Content, pages and SEO"
- **Status:** logged
