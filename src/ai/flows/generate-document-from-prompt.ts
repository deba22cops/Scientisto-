'use server';

/**
 * @fileOverview A document generation AI agent that generates a PRD, research paper, or essay from a prompt.
 *
 * - generateDocumentFromPrompt - A function that handles the document generation process.
 * - GenerateDocumentFromPromptInput - The input type for the generateDocumentFromPrompt function.
 * - GenerateDocumentFromPromptOutput - The return type for the generateDocumentFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDocumentFromPromptInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate the document from.'),
  format: z
    .enum(['PRD', 'Research paper', 'Essay'])
    .describe('The format of the document to generate.'),
  prdType: z
    .enum(['Tech', 'Non-Tech'])
    .optional()
    .describe('The type of PRD to generate, if the format is PRD.'),
  topicKeywords: z.string().optional().describe('Optional topic keywords.'),
  desiredDepth: z
    .enum(['Quick', 'Standard', 'Deep'])
    .describe('The desired depth of the research.'),
  targetAudience: z.string().optional().describe('Optional target audience.'),
  targetLength: z.string().optional().describe('Optional target length.'),
  toneStyle: z
    .enum(['Formal', 'Conversational', 'Academic'])
    .describe('The tone and style of the document.'),
  referencesStyle: z
    .enum(['No links'])
    .describe('The reference style of the document.'),
});

export type GenerateDocumentFromPromptInput = z.infer<
  typeof GenerateDocumentFromPromptInputSchema
>;

const GenerateDocumentFromPromptOutputSchema = z.object({
  document: z.string().describe('The generated document.'),
  progress: z.string().describe('Progress summary of the document generation.'),
});

export type GenerateDocumentFromPromptOutput = z.infer<
  typeof GenerateDocumentFromPromptOutputSchema
>;

export async function generateDocumentFromPrompt(
  input: GenerateDocumentFromPromptInput
): Promise<GenerateDocumentFromPromptOutput> {
  return generateDocumentFromPromptFlow(input);
}

const generateDocumentFromPromptFlow = ai.defineFlow(
  {
    name: 'generateDocumentFromPromptFlow',
    inputSchema: GenerateDocumentFromPromptInputSchema,
    outputSchema: GenerateDocumentFromPromptOutputSchema,
  },
  async input => {
    let promptText = `You are an AI research assistant that generates documents from prompts.

    The output should be clean text, without any markdown symbols like '#' or '*'. Use line breaks for structure.

    Generate a document in the following format: ${input.format}.`;

    if (input.prdType) {
      promptText += `\nThis is a ${input.prdType} PRD.`;
      if (input.prdType === 'Tech') {
        promptText += `\nWhen generating a Tech PRD, ensure the document is very lengthy, well-structured, and includes a detailed "Tech Stack" section.`;
      }
    }

    promptText += `\n\nPrompt: ${input.prompt}`;

    if (input.topicKeywords) {
      promptText += `\nTopic Keywords: ${input.topicKeywords}`;
    }

    promptText += `\nDesired Depth: ${input.desiredDepth}`;

    if (input.targetAudience) {
      promptText += `\nTarget Audience: ${input.targetAudience}`;
    }

    if (input.targetLength) {
      promptText += `\nTarget Length: ${input.targetLength}`;
    }

    promptText += `\nTone and Style: ${input.toneStyle}`;
    promptText += `\nReferences Style: ${input.referencesStyle}`;
    promptText += `\n\nThe document should be well-structured and easy to read.`;
    promptText += `\n\nInclude a short, one-sentence summary of what you have generated to the 'progress' field in the output.`;


    const {output} = await ai.generate({
      prompt: promptText,
      output: { schema: GenerateDocumentFromPromptOutputSchema },
    });
    return output!;
  }
);
