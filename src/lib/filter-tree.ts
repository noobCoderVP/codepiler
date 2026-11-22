import { RepoNode } from "@/types/repo";

export function filterTreeByQuery(nodes: RepoNode[], query: string): RepoNode[] {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return nodes;

    return nodes.flatMap((node) => {
        const selfMatches =
            node.name.toLowerCase().includes(normalized) ||
            node.path.toLowerCase().includes(normalized);

        if (selfMatches) return [node];

        if (node.type === "folder" && node.children) {
            const children = filterTreeByQuery(node.children, normalized);

            if (children.length > 0) {
                return [
                    {
                        ...node,
                        children
                    }
                ];
            }
        }

        return [];
    });
}

/** Lower-case extension of a file name or path, or "" when it has none. */
export function getExtension(path: string) {
    const name = path.split("/").pop() ?? path;
    return name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
}

/** Keep only files for which `keep` returns true, dropping folders left empty. */
export function filterTreeByFile(nodes: RepoNode[], keep: (path: string) => boolean): RepoNode[] {
    return nodes.flatMap((node) => {
        if (node.type === "file") return keep(node.path) ? [node] : [];

        if (node.children) {
            const children = filterTreeByFile(node.children, keep);
            if (children.length > 0) {
                const childFilePaths = children.flatMap((c) => c.filePaths);
                return [{ ...node, children, filePaths: childFilePaths }];
            }
        }

        return [];
    });
}
