import { ArrowUpRight, Github, Mail } from "lucide-react";

import { KineticHeading } from "@/app/_components/motion/KineticHeading";
import { MagneticButton } from "@/app/_components/motion/MagneticButton";
import { Reveal } from "@/app/_components/motion/Reveal";
import { Button } from "@/app/_components/ui/button";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-28 overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bloom rotate-180"
      />

      <div className="shell flex flex-col items-center gap-8 text-center">
        <Reveal className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/[0.03] px-4 py-1.5">
          <span className="size-1.5 rounded-full bg-accent-lime" />
          <span className="font-mono text-xs tracking-wide text-muted-foreground">
            {siteConfig.availability}
          </span>
        </Reveal>

        <KineticHeading
          as="h2"
          lines={["Have something", "worth building?"]}
          className="text-display font-semibold"
          lineClassName="fade-text"
          delay={0}
        />

        <Reveal
          as="p"
          className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Tell me what the business needs to get right and I&apos;ll tell you
          straight whether I&apos;m the right person to build it. No pitch deck,
          no discovery retainer — just a call about the problem.
        </Reveal>

        <Reveal className="flex flex-wrap items-center justify-center gap-3">
          <MagneticButton asChild size="lg">
            <a href={`mailto:${siteConfig.email}`}>
              <Mail className="size-4" />
              {siteConfig.email}
            </a>
          </MagneticButton>

          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              <Github />
              See the code
              <ArrowUpRight />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
