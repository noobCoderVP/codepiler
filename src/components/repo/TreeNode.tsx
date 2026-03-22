"use client";

import { useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";
import Checkbox from "@/components/ui/checkbox";
import { getFileIcon } from "@/lib/file-icons";
import { RepoNode } from "@/types/repo";

type Props = {
    node: RepoNode;
    depth?: number;
    searchActive?: boolean;
};

export default function TreeNode({ node, depth = 0, searchActive = false }: Props) {
    const [open, setOpen] = useState(true);

    const selected = useSelectionStore((s) => s.selected);
    const toggle = useSelectionStore((s) => s.toggle);
    const toggleMany = useSelectionStore((s) => s.toggleMany);
    const select = useSelectionStore((s) => s.select);
    const activePath = useViewerStore((s) => s.activePath);
    const setActivePath = useViewerStore((s) => s.setActivePath);

    const filePaths = node.filePaths;

    const selectedCount = useMemo(() => {
        let count = 0;
        for (const path of filePaths) {
            if (selected.has(path)) count++;
        }
        return count;
    }, [selected, filePaths]);

    const checked = selectedCount === filePaths.length && filePaths.length > 0;
    const indeterminate = selectedCount > 0 && selectedCount < filePaths.length;
    const isOpen = searchActive ? true : open;
    const isActiveFile = node.type === "file" && node.path === activePath;

    const Icon = node.type === "file" ? getFileIcon(node.name) : Folder;

    const handleFileClick = () => {
        if (node.type !== "file") return;
        select(node.path);
        setActivePath(node.path);
    };

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
                        aria-label="Toggle folder"
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
                    onChange={() => {
                        if (node.type === "file") toggle(node.path);
                        else toggleMany(filePaths);
                    }}
                />

                {node.type === "folder" ? (
                    <Folder size={18} color="#f59e0b" />
                ) : (
                    <Icon size={18} color={isActiveFile ? "#2563eb" : "#64748b"} />
                )}

                {node.type === "file" ? (
                    <button
                        onClick={handleFileClick}
                        className="truncate text-left text-[var(--text-primary)] transition hover:text-[var(--accent)]"
                    >
                        {node.name}
                    </button>
                ) : (
                    <button
                        onClick={() => setOpen((value) => !value)}
                        className="truncate text-left text-[var(--text-primary)]"
                    >
                        {node.name}
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
                    />
                ))}
        </div>
    );
}
