"use client";

import { ChevronDown, Gauge, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { parseTokenAmount } from "@/lib/token-utils";

export type TokenRange = { min: string; max: string };

const PRESETS: { label: string; range: TokenRange }[] = [
    { label: "Any size", range: { min: "", max: "" } },
    { label: "Under 1K tokens", range: { min: "", max: "1k" } },
    { label: "1K – 5K tokens", range: { min: "1k", max: "5k" } },
    { label: "5K – 20K tokens", range: { min: "5k", max: "20k" } },
    { label: "Over 20K tokens", range: { min: "20k", max: "" } }
];

/** Parsed limits; unparseable input counts as no limit so a typo never hides every file. */
export function parseRange(range: TokenRange) {
    const min = parseTokenAmount(range.min);
    const max = parseTokenAmount(range.max);
    return {
        min: min === null || Number.isNaN(min) ? null : min,
        max: max === null || Number.isNaN(max) ? null : max
    };
}

export function inRange(tokens: number, { min, max }: { min: number | null; max: number | null }) {
    return (min === null || tokens >= min) && (max === null || tokens <= max);
}

const short = (n: number) => (n >= 1000 ? `${+(n / 1000).toFixed(1)}K` : String(n));

function describe(range: TokenRange) {
    const { min, max } = parseRange(range);
    if (min !== null && max !== null) return `${short(min)} – ${short(max)} tokens`;
    if (min !== null) return `${short(min)}+ tokens`;
    if (max !== null) return `Up to ${short(max)} tokens`;
    return "Any size";
}

const findPreset = (range: TokenRange) =>
    PRESETS.find((p) => p.range.min === range.min && p.range.max === range.max);

/** Size dropdown: presets with live file counts, plus a way into the custom inputs. */
export function TokenRangeMenu({
    range,
    custom,
    tokens,
    onChange,
    onCustom
}: {
    range: TokenRange;
    custom: boolean;
    /** Token counts of the files the other filters leave, for the per-preset counts. */
    tokens: number[];
    onChange: (range: TokenRange) => void;
    onCustom: () => void;
}) {
    const preset = custom ? undefined : findPreset(range);
    const active = range.min !== "" || range.max !== "";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="btn btn-secondary btn-sm min-w-0 flex-1 justify-between"
                    data-active={active}
                    title="Show only files within a token range"
                >
                    <span className="flex min-w-0 items-center gap-1.5">
                        <Gauge size={13} className="shrink-0" />
                        <span className="truncate">{preset ? preset.label : describe(range)}</span>
                    </span>
                    <ChevronDown size={12} className="shrink-0 opacity-70" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>Tokens per file</DropdownMenuLabel>
                {PRESETS.map((p) => {
                    const limits = parseRange(p.range);
                    const count = tokens.filter((t) => inRange(t, limits)).length;

                    return (
                        <DropdownMenuItem
                            key={p.label}
                            checked={preset === p}
                            onSelect={() => onChange(p.range)}
                        >
                            <span className="flex w-full items-center justify-between gap-4">
                                {p.label}
                                <span className="text-[11px] font-normal tabular-nums text-[var(--text-secondary)]">
                                    {count}
                                </span>
                            </span>
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem checked={!preset} onSelect={onCustom}>
                    Custom range…
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/** Labelled min / max fields for a custom range. Accepts shorthand such as 5k. */
export function TokenRangeInputs({
    range,
    onChange,
    onClose
}: {
    range: TokenRange;
    onChange: (range: TokenRange) => void;
    onClose: () => void;
}) {
    const min = parseTokenAmount(range.min);
    const max = parseTokenAmount(range.max);
    const error =
        Number.isNaN(min) || Number.isNaN(max)
            ? "Use a number such as 5000 or 5k."
            : min !== null && max !== null && min > max
              ? "Min is larger than max."
              : null;

    const field = (key: keyof TokenRange, label: string, placeholder: string) => (
        <label className="min-w-0 flex-1">
            <span className="mb-1 block text-[11px] font-semibold text-[var(--text-secondary)]">
                {label}
            </span>
            <input
                value={range[key]}
                onChange={(e) => onChange({ ...range, [key]: e.target.value })}
                placeholder={placeholder}
                inputMode="decimal"
                className="input px-2.5 py-1.5 text-xs"
                aria-invalid={error !== null}
            />
        </label>
    );

    return (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-2.5">
            <div className="flex items-end gap-2">
                {field("min", "Min tokens", "0")}
                <span className="pb-2 text-xs text-[var(--text-secondary)]">–</span>
                {field("max", "Max tokens", "No limit")}
                <button
                    onClick={onClose}
                    aria-label="Clear custom range"
                    title="Clear custom range"
                    className="btn btn-ghost btn-icon h-[30px] w-[30px] shrink-0"
                >
                    <X size={14} />
                </button>
            </div>
            <p
                role={error ? "alert" : undefined}
                className={`mt-1.5 text-[11px] ${error ? "text-[var(--danger)]" : "text-[var(--text-secondary)]"}`}
            >
                {error ?? "Tip: type 5k for 5,000 tokens."}
            </p>
        </div>
    );
}
