
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
<p class="mb-4">This Product Requirements Document (PRD) outlines the requirements for 'Scientisto', an AI research assistant designed to automate the process of generating structured documents from user prompts.</p>
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
<h2 class="text-xl font-bold font-headline mt-4 mb-2">An Overview of Quantum Physics: Foundations and Implications</h2>
<h3 class="text-lg font-semibold font-headline mt-3 mb-1">Abstract</h3>
<p class="mb-4">Quantum physics represents a fundamental paradigm shift from classical mechanics, offering a description of nature at the smallest scales of energy and matter. This paper provides an overview of its core principles, including wave-particle duality, superposition, entanglement, and the uncertainty principle. It further explores the profound implications of these concepts and their burgeoning applications in various fields of modern technology.</p>
<h3 class="text-lg font-semibold font-headline mt-3 mb-1">Introduction</h3>
<p class="mb-4">Quantum physics, often referred to as quantum mechanics, is the theoretical framework that describes the physical properties of nature at the scale of atoms and subatomic particles. Developed in the early 20th century by pioneering scientists such as Max Planck, Albert Einstein, Niels Bohr, Werner Heisenberg, and Erwin Schrödinger, it emerged from the limitations of classical physics in explaining phenomena like black-body radiation, the photoelectric effect, and atomic stability. Unlike classical physics, which operates on deterministic principles, quantum mechanics introduces probabilistic outcomes and inherent uncertainties, challenging intuitive understanding of reality.</p>
<h3 class="text-lg font-semibold font-headline mt-3 mb-1">Key Concepts of Quantum Physics</h3>
<p class="mb-4"><strong>Wave-Particle Duality</strong><br/>One of the most counterintuitive aspects of quantum mechanics is wave-particle duality, which postulates that particles can exhibit properties of both waves and particles, and waves can exhibit properties of both particles and waves. This concept was famously demonstrated by the photoelectric effect (light behaving as particles, photons) and the double-slit experiment (electrons behaving as waves).</p>
<p class="mb-4"><strong>Superposition</strong><br/>Superposition is a principle that states a quantum system can exist in multiple distinct states simultaneously. For example, a quantum bit (qubit) can be both 0 and 1 at the same time, unlike a classical bit which must be either 0 or 1. It is only upon measurement that the system collapses into a single, definite state, with the probability of each outcome determined by the system's quantum state prior to measurement.</p>
<p class="mb-4"><strong>Entanglement</strong><br/>Quantum entanglement describes a phenomenon where two or more particles become linked in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by vast distances. A measurement on one entangled particle instantaneously influences the state of the other, a concept Albert Einstein famously dubbed “spooky action at a distance.” This interconnectedness is a cornerstone for emerging quantum technologies.</p>
<p class="mb-4"><strong>The Uncertainty Principle</strong><br/>Formulated by Werner Heisenberg, the uncertainty principle states that there are inherent limits to the precision with which certain pairs of physical properties, such as a particle's position and momentum, can be known simultaneously. The more precisely one property is measured, the less precisely the other can be known. This is not a limitation of measurement tools, but rather a fundamental property of the quantum world.</p>
<h3 class="text-lg font-semibold font-headline mt-3 mb-1">Implications and Applications</h3>
<p class="mb-4">The principles of quantum physics have not only revolutionized our understanding of the universe but have also paved the way for transformative technologies. Quantum computing harnesses superposition and entanglement to perform calculations that are intractable for classical computers, promising advancements in fields like materials science, drug discovery, and artificial intelligence. Quantum cryptography offers inherently secure communication channels by leveraging the properties of quantum states to detect eavesdropping attempts. Furthermore, quantum sensing and imaging are leading to highly sensitive measurements in medical diagnostics, navigation, and fundamental scientific research. The underlying principles of quantum mechanics are also crucial to the functioning of modern technologies such as lasers, transistors in microelectronics, and Magnetic Resonance Imaging (MRI).</p>
<h3 class="text-lg font-semibold font-headline mt-3 mb-1">Conclusion</h3>
<p class="mb-4">Quantum physics stands as one of the most successful and profound theories in science, accurately describing the behavior of matter and energy at the most fundamental level. Its departure from classical intuition has opened new frontiers of knowledge and technology, from the conceptual understanding of reality to the development of revolutionary applications. As research continues, quantum physics promises to unravel more mysteries of the universe and further reshape our technological landscape.</p>
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
