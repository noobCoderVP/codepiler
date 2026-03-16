# Codepiler

Convert any code repository into an **AI-ready prompt** in seconds.

Codepiler is a browser-based tool that allows developers to upload a repository, explore its structure, select relevant files, and generate structured prompts for LLMs like ChatGPT, Claude, Gemini, and others.

---

## Features

- Upload repository ZIP files
- Interactive repository explorer
- File selection with checkbox controls
- `.gitignore`-based file filtering
- Drag-and-drop ordering of files
- Multiple prompt output formats
- Live prompt preview
- Token estimation for LLM usage
- Export prompts as Markdown, Text, JSON, or XML
- Fully client-side (no backend)

---

## Why Codepiler?

Developers often need to provide **context from multiple files** when interacting with AI models. Manually copying code from large repositories is inefficient and error-prone.

Codepiler simplifies this by allowing you to:

1. Upload a repository archive
2. Select the relevant files
3. Generate a structured prompt ready for AI tools

This helps developers quickly analyze, debug, or refactor codebases with AI assistance.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- Zustand (state management)
- JSZip (ZIP processing)
- dnd-kit (drag and drop)
- tiktoken (token estimation)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/codepiler.git
cd codepiler
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```shell
http://localhost:3000
```

---

## Project Structure

```
src
 ├─ app
 ├─ components
 ├─ store
 ├─ features
 ├─ hooks
 ├─ types
 ├─ constants
 └─ lib
```

Key architecture concepts:

- **Feature modules** handle business logic
- **Zustand stores** manage global state
- **UI components** remain presentation-focused

---

## Usage

1. Download a repository as ZIP
2. Upload the ZIP into Codepiler
3. Explore the repository structure
4. Select the files you want to include
5. Generate a structured prompt
6. Copy or export the prompt for use with AI tools

---
