import { RepoFile } from "@/types/repo"
import formatXML from "xml-formatter"
import { encode } from "gpt-tokenizer"

export type ViewerFormat = "text" | "json" | "xml" | "markdown"

export function countTokens(text: string) {
    return encode(text).length
}

export function buildText(files: RepoFile[]) {
    return files.map((f) => `===== FILE: ${f.path} =====\n${f.content}\n`).join("\n")
}

export function buildJSON(files: RepoFile[]) {
    return JSON.stringify(
        {
            repository: files.map((f) => ({
                path: f.path,
                content: f.content
            }))
        },
        null,
        2
    )
}

export function buildXML(files: RepoFile[]) {
    const raw = `<repository>
${files
    .map(
        (f) => `
<file path="${f.path}">
<![CDATA[
${f.content}
]]>
</file>`
    )
    .join("\n")}
</repository>`

    return formatXML(raw, {
        indentation: "  ",
        collapseContent: true,
        lineSeparator: "\n"
    })
}

export function buildMarkdown(files: RepoFile[]) {
    return files
        .map((f) => {
            const ext = f.path.split(".").pop() || ""

            return `## ${f.path}

\`\`\`${ext}
${f.content}
\`\`\`
`
        })
        .join("\n")
}
