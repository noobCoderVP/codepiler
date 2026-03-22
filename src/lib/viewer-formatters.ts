import { RepoFile } from "@/types/repo";
import { encode } from "gpt-tokenizer";

export type ViewerFormat = "text" | "json" | "xml" | "markdown";

export type ViewerDocument = {
    content: string;
    lineMap: Record<string, number>;
};

function escapeXmlAttribute(value: string) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function countTokens(text: string) {
    return encode(text).length;
}

export function buildText(files: RepoFile[]): ViewerDocument {
    const lines: string[] = [];
    const lineMap: Record<string, number> = {};

    files.forEach((file, index) => {
        lineMap[file.path] = lines.length + 1;
        lines.push(`===== FILE: ${file.path} =====`);
        lines.push(...file.content.split("\n"));

        if (index < files.length - 1) {
            lines.push("");
        }
    });

    return {
        content: lines.join("\n"),
        lineMap
    };
}

export function buildJSON(files: RepoFile[]): ViewerDocument {
    const lines: string[] = ["{", '  "repository": ['];
    const lineMap: Record<string, number> = {};

    files.forEach((file, index) => {
        lineMap[file.path] = lines.length + 1;
        lines.push("    {");
        lines.push(`      "path": ${JSON.stringify(file.path)},`);
        lines.push(`      "content": ${JSON.stringify(file.content)}`);
        lines.push(index === files.length - 1 ? "    }" : "    },");
    });

    lines.push("  ]");
    lines.push("}");

    return {
        content: lines.join("\n"),
        lineMap
    };
}

export function buildXML(files: RepoFile[]): ViewerDocument {
    const lines: string[] = ["<repository>"];
    const lineMap: Record<string, number> = {};

    files.forEach((file) => {
        lineMap[file.path] = lines.length + 1;
        lines.push(`  <file path="${escapeXmlAttribute(file.path)}">`);
        lines.push("    <![CDATA[");
        lines.push(...file.content.split("\n").map((line) => `    ${line}`));
        lines.push("    ]]>");
        lines.push("  </file>");
    });

    lines.push("</repository>");

    return {
        content: lines.join("\n"),
        lineMap
    };
}

export function buildMarkdown(files: RepoFile[]): ViewerDocument {
    const lines: string[] = [];
    const lineMap: Record<string, number> = {};

    files.forEach((file, index) => {
        const ext = file.path.split(".").pop() || "";

        lineMap[file.path] = lines.length + 1;
        lines.push(`## ${file.path}`);
        lines.push("");
        lines.push(`\`\`\`${ext}`);
        lines.push(...file.content.split("\n"));
        lines.push("```");

        if (index < files.length - 1) {
            lines.push("");
        }
    });

    return {
        content: lines.join("\n"),
        lineMap
    };
}
