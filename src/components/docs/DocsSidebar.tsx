"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, CircleHelp, Eye, Upload } from "lucide-react";
import { docsPages } from "@/lib/docs-content";

const iconMap = {
    "": BookOpenText,
    uploading: Upload,
    viewer: Eye,
    examples: CircleHelp
} as const;

export default function DocsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="top-24 self-start rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm lg:sticky">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Documentation
            </p>

            <nav className="mt-3 space-y-1">
                {docsPages.map((page) => {
                    const href = page.slug ? `/docs/${page.slug}` : "/docs";
                    const active = pathname === href;
                    const Icon = iconMap[page.slug as keyof typeof iconMap] ?? BookOpenText;

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition ${
                                active
                                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                            }`}
                        >
                            <Icon size={15} />
                            {page.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
