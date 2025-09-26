"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileDown, Bot, FileType, FileX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenerateDocumentFromPromptOutput } from "@/ai/flows/generate-document-from-prompt";
import { useToast } from "@/hooks/use-toast";

type DocumentPreviewProps = {
  result: GenerateDocumentFromPromptOutput | null;
  isLoading: boolean;
  onCancel: () => void;
};

const progressMessages = [
  "Discovering sources...",
  "Reading & extracting insights...",
  "Synthesizing findings...",
  "Formatting your document...",
  "Finalizing...",
];

function GenerationProgress({ onCancel }: { onCancel: () => void }) {
  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressIndex((prevIndex) => (prevIndex + 1) % progressMessages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="relative mb-6">
        <Bot className="h-16 w-16 text-primary" />
        <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping delay-500"></div>
      </div>
      <p className="text-lg font-semibold text-foreground">
        {progressMessages[progressIndex]}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        This may take a moment. Please don&apos;t close this window.
      </p>
      <Button variant="outline" className="mt-6" onClick={onCancel}>
        <FileX className="mr-2 h-4 w-4" />
        Cancel Generation
      </Button>
    </div>
  );
}


function InitialState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <FileType className="h-16 w-16 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-semibold text-muted-foreground">Your document will appear here</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Fill out the form to start generating a new document.
      </p>
    </div>
  );
}

function LoadingSkeleton() {
    return (
        <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="pt-4 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
            </div>
        </div>
    )
}

export function DocumentPreview({ result, isLoading, onCancel }: DocumentPreviewProps) {
  const { toast } = useToast();
  const formattedDocument = result?.document.replace(/\n/g, '<br />');

  const handleExport = (format: 'DOCX' | 'PDF') => {
    if (!result) return;
    // This is a simulated export.
    console.log(`Exporting document as ${format}...`);
    console.log(result.document);
    toast({
      title: `Exporting as ${format}`,
      description: `Your document is being prepared for ${format} export.`,
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Generated Document</CardTitle>
        <CardDescription>
          Preview your AI-generated document below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ScrollArea className="h-full rounded-md border p-1">
          {isLoading && !result && <GenerationProgress onCancel={onCancel} />}
          {!isLoading && !result && <InitialState />}
          {result && (
            <div className="p-4 sm:p-6">
                <p className="text-xs text-muted-foreground mb-4">{result.progress}</p>
                {isLoading ? <LoadingSkeleton/> : <div className="prose prose-sm max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: result.document || '' }} />}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" disabled={!result || isLoading} onClick={() => handleExport('DOCX')}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as DOCX
        </Button>
        <Button disabled={!result || isLoading} onClick={() => handleExport('PDF')}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
      </CardFooter>
    </Card>
  );
}
