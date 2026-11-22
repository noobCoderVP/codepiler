"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpenText, Github, Sparkles, Workflow } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export const GITHUB_URL = "https://github.com/noobcodervp/codepiler";

const linkClass = "flex items-center gap-2 transition hover:text-[var(--text-primary)]";

export default function Header() {
    const pathname = usePathname();
    const isApp = pathname.startsWith("/app");

    const startTutorial = () => {
        window.dispatchEvent(new Event("codepiler:start-tutorial"));
    };

    return (
        <motion.header
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-sm">
                        <Image src="/favicon.svg" alt="CodePiler icon" width={24} height={24} />
                    </div>
                    <span className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                        CodePiler
                    </span>
                </Link>

                {/* Nav: marketing pages explain the product, the workspace only offers help */}
                <nav className="hidden items-center gap-7 text-sm text-[var(--text-secondary)] md:flex">
                    {!isApp && (
                        <Link href="/#how-it-works" className={linkClass}>
                            <Workflow size={15} />
                            How it works
                        </Link>
                    )}

                    <Link
                        href="/docs"
                        className={`${linkClass} ${pathname.startsWith("/docs") ? "font-semibold text-[var(--text-primary)]" : ""}`}
                    >
                        <BookOpenText size={15} />
                        Docs
                    </Link>

                    {isApp && (
                        <button onClick={startTutorial} className={linkClass}>
                            <Sparkles size={15} />
                            Tutorial
                        </button>
                    )}

                    <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={linkClass}>
                        <Github size={15} />
                        GitHub
                    </a>
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                    {!isApp && (
                        <Link
                            href="/app"
                            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                        >
                            Open app
                        </Link>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </motion.header>
    );
}
