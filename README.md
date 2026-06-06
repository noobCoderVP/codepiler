# Codepiler

**Convert any code repository into an AI-ready prompt — entirely in your browser.**

Codepiler lets developers upload a repository (ZIP or folder), explore its file tree, select relevant files, and instantly generate a structured prompt for LLMs like ChatGPT, Claude, Gemini, and more. No backend. No data leaves your machine.

[![Live Demo](https://img.shields.io/badge/Live-codepiler.in-blue)](https://codepiler.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)

---

## What is Codepiler?

When working with AI coding assistants, providing the right context from a codebase is often the hardest part. Manually copying files is slow, error-prone, and easy to get wrong.

Codepiler solves this by giving you a full interactive file explorer on top of any repository — letting you pick exactly what the AI needs to see, then exporting it as a single structured prompt.

---

## Features

### Repository Input

- **ZIP Upload** — upload any `.zip` archive of a repository
- **Folder Upload** — select a local directory directly from your file system
- **Drag & Drop** — drop a ZIP file or folder anywhere on the page
- **Smart auto-selection** — common entry points (README, `src/`, `package.json`, TypeScript files) are pre-selected on load

### File Processing

- **Automatic filtering** — skips binary files, large files (>200 KB), and generated directories (`node_modules`, `.next`, `dist`, `build`, etc.)
- **`.gitignore` awareness** — respects the repository's own `.gitignore` rules when filtering files
- **File size tracking** — shows uncompressed size for each file

### Repository Explorer

- **Interactive file tree** — hierarchical view of every folder and file
- **Expand/collapse folders** — navigate nested structures easily
- **Real-time search** — filter the tree by filename or path as you type
- **Checkbox selection** — select or deselect individual files or entire folders at once
- **Language-specific icons** — visual indicators for TypeScript, Python, Go, React, JSON, and more

### Prompt Building

- **Live prompt preview** — the prompt updates instantly as you change your selection
- **Four output formats**:
    - **Text** — `===== FILE: path =====` headers with raw content
    - **JSON** — structured array of `{ path, content }` objects
    - **XML** — `<file>` elements with CDATA-wrapped content
    - **Markdown** — fenced code blocks with file path headers
- **Monaco Editor** — view the generated prompt with full syntax highlighting and font-size controls

### Token Estimation

- **GPT-compatible token counter** — uses `gpt-tokenizer` for accurate estimates against GPT-3.5/4 models
- **Live token display** — see total tokens and selected file count update in real time
- **Stay within context limits** — helps you curate your selection before hitting an LLM

### File Ordering

- **Drag-and-drop reordering** — arrange selected files in any order before generating the prompt
- **Order preserved in output** — the final prompt reflects the order you set

### Export

- **Copy to clipboard** — one click to copy the entire prompt
- **Download** — export as `.txt`, `.md`, `.json`, or `.xml`
- **Timestamped filenames** — auto-generated as `repo_YYYY-MM-DD_HH-MM-SS.ext`

### Developer Experience

- **Fully client-side** — zero backend, zero data transmission, works offline after load
- **Dark / Light mode** — follows system preference, switchable with one click
- **Resizable panels** — drag the divider between the explorer and viewer to fit your workflow
- **Interactive tutorial** — a step-by-step onboarding tour on first visit
- **PWA-ready** — installable as a web app via the browser

---

## Tech Stack

| Layer              | Technology                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| Framework          | [Next.js 15](https://nextjs.org) (App Router)                                                           |
| UI                 | [React 19](https://react.dev), [TailwindCSS 4](https://tailwindcss.com)                                 |
| Language           | [TypeScript 5](https://www.typescriptlang.org)                                                          |
| State              | [Zustand 5](https://zustand-demo.pmnd.rs)                                                               |
| ZIP Parsing        | [JSZip](https://stuk.github.io/jszip)                                                                   |
| Token Counting     | [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer), [tiktoken](https://github.com/dqbd/tiktoken) |
| Code Editor        | [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)                                    |
| Drag & Drop        | [@dnd-kit](https://dndkit.com)                                                                          |
| Animations         | [Framer Motion](https://www.framer.com/motion)                                                          |
| .gitignore parsing | [ignore](https://github.com/kaelzhang/node-ignore)                                                      |
| XML formatting     | [xml-formatter](https://github.com/chrisbottin/xml-formatter)                                           |
| Theming            | [next-themes](https://github.com/pacocoursey/next-themes)                                               |
| Linting            | ESLint 9 + Prettier 3 + Husky + lint-staged                                                             |

---

## Quick Start

**Prerequisites:** Node.js 18+

```bash
# Clone the repository
git clone https://github.com/noobcodervp/codepiler.git
cd codepiler

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start dev server with Turbopack          |
| `npm run build`        | Build for production                     |
| `npm start`            | Serve the production build               |
| `npm run lint`         | Run ESLint across the codebase           |
| `npm run format`       | Format all files with Prettier           |
| `npm run check-format` | Check formatting without writing changes |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── page.tsx            # Landing page
│   ├── app/page.tsx        # Main application (/app)
│   └── docs/               # Documentation pages
│
├── components/
│   ├── layout/             # Header, Footer, MainLayout, ThemeToggle
│   ├── repo/               # RepoUpload, RepoExplorer, RepoTree, TreeNode
│   ├── viewer/             # OneFileViewer, ViewerEditor, ViewerTabs, ViewerActions
│   ├── marketing/          # Landing page sections
│   ├── app/                # AppTutorial (onboarding)
│   └── ui/                 # Primitive UI components
│
├── store/
│   ├── repo-store.ts       # Loaded files & tree structure
│   ├── selection-store.ts  # Selected file paths
│   └── viewer-store.ts     # Active viewed file
│
├── lib/
│   ├── read-zip.ts         # ZIP extraction
│   ├── read-files.ts       # Folder reading
│   ├── build-tree.ts       # Flat paths → tree structure
│   ├── gitignore-filter.ts # .gitignore rule application
│   ├── pre-filter.ts       # Binary & size filtering
│   ├── viewer-formatters.ts# Text / JSON / XML / Markdown builders
│   └── filter-tree.ts      # Search filtering
│
└── types/
    └── repo.ts             # RepoFile, RepoNode, ViewerFormat types
```

---

## How It Works

```
User uploads ZIP / Folder
        │
        ▼
  Pre-filter (binary, large, node_modules)
        │
        ▼
  Apply .gitignore rules
        │
        ▼
  Build file tree (flat paths → nested structure)
        │
        ▼
  Interactive explorer (select files)
        │
        ▼
  Formatter (Text | JSON | XML | Markdown)
        │
        ▼
  Monaco Editor preview + export
```

All steps happen synchronously in the browser — no network requests, no server.

---

## Deployment

Codepiler is a standard Next.js app. One-command deployments:

**Vercel (recommended)**

```bash
npx vercel
```

**Netlify**

- Build command: `npm run build`
- Publish directory: `.next`

**Cloudflare Pages**

- Framework preset: Next.js
- Build command: `npm run build`

Since Codepiler has no backend or environment variables, any static hosting that supports Next.js output will work.

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, architecture guidelines, and the pull request process.

---

## License

MIT — see [LICENSE](./LICENSE).
