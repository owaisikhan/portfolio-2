import { Check } from "lucide-react";

import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { TiltCard } from "@/app/_components/motion/TiltCard";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Services() {
  return (
    <section id="services" className="shell scroll-mt-28 py-20 md:py-28">
      <SectionHeading
        index="03"
        label="Services"
        title="What I can build for you."
        lede="Four things I do repeatedly and well, rather than a list of everything I have ever touched."
      />

      <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2">
        {siteConfig.services.map((service, index) => (
          <TiltCard key={service.title} max={4}>
            <Card className="h-full gap-5 transition-colors duration-300 hover:border-white/20">
              <CardHeader className="gap-4">
                <span className="font-mono text-xs text-accent-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CardTitle className="text-xl md:text-2xl">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {service.body}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="size-3.5 text-accent-lime" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TiltCard>
        ))}
      </StaggerGroup>
    </section>
  );
}
