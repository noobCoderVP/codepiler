import type { DocPage } from "./docs-content";

export type Guide = DocPage & {
    /** Shorter label for cards and links. */
    shortTitle: string;
    /** Slugs of related prompt library pages. */
    prompts: string[];
};

export const guides: Guide[] = [
    {
        slug: "share-codebase-with-ai",
        shortTitle: "Give an AI your codebase",
        title: "How to Give ChatGPT, Claude or Gemini Your Codebase",
        description:
            "AI chats can't open your repository. Here is how to turn the relevant part of a codebase into one prompt you can paste into ChatGPT, Claude or Gemini, without uploading anything.",
        prompts: ["code-review", "general"],
        sections: [
            {
                id: "the-problem",
                heading: "Why you can't just point the AI at your repo",
                body: [
                    "Chat assistants only see what you paste or attach. They can't browse your folders, and attaching files one at a time is slow, loses the folder structure, and makes it easy to forget the one file that explains the bug.",
                    "The opposite approach, pasting the whole repository, rarely works either. Real projects include dependencies, build output, lock files and assets that add tokens without adding meaning. Even with a large context window, a question surrounded by thousands of unrelated lines gets a vaguer answer, and on a paid API you pay for every one of those tokens."
                ]
            },
            {
                id: "what-a-good-prompt-looks-like",
                heading: "What a good codebase prompt looks like",
                body: [
                    "The most reliable format is a single block of text that contains the files that matter, each labelled with its path, followed by your question. The paths matter: they let the model understand how files relate, and they let it point to exact locations in its answer.",
                    "In CodePiler's Text format each file starts with a header like “===== FILE: src/services/todo-service.ts =====”, so the model always knows which file it is reading. Markdown, XML and JSON formats carry the same information in different wrappers. XML tags in particular are something Claude follows well."
                ]
            },
            {
                id: "step-by-step",
                heading: "Step by step with CodePiler",
                body: [
                    "CodePiler runs entirely in your browser, so none of these steps upload your code anywhere."
                ],
                list: [
                    "Open the app and drop your project folder or a .zip onto the import area. A ZIP downloaded from GitHub works too.",
                    "CodePiler skips node_modules, build folders, binaries, anything in your root .gitignore and files over 200 KB, then pre-selects key files as a starting point.",
                    "Click Clear and tick only the files your question is about. Every file and folder shows its token count, so you can see what each one costs.",
                    "Click “Add instructions” and write your question in the Task box. It is placed after the code, which is where models expect the question.",
                    "Click “Copy prompt” and paste into ChatGPT, Claude, Gemini or any other chat."
                ]
            },
            {
                id: "how-many-files",
                heading: "How many files should you include?",
                body: [
                    "Fewer than you think. Start with the file where the behavior lives, the types or interfaces it depends on, and one level of callers or callees. Add the related test if there is one. That is usually somewhere between three and fifteen files.",
                    "If the model's answer shows it is missing something, such as a helper it had to guess at, add that file and ask again. It is faster than starting with everything and hoping the model finds the right part."
                ]
            },
            {
                id: "context-windows",
                heading: "Staying inside the context window",
                body: [
                    "Pick your model in the dropdown next to the token chip and CodePiler shows how much of that model's context window the prompt uses. Leave plenty of room: the model needs space for its answer and for any follow-up questions in the same chat.",
                    "Token counts use the o200k_base tokenizer from recent OpenAI models. Claude, Gemini and open-weight models tokenize a little differently, so treat the number as a close estimate for them."
                ]
            }
        ],
        faq: [
            {
                question: "Is it safe to paste company code into an AI chat?",
                answer: "That depends on your company's policy and the AI provider's data terms, not on CodePiler. CodePiler itself never uploads your files. Your code leaves your machine only when you paste the prompt into an AI tool yourself."
            },
            {
                question: "Can I use this with a local model?",
                answer: "Yes. The output is plain text, Markdown, XML or JSON, so it works with any chat interface or script, including models running on your own machine."
            },
            {
                question: "What about private GitHub repositories?",
                answer: "Clone the repository or download it as a ZIP, then import the folder or ZIP. CodePiler reads it locally and never needs access to your GitHub account."
            }
        ]
    },
    {
        slug: "reduce-ai-token-costs-for-code",
        shortTitle: "Cut token costs",
        title: "How to Cut Token Costs When Asking AI About Code",
        description:
            "Most of a pasted repository is tokens the model doesn't need. Learn where those tokens come from and how to send only the code your question is about.",
        prompts: ["find-and-fix-bugs", "code-review"],
        sections: [
            {
                id: "where-tokens-go",
                heading: "Where the tokens go",
                body: [
                    "On a paid API every input token is billed, and in a chat app a large prompt uses up your context window and usage limits faster. When you paste code into an AI, the biggest costs usually come from files that have nothing to do with the question:"
                ],
                list: [
                    "Lock files and generated code, which are long and almost never relevant.",
                    "Large data, fixture and snapshot files.",
                    "Whole feature folders included because one file in them matters.",
                    "Repeated runs of the same question with the full repo attached each time."
                ]
            },
            {
                id: "measure-first",
                heading: "Measure before you trim",
                body: [
                    "You can't cut what you can't see. CodePiler shows a token count on every file and folder in the tree, plus a running total for the whole prompt.",
                    "Switch the file panel to By size to get a flat list sorted by tokens, largest first. The heaviest files are at the top, and they are often the least relevant. Set a minimum in the token range, for example 5,000, to see only the big files, then use Deselect shown to drop them all at once. If you remove too much, Undo appears for a few seconds."
                ]
            },
            {
                id: "select-by-question",
                heading: "Select by question, not by folder",
                body: [
                    "A focused selection follows the code path your question touches: the entry point, the function or component in question, the types it uses and the test that defines correct behavior. Everything else is optional.",
                    "Use search to find files by name, and type chips such as .ts or .py to hide everything else. With a filter on, Select shown and Deselect shown act only on the files you can see."
                ]
            },
            {
                id: "keep-instructions-lean",
                heading: "Keep instructions lean too",
                body: [
                    "System prompts and tasks count toward the total. CodePiler's presets are detailed on purpose, but if you only need one part of a preset, such as the bug categories from Find and fix bugs, edit the text down before you copy. The token chip updates as you type."
                ]
            },
            {
                id: "reuse",
                heading: "Reuse a selection instead of rebuilding it",
                body: [
                    "If you ask several questions about the same area of code, keep the selection and change only the Task text between copies. Click Save to store the project and selection as a session in your browser, so you can come back to it later without importing again."
                ]
            }
        ],
        faq: [
            {
                question: "Does a smaller prompt make the answer worse?",
                answer: "Usually the opposite, as long as the relevant files are included. Removing unrelated code gives the model less to get distracted by. If the answer shows a missing piece, add that one file."
            },
            {
                question: "Are the token counts exact?",
                answer: "They are exact for models that use OpenAI's o200k_base tokenizer and a close estimate for Claude, Gemini and open-weight models, which tokenize slightly differently."
            }
        ]
    },
    {
        slug: "debug-multi-file-bug-with-ai",
        shortTitle: "Debug a multi-file bug",
        title: "How to Debug a Multi-File Bug With AI",
        description:
            "Bugs that span a route, a service and shared types are where AI chats struggle most. Here is how to give the model exactly the code path and the evidence it needs.",
        prompts: ["find-and-fix-bugs", "general"],
        sections: [
            {
                id: "why-hard",
                heading: "Why multi-file bugs trip up AI",
                body: [
                    "When the bug lives in the interaction between files, such as a route passing the wrong value to a service, or a type that allows a state the code doesn't handle, pasting just the file with the error gives the model half the story. It will fix the symptom it can see and miss the cause in the file it can't."
                ]
            },
            {
                id: "pick-the-path",
                heading: "Select the code path, not the folder",
                body: [
                    "Trace the request or event from where it enters to where it goes wrong, and select those files:"
                ],
                list: [
                    "The entry point: the route handler, CLI command, event listener or component that starts the flow.",
                    "Each function the flow passes through, up to the place where the wrong result appears.",
                    "The shared types, interfaces or schema those files use. Many bugs are a mismatch between what a type allows and what the code expects.",
                    "The test that covers this behavior, if one exists, even if it is currently passing."
                ]
            },
            {
                id: "give-evidence",
                heading: "Give the model evidence",
                body: [
                    "In the Task box, describe what you did, what you expected and what actually happened. Paste the exact error message or stack trace. Include the input that triggers the bug if you know it.",
                    "A specific question gets a specific answer. “Why is my todo app broken?” invites guesses. “Calling deleteTodo with an id that doesn't exist removed a different todo. Why, and how do I fix it?” points the model straight at the logic it needs to check."
                ]
            },
            {
                id: "use-the-preset",
                heading: "Start from the Find and fix bugs preset",
                body: [
                    "If you don't have a specific symptom yet, the Find and fix bugs task preset asks the model to look for logic errors, edge cases, race conditions and incorrect assumptions, ranked by severity. Pair it with the system prompt for your language so the model checks for that language's common pitfalls. Add one line describing the behavior you're seeing."
                ]
            },
            {
                id: "iterate",
                heading: "Iterate with narrower selections",
                body: [
                    "Once the model identifies the likely cause, narrow the selection to the files involved in the fix and ask for the change itself. A smaller prompt for the follow-up keeps the answer focused and makes it easier to check."
                ]
            }
        ],
        faq: [
            {
                question: "Should I include logs?",
                answer: "Include the relevant lines, such as the error and a few lines around it, in the Task box. Whole log files are usually noise."
            },
            {
                question: "The model suggested a fix in a file I didn't include. What now?",
                answer: "It is guessing about that file's contents. Add the file to your selection and ask again so the fix is based on the real code."
            }
        ]
    },
    {
        slug: "ai-code-review-before-merge",
        shortTitle: "AI code review before merge",
        title: "How to Get a Useful AI Code Review Before You Merge",
        description:
            "Get a focused AI review of a change by sending the files you touched plus the contracts around them, with a review prompt that asks for specific, prioritized feedback.",
        prompts: ["code-review", "security-review"],
        sections: [
            {
                id: "scope",
                heading: "Review the change, not the codebase",
                body: [
                    "A review is most useful when it is about what you just changed. Select the files you modified, then add the interfaces, types or schema those files depend on so the model can check that the change respects them. Leave out the rest.",
                    "Use your diff or git status as a checklist. In CodePiler, search for each changed file by name and tick it, or use type chips to narrow the tree first."
                ]
            },
            {
                id: "say-what-it-should-do",
                heading: "Say what the change is meant to do",
                body: [
                    "A reviewer who doesn't know the intent can only comment on style. Add a line to the Task box such as “This change adds pagination to the todo list endpoint. Existing clients must keep working without a page parameter.” Now the model can check the change against a goal and against constraints."
                ]
            },
            {
                id: "use-the-preset",
                heading: "Use the Code review preset",
                body: [
                    "The Code review task preset asks for a direct, prioritized review of the kind a senior engineer gives a teammate: correctness, design, readability and test coverage, with concrete line-level suggestions instead of general advice. Combine it with the system prompt for your language or framework, such as React / Next.js or Python, so the review applies that ecosystem's conventions.",
                    "For changes that touch authentication, payments or user input, run a second pass with the Security review preset."
                ]
            },
            {
                id: "act-on-it",
                heading: "Act on the review",
                body: [
                    "Treat the review as a list of questions to check, not a list of facts. Confirm each issue against the code, fix what is real, and ask follow-ups about anything you disagree with. For a fix, narrow the selection to the affected file and ask for the specific change."
                ]
            }
        ],
        faq: [
            {
                question: "Can AI replace human code review?",
                answer: "It works best as a first pass that catches mechanical issues before a teammate looks, so the human review can focus on design and intent."
            },
            {
                question: "Should I include tests in the review?",
                answer: "Yes, include the tests you added or changed. Reviewers, human or AI, often find the most important gaps by comparing the code to its tests."
            }
        ]
    },
    {
        slug: "write-unit-tests-with-ai",
        shortTitle: "Write unit tests with AI",
        title: "How to Write Unit Tests With AI That Match Your Codebase",
        description:
            "AI-written tests are only useful if they fit your framework, style and real edge cases. Here is how to select the right files so the model writes tests you'd actually keep.",
        prompts: ["write-unit-tests", "find-and-fix-bugs"],
        sections: [
            {
                id: "the-problem",
                heading: "Why AI tests often miss the mark",
                body: [
                    "Ask for tests with only the module attached and the model has to guess your test framework, your file layout, how you mock dependencies and what your helpers are called. The result compiles in someone else's project, not yours."
                ]
            },
            {
                id: "what-to-select",
                heading: "What to select",
                body: ["Give the model the code under test and an example of how your team tests:"],
                list: [
                    "The module you want tested.",
                    "The types or interfaces it uses, so the model knows the valid inputs and outputs.",
                    "One existing test file from the same project, ideally for a similar module. This is the single most useful file for getting tests in your style.",
                    "Shared test helpers or fixtures, if your tests use them.",
                    "The test config, such as jest, vitest or pytest settings, only if it affects how tests are written."
                ]
            },
            {
                id: "ask",
                heading: "Ask for the right tests",
                body: [
                    "Start from the Write unit tests task preset. It asks for tests that give real confidence in correctness rather than coverage numbers, including edge cases, error paths and boundary values. Then add specifics in the Task box: which functions to focus on, which framework and assertion style to use, and any behavior that is known to be fragile."
                ]
            },
            {
                id: "check",
                heading: "Run them and check what they assert",
                body: [
                    "Run the generated tests before keeping them. A test that fails might have found a real bug, or the model might have misunderstood the intended behavior. Either way it is worth a look. Also read what each test asserts: a passing test that checks the wrong thing is worse than no test."
                ]
            }
        ],
        faq: [
            {
                question: "My project has no tests yet. What should I include?",
                answer: "Include the module and its types, and say in the Task box which framework you want to use. Ask the model to set up one test file first, review it, then ask for more using that file as the example."
            },
            {
                question: "Can I ask for tests for a whole folder at once?",
                answer: "You can, but answers stay sharper when you test one module at a time. Keep the example test file selected and change the module between requests."
            }
        ]
    },
    {
        slug: "understand-unfamiliar-codebase-with-ai",
        shortTitle: "Understand a new codebase",
        title: "How to Understand an Unfamiliar Codebase With AI",
        description:
            "Joining a project or reading open-source code? Use AI to get an architecture overview first, then go deeper one area at a time with focused selections.",
        prompts: ["document-the-code", "general"],
        sections: [
            {
                id: "start-wide",
                heading: "Start with the map, not the details",
                body: [
                    "For the first question, select the files that describe the project rather than implement it:"
                ],
                list: [
                    "The README and any architecture or contributing docs.",
                    "Package manifests such as package.json, pyproject.toml, go.mod or Cargo.toml, which list the frameworks and libraries in use.",
                    "Entry points: the main file, server setup, app router or CLI definition.",
                    "Routing or top-level module files that show how the app is divided."
                ]
            },
            {
                id: "first-question",
                heading: "Ask for an architecture walkthrough",
                body: [
                    "Ask the model to explain the overall architecture, how a typical request or user action flows through the system, and which files you should read first for the area you need to work on. The Document the code task preset produces a structured overview of modules, data flow and key exports if you want something more thorough.",
                    "CodePiler's starting selection after import, which prefers the README, source folders and config files, is a reasonable first prompt for this question on its own."
                ]
            },
            {
                id: "go-deeper",
                heading: "Go deeper one area at a time",
                body: [
                    "Once you know the layout, switch to narrower selections. Pick one feature folder plus the shared types it uses and ask how it works, what its edge cases are and how it connects to the rest. Each focused question gets a more accurate answer than one huge prompt about everything."
                ]
            },
            {
                id: "save",
                heading: "Save your place",
                body: [
                    "Click Save to keep the imported project and selection as a session in your browser. When you come back to the codebase, open Sessions to restore it without importing again."
                ]
            }
        ],
        faq: [
            {
                question: "The project is too big to import comfortably. What can I do?",
                answer: "Import only the part you need: zip or select a subfolder such as one service in a monorepo. CodePiler already skips dependencies, build output and large files."
            },
            {
                question: "Can I trust the AI's explanation?",
                answer: "Use it as a guide to what to read, not as the final word. Check its claims against the code it points to, especially for anything you will change."
            }
        ]
    }
];

export function getGuide(slug: string) {
    return guides.find((guide) => guide.slug === slug) ?? null;
}
