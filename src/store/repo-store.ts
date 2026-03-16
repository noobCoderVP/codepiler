import { create } from "zustand"
import { RepoNode } from "@/types/repo"
import { buildRepoTree } from "@/lib/build-tree"
import { filterGitignore } from "@/lib/gitignore-filter"
import { useSelectionStore } from "./selection-store"

type RepoFile = {
    path: string
    content: string
    size: number
}

type RepoState = {
    files: RepoFile[]
    tree: RepoNode[]

    setFiles: (files: RepoFile[]) => void
}

export const useRepoStore = create<RepoState>((set) => ({
    files: [],
    tree: [],

    setFiles: (files) => {
        const filtered = filterGitignore(files)

        const tree = buildRepoTree(filtered.map((f) => f.path))

        set({
            files: filtered,
            tree
        })

        // auto-select all non-ignored files
        useSelectionStore.getState().setInitialSelection(filtered.map((f) => f.path))
    }
}))
