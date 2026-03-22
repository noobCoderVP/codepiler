"use client";

import { Check, Minus } from "lucide-react";

type Props = {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
};

export default function Checkbox({ checked, indeterminate, onChange }: Props) {
    return (
        <button
            role="checkbox"
            aria-checked={indeterminate ? "mixed" : checked}
            aria-label="Select item"
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
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text-secondary)]"
                }
            `}
        >
            {checked && <Check size={12} color="white" strokeWidth={3} />}

            {!checked && indeterminate && <Minus size={12} color="white" strokeWidth={3} />}
        </button>
    );
}
