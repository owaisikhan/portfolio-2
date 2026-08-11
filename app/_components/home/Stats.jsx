import { Counter } from "@/app/_components/motion/Counter";
import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { stats } from "@/app/_lib/siteConfig";

export function Stats() {
  return (
    <section className="shell py-16 md:py-20">
      <StaggerGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1.5 bg-ink px-6 py-8 md:px-8"
          >
            <Counter
              value={stat.value}
              className="text-4xl font-semibold tracking-tight tabular-nums md:text-5xl"
            />
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}
