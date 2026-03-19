import { create } from "zustand";
import { RepoNode } from "@/types/repo";
import { buildRepoTree } from "@/lib/build-tree";
import { filterGitignore } from "@/lib/gitignore-filter";

type RepoFile = {
    path: string;
    content: string;
    size: number;
};

type RepoState = {
    files: RepoFile[];
    tree: RepoNode[];

    setFiles: (files: RepoFile[]) => RepoFile[];
};

export const useRepoStore = create<RepoState>((set) => ({
    files: [],
    tree: [],

    setFiles: (files) => {
        const filtered = filterGitignore(files);
        const tree = buildRepoTree(filtered.map((f) => f.path));

        set({
            files: filtered,
            tree
        });

        return filtered; // ✅ now correctly typed
    }
}));
