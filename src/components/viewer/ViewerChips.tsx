"use client";

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

export const MODEL_PRESETS: { label: string; limit: number | null; group: string }[] = [
    { label: "No limit", limit: null, group: "General" },
    // Anthropic Claude
    { label: "Claude Opus 4 · 200K", limit: 200_000, group: "Anthropic" },
    { label: "Claude Sonnet 4 · 200K", limit: 200_000, group: "Anthropic" },
    { label: "Claude Haiku 4 · 200K", limit: 200_000, group: "Anthropic" },
    { label: "Claude 3.7 Sonnet · 200K", limit: 200_000, group: "Anthropic" },
    { label: "Claude 3.5 Sonnet · 200K", limit: 200_000, group: "Anthropic" },
    { label: "Claude 3.5 Haiku · 200K", limit: 200_000, group: "Anthropic" },
    { label: "Claude 3 Opus · 200K", limit: 200_000, group: "Anthropic" },
    // OpenAI
    { label: "o3 · 200K", limit: 200_000, group: "OpenAI" },
    { label: "o3-mini · 200K", limit: 200_000, group: "OpenAI" },
    { label: "o1 · 200K", limit: 200_000, group: "OpenAI" },
    { label: "o1-mini · 128K", limit: 128_000, group: "OpenAI" },
    { label: "GPT-4.1 · 1M", limit: 1_047_576, group: "OpenAI" },
    { label: "GPT-4o · 128K", limit: 128_000, group: "OpenAI" },
    { label: "GPT-4o mini · 128K", limit: 128_000, group: "OpenAI" },
    { label: "GPT-4 Turbo · 128K", limit: 128_000, group: "OpenAI" },
    { label: "GPT-3.5 Turbo · 16K", limit: 16_385, group: "OpenAI" },
    // Google
    { label: "Gemini 2.5 Pro · 1M", limit: 1_048_576, group: "Google" },
    { label: "Gemini 2.5 Flash · 1M", limit: 1_048_576, group: "Google" },
    { label: "Gemini 2.0 Flash · 1M", limit: 1_048_576, group: "Google" },
    { label: "Gemini 1.5 Pro · 2M", limit: 2_097_152, group: "Google" },
    { label: "Gemini 1.5 Flash · 1M", limit: 1_048_576, group: "Google" },
    // Meta / Open
    { label: "Llama 3.1 405B · 128K", limit: 128_000, group: "Open Source" },
    { label: "Llama 3.1 70B · 128K", limit: 128_000, group: "Open Source" },
    { label: "Mistral Large · 128K", limit: 128_000, group: "Open Source" },
    { label: "DeepSeek V3 · 64K", limit: 65_536, group: "Open Source" },
    { label: "Qwen 2.5 72B · 128K", limit: 128_000, group: "Open Source" }
];

const GROUPS = ["General", "Anthropic", "OpenAI", "Google", "Open Source"];

type Props = {
    files: number;
    tokens: number;
    modelLimit: number | null;
    onModelLimitChange: (limit: number | null) => void;
};

export default function ViewerChips({ files, tokens, modelLimit, onModelLimitChange }: Props) {
    const pct = modelLimit ? Math.min((tokens / modelLimit) * 100, 100) : null;
    const barColor =
        pct === null
            ? ""
            : pct >= 90
              ? "bg-red-500"
              : pct >= 70
                ? "bg-amber-400"
                : "bg-emerald-500";

    const selectedLabel = MODEL_PRESETS.find((m) => m.limit === modelLimit)?.label ?? "No limit";

    const currentValue = modelLimit !== null ? String(modelLimit) : "no-limit";

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
                    {modelLimit
                        ? ` / ${modelLimit >= 1_000_000 ? `${(modelLimit / 1_000_000).toFixed(modelLimit % 1_000_000 === 0 ? 0 : 1)}M` : `${Math.round(modelLimit / 1000)}K`}`
                        : ""}{" "}
                    Tokens
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
                value={currentValue}
                onValueChange={(val) => {
                    onModelLimitChange(val === "no-limit" ? null : Number(val));
                }}
            >
                <SelectTrigger className="h-auto min-w-[11rem]" title="Set token budget">
                    <SelectValue>{selectedLabel}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {GROUPS.map((group, gi) => {
                        const items = MODEL_PRESETS.filter((m) => m.group === group);
                        return (
                            <SelectGroup key={group}>
                                {gi > 0 && <SelectSeparator />}
                                <SelectLabel>{group}</SelectLabel>
                                {items.map((m) => (
                                    <SelectItem
                                        key={m.label}
                                        value={m.limit !== null ? String(m.limit) : "no-limit"}
                                    >
                                        {m.label}
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
