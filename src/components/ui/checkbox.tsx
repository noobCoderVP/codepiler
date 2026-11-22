"use client";

import { Check, Minus } from "lucide-react";

type Props = {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
    label?: string;
};

export default function Checkbox({ checked, indeterminate, onChange, label }: Props) {
    return (
        <button
            role="checkbox"
            aria-checked={indeterminate ? "mixed" : checked}
            aria-label={label ?? "Select item"}
            title={label}
            onClick={(e) => {
                e.stopPropagation();
                onChange();
            }}
            className={`
                flex items-center justify-center
                w-[16px] h-[16px]
                rounded-[4px]
                border
                shadow-sm
                transition
                ${
                    checked || indeterminate
                        ? "bg-[var(--accent)] border-[var(--accent)]"
                        : "border-[var(--border-strong)] bg-[var(--control)] hover:border-[var(--accent)]"
                }
            `}
        >
            {checked && <Check size={12} color="white" strokeWidth={3} />}

            {!checked && indeterminate && <Minus size={12} color="white" strokeWidth={3} />}
        </button>
    );
}
