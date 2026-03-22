"use client";

import { useMemo, useState } from "react";
import { FolderTree, Search } from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import TreeNode from "./TreeNode";
import { filterTreeByQuery } from "@/lib/filter-tree";

export default function RepoTree() {
    const tree = useRepoStore((s) => s.tree);
    const files = useRepoStore((s) => s.files);
    const [query, setQuery] = useState("");

    const filteredTree = useMemo(() => filterTreeByQuery(tree, query), [tree, query]);

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
        <div data-tour="tree" className="flex h-full flex-col">
            <div className="mb-3 space-y-3 border-b border-[var(--border)] pb-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                        Repository Files
                    </p>
                    <span className="text-xs text-[var(--text-secondary)]">
                        {files.length} files
                    </span>
                </div>

                <label className="flex items-center gap-2 rounded-2xl border border-[rgba(37,99,235,0.18)] bg-[var(--surface)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_18px_rgba(15,23,42,0.06)]">
                    <Search size={16} className="text-[var(--accent)]" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search folders or files"
                        className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                    />
                </label>
            </div>

            <div className="flex-1 overflow-auto space-y-1 pr-1">
                {filteredTree.length > 0 ? (
                    filteredTree.map((node) => (
                        <TreeNode
                            key={node.path}
                            node={node}
                            searchActive={query.trim().length > 0}
                        />
                    ))
                ) : (
                    <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-6 text-sm text-[var(--text-secondary)]">
                        No matching files or folders for &quot;{query}&quot;.
                    </div>
                )}
            </div>
        </div>
    );
}
