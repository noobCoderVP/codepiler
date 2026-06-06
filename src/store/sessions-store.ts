import { create } from "zustand";
import { RepoFile } from "@/types/repo";

const STORAGE_KEY = "codepiler_sessions";

export type SavedSession = {
    id: string;
    name: string;
    repoName: string;
    timestamp: number;
    files: RepoFile[];
    selected: string[];
    totalTokens: number;
};

type SessionsState = {
    sessions: SavedSession[];
    loadFromStorage: () => void;
    saveSession: (session: Omit<SavedSession, "id">) => void;
    deleteSession: (id: string) => void;
};

function readStorage(): SavedSession[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as SavedSession[]) : [];
    } catch {
        return [];
    }
}

function writeStorage(sessions: SavedSession[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
        // localStorage quota exceeded — silently skip
    }
}

export const useSessionsStore = create<SessionsState>((set, get) => ({
    sessions: [],

    loadFromStorage: () => {
        set({ sessions: readStorage() });
    },

    saveSession: (session) => {
        const newSession: SavedSession = {
            ...session,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        };
        const next = [newSession, ...get().sessions];
        writeStorage(next);
        set({ sessions: next });
    },

    deleteSession: (id) => {
        const next = get().sessions.filter((s) => s.id !== id);
        writeStorage(next);
        set({ sessions: next });
    }
}));
