"use client";

import { useEffect, useMemo, useState } from "react";
import {
    FolderTree,
    Search,
    ChevronsUpDown,
    ChevronsDownUp,
    ListOrdered,
    X,
    Undo2
} from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { filterTreeByQuery, filterTreeByFile, getExtension } from "@/lib/filter-tree";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import TreeNode, { ExpandSignal } from "./TreeNode";
import FileListView, { FileRow } from "./FileListView";
import TypeFilter from "./TypeFilter";
import {
    TokenRange,
    TokenRangeInputs,
    TokenRangeMenu,
    inRange,
    parseRange
} from "./TokenRangeFilter";

type View = "tree" | "list";

/** Dispatched on window to switch the explorer to the "By size" list, e.g. when over budget. */
export const SHOW_LARGEST_EVENT = "codepiler:show-largest";

const VIEW_STORAGE_KEY = "codepiler_explorer_view";

const NO_RANGE: TokenRange = { min: "", max: "" };

function readSavedView(): View {
    try {
        return localStorage.getItem(VIEW_STORAGE_KEY) === "list" ? "list" : "tree";
    } catch {
        return "tree";
    }
}

export default function RepoTree() {
    const tree = useRepoStore((s) => s.tree);
    const files = useRepoStore((s) => s.files);
    const tokenMap = useRepoStore((s) => s.tokenMap);
    const [view, setViewState] = useState<View>(readSavedView);
    const [query, setQuery] = useState("");
    const [types, setTypes] = useState<Set<string>>(new Set());
    const [range, setRange] = useState<TokenRange>(NO_RANGE);
    const [customRange, setCustomRange] = useState(false);
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

    // the token range is a size tool, so it only applies in the By size view
    const parsed = parseRange(range);
    const min = view === "list" ? parsed.min : null;
    const max = view === "list" ? parsed.max : null;
    const q = query.trim().toLowerCase();
    const filtering = q !== "" || types.size > 0 || min !== null || max !== null;

    // one rule for "is this file shown", shared by the tree, the list and "Select shown"
    const keep = useMemo(() => {
        return (path: string) => {
            if (types.size > 0 && !types.has(getExtension(path))) return false;
            return inRange(tokenMap[path] ?? 0, { min, max });
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

    // token counts after search and type filters, so the size presets can show live counts
    const rangeCandidates = useMemo(
        () =>
            files
                .filter(
                    (f) =>
                        (!q || f.path.toLowerCase().includes(q)) &&
                        (types.size === 0 || types.has(getExtension(f.path)))
                )
                .map((f) => tokenMap[f.path] ?? 0),
        [files, q, types, tokenMap]
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

    const changeRange = (next: TokenRange) => {
        setRange(next);
        setCustomRange(false);
    };

    const resetFilters = () => {
        setQuery("");
        setTypes(new Set());
        setRange(NO_RANGE);
        setCustomRange(false);
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

    return (
        <TooltipProvider>
            <div data-tour="tree" className="flex h-full flex-col">
                <div className="mb-2 space-y-2.5 border-b border-[var(--border)] pb-3">
                    {/* View switch */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-1 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]">
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
                                            ? "bg-[var(--control)] text-[var(--accent)] shadow-[var(--shadow-control)] ring-1 ring-[var(--border-strong)]"
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
                                        className="btn btn-secondary btn-icon"
                                    >
                                        <ChevronsUpDown size={14} />
                                    </button>
                                </Tooltip>
                                <Tooltip content="Collapse all folders">
                                    <button
                                        aria-label="Collapse all folders"
                                        onClick={() => setExpandSignal({ open: false })}
                                        className="btn btn-secondary btn-icon"
                                    >
                                        <ChevronsDownUp size={14} />
                                    </button>
                                </Tooltip>
                            </>
                        )}
                    </div>

                    {/* Search */}
                    <label className="input flex items-center gap-2 px-3 py-2">
                        <Search size={15} className="shrink-0 text-[var(--text-secondary)]" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search files or folders"
                            className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                                className="shrink-0 rounded p-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </label>

                    {/* Filters */}
                    <div className="flex items-center gap-2">
                        <TypeFilter typeCounts={typeCounts} selected={types} onChange={setTypes} />
                        {view === "list" && (
                            <TokenRangeMenu
                                range={range}
                                custom={customRange}
                                tokens={rangeCandidates}
                                onChange={changeRange}
                                onCustom={() => setCustomRange(true)}
                            />
                        )}
                    </div>

                    {view === "list" && customRange && (
                        <TokenRangeInputs
                            range={range}
                            onChange={setRange}
                            onClose={() => changeRange(NO_RANGE)}
                        />
                    )}

                    {/* Bulk actions act on exactly what is shown */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-auto flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            {filtering
                                ? `Showing ${shownPaths.length} of ${files.length}`
                                : `${files.length} files`}
                            {filtering && (
                                <button
                                    onClick={resetFilters}
                                    className="font-semibold text-[var(--accent)] hover:underline"
                                >
                                    Reset
                                </button>
                            )}
                            {undoSelection && (
                                <button
                                    onClick={undo}
                                    className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline"
                                >
                                    <Undo2 size={12} />
                                    Undo
                                </button>
                            )}
                        </span>
                        <button
                            onClick={() => bulkChange("selectMany")}
                            className="btn btn-secondary btn-sm"
                        >
                            {filtering ? "Select shown" : "Select all"}
                        </button>
                        <button
                            onClick={() => bulkChange("deselectMany")}
                            className="btn btn-secondary btn-sm"
                        >
                            {filtering ? "Deselect shown" : "Clear"}
                        </button>
                    </div>
                </div>

                {shownPaths.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-muted)] px-4 py-6 text-center text-sm text-[var(--text-secondary)]">
                        No files match these filters.{" "}
                        <button
                            onClick={resetFilters}
                            className="font-semibold text-[var(--accent)] hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : view === "list" ? (
                    <FileListView
                        rows={rows}
                        onSelectShown={() => bulkChange("selectMany")}
                        onDeselectShown={() => bulkChange("deselectMany")}
                    />
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
