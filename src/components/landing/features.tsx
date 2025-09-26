import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, FileDown, LayoutDashboard, Feather, Palette, Clapperboard } from "lucide-react";

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
    description: "Keep track of your research, manage your documents, and save prompts for future use.",
  },
  {
    icon: <Feather className="h-8 w-8 text-primary" />,
    title: "Story Generator (Coming Soon)",
    description: "Unleash your creativity with a powerful tool for crafting compelling narratives, scripts, and more.",
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Comic Generator (Coming Soon)",
    description: "Bring your stories to life by generating comic panels and characters directly from your text prompts.",
  },
  {
    icon: <Clapperboard className="h-8 w-8 text-primary" />,
    title: "Manga & Anime Generator (Coming Soon)",
    description: "Create high-class manga and animated scenes. Turn your scripts into visually stunning animated stories.",
  }
];

export function Features() {
  return (
    <section id="features" className="container mx-auto py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
