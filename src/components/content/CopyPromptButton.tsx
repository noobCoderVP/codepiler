"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyPromptButton({ text }: { text: string }) {
    const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setState("copied");
        } catch {
            setState("failed");
        }
        setTimeout(() => setState("idle"), 2000);
    };

    return (
        <button
            onClick={copy}
            className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
        >
            {state === "copied" ? <Check size={15} /> : <Copy size={15} />}
            {state === "copied" ? "Copied" : state === "failed" ? "Copy blocked" : "Copy prompt"}
        </button>
    );
}
