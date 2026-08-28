import { Hero } from "@/components/home/Hero";
import { ThematicAreas } from "@/components/home/ThematicAreas";
import { FeaturedProgram } from "@/components/home/FeaturedProgram";
import { LatestStories } from "@/components/home/LatestStories";
import { ImpactSection } from "@/components/home/ImpactSection";
import { Partners } from "@/components/home/Partners";
import { CTASection } from "@/components/home/CTASection";
import { Newsletter } from "@/components/home/Newsletter";
import { FloatingAssistant } from "@/components/ui/FloatingAssistant";

export default function Home() {
  return (
    <>
      <Hero />
      <ThematicAreas />
      <FeaturedProgram />
      <LatestStories />
      <ImpactSection />
      <Partners />
      <CTASection />
      <Newsletter />
      <FloatingAssistant />
    </>
  );
}