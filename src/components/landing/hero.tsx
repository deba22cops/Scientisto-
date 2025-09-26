import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SampleOutputsModal } from "@/components/landing/sample-outputs-modal";
import { ParticleBackground } from "@/components/landing/particle-background";
import { HeroAnimation } from "@/components/landing/hero-animation";

export function Hero() {
  return (
    <section className="relative container mx-auto text-center py-16 sm:py-24 overflow-hidden">
      <ParticleBackground />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative z-10 animate-fade-in-up text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
            Scientisto — YOUR FREINDLY RESEARCHER
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Type a simple prompt. Get a full PRD, research paper, or essay —
            downloadable as DOCX or PDF.
          </p>
          <div className="mt-8 flex justify-start gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Try Scientisto (Sign up free)</Link>
            </Button>
            <SampleOutputsModal />
          </div>
        </div>
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            <HeroAnimation />
        </div>
      </div>
    </section>
  );
}
