import { VscFile, VscJson, VscMarkdown, VscDatabase } from "react-icons/vsc"

import {
    SiTypescript,
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiHtml5,
    SiCss,
    SiPython,
    SiGo,
    SiRust,
    SiCplusplus,
    SiC,
    SiSharp,
    SiPhp,
    SiRuby,
    SiSwift,
    SiKotlin,
    SiDart,
    SiSass,
    SiDocker,
    SiYaml
} from "react-icons/si"

export function getFileIcon(path: string) {
    const name = path.toLowerCase()
    const ext = name.split(".").pop()

    // special filenames first
    if (name === "dockerfile") return SiDocker
    if (name === "package.json") return SiJavascript
    if (name === "tsconfig.json") return SiTypescript
    if (name === "next.config.js") return SiNextdotjs
    if (name === "next.config.mjs") return SiNextdotjs
    if (name === "requirements.txt") return SiPython
    if (name === "go.mod") return SiGo

    switch (ext) {
        // Typescript
        case "ts":
            return SiTypescript
        case "tsx":
            return SiReact

        // Javascript
        case "js":
            return SiJavascript
        case "jsx":
            return SiReact
        case "mjs":
            return SiJavascript
        case "cjs":
            return SiJavascript

        // Python
        case "py":
            return SiPython

        // Web
        case "html":
            return SiHtml5
        case "css":
            return SiCss
        case "scss":
            return SiSass
        case "sass":
            return SiSass

        // JSON / configs
        case "json":
            return VscJson
        case "yaml":
        case "yml":
            return SiYaml

        // Docs
        case "md":
        case "mdx":
            return VscMarkdown
        case "txt":
            return VscFile

        // Backend languages
        case "go":
            return SiGo
        case "rs":
            return SiRust
        case "java":
            return SiCplusplus
        case "kt":
            return SiKotlin
        case "php":
            return SiPhp
        case "rb":
            return SiRuby
        case "swift":
            return SiSwift
        case "dart":
            return SiDart

        // C family
        case "c":
            return SiC
        case "cpp":
        case "cc":
        case "cxx":
            return SiCplusplus
        case "cs":
            return SiSharp

        // SQL / DB
        case "sql":
            return VscDatabase

        // Docker
        case "dockerfile":
            return SiDocker

        // Images
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "svg":
        case "webp":
            return VscFile

        // Archives
        case "zip":
        case "tar":
        case "gz":
        case "rar":
            return VscFile

        // default
        default:
            return VscFile
    }
}
