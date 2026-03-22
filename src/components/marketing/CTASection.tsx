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
                    Ready to use
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-5xl">
                    Open the workspace and generate structured context from your repository.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                    The current product already covers the core path. The next step is polishing the
                    edges, not inventing the workflow.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/app"
                        className="rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                    >
                        Launch App
                    </Link>
                    <Link
                        href="/docs"
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
                    >
                        Read Docs
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
