"use client";

import { cn } from "@/app/_lib/utils";

/**
 * Infinite tech strip.
 *
 * The track holds the items twice and shifts by exactly -50%, so the loop
 * point lands on an identical frame. Animating a duplicated track in CSS keeps
 * this off the main thread — the earlier GSAP version of this ran a tween for
 * the entire page lifetime for no visual gain.
 *
 * The duplicate copy is `aria-hidden`, so a screen reader hears the list once.
 */
export function Marquee({ items, className, duration = 42, reverse = false }) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max shrink-0 will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `marquee-shift ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-8 px-8 py-1"
              >
                <span className="font-mono text-sm tracking-tight text-muted-foreground whitespace-nowrap transition-colors hover:text-foreground">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-accent-lime/50"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
