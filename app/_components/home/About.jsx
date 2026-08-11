import { Reveal } from "@/app/_components/motion/Reveal";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import { Separator } from "@/app/_components/ui/separator";
import { siteConfig } from "@/app/_lib/siteConfig";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 border-y border-border py-20 md:py-28"
    >
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeading
          index="02"
          label="About"
          title="I care about the boring parts."
        />

        <div className="flex flex-col gap-6">
          {siteConfig.about.map((paragraph, index) => (
            <Reveal
              key={paragraph.slice(0, 32)}
              as="p"
              delay={index * 0.08}
              className="text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {paragraph}
            </Reveal>
          ))}

          <Reveal className="mt-4 flex flex-col gap-6">
            <Separator />
            <dl className="grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Role
                </dt>
                <dd className="text-sm">{siteConfig.role}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Based in
                </dt>
                <dd className="text-sm">{siteConfig.location}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Status
                </dt>
                <dd className="text-sm text-accent-lime">
                  {siteConfig.availability}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
