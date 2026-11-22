export type DocPage = {
    slug: string;
    title: string;
    description: string;
    sections: {
        id: string;
        heading: string;
        body: string[];
        /** Optional bullet list rendered after the paragraphs. */
        list?: string[];
    }[];
    faq?: {
        question: string;
        answer: string;
    }[];
    examples?: {
        title: string;
        summary: string;
        /** Optional link to a longer guide or prompt page. */
        href?: string;
        linkLabel?: string;
    }[];
};

export const docsPages: DocPage[] = [
    {
        slug: "",
        title: "Getting started",
        description:
            "CodePiler helps you ask AI about your code with only the files that matter. Pick the files your question is about, add the question, and copy one clean prompt into ChatGPT, Claude, Gemini or any other model.",
        sections: [
            {
                id: "what-it-is",
                heading: "What CodePiler is for",
                body: [
                    "When you ask an AI about code, the answer is only as good as the context you give it. Paste too little and the model guesses; paste the whole repository and your question gets buried in unrelated code, hits context limits, and costs more.",
                    "CodePiler is the step in between. You import a project, tick the files that are relevant to your question, write the question, and CodePiler combines it all into one prompt with every file labelled by its path. You then paste that prompt into the AI tool you already use."
                ]
            },
            {
                id: "quickstart",
                heading: "Your first prompt in two minutes",
                body: ["You don't need an account or any setup."],
                list: [
                    "Open the app and drop a project folder or .zip onto the import area. No project handy? Click “Try a sample project”.",
                    "CodePiler skips dependencies, build output and binaries, and pre-selects key files so you start from a sensible selection.",
                    "In the file tree, untick what isn't relevant and tick what is. Click a file name to read it before deciding. The token count updates as you go.",
                    "Click “Add instructions” and write your question in the Task box, or pick a task preset such as “Find and fix bugs”.",
                    "Click “Copy prompt” and paste it into ChatGPT, Claude, Gemini or any other AI chat."
                ]
            },
            {
                id: "privacy",
                heading: "Where your code goes",
                body: [
                    "Nowhere. CodePiler has no backend. Folders and ZIP files are read by your browser, and the prompt is built on your machine. Your code only leaves your computer when you paste the prompt into an AI tool yourself.",
                    "Saved sessions are stored in your browser's local storage on this device. Clearing site data removes them."
                ]
            },
            {
                id: "next",
                heading: "Where to go next",
                body: [
                    "Importing a project explains what gets skipped and why. The workspace guide covers every control in the file tree and the prompt viewer. Asking good questions shows how to choose files and write prompts that get useful answers."
                ]
            }
        ]
    },
    {
        slug: "uploading",
        title: "Importing a project",
        description:
            "Import a folder or ZIP, see exactly which files CodePiler skips, and understand how the starting selection is chosen.",
        sections: [
            {
                id: "ways-to-import",
                heading: "Ways to import",
                body: [
                    "On the home page or in the empty workspace, drop a folder or a single .zip file onto the import area, or use the buttons:"
                ],
                list: [
                    "Choose folder: best for a project already on your machine. Nothing needs to be extracted.",
                    "Choose .zip: best for an archive, for example one downloaded from GitHub with Code → Download ZIP. It is unpacked in your browser.",
                    "Try a sample project: loads a small Express + TypeScript todo API so you can try the full workflow without your own code."
                ]
            },
            {
                id: "skipped-files",
                heading: "What gets skipped",
                body: [
                    "To keep the tree focused on source code, CodePiler leaves these out while importing. After an import, a summary shows how many files were loaded and how many were skipped."
                ],
                list: [
                    "Dependency, build and cache folders: node_modules, .git, .next, dist, build, out, target, coverage, vendor, venv / .venv, __pycache__, .gradle, .idea, .vscode and similar.",
                    "Binary and media files: images, video, audio, fonts, archives, PDFs, compiled files (.class, .pyc, .dll, .so, .exe, .jar) and databases.",
                    "Anything matched by the .gitignore file at the project root.",
                    "Any single file larger than 200 KB.",
                    "OS clutter such as .DS_Store and Thumbs.db."
                ]
            },
            {
                id: "starting-selection",
                heading: "The starting selection",
                body: [
                    "Right after import, CodePiler pre-selects key files so you aren't starting from nothing. It prefers the README, files under src/, app/ and components/, package.json and config files, then other source files. It stops at about 140 files or roughly 220,000 characters of code.",
                    "Treat this as a starting point, not a recommendation for your question. For a focused prompt, click Clear in the file tree and tick only the files you need."
                ]
            }
        ],
        faq: [
            {
                question: "A file I need is missing from the tree. Why?",
                answer: "It was probably skipped by one of the rules above: it's in a build or dependency folder, matched by your .gitignore, a binary type, or over 200 KB. Very large source files are usually generated or minified, so they rarely help in a prompt anyway."
            },
            {
                question: "Are .gitignore files in subfolders respected?",
                answer: "No. Only the .gitignore at the root of the imported folder or ZIP is applied. Files ignored only by a nested .gitignore will show up in the tree, where you can leave them unticked."
            },
            {
                question: "Can I work with two projects at once?",
                answer: "No. Importing a new project replaces the current one. Click Save first if you want to come back to your current selection."
            },
            {
                question: "Dropping a folder doesn't work in my browser. What can I do?",
                answer: "Use the Choose folder button instead, or zip the folder and use Choose .zip. Folder drag-and-drop support varies between browsers."
            }
        ]
    },
    {
        slug: "viewer",
        title: "Workspace guide",
        description:
            "Every control in the CodePiler workspace: the file tree on the left, the combined prompt on the right, instructions, token budget, export and saved sessions.",
        sections: [
            {
                id: "file-tree",
                heading: "Choosing files",
                body: [
                    "The left panel lists every imported file, with a token count on each file and folder so you can see what something costs before you include it. Switch between two views at the top:"
                ],
                list: [
                    "Tree: your project's folders. Tick a checkbox to include a file or a whole folder. Use the arrow buttons next to the switch to expand or collapse every folder.",
                    "By size: a flat list sorted by tokens, largest first, with a bar showing how heavy each file is. Click the File, Size or Tokens header to sort by that column. This is the quickest way to find and untick the files that bloat your prompt.",
                    "In either view, click a file name to read it. If the file is selected, the prompt scrolls to it. If not, it opens on its own as a preview, and your selection doesn't change."
                ]
            },
            {
                id: "filters",
                heading: "Search and filters",
                body: [
                    "Filters change which files are shown, not which are selected. Search and type apply to both views; the token range is part of the By size view."
                ],
                list: [
                    "Search: type part of a file or folder name.",
                    "Type: click one or more extension chips, such as .ts or .py, to show only those files. The number on each chip is how many files have that type. Click All to clear it.",
                    "Tokens (By size view): enter a min and/or max to show only files in that range. For example, set min to 5000 to see just the big files.",
                    "Select shown / Deselect shown: while a filter is on, these act on exactly the files you can see. For example, choose .ts and then Select shown, or set min to 5000 and then Deselect shown. With no filter they read Select all and Clear.",
                    "Reset clears every filter at once. After any bulk select or deselect, Undo appears for a few seconds in case you change your mind."
                ]
            },
            {
                id: "selected-files",
                heading: "Selected files panel",
                body: [
                    "The bar at the bottom of the panel shows how many files are selected and their total tokens. Click Show to list them, then click a file to jump to it in the prompt or × to deselect it. The list starts collapsed so the file tree gets the space."
                ]
            },
            {
                id: "instructions",
                heading: "Instructions: system prompt and task",
                body: [
                    "Click “Add instructions” in the viewer header. The System prompt box is placed before your code and sets the AI's role. The Task box is placed after your code and is where your question goes. Both are optional and both count toward the token total.",
                    "Each box has presets you can use as-is or edit. The 12 system prompt presets cover JavaScript / TypeScript, Python, Java / Spring, Go, Rust, C++, PHP / Laravel, Ruby / Rails, Swift / iOS, Kotlin / Android, React / Next.js and a general option. The 18 task presets include Find and fix bugs, Code review, Write unit tests, Security review, Performance audit, Refactor for readability, Document the code, Generate API documentation and more.",
                    "Once instructions are set, the button shows which presets are in use."
                ]
            },
            {
                id: "formats",
                heading: "Output formats",
                body: [
                    "Switch the format with the tabs above the prompt. Changing format keeps your selection and instructions."
                ],
                list: [
                    "Text: each file starts with a “===== FILE: path =====” header. The best default for pasting into a chat.",
                    "Markdown: each file under a heading in a fenced code block. Easy to read and share.",
                    'XML: each file in a <file path="…"> element. Some models, Claude especially, follow XML-tagged context well.',
                    "JSON: an array of { path, content } objects, for scripts and tooling."
                ]
            },
            {
                id: "token-budget",
                heading: "Token count and model budget",
                body: [
                    "The token chip in the viewer header shows the size of the whole prompt: system prompt, code and task. Pick a model from the dropdown next to it and a bar shows how much of that model's context window you're using, moving from green to amber to red as you approach the limit.",
                    "Counts come from the o200k_base tokenizer used by recent OpenAI models. Other providers tokenize differently, so for Claude, Gemini and open-weight models treat the number as a close estimate."
                ]
            },
            {
                id: "export",
                heading: "Copy and download",
                body: [
                    "Copy prompt puts the full prompt on your clipboard. If your browser blocks clipboard access, the button says so. Use Download instead, which saves the prompt as a file in the current format."
                ]
            },
            {
                id: "sessions",
                heading: "Saved sessions",
                body: [
                    "Click Save to store the imported files and your current selection under a name. Open Sessions to restore one later without importing again, or to delete old ones.",
                    "Sessions are kept in your browser's local storage, which has a limited size (often around 5 MB). If a project is too large to save, CodePiler tells you instead of failing silently. Instructions are not saved with a session, so keep custom prompts you want to reuse somewhere else."
                ]
            },
            {
                id: "tutorial",
                heading: "Guided tour",
                body: [
                    "Click Tutorial in the header of the app at any time for a short walkthrough of the workspace."
                ]
            }
        ],
        faq: [
            {
                question: "Does the order of files in the prompt matter?",
                answer: "Files are added in the order they were imported. Most models handle any order well. What matters more is that the files are relevant and that your question comes after the code, which is where the Task box puts it."
            },
            {
                question: "How much of the context window should I use?",
                answer: "Leave headroom for the answer and for follow-up questions. Even with a 1M-token model, a focused prompt of a few thousand to a few tens of thousands of tokens usually gets a sharper answer than a huge one."
            }
        ]
    },
    {
        slug: "examples",
        title: "Asking good questions",
        description:
            "How to choose the right files and write a question that gets a useful answer, with recipes for debugging, reviews, tests and learning a codebase.",
        sections: [
            {
                id: "choosing-files",
                heading: "Choosing the right files",
                body: [
                    "Start from the code your question is about and add only what the AI needs to understand it. A good selection usually includes:"
                ],
                list: [
                    "The file where the behavior lives, such as the function or component in question.",
                    "Its contracts: the types, interfaces or schema it uses.",
                    "One level of callers or callees, such as the route that calls the service.",
                    "The related test, if there is one. It shows the AI what “correct” means.",
                    "Config only when it affects the behavior, for example a build or framework setting."
                ]
            },
            {
                id: "writing-the-question",
                heading: "Writing the question",
                body: [
                    "Put your question in the Task box so it comes after the code. Be specific. Compare “Fix my todo app” with “Calling deleteTodo with an id that doesn't exist removed a different todo. Why, and how do I fix it?”. The second gets a precise answer on the first try.",
                    "For bugs, include what you did, what you expected and what actually happened, plus any error message or stack trace. For changes, say what must not change, such as the public API, the existing tests or the style of the codebase.",
                    "Presets are a good starting point. Pick one, then add a line about your specific situation."
                ]
            }
        ],
        examples: [
            {
                title: "Debug a multi-file bug",
                summary:
                    "Select the failing route, the service it calls and the shared types. Paste the error into the Task box with what you expected to happen, or start from the Find and fix bugs preset.",
                href: "/guides/debug-multi-file-bug-with-ai"
            },
            {
                title: "Review a change before you merge",
                summary:
                    "Select only the files you changed plus the interfaces they touch. Use the Code review preset and add one line on what the change is meant to do.",
                href: "/guides/ai-code-review-before-merge"
            },
            {
                title: "Write tests for existing code",
                summary:
                    "Select the module and one existing test file so the AI copies your test style and framework. Use the Write unit tests preset.",
                href: "/guides/write-unit-tests-with-ai"
            },
            {
                title: "Understand an unfamiliar codebase",
                summary:
                    "Select the README, entry points, routing and main config. Ask for an architecture walkthrough and which files to read first, then ask follow-ups with narrower selections.",
                href: "/guides/understand-unfamiliar-codebase-with-ai"
            },
            {
                title: "Security pass on auth",
                summary:
                    "Search for auth, session and middleware files and select them with any input validation code. Use the Security review preset with the system prompt for your language.",
                href: "/prompts/security-review",
                linkLabel: "See the Security review prompt"
            },
            {
                title: "Plan a refactor",
                summary:
                    "Select one feature folder and its types. Use Refactor for readability or Modularize the codebase, and ask for a step-by-step plan before asking for code.",
                href: "/prompts/refactor-for-readability",
                linkLabel: "See the Refactor for readability prompt"
            }
        ],
        faq: [
            {
                question: "Should I include every file the code depends on?",
                answer: "Usually not. Include what defines the behavior, contracts and data flow you're asking about. If the answer shows the AI is missing something, add that file and ask again."
            },
            {
                question: "Can I reuse the same selection for several questions?",
                answer: "Yes. Keep the selection, change the Task text, and copy again. Save the session if you'll come back to it on another day."
            },
            {
                question: "Which format should I use?",
                answer: "Text works well everywhere. Try XML with Claude, and Markdown if you'll also read the prompt yourself or share it."
            }
        ]
    }
];

export function getDocPage(slug?: string) {
    return docsPages.find((page) => page.slug === (slug ?? "")) ?? null;
}
