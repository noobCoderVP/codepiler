export function formatTokenCount(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

/**
 * Parses a typed token amount: "5000", "12,000", "5k", "1.5K" or "2m".
 * Empty input is null (no limit); anything else unparseable is NaN.
 */
export function parseTokenAmount(value: string): number | null {
    const v = value
        .trim()
        .toLowerCase()
        .replace(/[,_\s]/g, "");
    if (!v) return null;
    const match = /^(\d+(?:\.\d+)?)([km]?)$/.exec(v);
    if (!match) return NaN;
    const unit = match[2] === "k" ? 1_000 : match[2] === "m" ? 1_000_000 : 1;
    return Math.round(parseFloat(match[1]) * unit);
}

export function formatBytes(bytes: number): string {
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
    if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`;
    return `${bytes} B`;
}
