"use client";

import { useMemo, useState } from "react";
import { FolderTree, Search, Filter, BarChart2 } from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import { countTokens } from "@/lib/viewer-formatters";
import {
    filterTreeByQuery,
    filterTreeByExtensions,
    getAvailableExtensions
} from "@/lib/filter-tree";
import TreeNode from "./TreeNode";
import FileTypeFilterModal from "./FileTypeFilterModal";
import TokenManagerModal from "./TokenManagerModal";

export default function RepoTree() {
    const tree = useRepoStore((s) => s.tree);
    const files = useRepoStore((s) => s.files);

    const [query, setQuery] = useState("");
    const [activeExtensions, setActiveExtensions] = useState<Set<string>>(new Set());
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showTokenModal, setShowTokenModal] = useState(false);

    // Pre-compute token count per file once (expensive but memoized on files)
    const tokenMap = useMemo(() => {
        const map: Record<string, number> = {};
        for (const f of files) {
            map[f.path] = countTokens(f.content);
        }
        return map;
    }, [files]);

    const allExtensions = useMemo(() => getAvailableExtensions(tree), [tree]);

    const filteredTree = useMemo(() => {
        const byQuery = filterTreeByQuery(tree, query);
        return filterTreeByExtensions(byQuery, activeExtensions);
    }, [tree, query, activeExtensions]);

    const filterActive = activeExtensions.size > 0;

    if (!tree.length) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-[var(--text-secondary)]">
                <FolderTree className="h-8 w-8 opacity-60" />
                <p className="text-sm font-medium text-[var(--text-primary)]">
                    No repository loaded
                </p>
                <p className="max-w-xs text-xs">
                    Upload a repository folder or ZIP to explore files and build prompts.
                </p>
            </div>
        );
    }

    return (
        <>
            <div data-tour="tree" className="flex h-full flex-col">
                <div className="mb-3 space-y-2 border-b border-[var(--border)] pb-3">
                    {/* Title row */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                            Repository Files
                        </p>
                        <span className="text-xs text-[var(--text-secondary)]">
                            {files.length} files
                        </span>
                    </div>

                    {/* Search + tool buttons */}
                    <div className="flex items-center gap-2">
                        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-[rgba(37,99,235,0.18)] bg-[var(--surface)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_18px_rgba(15,23,42,0.06)]">
                            <Search size={16} className="text-[var(--accent)]" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search folders or files"
                                className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                            />
                        </label>

                        {/* Filter by type button */}
                        <button
                            onClick={() => setShowFilterModal(true)}
                            title="Filter by file type"
                            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
                                filterActive
                                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                        >
                            <Filter size={15} />
                            {filterActive && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px] font-bold text-white">
                                    {activeExtensions.size}
                                </span>
                            )}
                        </button>

                        {/* Token manager button */}
                        <button
                            onClick={() => setShowTokenModal(true)}
                            title="Manage files by size"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                        >
                            <BarChart2 size={15} />
                        </button>
                    </div>

                    {/* Active filter badge */}
                    {filterActive && (
                        <div className="flex flex-wrap items-center gap-1.5">
                            {Array.from(activeExtensions).map((ext) => (
                                <span
                                    key={ext}
                                    className="flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]"
                                >
                                    {ext === "" ? "(no ext)" : `.${ext}`}
                                    <button
                                        onClick={() => {
                                            const next = new Set(activeExtensions);
                                            next.delete(ext);
                                            setActiveExtensions(next);
                                        }}
                                        className="ml-0.5 opacity-70 hover:opacity-100"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={() => setActiveExtensions(new Set())}
                                className="text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-auto space-y-1 pr-1">
                    {filteredTree.length > 0 ? (
                        filteredTree.map((node) => (
                            <TreeNode
                                key={node.path}
                                node={node}
                                searchActive={query.trim().length > 0}
                                tokenMap={tokenMap}
                            />
                        ))
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-6 text-sm text-[var(--text-secondary)]">
                            {filterActive
                                ? "No files match the active extension filter."
                                : `No matching files or folders for "${query}".`}
                        </div>
                    )}
                </div>
            </div>

            {showFilterModal && (
                <FileTypeFilterModal
                    allExtensions={allExtensions}
                    activeExtensions={activeExtensions}
                    onChange={setActiveExtensions}
                    onClose={() => setShowFilterModal(false)}
                />
            )}

            {showTokenModal && (
                <TokenManagerModal tokenMap={tokenMap} onClose={() => setShowTokenModal(false)} />
            )}
        </>
    );
}
