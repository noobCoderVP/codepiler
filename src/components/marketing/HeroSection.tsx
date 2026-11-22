"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FolderUp, Loader2, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import { loadSample } from "@/lib/repo-loader";
import { useRepoStore } from "@/store/repo-store";
import { useRepoImport } from "@/components/repo/useRepoImport";

export default function HeroSection() {
    const router = useRouter();
    const { loading, dragActive, dropHandlers, inputs, openFolder, openZip } = useRepoImport();

    // the repo store outlives client navigation, so open the workspace as soon as an import starts
    useEffect(
        () =>
            useRepoStore.subscribe((state, prev) => {
                if (state.loading && !prev.loading) router.push("/app");
            }),
        [router]
    );

    return (
        <section className="relative overflow-hidden px-6 pb-12 pt-14 md:pb-16 md:pt-18">
            <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.2),_transparent_58%)]" />

            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                {/* no entrance animation here: the headline is the LCP element and must paint immediately */}
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)] shadow-sm">
                        Free &amp; open source · Runs in your browser
                    </div>

                    <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] md:text-6xl">
                        Ask AI about your code with only the files that matter.
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                        Drop in your project, tick the files your question is about, write the
                        question, and copy one clean prompt into ChatGPT, Claude or Gemini. The
                        model sees the right code, and you don&apos;t pay for the rest.
                    </p>

                    <a
                        href="#how-it-works"
                        className="mt-7 inline-block text-sm font-semibold text-[var(--accent)] hover:underline"
                    >
                        See how it works ↓
                    </a>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 36 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                >
                    <div
                        {...dropHandlers}
                        className={`flex flex-col items-center gap-4 rounded-[2rem] border-2 border-dashed px-6 py-12 text-center shadow-[var(--shadow-md)] transition ${
                            dragActive
                                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                                : "border-[var(--border)] bg-[var(--surface)]"
                        }`}
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                            {loading ? (
                                <Loader2 className="h-7 w-7 animate-spin" />
                            ) : (
                                <UploadCloud className="h-7 w-7" />
                            )}
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-[var(--text-primary)]">
                                {dragActive ? "Drop to open" : "Drop a project folder or .zip"}
                            </p>
                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                node_modules, build output and binaries are skipped automatically
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={openFolder}
                                disabled={loading}
                                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
                            >
                                <FolderUp size={16} />
                                Choose folder
                            </button>
                            <button
                                onClick={openZip}
                                disabled={loading}
                                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-subtle)] disabled:opacity-50"
                            >
                                <UploadCloud size={16} />
                                Choose .zip
                            </button>
                        </div>

                        <button
                            onClick={() => void loadSample()}
                            disabled={loading}
                            className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline disabled:opacity-50"
                        >
                            <Sparkles size={14} />
                            No project handy? Try a sample
                        </button>

                        <p className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                            <ShieldCheck size={14} className="text-[var(--success)]" />
                            Files are read by your browser and never uploaded.
                        </p>

                        {inputs}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
