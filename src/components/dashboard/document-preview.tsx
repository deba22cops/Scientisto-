
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
import type { GenerateDocumentFromPromptInput, GenerateDocumentFromPromptOutput } from "@/ai/flows/generate-document-from-prompt";
import { useToast } from "@/hooks/use-toast";
import { Document, Packer, Paragraph, TextRun, Header, AlignmentType } from "docx";
import jsPDF from "jspdf";

type DocumentPreviewProps = {
  result: GenerateDocumentFromPromptOutput | null;
  isLoading: boolean;
  onCancel: () => void;
  promptData: GenerateDocumentFromPromptInput | null;
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
        This may take a moment. Please don't close this window.
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

export function DocumentPreview({ result, isLoading, onCancel, promptData }: DocumentPreviewProps) {
  const { toast } = useToast();

  const getFileName = () => {
    return promptData?.prompt ? promptData.prompt.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_') : 'document';
  }

  const handleExport = async (format: 'DOCX' | 'PDF') => {
    if (!result || !result.document) return;

    const fileName = getFileName();

    toast({
      title: `Exporting as ${format}`,
      description: `Your document is being prepared for ${format} export.`,
    });

    if (format === 'DOCX') {
      const doc = new Document({
        sections: [{
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Scientisto",
                      color: "800080", // Purple color
                      font: "Times New Roman",
                      bold: true,
                    })
                  ],
                  alignment: AlignmentType.RIGHT,
                })
              ],
            }),
          },
          children: result.document.split('\n').map(p => {
            const isHeading = p.length < 100 && !p.endsWith('.') && p.trim().length > 0;
            return new Paragraph({
              children: [new TextRun({ 
                text: p, 
                font: "Times New Roman",
                bold: isHeading 
              })]
            })
          })
        }]
      });

      Packer.toBlob(doc).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    } else if (format === 'PDF') {
      const doc = new jsPDF();
      doc.setFont("Times-Roman");
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 15;
      let y = margin;
      
      doc.setTextColor(0, 0, 0); 
      doc.setFont("Times-Roman", "normal");
      doc.setFontSize(12);

      const lines = doc.splitTextToSize(result.document, doc.internal.pageSize.width - margin * 2);

      let pageCount = 1;
      
      const addHeader = (pageNum: number) => {
        doc.setPage(pageNum);
        doc.setFontSize(12);
        doc.setTextColor(128, 0, 128); // Purple color
        doc.setFont("Times-Roman", "bold");
        doc.text("Scientisto", pageWidth - margin, margin, { align: "right" });
        doc.setTextColor(0, 0, 0); 
        doc.setFont("Times-Roman", "normal");
        doc.setFontSize(12);
      };

      addHeader(1);
      y += 10;

      lines.forEach((line: string) => {
          const isHeading = line.length < 100 && !line.endsWith('.') && line.trim().length > 0;
          
          if (y + 10 > pageHeight - margin) {
              doc.addPage();
              pageCount++;
              y = margin + 10;
              addHeader(pageCount);
          }
          if(isHeading) {
            doc.setFont("Times-Roman", "bold");
          }
          doc.text(line, margin, y);
          doc.setFont("Times-Roman", "normal");
          y += 7; 
      });

      // Add footer ONLY to the last page
      doc.setPage(pageCount);
      doc.setFontSize(10);
      doc.setTextColor(128, 0, 128);
      doc.setFont("Times-Roman", "normal");
      doc.text(`Researched with Scientisto AI - Page ${pageCount} of ${pageCount}`, pageWidth / 2, pageHeight - margin + 10, { align: "center" });

      doc.save(`${fileName}.pdf`);
    }
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
            <div className="p-4 sm:p-6" id="document-content">
                <p className="text-xs text-muted-foreground mb-4">{result.progress}</p>
                {isLoading ? <LoadingSkeleton/> : <div className="prose prose-sm lg:prose-base max-w-none whitespace-pre-wrap text-foreground">{result.document}</div>}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-wrap justify-end gap-2">
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
