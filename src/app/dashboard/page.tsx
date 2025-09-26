
"use client";

import { useState } from "react";
import { PromptForm } from "@/components/dashboard/prompt-form";
import { DocumentPreview } from "@/components/dashboard/document-preview";
import type { GenerateDocumentFromPromptInput, GenerateDocumentFromPromptOutput } from "@/ai/flows/generate-document-from-prompt";
import { handleGeneration } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";

export default function DashboardPage() {
  const { user } = useUser();
  const [generationResult, setGenerationResult] = useState<GenerateDocumentFromPromptOutput | null>(null);
  const [currentPromptData, setCurrentPromptData] = useState<GenerateDocumentFromPromptInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onGenerate = async (data: GenerateDocumentFromPromptInput) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to generate a document.",
      });
      return;
    }
    
    setIsLoading(true);
    setGenerationResult(null);
    setCurrentPromptData(data);
    
    const result = await handleGeneration({ ...data, userId: user.uid });

    if (result.success && result.data) {
      setGenerationResult(result.data);
      toast({
        title: "Generation Complete",
        description: "Your document has been successfully generated.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error || "An unexpected error occurred.",
      });
    }

    setIsLoading(false);
  };

  const onCancel = () => {
    // This is a client-side cancellation. A more robust solution would involve AbortController.
    setIsLoading(false);
    setGenerationResult(null);
    setCurrentPromptData(null);
    toast({
      title: "Generation Cancelled",
      description: "The document generation process has been stopped.",
    });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <PromptForm onGenerate={onGenerate} isLoading={isLoading} />
      </div>
      <div>
        <DocumentPreview 
          result={generationResult} 
          isLoading={isLoading} 
          onCancel={onCancel} 
          promptData={currentPromptData}
        />
      </div>
    </div>
  );
}
