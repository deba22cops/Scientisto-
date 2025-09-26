import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SampleOutputsModal } from "@/components/landing/sample-outputs-modal";

export function Hero() {
  const dashboardImage = PlaceHolderImages.find(
    (img) => img.id === "dashboard-mockup"
  );

  return (
    <section className="container mx-auto text-center py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
        Sciento — Deep research, instant deliverables.
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        Type a simple prompt. Get a full PRD, research paper, or essay —
        downloadable as DOCX or PDF.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/signup">Try Sciento (Sign up free)</Link>
        </Button>
        <SampleOutputsModal />
      </div>
      <div className="mt-16 px-4">
        <div className="relative mx-auto max-w-5xl rounded-xl shadow-2xl">
          {dashboardImage && (
            <Image
              src={dashboardImage.imageUrl}
              alt={dashboardImage.description}
              width={1200}
              height={800}
              className="rounded-xl"
              data-ai-hint={dashboardImage.imageHint}
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
