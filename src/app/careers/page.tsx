import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ParticleBackground } from "@/components/landing/particle-background";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="relative container mx-auto text-center py-16 sm:py-24 overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              Join Our Mission
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We're a small, passionate team dedicated to building the future of research.
            </p>
          </div>
        </section>

        <section className="container mx-auto pb-16 sm:pb-24">
            <Card className="max-w-2xl mx-auto bg-card/50">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">We're Growing!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-muted-foreground text-lg">
                        There are no open positions at this moment, but we are always looking for talented and passionate individuals to join our journey.
                    </p>
                    <p className="text-muted-foreground">
                        If you believe you have what it takes to help us revolutionize research and content creation, we would love to hear from you.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact">Get In Touch <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
