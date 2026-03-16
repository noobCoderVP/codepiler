"use client"

import { Github, BookOpen, Bug, Heart } from "lucide-react"

export default function Footer() {
    return (
        <footer
            className="h-14 px-6 flex items-center justify-between text-sm"
            style={{
                background: "var(--surface)",
                borderTop: "1px solid var(--border)"
            }}
        >
            {/* LEFT — Navigation */}
            <div className="flex items-center gap-6" style={{ color: "var(--text-secondary)" }}>
                <a href="#" className="flex items-center gap-2 transition hover:opacity-80">
                    <BookOpen size={16} />
                    Docs
                </a>

                <a href="#" className="flex items-center gap-2 transition hover:opacity-80">
                    <Bug size={16} />
                    Issues
                </a>

                <a
                    href="https://github.com"
                    target="_blank"
                    className="flex items-center gap-2 transition hover:opacity-80"
                >
                    <Github size={16} />
                    GitHub
                </a>
            </div>

            {/* RIGHT — Metadata */}
            <div className="flex items-center gap-4" style={{ color: "var(--text-secondary)" }}>
                <span>MIT License</span>

                <span>•</span>

                <span>Codepiler v0.1</span>

                <span className="flex items-center gap-1">
                    Open Source
                    <Heart size={14} style={{ color: "var(--accent)" }} />
                </span>
            </div>
        </footer>
    )
}
