import Link from "next/link";

export default function LinkCard({
    href,
    title,
    description,
    label
}: {
    href: string;
    title: string;
    description: string;
    label?: string;
}) {
    return (
        <Link
            href={href}
            className="block rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition hover:border-[var(--accent)]"
        >
            {label && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {label}
                </p>
            )}
            <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
        </Link>
    );
}
