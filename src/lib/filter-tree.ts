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
