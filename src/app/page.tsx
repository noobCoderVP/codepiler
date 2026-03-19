"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--background)]">
            <Header />

            <main className="flex-1">
                {/* HERO */}
                <section className="px-6 py-20 text-center max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                    >
                        Turn Your Codebase into{" "}
                        <span className="text-[var(--accent)]">AI-Ready Context</span>
                    </motion.h1>

                    <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Codepiler converts your entire repository into a clean, structured prompt —
                        so you can use ChatGPT, Claude, or any LLM with full code understanding.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href="/app"
                            className="px-6 py-3 rounded-md bg-[var(--accent)] text-white font-medium shadow-md"
                        >
                            Try Codepiler
                        </Link>

                        <a
                            href="#features"
                            className="px-6 py-3 rounded-md border border-[var(--border)]"
                        >
                            Learn More
                        </a>
                    </div>
                </section>

                {/* PROBLEM */}
                <section className="px-6 py-16 max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold">LLMs Can’t Understand Your Codebase</h2>

                    <p className="mt-4 text-[var(--text-secondary)]">
                        Your project is scattered across hundreds of files. Copy-pasting code into
                        AI tools is slow, incomplete, and messy.
                    </p>
                </section>

                {/* SOLUTION */}
                <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Upload Repository",
                            desc: "Import your entire project in seconds"
                        },
                        {
                            title: "Smart Filtering",
                            desc: "Ignore binaries, node_modules, and noise automatically"
                        },
                        {
                            title: "Generate Prompt",
                            desc: "Get structured output ready for AI instantly"
                        }
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
                        >
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm mt-2 text-[var(--text-secondary)]">{item.desc}</p>
                        </div>
                    ))}
                </section>

                {/* FEATURES */}
                <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-12">
                        Built for Developers
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Selective File Control",
                                desc: "Pick exactly what goes into your prompt using a tree-based explorer"
                            },
                            {
                                title: "Token Awareness",
                                desc: "Know exactly how large your prompt is before sending to AI"
                            },
                            {
                                title: "Multiple Formats",
                                desc: "Export as JSON, XML, Markdown, or plain text"
                            },
                            {
                                title: "Gitignore Support",
                                desc: "Automatically respects .gitignore and filters noise"
                            }
                        ].map((f) => (
                            <div
                                key={f.title}
                                className="p-6 rounded-xl border border-[var(--border)]"
                            >
                                <h3 className="font-semibold">{f.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)] mt-2">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* USE CASES */}
                <section className="px-6 py-20 bg-[var(--surface-muted)]">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold">What You Can Do with Codepiler</h2>

                        <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">
                            {[
                                "Explain entire codebase with AI",
                                "Debug complex systems faster",
                                "Generate documentation",
                                "Refactor legacy projects",
                                "Onboard new developers",
                                "Build AI copilots"
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 py-20 text-center">
                    <h2 className="text-3xl font-semibold">Start Using Codepiler Today</h2>

                    <p className="mt-4 text-[var(--text-secondary)]">
                        No setup. No installation. Just upload and go.
                    </p>

                    <Link
                        href="/app"
                        className="mt-6 inline-block px-6 py-3 bg-[var(--accent)] text-white rounded-md"
                    >
                        Launch App
                    </Link>
                </section>

                {/* SEO FOOTER TEXT */}
                <section className="px-6 py-12 max-w-4xl mx-auto text-sm text-[var(--text-secondary)]">
                    <p>
                        Codepiler is a developer tool that converts repositories into structured
                        prompts for AI tools like ChatGPT and Claude. It helps engineers analyze,
                        debug, and understand large codebases efficiently by combining files into a
                        single context-aware output.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
}
