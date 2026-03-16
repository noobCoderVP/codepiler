"use client"

import Header from "./Header"
import Footer from "./Footer"

import RepoExplorer from "../repo/RepoExplorer"
import PromptPreview from "../prompt/PromptPreview"

import { Group, Panel, Separator } from "react-resizable-panels"

export default function MainLayout() {
    return (
        <div className="flex h-screen flex-col" style={{ background: "var(--background)" }}>
            <Header />

            {/* Workspace */}
            <main className="flex-1 overflow-hidden p-4">
                {/* Workspace Card */}
                <div
                    className="h-full rounded-xl overflow-hidden"
                    style={{
                        background: "var(--surface)",
                        boxShadow: "var(--shadow-md)"
                    }}
                >
                    <Group className="flex h-full">
                        {/* LEFT PANEL */}
                        <Panel defaultSize="33%" minSize="25%" maxSize="50%">
                            <div
                                className="h-full flex flex-col"
                                style={{
                                    background: "var(--surface)"
                                }}
                            >
                                <RepoExplorer />
                            </div>
                        </Panel>

                        {/* GUTTER */}
                        <Separator
                            className="relative w-3 cursor-col-resize"
                            style={{ background: "var(--surface-muted)" }}
                        >
                            <div
                                className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2"
                                style={{ background: "var(--border)" }}
                            />
                        </Separator>

                        {/* RIGHT PANEL */}
                        <Panel defaultSize="67%" minSize="40%">
                            <div
                                className="h-full flex flex-col"
                                style={{
                                    background: "var(--surface)"
                                }}
                            >
                                <PromptPreview />
                            </div>
                        </Panel>
                    </Group>
                </div>
            </main>

            <Footer />
        </div>
    )
}
