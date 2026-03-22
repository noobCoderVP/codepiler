"use client";

type Props = {
    fontSize: number;
    setFontSize: (size: number) => void;
};

export default function FontSizeControls({ fontSize, setFontSize }: Props) {
    return (
        <div className="flex items-center gap-1">
            <button
                onClick={() => setFontSize(Math.max(11, fontSize - 1))}
                className="rounded px-2 py-1 text-sm text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            >
                A-
            </button>

            <button
                onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                className="rounded px-2 py-1 text-sm text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            >
                A+
            </button>
        </div>
    );
}
