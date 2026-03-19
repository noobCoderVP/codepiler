"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="
                sticky top-0 z-50
                backdrop-blur-md
                border-b border-[var(--border)]
                bg-[var(--surface)]/80
            "
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* LEFT — Branding */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--accent-soft)]">
                        <Sparkles size={18} className="text-[var(--accent)]" />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold tracking-tight">Codepiler</span>

                        <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--surface-muted)] text-[var(--text-secondary)]">
                            v0.1
                        </span>
                    </div>
                </Link>

                {/* CENTER — Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
                    <Link href="#features" className="hover:text-[var(--text-primary)] transition">
                        Features
                    </Link>
                    <Link href="#use-cases" className="hover:text-[var(--text-primary)] transition">
                        Use Cases
                    </Link>
                    <Link href="/docs" className="hover:text-[var(--text-primary)] transition">
                        Docs
                    </Link>
                </nav>

                {/* RIGHT — Actions */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com"
                        target="_blank"
                        className="
                            hidden sm:flex items-center gap-2
                            px-3 py-1.5 rounded-md text-sm
                            border border-[var(--border)]
                            hover:bg-[var(--surface-muted)]
                            transition
                        "
                    >
                        <Github size={16} />
                        GitHub
                    </a>

                    <Link
                        href="/app"
                        className="
                            px-4 py-2 rounded-md text-sm font-medium
                            bg-[var(--accent)] text-white
                            shadow-sm
                            hover:opacity-90
                            transition
                        "
                    >
                        Launch App
                    </Link>

                    <ThemeToggle />
                </div>
            </div>
        </motion.header>
    );
}
