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
  referencesStyle:
    z.enum(['No links']).describe('The reference style of the document.'),
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

const prompt = ai.definePrompt({
  name: 'generateDocumentFromPromptPrompt',
  input: {schema: GenerateDocumentFromPromptInputSchema},
  output: {schema: GenerateDocumentFromPromptOutputSchema},
  prompt: `You are an AI research assistant that generates documents from prompts.

  Generate a document in the following format: {{{format}}}.

  {{#if prdType}}
  This is a {{{prdType}}} PRD.
  {{#if (eq prdType "Tech")}}
  When generating a Tech PRD, ensure the document is very lengthy, well-structured, and includes a detailed "Tech Stack" section.
  The output should be clean text, without any markdown symbols like '#' or '*'. Use line breaks for structure.
  {{/if}}
  {{/if}}

  Prompt: {{{prompt}}}

  {{#if topicKeywords}}
  Topic Keywords: {{{topicKeywords}}}
  {{/if}}

  Desired Depth: {{{desiredDepth}}}

  {{#if targetAudience}}
  Target Audience: {{{targetAudience}}}
  {{/if}}

  {{#if targetLength}}
  Target Length: {{{targetLength}}}
  {{/if}}

  Tone and Style: {{{toneStyle}}}

  References Style: {{{referencesStyle}}}

  The document should be well-structured and easy to read.

  Include a short, one-sentence summary of what you have generated to the 'progress' field in the output.
  `,
});

const generateDocumentFromPromptFlow = ai.defineFlow(
  {
    name: 'generateDocumentFromPromptFlow',
    inputSchema: GenerateDocumentFromPromptInputSchema,
    outputSchema: GenerateDocumentFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
