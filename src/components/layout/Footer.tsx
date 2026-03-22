"use client";

import Link from "next/link";
import { BookOpenText, Compass, Files, Upload } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                    <h3 className="text-lg font-semibold">CodePiler</h3>
                    <p className="mt-3 max-w-xs text-sm text-[var(--text-secondary)]">
                        Turn your codebase into structured, AI-ready context. Built for developers
                        working with modern LLMs.
                    </p>
                </div>

                <div>
                    <h4 className="mb-3 font-medium">Product</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <li>
                            <Link
                                href="/app"
                                className="flex items-center gap-2 hover:text-[var(--text-primary)]"
                            >
                                <Compass size={15} />
                                Launch App
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#features"
                                className="flex items-center gap-2 hover:text-[var(--text-primary)]"
                            >
                                <Files size={15} />
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#use-cases"
                                className="flex items-center gap-2 hover:text-[var(--text-primary)]"
                            >
                                <Compass size={15} />
                                Use Cases
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3 font-medium">Resources</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <li>
                            <Link
                                href="/docs"
                                className="flex items-center gap-2 hover:text-[var(--text-primary)]"
                            >
                                <BookOpenText size={15} />
                                Docs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/uploading"
                                className="flex items-center gap-2 hover:text-[var(--text-primary)]"
                            >
                                <Upload size={15} />
                                Upload Guide
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/viewer"
                                className="flex items-center gap-2 hover:text-[var(--text-primary)]"
                            >
                                <Files size={15} />
                                Viewer Guide
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3 font-medium">Company</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <li>Client-side workflow</li>
                        <li>Prompt-first utility</li>
                        <li>Made for AI-assisted dev</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col items-center justify-between border-t border-[var(--border)] px-6 py-4 text-sm text-[var(--text-secondary)] md:flex-row">
                <span>(c) {new Date().getFullYear()} CodePiler. All rights reserved.</span>
                <span className="mt-2 md:mt-0">Built for developers working with AI</span>
            </div>
        </footer>
    );
}
