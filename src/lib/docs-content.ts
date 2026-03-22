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
                    "CodePiler converts a repository into structured prompt context. You import a folder or ZIP, inspect the repository tree, select the files that matter, and export the result in the format your workflow needs.",
                    "The application is optimized for repository understanding, debugging prompts, onboarding context, and AI-assisted documentation work."
                ]
            },
            {
                id: "workflow",
                heading: "Core workflow",
                body: [
                    "The typical flow is import, review, search, select, inspect, and export. The product keeps the file tree and prompt viewer side by side so scope stays visible throughout the session.",
                    "This is the main advantage over manual copy-paste: the output remains grounded in the repository structure instead of becoming a loose collection of snippets."
                ]
            }
        ],
        examples: [
            {
                title: "Debugging a multi-file bug",
                summary:
                    "Select the failing route, service layer, and supporting types, then export one focused prompt for the LLM instead of pasting files one by one."
            },
            {
                title: "Understanding an unfamiliar codebase",
                summary:
                    "Use the repo tree and search to gather the entrypoints, config, and key modules, then ask the model for a high-level system explanation."
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
                    "This mode is the fastest option during active development because there is no archive extraction step."
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
                answer: "CodePiler filters out common generated folders, large files, caches, and non-source assets to keep the workspace focused and prompt sizes manageable."
            }
        ]
    },
    {
        slug: "viewer",
        title: "One File Viewer",
        description:
            "Explore the One File Viewer, switch formats, track token counts, and navigate directly from the repository tree to matching content in the assembled output.",
        sections: [
            {
                id: "navigation",
                heading: "File-to-viewer navigation",
                body: [
                    "Clicking a file in the repository tree focuses that file inside the assembled output. The viewer scrolls to the matching section and keeps the active file visible through a path chip at the top.",
                    "This works across text, JSON, XML, and Markdown so you can verify that the right file is represented before exporting."
                ]
            },
            {
                id: "formats",
                heading: "Available formats",
                body: [
                    "Text format is optimized for direct prompting, JSON and XML are useful for structured tooling, and Markdown is a readable option for notes, docs, and shareable prompt context.",
                    "The token counter helps estimate prompt size before sending the output to an LLM."
                ]
            }
        ],
        examples: [
            {
                title: "Prepare a refactor brief",
                summary:
                    "Filter down to a service cluster, switch to Markdown, and export a readable prompt bundle for a model-assisted refactor request."
            },
            {
                title: "Build onboarding notes",
                summary:
                    "Collect the entrypoint files, routing, and configuration modules, then export a single file for onboarding explanations or architecture notes."
            }
        ],
        faq: [
            {
                question: "Why use One File Viewer instead of opening the source files directly?",
                answer: "The viewer shows the exact prompt output, not just the underlying repository files. That makes it easier to validate selection scope, order, and token usage before you export."
            }
        ]
    },
    {
        slug: "examples",
        title: "Examples and FAQ",
        description:
            "See practical CodePiler use cases and common questions about filtering, prompt scope, and how to build better repository context for AI tools.",
        sections: [
            {
                id: "examples",
                heading: "Practical use cases",
                body: [
                    "A common use case is isolating only the modules involved in an error before asking the model to debug the issue. Another is packaging entrypoints, schemas, and config into a prompt for onboarding or architecture explanation.",
                    "The main pattern is the same: reduce noise first, then export only the files that support the question you want the AI to answer."
                ]
            },
            {
                id: "scope",
                heading: "Choosing the right prompt scope",
                body: [
                    "Large prompts are not automatically better. In most sessions, the best result comes from selecting the files closest to the behavior, interface, or subsystem under discussion.",
                    "Use tree search and file clicks to validate that the final output contains the exact code path you meant to include."
                ]
            }
        ],
        examples: [
            {
                title: "Trace an auth flow",
                summary:
                    "Search for auth-related files, select the route, middleware, and service layer, then ask the model for a flow explanation or bug analysis."
            },
            {
                title: "Document a feature slice",
                summary:
                    "Select one feature folder, supporting types, and relevant config, then export a structured snapshot for documentation drafting."
            }
        ],
        faq: [
            {
                question: "Should I include every dependency file in the prompt?",
                answer: "Usually no. Include the files that define the behavior, contracts, or data flow you want the model to reason about. Too much unrelated code can dilute the result."
            },
            {
                question: "Can I reuse the same repository export across models?",
                answer: "Yes. That is one reason the format switcher exists. You can keep the same selection set and change the export format based on the tool you plan to use."
            }
        ]
    }
];

export function getDocPage(slug?: string) {
    return docsPages.find((page) => page.slug === (slug ?? "")) ?? null;
}
