import { Reveal } from "@/app/_components/motion/Reveal";
import { cn } from "@/app/_lib/utils";

/**
 * The label / title / lede block that opens every section. Keeping it in one
 * component is what makes the section rhythm identical down the page.
 */
export function SectionHeading({
  index,
  label,
  title,
  lede,
  align = "left",
  className,
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {index ? (
          <span className="font-mono text-xs text-accent-lime">{index}</span>
        ) : null}
        <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="h-px w-10 bg-gradient-to-r from-border to-transparent"
        />
      </div>

      <h2 className="text-headline fade-text font-semibold">{title}</h2>

      {lede ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
