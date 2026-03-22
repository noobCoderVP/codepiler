import JSZip from "jszip";
import { RepoFile } from "@/types/repo";
import { shouldIncludeRepoPath } from "./pre-filter";

function normalizeZipPath(path: string) {
    return path.replace(/\\/g, "/").replace(/^\/+/, "");
}

function escapeRootName(name: string) {
    return name.replace(/\.zip$/i, "").trim() || "repository";
}

export async function readZipFile(file: File): Promise<RepoFile[]> {
    const zip = await JSZip.loadAsync(file);
    const zipEntries = Object.values(zip.files).filter((entry) => !entry.dir);
    const normalizedPaths = zipEntries.map((entry) => normalizeZipPath(entry.name));

    const firstSegments = new Set(
        normalizedPaths.map((path) => path.split("/")[0]).filter((segment) => Boolean(segment))
    );

    const hasCommonRoot =
        firstSegments.size === 1 && normalizedPaths.every((path) => path.includes("/"));
    const repoRoot = escapeRootName(file.name);

    const entries = zipEntries.filter((entry) => {
        const typedEntry = entry as typeof entry & {
            _data?: {
                uncompressedSize?: number;
            };
        };

        return shouldIncludeRepoPath(
            normalizeZipPath(entry.name),
            typedEntry._data?.uncompressedSize ?? 0
        );
    });

    const files = await Promise.all(
        entries.map(async (entry) => {
            const typedEntry = entry as typeof entry & {
                _data?: {
                    uncompressedSize?: number;
                };
            };
            const rawPath = normalizeZipPath(entry.name);
            const path = hasCommonRoot ? rawPath : `${repoRoot}/${rawPath}`;
            const content = await entry.async("string");

            return {
                path,
                content,
                size: typedEntry._data?.uncompressedSize ?? content.length
            };
        })
    );

    return files;
}
