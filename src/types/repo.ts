export type RepoFile = {
    path: string
    content: string
    size: number
}

export type RepoNode = {
    id: string
    name: string
    path: string
    type: "file" | "folder"
    children?: RepoNode[]
    filePaths: string[]
}
