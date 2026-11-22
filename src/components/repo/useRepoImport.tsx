"use client";

import { useRef, useState } from "react";
import { loadEntries, loadZip } from "@/lib/repo-loader";
import { entriesFromFileList } from "@/lib/read-files";
import { getDroppedEntries, readDroppedEntries } from "@/lib/read-drop";
import { useRepoStore } from "@/store/repo-store";

/** Folder / ZIP pickers and drag-and-drop handlers shared by every import surface. */
export function useRepoImport() {
    const folderInputRef = useRef<HTMLInputElement | null>(null);
    const zipInputRef = useRef<HTMLInputElement | null>(null);
    const loading = useRepoStore((s) => s.loading);
    const [dragActive, setDragActive] = useState(false);

    const handleDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setDragActive(false);
        if (loading) return;

        const dropped = Array.from(event.dataTransfer.files);
        const zipFile = dropped.length === 1 && dropped[0].name.toLowerCase().endsWith(".zip");

        if (zipFile) {
            void loadZip(dropped[0]);
            return;
        }

        // read the entries synchronously: DataTransfer is emptied once this handler returns
        const entries = getDroppedEntries(event.dataTransfer);

        void (async () => {
            useRepoStore.getState().setLoadState({ loading: true, error: null });
            try {
                await loadEntries(await readDroppedEntries(entries));
            } catch {
                useRepoStore.getState().setLoadState({
                    loading: false,
                    error: "Couldn't read the dropped folder. Try the Folder button instead."
                });
            }
        })();
    };

    const dropHandlers = {
        onDragOver: (event: React.DragEvent<HTMLElement>) => {
            event.preventDefault();
            if (!loading) setDragActive(true);
        },
        onDragLeave: (event: React.DragEvent<HTMLElement>) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setDragActive(false);
            }
        },
        onDrop: handleDrop
    };

    const inputs = (
        <>
            <input
                ref={folderInputRef}
                type="file"
                multiple
                {...{ webkitdirectory: "true" }}
                className="hidden"
                onChange={(event) => {
                    const files = event.currentTarget.files;
                    if (files?.length) void loadEntries(entriesFromFileList(files));
                    event.currentTarget.value = "";
                }}
            />
            <input
                ref={zipInputRef}
                type="file"
                accept=".zip,application/zip"
                className="hidden"
                onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) void loadZip(file);
                    event.currentTarget.value = "";
                }}
            />
        </>
    );

    return {
        loading,
        dragActive,
        dropHandlers,
        inputs,
        openFolder: () => folderInputRef.current?.click(),
        openZip: () => zipInputRef.current?.click()
    };
}
