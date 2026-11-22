import { create } from "zustand";
import { RepoFile, RepoNode } from "@/types/repo";
import { buildRepoTree } from "@/lib/build-tree";

export type LoadSummary = {
    loaded: number;
    skipped: number;
    preselected: number;
};

type RepoState = {
    files: RepoFile[];
    tree: RepoNode[];
    repoName: string | null;
    tokenMap: Record<string, number>;

    loading: boolean;
    error: string | null;
    summary: LoadSummary | null;

    setRepo: (files: RepoFile[], tokenMap: Record<string, number>) => void;
    setLoadState: (state: Partial<Pick<RepoState, "loading" | "error" | "summary">>) => void;
};

export const useRepoStore = create<RepoState>((set) => ({
    files: [],
    tree: [],
    repoName: null,
    tokenMap: {},

    loading: false,
    error: null,
    summary: null,

    setRepo: (files, tokenMap) => {
        set({
            files,
            tree: buildRepoTree(files.map((f) => f.path)),
            repoName: files[0]?.path.split("/")[0] ?? null,
            tokenMap
        });
    },

    setLoadState: (state) => set(state)
}));
