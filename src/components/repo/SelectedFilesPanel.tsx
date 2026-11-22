"use client";

import { useMemo, useState } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";
import { formatTokenCount } from "@/lib/token-utils";

export default function SelectedFilesPanel() {
    const files = useRepoStore((s) => s.files);
    const tokenMap = useRepoStore((s) => s.tokenMap);
    const selected = useSelectionStore((s) => s.selected);
    const deselect = useSelectionStore((s) => s.deselect);

    const [collapsed, setCollapsed] = useState(false);

    const selectedFiles = useMemo(() => {
        return files
            .filter((f) => selected.has(f.path))
            .map((f) => ({
                path: f.path,
                name: f.path.split("/").pop() ?? f.path,
                tokens: tokenMap[f.path] ?? 0
            }));
    }, [files, selected, tokenMap]);

    const totalTokens = useMemo(
        () => selectedFiles.reduce((sum, f) => sum + f.tokens, 0),
        [selectedFiles]
    );

    if (selectedFiles.length === 0) return null;

    return (
        <div className="border-t border-[var(--border)] bg-[var(--surface)]">
            <button
                onClick={() => setCollapsed((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left transition hover:bg-[var(--surface-muted)]"
            >
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {selectedFiles.length} selected
                    <span className="ml-2 font-normal text-[var(--text-secondary)]">
                        · {formatTokenCount(totalTokens)} tokens
                    </span>
                </span>
                {collapsed ? (
                    <ChevronUp size={14} className="text-[var(--text-secondary)]" />
                ) : (
                    <ChevronDown size={14} className="text-[var(--text-secondary)]" />
                )}
            </button>

            {!collapsed && (
                <div className="max-h-48 overflow-y-auto px-3 pb-3">
                    <div className="space-y-0.5">
                        {selectedFiles.map((f) => (
                            <div
                                key={f.path}
                                className="flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-[var(--surface-muted)] group"
                            >
                                <button
                                    onClick={() =>
                                        useViewerStore.setState({
                                            activePath: f.path,
                                            previewPath: null
                                        })
                                    }
                                    className="min-w-0 flex-1 truncate text-left text-[var(--text-primary)] hover:text-[var(--accent)]"
                                    title={`${f.path} — jump to it in the prompt`}
                                >
                                    {f.name}
                                </button>
                                <span className="shrink-0 rounded-full bg-[var(--surface-subtle)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                                    {formatTokenCount(f.tokens)}
                                </span>
                                <button
                                    onClick={() => deselect(f.path)}
                                    title={`Deselect ${f.name}`}
                                    className="shrink-0 rounded p-0.5 text-[var(--text-secondary)] opacity-0 transition hover:text-red-500 focus:opacity-100 group-hover:opacity-100"
                                >
                                    <X size={11} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
