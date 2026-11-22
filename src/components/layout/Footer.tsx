"use client";

import Link from "next/link";
import { GITHUB_URL } from "./Header";

const columns = [
    {
        title: "Product",
        links: [
            { label: "Open app", href: "/app" },
            { label: "How it works", href: "/#how-it-works" },
            { label: "Features", href: "/#features" },
            { label: "FAQ", href: "/#faq" },
            { label: "Guides", href: "/guides" },
            { label: "Prompt library", href: "/prompts" }
        ]
    },
    {
        title: "Docs",
        links: [
            { label: "Getting started", href: "/docs" },
            { label: "Importing a project", href: "/docs/uploading" },
            { label: "Workspace guide", href: "/docs/viewer" },
            { label: "Asking good questions", href: "/docs/examples" }
        ]
    },
    {
        title: "Open source",
        links: [
            { label: "GitHub", href: GITHUB_URL },
            { label: "Contributing", href: `${GITHUB_URL}/blob/master/CONTRIBUTING.md` },
            { label: "License", href: `${GITHUB_URL}/blob/master/LICENSE` }
        ]
    }
];

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                    <h3 className="text-lg font-semibold">CodePiler</h3>
                    <p className="mt-3 max-w-xs text-sm text-[var(--text-secondary)]">
                        Pick the files that matter and ask AI a focused question about your code.
                    </p>
                </div>

                {columns.map((column) => (
                    <div key={column.title}>
                        <h4 className="mb-3 font-medium">{column.title}</h4>
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    {link.href.startsWith("http") ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-[var(--text-primary)]"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="hover:text-[var(--text-primary)]"
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t border-[var(--border)] px-6 py-4 text-center text-sm text-[var(--text-secondary)]">
                © {new Date().getFullYear()} CodePiler
            </div>
        </footer>
    );
}
