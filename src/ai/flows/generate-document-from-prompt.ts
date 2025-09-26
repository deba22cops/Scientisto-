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

const prdPromptTemplate = `You are an expert product manager. Generate a comprehensive, industry-standard Product Requirements Document (PRD) based on the user's prompt. The output must be clean text, using line breaks for structure instead of markdown.

Your response MUST follow this exact 16-point format and include all headings:

1.  **Document Control**
    -   Version: 1.0
    -   Date: (Today's Date)
    -   Author: AI Product Manager
    -   Approvers: [Stakeholder Name/Title]

2.  **Introduction**
    -   Product Name: [Infer from prompt or create a suitable name]
    -   Brief Description: [A one-sentence summary of the product]
    -   Background / Context: [Explain why this product is being considered now]
    -   Vision & Mission: [State the long-term vision and immediate mission]

3.  **Objectives & Goals**
    -   Business Goals: [e.g., Increase market share, generate new revenue stream]
    -   User Goals: [What users will achieve with this product]
    -   Success Metrics / KPIs: [Quantifiable metrics, e.g., 20% increase in user engagement]

4.  **Problem Statement**
    -   The core problem being solved: [Clearly define the user/market problem]
    -   Current gaps or pain points: [Describe existing inefficient solutions]
    -   Target audience: [Who is this for?]

5.  **Scope**
    -   In-Scope Features: [List key features for the initial release]
    -   Out-of-Scope Items: [List features to be considered for future releases]
    -   Assumptions & Dependencies: [e.g., Assumes availability of a specific API]

6.  **User Personas**
    -   [Persona 1 Name]: [Description, needs, motivations, pain points]
    -   [Persona 2 Name]: [Description, needs, motivations, pain points]

7.  **User Stories & Use Cases**
    -   [User Story 1]: "As a [persona], I want to [action], so that [benefit]."
    -   Acceptance Criteria: [Bulleted list of conditions for the story to be 'done']
    -   [User Story 2]: "As a [persona], I want to [action], so that [benefit]."
    -   Acceptance Criteria: [Bulleted list of conditions for the story to be 'done']

8.  **Functional Requirements**
    -   [FR-001] [Feature Name] (Priority: Must Have/Should Have/Nice to Have) - [Detailed Description]
    -   [FR-002] [Feature Name] (Priority: Must Have/Should Have/Nice to Have) - [Detailed Description]

9.  **Non-Functional Requirements**
    -   Performance: [e.g., Page loads under 2 seconds]
    -   Security: [e.g., Adherence to OWASP Top 10, data encryption]
    -   Scalability: [e.g., Support 10,000 concurrent users]
    -   Compliance: [e.g., GDPR, CCPA]
    -   UX/UI guidelines: [e.g., Adherence to company design system]

10. **User Flows & Journey Maps**
    -   [User Flow 1 Name, e.g., Onboarding]: [Step-by-step description of the user's path]

11. **Technical Requirements**
    -   Platforms: [e.g., Web (responsive), iOS, Android]
    -   Integrations / APIs: [e.g., Stripe for payments, Google Maps for location]
    -   Data storage: [e.g., Firestore for user data, Cloud Storage for files]
    -   Architecture overview: [Briefly describe the proposed technical architecture]

12. **Design & Wireframes (optional)**
    -   [This section notes that UI mockups and wireframes will be attached separately or linked here.]

13. **Constraints & Risks**
    -   Technical constraints: [e.g., Limited access to a specific dataset]
    -   Business risks: [e.g., Market competition, potential for low adoption]
    -   Mitigation strategies: [How to address the identified risks]

14. **Timeline & Roadmap**
    -   Milestones: [Key checkpoints, e.g., Design complete, Alpha version ready]
    -   Phases: [MVP, V1.0, Future releases]

15. **Analytics & Tracking**
    -   Metrics to track: [e.g., Daily Active Users, Feature Adoption Rate, Conversion Funnel]
    -   Tools to be used: [e.g., Google Analytics, Mixpanel]

16. **Open Questions**
    -   [List any pending decisions or items requiring stakeholder input.]

Fill each section with maximum clarity, precision, and depth based on the user's prompt.
---
User Prompt: {{{prompt}}}
Topic Keywords: {{{topicKeywords}}}
Target Audience: {{{targetAudience}}}
Desired Depth: {{{desiredDepth}}}
Tone and Style: {{{toneStyle}}}
---
`;

const generateDocumentFromPromptFlow = ai.defineFlow(
  {
    name: 'generateDocumentFromPromptFlow',
    inputSchema: GenerateDocumentFromPromptInputSchema,
    outputSchema: GenerateDocumentFromPromptOutputSchema,
  },
  async input => {
    let promptText = '';

    if (input.format === 'PRD') {
      promptText = prdPromptTemplate
        .replace('{{{prompt}}}', input.prompt)
        .replace('{{{topicKeywords}}}', input.topicKeywords || 'N/A')
        .replace('{{{targetAudience}}}', input.targetAudience || 'N/A')
        .replace('{{{desiredDepth}}}', input.desiredDepth)
        .replace('{{{toneStyle}}}', input.toneStyle)
        .replace("(Today's Date)", new Date().toLocaleDateString());
    } else {
      promptText = `You are an AI research assistant that generates documents from prompts.

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
    }
    
    promptText += `\n\nInclude a short, one-sentence summary of what you have generated to the 'progress' field in the output.`;


    const {output} = await ai.generate({
      prompt: promptText,
      output: { schema: GenerateDocumentFromPromptOutputSchema },
    });
    return output!;
  }
);
