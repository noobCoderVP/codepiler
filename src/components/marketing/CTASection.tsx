import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="px-6 pb-20 pt-8">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,var(--surface),var(--surface-muted))] px-8 py-12 text-center shadow-[var(--shadow-md)] md:px-14"
            >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Free and open source
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-5xl">
                    Stop copy-pasting code into AI tools. Build a proper prompt in seconds.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                    Upload any repository, select the files that matter, wrap with an expert system
                    prompt and task, and export AI-ready context for Claude, ChatGPT, Gemini, or any
                    other model — all without sending a single file to a server.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/app"
                        className="rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                    >
                        Launch App — It&apos;s Free
                    </Link>
                    <Link
                        href="/docs"
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
                    >
                        Read the Docs
                    </Link>
                </div>
                <p className="mt-6 text-xs text-[var(--text-secondary)]">
                    No account required · No files uploaded · Works offline after first load
                </p>
            </motion.div>
        </section>
    );
}
