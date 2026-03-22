"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";

type Props = {
    content: string;
    format: string;
    repoName: string | null;
};

export default function ViewerActions({ content, format, repoName }: Props) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
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

        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = name;
        anchor.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={copy}
                aria-label="Copy content"
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
            </button>

            <button
                onClick={download}
                aria-label="Download file"
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            >
                <Download size={16} />
                Download
            </button>
        </div>
    );
}
