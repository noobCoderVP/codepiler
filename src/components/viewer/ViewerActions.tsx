"use client";

import { AlertCircle, Check, Copy, Download } from "lucide-react";
import { useState } from "react";

type Props = {
    content: string;
    format: string;
    repoName: string | null;
    disabled?: boolean;
    onExported: () => void;
};

export default function ViewerActions({ content, format, repoName, disabled, onExported }: Props) {
    const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopyState("copied");
            onExported();
        } catch {
            setCopyState("failed");
        }
        window.setTimeout(() => setCopyState("idle"), 1800);
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

        // revoking synchronously can cancel the download in some browsers
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        onExported();
    };

    return (
        <div data-tour="export" className="flex items-center gap-2">
            <button
                onClick={download}
                disabled={disabled}
                title="Download the prompt as a file"
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            >
                <Download size={14} />
                Download
            </button>

            <button
                onClick={copy}
                disabled={disabled}
                title="Copy the full prompt, then paste it into ChatGPT, Claude or Gemini"
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    copyState === "failed"
                        ? "bg-[var(--danger)]"
                        : copyState === "copied"
                          ? "bg-[var(--success)]"
                          : "bg-[var(--accent)] hover:opacity-90"
                }`}
            >
                {copyState === "copied" ? (
                    <Check size={14} />
                ) : copyState === "failed" ? (
                    <AlertCircle size={14} />
                ) : (
                    <Copy size={14} />
                )}
                {copyState === "copied"
                    ? "Copied!"
                    : copyState === "failed"
                      ? "Copy blocked, use Download"
                      : "Copy prompt"}
            </button>
        </div>
    );
}
