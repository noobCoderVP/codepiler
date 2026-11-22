"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
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
    { key: "name", label: "File", className: "flex-1 justify-start" },
    { key: "size", label: "Size", className: "w-16 justify-end" },
    { key: "tokens", label: "Tokens", className: "w-24 justify-end" }
];

/** Flat, sortable list of files: the quickest way to spot and drop the heavy ones. */
export default function FileListView({
    rows,
    onSelectShown,
    onDeselectShown
}: {
    rows: FileRow[];
    onSelectShown: () => void;
    onDeselectShown: () => void;
}) {
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

    const stats = useMemo(() => {
        let total = 0;
        let max = 1;
        let selectedCount = 0;
        let selectedTokens = 0;
        for (const row of rows) {
            total += row.tokens;
            max = Math.max(max, row.tokens);
            if (selected.has(row.path)) {
                selectedCount++;
                selectedTokens += row.tokens;
            }
        }
        return { total, max, selectedCount, selectedTokens };
    }, [rows, selected]);

    const allSelected = rows.length > 0 && stats.selectedCount === rows.length;
    const someSelected = stats.selectedCount > 0 && !allSelected;

    const changeSort = (key: SortKey) =>
        setSort((prev) =>
            prev.key === key ? { key, desc: !prev.desc } : { key, desc: key !== "name" }
        );

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            {/* Summary of what is shown */}
            <p className="mb-2 px-1 text-xs text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                    {formatTokenCount(stats.total)}
                </span>{" "}
                tokens in {rows.length} {rows.length === 1 ? "file" : "files"} ·{" "}
                <span className="font-semibold text-[var(--accent)]">
                    {stats.selectedCount} selected
                </span>{" "}
                ({formatTokenCount(stats.selectedTokens)})
            </p>

            {/* Column header */}
            <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    label={allSelected ? "Deselect all shown files" : "Select all shown files"}
                    onChange={allSelected ? onDeselectShown : onSelectShown}
                />
                {COLUMNS.map((col) => {
                    const active = sort.key === col.key;

                    return (
                        <button
                            key={col.key}
                            onClick={() => changeSort(col.key)}
                            title={`Sort by ${col.label.toLowerCase()}`}
                            className={`${col.className} flex items-center gap-1 uppercase transition hover:text-[var(--text-primary)] ${
                                active ? "text-[var(--accent)]" : ""
                            }`}
                        >
                            {col.label}
                            {active ? (
                                sort.desc ? (
                                    <ArrowDown size={12} />
                                ) : (
                                    <ArrowUp size={12} />
                                )
                            ) : (
                                <ArrowUpDown size={11} className="opacity-50" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-1 flex-1 space-y-0.5 overflow-auto">
                {sorted.map((row) => {
                    const isSelected = selected.has(row.path);
                    const isActive = row.path === (previewPath ?? activePath);
                    const share = stats.total ? (row.tokens / stats.total) * 100 : 0;
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
                            className={`flex items-center gap-3 rounded-lg border px-2 py-1.5 transition-colors ${
                                isActive
                                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                                    : isSelected
                                      ? "border-transparent bg-[color-mix(in_srgb,var(--accent)_6%,transparent)] hover:bg-[var(--accent-soft)]"
                                      : "border-transparent hover:bg-[var(--surface-subtle)]"
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
                                        ? `${shown}: jump to this file in the prompt`
                                        : `${shown}: preview this file`
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

                            <span className="w-16 shrink-0 text-right text-xs tabular-nums text-[var(--text-secondary)]">
                                {formatBytes(row.size)}
                            </span>

                            <span
                                className="w-24 shrink-0"
                                title={`${row.tokens.toLocaleString()} tokens · ${share.toFixed(1)}% of shown`}
                            >
                                <span
                                    className={`block text-right text-xs font-semibold tabular-nums ${
                                        isSelected
                                            ? "text-[var(--text-primary)]"
                                            : "text-[var(--text-secondary)]"
                                    }`}
                                >
                                    {formatTokenCount(row.tokens)}
                                </span>
                                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-[var(--surface-subtle)]">
                                    <span
                                        className={`block h-full rounded-full ${
                                            isSelected
                                                ? "bg-[var(--accent)]"
                                                : "bg-[var(--text-secondary)] opacity-40"
                                        }`}
                                        style={{ width: `${(row.tokens / stats.max) * 100}%` }}
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
