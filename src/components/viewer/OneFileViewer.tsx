"use client";

import { useEffect, useMemo, useState } from "react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";

import ViewerHeader from "./ViewerHeader";
import ViewerTabs from "./ViewerTabs";
import ViewerEditor from "./ViewerEditor";
import PromptEditor from "./PromptEditor";

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
    const selected = useSelectionStore((s) => s.selected);
    const activePath = useViewerStore((s) => s.activePath);
    const setActivePath = useViewerStore((s) => s.setActivePath);

    const [format, setFormat] = useState<ViewerFormat>("text");
    const [fontSize, setFontSize] = useState(13);
    const [modelLimit, setModelLimit] = useState<number | null>(null);
    const [promptPrefix, setPromptPrefix] = useState("");
    const [promptSuffix, setPromptSuffix] = useState("");
    const [showPromptEditor, setShowPromptEditor] = useState(false);

    const selectedFiles = useMemo(() => {
        return files.filter((file) => selected.has(file.path));
    }, [files, selected]);

    useEffect(() => {
        if (selectedFiles.length === 0) {
            setActivePath(null);
            return;
        }

        if (!activePath || !selectedFiles.some((file) => file.path === activePath)) {
            setActivePath(selectedFiles[0].path);
        }
    }, [activePath, selectedFiles, setActivePath]);

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

    const finalContent = useMemo(() => {
        const parts: string[] = [];
        if (promptPrefix.trim()) parts.push(promptPrefix.trim());
        parts.push(document.content);
        if (promptSuffix.trim()) parts.push(promptSuffix.trim());
        return parts.join("\n\n");
    }, [document.content, promptPrefix, promptSuffix]);

    const tokens = useMemo(() => countTokens(finalContent), [finalContent]);

    const repoName = files.length > 0 ? files[0].path.split("/")[0] : null;
    const activeLine = activePath ? (document.lineMap[activePath] ?? 1) : 1;

    return (
        <div className="flex h-full flex-col">
            <ViewerHeader
                repoName={repoName}
                files={selectedFiles.length}
                tokens={tokens}
                content={finalContent}
                format={format}
                activePath={activePath}
                selectedFiles={selectedFiles}
                selectedPaths={Array.from(selected)}
                modelLimit={modelLimit}
                onModelLimitChange={setModelLimit}
                onTogglePromptEditor={() => setShowPromptEditor((v) => !v)}
            />

            {showPromptEditor && (
                <PromptEditor
                    prefix={promptPrefix}
                    suffix={promptSuffix}
                    onPrefixChange={setPromptPrefix}
                    onSuffixChange={setPromptSuffix}
                    onClose={() => setShowPromptEditor(false)}
                />
            )}

            <ViewerTabs
                value={format}
                onChange={setFormat}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />

            <div className="flex-1 overflow-hidden">
                <ViewerEditor
                    value={finalContent}
                    format={format}
                    fontSize={fontSize}
                    activeLine={activeLine}
                />
            </div>
        </div>
    );
}
