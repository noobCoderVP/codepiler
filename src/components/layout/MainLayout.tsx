"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Header from "./Header";

import AppTutorial from "../app/AppTutorial";
import RepoExplorer from "../repo/RepoExplorer";
import OneFileViewer from "../viewer/OneFileViewer";

import { Group, Panel, Separator } from "react-resizable-panels";

const NARROW_QUERY = "(max-width: 767px)";

function subscribeNarrow(onChange: () => void) {
    const query = window.matchMedia(NARROW_QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
}

export default function MainLayout() {
    // stack the explorer above the viewer on phones instead of squeezing them side by side
    const narrow = useSyncExternalStore(
        subscribeNarrow,
        () => window.matchMedia(NARROW_QUERY).matches,
        () => false
    );

    return (
        <div className="flex h-screen flex-col" style={{ background: "var(--background)" }}>
            <Header />
            <AppTutorial />

            <main className="flex-1 overflow-hidden p-2 md:p-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full rounded-xl overflow-hidden"
                    style={{
                        background: "var(--surface)",
                        boxShadow: "var(--shadow-md)"
                    }}
                >
                    <Group
                        key={narrow ? "vertical" : "horizontal"}
                        orientation={narrow ? "vertical" : "horizontal"}
                        className="flex h-full"
                    >
                        <Panel
                            defaultSize={narrow ? "40%" : "29%"}
                            minSize={narrow ? "20%" : "22%"}
                            maxSize={narrow ? "70%" : "45%"}
                        >
                            <div className="h-full flex flex-col bg-[var(--surface)]">
                                <RepoExplorer />
                            </div>
                        </Panel>

                        {narrow ? (
                            <Separator className="relative h-3 cursor-row-resize bg-[var(--surface-muted)]">
                                <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[var(--accent)]/70" />
                            </Separator>
                        ) : (
                            <Separator className="relative w-4 cursor-col-resize bg-[var(--surface-muted)]">
                                <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-[var(--accent)]/70" />
                                <div className="absolute inset-y-4 left-1/2 w-[7px] -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)]" />
                            </Separator>
                        )}

                        <Panel
                            defaultSize={narrow ? "60%" : "71%"}
                            minSize={narrow ? "30%" : "40%"}
                        >
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
