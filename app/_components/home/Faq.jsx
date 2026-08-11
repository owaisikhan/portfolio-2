import { Reveal } from "@/app/_components/motion/Reveal";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 border-t border-border py-20 md:py-28"
    >
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          index="06"
          label="FAQ"
          title="Questions clients ask first."
        />

        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {siteConfig.faq.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="max-w-2xl leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
