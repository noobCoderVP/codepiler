"use client";

import { motion } from "framer-motion";
import { BookOpen, Eye, FileJson2, Hash, MessageSquarePlus, ShieldCheck } from "lucide-react";

const features = [
    {
        title: "Token count on every file",
        description:
            "See what each file and folder costs before you select it, plus a running total against your model's context window.",
        icon: Hash
    },
    {
        title: "Preview before you pick",
        description:
            "Click a file to read it, tick it to include it. Check that a file is relevant before it goes into the prompt.",
        icon: Eye
    },
    {
        title: "Question and task presets",
        description:
            "18 task presets (find bugs, write tests, security review, refactor…) and 12 language-specific system prompts. Use them as-is or edit them.",
        icon: MessageSquarePlus
    },
    {
        title: "Text, Markdown, XML or JSON",
        description:
            "Copy or download in the format your AI tool or pipeline handles best. Each file is labelled with its path.",
        icon: FileJson2
    },
    {
        title: "Saved sessions",
        description:
            "Save the project and your selection, and pick up where you left off without importing again.",
        icon: BookOpen
    },
    {
        title: "Your code stays on your machine",
        description:
            "No server, no account, no upload. Files are read by your browser, and the code is open source.",
        icon: ShieldCheck
    }
];

export default function FeatureSection() {
    return (
        <section id="features" className="scroll-mt-20 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl"
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Features
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                        Built for the step before you ask the AI.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                        Not a chat app or an editor. Just the tools for choosing the right files and
                        asking a clear question about them.
                    </p>
                </motion.div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ delay: index * 0.06, duration: 0.35 }}
                                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                                    <Icon size={20} />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
