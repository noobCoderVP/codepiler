"use client";

import { motion } from "framer-motion";
import { FileQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center text-center max-w-md"
            >
                {/* Icon */}
                <div
                    className="flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                    style={{ background: "var(--surface-muted)" }}
                >
                    <FileQuestion size={28} style={{ color: "var(--text-secondary)" }} />
                </div>

                {/* Title */}
                <h1
                    className="text-2xl font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                >
                    Page not found
                </h1>

                {/* Description */}
                <p className="text-sm mt-2 mb-6" style={{ color: "var(--text-secondary)" }}>
                    The page you’re looking for doesn’t exist or may have been moved.
                </p>

                {/* Action */}
                <Link
                    href="/"
                    className="
                        inline-flex items-center gap-2
                        px-4 py-2 rounded-md text-sm font-medium
                        transition
                    "
                    style={{
                        background: "var(--accent)",
                        color: "white"
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
}
