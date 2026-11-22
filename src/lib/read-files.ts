import { RepoFile } from "@/types/repo";
import { FileEntry } from "./pre-filter";

const YIELD_EVERY = 20;

async function yieldToBrowser() {
    await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0);
    });
}

export async function readFiles(entries: FileEntry[]): Promise<RepoFile[]> {
    const result: RepoFile[] = [];

    for (let index = 0; index < entries.length; index += 1) {
        const { file, path } = entries[index];
        const content = await file.text();

        result.push({
            path,
            content,
            size: file.size
        });

        if ((index + 1) % YIELD_EVERY === 0) {
            await yieldToBrowser();
        }
    }

    return result;
}

export function entriesFromFileList(files: FileList | File[]): FileEntry[] {
    return Array.from(files).map((file) => ({
        file,
        path: (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name
    }));
}
