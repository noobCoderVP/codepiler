"use client";

import { motion } from "framer-motion";
import Header from "./Header";

import AppTutorial from "../app/AppTutorial";
import RepoExplorer from "../repo/RepoExplorer";
import OneFileViewer from "../viewer/OneFileViewer";

import { Group, Panel, Separator } from "react-resizable-panels";

export default function MainLayout() {
    return (
        <div className="flex h-screen flex-col" style={{ background: "var(--background)" }}>
            <Header />
            <AppTutorial />

            <main className="flex-1 overflow-hidden p-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full rounded-xl overflow-hidden"
                    style={{
                        background: "var(--surface)",
                        boxShadow: "var(--shadow-md)"
                    }}
                >
                    <Group className="flex h-full">
                        <Panel defaultSize={"29%"} minSize={"22%"} maxSize={"45%"}>
                            <div className="h-full flex flex-col bg-[var(--surface)]">
                                <RepoExplorer />
                            </div>
                        </Panel>

                        <Separator className="relative w-4 cursor-col-resize bg-[var(--surface-muted)]">
                            <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-[var(--accent)]/70" />
                            <div className="absolute inset-y-4 left-1/2 w-[7px] -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)]" />
                        </Separator>

                        <Panel defaultSize={"71%"} minSize={"40%"}>
                            <div className="h-full flex flex-col bg-[var(--surface)]">
                                <OneFileViewer />
                            </div>
                        </Panel>
                    </Group>
                </motion.div>
            </main>
        </div>
    );
}
