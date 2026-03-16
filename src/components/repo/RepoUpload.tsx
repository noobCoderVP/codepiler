"use client"

import { useRef, useState } from "react"
import { UploadCloud, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

import { useRepoStore } from "@/store/repo-store"
import { readFiles } from "@/lib/read-files"
import { preFilterFiles } from "@/lib/pre-filter"

type Props = {
    onFilesLoaded?: (files: File[]) => void
}

export default function RepoUpload({ onFilesLoaded }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const setFiles = useRepoStore((s) => s.setFiles)

    const [dragActive, setDragActive] = useState(false)
    const [fileCount, setFileCount] = useState<number | null>(null)
    const [repoName, setRepoName] = useState<string | null>(null)

    const processFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) {
            return
        }

        const arr = Array.from(files)

        // detect repo name
        const firstPath =
            (arr[0] as File & { webkitRelativePath?: string }).webkitRelativePath || arr[0].name
        const repo = firstPath.split("/")[0]

        setRepoName(repo)

        // 🔹 PRE FILTER BEFORE READING FILE CONTENTS
        const filtered = preFilterFiles(arr)

        setFileCount(filtered.length)

        // read only filtered files
        const repoFiles = await readFiles(filtered)

        setFiles(repoFiles)

        onFilesLoaded?.(filtered)
    }

    const openPicker = () => inputRef.current?.click()

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        setDragActive(false)

        const files = e.dataTransfer.files

        processFiles(files)
    }

    return (
        <motion.div
            onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`
        relative flex flex-col items-center justify-center gap-4
        rounded-xl px-8 py-8
        bg-blue-50
        transition-all duration-200
        ${dragActive ? "scale-[1.02] shadow-xl ring-2 ring-blue-300" : "shadow-md hover:shadow-lg"}
      `}
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
                {fileCount ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                    <UploadCloud className="h-8 w-8 text-blue-600" />
                )}
            </div>

            <p className="text-lg font-semibold text-slate-800">
                {fileCount ? "Repository Loaded" : "Import Repository"}
            </p>

            {fileCount ? (
                <p className="text-sm text-green-600 text-center">
                    {repoName} • {fileCount} files loaded
                </p>
            ) : (
                <p className="text-sm text-slate-500 text-center max-w-xs">
                    Drag & drop your project folder here or choose it manually
                </p>
            )}

            <button
                onClick={openPicker}
                className="
          mt-1
          rounded-md
          bg-blue-600
          px-4 py-2
          text-sm
          font-medium
          text-white
          shadow-sm
          transition
          hover:bg-blue-500
          active:scale-[0.98]
        "
            >
                Select Folder
            </button>

            <input
                ref={inputRef}
                type="file"
                multiple
                {...{ webkitdirectory: "true" }}
                className="hidden"
                onChange={(e) => processFiles(e.currentTarget.files)}
            />
        </motion.div>
    )
}
