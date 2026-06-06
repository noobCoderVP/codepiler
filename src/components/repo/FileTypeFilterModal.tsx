"use client";

import { useEffect, useRef } from "react";
import { X, Filter } from "lucide-react";

type Props = {
    allExtensions: string[];
    activeExtensions: Set<string>;
    onChange: (exts: Set<string>) => void;
    onClose: () => void;
};

function extLabel(ext: string) {
    return ext === "" ? "(no extension)" : `.${ext}`;
}

export default function FileTypeFilterModal({
    allExtensions,
    activeExtensions,
    onChange,
    onClose
}: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const toggle = (ext: string) => {
        const next = new Set(activeExtensions);
        if (next.has(ext)) next.delete(ext);
        else next.add(ext);
        onChange(next);
    };

    const selectAll = () => onChange(new Set(allExtensions));
    const clearAll = () => onChange(new Set());

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
        >
            <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                        <Filter size={15} className="text-[var(--accent)]" />
                        Filter by File Type
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">
                        {activeExtensions.size === 0
                            ? "Showing all types"
                            : `${activeExtensions.size} of ${allExtensions.length} selected`}
                    </span>
                    <div className="flex gap-3">
                        <button
                            onClick={selectAll}
                            className="text-xs font-medium text-[var(--accent)] hover:underline"
                        >
                            All
                        </button>
                        <button
                            onClick={clearAll}
                            className="text-xs font-medium text-[var(--text-secondary)] hover:underline"
                        >
                            None
                        </button>
                    </div>
                </div>

                <div className="max-h-72 overflow-y-auto px-5 py-3">
                    <div className="grid grid-cols-2 gap-2">
                        {allExtensions.map((ext) => {
                            const active = activeExtensions.has(ext);
                            return (
                                <button
                                    key={ext}
                                    onClick={() => toggle(ext)}
                                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                                        active
                                            ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                                            : "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                                    }`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${active ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`}
                                    />
                                    {extLabel(ext)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-[var(--border)] px-5 py-3 flex justify-end gap-2">
                    {activeExtensions.size > 0 && (
                        <button
                            onClick={clearAll}
                            className="rounded-xl border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
                        >
                            Remove Filter
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
