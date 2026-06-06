"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, BarChart2, Search } from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { countTokens } from "@/lib/viewer-formatters";
import { formatTokenCount, formatBytes } from "@/lib/token-utils";

type SortKey = "tokens" | "size";

type Props = {
    tokenMap: Record<string, number>;
    onClose: () => void;
};

export default function TokenManagerModal({ tokenMap, onClose }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const files = useRepoStore((s) => s.files);
    const selected = useSelectionStore((s) => s.selected);
    const toggle = useSelectionStore((s) => s.toggle);
    const selectMany = useSelectionStore((s) => s.selectMany);
    const deselectMany = useSelectionStore((s) => s.deselectMany);

    const [sortKey, setSortKey] = useState<SortKey>("tokens");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const enriched = useMemo(() => {
        return files.map((f) => ({
            path: f.path,
            name: f.path.split("/").pop() ?? f.path,
            size: f.size,
            tokens: tokenMap[f.path] ?? countTokens(f.content)
        }));
    }, [files, tokenMap]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? enriched.filter((f) => f.path.toLowerCase().includes(q)) : enriched;
    }, [enriched, query]);

    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) =>
            sortKey === "tokens" ? b.tokens - a.tokens : b.size - a.size
        );
    }, [filtered, sortKey]);

    const allPaths = sorted.map((f) => f.path);
    const allSelected = allPaths.every((p) => selected.has(p));
    const someSelected = allPaths.some((p) => selected.has(p));

    const totalTokensSelected = useMemo(() => {
        return sorted.reduce((sum, f) => sum + (selected.has(f.path) ? f.tokens : 0), 0);
    }, [sorted, selected]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
        >
            <div
                className="flex w-full max-w-2xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
                style={{ maxHeight: "80vh" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                        <BarChart2 size={15} className="text-[var(--accent)]" />
                        File Size Manager
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-3">
                    <label className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5">
                        <Search size={13} className="text-[var(--text-secondary)]" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search files…"
                            className="w-full bg-transparent text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                        />
                    </label>

                    <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-1">
                        {(["tokens", "size"] as SortKey[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => setSortKey(key)}
                                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                                    sortKey === key
                                        ? "bg-[var(--accent)] text-white"
                                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                }`}
                            >
                                By {key}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary row */}
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-5 py-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={allSelected && sorted.length > 0}
                            ref={(el) => {
                                if (el) el.indeterminate = someSelected && !allSelected;
                            }}
                            onChange={() => {
                                if (allSelected) deselectMany(allPaths);
                                else selectMany(allPaths);
                            }}
                            className="h-3.5 w-3.5 cursor-pointer accent-[var(--accent)]"
                        />
                        <span className="text-xs text-[var(--text-secondary)]">
                            {sorted.length} files shown
                        </span>
                    </div>
                    <span className="text-xs font-medium text-[var(--accent)]">
                        {formatTokenCount(totalTokensSelected)} tokens selected
                    </span>
                </div>

                {/* File list */}
                <div className="flex-1 overflow-y-auto">
                    {sorted.map((f) => {
                        const isSelected = selected.has(f.path);
                        return (
                            <div
                                key={f.path}
                                onClick={() => toggle(f.path)}
                                className={`flex cursor-pointer items-center gap-3 border-b border-[var(--border)] px-5 py-2.5 transition hover:bg-[var(--surface-muted)] ${
                                    isSelected ? "bg-[var(--accent-soft)]" : ""
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggle(f.path)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-3.5 w-3.5 cursor-pointer accent-[var(--accent)]"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-medium text-[var(--text-primary)]">
                                        {f.name}
                                    </p>
                                    <p className="truncate text-[11px] text-[var(--text-secondary)]">
                                        {f.path}
                                    </p>
                                </div>

                                <div className="flex shrink-0 flex-col items-end gap-0.5">
                                    <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                                        {formatTokenCount(f.tokens)} tok
                                    </span>
                                    <span className="text-[10px] text-[var(--text-secondary)]">
                                        {formatBytes(f.size)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="border-t border-[var(--border)] px-5 py-3 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
