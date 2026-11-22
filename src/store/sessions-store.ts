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
    /** Returns false when browser storage is full and the session could not be saved. */
    saveSession: (session: Omit<SavedSession, "id">) => boolean;
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
        return true;
    } catch {
        // localStorage quota exceeded
        return false;
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
        if (!writeStorage(next)) return false;
        set({ sessions: next });
        return true;
    },

    deleteSession: (id) => {
        const next = get().sessions.filter((s) => s.id !== id);
        writeStorage(next);
        set({ sessions: next });
    }
}));
