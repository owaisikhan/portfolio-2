"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { siteConfig } from "@/app/_lib/siteConfig";
import { cn } from "@/app/_lib/utils";

/**
 * Floating pill navigation.
 *
 * It condenses after the first scroll rather than on a section boundary, so it
 * behaves identically on the home page and on a case-study page where there is
 * no hero to key off.
 */
export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setCondensed(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A fixed-position menu over a scrolling page is disorienting; lock the body
  // while it is open and restore whatever the page had before.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-80 pt-4 md:pt-6">
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex w-[min(100%-1.5rem,64rem)] items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 md:px-4",
            condensed
              ? "border-border bg-ink/70 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-full pl-2 pr-3 py-1"
          >
            <span className="grid size-8 place-items-center rounded-full bg-accent-lime font-mono text-xs font-semibold text-primary-foreground">
              {siteConfig.initials}
            </span>
            <span className="text-sm font-medium tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={`mailto:${siteConfig.email}`}>
                Start a project
                <ArrowUpRight />
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-white/[0.06] md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-70 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <ul className="flex flex-col gap-2">
                {siteConfig.nav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border py-5 text-3xl font-semibold tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <Button asChild size="lg" className="mt-10 self-start">
                <a
                  href={`mailto:${siteConfig.email}`}
                  onClick={() => setOpen(false)}
                >
                  Start a project
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
