import { RepoNode } from "@/types/repo"

export function collectPaths(node: RepoNode): string[] {
    const paths: string[] = [node.path]

    if (node.children) {
        for (const child of node.children) {
            paths.push(...collectPaths(child))
        }
    }

    return paths
}

export function collectFilePaths(node: RepoNode): string[] {
    return node.filePaths
}
