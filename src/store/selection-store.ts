import { create } from "zustand"

type SelectionState = {
    selected: Set<string>

    toggle: (path: string) => void
    select: (path: string) => void
    deselect: (path: string) => void

    selectMany: (paths: string[]) => void
    deselectMany: (paths: string[]) => void
    toggleMany: (paths: string[]) => void

    setInitialSelection: (paths: string[]) => void

    clear: () => void

    isSelected: (path: string) => boolean
    count: () => number
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
    selected: new Set(),

    toggle: (path) => {
        const next = new Set(get().selected)

        if (next.has(path)) next.delete(path)
        else next.add(path)

        set({ selected: next })
    },

    select: (path) => {
        const next = new Set(get().selected)
        next.add(path)
        set({ selected: next })
    },

    deselect: (path) => {
        const next = new Set(get().selected)
        next.delete(path)
        set({ selected: next })
    },

    selectMany: (paths) => {
        const next = new Set(get().selected)
        paths.forEach((p) => next.add(p))
        set({ selected: next })
    },

    deselectMany: (paths) => {
        const next = new Set(get().selected)
        paths.forEach((p) => next.delete(p))
        set({ selected: next })
    },

    toggleMany: (paths) => {
        const next = new Set(get().selected)

        const allSelected = paths.every((p) => next.has(p))

        if (allSelected) {
            paths.forEach((p) => next.delete(p))
        } else {
            paths.forEach((p) => next.add(p))
        }

        set({ selected: next })
    },

    setInitialSelection: (paths) => {
        set({ selected: new Set(paths) })
    },

    clear: () => set({ selected: new Set() }),

    isSelected: (path) => get().selected.has(path),

    count: () => get().selected.size
}))
