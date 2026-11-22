"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AlertTriangle, Eye, ListChecks } from "lucide-react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";

import ViewerHeader from "./ViewerHeader";
import ViewerTabs from "./ViewerTabs";
import ViewerEditor from "./ViewerEditor";
import PromptEditor from "./PromptEditor";
import WorkspaceEmptyState from "./WorkspaceEmptyState";
import { formatTokenCount } from "@/lib/token-utils";
import { SHOW_LARGEST_EVENT } from "@/components/repo/RepoTree";

import {
    ViewerFormat,
    buildText,
    buildJSON,
    buildXML,
    buildMarkdown,
    countTokens
} from "@/lib/viewer-formatters";

export default function OneFileViewer() {
    const files = useRepoStore((s) => s.files);
    const repoName = useRepoStore((s) => s.repoName);
    const tokenMap = useRepoStore((s) => s.tokenMap);
    const selected = useSelectionStore((s) => s.selected);
    const selectMany = useSelectionStore((s) => s.selectMany);
    const activePath = useViewerStore((s) => s.activePath);
    const previewPath = useViewerStore((s) => s.previewPath);

    const [format, setFormat] = useState<ViewerFormat>("text");
    const [fontSize, setFontSize] = useState(13);
    const [modelLimit, setModelLimit] = useState<number | null>(null);
    const [promptPrefix, setPromptPrefix] = useState("");
    const [promptSuffix, setPromptSuffix] = useState("");
    const [systemLabel, setSystemLabel] = useState<string | null>(null);
    const [taskLabel, setTaskLabel] = useState<string | null>(null);
    const [showPromptEditor, setShowPromptEditor] = useState(false);
    const [exportedContent, setExportedContent] = useState<string | null>(null);

    const selectedFiles = useMemo(() => {
        return files.filter((file) => selected.has(file.path));
    }, [files, selected]);

    // A file clicked in the tree that isn't part of the prompt is shown on its own.
    const previewFile =
        previewPath && !selected.has(previewPath)
            ? (files.find((file) => file.path === previewPath) ?? null)
            : null;

    const focusPath =
        previewPath && selected.has(previewPath)
            ? previewPath
            : activePath && selected.has(activePath)
              ? activePath
              : (selectedFiles[0]?.path ?? null);

    const document = useMemo(() => {
        switch (format) {
            case "json":
                return buildJSON(selectedFiles);
            case "xml":
                return buildXML(selectedFiles);
            case "markdown":
                return buildMarkdown(selectedFiles);
            default:
                return buildText(selectedFiles);
        }
    }, [selectedFiles, format]);

    const prefix = promptPrefix.trim();
    const suffix = promptSuffix.trim();

    const finalContent = useMemo(() => {
        const parts: string[] = [];
        if (prefix) parts.push(prefix);
        parts.push(document.content);
        if (suffix) parts.push(suffix);
        return parts.join("\n\n");
    }, [document.content, prefix, suffix]);

    // Tokenizing and re-rendering Monaco on every keystroke in the instructions is costly,
    // so both run on a deferred copy of the prompt.
    const deferredContent = useDeferredValue(finalContent);
    const tokens = useMemo(() => countTokens(deferredContent), [deferredContent]);

    // the line map is relative to the code block, which starts after the system prompt
    const prefixLines = prefix ? prefix.split("\n").length + 1 : 0;
    const activeLine = focusPath ? (document.lineMap[focusPath] ?? 1) + prefixLines : 1;

    const instructionsLabel =
        [prefix && (systemLabel ?? "custom system prompt"), suffix && (taskLabel ?? "custom task")]
            .filter(Boolean)
            .join(" + ") || null;

    const exported = exportedContent !== null && exportedContent === finalContent;
    const overBudget = modelLimit !== null && tokens > modelLimit;

    if (files.length === 0) {
        return <WorkspaceEmptyState />;
    }

    return (
        <div className="flex h-full flex-col">
            <ViewerHeader
                repoName={repoName}
                files={selectedFiles.length}
                tokens={tokens}
                content={finalContent}
                format={format}
                selectedFiles={selectedFiles}
                selectedPaths={Array.from(selected)}
                modelLimit={modelLimit}
                onModelLimitChange={setModelLimit}
                instructionsLabel={instructionsLabel}
                exported={exported}
                onExported={() => setExportedContent(finalContent)}
                onTogglePromptEditor={() => setShowPromptEditor((v) => !v)}
            />

            {overBudget && (
                <div
                    role="alert"
                    className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[rgba(239,68,68,0.08)] px-6 py-2 text-xs text-[var(--text-primary)]"
                >
                    <AlertTriangle size={14} className="shrink-0 text-[var(--danger)]" />
                    <span>
                        This prompt is{" "}
                        <strong>{formatTokenCount(tokens - modelLimit!)} tokens over</strong> the
                        selected model&apos;s context window. Untick some files to make it fit.
                    </span>
                    <button
                        onClick={() => window.dispatchEvent(new Event(SHOW_LARGEST_EVENT))}
                        className="font-semibold text-[var(--accent)] hover:underline"
                    >
                        Find the largest files
                    </button>
                </div>
            )}

            {showPromptEditor && (
                <PromptEditor
                    prefix={promptPrefix}
                    suffix={promptSuffix}
                    onPrefixChange={setPromptPrefix}
                    onSuffixChange={setPromptSuffix}
                    selectedSystem={systemLabel}
                    selectedTask={taskLabel}
                    onSelectedSystemChange={setSystemLabel}
                    onSelectedTaskChange={setTaskLabel}
                    onClose={() => setShowPromptEditor(false)}
                />
            )}

            <ViewerTabs
                value={format}
                onChange={setFormat}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />

            {previewFile && (
                <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[var(--accent-soft)] px-6 py-2 text-xs text-[var(--text-primary)]">
                    <Eye size={14} className="shrink-0 text-[var(--accent)]" />
                    <span className="min-w-0 truncate">
                        Previewing <strong>{previewFile.path}</strong>. It is not in your prompt.
                    </span>
                    <div className="ml-auto flex gap-2">
                        <button
                            onClick={() => {
                                selectMany([previewFile.path]);
                                useViewerStore.setState({
                                    activePath: previewFile.path,
                                    previewPath: null
                                });
                            }}
                            className="btn btn-primary btn-sm"
                        >
                            Add to prompt
                        </button>
                        <button
                            onClick={() => useViewerStore.setState({ previewPath: null })}
                            className="btn btn-secondary btn-sm"
                        >
                            Back to prompt
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-hidden">
                {previewFile ? (
                    <ViewerEditor
                        value={previewFile.content}
                        format="text"
                        language={getLanguageForPath(previewFile.path)}
                        fontSize={fontSize}
                        activeLine={1}
                    />
                ) : selectedFiles.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                        <ListChecks className="h-8 w-8 text-[var(--text-secondary)] opacity-70" />
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                            No files in your prompt yet
                        </p>
                        <p className="max-w-sm text-xs text-[var(--text-secondary)]">
                            Tick files or folders in the left panel. Each one shows its token cost,
                            so you can keep the prompt small.
                        </p>
                        <button
                            onClick={() => selectMany(files.map((f) => f.path))}
                            className="btn btn-secondary"
                        >
                            Select all {files.length} files (
                            {formatTokenCount(
                                files.reduce((sum, f) => sum + (tokenMap[f.path] ?? 0), 0)
                            )}{" "}
                            tokens)
                        </button>
                    </div>
                ) : (
                    <ViewerEditor
                        value={deferredContent}
                        format={format}
                        fontSize={fontSize}
                        activeLine={activeLine}
                    />
                )}
            </div>
        </div>
    );
}

const LANGUAGE_BY_EXT: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    mjs: "javascript",
    cjs: "javascript",
    json: "json",
    md: "markdown",
    css: "css",
    scss: "scss",
    html: "html",
    xml: "xml",
    py: "python",
    go: "go",
    rs: "rust",
    java: "java",
    kt: "kotlin",
    swift: "swift",
    rb: "ruby",
    php: "php",
    c: "c",
    h: "c",
    cpp: "cpp",
    cs: "csharp",
    sql: "sql",
    sh: "shell",
    yml: "yaml",
    yaml: "yaml"
};

function getLanguageForPath(path: string) {
    const ext = path.split(".").pop()?.toLowerCase() ?? "";
    return LANGUAGE_BY_EXT[ext] ?? "plaintext";
}
