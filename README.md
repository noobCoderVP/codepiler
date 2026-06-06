# Codepiler

**Turn any code repository into a precise, AI-ready prompt — entirely in your browser.**

[![Live Demo](https://img.shields.io/badge/Live-codepiler.in-blue)](https://codepiler.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](./CONTRIBUTING.md)

---

## The Problem

Working with AI coding tools on real codebases creates a hidden cost spiral:

- **Manual copy-paste** from multiple files is slow, error-prone, and loses structure
- **AI agents make repeated `read_file` calls** to understand a codebase — each one burns tokens and latency
- **Sending full repositories** to LLM APIs is expensive: a 300-file TypeScript project can contain 500K+ tokens
- **Re-uploading context** at the start of every session wastes minutes before any useful work happens

Codepiler fixes all four. It gives developers a controlled workspace to import a repository, select exactly the files that matter, estimate token cost in real time, and export clean structured context — in under 60 seconds.

---

## Cost & Time Impact

### Token cost reduction

| Scenario                          | Tokens sent           | GPT-4o cost (est.)        |
| --------------------------------- | --------------------- | ------------------------- |
| Full 300-file repo                | ~500,000              | ~$2.50 per prompt         |
| Codepiler selection (20–40 files) | ~40,000               | ~$0.20 per prompt         |
| **Savings**                       | **~92% fewer tokens** | **~$2.30 saved per call** |

> Pricing based on GPT-4o at $5 / 1M input tokens. Savings compound across every AI session and every developer on the team.

### Time savings

| Task                               | Without Codepiler                 | With Codepiler                               |
| ---------------------------------- | --------------------------------- | -------------------------------------------- |
| Assemble context for an AI session | 10–30 min manual copy-paste       | Under 60 seconds                             |
| Resume a previous context          | Re-upload + re-filter + re-select | One click (Saved Sessions)                   |
| Find the largest files to exclude  | Manual inspection                 | Instant — Size Manager sorts by tokens/bytes |
| Narrow to specific file types      | Manually skip files               | One click — File Type Filter                 |

### AI agent efficiency

AI coding agents (Cursor, GitHub Copilot, custom MCP tools, Claude Code) make repeated `read_file` tool calls to understand a codebase before they can act. This is slow and token-expensive.

With Codepiler:

1. You package the exact files the agent needs into a single structured prompt
2. The agent receives full context in one shot — no round-trip file reads
3. The agent starts producing useful output immediately instead of exploring the repo

This is especially valuable for agentic workflows, RAG pipelines, and any system that charges per LLM call.

---

## Features

### Repository Input

- **ZIP Upload** — upload any `.zip` archive of a repository
- **Folder Upload** — select a local directory directly from your file system
- **Drag & Drop** — drop a ZIP file or folder anywhere on the page
- **Smart auto-selection** — common entry points (`README`, `src/`, `package.json`, TypeScript files) are pre-selected on load

### File Processing

- **Automatic filtering** — skips binary files, large files (>200 KB), and generated directories (`node_modules`, `.next`, `dist`, `build`, etc.)
- **`.gitignore` awareness** — respects the repository's own `.gitignore` rules when filtering
- **File size tracking** — shows uncompressed size for every file

### Repository Explorer

- **Interactive file tree** — hierarchical view of every folder and file
- **Expand/collapse folders** — navigate nested structures easily
- **Real-time search** — filter the tree by filename or path as you type
- **Checkbox selection** — select or deselect individual files or entire folders at once
- **Language-specific icons** — visual indicators for TypeScript, Python, Go, React, JSON, and more
- **Inline token counts** — every file and folder shows its token count (`1.2K`, `8.5K`) so you see what's expensive at a glance

### File Type Filter

- **Extension filter modal** — click the filter icon to open a picker showing every extension in the repo
- **Multi-select extensions** — enable any combination of types (`.ts`, `.py`, `.md`) in one click
- **Active filter chips** — selected extensions shown as removable badges below the search bar
- **One-click clear** — remove the entire filter or individual extensions without reopening the modal

### Size Manager

- **Token & size sort** — open a modal listing every file sorted by token count or byte size (descending)
- **Inline select/deselect** — toggle any file's selection directly in the list; the tree and prompt update instantly
- **Bulk controls** — select all or deselect all visible files in one action
- **Live token total** — shows total tokens across currently selected files as you adjust

### Prompt Building

- **Live prompt preview** — updates instantly as your selection changes
- **Four output formats**:
    - **Text** — `===== FILE: path =====` headers with raw content
    - **JSON** — structured array of `{ path, content }` objects
    - **XML** — `<file>` elements with CDATA-wrapped content
    - **Markdown** — fenced code blocks with file path headers
- **Monaco Editor** — professional code viewer with syntax highlighting and adjustable font size

### Token Estimation

- **GPT-compatible token counter** — uses `gpt-tokenizer` for accurate estimates against GPT-3.5/4/4o
- **Live token display** — total tokens and selected file count update in real time
- **Per-file token badges** — every node in the file tree shows its individual token cost

### Saved Sessions

- **Save to localStorage** — snapshot your repository and file selection with a custom name
- **Session table** — view all saved sessions with repo name, file count, token count, and timestamp
- **One-click restore** — load any session instantly; the tree and viewer restore to the exact saved state
- **Delete with confirmation** — remove sessions with a confirmation prompt to prevent accidents
- **No re-uploading** — revisit any previous context without dragging in a ZIP again

### Export

- **Copy to clipboard** — one click copies the entire prompt
- **Download** — export as `.txt`, `.md`, `.json`, or `.xml`
- **Timestamped filenames** — auto-generated as `repo_YYYY-MM-DD_HH-MM-SS.ext`

### Developer Experience

- **Fully client-side** — zero backend, zero data transmission, works offline after load
- **Dark / Light mode** — follows system preference, switchable in one click
- **Resizable panels** — drag the divider between the explorer and viewer
- **Interactive tutorial** — step-by-step onboarding tour on first visit
- **PWA-ready** — installable as a web app

---

## Tech Stack

| Layer                | Technology                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| Framework            | [Next.js 15](https://nextjs.org) (App Router)                                                           |
| UI                   | [React 19](https://react.dev), [TailwindCSS 4](https://tailwindcss.com)                                 |
| Language             | [TypeScript 5](https://www.typescriptlang.org)                                                          |
| State                | [Zustand 5](https://zustand-demo.pmnd.rs)                                                               |
| ZIP Parsing          | [JSZip](https://stuk.github.io/jszip)                                                                   |
| Token Counting       | [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer), [tiktoken](https://github.com/dqbd/tiktoken) |
| Code Editor          | [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)                                    |
| Drag & Drop          | [@dnd-kit](https://dndkit.com)                                                                          |
| Animations           | [Framer Motion](https://www.framer.com/motion)                                                          |
| `.gitignore` parsing | [ignore](https://github.com/kaelzhang/node-ignore)                                                      |
| XML formatting       | [xml-formatter](https://github.com/chrisbottin/xml-formatter)                                           |
| Theming              | [next-themes](https://github.com/pacocoursey/next-themes)                                               |
| Linting              | ESLint 9 + Prettier 3 + Husky + lint-staged                                                             |

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

```text
src/
├── app/                      # Next.js App Router pages & layouts
│   ├── page.tsx              # Landing page
│   ├── app/page.tsx          # Main application (/app)
│   └── docs/                 # Documentation pages
│
├── components/
│   ├── layout/               # Header, Footer, MainLayout, ThemeToggle
│   ├── repo/                 # RepoUpload, RepoExplorer, RepoTree, TreeNode
│   │                         # FileTypeFilterModal, TokenManagerModal
│   │                         # SavedSessionsModal
│   ├── viewer/               # OneFileViewer, ViewerEditor, ViewerTabs, ViewerActions
│   ├── marketing/            # HeroSection, FeatureSection, ImpactSection,
│   │                         # WorkflowSection, UseCasesSection, CTASection
│   └── ui/                   # Primitive UI components
│
├── store/
│   ├── repo-store.ts         # Loaded files & tree structure
│   ├── selection-store.ts    # Selected file paths
│   ├── viewer-store.ts       # Active viewed file
│   └── sessions-store.ts     # Saved sessions (localStorage-backed)
│
├── lib/
│   ├── read-zip.ts           # ZIP extraction
│   ├── read-files.ts         # Folder reading
│   ├── build-tree.ts         # Flat paths → tree structure
│   ├── gitignore-filter.ts   # .gitignore rule application
│   ├── pre-filter.ts         # Binary & size filtering
│   ├── viewer-formatters.ts  # Text / JSON / XML / Markdown builders + token count
│   ├── filter-tree.ts        # Search + extension filtering
│   ├── token-utils.ts        # formatTokenCount, formatBytes helpers
│   └── file-icons.ts         # Language-specific icon mapping
│
└── types/
    └── repo.ts               # RepoFile, RepoNode, ViewerFormat types
```

---

## How It Works

```text
User uploads ZIP or Folder
        │
        ▼
  Pre-filter (binary, large files, generated dirs)
        │
        ▼
  Apply .gitignore rules
        │
        ▼
  Build file tree (flat paths → nested structure)
        │
        ▼
  Interactive explorer
  ├── Search by name/path
  ├── Filter by file extension
  ├── Sort/select by token count or size
  └── Inline token badge on every node
        │
        ▼
  Formatter (Text | JSON | XML | Markdown)
        │
        ▼
  Monaco Editor preview
        │
        ├── Copy to clipboard / Download
        └── Save Session (localStorage) → restore later
```

All steps happen in the browser. No network requests. No server.

---

## Deployment

Codepiler is a standard Next.js application with no backend dependencies.

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

---

## Contributing

Contributions are welcome — bug fixes, new features, documentation improvements, and accessibility improvements.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development setup and available scripts
- Project architecture and data flow
- State management patterns
- Code style guide (ESLint + Prettier rules)
- Commit message conventions (Conventional Commits)
- Pull request process
- Guide for adding a new output format

---

## License

MIT — see [LICENSE](./LICENSE) for details.

Codepiler is free to use, modify, and distribute. Commercial use is permitted.
