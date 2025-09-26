import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ParticleBackground } from "@/components/landing/particle-background";
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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

        <section className="container mx-auto pb-16 sm:pb-24 space-y-12">
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
                        <p className="mb-4">He founded DB Groups with a passion for technology and innovation. Under DB Groups, he established the SynapseDev Network, a powerhouse for providing cutting-edge tech solutions to complex problems.</p>
                        <p>Scientisto is the flagship creation of the SynapseDev Network, embodying our commitment to building tools that empower creators, researchers, and thinkers around the world.</p>
                    </div>
                </div>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-center">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-4xl mx-auto text-muted-foreground text-lg">
                  <p>
                      Founded in August 2025, Scientisto was born from a simple yet powerful idea: what if anyone could conduct deep, comprehensive research in minutes, not months? Our founder, Debabrata Behera, saw brilliant minds—students, entrepreneurs, and professionals—bogged down by the tedious process of information gathering and document formatting.
                  </p>
                  <p>
                      The true bottleneck to innovation wasn't a lack of ideas, but a lack of time.
                  </p>
                  <p>
                      From our early days as a project within SynapseDev Networks, we were driven to solve this problem. We envisioned an AI companion that could understand a user's intent from a simple prompt, scour the world's knowledge, and deliver a structured, high-quality document in a fraction of the time. The goal was never to replace human intellect, but to augment it—to free up creators and thinkers to do what they do best: innovate, analyze, and create.
                  </p>
                  <p>
                      Today, Scientisto is more than just a tool; it's a partner in creation. We are tirelessly working to expand its capabilities, from generating technical PRDs to crafting creative stories and comics. Our mission is to democratize the power of research and creation for everyone.
                  </p>
              </CardContent>
            </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
