
'use server';

import {
  generateDocumentFromPrompt,
  type GenerateDocumentFromPromptInput,
  type GenerateDocumentFromPromptOutput,
} from '@/ai/flows/generate-document-from-prompt';
import { getAdminApp } from '@/firebase/server';
import { getFirestore } from 'firebase-admin/firestore';

export async function handleGeneration(
  input: GenerateDocumentFromPromptInput & { userId: string }
): Promise<{ success: boolean; data?: GenerateDocumentFromPromptOutput; error?: string }> {
  const { userId, ...promptInput } = input;
  if (!userId) {
    return { success: false, error: 'User is not authenticated.' };
  }

  try {
    // Add a slight delay to allow progress indicators to show
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = await generateDocumentFromPrompt(promptInput);

    // Save prompt to history on successful generation
    try {
      const adminApp = getAdminApp();
      const firestore = getFirestore(adminApp);
      const promptRef = firestore.collection('users').doc(userId).collection('prompts').doc();
      await promptRef.set({
        ...promptInput,
        createdAt: new Date().toISOString(),
        id: promptRef.id,
      });
    } catch (dbError) {
      console.error('Failed to save prompt to history:', dbError);
      // We don't fail the whole operation if history saving fails, but we could add more robust logging.
    }

    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate document: ${errorMessage}` };
  }
}
