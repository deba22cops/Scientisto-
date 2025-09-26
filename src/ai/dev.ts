import { config } from 'dotenv';
config();

import '@/ai/flows/generate-document-from-prompt.ts';
import '@/ai/flows/refine-generated-document.ts';