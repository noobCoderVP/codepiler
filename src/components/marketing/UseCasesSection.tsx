import { motion } from "framer-motion";

const useCases = [
    {
        title: "AI code review",
        body: "Select the changed files, apply a language-specific system prompt and the Code review task preset, and send one focused prompt instead of pasting files one by one. The model gets full file content with structure preserved."
    },
    {
        title: "Security audit",
        body: "Select auth routes, middleware, input handlers, and config files. Apply the Security review task preset and a language-specific system prompt for a deeply detailed, structured vulnerability analysis from any LLM."
    },
    {
        title: "Onboarding new engineers",
        body: "Gather entrypoints, routing, schema files, and key configuration. Apply the General polyglot system prompt and export a complete architectural overview prompt that a model can turn into a codebase walkthrough."
    },
    {
        title: "Debugging a multi-file bug",
        body: "Isolate the failing route, service layer, and supporting types. Add the Find and fix bugs task preset, verify the token budget fits your model's context window, and export one precise debugging prompt."
    },
    {
        title: "Reduce AI API costs",
        body: "A 300-file TypeScript project is roughly 500K tokens — $2.50 per GPT-4o call. Selecting the 20 relevant files brings that to ~40K tokens and ~$0.20 per call. That is a 12× cost reduction that compounds across every AI session."
    },
    {
        title: "Refactoring and modernization",
        body: "Pick the relevant feature folder, apply a language-specific system prompt and the Modularize or Apply OOP principles task preset, and use the token budget bar to confirm the prompt fits comfortably inside the model's context window."
    },
    {
        title: "AI agent context preparation",
        body: "AI coding agents like Cursor and custom MCP tools make repeated read_file calls to understand a codebase. Pre-package the relevant files once so the agent receives structured context immediately and skips redundant file reads."
    },
    {
        title: "Writing tests for legacy code",
        body: "Select the module under test and its dependencies. Apply the Write unit tests task preset with the appropriate language system prompt, and get a detailed test plan with table-driven tests, edge cases, and mock strategies."
    }
];

export default function UseCasesSection() {
    return (
        <section id="use-cases" className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl"
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Use cases
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                        Built for every workflow that needs focused AI context from real code.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                        The value is not just aggregation. It is selecting the right subset of a
                        repository, preserving its structure, wrapping it with expert instructions,
                        and keeping the prompt within your model&apos;s context budget.
                    </p>
                </motion.div>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {useCases.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.05, duration: 0.35 }}
                            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-sm"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
                                {index + 1}
                            </div>
                            <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                {item.body}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
