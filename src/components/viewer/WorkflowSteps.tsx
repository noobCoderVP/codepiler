"use client";

import { Check } from "lucide-react";

type Props = {
    selectedCount: number;
    hasInstructions: boolean;
    exported: boolean;
    onOpenInstructions: () => void;
};

type StepState = "done" | "current" | "todo";

export default function WorkflowSteps({
    selectedCount,
    hasInstructions,
    exported,
    onOpenInstructions
}: Props) {
    const hasSelection = selectedCount > 0;

    const steps: { label: string; state: StepState; onClick?: () => void }[] = [
        { label: "Import", state: "done" },
        { label: "Select files", state: hasSelection ? "done" : "current" },
        {
            label: "Instructions (optional)",
            state: hasInstructions ? "done" : hasSelection && !exported ? "current" : "todo",
            onClick: onOpenInstructions
        },
        {
            label: "Copy & paste into your AI",
            state: exported ? "done" : hasSelection ? "current" : "todo"
        }
    ];

    const hint = !hasSelection
        ? "Tick the files you want the AI to see in the left panel."
        : exported
          ? "Done! Paste it into your AI chat. Change files or instructions any time and copy again."
          : hasInstructions
            ? "Looks good. Copy the prompt and paste it into ChatGPT, Claude or Gemini."
            : "Optionally tell the AI what to do with Instructions, then copy the prompt.";

    return (
        <div className="flex min-w-0 flex-col gap-1.5">
            <ol className="flex flex-wrap items-center gap-1.5" aria-label="Progress">
                {steps.map((step, index) => {
                    const content = (
                        <>
                            <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                                    step.state === "done"
                                        ? "bg-[var(--success)] text-white"
                                        : step.state === "current"
                                          ? "bg-[var(--accent)] text-white"
                                          : "bg-[var(--surface-subtle)] text-[var(--text-secondary)]"
                                }`}
                            >
                                {step.state === "done" ? (
                                    <Check size={10} strokeWidth={3} />
                                ) : (
                                    index + 1
                                )}
                            </span>
                            {step.label}
                        </>
                    );

                    const className = `flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                        step.state === "current"
                            ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]"
                            : "border-[var(--border)] text-[var(--text-secondary)]"
                    }`;

                    return (
                        <li key={step.label} className="flex items-center gap-1.5">
                            {index > 0 && <span className="h-px w-3 bg-[var(--border)]" />}
                            {step.onClick ? (
                                <button
                                    onClick={step.onClick}
                                    className={`${className} transition hover:border-[var(--accent)]`}
                                    aria-current={step.state === "current" ? "step" : undefined}
                                >
                                    {content}
                                </button>
                            ) : (
                                <span
                                    className={className}
                                    aria-current={step.state === "current" ? "step" : undefined}
                                >
                                    {content}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
            <p className="text-xs text-[var(--text-secondary)]">{hint}</p>
        </div>
    );
}
