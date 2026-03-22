type Props = {
    files: number;
    tokens: number;
};

export default function ViewerChips({ files, tokens }: Props) {
    return (
        <div className="flex items-center gap-2">
            <div className="rounded-full border border-[rgba(15,23,42,0.08)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] dark:border-[var(--border)] dark:bg-[var(--surface-muted)]">
                {files} Files
            </div>

            <div className="rounded-full border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.12)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] dark:border-[rgba(59,130,246,0.3)] dark:bg-[rgba(59,130,246,0.18)]">
                {tokens.toLocaleString()} Tokens
            </div>
        </div>
    );
}
