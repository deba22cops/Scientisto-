
'use server';

import {
  generateDocumentFromPrompt,
  type GenerateDocumentFromPromptInput,
  type GenerateDocumentFromPromptOutput,
} from '@/ai/flows/generate-document-from-prompt';
import { initializeFirebase } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

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
      // Use the client SDK for Firestore operations in Server Actions
      const { firestore } = initializeFirebase(); 
      const userPromptsCol = collection(firestore, 'users', userId, 'prompts');
      const promptRef = doc(userPromptsCol);

      // Use non-blocking setDoc
      setDoc(promptRef, {
        ...promptInput,
        createdAt: new Date().toISOString(),
        id: promptRef.id,
      });

      const userDocsCol = collection(firestore, 'users', userId, 'generatedDocuments');
      const docRef = doc(userDocsCol);
      
      // Use non-blocking setDoc
      setDoc(docRef, {
        id: docRef.id,
        promptId: promptRef.id,
        userId: userId,
        documentName: promptInput.prompt.substring(0, 50), // Use start of prompt as name
        documentContent: result.document,
        format: promptInput.format,
        timestamp: new Date().toISOString(),
      });
      
      return { success: true, data: { ...result, documentId: docRef.id } };

    } catch (dbError: any) {
      console.error('Failed to save document to history:', dbError);
      // We don't fail the whole operation if history saving fails, but we could add more robust logging.
      const errorMessage = dbError.message || 'Could not save to history.';
      // Still return success, but log the specific DB error.
      return { success: true, data: { ...result, documentId: '' } }; 
    }

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate document: ${errorMessage}` };
  }
}
