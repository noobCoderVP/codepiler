import ignore from "ignore"

const IGNORE_DIRS = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
    "vendor",
    ".turbo",
    ".cache"
]

const IGNORE_EXT = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp",
    "svg",
    "mp4",
    "mov",
    "avi",
    "zip",
    "tar",
    "gz",
    "rar",
    "pdf"
]

const MAX_FILE_SIZE = 200_000 // 200kb

export function preFilterFiles(files: File[]) {
    const ig = ignore()

    ig.add(IGNORE_DIRS.map((d) => `${d}/`))

    return files.filter((file) => {
        const path =
            (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name

        const lower = path.toLowerCase()

        // ignore directories
        if (IGNORE_DIRS.some((dir) => lower.includes(`/${dir}/`))) return false

        // ignore binary extensions
        const ext = lower.split(".").pop()

        if (ext && IGNORE_EXT.includes(ext)) return false

        // ignore large files
        if (file.size > MAX_FILE_SIZE) return false

        return true
    })
}
