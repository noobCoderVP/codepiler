"use client";

import { useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SYSTEM_PRESETS, TASK_PRESETS } from "@/lib/prompt-presets";

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
    prefix: string;
    suffix: string;
    onPrefixChange: (v: string) => void;
    onSuffixChange: (v: string) => void;
    selectedSystem: string | null;
    selectedTask: string | null;
    onSelectedSystemChange: (label: string | null) => void;
    onSelectedTaskChange: (label: string | null) => void;
    onClose: () => void;
};

function PresetPicker({
    presets,
    triggerLabel,
    selectedLabel,
    onSelect
}: {
    presets: { label: string; prompt: string }[];
    triggerLabel: string;
    selectedLabel: string | null;
    onSelect: (p: { label: string; prompt: string }) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface)] hover:text-[var(--text-primary)] data-[state=open]:border-[var(--accent)] data-[state=open]:text-[var(--accent)]">
                    <span className="max-w-[14rem] truncate">{selectedLabel ?? triggerLabel}</span>
                    <ChevronDown size={11} className="shrink-0 opacity-60" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={6}>
                <DropdownMenuLabel>{triggerLabel}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {presets.map((p) => (
                    <DropdownMenuItem
                        key={p.label}
                        checked={p.label === selectedLabel}
                        onSelect={() => onSelect(p)}
                    >
                        {p.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function PromptEditor({
    prefix,
    suffix,
    onPrefixChange,
    onSuffixChange,
    selectedSystem,
    selectedTask,
    onSelectedSystemChange: setSelectedSystem,
    onSelectedTaskChange: setSelectedTask,
    onClose
}: Props) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const applySystem = (p: { label: string; prompt: string }) => {
        setSelectedSystem(p.label);
        onPrefixChange(p.prompt);
    };

    const applyTask = (p: { label: string; prompt: string }) => {
        setSelectedTask(p.label);
        onSuffixChange(p.prompt);
    };

    const statusLine = [
        prefix.trim() && `System: ${selectedSystem ?? "Custom"}`,
        suffix.trim() && `Task: ${selectedTask ?? "Custom"}`
    ]
        .filter(Boolean)
        .join(" · ");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div
                className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(15,23,42,0.2)]"
                style={{ maxHeight: "88vh" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
                    <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                            Instructions for the AI
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                            Pick a preset or write your own. The system prompt goes before your code
                            and the task goes after it. Both count toward the token total.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 shrink-0 rounded-lg p-1.5 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                        title="Close"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="grid flex-1 grid-cols-1 divide-y divide-[var(--border)] overflow-auto md:grid-cols-2 md:divide-x md:divide-y-0 md:overflow-hidden">
                    {/* System Prompt */}
                    <div className="flex flex-col gap-3 overflow-hidden p-5">
                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-[var(--text-primary)]">
                                    System Prompt
                                </p>
                                <p className="truncate text-[11px] text-[var(--text-secondary)]">
                                    Prepended before the code
                                </p>
                            </div>
                            <PresetPicker
                                presets={SYSTEM_PRESETS}
                                triggerLabel="Language presets"
                                selectedLabel={selectedSystem}
                                onSelect={applySystem}
                            />
                        </div>
                        <textarea
                            value={prefix}
                            onChange={(e) => {
                                onPrefixChange(e.target.value);
                                if (!e.target.value.trim()) setSelectedSystem(null);
                            }}
                            placeholder="You are an expert software engineer reviewing this codebase. Analyze it carefully and provide precise, actionable feedback…"
                            className="flex-1 resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 font-mono text-xs leading-relaxed text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] transition"
                            style={{ minHeight: "320px" }}
                        />
                        {prefix && (
                            <div className="flex items-center gap-2">
                                {selectedSystem && (
                                    <span className="flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                                        <Check size={9} />
                                        {selectedSystem}
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        onPrefixChange("");
                                        setSelectedSystem(null);
                                    }}
                                    className="ml-auto text-[11px] text-[var(--text-secondary)] transition hover:text-red-500 hover:underline"
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Task */}
                    <div className="flex flex-col gap-3 overflow-hidden p-5">
                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-[var(--text-primary)]">
                                    Task
                                </p>
                                <p className="truncate text-[11px] text-[var(--text-secondary)]">
                                    Appended after the code
                                </p>
                            </div>
                            <PresetPicker
                                presets={TASK_PRESETS}
                                triggerLabel="Task presets"
                                selectedLabel={selectedTask}
                                onSelect={applyTask}
                            />
                        </div>
                        <textarea
                            value={suffix}
                            onChange={(e) => {
                                onSuffixChange(e.target.value);
                                if (!e.target.value.trim()) setSelectedTask(null);
                            }}
                            placeholder="Now analyze the codebase above and help me with the following task…"
                            className="flex-1 resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 font-mono text-xs leading-relaxed text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] transition"
                            style={{ minHeight: "320px" }}
                        />
                        {suffix && (
                            <div className="flex items-center gap-2">
                                {selectedTask && (
                                    <span className="flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                                        <Check size={9} />
                                        {selectedTask}
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        onSuffixChange("");
                                        setSelectedTask(null);
                                    }}
                                    className="ml-auto text-[11px] text-[var(--text-secondary)] transition hover:text-red-500 hover:underline"
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-muted)] px-6 py-3">
                    <p className="text-[11px] text-[var(--text-secondary)]">
                        {statusLine || "No instructions yet, so only the code will be exported"}
                    </p>
                    <button
                        onClick={onClose}
                        className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
