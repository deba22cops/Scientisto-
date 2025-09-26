import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ParticleBackground } from "@/components/landing/particle-background";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Explorer",
    price: "Free",
    description: "For individuals just starting their research journey.",
    features: [
      "5 document generations per month",
      "Standard document formats (Essay, Research Paper)",
      "Access to standard models",
      "Community support",
    ],
    cta: "Get Started Free",
    href: "/signup",
  },
  {
    name: "Researcher",
    price: "$19",
    priceSuffix: "/ month",
    description: "For dedicated students and professionals.",
    features: [
      "50 document generations per month",
      "All document formats including PRDs",
      "Access to advanced AI models",
      "Priority email support",
      "Save research history",
    ],
    cta: "Choose Researcher",
    href: "/signup",
    popular: true,
  },
  {
    name: "Innovator",
    price: "Contact Us",
    description: "For teams and institutions pushing the boundaries.",
    features: [
      "Unlimited document generations",
      "Custom document templates",
      "Team collaboration features",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative container mx-auto text-center py-16 sm:py-24 overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              Pricing Plans
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Choose the perfect plan to accelerate your research and writing.
            </p>
          </div>
        </section>

        <section className="container mx-auto pb-16 sm:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card key={tier.name} className={`flex flex-col bg-card/50 ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.priceSuffix && <span className="text-muted-foreground">{tier.priceSuffix}</span>}
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
