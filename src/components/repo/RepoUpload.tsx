"use client";

import { AlertCircle, CheckCircle, FolderUp, Loader2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

import { useRepoStore } from "@/store/repo-store";
import { useRepoImport } from "./useRepoImport";

export default function RepoUpload() {
    const files = useRepoStore((s) => s.files);
    const repoName = useRepoStore((s) => s.repoName);
    const summary = useRepoStore((s) => s.summary);
    const error = useRepoStore((s) => s.error);
    const { loading, dragActive, dropHandlers, inputs, openFolder, openZip } = useRepoImport();

    const loaded = files.length > 0;

    return (
        <motion.div
            data-tour="upload"
            {...dropHandlers}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                dragActive
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]/55 shadow-lg"
                    : "border-[var(--border)] bg-[var(--surface-muted)]"
            } ${loading ? "pointer-events-none opacity-80" : ""}`}
        >
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--accent)] shadow-sm">
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : loaded ? (
                        <CheckCircle className="h-4 w-4 text-[var(--success)]" />
                    ) : (
                        <UploadCloud className="h-4 w-4" />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[var(--text-primary)]">
                        {loading
                            ? "Reading files…"
                            : dragActive
                              ? "Drop to import"
                              : loaded
                                ? `${repoName} · ${files.length} files`
                                : "Import a project"}
                    </p>
                    <p className="truncate text-[11px] text-[var(--text-secondary)]">
                        {loaded
                            ? "Drop another folder or ZIP to replace"
                            : "Drop a folder or ZIP here"}
                    </p>
                </div>

                <div className="flex shrink-0 gap-1.5">
                    <button
                        onClick={openFolder}
                        disabled={loading}
                        className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
                    >
                        <FolderUp size={13} />
                        Folder
                    </button>

                    <button
                        onClick={openZip}
                        disabled={loading}
                        className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-subtle)] disabled:opacity-50"
                    >
                        <UploadCloud size={13} />
                        ZIP
                    </button>
                </div>
            </div>

            {loaded && summary && !error && (
                <p className="mt-2 text-[11px] leading-4 text-[var(--text-secondary)]">
                    <span className="font-semibold text-[var(--text-primary)]">
                        {summary.preselected} key files pre-selected.
                    </span>{" "}
                    {summary.skipped > 0 &&
                        `${summary.skipped} skipped (dependencies, binaries, build output, .gitignore, >200 KB). `}
                    Adjust the selection in the tree below.
                </p>
            )}

            {error && (
                <p
                    role="alert"
                    className="mt-2 flex items-start gap-1.5 text-[11px] leading-4 text-[var(--danger)]"
                >
                    <AlertCircle size={12} className="mt-0.5 shrink-0" />
                    {error}
                </p>
            )}

            {inputs}
        </motion.div>
    );
}
