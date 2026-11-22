"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

type ModelPreset = { name: string; size: string; limit: number | null; group: string };

// Context windows (input + output) from each provider's docs, checked November 2026.
export const MODEL_PRESETS: ModelPreset[] = [
    { name: "No limit", size: "", limit: null, group: "General" },
    // Anthropic
    { name: "Claude Fable 5.2", size: "1M", limit: 1_000_000, group: "Anthropic" },
    { name: "Claude Opus 5.5", size: "1M", limit: 1_000_000, group: "Anthropic" },
    { name: "Claude Sonnet 5.5", size: "1M", limit: 1_000_000, group: "Anthropic" },
    { name: "Claude Haiku 5.5", size: "1M", limit: 1_000_000, group: "Anthropic" },
    // OpenAI
    { name: "GPT-6.2 Astra", size: "1.05M", limit: 1_050_000, group: "OpenAI" },
    { name: "GPT-6.2 Sol", size: "1.05M", limit: 1_050_000, group: "OpenAI" },
    { name: "GPT-6.1 Terra", size: "1.05M", limit: 1_050_000, group: "OpenAI" },
    { name: "GPT-6 Luna", size: "1.05M", limit: 1_050_000, group: "OpenAI" },
    // Google
    { name: "Gemini 4 Neon", size: "1M", limit: 1_048_576, group: "Google" },
    { name: "Gemini 4 Hydrogen", size: "1M", limit: 1_048_576, group: "Google" },
    { name: "Gemini 4 Carbon", size: "1M", limit: 1_048_576, group: "Google" },
    { name: "Gemini 4 Argon", size: "1M", limit: 1_048_576, group: "Google" },
    // Open weights
    { name: "DeepSeek V4 Pro", size: "1M", limit: 1_000_000, group: "Open weights" },
    { name: "DeepSeek V4.1 Flash", size: "1M", limit: 1_000_000, group: "Open weights" },
    { name: "GLM 5.3", size: "1M", limit: 1_000_000, group: "Open weights" },
    { name: "Llama 4 Scout", size: "10M", limit: 10_000_000, group: "Open weights" },
    { name: "Llama 4 Maverick", size: "1M", limit: 1_000_000, group: "Open weights" },
    { name: "Qwen 3.5", size: "262K", limit: 262_144, group: "Open weights" }
];

const GROUPS = ["General", "Anthropic", "OpenAI", "Google", "Open weights"];

const presetLabel = (m: ModelPreset) => (m.size ? `${m.name} · ${m.size}` : m.name);

type Props = {
    files: number;
    tokens: number;
    modelLimit: number | null;
    onModelLimitChange: (limit: number | null) => void;
};

export default function ViewerChips({ files, tokens, modelLimit, onModelLimitChange }: Props) {
    // Many models share a context size, so the selection is tracked by model name, not by limit.
    const [selectedName, setSelectedName] = useState(MODEL_PRESETS[0].name);
    const selected =
        MODEL_PRESETS.find((m) => m.name === selectedName && m.limit === modelLimit) ??
        MODEL_PRESETS[0];

    const pct = modelLimit ? Math.min((tokens / modelLimit) * 100, 100) : null;
    const barColor =
        pct === null
            ? ""
            : pct >= 90
              ? "bg-red-500"
              : pct >= 70
                ? "bg-amber-400"
                : "bg-emerald-500";

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Files chip */}
            <div className="rounded-full border border-[rgba(15,23,42,0.08)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] dark:border-[var(--border)] dark:bg-[var(--surface-muted)]">
                {files} {files === 1 ? "File" : "Files"}
            </div>

            {/* Token chip + progress bar */}
            <div className="flex flex-col gap-0.5">
                <div className="rounded-full border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.12)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] dark:border-[rgba(59,130,246,0.3)] dark:bg-[rgba(59,130,246,0.18)]">
                    {tokens.toLocaleString()}
                    {modelLimit && selected.size ? ` / ${selected.size}` : ""} Tokens
                </div>
                {pct !== null && (
                    <div className="mx-3 h-1 overflow-hidden rounded-full bg-[var(--border)]">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Model selector */}
            <Select
                value={selected.name}
                onValueChange={(name) => {
                    const preset = MODEL_PRESETS.find((m) => m.name === name) ?? MODEL_PRESETS[0];
                    setSelectedName(preset.name);
                    onModelLimitChange(preset.limit);
                }}
            >
                <SelectTrigger className="h-auto min-w-[11rem]" title="Set token budget">
                    <SelectValue>{presetLabel(selected)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {GROUPS.map((group, gi) => {
                        const items = MODEL_PRESETS.filter((m) => m.group === group);
                        return (
                            <SelectGroup key={group}>
                                {gi > 0 && <SelectSeparator />}
                                <SelectLabel>{group}</SelectLabel>
                                {items.map((m) => (
                                    <SelectItem key={m.name} value={m.name}>
                                        {presetLabel(m)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
