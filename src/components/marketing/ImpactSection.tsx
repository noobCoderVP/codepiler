import { motion } from "framer-motion";
import { Zap, DollarSign, Clock, Bot } from "lucide-react";

const stats = [
    {
        value: "90%",
        label: "Fewer tokens sent",
        detail: "Precise file selection keeps prompts lean. Sending 15 targeted files instead of a full 300-file repo cuts token usage by 90%+ in typical workflows.",
        icon: DollarSign,
        color: "text-emerald-500"
    },
    {
        value: "0",
        label: "Re-upload time",
        detail: "Saved Sessions lets you restore any previous repository and selection instantly. No ZIP drag-and-drop, no re-filtering — the workspace opens exactly where you left it.",
        icon: Clock,
        color: "text-blue-500"
    },
    {
        value: "10×",
        label: "Faster context prep",
        detail: "Assembling context manually takes 10–30 minutes per session. Codepiler compresses that to under 60 seconds: upload, filter, select, export.",
        icon: Zap,
        color: "text-amber-500"
    },
    {
        value: "Skip",
        label: "AI read_file calls",
        detail: "AI coding agents (Cursor, Copilot, custom MCP tools) make repeated read_file calls to understand a codebase. Pre-pack the right files once and the agent skips those round-trips entirely.",
        icon: Bot,
        color: "text-violet-500"
    }
];

export default function ImpactSection() {
    return (
        <section className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10 max-w-3xl"
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        Real impact
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                        Less noise. Lower cost. Faster AI workflows.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                        Token usage directly maps to API cost and latency. Codepiler cuts both by
                        giving you surgical control over what enters the prompt — before the LLM
                        ever sees it.
                    </p>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: index * 0.07, duration: 0.38 }}
                                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--surface-muted)]">
                                        <Icon size={18} className={stat.color} />
                                    </div>
                                    <div
                                        className={`text-3xl font-bold tracking-tight ${stat.color}`}
                                    >
                                        {stat.value}
                                    </div>
                                </div>

                                <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                                    {stat.label}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                    {stat.detail}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Cost breakdown callout */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] px-7 py-6"
                >
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                Cost calculation
                            </p>
                            <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                                Sending a full repository vs. a curated selection
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                A 300-file TypeScript project typically contains ~500K tokens. At
                                GPT-4o rates ($5 / 1M input tokens), one full-repo prompt costs
                                ~$2.50. With Codepiler you send 20–40 relevant files (~40K tokens) —
                                the same task costs ~$0.20. That is a{" "}
                                <strong className="text-[var(--text-primary)]">
                                    12× cost reduction
                                </strong>{" "}
                                per prompt, compounding across every AI session.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--text-secondary)]">
                                    Full repo prompt
                                </span>
                                <span className="font-semibold text-red-400">~$2.50</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--text-secondary)]">
                                    Codepiler selection
                                </span>
                                <span className="font-semibold text-emerald-500">~$0.20</span>
                            </div>
                            <div className="my-1 border-t border-[var(--border)]" />
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-[var(--text-primary)]">
                                    Saved per call
                                </span>
                                <span className="font-bold text-emerald-500">~$2.30</span>
                            </div>
                            <p className="text-[11px] text-[var(--text-secondary)]">
                                Based on GPT-4o $5/1M token input pricing. Savings scale with usage
                                frequency and model tier.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
