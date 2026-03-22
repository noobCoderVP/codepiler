"use client";

import ViewerChips from "./ViewerChips";
import ViewerActions from "./ViewerActions";
import { ViewerFormat } from "@/lib/viewer-formatters";

type Props = {
    repoName: string | null;
    files: number;
    tokens: number;
    content: string;
    format: ViewerFormat;
    activePath: string | null;
};

export default function ViewerHeader({
    repoName,
    files,
    tokens,
    content,
    format,
    activePath
}: Props) {
    return (
        <div className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                        One File Viewer
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        {repoName ? (
                            <span className="rounded-full border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.12)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] dark:border-[rgba(59,130,246,0.3)] dark:bg-[rgba(59,130,246,0.18)]">
                                Repository: {repoName}
                            </span>
                        ) : (
                            <span className="text-sm text-[var(--text-secondary)]">
                                Load a repository to begin
                            </span>
                        )}

                        {activePath && (
                            <span className="max-w-[36rem] truncate rounded-full border border-[rgba(15,23,42,0.08)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-primary)] dark:border-[var(--border)] dark:bg-[var(--surface-muted)]">
                                {activePath}
                            </span>
                        )}
                    </div>
                </div>

                <div data-tour="viewer-actions" className="flex flex-wrap items-center gap-3">
                    <ViewerChips files={files} tokens={tokens} />
                    <ViewerActions content={content} format={format} repoName={repoName} />
                </div>
            </div>
        </div>
    );
}
