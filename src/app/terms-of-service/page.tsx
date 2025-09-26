import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ParticleBackground } from "@/components/landing/particle-background";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative container mx-auto py-16 sm:py-24 overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>

        <section className="container mx-auto pb-16 sm:pb-24">
            <div className="prose prose-invert max-w-4xl mx-auto text-muted-foreground">
                <p>This is a placeholder for your terms of service. You should consult with a legal professional to draft terms that are appropriate for your specific service.</p>
                
                <h2>1. Acceptance of Terms</h2>
                <p>By using Scientisto ("Service"), you agree to be bound by these Terms of Service ("Terms").</p>

                <h2>2. Description of Service</h2>
                <p>Scientisto is an AI-powered research assistant that generates documents based on user prompts. The service is provided "as is" without any warranties.</p>

                <h2>3. User Conduct and Responsibilities</h2>
                <p>You are responsible for the prompts you provide and the use of the documents generated. You agree not to use the service for any illegal or prohibited activities. You acknowledge that the output is AI-generated and may contain inaccuracies; you are responsible for verifying the information.</p>
                
                <h2>4. Intellectual Property</h2>
                <p>You retain ownership of the input prompts you provide. You are granted a license to use the generated documents for your own purposes, subject to these terms. We retain all rights to the Service itself.</p>

                <h2>5. Termination</h2>
                <p>We may terminate or suspend your access to the Service at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                <h2>6. Limitation of Liability</h2>
                <p>In no event shall Scientisto or its suppliers be liable for any damages arising out of the use or inability to use the service.</p>

                <h2>7. Governing Law</h2>
                <p>These Terms shall be governed by the laws of your jurisdiction, without regard to its conflict of law provisions.</p>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
