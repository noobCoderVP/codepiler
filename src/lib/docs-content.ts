export type DocPage = {
    slug: string;
    title: string;
    description: string;
    sections: {
        id: string;
        heading: string;
        body: string[];
    }[];
    faq?: {
        question: string;
        answer: string;
    }[];
    examples?: {
        title: string;
        summary: string;
    }[];
};

export const docsPages: DocPage[] = [
    {
        slug: "",
        title: "CodePiler docs",
        description:
            "Learn how CodePiler imports repositories, filters noisy files, builds prompt-ready output, and helps developers prepare better AI context from real codebases.",
        sections: [
            {
                id: "overview",
                heading: "What CodePiler does",
                body: [
                    "CodePiler converts a repository into structured prompt context. You import a folder or ZIP, inspect the repository tree, select the files that matter, wrap the output with a system prompt and task, and export in the format your workflow needs.",
                    "The application is optimized for repository understanding, debugging prompts, onboarding context, and AI-assisted documentation and refactoring work. Everything runs client-side — no files leave your browser."
                ]
            },
            {
                id: "workflow",
                heading: "Core workflow",
                body: [
                    "The typical flow is: import → search and filter → select files → set a token budget → add a prompt wrapper → export. The file tree and prompt viewer sit side by side so scope stays visible throughout.",
                    "This is the main advantage over manual copy-paste: the output stays grounded in the repository structure, the token count is always visible, and the full prompt — system instruction, code context, and task — is assembled in one place before you send it."
                ]
            },
            {
                id: "new-features",
                heading: "What's new",
                body: [
                    "Prompt wrapper: click the Prompt button in the viewer header to open a modal where you can add a system prompt (prepended) and a task (appended). Both sections ship with presets — 12 language-specific system prompts (JavaScript/TypeScript, Python, Go, Rust, Java, and more) and 12 common task templates (modularize, OOP refactor, write tests, security review, and more).",
                    "Token budget: select a model context limit from the dropdown next to the token chip — Claude 200K, GPT-4o 128K, Gemini 1M, GPT-3.5 16K — and a color-coded progress bar tracks your usage toward that limit in real time.",
                    "Selected files panel: a collapsible panel pinned to the bottom of the file tree lists every selected file with its individual token cost and a one-click remove button, so you can audit your selection without scrolling through the tree.",
                    "Separate preview and select: clicking a filename in the tree now previews it in the editor without automatically selecting it. Use the checkbox to include a file in the export. This makes it easy to inspect a file before deciding whether it belongs in the prompt.",
                    "Tree controls: Select All and Clear buttons let you include or exclude the entire repository with one click. Expand All and Collapse All buttons manage folder state across the full tree."
                ]
            }
        ],
        examples: [
            {
                title: "Debugging a multi-file bug",
                summary:
                    "Select the failing route, service layer, and supporting types. Add a debugging task preset, check the token budget fits your model, then export one focused prompt."
            },
            {
                title: "Understanding an unfamiliar codebase",
                summary:
                    "Use tree search to gather entrypoints, config, and key modules. Apply a General system prompt preset and export — the model gets full structural context in a single message."
            }
        ]
    },
    {
        slug: "uploading",
        title: "Uploading repositories",
        description:
            "Import repositories into CodePiler with folder upload or ZIP upload, understand filtering behavior, and prepare clean source context for prompt generation.",
        sections: [
            {
                id: "folder-upload",
                heading: "Folder upload",
                body: [
                    "Folder upload is ideal when the repository already exists locally. CodePiler reads file contents directly in the browser and preserves the directory structure for the tree explorer.",
                    "This mode is the fastest option during active development because there is no archive extraction step. After loading, CodePiler automatically pre-selects a focused set of source files to keep the initial token count manageable."
                ]
            },
            {
                id: "zip-upload",
                heading: "ZIP upload",
                body: [
                    "ZIP upload works well for repositories downloaded from GitHub or shared as archives. CodePiler extracts the archive client-side and keeps the project grouped under a stable root path.",
                    "Common build artifacts, binary assets, caches, and oversized files are filtered automatically before they reach the viewer."
                ]
            }
        ],
        faq: [
            {
                question: "Should I use folder upload or ZIP upload?",
                answer: "Use folder upload when you have the repository locally and want the simplest path. Use ZIP upload when the project arrives as an archive or when you want to share a self-contained snapshot."
            },
            {
                question: "Why are some files missing after upload?",
                answer: "CodePiler filters out common generated folders (node_modules, .git, dist, build), large files over 200 KB, binary assets, and non-source files to keep the workspace focused and prompt sizes manageable."
            },
            {
                question: "Can I upload multiple repositories?",
                answer: "Uploading a new repository replaces the current one. Save your session first if you want to come back to the current selection later."
            }
        ]
    },
    {
        slug: "viewer",
        title: "One File Viewer",
        description:
            "Explore the One File Viewer, switch formats, set a token budget, add a prompt wrapper, and navigate directly from the repository tree to matching content in the assembled output.",
        sections: [
            {
                id: "navigation",
                heading: "File preview vs. selection",
                body: [
                    "Clicking a filename in the repository tree previews it in the editor — the viewer scrolls to that file's section in the assembled output. This is a preview-only action and does not change your selection.",
                    "To include a file in the export, check its checkbox. This separation makes it easy to inspect a file before deciding whether it belongs in the prompt."
                ]
            },
            {
                id: "formats",
                heading: "Available formats",
                body: [
                    "Text format is optimized for direct prompting, JSON and XML are useful for structured tooling, and Markdown is a readable option for notes, docs, and shareable prompt context.",
                    "Switch formats at any time — the selection and prompt wrapper are preserved across format changes."
                ]
            },
            {
                id: "token-budget",
                heading: "Token budget",
                body: [
                    "The token chip in the viewer header shows the total token count for your current output, including any system prompt and task text from the prompt wrapper.",
                    "Use the model dropdown next to the chip to set a context limit: Claude 200K, GPT-4o 128K, Gemini 1M, or GPT-3.5 16K. A color-coded bar fills green → amber → red as you approach the limit, so you know when to trim before copying."
                ]
            },
            {
                id: "prompt-wrapper",
                heading: "Prompt wrapper",
                body: [
                    "Click the Prompt button in the header to open the prompt wrapper modal. The left panel is for a system prompt (prepended before all code) and the right panel is for a task (appended after all code).",
                    "Each panel has a preset dropdown. System prompt presets cover 12 languages and stacks — JavaScript/TypeScript, Python, Go, Rust, Java, C++, PHP, Ruby, Swift, Kotlin, React/Next.js, and a general polyglot option. Task presets cover 12 common operations: modularize, apply OOP, write tests, performance audit, security review, refactor for readability, add TypeScript types, document the code, find bugs, functional style, scalability, and code review.",
                    "Selecting a preset fills the textarea, which you can edit freely before exporting. Both sections contribute to the token count in real time."
                ]
            }
        ],
        examples: [
            {
                title: "Prepare a refactor brief",
                summary:
                    "Filter to a service cluster, apply the Refactor for readability task preset, switch to Markdown, and export a readable prompt bundle."
            },
            {
                title: "Security audit",
                summary:
                    "Select auth routes, middleware, and config files. Apply the Security review task preset with a language-specific system prompt, then paste the output into your model."
            }
        ],
        faq: [
            {
                question: "Why use One File Viewer instead of opening the source files directly?",
                answer: "The viewer shows the exact prompt output — system instruction, code, and task — not just the underlying files. That makes it easy to validate scope, token usage, and final wording before you export."
            },
            {
                question: "Does the prompt wrapper affect the file format output?",
                answer: "Yes. The system prompt is placed before the formatted code block and the task is placed after it, separated by blank lines. The combined result is what gets copied or downloaded."
            },
            {
                question: "Are token counts accurate for Claude models?",
                answer: "CodePiler uses a GPT-compatible tokenizer (tiktoken cl100k_base). Claude uses a similar but slightly different tokenizer, so counts may differ by a few percent. Treat the budget bar as a close estimate, not an exact limit."
            }
        ]
    },
    {
        slug: "examples",
        title: "Examples and FAQ",
        description:
            "See practical CodePiler use cases and common questions about filtering, prompt scope, the prompt wrapper, and how to build better repository context for AI tools.",
        sections: [
            {
                id: "examples",
                heading: "Practical use cases",
                body: [
                    "A common use case is isolating only the modules involved in an error, applying the Find and fix bugs task preset, and sending one focused prompt to the model instead of pasting files one by one.",
                    "Another pattern is onboarding: gather entrypoints, routing, schema files, and configuration, apply a General system prompt preset, and ask the model for an architecture walkthrough.",
                    "For refactoring sessions, pick the relevant feature folder, apply a language-specific system prompt and the Refactor for readability or Apply OOP principles task, and use the token budget to confirm the prompt fits inside your chosen model's context window."
                ]
            },
            {
                id: "scope",
                heading: "Choosing the right prompt scope",
                body: [
                    "Large prompts are not automatically better. In most sessions, the best result comes from selecting the files closest to the behavior, interface, or subsystem under discussion.",
                    "Use the selected files panel at the bottom of the tree to audit exactly what is included and remove anything that adds noise. Use the token budget bar to confirm the selection fits comfortably inside the model's context window before exporting."
                ]
            },
            {
                id: "prompt-tips",
                heading: "Getting the most from the prompt wrapper",
                body: [
                    "System prompt presets are a starting point, not a final answer. After selecting a language preset, customize it to match the specific framework, patterns, or constraints visible in the codebase.",
                    "Task presets work best when combined with a focused file selection. A security review prompt sent with 80 files is less effective than one sent with the 8 files that handle authentication and input validation.",
                    "If you are using a model with a large context window (Gemini 1M, Claude 200K), you can afford a broader selection. For smaller windows, use the token budget bar to stay under 70% to leave room for the model's response."
                ]
            }
        ],
        examples: [
            {
                title: "Trace an auth flow",
                summary:
                    "Search for auth-related files, select the route, middleware, and service layer. Apply the Security review task preset with a language-specific system prompt, then export."
            },
            {
                title: "Document a feature slice",
                summary:
                    "Select one feature folder, supporting types, and relevant config. Apply the Document the code task preset and export a structured snapshot for documentation drafting."
            },
            {
                title: "Onboard a new team member",
                summary:
                    "Use Select All on the src/ folder, trim heavy files with the size manager, apply a General system prompt, and export a full architecture overview prompt."
            }
        ],
        faq: [
            {
                question: "Should I include every dependency file in the prompt?",
                answer: "Usually no. Include the files that define the behavior, contracts, or data flow you want the model to reason about. Too much unrelated code dilutes the result and wastes context."
            },
            {
                question: "Can I reuse the same repository export across models?",
                answer: "Yes. Keep the same selection set and change the export format or adjust the system prompt preset based on the tool you plan to use."
            },
            {
                question: "How do I quickly switch between different task prompts?",
                answer: "Open the prompt wrapper modal, click the Task presets dropdown, and select a new preset. It overwrites the current task text. You can then edit the result before closing the modal."
            },
            {
                question: "Can I save a session that includes my prompt wrapper?",
                answer: "Currently saved sessions store the file selection and repository. The prompt wrapper text is session-level state and resets on page reload. Copy your custom prompts to a text file if you want to reuse them."
            }
        ]
    }
];

export function getDocPage(slug?: string) {
    return docsPages.find((page) => page.slug === (slug ?? "")) ?? null;
}
