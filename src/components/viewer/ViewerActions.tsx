"use client";

import { Copy, Download } from "lucide-react";

type Props = {
    content: string;
    format: string;
    repoName: string | null;
};

export default function ViewerActions({ content, format, repoName }: Props) {
    const copy = async () => {
        await navigator.clipboard.writeText(content);
    };

    const download = () => {
        const ext =
            format === "json"
                ? "json"
                : format === "xml"
                  ? "xml"
                  : format === "markdown"
                    ? "md"
                    : "txt";

        const ts = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];

        const name = `${repoName ?? "repo"}_${ts}.${ext}`;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 border-t border-border">
            <button
                onClick={copy}
                aria-label="Copy content"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[var(--surface-muted)]"
            >
                <Copy size={16} />
                Copy
            </button>

            <button
                onClick={download}
                aria-label="Download file"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[var(--surface-muted)]"
            >
                <Download size={16} />
                Download
            </button>
        </div>
    );
}
