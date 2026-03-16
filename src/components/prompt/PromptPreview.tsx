"use client"

import { useMemo } from "react"
import { useRepoStore } from "@/store/repo-store"
import { useSelectionStore } from "@/store/selection-store"

export default function PromptPreview() {
    const files = useRepoStore((s) => s.files)
    const selected = useSelectionStore((s) => s.selected)

    const { output, fileCount, tokens } = useMemo(() => {
        const selectedFiles = files.filter((f) => selected.has(f.path))

        const combined = selectedFiles
            .map((f) => `===== FILE: ${f.path} =====\n${f.content}\n`)
            .join("\n")

        const charCount = combined.length

        // simple token estimation (works well enough for UI preview)
        const estimatedTokens = Math.ceil(charCount / 4)

        return {
            output: combined,
            fileCount: selectedFiles.length,
            tokens: estimatedTokens
        }
    }, [files, selected])

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
                <div className="font-medium">Combined Output</div>

                <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>Files: {fileCount}</span>
                    <span>Tokens: {tokens}</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 font-mono text-sm">
                <pre className="whitespace-pre-wrap">
                    {output || "Select files from the repository to generate the prompt..."}
                </pre>
            </div>
        </div>
    )
}
