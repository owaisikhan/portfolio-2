import { About } from "@/app/_components/home/About";
import { Contact } from "@/app/_components/home/Contact";
import { Faq } from "@/app/_components/home/Faq";
import { Hero } from "@/app/_components/home/Hero";
import { Process } from "@/app/_components/home/Process";
import { Services } from "@/app/_components/home/Services";
import { Stack } from "@/app/_components/home/Stack";
import { Stats } from "@/app/_components/home/Stats";
import { Work } from "@/app/_components/home/Work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Work />
      <About />
      <Services />
      <Process />
      <Stack />
      <Faq />
      <Contact />
    </>
  );
}
