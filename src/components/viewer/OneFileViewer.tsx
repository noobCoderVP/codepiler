"use client";

import { useEffect, useMemo, useState } from "react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";

import ViewerHeader from "./ViewerHeader";
import ViewerTabs from "./ViewerTabs";
import ViewerEditor from "./ViewerEditor";

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

    const tokens = useMemo(() => countTokens(document.content), [document.content]);

    const repoName = files.length > 0 ? files[0].path.split("/")[0] : null;
    const activeLine = activePath ? (document.lineMap[activePath] ?? 1) : 1;

    return (
        <div className="flex h-full flex-col">
            <ViewerHeader
                repoName={repoName}
                files={selectedFiles.length}
                tokens={tokens}
                content={document.content}
                format={format}
                activePath={activePath}
            />

            <ViewerTabs
                value={format}
                onChange={setFormat}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />

            <div className="flex-1 overflow-hidden">
                <ViewerEditor
                    value={document.content}
                    format={format}
                    fontSize={fontSize}
                    activeLine={activeLine}
                />
            </div>
        </div>
    );
}
