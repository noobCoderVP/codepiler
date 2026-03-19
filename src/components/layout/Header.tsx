"use client";

import { motion } from "framer-motion";
import { Github, BookOpen, Bug, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="h-16 px-6 flex items-center justify-between"
            style={{
                background: "var(--surface)",
                borderBottom: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)"
            }}
        >
            {/* LEFT — Branding */}
            <div className="flex items-center gap-3">
                <Sparkles size={20} style={{ color: "var(--accent)" }} />

                <span
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                >
                    Codepiler
                </span>

                <span
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{
                        background: "var(--surface-muted)",
                        color: "var(--text-secondary)"
                    }}
                >
                    v0.1
                </span>
            </div>

            {/* CENTER — Navigation */}
            <nav
                className="hidden md:flex items-center gap-6 text-sm"
                style={{ color: "var(--text-secondary)" }}
            >
                <a
                    href="#"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md transition"
                    style={{ transition: "all 0.15s ease" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--surface-muted)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    <BookOpen size={16} />
                    Docs
                </a>

                <a
                    href="#"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md transition"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--surface-muted)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    <Bug size={16} />
                    Issues
                </a>
            </nav>

            {/* RIGHT — Actions */}
            <div className="flex items-center gap-3">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition"
                    style={{
                        border: "1px solid var(--border)",
                        background: "var(--surface)"
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--surface-muted)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
                >
                    <Github size={16} />
                    GitHub
                </a>

                <ThemeToggle />
            </div>
        </motion.header>
    );
}
