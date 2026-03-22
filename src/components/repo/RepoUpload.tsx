"use client";

import { useRef, useState } from "react";
import { CheckCircle, FolderUp, Loader2, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useRepoStore } from "@/store/repo-store";
import { readFiles } from "@/lib/read-files";
import { readZipFile } from "@/lib/read-zip";
import { preFilterFiles } from "@/lib/pre-filter";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";
import { RepoFile } from "@/types/repo";

const INITIAL_FILE_LIMIT = 140;
const INITIAL_CHAR_BUDGET = 220_000;

function scoreInitialSelection(path: string) {
    const lower = path.toLowerCase();

    if (lower.endsWith("readme.md")) return 120;
    if (lower.includes("/src/")) return 100;
    if (lower.includes("/app/")) return 95;
    if (lower.includes("/components/")) return 92;
    if (lower.endsWith("package.json")) return 90;
    if (lower.endsWith("tsconfig.json") || lower.endsWith("next.config.ts")) return 88;
    if (lower.endsWith(".ts") || lower.endsWith(".tsx")) return 80;
    if (lower.endsWith(".js") || lower.endsWith(".jsx")) return 72;
    if (lower.endsWith(".md")) return 60;
    return 40;
}

function getInitialSelection(files: RepoFile[]) {
    const ranked = [...files].sort((left, right) => {
        const scoreDiff = scoreInitialSelection(right.path) - scoreInitialSelection(left.path);

        if (scoreDiff !== 0) return scoreDiff;
        return left.path.localeCompare(right.path);
    });

    const selectedPaths: string[] = [];
    let totalChars = 0;

    for (const file of ranked) {
        if (selectedPaths.length >= INITIAL_FILE_LIMIT) break;
        if (totalChars + file.content.length > INITIAL_CHAR_BUDGET && selectedPaths.length > 0) {
            continue;
        }

        selectedPaths.push(file.path);
        totalChars += file.content.length;
    }

    return selectedPaths;
}

export default function RepoUpload() {
    const folderInputRef = useRef<HTMLInputElement | null>(null);
    const zipInputRef = useRef<HTMLInputElement | null>(null);

    const setFiles = useRepoStore((s) => s.setFiles);
    const setInitialSelection = useSelectionStore((s) => s.setInitialSelection);
    const setActivePath = useViewerStore((s) => s.setActivePath);

    const [dragActive, setDragActive] = useState(false);
    const [fileCount, setFileCount] = useState<number | null>(null);
    const [repoName, setRepoName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const applyRepoFiles = (repoFiles: RepoFile[]) => {
        const finalFiles = setFiles(repoFiles);
        const initialSelection = getInitialSelection(finalFiles);

        setInitialSelection(initialSelection);
        setActivePath(initialSelection[0] ?? finalFiles[0]?.path ?? null);
        setFileCount(finalFiles.length);
        setRepoName(finalFiles[0]?.path.split("/")[0] ?? null);
    };

    const processDirectoryFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setIsLoading(true);

        try {
            const filtered = preFilterFiles(files);
            const repoFiles = await readFiles(filtered);
            applyRepoFiles(repoFiles);
        } finally {
            setIsLoading(false);
        }
    };

    const processZip = async (file: File | null) => {
        if (!file) return;

        setIsLoading(true);

        try {
            const repoFiles = await readZipFile(file);
            applyRepoFiles(repoFiles);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (isLoading) return;

        setDragActive(false);

        const droppedFiles = Array.from(event.dataTransfer.files);
        const zipFile = droppedFiles.find((file) => file.name.toLowerCase().endsWith(".zip"));

        if (zipFile && droppedFiles.length === 1) {
            await processZip(zipFile);
            return;
        }

        await processDirectoryFiles(event.dataTransfer.files);
    };

    return (
        <motion.div
            data-tour="upload"
            onDragOver={(event) => {
                event.preventDefault();
                if (!isLoading) setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border px-4 py-4 text-center transition-all duration-200 ${
                dragActive && !isLoading
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]/55 shadow-lg"
                    : "border-[var(--border)] bg-[var(--surface-muted)]"
            } ${isLoading ? "pointer-events-none opacity-80" : ""}`}
        >
            <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--accent)] shadow-sm">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </motion.div>
                        ) : fileCount ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <CheckCircle className="h-6 w-6 text-[var(--success)]" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <UploadCloud className="h-6 w-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {isLoading ? "Processing repository..." : "Import repository"}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {fileCount && repoName
                            ? `${repoName} • ${fileCount} selectable files loaded`
                            : "Upload a folder directly or drop a ZIP archive."}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => folderInputRef.current?.click()}
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
                >
                    <FolderUp size={16} />
                    Select Folder
                </button>

                <button
                    onClick={() => zipInputRef.current?.click()}
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-subtle)] disabled:opacity-50"
                >
                    <UploadCloud size={16} />
                    Upload ZIP
                </button>
            </div>

            <p className="mt-3 text-[11px] text-[var(--text-secondary)]">
                Large repositories load into the tree first. The initial viewer selection is kept
                focused for responsiveness.
            </p>

            <input
                ref={folderInputRef}
                type="file"
                multiple
                {...{ webkitdirectory: "true" }}
                className="hidden"
                onChange={(event) => processDirectoryFiles(event.currentTarget.files)}
            />

            <input
                ref={zipInputRef}
                type="file"
                accept=".zip,application/zip"
                className="hidden"
                onChange={(event) => processZip(event.currentTarget.files?.[0] ?? null)}
            />
        </motion.div>
    );
}
