import { motion } from "framer-motion";

const workflow = [
    {
        step: "01",
        title: "Import your repository",
        description:
            "Drag and drop a project folder or a downloaded ZIP archive. CodePiler reads file contents directly in your browser — no upload, no server, no waiting. Binary files, generated directories (node_modules, .git, dist), and files over 200 KB are automatically filtered out so the tree stays clean."
    },
    {
        step: "02",
        title: "Filter, search, and select the right files",
        description:
            "Use the live file-type filter to narrow by extension. Search the tree by filename or folder. Sort by token count or file size to find the heaviest files quickly. Check the files that belong in the prompt — inline token counts on every file and folder make it easy to build toward a target budget. The selected-files panel at the bottom shows a running total and lets you remove individual files without scrolling the tree."
    },
    {
        step: "03",
        title: "Wrap with a system prompt and task",
        description:
            "Click the Prompt button to open the wrapper modal. Choose a language-specific system prompt from 12 expert presets (JavaScript, Python, Go, Rust, Java, C++, Swift, Kotlin, React/Next.js, and more) and a task from 10 action presets (code review, security audit, write tests, refactor for readability, find bugs, performance audit, and more). Each preset is hundreds of words of detailed, expert-level instruction — or write your own from scratch."
    },
    {
        step: "04",
        title: "Set a model budget, export, and save",
        description:
            "Pick a model from the token budget dropdown — Claude Opus 4, GPT-4o, Gemini 2.5 Pro, and 24 others — and a color-coded progress bar tracks your usage in real time. When the prompt looks right, copy it to clipboard or download it as Text, JSON, XML, or Markdown. Save the session to localStorage and restore it in one click next time — no re-uploading."
    }
];

export default function WorkflowSection() {
    return (
        <section id="workflow" className="px-6 py-16">
            <div className="mx-auto max-w-6xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-md)] md:p-12">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            How it works
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                            From repository to AI-ready prompt context in four steps.
                        </h2>
                        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                            The entire workflow runs in your browser. No account. No backend. No
                            files leave your machine. Import once, select deliberately, and export a
                            structured prompt that gives your model exactly what it needs.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {workflow.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: 24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ delay: index * 0.08, duration: 0.35 }}
                                className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-5"
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
