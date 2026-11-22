import { RepoFile } from "@/types/repo";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { useViewerStore } from "@/store/viewer-store";
import { filterGitignore } from "./gitignore-filter";
import { getInitialSelection } from "./initial-selection";
import { preFilterFiles, FileEntry } from "./pre-filter";
import { readFiles } from "./read-files";
import { readZipFile } from "./read-zip";
import { getSampleProject } from "./sample-project";
import { countTokens } from "./viewer-formatters";

const nextTick = () => new Promise<void>((resolve) => window.setTimeout(resolve, 0));

/** Replace the workspace with already-filtered `files` and select `selected`. */
export function applyRepo(files: RepoFile[], selected: string[]) {
    const tokenMap: Record<string, number> = {};
    for (const file of files) tokenMap[file.path] = countTokens(file.content);

    useRepoStore.getState().setRepo(files, tokenMap);
    useSelectionStore.getState().setInitialSelection(selected);
    useViewerStore.setState({ activePath: selected[0] ?? null, previewPath: null });
}

async function load(read: () => Promise<{ files: RepoFile[]; total: number }>) {
    const { setLoadState } = useRepoStore.getState();
    setLoadState({ loading: true, error: null });

    try {
        const { files, total } = await read();
        const finalFiles = filterGitignore(files);

        if (finalFiles.length === 0) {
            setLoadState({
                loading: false,
                error: "No readable source files found. Binaries, dependencies, build output and files over 200 KB are skipped."
            });
            return;
        }

        // let the loading state paint before the synchronous tokenization pass
        await nextTick();

        const selected = getInitialSelection(finalFiles);
        applyRepo(finalFiles, selected);

        setLoadState({
            loading: false,
            summary: {
                loaded: finalFiles.length,
                skipped: Math.max(total - finalFiles.length, 0),
                preselected: selected.length
            }
        });
    } catch {
        setLoadState({
            loading: false,
            error: "Couldn't read those files. If it's a ZIP, check that the archive isn't corrupted."
        });
    }
}

export function loadEntries(entries: FileEntry[]) {
    return load(async () => ({
        files: await readFiles(preFilterFiles(entries)),
        total: entries.length
    }));
}

export function loadZip(file: File) {
    return load(() => readZipFile(file));
}

export function loadSample() {
    return load(async () => {
        const files = getSampleProject();
        return { files, total: files.length };
    });
}
