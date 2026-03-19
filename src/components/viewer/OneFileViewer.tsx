"use client";

import { useMemo, useState } from "react";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";

import ViewerHeader from "./ViewerHeader";
import ViewerTabs from "./ViewerTabs";
import ViewerEditor from "./ViewerEditor";
import ViewerActions from "./ViewerActions";

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

    const [format, setFormat] = useState<ViewerFormat>("text");
    const [fontSize, setFontSize] = useState(13);

    const selectedFiles = useMemo(() => {
        return files.filter((f) => selected.has(f.path));
    }, [files, selected]);

    const output = useMemo(() => {
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

    const tokens = useMemo(() => countTokens(output), [output]);

    const repoName = files.length > 0 ? files[0].path.split("/")[0] : null;

    return (
        <div className="flex h-full flex-col">
            <ViewerHeader repoName={repoName} />

            <ViewerTabs
                value={format}
                onChange={setFormat}
                files={selectedFiles.length}
                tokens={tokens}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />

            <div className="flex-1 overflow-hidden">
                <ViewerEditor value={output} format={format} fontSize={fontSize} />
            </div>

            <ViewerActions content={output} format={format} repoName={repoName} />
        </div>
    );
}
