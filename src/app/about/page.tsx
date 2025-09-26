import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ParticleBackground } from "@/components/landing/particle-background";
import Image from 'next/image';
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative container mx-auto text-center py-16 sm:py-24 overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              About Scientisto
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              We are on a mission to revolutionize the research process, making it faster, smarter, and more accessible for everyone.
            </p>
          </div>
        </section>

        <section className="container mx-auto pb-16 sm:pb-24">
            <Card className="p-8 md:p-12 bg-card/50">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-1">
                        <Image 
                            src="https://picsum.photos/seed/deb/600/600" 
                            alt="Debabrata Behera"
                            width={600}
                            height={600}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="portrait man"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold font-headline mb-4">Meet Our Founder</h2>
                        <h3 className="text-2xl font-semibold text-primary mb-2">Debabrata Behera</h3>
                        <p className="text-lg text-muted-foreground mb-4">A young entrepreneur at the age of 21, Debabrata is the visionary behind Scientisto.</p>
                        <p className="mb-4">He founded DB Groups with a passion for technology and innovation. Under DB Groups, he established the Synapse Dev Network, a powerhouse for providing cutting-edge tech solutions to complex problems.</p>
                        <p>Scientisto is a proud creation of the Synapse Dev Network, born from the idea that knowledge creation should be accelerated by the power of AI. It embodies our commitment to building tools that empower creators, researchers, and thinkers around the world.</p>
                    </div>
                </div>
            </Card>
        </section>

      </main>
      <Footer />
    </div>
  );
}
