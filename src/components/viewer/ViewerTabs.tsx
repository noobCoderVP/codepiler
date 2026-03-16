"use client"

import { ViewerFormat } from "@/lib/viewer-formatters"
import ViewerChips from "./ViewerChips"
import FontSizeControls from "./FontSizeControls"

type Props = {
    value: ViewerFormat
    onChange: (f: ViewerFormat) => void
    files: number
    tokens: number
    fontSize: number
    setFontSize: (n: number) => void
}

const tabs: ViewerFormat[] = ["text", "json", "xml", "markdown"]

export default function ViewerTabs({
    value,
    onChange,
    files,
    tokens,
    fontSize,
    setFontSize
}: Props) {
    return (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onChange(tab)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition
                        ${
                            value === tab
                                ? "bg-[var(--accent)] text-white shadow-sm"
                                : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
                        }`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <ViewerChips files={files} tokens={tokens} />
                <FontSizeControls fontSize={fontSize} setFontSize={setFontSize} />
            </div>
        </div>
    )
}
