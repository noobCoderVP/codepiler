type Props = {
    files: number;
    tokens: number;
};

export default function ViewerChips({ files, tokens }: Props) {
    return (
        <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-md text-xs font-medium bg-[var(--surface-muted)] border border-[var(--border)]">
                {files} Files
            </div>

            <div className="px-3 py-1 rounded-md text-xs font-medium bg-[var(--accent-soft)] text-[var(--text-primary)] border border-[var(--border)]">
                {tokens.toLocaleString()} Tokens
            </div>
        </div>
    );
}
