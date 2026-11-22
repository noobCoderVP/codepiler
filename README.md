# CodePiler

**Ask AI about your code with only the files that matter.**

CodePiler is a free, open-source tool for developers who work with AI. Drop in a project, pick the files your question is about, write the question, and copy one clean prompt into ChatGPT, Claude, Gemini or any other model. Every file is labelled with its path, and you can see the token cost of each one before you include it.

No backend. No uploads. No account. Everything runs in your browser.

**[codepiler.in](https://codepiler.in) · [Open the app](https://codepiler.in/app) · [Docs](https://codepiler.in/docs)**

---

## Why CodePiler

The answer you get from an AI is only as good as the code you give it. Most of the time you either:

- paste a few files by hand and miss the one that matters, or
- paste the whole repository, so your question is buried in unrelated code, hits context limits, and costs more.

CodePiler sits in between. You see the whole project with a token count on every file, tick only what's relevant, add your question, and copy a single, structured prompt.

---

## Features

### Choosing files

- **Tree view**: browse folders, tick files or whole folders, expand or collapse everything at once
- **By size view**: a flat list sorted by tokens (largest first) with a bar per file, sortable by name, size or tokens. The fastest way to find and drop the files that bloat a prompt
- **Token counts everywhere**: on every file and folder, before you select anything
- **Preview without selecting**: click a name to read the file; tick the box to include it
- **Selected files bar**: a collapsible bar at the bottom showing your selection and its total tokens

### Search and filters

- **Search** by file or folder name
- **Type chips**: show only `.ts`, `.py`, `.md`… with a file count on each chip
- **Token range** (By size view): type a min and/or max to show only files in that range
- **Select shown / Deselect shown**: act on exactly the files you can see, e.g. "all `.ts` files" or "everything over 5,000 tokens"
- **Automatic exclusions**: `node_modules`, `.git`, `dist`, `build` and similar folders, binaries, files over 200 KB, and anything in the root `.gitignore`

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
- **Task presets** — 18 detailed task templates covering common AI-assisted development workflows:
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
    - Add logging & observability
    - Accessibility audit
    - Dependency audit
    - Eliminate dead code
    - Generate API documentation
    - Internationalization (i18n) audit
    - Code review
- Use presets as a starting point and edit freely — the textarea is fully customizable
- The selected preset name is shown in the dropdown so you always know what is active

### Token Budget

- **18 model presets** with current context window sizes (checked November 2026):
    - **Anthropic** — Claude Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5 (all 1M)
    - **OpenAI** — GPT-6.2 Astra, GPT-6.2 Sol, GPT-6.1 Terra, GPT-6 Luna (all 1.05M)
    - **Google** — Gemini 4 Neon, Hydrogen, Carbon, Argon (all 1M)
    - **Open weights** — DeepSeek V4 Pro (1M), DeepSeek V4.1 Flash (1M), GLM 5.3 (1M), Llama 4 Scout (10M), Llama 4 Maverick (1M), Qwen 3.5 (262K)
- **Live color-coded progress bar** — green below 70%, amber at 70–90%, red above 90%
- Token count covers the full export: selected code + system prompt + task

### Export and Sessions

- **4 export formats** — Text (optimized for direct prompting), JSON (structured tooling), XML, Markdown
- **Copy to clipboard** or **download** as a file with a timestamped filename
- **Saved sessions** — save your selected files to localStorage and restore them in one click in any future session. No re-uploading, no re-filtering

### Privacy and Performance

- **100% local-first** — repository files are processed entirely in your browser using standard file input and drag-and-drop APIs. No files are sent to any server
- **No account required** — open the app and start working immediately
- **Fast tokenization**: uses `gpt-tokenizer` (o200k_base) in the browser. Other model families tokenize differently, so treat counts as a close estimate

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
| **Cost reduction** | Send the 20 files that matter instead of the whole repo; see the token total before you paste                     |
| **AI agent prep**  | Pre-package structured context so agents like Cursor skip repeated `read_file` calls and start useful immediately |
| **RAG pipeline**   | Export structured JSON or XML snapshots of selected repository slices for embedding and semantic search           |
| **Documentation**  | Select a feature slice; apply the Document the code task to generate structured documentation drafts              |

---

## Getting Started

### Use the hosted version

Visit **[codepiler.in/app](https://codepiler.in/app)** — no installation required. No repo handy? Click **Try a sample project**.

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
| Framework        | Next.js 16 (App Router, Turbopack)               |
| Language         | TypeScript (strict)                              |
| Styling          | Tailwind CSS 4 with CSS variable design tokens   |
| UI primitives    | Radix UI (Select, DropdownMenu, Tooltip, Dialog) |
| State management | Zustand                                          |
| Animations       | Framer Motion                                    |
| Code editor      | Monaco Editor (read-only viewer)                 |
| Split layout     | react-resizable-panels                           |
| Tokenization     | gpt-tokenizer (o200k_base)                       |
| ZIP extraction   | JSZip                                            |
| Persistence      | localStorage                                     |

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
│   ├── repo/               # File tree, By size list, import, sessions
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

_CodePiler is built for developers who want sharper answers from AI by giving it the right code._
