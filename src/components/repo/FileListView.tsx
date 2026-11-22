"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { showFile, useViewerStore } from "@/store/viewer-store";
import Checkbox from "@/components/ui/checkbox";
import { formatBytes, formatTokenCount } from "@/lib/token-utils";

export type FileRow = {
    path: string;
    size: number;
    tokens: number;
};

type SortKey = "name" | "size" | "tokens";

const COLUMNS: { key: SortKey; label: string; className: string }[] = [
    { key: "name", label: "File", className: "flex-1 text-left" },
    { key: "size", label: "Size", className: "w-16 text-right" },
    { key: "tokens", label: "Tokens", className: "w-24 text-right" }
];

/** Flat, sortable list of files: the quickest way to spot and drop the heavy ones. */
export default function FileListView({ rows }: { rows: FileRow[] }) {
    const selected = useSelectionStore((s) => s.selected);
    const toggle = useSelectionStore((s) => s.toggle);
    const activePath = useViewerStore((s) => s.activePath);
    const previewPath = useViewerStore((s) => s.previewPath);
    const repoName = useRepoStore((s) => s.repoName);

    const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({
        key: "tokens",
        desc: true
    });

    const sorted = useMemo(() => {
        const dir = sort.desc ? -1 : 1;
        return [...rows].sort((a, b) =>
            sort.key === "name"
                ? dir * a.path.localeCompare(b.path)
                : dir * (a[sort.key] - b[sort.key])
        );
    }, [rows, sort]);

    // bars are relative to the heaviest file shown, so the biggest ones stand out
    const maxTokens = useMemo(() => Math.max(1, ...rows.map((r) => r.tokens)), [rows]);

    const changeSort = (key: SortKey) =>
        setSort((prev) =>
            prev.key === key ? { key, desc: !prev.desc } : { key, desc: key !== "name" }
        );

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-2 pb-2 text-xs font-semibold text-[var(--text-secondary)]">
                <span className="w-4" />
                {COLUMNS.map((col) => (
                    <button
                        key={col.key}
                        onClick={() => changeSort(col.key)}
                        className={`${col.className} flex items-center gap-1 hover:text-[var(--text-primary)] ${
                            col.key === "name" ? "" : "justify-end"
                        } ${sort.key === col.key ? "text-[var(--text-primary)]" : ""}`}
                    >
                        {col.label}
                        {sort.key === col.key &&
                            (sort.desc ? <ArrowDown size={12} /> : <ArrowUp size={12} />)}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-auto">
                {sorted.map((row) => {
                    const isSelected = selected.has(row.path);
                    const isActive = row.path === (previewPath ?? activePath);
                    // every path starts with the project folder, so leave it out of the label
                    const shown =
                        repoName && row.path.startsWith(`${repoName}/`)
                            ? row.path.slice(repoName.length + 1)
                            : row.path;
                    const slash = shown.lastIndexOf("/");
                    const name = shown.slice(slash + 1);
                    const dir = slash > 0 ? shown.slice(0, slash) : "";

                    return (
                        <div
                            key={row.path}
                            className={`flex items-center gap-3 rounded-md px-2 py-1.5 ${
                                isActive
                                    ? "bg-[var(--accent-soft)]"
                                    : "hover:bg-[var(--surface-subtle)]"
                            }`}
                        >
                            <Checkbox
                                checked={isSelected}
                                label={isSelected ? "Remove from prompt" : "Include in prompt"}
                                onChange={() => toggle(row.path)}
                            />

                            <button
                                onClick={() => showFile(row.path, isSelected)}
                                title={
                                    isSelected
                                        ? "Jump to this file in the prompt"
                                        : "Preview this file"
                                }
                                className="min-w-0 flex-1 text-left"
                            >
                                <span
                                    className={`block truncate text-sm font-medium hover:text-[var(--accent)] ${
                                        isSelected
                                            ? "text-[var(--text-primary)]"
                                            : "text-[var(--text-secondary)]"
                                    }`}
                                >
                                    {name}
                                </span>
                                {dir && (
                                    <span className="block truncate text-xs text-[var(--text-secondary)]">
                                        {dir}
                                    </span>
                                )}
                            </button>

                            <span className="w-16 shrink-0 text-right text-xs text-[var(--text-secondary)]">
                                {formatBytes(row.size)}
                            </span>

                            <span className="w-24 shrink-0">
                                <span className="block text-right text-xs font-semibold text-[var(--text-primary)]">
                                    {formatTokenCount(row.tokens)}
                                </span>
                                <span className="mt-1 block h-1 rounded-full bg-[var(--surface-subtle)]">
                                    <span
                                        className="block h-1 rounded-full bg-[var(--accent)]"
                                        style={{ width: `${(row.tokens / maxTokens) * 100}%` }}
                                    />
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
