import ignore from "ignore";

const IGNORE_DIRS = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
    "vendor",
    ".turbo",
    ".cache",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",
    ".parcel-cache",
    ".svelte-kit",
    ".gradle",
    ".idea",
    ".vscode",
    ".svn",
    ".hg",
    ".venv",
    "venv",
    "env",
    "target",
    "out",
    "tmp",
    "temp",
    "logs",
    "bin",
    "obj"
];

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
    "mp3",
    "wav",
    "zip",
    "tar",
    "gz",
    "rar",
    "7z",
    "pdf",
    "exe",
    "dll",
    "so",
    "dylib",
    "class",
    "pyc",
    "pyo",
    "whl",
    "jar",
    "war",
    "apk",
    "ttf",
    "otf",
    "woff",
    "woff2",
    "eot",
    "ico",
    "psd",
    "ai",
    "sketch",
    "db",
    "sqlite",
    "sqlite3",
    "lockb"
];

const IGNORE_FILE_NAMES = [".ds_store", "thumbs.db", "desktop.ini", "vite.svg"];

const MAX_FILE_SIZE = 200_000;

export function shouldIncludeRepoPath(path: string, size: number) {
    const lower = path.toLowerCase();
    const fileName = lower.split("/").pop() || lower;

    if (IGNORE_DIRS.some((dir) => lower.includes(`/${dir}/`) || lower.startsWith(`${dir}/`))) {
        return false;
    }

    if (IGNORE_FILE_NAMES.includes(fileName)) return false;

    const ext = lower.split(".").pop();

    if (ext && IGNORE_EXT.includes(ext)) return false;
    if (size > MAX_FILE_SIZE) return false;

    return true;
}

export function isIgnoredDirName(name: string) {
    return IGNORE_DIRS.includes(name.toLowerCase());
}

export type FileEntry = {
    file: File;
    path: string;
};

export function preFilterFiles(entries: Iterable<FileEntry>) {
    const ig = ignore();
    ig.add(IGNORE_DIRS.map((dir) => `${dir}/`));

    const filtered: FileEntry[] = [];

    for (const entry of entries) {
        if (!shouldIncludeRepoPath(entry.path, entry.file.size)) continue;
        if (ig.ignores(entry.path)) continue;

        filtered.push(entry);
    }

    return filtered;
}
