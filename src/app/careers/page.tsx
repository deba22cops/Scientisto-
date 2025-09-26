import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ParticleBackground } from "@/components/landing/particle-background";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const openPositions = [
  {
    title: "Senior AI/ML Engineer",
    location: "Remote",
    department: "Engineering",
    description: "Lead the development of our core AI models and research generation engine. Requires deep expertise in LLMs and NLP.",
  },
  {
    title: "Frontend Engineer (Next.js)",
    location: "Remote",
    department: "Engineering",
    description: "Build and maintain our user-facing application, focusing on performance, user experience, and beautiful design.",
  },
  {
    title: "Product Marketing Manager",
    location: "Remote",
    department: "Marketing",
    description: "Shape the story of Scientisto. Drive our go-to-market strategy, user acquisition, and product messaging.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative container mx-auto text-center py-16 sm:py-24 overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              Join Our Mission
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We're looking for passionate individuals to help us build the future of research.
            </p>
          </div>
        </section>

        <section className="container mx-auto pb-16 sm:pb-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline text-center">Open Positions</h2>
            {openPositions.map((position) => (
              <Card key={position.title} className="bg-card/50">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{position.title}</CardTitle>
                  <CardDescription>{position.location} &middot; {position.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{position.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href="/contact">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
             <div className="text-center text-muted-foreground">
                <p>Don't see a role that fits? We're always looking for talent. <Link href="/contact" className="text-primary hover:underline">Get in touch!</Link></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
