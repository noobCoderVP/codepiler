"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder } from "lucide-react"
import { useSelectionStore } from "@/store/selection-store"
import Checkbox from "@/components/ui/checkbox"
import { getFileIcon } from "@/lib/file-icons"
import { RepoNode } from "@/types/repo"

export default function TreeNode({ node, depth = 0 }: { node: RepoNode; depth?: number }) {
    const [open, setOpen] = useState(true)

    const selected = useSelectionStore((s) => s.selected)
    const toggle = useSelectionStore((s) => s.toggle)
    const toggleMany = useSelectionStore((s) => s.toggleMany)

    const filePaths = node.filePaths

    const selectedCount = filePaths.filter((p) => selected.has(p)).length

    const checked = selectedCount === filePaths.length && filePaths.length > 0

    const indeterminate = selectedCount > 0 && selectedCount < filePaths.length

    const Icon = node.type === "file" ? getFileIcon(node.name) : Folder

    return (
        <div>
            <div
                className="
                    flex items-center gap-2
                    py-1.5 px-2
                    rounded-md
                    text-[14px] font-medium
                    transition-colors
                    cursor-pointer
                    hover:bg-(--surface-subtle)
                "
                style={{ paddingLeft: depth * 16 }}
            >
                {/* Expand Toggle */}
                {node.type === "folder" ? (
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-4 flex items-center justify-center text-(--text-secondary)"
                    >
                        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                ) : (
                    <div className="w-4" />
                )}

                {/* Checkbox */}
                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={() => {
                        if (node.type === "file") {
                            toggle(node.path)
                        } else {
                            toggleMany(filePaths)
                        }
                    }}
                />

                {/* Icon */}
                {node.type === "folder" ? (
                    <Folder size={18} color="#f59e0b" />
                ) : (
                    <Icon size={18} color="#64748b" />
                )}

                {/* Name */}
                <span className="truncate text-(--text-primary)">{node.name}</span>
            </div>

            {/* Children */}
            {node.type === "folder" &&
                open &&
                node.children?.map((child) => (
                    <TreeNode key={child.path} node={child} depth={depth + 1} />
                ))}
        </div>
    )
}
