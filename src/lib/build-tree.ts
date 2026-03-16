import { RepoNode } from "@/types/repo"

interface TreeNode {
    id: string
    name: string
    path: string
    type: "file" | "folder"
    children: Record<string, TreeNode>
}

export function buildRepoTree(paths: string[]): RepoNode[] {
    const root: Record<string, TreeNode> = {}

    for (const path of paths) {
        const parts = path.split("/")
        let current = root

        parts.forEach((part, index) => {
            if (!current[part]) {
                const nodePath = parts.slice(0, index + 1).join("/")

                current[part] = {
                    id: nodePath, // ⭐ required for react-arborist
                    name: part,
                    path: nodePath,
                    type: index === parts.length - 1 ? "file" : "folder",
                    children: {}
                }
            }

            current = current[part].children
        })
    }

    function convert(obj: Record<string, TreeNode>): RepoNode[] {
        return Object.values(obj).map((node) => ({
            id: node.id,
            name: node.name,
            path: node.path,
            type: node.type,
            children: node.type === "folder" ? convert(node.children) : undefined
        }))
    }

    return convert(root)
}
