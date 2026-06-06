import { motion } from "framer-motion";

const useCases = [
    "Explain an unfamiliar codebase to an LLM in one prompt — no ad hoc copy-paste, no missed files.",
    "Prepare focused debugging context by selecting only the affected modules and their direct dependencies.",
    "Feed an AI agent a precise context package so it skips repeated read_file calls and starts productive immediately.",
    "Save your selection for recurring workflows — re-open the same context next session without re-uploading the repository.",
    "Reduce API cost by 10–90× by sending only the files that matter instead of an entire repository.",
    "Package source files for documentation, onboarding prompts, or code-review summaries with a single export."
];

export default function UseCasesSection() {
    return (
        <section id="use-cases" className="px-6 py-16">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Use cases
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                        Built for developers who need cleaner context, not just a larger prompt.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                        The value is not only aggregation. It is choosing the right subset of the
                        repository and preserving structure while doing it.
                    </p>
                </motion.div>

                <div className="grid gap-4">
                    {useCases.map((item, index) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ delay: index * 0.06, duration: 0.35 }}
                            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-sm"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
                                    {index + 1}
                                </div>
                                <p className="text-sm leading-7 text-[var(--text-primary)]">
                                    {item}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
