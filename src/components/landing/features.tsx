import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, FileDown, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Fast Research",
    description: "Leverage AI to conduct deep research in minutes, not weeks. Get comprehensive results from a simple prompt.",
  },
  {
    icon: <FileDown className="h-8 w-8 text-primary" />,
    title: "Export to DOCX/PDF",
    description: "Easily download your generated documents in standard formats, ready for sharing and editing.",
  },
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: "Personal Dashboard",
    description: "Keep track of your research history, manage your documents, and save prompts for future use.",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
                {feature.icon}
              </div>
              <CardTitle className="font-headline">{feature.title}</CardTitle>
              <CardDescription className="mt-2">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
