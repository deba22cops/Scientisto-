"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const prdSample = `
<h2 class="text-xl font-bold font-headline mt-4 mb-2">1. Introduction</h2>
<p class="mb-4">This Product Requirements Document (PRD) outlines the requirements for 'Genexto', an AI research assistant designed to automate the process of generating structured documents from user prompts.</p>
<h3 class="text-lg font-semibold font-headline mt-3 mb-1">1.1 Problem Statement</h3>
<p class="mb-4">Researchers, students, and professionals spend countless hours gathering information, synthesizing it, and formatting it into deliverables like research papers, PRDs, and essays. This process is time-consuming, tedious, and a barrier to productivity.</p>
<h2 class="text-xl font-bold font-headline mt-4 mb-2">2. Goals and Objectives</h2>
<ul class="list-disc pl-6 mb-4">
  <li>To reduce research and composition time by 90%.</li>
  <li>To provide high-quality, structured documents based on minimal user input.</li>
  <li>To create an intuitive and seamless user experience from prompt to export.</li>
</ul>
<h2 class="text-xl font-bold font-headline mt-4 mb-2">3. User Personas</h2>
<p><strong>Alex, the PhD Student:</strong> Needs to quickly draft literature reviews and research papers. Cares about accuracy and proper structure.</p>
`;

const researchPaperSample = `
<h2 class="text-xl font-bold font-headline mt-4 mb-2">Abstract</h2>
<p class="mb-4">This paper explores the application of large language models (LLMs) in automating academic and professional research synthesis. We introduce Genexto, a novel system that leverages the Gemini API to perform deep research and generate structured documents such as research papers and essays from simple user prompts. Our findings indicate a significant reduction in manual effort and time required for document creation.</p>
<h2 class="text-xl font-bold font-headline mt-4 mb-2">1. Introduction</h2>
<p class="mb-4">The proliferation of digital information has made manual research an increasingly challenging task. The ability to quickly synthesize vast amounts of data is critical. Large language models present a promising solution to this challenge. This paper details the architecture and performance of Genexto, an AI-powered research assistant.</p>
<h2 class="text-xl font-bold font-headline mt-4 mb-2">2. Methodology</h2>
<p class="mb-4">Genexto employs a multi-stage pipeline: (1) prompt analysis and query generation, (2) deep source discovery using search APIs, (3) AI-driven information extraction and synthesis, and (4) structured document composition according to user-specified formats (e.g., PRD, Essay).</p>
`;

export function SampleOutputsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">See sample outputs</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Sample Outputs</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="prd" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prd">PRD Example</TabsTrigger>
            <TabsTrigger value="research">Research Paper Example</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-96 mt-4 p-1">
            <TabsContent value="prd">
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: prdSample }} />
            </TabsContent>
            <TabsContent value="research">
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: researchPaperSample }} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
