import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ParticleBackground } from "@/components/landing/particle-background";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative container mx-auto py-16 sm:py-24 overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>

        <section className="container mx-auto pb-16 sm:pb-24">
            <div className="prose prose-invert max-w-4xl mx-auto text-muted-foreground">
                <p>This is a placeholder for your privacy policy. It's important to have a comprehensive privacy policy that details how you collect, use, and protect your users' data.</p>
                
                <h2>1. Information We Collect</h2>
                <p>Detail the types of information you collect, such as personal data (name, email), usage data (prompts, generated documents), and cookies.</p>

                <h2>2. How We Use Your Information</h2>
                <p>Explain the purposes for which you use the collected data, like providing the service, improving the AI, communication, and marketing.</p>

                <h2>3. Data Sharing and Disclosure</h2>
                <p>Describe if and how you share data with third parties (e.g., API providers like Google for the AI model, analytics services). Be transparent about your data sharing practices.</p>
                
                <h2>4. Data Security</h2>
                <p>Explain the measures you take to secure user data from unauthorized access or breaches.</p>

                <h2>5. User Rights</h2>
                <p>Inform users about their rights regarding their data, such as the right to access, correct, or delete their personal information.</p>

                <h2>6. Changes to This Policy</h2>
                <p>State that the policy may be updated and how you will notify users of any changes.</p>

                <h2>7. Contact Us</h2>
                <p>Provide a way for users to contact you with any privacy-related questions.</p>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
