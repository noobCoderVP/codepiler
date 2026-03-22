"use client";

import { Braces, FileCode2, FileJson2, FileText } from "lucide-react";
import { ViewerFormat } from "@/lib/viewer-formatters";
import FontSizeControls from "./FontSizeControls";

type Props = {
    value: ViewerFormat;
    onChange: (f: ViewerFormat) => void;
    fontSize: number;
    setFontSize: (n: number) => void;
};

const tabs: { value: ViewerFormat; label: string; icon: typeof FileText }[] = [
    { value: "text", label: "Text", icon: FileText },
    { value: "json", label: "JSON", icon: FileJson2 },
    { value: "xml", label: "XML", icon: Braces },
    { value: "markdown", label: "Markdown", icon: FileCode2 }
];

export default function ViewerTabs({ value, onChange, fontSize, setFontSize }: Props) {
    return (
        <div
            data-tour="viewer-tabs"
            className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)]/85 px-4 py-3"
        >
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.value}
                            onClick={() => onChange(tab.value)}
                            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                                value === tab.value
                                    ? "bg-[var(--accent)] text-white shadow-sm"
                                    : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                            }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <FontSizeControls fontSize={fontSize} setFontSize={setFontSize} />
        </div>
    );
}
