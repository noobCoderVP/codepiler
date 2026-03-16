"use client"

import MainLayout from "@/components/layout/MainLayout"
import RepoExplorer from "@/components/repo/RepoExplorer"
import PromptPreview from "@/components/prompt/PromptPreview"
import { motion } from "framer-motion"

export default function HomePage() {
    return (
        <MainLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="h-full grid grid-cols-2"
            >
                {/* Repo Explorer Panel */}
                <div
                    className="h-full border-r p-4"
                    style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)"
                    }}
                >
                    <RepoExplorer />
                </div>

                {/* Prompt Preview Panel */}
                <div
                    className="h-full p-4 overflow-auto"
                    style={{
                        background: "var(--background)"
                    }}
                >
                    <PromptPreview />
                </div>
            </motion.div>
        </MainLayout>
    )
}
