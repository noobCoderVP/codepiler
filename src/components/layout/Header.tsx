"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpenText, Home, LayoutTemplate, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const pathname = usePathname();
    const isViewer = pathname.startsWith("/app");
    const isHome = pathname === "/";
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
                <Link href="/" className="flex items-center gap-3">
                    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-sm">
                        <Image src="/favicon.svg" alt="CodePiler icon" width={24} height={24} />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold tracking-tight">CodePiler</span>
                    </div>
                </Link>

                {isHome ? (
                    <nav className="hidden items-center gap-8 text-sm text-[var(--text-secondary)] md:flex">
                        <Link
                            href="#features"
                            className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                        >
                            <Sparkles size={15} />
                            Features
                        </Link>
                        <Link
                            href="#workflow"
                            className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                        >
                            <LayoutTemplate size={15} />
                            Workflow
                        </Link>
                        <Link
                            href="#use-cases"
                            className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                        >
                            <Home size={15} />
                            Use Cases
                        </Link>
                        <Link
                            href="/docs"
                            className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                        >
                            <BookOpenText size={15} />
                            Docs
                        </Link>
                    </nav>
                ) : (
                    <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
                        <Link
                            href="/"
                            className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                        >
                            <Home size={15} />
                            Home
                        </Link>
                        <Link
                            href="/docs"
                            className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                        >
                            <BookOpenText size={15} />
                            Docs
                        </Link>
                        <Link
                            href="/docs/viewer"
                            className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                        >
                            <LayoutTemplate size={15} />
                            Viewer Guide
                        </Link>
                        {isViewer && (
                            <button
                                onClick={startTutorial}
                                className="flex items-center gap-2 transition hover:text-[var(--text-primary)]"
                            >
                                <Sparkles size={15} />
                                Tutorial
                            </button>
                        )}
                    </nav>
                )}

                <div className="flex items-center gap-3">
                    {!isViewer && (
                        <Link
                            href="/app"
                            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                        >
                            Launch App
                        </Link>
                    )}

                    <ThemeToggle />
                </div>
            </div>
        </motion.header>
    );
}
