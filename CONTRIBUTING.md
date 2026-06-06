# Contributing to Codepiler

Thank you for your interest in contributing. This document covers everything you need to go from zero to opening a pull request.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Adding a New Output Format](#adding-a-new-output-format)
- [Code of Conduct](#code-of-conduct)

---

## Getting Started

**Prerequisites:** Node.js 18+, npm

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/codepiler.git
cd codepiler

# Install dependencies (this also sets up Git hooks via Husky)
npm install

# Start the dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs entirely client-side — there is no backend to start.

### Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Dev server with Turbopack hot reload     |
| `npm run build`        | Production build                         |
| `npm start`            | Serve the production build locally       |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Auto-format with Prettier                |
| `npm run check-format` | Check formatting without writing changes |

---

## Project Architecture

Codepiler follows a feature-based structure inside `src/`:

```text
src/
├── app/                    # Next.js App Router — pages & layouts
│   ├── page.tsx            # Marketing landing page
│   ├── app/page.tsx        # Main tool at /app
│   ├── docs/               # Documentation route group
│   ├── layout.tsx          # Root layout with metadata & providers
│   ├── providers.tsx       # ThemeProvider wrapper
│   ├── loading.tsx         # Global loading skeleton
│   └── not-found.tsx       # 404 page
│
├── components/
│   ├── layout/             # App shell: Header, Footer, MainLayout, ThemeToggle
│   ├── repo/               # Upload, tree explorer, and tree nodes
│   │   ├── RepoUpload.tsx  # ZIP/folder input & drag-drop zone
│   │   ├── RepoExplorer.tsx# Container that wires upload → tree
│   │   ├── RepoTree.tsx    # Tree with search input
│   │   └── TreeNode.tsx    # Recursive file/folder node with checkbox
│   ├── viewer/             # Prompt viewer panel
│   │   ├── OneFileViewer.tsx   # Orchestrates all viewer sub-components
│   │   ├── ViewerHeader.tsx    # File count & token chip display
│   │   ├── ViewerTabs.tsx      # Text / JSON / XML / Markdown tab bar
│   │   ├── ViewerEditor.tsx    # Monaco editor wrapper
│   │   ├── ViewerActions.tsx   # Copy & download buttons
│   │   └── FontSizeControls.tsx
│   ├── marketing/          # Landing page sections (Hero, Features, etc.)
│   ├── app/AppTutorial.tsx # First-visit onboarding tour
│   └── ui/                 # Low-level primitives (e.g. checkbox)
│
├── store/                  # Zustand global state (see State Management)
├── lib/                    # Pure utility functions (no React)
├── types/repo.ts           # Shared TypeScript types
└── constants/              # App-wide constants
```

### Key Principles

- **Components are pure and presentation-focused.** They read from stores and dispatch actions — they do not contain business logic.
- **Business logic lives in `lib/`.** Formatting, filtering, tree building, and token counting are all plain TypeScript functions with no React dependency, making them easy to test in isolation.
- **Global state lives in Zustand stores.** There are three: `repo-store` (loaded files & tree), `selection-store` (selected paths), and `viewer-store` (active viewed path). Components subscribe to only the slice they need.

---

## Data Flow

Understanding how data moves through the app is essential before making changes:

```text
User uploads ZIP / Folder
        │
        ▼
  lib/read-zip.ts  OR  lib/read-files.ts
  (extract files into RepoFile[] — { path, content, size })
        │
        ▼
  lib/pre-filter.ts
  (remove binary files, files >200 KB, known generated dirs)
        │
        ▼
  lib/gitignore-filter.ts
  (parse .gitignore from repo, apply ignore rules)
        │
        ▼
  lib/build-tree.ts
  (convert flat path array → nested RepoNode tree)
        │
        ▼
  repo-store.ts  ← stores files[] and tree
        │
        ▼
  RepoTree component reads tree, renders TreeNode recursively
  User checks/unchecks files → selection-store updates
        │
        ▼
  lib/viewer-formatters.ts
  (buildText | buildJSON | buildXML | buildMarkdown)
  called reactively whenever selection changes
        │
        ▼
  ViewerEditor (Monaco) renders the formatted prompt
  ViewerActions provides copy + download
```

---

## State Management

Codepiler uses three Zustand stores. Understand each before touching state:

### `repo-store.ts`

| Key          | Type               | Purpose                                        |
| ------------ | ------------------ | ---------------------------------------------- |
| `files`      | `RepoFile[]`       | All loaded files with path, content, size      |
| `tree`       | `RepoNode \| null` | Root of the hierarchical tree                  |
| `setFiles()` | action             | Process raw files: filter → build tree → store |

### `selection-store.ts`

| Key                 | Type          | Purpose                       |
| ------------------- | ------------- | ----------------------------- |
| `selected`          | `Set<string>` | Set of selected file paths    |
| `toggle(path)`      | action        | Toggle a single file          |
| `selectMany(paths)` | action        | Select multiple paths at once |
| `clear()`           | action        | Deselect everything           |
| `isSelected(path)`  | query         | Check if a path is selected   |
| `count()`           | query         | Number of selected files      |

### `viewer-store.ts`

| Key               | Type             | Purpose                                  |
| ----------------- | ---------------- | ---------------------------------------- |
| `activePath`      | `string \| null` | Currently highlighted file in the viewer |
| `setActivePath()` | action           | Change focus in the viewer               |

---

## Code Style

We enforce formatting and linting automatically via Git hooks (Husky + lint-staged). Your code will be checked on every commit.

To run checks manually:

```bash
npm run lint          # ESLint
npm run check-format  # Prettier (check only)
npm run format        # Prettier (auto-fix)
```

### Key rules

- **Prettier**: double quotes, 4-space indentation, 100-char print width, trailing commas off
- **ESLint**: `no-console` warns, unused vars warn, Next.js core-web-vitals rules enabled
- **TypeScript**: strict mode on — avoid `any`, use proper return types on non-trivial functions
- **No comments explaining _what_ code does** — name things clearly instead. Only comment _why_ when it's non-obvious (a workaround, a hidden constraint, a subtle invariant)

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org).

```text
feat: add XML export format
fix: correct token count for multi-byte characters
docs: add architecture diagram to CONTRIBUTING
refactor: split viewer-formatters into separate files
chore: upgrade jszip to 3.10.1
style: run prettier on lib/
test: add unit tests for build-tree
```

**Scope** (optional) can be the component or module affected:

```text
feat(viewer): add line-number toggle to Monaco editor
fix(gitignore): handle nested .gitignore files
```

Commits that bundle unrelated changes will be asked to split on review.

---

## Pull Request Process

1. **Fork** the repository and create a branch off `master`:

    ```bash
    git checkout -b feat/my-feature
    ```

2. **Make your changes.** Keep commits focused and conventional.

3. **Run checks before pushing:**

    ```bash
    npm run lint
    npm run check-format
    npm run build
    ```

4. **Open a Pull Request** against `master`. Your PR description should include:
    - What the change does and why
    - Screenshots or a short screen recording for any UI changes
    - Any trade-offs or open questions

5. A maintainer will review the PR. Address feedback in new commits (do not force-push after review starts).

### Good first contributions

- Fixing a bug described in an open issue
- Adding a language icon for a missing file extension in `lib/file-icons.ts`
- Improving accessibility (ARIA labels, keyboard navigation)
- Writing unit tests for functions in `lib/`
- Improving documentation

---

## Issue Reporting

When opening a bug report, include:

- **Description** — what went wrong
- **Steps to reproduce** — exact steps from a fresh page load
- **Expected behavior** — what should have happened
- **Actual behavior** — what actually happened
- **Environment** — browser name + version, OS
- **Screenshot or console output** if relevant

For feature requests, describe the use case clearly — what problem you're trying to solve and why the current tool doesn't cover it.

---

## Adding a New Output Format

The output format pipeline is designed to be extended. Here is the minimal set of changes required:

1. **Add the format type** in `src/types/repo.ts`:

    ```typescript
    export type ViewerFormat = "text" | "json" | "xml" | "markdown" | "your-format";
    ```

2. **Write the builder** in `src/lib/viewer-formatters.ts`:

    ```typescript
    export function buildYourFormat(files: RepoFile[]): string {
        // return the formatted string
    }
    ```

3. **Wire the builder** into the format switch in the viewer component (`OneFileViewer.tsx` or `viewer-formatters.ts` dispatcher).

4. **Add a tab** in `ViewerTabs.tsx` so users can select the new format.

5. **Handle the file extension** in `ViewerActions.tsx` so the download uses the right extension.

---

## Code of Conduct

- Be respectful and constructive in all discussions
- Assume good intent from other contributors
- Keep discussion focused on the code, not the person

We follow the [Contributor Covenant](https://www.contributor-covenant.org) v2.1.

---

## Questions

If you are unsure about anything — architecture, where to make a change, whether an idea is in scope — open a GitHub Discussion or a draft PR with your question. We would rather answer a question early than review something that went in the wrong direction.

Thank you for contributing to Codepiler.
