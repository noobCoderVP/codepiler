import { FileEntry, isIgnoredDirName } from "./pre-filter";

// Dropped folders don't appear in DataTransfer.files, so walk them through the
// (non-standard but universally supported) FileSystemEntry API instead.

function readAllEntries(reader: FileSystemDirectoryReader) {
    return new Promise<FileSystemEntry[]>((resolve, reject) => {
        const all: FileSystemEntry[] = [];

        const readBatch = () => {
            reader.readEntries((batch) => {
                if (batch.length === 0) {
                    resolve(all);
                    return;
                }

                all.push(...batch);
                readBatch();
            }, reject);
        };

        readBatch();
    });
}

function entryToFile(entry: FileSystemFileEntry) {
    return new Promise<File>((resolve, reject) => entry.file(resolve, reject));
}

async function walk(entry: FileSystemEntry, out: FileEntry[]) {
    const path = entry.fullPath.replace(/^\/+/, "");

    if (entry.isFile) {
        out.push({ file: await entryToFile(entry as FileSystemFileEntry), path });
        return;
    }

    if (entry.isDirectory && !isIgnoredDirName(entry.name)) {
        const children = await readAllEntries((entry as FileSystemDirectoryEntry).createReader());

        for (const child of children) {
            await walk(child, out);
        }
    }
}

/** Must be called synchronously inside the drop handler — DataTransfer items expire after it returns. */
export function getDroppedEntries(dataTransfer: DataTransfer) {
    return Array.from(dataTransfer.items)
        .filter((item) => item.kind === "file")
        .map((item) => item.webkitGetAsEntry())
        .filter((entry): entry is FileSystemEntry => entry !== null);
}

export async function readDroppedEntries(entries: FileSystemEntry[]) {
    const out: FileEntry[] = [];

    for (const entry of entries) {
        await walk(entry, out);
    }

    return out;
}
