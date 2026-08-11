"use client";

import { useEffect, useRef } from "react";

import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";
import { siteConfig } from "@/app/_lib/siteConfig";

/**
 * How a project runs, as a vertical timeline whose spine draws itself as the
 * section scrolls past.
 *
 * The spine is a scaled element rather than an SVG stroke-dashoffset: it has
 * to span whatever height the steps happen to occupy, and a scrubbed
 * `scaleY` re-measures for free where a fixed path length does not.
 */
export function Process() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.utils.toArray("[data-step]").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 82%", once: true },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative border-y border-border py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          index="04"
          label="Process"
          title="How a project actually runs."
          lede="Short version: understand the numbers before writing code, and check the output against reality rather than against my own assumptions."
        />

        <ol className="relative mt-14 flex flex-col gap-10 pl-10 md:pl-16">
          {/* Spine track + the drawn overlay on top of it. */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-border md:left-[0.9375rem]"
          />
          <span
            data-spine
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.4375rem] w-px origin-top bg-gradient-to-b from-accent-lime to-accent-lime/10 md:left-[0.9375rem]"
          />

          {siteConfig.process.map((step, index) => (
            <li key={step.title} data-step className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-10 grid size-4 place-items-center rounded-full border border-accent-lime/40 bg-ink md:-left-16 md:size-8"
              >
                <span className="size-1.5 rounded-full bg-accent-lime md:size-2" />
              </span>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {step.title}
                </h3>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
