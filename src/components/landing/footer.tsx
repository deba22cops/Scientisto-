import Link from "next/link";
import { ScientoLogo } from "@/components/icons";

const footerLinks = {
  "Product": [
    { href: "/#features", label: "Features" },
    { href: "/signup", label: "Get Started" },
    { href: "/faq", label: "FAQ" },
  ],
  "Company": [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  "Legal": [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ScientoLogo />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your friendly AI research assistant for instant, high-quality documents.
            </p>
          </div>
          <div className="col-span-1 md:col-start-2 md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h3 className="font-semibold text-foreground mb-4">{title}</h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SynapseDev Networks - DB groups. All rights reserved. &trade;
          </p>
        </div>
      </div>
    </footer>
  );
}
