import { create } from "zustand";

type ViewerState = {
    activePath: string | null;
    setActivePath: (path: string | null) => void;
};

export const useViewerStore = create<ViewerState>((set) => ({
    activePath: null,
    setActivePath: (path) => set({ activePath: path })
}));
