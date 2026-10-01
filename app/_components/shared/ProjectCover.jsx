import Image from "next/image";

import { Slate } from "@/app/_components/shared/Slate";
import { cn } from "@/app/_lib/utils";

/**
 * A project's cover: the captured screenshot when `project.cover` is set,
 * otherwise its slate. Covers live in /public/work at 1600x1000 (16:10).
 */
export function ProjectCover({ project, sizes = "(min-width: 1024px) 58vw, 100vw", priority, compact, className }) {
  if (!project.cover) {
    return <Slate project={project} compact={compact} className={className} />;
  }

  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-ink-raised", className)}>
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    </div>
  );
}
