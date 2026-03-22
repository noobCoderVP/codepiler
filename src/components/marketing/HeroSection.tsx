import Link from "next/link";
import { motion } from "framer-motion";
import { Layers3, ScanSearch, WandSparkles } from "lucide-react";

const highlights = [
    {
        title: "Readable context",
        description:
            "Structure selected files into one prompt instead of pasting snippets manually.",
        icon: Layers3
    },
    {
        title: "Noise reduction",
        description: "Filter oversized and irrelevant files before they ever clutter the prompt.",
        icon: ScanSearch
    },
    {
        title: "Ready to export",
        description: "Switch output formats instantly and ship the result to any LLM workflow.",
        icon: WandSparkles
    }
];

const riseIn = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45
        }
    }
};

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden px-6 pb-12 pt-14 md:pb-16 md:pt-18">
            <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.2),_transparent_58%)]" />
            <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-64 max-w-5xl rounded-full bg-[radial-gradient(circle,_rgba(15,23,42,0.08),_transparent_70%)] dark:bg-[radial-gradient(circle,_rgba(148,163,184,0.12),_transparent_70%)]" />

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <motion.div
                    variants={riseIn}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)] shadow-sm">
                        Codebase context builder
                    </div>

                    <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] md:text-6xl">
                        Turn large repositories into clean prompt context without losing structure.
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                        CodePiler gives you a controlled workspace for importing a repository,
                        choosing the exact files that matter, and exporting AI-ready output in the
                        format your workflow already uses.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                        <Link
                            href="/app"
                            className="rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                        >
                            Launch App
                        </Link>
                        <a
                            href="#workflow"
                            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
                        >
                            See Workflow
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 36 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="relative"
                >
                    <div className="rounded-[2rem] border border-[rgba(148,163,184,0.22)] bg-[linear-gradient(160deg,rgba(255,255,255,0.92),rgba(241,245,249,0.9))] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-[var(--border)] dark:bg-[linear-gradient(160deg,rgba(17,24,39,0.94),rgba(15,23,42,0.94))]">
                        <div className="rounded-[1.4rem] border border-[rgba(148,163,184,0.22)] bg-[var(--surface)] p-5 dark:border-[var(--border)]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        Prompt workspace
                                    </p>
                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                        Import, filter, select, export
                                    </p>
                                </div>

                                <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                                    Client-side
                                </div>
                            </div>

                            <div className="mt-5 grid gap-3">
                                {[
                                    "Upload project folder",
                                    "Review generated repository tree",
                                    "Select only relevant files",
                                    "Export text, JSON, XML, or Markdown"
                                ].map((step, index) => (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: 18 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.18 + index * 0.08, duration: 0.3 }}
                                        className="flex items-center gap-3 rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[var(--surface-muted)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)] dark:border-[var(--border)]"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                                            0{index + 1}
                                        </div>
                                        <span className="text-sm font-medium text-[var(--text-primary)]">
                                            {step}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-3">
                {highlights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.08, duration: 0.35 }}
                            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-5 shadow-sm"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                                <Icon size={20} />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                {item.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
