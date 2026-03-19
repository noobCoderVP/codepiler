"use client";

import Editor from "@monaco-editor/react";
import { ViewerFormat } from "@/lib/viewer-formatters";

type Props = {
    value: string;
    format: ViewerFormat;
    fontSize: number;
};

function getLanguage(format: ViewerFormat) {
    switch (format) {
        case "json":
            return "json";
        case "xml":
            return "xml";
        case "markdown":
            return "markdown";
        default:
            return "plaintext";
    }
}

export default function ViewerEditor({ value, format, fontSize }: Props) {
    return (
        <Editor
            key={format}
            height="100%"
            language={getLanguage(format)}
            value={value}
            theme="vs-dark"
            options={{
                readOnly: true,

                fontSize: fontSize ?? 14,

                minimap: { enabled: false },

                wordWrap: "on",

                scrollBeyondLastLine: false,

                padding: {
                    top: 16,
                    bottom: 16
                },

                lineNumbersMinChars: 3,

                smoothScrolling: true
            }}
        />
    );
}
