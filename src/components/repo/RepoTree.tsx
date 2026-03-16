"use client"

import { useRepoStore } from "@/store/repo-store"
import TreeNode from "./TreeNode"
import { FolderTree } from "lucide-react"

export default function RepoTree() {
    const tree = useRepoStore((s) => s.tree)
    const files = useRepoStore((s) => s.files)

    if (!tree.length) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
                <FolderTree className="h-8 w-8 opacity-60" />

                <p className="text-sm font-medium">No repository loaded</p>

                <p className="text-xs text-slate-400 max-w-xs">
                    Upload a repository to explore files and build prompts
                </p>
            </div>
        )
    }

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                <p className="text-sm font-semibold text-slate-700">Repository Files</p>

                <span className="text-xs text-slate-500">{files.length} files</span>
            </div>

            {/* Tree */}
            <div className="flex-1 overflow-auto space-y-1 pr-1">
                {tree.map((node) => (
                    <TreeNode key={node.path} node={node} />
                ))}
            </div>
        </div>
    )
}
