import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { TiltCard } from "@/app/_components/motion/TiltCard";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import { Badge } from "@/app/_components/ui/badge";
import { projects } from "@/app/_data/projects";

/**
 * Selected work.
 *
 * The list is generated from `_data/projects.js` — adding a project is one
 * object in that file, which also generates its case-study route. Never
 * hard-code a project here.
 */
export function Work() {
  return (
    <section id="work" className="shell scroll-mt-28 py-20 md:py-28">
      <SectionHeading
        index="01"
        label="Selected work"
        title="Nine products shipped in 2026."
        lede="Client software and team projects, drawn from the repositories I own or build in. Practice and course repositories are left out on purpose — everything below is something a business uses."
      />

      <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            // The first two run full width, so the reel opens on the two
            // pieces of work that carry the most weight.
            wide={index < 2}
          />
        ))}
      </StaggerGroup>
    </section>
  );
}

function ProjectCard({ project, index, wide }) {
  return (
    <TiltCard
      accent={project.accent}
      max={4}
      className={wide ? "md:col-span-2" : undefined}
    >
      <Link
        href={`/work/${project.slug}`}
        className="panel group flex h-full flex-col gap-6 overflow-hidden p-6 transition-colors duration-300 hover:border-white/25 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Badge variant="mono">{project.kind}</Badge>
            {project.isPrivate ? (
              <Badge variant="mono">
                <Lock className="size-3" />
                Client / private
              </Badge>
            ) : null}
          </div>

          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border transition-all duration-300 group-hover:border-transparent group-hover:bg-accent-lime group-hover:text-primary-foreground"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {project.name}
          </h3>
          <p
            className="text-base leading-relaxed text-muted-foreground"
            style={{ maxWidth: wide ? "46rem" : undefined }}
          >
            {project.tagline}
          </p>
        </div>

        {/* A thin rule in the project's own accent — the only place the
            per-project colour appears at full strength. */}
        <span
          aria-hidden="true"
          className="h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{
            background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          }}
        />

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {project.role} · {project.year}
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
