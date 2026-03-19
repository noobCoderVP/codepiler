"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
                {/* BRAND */}
                <div>
                    <h3 className="font-semibold text-lg">Codepiler</h3>
                    <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-xs">
                        Turn your codebase into structured, AI-ready context. Built for developers
                        working with modern LLMs.
                    </p>
                </div>

                {/* PRODUCT */}
                <div>
                    <h4 className="font-medium mb-3">Product</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <li>
                            <Link href="/app" className="hover:text-[var(--text-primary)]">
                                Launch App
                            </Link>
                        </li>
                        <li>
                            <Link href="#features" className="hover:text-[var(--text-primary)]">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="#use-cases" className="hover:text-[var(--text-primary)]">
                                Use Cases
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* RESOURCES */}
                <div>
                    <h4 className="font-medium mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <li>
                            <Link href="/docs" className="hover:text-[var(--text-primary)]">
                                Documentation
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-[var(--text-primary)]">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://github.com"
                                target="_blank"
                                className="hover:text-[var(--text-primary)]"
                            >
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>

                {/* LEGAL */}
                <div>
                    <h4 className="font-medium mb-3">Company</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <li>
                            <Link href="/privacy" className="hover:text-[var(--text-primary)]">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:text-[var(--text-primary)]">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-[var(--text-primary)]">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-[var(--border)] px-6 py-4 text-sm text-[var(--text-secondary)] flex flex-col md:flex-row items-center justify-between">
                <span>© {new Date().getFullYear()} Codepiler. All rights reserved.</span>

                <span className="mt-2 md:mt-0">Built for developers working with AI</span>
            </div>
        </footer>
    );
}
