import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { Footer } from "@/app/_components/layout/Footer";
import { Navbar } from "@/app/_components/layout/Navbar";
import { Cursor } from "@/app/_components/motion/Cursor";
import { ScrollProgress } from "@/app/_components/motion/ScrollProgress";
import { siteConfig } from "@/app/_lib/siteConfig";

import "@/app/_styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://owaiskhan.dev"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.intro,
  keywords: [
    "Next.js developer",
    "full-stack engineer",
    "Electron desktop apps",
    "Supabase",
    "PostgreSQL",
    "AI features",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.intro,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.intro,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Reveal elements are pre-hidden at opacity: 0 in globals.css so GSAP
          can fade them in without a flash. Without JavaScript that GSAP never
          runs, so put them back — this block is the no-JS safety net and must
          stay in sync with the pre-hide rule in app/_styles/globals.css.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal],[data-hero-fade],[data-stagger]>*{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent-lime px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Cursor />
        <Navbar />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
