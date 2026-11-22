"use client";

import { createElement, useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";
import Checkbox from "@/components/ui/checkbox";
import { getFileIcon } from "@/lib/file-icons";
import { formatTokenCount } from "@/lib/token-utils";
import { RepoNode } from "@/types/repo";

/** A new object every time "expand all" / "collapse all" is clicked, so repeated clicks still apply. */
export type ExpandSignal = { open: boolean } | null;

type Props = {
    node: RepoNode;
    depth?: number;
    searchActive?: boolean;
    tokenMap: Record<string, number>;
    expandSignal: ExpandSignal;
};

export default function TreeNode({
    node,
    depth = 0,
    searchActive = false,
    tokenMap,
    expandSignal
}: Props) {
    const [open, setOpen] = useState(expandSignal ? expandSignal.open : true);
    const [seenSignal, setSeenSignal] = useState(expandSignal);

    if (expandSignal !== seenSignal) {
        setSeenSignal(expandSignal);
        if (expandSignal) setOpen(expandSignal.open);
    }

    const selected = useSelectionStore((s) => s.selected);
    const toggle = useSelectionStore((s) => s.toggle);
    const toggleMany = useSelectionStore((s) => s.toggleMany);
    const activePath = useViewerStore((s) => s.activePath);
    const previewPath = useViewerStore((s) => s.previewPath);

    const filePaths = node.filePaths;

    const selectedCount = useMemo(() => {
        let count = 0;
        for (const path of filePaths) {
            if (selected.has(path)) count++;
        }
        return count;
    }, [selected, filePaths]);

    const folderTokens = useMemo(() => {
        if (node.type !== "folder") return 0;
        return filePaths.reduce((sum, p) => sum + (tokenMap[p] ?? 0), 0);
    }, [node.type, filePaths, tokenMap]);

    const checked = selectedCount === filePaths.length && filePaths.length > 0;
    const indeterminate = selectedCount > 0 && selectedCount < filePaths.length;
    const isOpen = searchActive ? true : open;
    const isActiveFile = node.type === "file" && node.path === (previewPath ?? activePath);

    const handleFileClick = () => {
        if (node.type !== "file") return;

        if (selected.has(node.path)) {
            useViewerStore.setState({ activePath: node.path, previewPath: null });
        } else {
            useViewerStore.setState({ previewPath: node.path });
        }
    };

    const fileTokens = node.type === "file" ? (tokenMap[node.path] ?? 0) : 0;
    const displayTokens = node.type === "file" ? fileTokens : folderTokens;

    return (
        <div>
            <div
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[14px] font-medium transition-colors ${
                    isActiveFile ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--surface-subtle)]"
                }`}
                style={{ paddingLeft: depth * 16 }}
            >
                {node.type === "folder" ? (
                    <button
                        aria-label={isOpen ? "Collapse folder" : "Expand folder"}
                        onClick={() => setOpen((value) => !value)}
                        className="flex w-4 items-center justify-center text-[var(--text-secondary)]"
                    >
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                ) : (
                    <div className="w-4" />
                )}

                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    label={
                        node.type === "file"
                            ? checked
                                ? "Remove from prompt"
                                : "Include in prompt"
                            : checked
                              ? "Remove folder from prompt"
                              : "Include whole folder in prompt"
                    }
                    onChange={() => {
                        if (node.type === "file") toggle(node.path);
                        else toggleMany(filePaths);
                    }}
                />

                {node.type === "folder" ? (
                    <Folder size={18} color="#f59e0b" />
                ) : (
                    createElement(getFileIcon(node.name), {
                        size: 18,
                        color: isActiveFile ? "#2563eb" : "#64748b"
                    })
                )}

                {node.type === "file" ? (
                    <button
                        onClick={handleFileClick}
                        title={checked ? "Jump to this file in the prompt" : "Preview this file"}
                        className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left transition hover:text-[var(--accent)]"
                    >
                        <span
                            className={`truncate text-[14px] font-medium ${
                                checked
                                    ? "text-[var(--text-primary)]"
                                    : "text-[var(--text-secondary)]"
                            }`}
                        >
                            {node.name}
                        </span>
                        {displayTokens > 0 && (
                            <span className="shrink-0 rounded-full bg-[var(--surface-muted)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                                {formatTokenCount(displayTokens)}
                            </span>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={() => setOpen((value) => !value)}
                        className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left"
                    >
                        <span className="truncate text-[14px] font-medium text-[var(--text-primary)]">
                            {node.name}
                        </span>
                        {displayTokens > 0 && (
                            <span className="shrink-0 rounded-full bg-[var(--surface-muted)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                                {formatTokenCount(displayTokens)}
                            </span>
                        )}
                    </button>
                )}
            </div>

            {node.type === "folder" &&
                isOpen &&
                node.children?.map((child) => (
                    <TreeNode
                        key={child.path}
                        node={child}
                        depth={depth + 1}
                        searchActive={searchActive}
                        tokenMap={tokenMap}
                        expandSignal={expandSignal}
                    />
                ))}
        </div>
    );
}
