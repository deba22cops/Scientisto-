
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
): Promise<{ success: boolean; data?: GenerateDocumentFromPromptOutput & { documentId: string }; error?: string }> {
  const { userId, ...promptInput } = input;
  if (!userId) {
    return { success: false, error: 'User is not authenticated.' };
  }

  try {
    // Add a slight delay to allow progress indicators to show
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = await generateDocumentFromPrompt(promptInput);

    // Save prompt and generated document to history on successful generation
    try {
      const adminApp = getAdminApp();
      const firestore = getFirestore(adminApp);
      const userRef = firestore.collection('users').doc(userId);
      
      const promptRef = userRef.collection('prompts').doc();
      await promptRef.set({
        ...promptInput,
        createdAt: new Date().toISOString(),
        id: promptRef.id,
      });

      const docRef = userRef.collection('generatedDocuments').doc();
      await docRef.set({
        id: docRef.id,
        promptId: promptRef.id,
        userId: userId,
        documentName: promptInput.prompt.substring(0, 50), // Use start of prompt as name
        documentContent: result.document,
        format: promptInput.format,
        timestamp: new Date().toISOString(),
      });
      
      return { success: true, data: { ...result, documentId: docRef.id } };

    } catch (dbError) {
      console.error('Failed to save document to history:', dbError);
      // We don't fail the whole operation if history saving fails, but we could add more robust logging.
       return { success: true, data: { ...result, documentId: '' } }; // Proceed without a doc id
    }

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate document: ${errorMessage}` };
  }
}
