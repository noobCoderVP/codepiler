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
        <button onClick={copy} className="btn btn-secondary px-4 text-sm">
            {state === "copied" ? <Check size={15} /> : <Copy size={15} />}
            {state === "copied" ? "Copied" : state === "failed" ? "Copy blocked" : "Copy prompt"}
        </button>
    );
}
