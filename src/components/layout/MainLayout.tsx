"use client"

import Header from "./Header"
import Footer from "./Footer"

import RepoExplorer from "../repo/RepoExplorer"
import OneFileViewer from "../viewer/OneFileViewer"

import { Group, Panel, Separator } from "react-resizable-panels"

type Props = {
    children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
    return (
        <div className="flex h-screen flex-col" style={{ background: "var(--background)" }}>
            <Header />

            {/* Workspace */}
            <main className="flex-1 overflow-hidden p-4">
                <div
                    className="h-full rounded-xl overflow-hidden"
                    style={{
                        background: "var(--surface)",
                        boxShadow: "var(--shadow-md)"
                    }}
                >
                    {children ? (
                        /* Custom Page Content */
                        children
                    ) : (
                        /* Default Layout */
                        <Group className="flex h-full">
                            {/* LEFT PANEL — Repo Explorer */}
                            <Panel defaultSize={33} minSize={25} maxSize={50}>
                                <div className="h-full flex flex-col bg-[var(--surface)]">
                                    <RepoExplorer />
                                </div>
                            </Panel>

                            {/* RESIZE HANDLE */}
                            <Separator className="relative w-3 cursor-col-resize bg-[var(--surface-muted)]">
                                <div
                                    className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2"
                                    style={{ background: "var(--border)" }}
                                />
                            </Separator>

                            {/* RIGHT PANEL — Viewer */}
                            <Panel defaultSize={67} minSize={40}>
                                <div className="h-full flex flex-col bg-[var(--surface)]">
                                    <OneFileViewer />
                                </div>
                            </Panel>
                        </Group>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
