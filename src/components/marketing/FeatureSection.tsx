import { motion } from "framer-motion";
import {
    Files,
    FileJson2,
    ShieldCheck,
    Sparkles,
    Filter,
    BarChart2,
    BookOpen,
    Hash,
    MessageSquarePlus,
    Gauge,
    ListChecks,
    Eye
} from "lucide-react";

const features = [
    {
        title: "Selective file control",
        description:
            "Browse the full repository tree and include exactly the files your prompt needs. Select All, Clear, Collapse, and Expand All controls let you manage even large repos in one click.",
        icon: Files
    },
    {
        title: "Expert prompt presets",
        description:
            "Choose from 12 language-specific system prompts (JavaScript, Python, Go, Rust, Java, C++, Swift, Kotlin, and more) and 10 task templates (code review, security audit, refactor, write tests, performance, and more). Each preset is hundreds of words of expert-level instruction.",
        icon: MessageSquarePlus
    },
    {
        title: "Model token budget",
        description:
            "Pick from 27 model presets — Claude Opus 4 (200K), GPT-4.1 (1M), Gemini 2.5 Pro (1M), Llama 3.1 (128K), and more — and watch a live color-coded bar fill as you add files. Stay green, hit amber, stop before red.",
        icon: Gauge
    },
    {
        title: "Selected files panel",
        description:
            "A pinned panel at the bottom of the file tree lists every selected file with its individual token cost and a one-click remove button. Audit your selection without scrolling through the full tree.",
        icon: ListChecks
    },
    {
        title: "Preview without selecting",
        description:
            "Click any filename to preview it in the editor. Use the checkbox to include it in the export. Previewing and selecting are separate actions — you can inspect a file before deciding whether it belongs in the prompt.",
        icon: Eye
    },
    {
        title: "4 export formats",
        description:
            "Switch between plain text, JSON, XML, and Markdown without rebuilding your context. Text is optimized for direct prompting, JSON and XML for tooling pipelines, Markdown for docs and sharing.",
        icon: FileJson2
    },
    {
        title: "Per-file token counts",
        description:
            "See token usage inline on every file and folder in the tree — before you select anything. No guesswork on which files are eating your context budget.",
        icon: Hash
    },
    {
        title: "File type filter",
        description:
            "Narrow the tree to only .ts, .py, .go, or any combination of extensions in one click. Reduces noise when a repo contains a mix of source, config, documentation, and assets.",
        icon: Filter
    },
    {
        title: "Token & size manager",
        description:
            "Open the size manager to see all files sorted by token count or byte size. Bulk-select or deselect heavy files in one panel without touching the tree.",
        icon: BarChart2
    },
    {
        title: "Saved sessions",
        description:
            "Save your repository and file selection to localStorage and restore it in one click — no re-uploading, no re-filtering. Resume exactly where you left off in any future session.",
        icon: BookOpen
    },
    {
        title: "100% local-first",
        description:
            "Repository files are processed entirely inside your browser. No files are sent to any server, no account required. Works offline after the page loads. Your code stays private by design.",
        icon: ShieldCheck
    },
    {
        title: "Live token awareness",
        description:
            "The token count updates in real time as you select files, edit the system prompt, or change the task. The count includes the full export — code context, system prompt, and task — so what you see is exactly what the model receives.",
        icon: Sparkles
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
                        12 core features
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                        Every tool you need to build precise AI prompt context from real code.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                        CodePiler is not a chat wrapper or a code editor. It is a purpose-built
                        workspace for the one step that happens before you talk to any AI:
                        assembling the right context from your codebase.
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
