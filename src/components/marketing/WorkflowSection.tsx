"use client";

import { motion } from "framer-motion";
import { getSampleProject } from "@/lib/sample-project";

const workflow = [
    {
        step: "01",
        title: "Drop in your project",
        description:
            "A folder or a ZIP. Everything is read in your browser. Dependencies, build output, binaries and files over 200 KB are skipped, and your .gitignore is respected."
    },
    {
        step: "02",
        title: "Tick the files your question is about",
        description:
            "Browse the tree with a token count on every file and folder. Pick the route, the service and the test, not the whole repo. The running total shows what the AI will receive."
    },
    {
        step: "03",
        title: "Ask your question and copy",
        description:
            "Write the question, or start from a preset like “Find and fix bugs” or “Write unit tests”. Copy one prompt and paste it into any AI chat."
    }
];

const PREVIEW_FILES = ["src/types.ts", "src/services/todo-service.ts"];
const QUESTION =
    "Calling deleteTodo with an id that doesn't exist removed a different todo. Why, and how do I fix it?";

// same "===== FILE: path =====" layout as the workspace's Text export, built from the bundled sample
function buildPreview() {
    const blocks = getSampleProject()
        .filter((file) => PREVIEW_FILES.some((path) => file.path.endsWith(path)))
        .map((file) => `===== FILE: ${file.path} =====\n${file.content.trimEnd()}`);

    return [...blocks, QUESTION].join("\n\n");
}

const preview = buildPreview();

export default function WorkflowSection() {
    return (
        <section id="how-it-works" className="scroll-mt-20 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl"
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        How it works
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                        A focused question, with the code to answer it.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                        Pasting a whole repo buries your question in noise. Pasting files by hand
                        means you miss one. CodePiler sits in between: you choose the files, it
                        builds the prompt.
                    </p>
                </motion.div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <ol className="space-y-4">
                        {workflow.map((item, index) => (
                            <motion.li
                                key={item.step}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ delay: index * 0.08, duration: 0.35 }}
                                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-semibold text-white">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                    {item.description}
                                </p>
                            </motion.li>
                        ))}
                    </ol>

                    <motion.figure
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4 }}
                        className="min-w-0 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]"
                    >
                        <figcaption className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-5 py-3 text-xs text-[var(--text-secondary)]">
                            <span className="font-semibold text-[var(--text-primary)]">
                                What you paste into the AI
                            </span>
                            <span>2 of 8 files selected</span>
                        </figcaption>
                        <pre className="overflow-x-auto p-5 text-xs leading-5 text-[var(--text-primary)]">
                            <code>{preview}</code>
                        </pre>
                    </motion.figure>
                </div>
            </div>
        </section>
    );
}
