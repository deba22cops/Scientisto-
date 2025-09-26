"use server";

import {
  generateDocumentFromPrompt,
  type GenerateDocumentFromPromptInput,
  type GenerateDocumentFromPromptOutput,
} from "@/ai/flows/generate-document-from-prompt";

export async function handleGeneration(
  input: GenerateDocumentFromPromptInput
): Promise<{ success: boolean; data?: GenerateDocumentFromPromptOutput, error?: string }> {
  try {
    // Add a slight delay to allow progress indicators to show
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = await generateDocumentFromPrompt(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to generate document: ${errorMessage}` };
  }
}
