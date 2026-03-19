"use client";

import { motion } from "framer-motion";

function Shimmer({ className = "" }: { className?: string }) {
    return (
        <div
            className={`relative overflow-hidden rounded-md bg-[var(--surface-muted)] ${className}`}
        >
            <div
                className="
                    absolute inset-0 -translate-x-full
                    animate-[shimmer_1.5s_infinite]
                    bg-gradient-to-r
                    from-transparent
                    via-[color:rgba(255,255,255,0.06)]
                dark:via-[color:rgba(255,255,255,0.08)]
                    to-transparent
                "
            />
        </div>
    );
}

export default function Loading() {
    return (
        <div className="flex h-screen flex-col" style={{ background: "var(--background)" }}>
            {/* ✅ HEADER (match exactly) */}
            <div
                className="h-16 px-6 flex items-center justify-between shrink-0"
                style={{
                    background: "var(--surface)",
                    borderBottom: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)"
                }}
            >
                <div className="flex items-center gap-3">
                    <Shimmer className="h-5 w-28" />
                    <Shimmer className="h-4 w-12" />
                </div>

                <div className="flex items-center gap-3">
                    <Shimmer className="h-8 w-20 rounded-md" />
                    <Shimmer className="h-8 w-8 rounded-md" />
                </div>
            </div>

            {/* ✅ MAIN (CRITICAL FIX) */}
            <main className="flex-1 min-h-0 overflow-hidden p-4">
                <div
                    className="h-full w-full rounded-xl overflow-hidden flex"
                    style={{
                        background: "var(--surface)",
                        boxShadow: "var(--shadow-md)"
                    }}
                >
                    {/* LEFT PANEL */}
                    <div className="w-[33%] min-w-[250px] max-w-[50%] border-r border-[var(--border)] p-4 flex flex-col gap-4 overflow-hidden">
                        {/* Upload */}
                        <div className="rounded-xl border border-[var(--border)] p-6 space-y-3 shrink-0">
                            <Shimmer className="h-10 w-10 rounded-lg mx-auto" />
                            <Shimmer className="h-4 w-32 mx-auto" />
                            <Shimmer className="h-3 w-48 mx-auto" />
                            <Shimmer className="h-8 w-28 mx-auto rounded-md" />
                        </div>

                        {/* Tree */}
                        <div className="flex-1 overflow-hidden space-y-2">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="flex items-center gap-2"
                                >
                                    <Shimmer className="h-4 w-4 rounded-sm" />
                                    <Shimmer className="h-4 w-4 rounded-sm" />
                                    <Shimmer className="h-4 w-[65%]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Header */}
                        <div className="border-b border-[var(--border)] px-6 py-4 shrink-0">
                            <Shimmer className="h-5 w-40 mb-2" />
                            <Shimmer className="h-3 w-56" />
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2 shrink-0">
                            <div className="flex gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Shimmer key={i} className="h-8 w-16 rounded-md" />
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Shimmer className="h-6 w-20 rounded-md" />
                                <Shimmer className="h-6 w-20 rounded-md" />
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="flex-1 overflow-hidden p-4 space-y-2">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <Shimmer key={i} className="h-3 w-full" />
                            ))}
                        </div>

                        {/* Footer actions */}
                        <div className="border-t border-[var(--border)] px-4 py-2 flex gap-2 shrink-0">
                            <Shimmer className="h-8 w-24 rounded-md" />
                            <Shimmer className="h-8 w-28 rounded-md" />
                        </div>
                    </div>
                </div>
            </main>

            {/* ✅ FOOTER (match exactly) */}
            <div
                className="h-14 px-6 flex items-center justify-between shrink-0"
                style={{
                    background: "var(--surface)",
                    borderTop: "1px solid var(--border)"
                }}
            >
                <Shimmer className="h-4 w-40" />
                <Shimmer className="h-4 w-48" />
            </div>
        </div>
    );
}
