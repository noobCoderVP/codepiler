"use client";

import { useEffect, useMemo, useState } from "react";
import { FolderTree, Search, ChevronsUpDown, ChevronsDownUp, ListOrdered } from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { filterTreeByQuery, filterTreeByFile, getExtension } from "@/lib/filter-tree";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import TreeNode, { ExpandSignal } from "./TreeNode";
import FileListView, { FileRow } from "./FileListView";

type View = "tree" | "list";

/** Dispatched on window to switch the explorer to the "By size" list, e.g. when over budget. */
export const SHOW_LARGEST_EVENT = "codepiler:show-largest";

const VISIBLE_TYPES = 6;

const chipClass = (active: boolean) =>
    `rounded-full border px-2.5 py-1 text-xs font-medium transition ${
        active
            ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
    }`;

const actionClass =
    "rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]";

const VIEW_STORAGE_KEY = "codepiler_explorer_view";

function readSavedView(): View {
    try {
        return localStorage.getItem(VIEW_STORAGE_KEY) === "list" ? "list" : "tree";
    } catch {
        return "tree";
    }
}

function parseLimit(value: string) {
    const n = Number(value);
    return value.trim() === "" || Number.isNaN(n) ? null : n;
}

export default function RepoTree() {
    const tree = useRepoStore((s) => s.tree);
    const files = useRepoStore((s) => s.files);
    const tokenMap = useRepoStore((s) => s.tokenMap);
    const [view, setViewState] = useState<View>(readSavedView);
    const [query, setQuery] = useState("");
    const [types, setTypes] = useState<Set<string>>(new Set());
    const [showAllTypes, setShowAllTypes] = useState(false);
    const [minTokens, setMinTokens] = useState("");
    const [maxTokens, setMaxTokens] = useState("");
    const [expandSignal, setExpandSignal] = useState<ExpandSignal>(null);
    // selection before the last bulk action, offered back as "Undo" for a few seconds
    const [undoSelection, setUndoSelection] = useState<string[] | null>(null);

    const setView = (next: View) => {
        setViewState(next);
        try {
            localStorage.setItem(VIEW_STORAGE_KEY, next);
        } catch {
            // storage unavailable: the view just isn't remembered
        }
    };

    useEffect(() => {
        const showLargest = () => setViewState("list");
        window.addEventListener(SHOW_LARGEST_EVENT, showLargest);
        return () => window.removeEventListener(SHOW_LARGEST_EVENT, showLargest);
    }, []);

    useEffect(() => {
        if (!undoSelection) return;
        const timer = window.setTimeout(() => setUndoSelection(null), 8000);
        return () => window.clearTimeout(timer);
    }, [undoSelection]);

    const undo = () => {
        if (undoSelection) useSelectionStore.getState().setInitialSelection(undoSelection);
        setUndoSelection(null);
    };

    // file types ordered by how many files use them
    const typeCounts = useMemo(() => {
        const counts = new Map<string, number>();
        for (const file of files) {
            const ext = getExtension(file.path);
            counts.set(ext, (counts.get(ext) ?? 0) + 1);
        }
        return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    }, [files]);

    const min = view === "list" ? parseLimit(minTokens) : null;
    const max = view === "list" ? parseLimit(maxTokens) : null;
    const q = query.trim().toLowerCase();
    const filtering = q !== "" || types.size > 0 || min !== null || max !== null;

    // one rule for "is this file shown", shared by the tree, the list and "Select shown"
    const keep = useMemo(() => {
        return (path: string) => {
            if (types.size > 0 && !types.has(getExtension(path))) return false;
            const tokens = tokenMap[path] ?? 0;
            if (min !== null && tokens < min) return false;
            if (max !== null && tokens > max) return false;
            return true;
        };
    }, [types, tokenMap, min, max]);

    const filteredTree = useMemo(
        () => filterTreeByFile(filterTreeByQuery(tree, query), keep),
        [tree, query, keep]
    );

    const rows: FileRow[] = useMemo(
        () =>
            files
                .filter((f) => (!q || f.path.toLowerCase().includes(q)) && keep(f.path))
                .map((f) => ({ path: f.path, size: f.size, tokens: tokenMap[f.path] ?? 0 })),
        [files, q, keep, tokenMap]
    );

    const shownPaths = useMemo(
        () =>
            view === "list" ? rows.map((r) => r.path) : filteredTree.flatMap((n) => n.filePaths),
        [view, rows, filteredTree]
    );

    const bulkChange = (action: "selectMany" | "deselectMany") => {
        const store = useSelectionStore.getState();
        setUndoSelection(Array.from(store.selected));
        store[action](shownPaths);
    };

    const toggleType = (ext: string) => {
        const next = new Set(types);
        if (next.has(ext)) next.delete(ext);
        else next.add(ext);
        setTypes(next);
    };

    const resetFilters = () => {
        setQuery("");
        setTypes(new Set());
        setMinTokens("");
        setMaxTokens("");
    };

    if (!tree.length) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-[var(--text-secondary)]">
                <FolderTree className="h-8 w-8 opacity-60" />
                <p className="text-sm font-medium text-[var(--text-primary)]">
                    No repository loaded
                </p>
                <p className="max-w-xs text-xs">
                    Import a folder or ZIP above, or try the sample project, to see its files here.
                </p>
            </div>
        );
    }

    const visibleTypes = showAllTypes ? typeCounts : typeCounts.slice(0, VISIBLE_TYPES);

    return (
        <TooltipProvider>
            <div data-tour="tree" className="flex h-full flex-col">
                <div className="mb-2 space-y-2.5 border-b border-[var(--border)] pb-3">
                    {/* View switch */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-1">
                            {(
                                [
                                    { key: "tree", label: "Tree", icon: FolderTree },
                                    { key: "list", label: "By size", icon: ListOrdered }
                                ] as const
                            ).map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setView(key)}
                                    aria-pressed={view === key}
                                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                                        view === key
                                            ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-sm"
                                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                    }`}
                                >
                                    <Icon size={15} />
                                    {label}
                                </button>
                            ))}
                        </div>

                        {view === "tree" && (
                            <>
                                <Tooltip content="Expand all folders">
                                    <button
                                        aria-label="Expand all folders"
                                        onClick={() => setExpandSignal({ open: true })}
                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        <ChevronsUpDown size={14} />
                                    </button>
                                </Tooltip>
                                <Tooltip content="Collapse all folders">
                                    <button
                                        aria-label="Collapse all folders"
                                        onClick={() => setExpandSignal({ open: false })}
                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        <ChevronsDownUp size={14} />
                                    </button>
                                </Tooltip>
                            </>
                        )}
                    </div>

                    {/* Search */}
                    <label className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                        <Search size={15} className="text-[var(--accent)]" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search files or folders"
                            className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                        />
                    </label>

                    {/* File types */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-xs font-semibold text-[var(--text-secondary)]">
                            Type
                        </span>
                        <button
                            onClick={() => setTypes(new Set())}
                            className={chipClass(types.size === 0)}
                        >
                            All
                        </button>
                        {visibleTypes.map(([ext, count]) => (
                            <button
                                key={ext}
                                onClick={() => toggleType(ext)}
                                aria-pressed={types.has(ext)}
                                className={chipClass(types.has(ext))}
                            >
                                {ext ? `.${ext}` : "no ext"}{" "}
                                <span className="opacity-60">{count}</span>
                            </button>
                        ))}
                        {typeCounts.length > VISIBLE_TYPES && (
                            <button
                                onClick={() => setShowAllTypes((v) => !v)}
                                className="px-1 text-xs font-medium text-[var(--accent)] hover:underline"
                            >
                                {showAllTypes
                                    ? "Less"
                                    : `+${typeCounts.length - VISIBLE_TYPES} more`}
                            </button>
                        )}
                    </div>

                    {/* Token range: a size tool, so it lives (and applies) only in the By size view */}
                    {view === "list" && (
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                            <span className="mr-1 font-semibold">Tokens</span>
                            {(
                                [
                                    [minTokens, setMinTokens, "min"],
                                    [maxTokens, setMaxTokens, "max"]
                                ] as const
                            ).map(([value, setValue, label], index) => (
                                <span key={label} className="flex items-center gap-1.5">
                                    {index === 1 && <span>–</span>}
                                    <input
                                        type="number"
                                        min={0}
                                        inputMode="numeric"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder={label}
                                        aria-label={`${label === "min" ? "Minimum" : "Maximum"} tokens per file`}
                                        className="w-20 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-secondary)]"
                                    />
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Bulk actions act on exactly what is shown */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-auto text-xs text-[var(--text-secondary)]">
                            {filtering
                                ? `Showing ${shownPaths.length} of ${files.length}`
                                : `${files.length} files`}
                            {filtering && (
                                <button
                                    onClick={resetFilters}
                                    className="ml-2 font-medium text-[var(--accent)] hover:underline"
                                >
                                    Reset
                                </button>
                            )}
                            {undoSelection && (
                                <button
                                    onClick={undo}
                                    className="ml-2 font-medium text-[var(--accent)] hover:underline"
                                >
                                    Undo
                                </button>
                            )}
                        </span>
                        <button onClick={() => bulkChange("selectMany")} className={actionClass}>
                            {filtering ? "Select shown" : "Select all"}
                        </button>
                        <button onClick={() => bulkChange("deselectMany")} className={actionClass}>
                            {filtering ? "Deselect shown" : "Clear"}
                        </button>
                    </div>
                </div>

                {shownPaths.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-6 text-center text-sm text-[var(--text-secondary)]">
                        No files match these filters.{" "}
                        <button
                            onClick={resetFilters}
                            className="font-medium text-[var(--accent)] hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : view === "list" ? (
                    <FileListView rows={rows} />
                ) : (
                    <div className="flex-1 space-y-1 overflow-auto pr-1">
                        {filteredTree.map((node) => (
                            <TreeNode
                                key={node.path}
                                node={node}
                                searchActive={filtering}
                                tokenMap={tokenMap}
                                expandSignal={expandSignal}
                            />
                        ))}
                    </div>
                )}
            </div>
        </TooltipProvider>
    );
}
