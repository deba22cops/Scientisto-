# Scientisto 🚀 -- By Debabrata Behera (Db GROUPS)

Scientisto is an AI-powered research assistant designed to accelerate your writing and research process. Simply provide a prompt, and Scientisto will generate a comprehensive, well-structured document—such as a research paper, PRD, or essay—in minutes.

## ✨ Key Features

- **AI-Powered Document Generation**: Leverage the power of Google's Gemini models to create high-quality documents from simple text prompts.
- **Multiple Document Formats**: Generate various types of documents, including Product Requirement Documents (PRDs), research papers, and essays.
- **Advanced Customization**: Fine-tune the generation process with options for research depth, tone, style, target audience, and more.
- **User Authentication**: Secure user accounts and personalized dashboards powered by Firebase Authentication.
- **Research History**: All your generated documents are automatically saved to your account for future reference, powered by Firestore.
- **Export Functionality**: Download your generated documents in both `.docx` and `.pdf` formats.
- **Responsive Design**: A mobile-first, fully responsive UI that works beautifully on all devices.
- **Modern UI**: A sleek and modern interface built with ShadCN UI and Tailwind CSS.

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Authentication**: [Firebase](https://firebase.google.com/) (Auth & Firestore)
- **Deployment**: Configured for [Vercel](https://vercel.com/) & Firebase App Hosting

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### 1. Install Dependencies

First, install the project dependencies using npm:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a new file named `.env` in the root of your project. You will need to add your Google AI API key here to enable the generative features.

```env
# Get your key from Google AI Studio: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

The Firebase configuration is already included in the project, but for local development, you might want to point it to your own Firebase project by updating `src/firebase/config.ts`.

### 3. Run the Development Server

Once the dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
```

This will start the Next.js development server, typically on `http://localhost:9002`.

## 🛠️ Available Scripts

- `npm run dev`: Starts the development server with Next.js Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## 📁 Project Structure

```
.
├── src
│   ├── app/              # Next.js App Router pages and layouts
│   ├── ai/               # Genkit flows and AI logic
│   ├── components/       # Shared UI components
│   ├── firebase/         # Firebase configuration and hooks
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions and libraries
├── public/               # Static assets
├── docs/                 # Backend and data model definitions
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🤝 Contributing

This project was built in Firebase Studio. We welcome your ideas and contributions to make Scientisto even better.


