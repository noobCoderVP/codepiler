"use client";

import { useRef, useState } from "react";
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useRepoStore } from "@/store/repo-store";
import { readFiles } from "@/lib/read-files";
import { preFilterFiles } from "@/lib/pre-filter";
import { useSelectionStore } from "@/store/selection-store";

export default function RepoUpload() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setFiles = useRepoStore((s) => s.setFiles);
    const setInitialSelection = useSelectionStore((s) => s.setInitialSelection);

    const [dragActive, setDragActive] = useState(false);
    const [fileCount, setFileCount] = useState<number | null>(null);
    const [repoName, setRepoName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // ✅ NEW

    const processFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setIsLoading(true); // ✅ start loader

        const arr = Array.from(files);

        const firstPath =
            (arr[0] as File & { webkitRelativePath?: string }).webkitRelativePath || arr[0].name;

        const repo = firstPath.split("/")[0];
        setRepoName(repo);

        const filtered = preFilterFiles(arr);
        setFileCount(filtered.length);

        const repoFiles = await readFiles(filtered);

        const finalFiles = setFiles(repoFiles);
        setInitialSelection(finalFiles.map((f) => f.path));

        setIsLoading(false); // ✅ stop loader
    };

    const openPicker = () => {
        if (!isLoading) inputRef.current?.click();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (isLoading) return;
        setDragActive(false);
        processFiles(e.dataTransfer.files);
    };

    return (
        <motion.div
            onDragOver={(e) => {
                e.preventDefault();
                if (!isLoading) setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`
                relative flex flex-col items-center justify-center gap-4
                rounded-xl px-8 py-8
                bg-blue-50
                transition-all duration-200
                ${
                    dragActive && !isLoading
                        ? "scale-[1.02] shadow-xl ring-2 ring-blue-300"
                        : "shadow-md hover:shadow-lg"
                }
                ${isLoading ? "opacity-80 pointer-events-none" : ""}
            `}
        >
            {/* ICON AREA */}
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                        </motion.div>
                    ) : fileCount ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <UploadCloud className="h-8 w-8 text-blue-600" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* TITLE */}
            <p className="text-lg font-semibold text-slate-800">
                {isLoading
                    ? "Processing Repository..."
                    : fileCount
                      ? "Repository Loaded"
                      : "Import Repository"}
            </p>

            {/* DESCRIPTION */}
            {isLoading ? (
                <p className="text-sm text-blue-600 text-center">
                    Reading files & preparing prompt...
                </p>
            ) : fileCount ? (
                <p className="text-sm text-green-600 text-center">
                    {repoName} • {fileCount} files loaded
                </p>
            ) : (
                <p className="text-sm text-slate-500 text-center max-w-xs">
                    Drag & drop your project folder here or choose it manually
                </p>
            )}

            {/* BUTTON */}
            <button
                onClick={openPicker}
                disabled={isLoading}
                className="
                    mt-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white
                    shadow-sm transition hover:bg-blue-500 active:scale-[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed
                "
            >
                {isLoading ? "Processing..." : "Select Folder"}
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
    );
}
