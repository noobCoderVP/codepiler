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

export function filterTreeByExtensions(nodes: RepoNode[], extensions: Set<string>): RepoNode[] {
    if (extensions.size === 0) return nodes;

    return nodes.flatMap((node) => {
        if (node.type === "file") {
            const ext = node.name.includes(".") ? node.name.split(".").pop()!.toLowerCase() : "";
            return extensions.has(ext) ? [node] : [];
        }

        if (node.children) {
            const children = filterTreeByExtensions(node.children, extensions);
            if (children.length > 0) {
                const childFilePaths = children.flatMap((c) => c.filePaths);
                return [{ ...node, children, filePaths: childFilePaths }];
            }
        }

        return [];
    });
}

export function getAvailableExtensions(nodes: RepoNode[]): string[] {
    const exts = new Set<string>();

    function walk(node: RepoNode) {
        if (node.type === "file") {
            const ext = node.name.includes(".") ? node.name.split(".").pop()!.toLowerCase() : "";
            exts.add(ext);
        } else {
            node.children?.forEach(walk);
        }
    }

    nodes.forEach(walk);
    return Array.from(exts).sort();
}
