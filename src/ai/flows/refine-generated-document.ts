'use server';

/**
 * @fileOverview A document refinement AI agent.
 *
 * - refineGeneratedDocument - A function that refines a generated document based on user edits.
 * - RefineGeneratedDocumentInput - The input type for the refineGeneratedDocument function.
 * - RefineGeneratedDocumentOutput - The return type for the refineGeneratedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineGeneratedDocumentInputSchema = z.object({
  originalDocument: z
    .string()
    .describe('The original AI-generated document content.'),
  userEdits: z.string().describe('The edits made by the user to the document.'),
});
export type RefineGeneratedDocumentInput = z.infer<
  typeof RefineGeneratedDocumentInputSchema
>;

const RefineGeneratedDocumentOutputSchema = z.object({
  refinedDocument: z
    .string()
    .describe('The refined document content after applying user edits.'),
});
export type RefineGeneratedDocumentOutput = z.infer<
  typeof RefineGeneratedDocumentOutputSchema
>;

export async function refineGeneratedDocument(
  input: RefineGeneratedDocumentInput
): Promise<RefineGeneratedDocumentOutput> {
  return refineGeneratedDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineGeneratedDocumentPrompt',
  input: {schema: RefineGeneratedDocumentInputSchema},
  output: {schema: RefineGeneratedDocumentOutputSchema},
  prompt: `You are an AI document refinement expert. You will take the original document and the user edits and create a refined document that incorporates the user's changes.

Original Document: {{{originalDocument}}}

User Edits: {{{userEdits}}}

Refined Document:`,
});

const refineGeneratedDocumentFlow = ai.defineFlow(
  {
    name: 'refineGeneratedDocumentFlow',
    inputSchema: RefineGeneratedDocumentInputSchema,
    outputSchema: RefineGeneratedDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      refinedDocument: output!.refinedDocument,
    };
  }
);
