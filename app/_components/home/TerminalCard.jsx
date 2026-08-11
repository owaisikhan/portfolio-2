"use client";

import { useEffect, useRef } from "react";

import { TiltCard } from "@/app/_components/motion/TiltCard";
import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";

/**
 * Stands in for the portrait most portfolio templates put here.
 *
 * Lines are typed out one after another by a single GSAP timeline that writes
 * `textContent` through refs — a character-by-character setState would
 * re-render the card on every frame of the type-on.
 */
const LINES = [
  { prompt: "~", text: "whoami", kind: "cmd" },
  { text: "Owais Khan — full-stack product engineer", kind: "out" },
  { prompt: "~", text: "cat stack.json", kind: "cmd" },
  { text: '{ "app": "Next.js 16", "db": "PostgreSQL" }', kind: "json" },
  { text: '{ "desktop": "Electron", "ai": "LangGraph" }', kind: "json" },
  { prompt: "~", text: "ls shipped/2026", kind: "cmd" },
  { text: "petrol-pump-manager  saamj-store  psx-rsi", kind: "out" },
  { prompt: "~", text: "status", kind: "cmd" },
  { text: "● available for client work", kind: "ok" },
];

/**
 * Reveals the caret and starts it blinking.
 *
 * Class swap rather than an inline opacity, because the blink is a CSS
 * animation on `opacity` and a running animation outranks an inline style —
 * setting `style.opacity` here would be silently ignored.
 */
function showCaret(caret) {
  if (!caret) return;
  caret.classList.remove("opacity-0");
  caret.classList.add("animate-caret-blink");
}

const TONE = {
  cmd: "text-foreground",
  out: "text-muted-foreground",
  json: "text-accent-lime/80",
  ok: "text-accent-lime",
};

export function TerminalCard() {
  const ref = useRef(null);
  const lineRefs = useRef([]);
  const caretRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nodes = lineRefs.current.filter(Boolean);
    const caret = caretRef.current;

    // Reduced motion: show the finished transcript, no type-on at all.
    if (prefersReducedMotion()) {
      nodes.forEach((node, index) => {
        node.textContent = LINES[index].text;
        node.parentElement.style.opacity = "1";
      });
      showCaret(caret);
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.9,
        // The caret is revealed through the DOM, not through state — a
        // setState here re-renders the whole card for one blinking span.
        onComplete: () => showCaret(caret),
      });

      nodes.forEach((node, index) => {
        const { text, kind } = LINES[index];
        const state = { i: 0 };

        timeline
          .set(node.parentElement, { opacity: 1 })
          .to(state, {
            i: text.length,
            // Commands are "typed", output arrives fast — the rhythm is what
            // sells it as a session rather than a looping animation.
            duration: kind === "cmd" ? text.length * 0.035 : 0.18,
            ease: "none",
            onUpdate() {
              node.textContent = text.slice(0, Math.round(state.i));
            },
          })
          .to({}, { duration: kind === "cmd" ? 0.22 : 0.1 });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <TiltCard className="panel overflow-hidden rounded-2xl" max={5}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          owais@portfolio — zsh
        </span>
      </div>

      {/* The GSAP context is scoped to this element, so it has to be an
          ancestor of every animated line — TiltCard is a motion component and
          does not forward a ref, so the scope cannot live on the card. */}
      <div
        ref={ref}
        className="min-h-[19rem] px-4 py-4 font-mono text-[0.8125rem] leading-relaxed sm:min-h-[21rem]"
      >
        {/* The animated lines are written into empty spans, so they are
            invisible to assistive tech until the timeline runs. Expose the
            finished transcript once, up front, instead. */}
        <span className="sr-only">
          {LINES.map((line) => line.text).join(". ")}
        </span>

        {LINES.map((line, index) => (
          <p
            key={`${line.text}-${index}`}
            aria-hidden="true"
            style={{ opacity: 0 }}
            className="flex gap-2 whitespace-pre-wrap break-words"
          >
            {line.prompt ? (
              <span aria-hidden="true" className="shrink-0 text-accent-lime">
                {line.prompt} $
              </span>
            ) : (
              <span aria-hidden="true" className="shrink-0 text-white/15">
                &gt;
              </span>
            )}
            <span
              ref={(node) => {
                lineRefs.current[index] = node;
              }}
              className={TONE[line.kind]}
            />
          </p>
        ))}

        {/* Block caret, revealed once the transcript has finished writing. */}
        <span
          ref={caretRef}
          aria-hidden="true"
          className="mt-1 inline-block h-4 w-2 bg-accent-lime align-middle opacity-0"
        />
      </div>
    </TiltCard>
  );
}
