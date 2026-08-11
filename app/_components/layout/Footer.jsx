import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";

import { Marquee } from "@/app/_components/motion/Marquee";
import { Reveal } from "@/app/_components/motion/Reveal";
import { Separator } from "@/app/_components/ui/separator";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border pt-16">
      <div className="shell flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              {siteConfig.location}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                {siteConfig.email}
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="size-4" />
                GitHub
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </Reveal>

          <Reveal className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </Reveal>
        </div>

        {/* The name, set as large as the viewport allows, sitting on the
            baseline of the page. It is decorative here — the accessible name
            of the site is already in the header and in <title>. */}
        <div aria-hidden="true" className="relative select-none">
          <p className="text-mega bg-gradient-to-b from-white/16 to-white/[0.02] bg-clip-text font-semibold text-transparent">
            {siteConfig.name}
          </p>
        </div>
      </div>

      <Marquee items={siteConfig.marquee} reverse duration={60} className="py-4" />

      <div className="shell flex flex-col items-center justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="font-mono">Built with Next.js, Tailwind, GSAP & Motion</p>
      </div>
    </footer>
  );
}
