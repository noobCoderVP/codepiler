import { motion } from "framer-motion";

const workflow = [
    {
        step: "01",
        title: "Import repository files",
        description:
            "Load a project folder directly in the browser and trim obvious noise up front."
    },
    {
        step: "02",
        title: "Inspect the tree",
        description:
            "Use the explorer to navigate folders, expand structure, and quickly control scope."
    },
    {
        step: "03",
        title: "Generate final output",
        description:
            "Preview the assembled prompt, verify token count, and copy or download the result."
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
                            Workflow
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                            A simple pipeline for turning source code into LLM-ready context.
                        </h2>
                        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                            The UX should feel operational, not decorative. Each step strips away
                            manual copying and keeps the context explicit.
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
