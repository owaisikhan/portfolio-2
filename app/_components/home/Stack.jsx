import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import { Badge } from "@/app/_components/ui/badge";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-28 py-20 md:py-28">
      <SectionHeading
        index="05"
        label="Stack"
        title="The tools I reach for."
        lede="Defaults, not limits — several of the projects above are in stacks I picked up because the job needed them."
      />

      <StaggerGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
        {siteConfig.stack.map((group) => (
          <div
            key={group.group}
            className="flex flex-col gap-5 bg-ink px-6 py-8 md:px-8 md:py-10"
          >
            <h3 className="font-mono text-xs tracking-[0.18em] text-accent-lime uppercase">
              {group.group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge className="px-3.5 py-1.5 text-[0.8125rem] text-foreground/90 transition-colors hover:border-white/25 hover:bg-white/[0.07]">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}
