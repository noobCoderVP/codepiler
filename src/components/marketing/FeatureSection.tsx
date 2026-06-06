import { motion } from "framer-motion";
import {
    Files,
    FileJson2,
    ShieldCheck,
    Sparkles,
    Filter,
    BarChart2,
    BookOpen,
    Hash
} from "lucide-react";

const features = [
    {
        title: "Selective file control",
        description: "Browse the repository tree and include exactly the files the prompt needs.",
        icon: Files
    },
    {
        title: "Format switching",
        description: "Move between plain text, JSON, XML, and Markdown without rebuilding context.",
        icon: FileJson2
    },
    {
        title: "Token awareness",
        description:
            "Estimate prompt size before you send it to ChatGPT, Claude, or another model.",
        icon: Sparkles
    },
    {
        title: "Local-first handling",
        description:
            "Repository files stay in the browser workflow instead of being pushed to a backend.",
        icon: ShieldCheck
    },
    {
        title: "Per-file token counts",
        description:
            "See token usage inline on every file and folder in the tree — no guesswork on what's big.",
        icon: Hash
    },
    {
        title: "File type filtering",
        description:
            "Filter the tree by extension in one click. Narrow to only .ts, .py, or any combination.",
        icon: Filter
    },
    {
        title: "Size manager",
        description:
            "View all files sorted by size or token count, then bulk-select or deselect the heavy ones.",
        icon: BarChart2
    },
    {
        title: "Saved sessions",
        description:
            "Save your repo and selection to localStorage and restore it later — no re-uploading needed.",
        icon: BookOpen
    }
];

export default function FeatureSection() {
    return (
        <section id="features" className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl"
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Built for focused prompt prep
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                        The product is already a usable repository-to-prompt workspace.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                        The strongest part of CodePiler today is the core workflow: import code,
                        inspect structure, control the selection set, and produce clean output fast.
                    </p>
                </motion.div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
