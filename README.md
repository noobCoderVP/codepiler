# CodePiler

**Turn any repository into focused AI prompt context — in seconds, entirely in your browser.**

CodePiler is a free, open-source developer tool for building precise AI prompt context from real codebases. Upload a repository, select the exact files that matter, wrap them with an expert system prompt and task, set a model token budget, and export directly to ChatGPT, Claude, Gemini, or any other LLM.

No backend. No file uploads. No account required. Everything runs client-side.

**[codepiler.in](https://codepiler.in) · [Launch App](https://codepiler.in/app) · [Docs](https://codepiler.in/docs)**

---

## Why CodePiler

When you ask an AI to review, debug, or refactor your code, the quality of the output depends entirely on what context you give it. Most developers either:

- Paste a few files manually and hope they didn't miss anything important
- Dump an entire repository into the prompt and pay 10× the API cost for noise

CodePiler fixes this. It gives you a controlled workspace to select only the files relevant to the task, see token counts inline on every file, wrap the output with expert-level instructions, and export a structured prompt that gives your model exactly what it needs.

**A 300-file TypeScript project is ~500K tokens — roughly $2.50 per GPT-4o call.** A focused 20-file selection is ~40K tokens — $0.20 per call. That is a 12× cost reduction that compounds across every AI session.

---

## Features

### File Selection and Tree Navigation

- **Interactive repository tree** — browse folders, collapse and expand, search by filename
- **Per-file and per-folder token counts** — inline on every node before you select anything
- **Checkbox selection** — select individual files, use Select All / Clear All for the whole repo
- **Expand All / Collapse All** — manage large repository trees with one click
- **Preview without selecting** — click a filename to preview it in the editor; check the box to include it in the export. Separate actions, deliberate control
- **Selected files panel** — a pinned panel at the bottom of the tree lists every selected file with its individual token cost and a one-click remove button

### Filtering and Scope Management

- **File type filter** — narrow the tree to specific extensions (.ts, .py, .go, or any combination) with one click
- **Token and size manager** — view all files sorted by token count or byte size; bulk-select or deselect the heavy ones from one panel
- **Automatic exclusions** — node_modules, .git, dist, build, binaries, and files over 200 KB are filtered out automatically

### Prompt Wrapper

- **System prompt presets** — 12 expert language-specific system prompts, each hundreds of words long:
    - JavaScript / TypeScript
    - Python
    - Java / Spring
    - Go
    - Rust
    - C++
    - PHP / Laravel
    - Ruby / Rails
    - Swift / iOS
    - Kotlin / Android
    - React / Next.js
    - General / Polyglot
- **Task presets** — 10 detailed task templates covering common AI-assisted development workflows:
    - Modularize the codebase
    - Apply OOP principles
    - Write unit tests
    - Performance audit
    - Security review
    - Refactor for readability
    - Add TypeScript types
    - Document the code
    - Find and fix bugs
    - Convert to functional style
    - Optimize for scalability
    - Code review
- Use presets as a starting point and edit freely — the textarea is fully customizable
- The selected preset name is shown in the dropdown so you always know what is active

### Token Budget

- **27 model presets** with accurate context window sizes:
    - **Anthropic** — Claude Opus 4, Sonnet 4, Haiku 4, Claude 3.7 Sonnet, 3.5 Sonnet, 3.5 Haiku, Claude 3 Opus (all 200K)
    - **OpenAI** — o3 (200K), o3-mini (200K), o1 (200K), o1-mini (128K), GPT-4.1 (1M), GPT-4o (128K), GPT-4o mini (128K), GPT-4 Turbo (128K), GPT-3.5 Turbo (16K)
    - **Google** — Gemini 2.5 Pro (1M), Gemini 2.5 Flash (1M), Gemini 2.0 Flash (1M), Gemini 1.5 Pro (2M), Gemini 1.5 Flash (1M)
    - **Open Source** — Llama 3.1 405B (128K), Llama 3.1 70B (128K), Mistral Large (128K), DeepSeek V3 (64K), Qwen 2.5 72B (128K)
- **Live color-coded progress bar** — green below 70%, amber at 70–90%, red above 90%
- Token count covers the full export: selected code + system prompt + task

### Export and Sessions

- **4 export formats** — Text (optimized for direct prompting), JSON (structured tooling), XML, Markdown
- **Copy to clipboard** or **download** as a file with a timestamped filename
- **Saved sessions** — save your repository and file selection to localStorage and restore it in one click in any future session. No re-uploading, no re-filtering

### Privacy and Performance

- **100% local-first** — repository files are processed entirely in your browser using the File System Access API. No files are sent to any server
- **No account required** — open the app and start working immediately
- **Works offline** after the initial page load
- **Fast tokenization** — uses `gpt-tokenizer` (tiktoken cl100k_base) in the browser for instant, accurate token estimates

---

## Use Cases

| Use case           | How CodePiler helps                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **AI code review** | Select changed files, apply a language system prompt + Code review task, export one focused prompt                |
| **Security audit** | Select auth routes, middleware, and input handlers; apply Security review task with language-specific prompt      |
| **Debugging**      | Isolate the failing module and its dependencies; apply Find and fix bugs task preset                              |
| **Refactoring**    | Pick the feature folder; apply Modularize, OOP, or Refactor for readability task with matching language preset    |
| **Writing tests**  | Select the module under test; apply Write unit tests task for table-driven tests, mocks, and edge cases           |
| **Onboarding**     | Gather entrypoints, schema, and config; export a full architecture overview prompt for a new team member          |
| **Cost reduction** | Stop sending 500K-token repos; select 30 relevant files for a 10–15× reduction in API cost per call               |
| **AI agent prep**  | Pre-package structured context so agents like Cursor skip repeated `read_file` calls and start useful immediately |
| **RAG pipeline**   | Export structured JSON or XML snapshots of selected repository slices for embedding and semantic search           |
| **Documentation**  | Select a feature slice; apply the Document the code task to generate structured documentation drafts              |

---

## Getting Started

### Use the hosted version

Visit **[codepiler.in/app](https://codepiler.in/app)** — no installation required.

### Run locally

```bash
git clone https://github.com/noobcodervp/codepiler.git
cd codepiler
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## Tech Stack

| Layer            | Technology                                       |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 15 (App Router)                          |
| Language         | TypeScript (strict)                              |
| Styling          | Tailwind CSS 4 with CSS variable design tokens   |
| UI primitives    | Radix UI (Select, DropdownMenu, Tooltip, Dialog) |
| State management | Zustand                                          |
| Animations       | Framer Motion                                    |
| Code editor      | Monaco Editor (read-only viewer)                 |
| Split layout     | react-resizable-panels                           |
| Tokenization     | gpt-tokenizer (tiktoken cl100k_base)             |
| ZIP extraction   | JSZip                                            |
| Persistence      | localStorage (Zustand persist middleware)        |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layout
│   ├── layout.tsx          # Root layout with metadata and JSON-LD
│   ├── page.tsx            # Landing page
│   ├── app/page.tsx        # Main application
│   └── docs/               # Documentation pages
├── components/
│   ├── layout/             # Header, Footer, ThemeToggle
│   ├── marketing/          # Landing page sections
│   ├── repo/               # Repository tree, upload, session, filter modals
│   ├── ui/                 # Radix UI primitives (Select, DropdownMenu, Tooltip, Dialog)
│   └── viewer/             # Prompt viewer, tabs, header, chips, prompt editor
├── lib/                    # Utilities, formatters, docs content, token utils
├── store/                  # Zustand stores (repo, selection, viewer, sessions)
└── types/                  # Shared TypeScript types
```

---

## Contributing

Contributions are welcome. Open an issue to discuss a feature or bug before submitting a pull request.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes and ensure `npm run build` passes with no TypeScript errors
4. Open a pull request with a clear description of the change

Please keep pull requests focused on a single concern.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

_CodePiler is built for developers who believe the quality of an AI response starts with the quality of the context you give it._
