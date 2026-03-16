# Functional Requirements Document (FRD)

# 1. Product Overview

**Product Name:** Codepiler
**Product Type:** Browser-based developer tool
**Deployment:** Frontend-only web application

## 1.1 Purpose

Codepiler enables developers to convert a **code repository into an AI-ready prompt** by allowing them to upload a repository archive, explore its structure, select relevant files, and generate a structured prompt for use with LLMs.

## 1.2 Objectives

The system aims to:

- Simplify preparing code context for LLMs
- Allow developers to control which files are included
- Provide token visibility to stay within model limits
- Generate prompts in multiple structured formats
- Provide a visual interface for organizing prompt context

## 1.3 Key Characteristics

- Fully client-side application
- No backend infrastructure
- No external API dependencies
- User code remains local to the browser

---

## 2. System Architecture

Codepiler operates entirely within the browser.

Processing pipeline:

```
ZIP Upload
   ↓
ZIP Extraction
   ↓
Repository Indexing
   ↓
Repo Explorer Rendering
   ↓
File Selection
   ↓
Prompt Builder
   ↓
Token Estimation
   ↓
Preview + Export
```

---

## 3. Functional Requirements

# 3.1 Repository Input

## FR-1 ZIP Upload

The system shall allow users to upload a **ZIP archive containing a code repository**.

Supported behavior:

- File selection via upload dialog
- Drag and drop upload

### Processing

After upload:

- Extract ZIP contents
- Parse file paths
- Build repository tree

---

# 3.2 ZIP Processing

## FR-2 ZIP Extraction

The system shall extract the uploaded ZIP archive **within the browser**.

The extraction process shall:

- Read file paths
- Identify directories
- Read file contents
- Detect binary files

---

# 3.3 Repository Tree Rendering

## FR-3 Repository Explorer

The system shall display the repository structure in a **tree-based UI**.

Features:

- Expand/collapse folders
- Hierarchical structure
- File selection checkboxes

Example:

```
src/
  api/
    user.ts
  services/
    auth.ts
tests/
README.md
```

---

# 3.4 File Selection

## FR-4 File Inclusion Selection

Users shall be able to select which files are included in the generated prompt.

Capabilities:

- Checkbox-based selection
- Multi-file selection
- Folder-based grouping

Selected files will be included in prompt generation.

---

# 3.5 .gitignore-Based Filtering

## FR-5 Ignore Rule Processing

The system shall detect and apply `.gitignore` rules present in the repository.

Ignored files shall:

- Remain visible in the tree
- Have **disabled checkboxes**
- Not be selectable for prompt generation

Example UI behavior:

```
src/api/user.ts      ☑ selectable
dist/bundle.js       ⛔ disabled
node_modules/react   ⛔ disabled
```

---

# 3.6 Prompt Builder

## FR-6 Prompt Generation

The system shall generate a prompt by concatenating selected files in a structured format.

Each file shall be represented as a block containing:

- File path
- File contents

Example:

```
===== FILE: src/api/user.ts =====
<file contents>
```

---

# 3.7 Output Formats

## FR-7 Multiple Output Formats

The system shall support generating prompts in multiple formats.

Supported formats:

- Markdown
- Plain Text
- JSON
- XML

### Markdown Format

````
## FILE: src/api/user.ts
```ts
code here
````

```

### JSON Format

```

{
"files": [
{
"path": "src/api/user.ts",
"content": "code"
}
]
}

```

### XML Format

```

<repository>
  <file path="src/api/user.ts">
    code
  </file>
</repository>
```

---

# 3.8 Prompt Preview

## FR-8 Live Prompt Preview

The system shall display a **live preview of the generated prompt**.

The preview shall update automatically when:

- file selection changes
- file order changes
- output format changes

---

# 3.9 Token Estimation

## FR-9 Token Counter

The system shall estimate token usage for the generated prompt.

Displayed metrics:

- number of selected files
- estimated token count

Token estimation shall use a tokenizer compatible with GPT models.

---

# 3.10 File Ordering

## FR-10 Drag and Drop Ordering

Users shall be able to reorder selected files using drag and drop.

The final prompt shall follow the selected order.

Example ordering:

```
1 src/db/schema.ts
2 src/services/auth.ts
3 src/api/user.ts
```

---

# 3.11 Folder Ordering

## FR-11 Folder Reordering (Optional)

Users may reorder folders to influence the ordering of contained files.

Example:

```
1 database/
2 services/
3 api/
```

Files inside folders follow folder order.

---

# 3.12 Export

## FR-12 Export Prompt

Users shall be able to export generated prompts.

Supported options:

- Copy to clipboard
- Download as `.txt`
- Download as `.md`

---

# 3.13 File Search (Optional Enhancement)

## FR-13 File Search

Users may search files within the repository explorer.

Search results shall highlight matching files.

Example:

```
Search: auth

src/services/auth.ts
src/api/authController.ts
```

---

# 4. Non-Functional Requirements

# 4.1 Performance

The system shall support repositories up to:

| Parameter         | Limit  |
| ----------------- | ------ |
| ZIP file size     | 50 MB  |
| Maximum files     | 2000   |
| Maximum file size | 200 KB |

---

# 4.2 Security

- All processing occurs in the browser
- No repository data is transmitted to external servers
- No user code is stored

---

# 4.3 Compatibility

Supported browsers:

- Chrome
- Edge
- Firefox
- Safari

---

# 4.4 Deployment

The application shall be deployable as a **static web application**.

Example hosting platforms:

- Vercel
- Netlify
- Cloudflare Pages

---

# 5. UI Layout

High-level layout:

```
Header
------------------------------------
Codepiler

Input Section
------------------------------------
Upload ZIP
Drag & Drop

Main Interface
------------------------------------
Repository Explorer | Prompt Preview

Footer
------------------------------------
Token Count
Export Options
Format Selector
```

---

# 6. Technology Stack

Frontend framework:

- Next.js
- React
- TailwindCSS
- shadcn/ui

Libraries:

- JSZip (ZIP extraction)
- tiktoken (token counting)
- dnd-kit (drag and drop)

---

# 7. Future Enhancements

Potential improvements:

- GitHub repository import
- private repo authentication
- AI-assisted file selection
- automatic repo summarization
- prompt templates
- large repo chunking

---
