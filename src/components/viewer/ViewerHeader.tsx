"use client";

import { useState } from "react";
import { Save, BookOpen, MessageSquarePlus } from "lucide-react";
import ViewerChips from "./ViewerChips";
import ViewerActions from "./ViewerActions";
import SavedSessionsModal from "@/components/repo/SavedSessionsModal";
import { ViewerFormat } from "@/lib/viewer-formatters";
import { RepoFile } from "@/types/repo";

type Props = {
    repoName: string | null;
    files: number;
    tokens: number;
    content: string;
    format: ViewerFormat;
    activePath: string | null;
    selectedFiles: RepoFile[];
    selectedPaths: string[];
    modelLimit: number | null;
    onModelLimitChange: (limit: number | null) => void;
    onTogglePromptEditor: () => void;
};

export default function ViewerHeader({
    repoName,
    files,
    tokens,
    content,
    format,
    activePath,
    selectedFiles,
    selectedPaths,
    modelLimit,
    onModelLimitChange,
    onTogglePromptEditor
}: Props) {
    const [modal, setModal] = useState<"sessions" | "save" | null>(null);

    const canSave = selectedFiles.length > 0 && !!repoName;

    return (
        <>
            <div className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-3">
                {/* Row 1: repo + file context, label on right */}
                <div className="mb-2.5 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        {repoName ? (
                            <span className="shrink-0 rounded-full border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.12)] px-2.5 py-0.5 text-xs font-semibold text-[var(--text-primary)] dark:border-[rgba(59,130,246,0.3)] dark:bg-[rgba(59,130,246,0.18)]">
                                {repoName}
                            </span>
                        ) : (
                            <span className="text-xs text-[var(--text-secondary)]">
                                Load a repository to begin
                            </span>
                        )}
                        {activePath && (
                            <span className="min-w-0 truncate rounded-full border border-[rgba(15,23,42,0.08)] bg-[var(--surface-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)] dark:border-[var(--border)] dark:bg-[var(--surface-muted)]">
                                {activePath}
                            </span>
                        )}
                    </div>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                        One File Viewer
                    </span>
                </div>

                {/* Row 2: logically grouped action buttons */}
                <div data-tour="viewer-actions" className="flex flex-wrap items-center gap-2">
                    {/* Group 1: context window stats */}
                    <ViewerChips
                        files={files}
                        tokens={tokens}
                        modelLimit={modelLimit}
                        onModelLimitChange={onModelLimitChange}
                    />

                    <div className="h-5 w-px bg-[var(--border)]" />

                    {/* Group 2: prompt wrapper */}
                    <button
                        onClick={onTogglePromptEditor}
                        title="Add system prompt or task"
                        className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                    >
                        <MessageSquarePlus size={13} />
                        Prompt
                    </button>

                    <div className="h-5 w-px bg-[var(--border)]" />

                    {/* Group 3: session management */}
                    <button
                        onClick={() => setModal("sessions")}
                        title="View saved sessions"
                        className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                    >
                        <BookOpen size={13} />
                        Sessions
                    </button>
                    <button
                        onClick={() => setModal("save")}
                        disabled={!canSave}
                        title={canSave ? "Save current selection" : "Select files first"}
                        className="flex items-center gap-1.5 rounded-xl border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Save size={13} />
                        Save
                    </button>

                    <div className="h-5 w-px bg-[var(--border)]" />

                    {/* Group 4: export */}
                    <ViewerActions content={content} format={format} repoName={repoName} />
                </div>
            </div>

            {(modal === "save" || modal === "sessions") && (
                <SavedSessionsModal
                    onClose={() => setModal(null)}
                    pendingSave={
                        modal === "save" && canSave
                            ? {
                                  repoName: repoName!,
                                  files: selectedFiles,
                                  selected: selectedPaths,
                                  totalTokens: tokens
                              }
                            : null
                    }
                />
            )}
        </>
    );
}
