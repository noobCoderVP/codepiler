"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Editor, { OnMount } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";
import { ViewerFormat } from "@/lib/viewer-formatters";

type Props = {
    value: string;
    format: ViewerFormat;
    fontSize: number;
    activeLine: number;
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

export default function ViewerEditor({ value, format, fontSize, activeLine }: Props) {
    const { resolvedTheme } = useTheme();
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<typeof Monaco | null>(null);
    const decorationsRef = useRef<string[]>([]);

    const handleMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
    };

    useEffect(() => {
        if (!editorRef.current) return;
        const lineNumber = Math.max(activeLine, 1);

        editorRef.current.revealLineNearTop(lineNumber);
        editorRef.current.setScrollTop(
            Math.max(editorRef.current.getTopForLineNumber(lineNumber) - 20, 0)
        );
        editorRef.current.setPosition({ lineNumber, column: 1 });

        const model = editorRef.current.getModel();
        const monaco = monacoRef.current;

        if (model && monaco) {
            decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, [
                {
                    range: new monaco.Range(lineNumber, 1, lineNumber, 1),
                    options: {
                        isWholeLine: true,
                        className: "codepiler-active-line",
                        linesDecorationsClassName: "codepiler-active-gutter"
                    }
                }
            ]);
        }
    }, [activeLine, format, value]);

    return (
        <Editor
            key={format}
            height="100%"
            language={getLanguage(format)}
            value={value}
            theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
            onMount={handleMount}
            options={{
                readOnly: true,
                fontSize: fontSize ?? 14,
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                padding: {
                    top: 20,
                    bottom: 20
                },
                lineNumbersMinChars: 3,
                smoothScrolling: true,
                renderLineHighlight: "line",
                cursorStyle: "line-thin"
            }}
        />
    );
}
