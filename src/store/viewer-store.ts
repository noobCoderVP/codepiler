import { create } from "zustand";

type ViewerState = {
    /** File to scroll to inside the combined prompt. */
    activePath: string | null;
    /** File opened on its own for preview; it may not be selected. */
    previewPath: string | null;
    setActivePath: (path: string | null) => void;
    setPreviewPath: (path: string | null) => void;
};

export const useViewerStore = create<ViewerState>((set) => ({
    activePath: null,
    previewPath: null,
    setActivePath: (path) => set({ activePath: path }),
    setPreviewPath: (path) => set({ previewPath: path })
}));

/** Show a file from the explorer: jump to it in the prompt if selected, otherwise preview it alone. */
export function showFile(path: string, selected: boolean) {
    if (selected) useViewerStore.setState({ activePath: path, previewPath: null });
    else useViewerStore.setState({ previewPath: path });
}
