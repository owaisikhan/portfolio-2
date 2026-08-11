"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";

import { KineticHeading } from "@/app/_components/motion/KineticHeading";
import { MagneticButton } from "@/app/_components/motion/MagneticButton";
import { Marquee } from "@/app/_components/motion/Marquee";
import { TerminalCard } from "@/app/_components/home/TerminalCard";
import { Button } from "@/app/_components/ui/button";
import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Everything below the headline arrives after it, not with it — the
      // headline is the only thing that should be moving at first paint.
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.55,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      // Slow parallax drift on the whole block as the page scrolls away.
      gsap.to("[data-hero-parallax]", {
        yPercent: 12,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-16 md:pt-36 md:pb-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 grid-backdrop" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bloom" />

      <div className="shell" data-hero-parallax>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* `min-w-0` matters: this is a grid item, and a display-sized
              heading is wider than the column at small viewports without it. */}
          <div className="flex min-w-0 flex-col items-start gap-8">
            <div
              data-hero-fade
              className="inline-flex items-center gap-2.5 rounded-full border border-accent-lime/25 bg-accent-lime/[0.07] py-1.5 pr-4 pl-2"
            >
              <span className="relative grid size-4 place-items-center">
                <span className="absolute size-2 rounded-full bg-accent-lime" />
                <motion.span
                  animate={{ scale: [1, 2.1], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute size-2 rounded-full bg-accent-lime motion-reduce:hidden"
                />
              </span>
              <span className="font-mono text-xs tracking-wide text-accent-lime">
                {siteConfig.availability}
              </span>
            </div>

            <KineticHeading
              lines={siteConfig.headline}
              className="text-display w-full font-semibold"
              lineClassName="fade-text"
            />

            <p
              data-hero-fade
              className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {siteConfig.intro}
            </p>

            <div data-hero-fade className="flex flex-wrap items-center gap-3">
              <MagneticButton asChild size="lg">
                <a href="#work">
                  See the work
                  <ArrowDown className="size-4" />
                </a>
              </MagneticButton>

              <Button asChild variant="outline" size="lg">
                <a href={`mailto:${siteConfig.email}`}>
                  Start a project
                  <ArrowUpRight />
                </a>
              </Button>

              <Button asChild variant="ghost" size="lg">
                <a href={siteConfig.github} target="_blank" rel="noreferrer">
                  <Github />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <div data-hero-fade className="w-full">
            <TerminalCard />
          </div>
        </div>
      </div>

      <div data-hero-fade className="mt-16 md:mt-24">
        <Marquee items={siteConfig.marquee} />
      </div>
    </section>
  );
}
