"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    X,
    BookOpen,
    Trash2,
    FolderOpen,
    Save,
    AlertTriangle,
    Search,
    ArrowUpDown
} from "lucide-react";
import { useSessionsStore, SavedSession } from "@/store/sessions-store";
import { useRepoStore } from "@/store/repo-store";
import { useSelectionStore } from "@/store/selection-store";
import { formatTokenCount } from "@/lib/token-utils";

type Props = {
    onClose: () => void;
    pendingSave?: {
        repoName: string;
        files: import("@/types/repo").RepoFile[];
        selected: string[];
        totalTokens: number;
    } | null;
};

function DeleteConfirmModal({
    sessionName,
    onConfirm,
    onCancel
}: {
    sessionName: string;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
            if (e.key === "Enter") onConfirm();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onCancel, onConfirm]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === overlayRef.current) onCancel();
            }}
        >
            <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
                        <AlertTriangle size={18} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                            Delete session?
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                            This will permanently remove &quot;{sessionName}&quot;.
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function SavedSessionsModal({ onClose, pendingSave }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const sessions = useSessionsStore((s) => s.sessions);
    const loadFromStorage = useSessionsStore((s) => s.loadFromStorage);
    const saveSession = useSessionsStore((s) => s.saveSession);
    const deleteSession = useSessionsStore((s) => s.deleteSession);

    const setFiles = useRepoStore((s) => s.setFiles);
    const setInitialSelection = useSelectionStore((s) => s.setInitialSelection);

    const [tab, setTab] = useState<"list" | "save">(pendingSave ? "save" : "list");
    const [sessionName, setSessionName] = useState("");
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [savedFlash, setSavedFlash] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "name" | "tokens">("date");
    const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !confirmDeleteId) onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, confirmDeleteId]);

    const handleSave = () => {
        if (!pendingSave || !sessionName.trim()) return;
        saveSession({
            name: sessionName.trim(),
            repoName: pendingSave.repoName,
            timestamp: Date.now(),
            files: pendingSave.files,
            selected: pendingSave.selected,
            totalTokens: pendingSave.totalTokens
        });
        setSavedFlash(true);
        setTimeout(() => {
            setSavedFlash(false);
            setTab("list");
            setSessionName("");
        }, 900);
    };

    const handleLoad = (session: SavedSession) => {
        setLoadingId(session.id);
        setFiles(session.files);
        setInitialSelection(session.selected);
        setTimeout(() => {
            setLoadingId(null);
            onClose();
        }, 300);
    };

    const handleConfirmDelete = () => {
        if (confirmDeleteId) {
            deleteSession(confirmDeleteId);
            setConfirmDeleteId(null);
        }
    };

    const formatDate = (ts: number) =>
        new Date(ts).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    const toggleSort = (col: "date" | "name" | "tokens") => {
        if (sortBy === col) {
            setSortDir((d) => (d === "desc" ? "asc" : "desc"));
        } else {
            setSortBy(col);
            setSortDir("desc");
        }
    };

    const filteredSessions = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const filtered = q
            ? sessions.filter(
                  (s) => s.name.toLowerCase().includes(q) || s.repoName.toLowerCase().includes(q)
              )
            : sessions;

        return [...filtered].sort((a, b) => {
            let cmp = 0;
            if (sortBy === "date") cmp = a.timestamp - b.timestamp;
            else if (sortBy === "name") cmp = a.name.localeCompare(b.name);
            else if (sortBy === "tokens") cmp = a.totalTokens - b.totalTokens;
            return sortDir === "desc" ? -cmp : cmp;
        });
    }, [sessions, searchQuery, sortBy, sortDir]);

    const sessionToDelete = confirmDeleteId ? sessions.find((s) => s.id === confirmDeleteId) : null;

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === overlayRef.current) onClose();
                }}
            >
                <div
                    className="flex w-full max-w-2xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
                    style={{ maxHeight: "80vh", minHeight: "520px" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
                        <div className="flex items-center gap-2.5">
                            <BookOpen size={17} className="text-[var(--accent)]" />
                            <span className="text-base font-semibold text-[var(--text-primary)]">
                                Saved Sessions
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[var(--border)]">
                        {(["list", "save"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                disabled={t === "save" && !pendingSave}
                                className={`px-6 py-3 text-sm font-semibold transition ${
                                    tab === t
                                        ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
                                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
                                }`}
                            >
                                {t === "list" ? "All Sessions" : "Save Current"}
                            </button>
                        ))}
                    </div>

                    {/* Save tab */}
                    {tab === "save" && pendingSave && (
                        <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-8">
                            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4 space-y-2">
                                <p className="text-sm">
                                    <span className="font-semibold text-[var(--text-primary)]">
                                        Repo:{" "}
                                    </span>
                                    <span className="text-[var(--text-secondary)]">
                                        {pendingSave.repoName}
                                    </span>
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-[var(--text-primary)]">
                                        Files selected:{" "}
                                    </span>
                                    <span className="text-[var(--text-secondary)]">
                                        {pendingSave.selected.length}
                                    </span>
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-[var(--text-primary)]">
                                        Total tokens:{" "}
                                    </span>
                                    <span className="text-[var(--text-secondary)]">
                                        {formatTokenCount(pendingSave.totalTokens)}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    Session name
                                </label>
                                <input
                                    autoFocus
                                    value={sessionName}
                                    onChange={(e) => setSessionName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                    placeholder="e.g. Auth refactor context"
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-secondary)]"
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={!sessionName.trim() || savedFlash}
                                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save size={15} />
                                {savedFlash ? "Saved!" : "Save Session"}
                            </button>
                        </div>
                    )}

                    {/* List tab */}
                    {tab === "list" && (
                        <>
                            {sessions.length === 0 ? (
                                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-muted)]">
                                        <BookOpen
                                            size={24}
                                            className="text-[var(--text-secondary)] opacity-60"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-[var(--text-primary)]">
                                            No saved sessions yet
                                        </p>
                                        <p className="mt-1.5 max-w-xs text-sm text-[var(--text-secondary)]">
                                            Save your current repository and file selection to
                                            resume it later — no re-uploading needed.
                                        </p>
                                    </div>
                                    {pendingSave && (
                                        <button
                                            onClick={() => setTab("save")}
                                            className="mt-2 flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                                        >
                                            <Save size={14} />
                                            Save current selection
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-1 flex-col overflow-hidden">
                                    {/* Search + sort toolbar */}
                                    <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
                                        <label className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5">
                                            <Search
                                                size={13}
                                                className="shrink-0 text-[var(--text-secondary)]"
                                            />
                                            <input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search by name or repo…"
                                                className="w-full bg-transparent text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                                            />
                                            {searchQuery && (
                                                <button
                                                    onClick={() => setSearchQuery("")}
                                                    className="shrink-0 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                                >
                                                    <X size={11} />
                                                </button>
                                            )}
                                        </label>
                                        <span className="text-xs text-[var(--text-secondary)]">
                                            Sort:
                                        </span>
                                        {(["date", "name", "tokens"] as const).map((col) => (
                                            <button
                                                key={col}
                                                onClick={() => toggleSort(col)}
                                                className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                                                    sortBy === col
                                                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                                                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                                }`}
                                            >
                                                {col === "date"
                                                    ? "Date"
                                                    : col === "name"
                                                      ? "Name"
                                                      : "Tokens"}
                                                {sortBy === col && (
                                                    <ArrowUpDown size={10} className="opacity-70" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex-1 overflow-y-auto">
                                        {filteredSessions.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-sm text-[var(--text-secondary)]">
                                                <Search size={20} className="opacity-40" />
                                                No sessions match &quot;{searchQuery}&quot;
                                            </div>
                                        ) : (
                                            <table className="w-full">
                                                <thead className="sticky top-0 bg-[var(--surface-muted)]">
                                                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                                                        <th className="px-6 py-3">Name</th>
                                                        <th className="px-3 py-3">Repo</th>
                                                        <th className="px-3 py-3 text-center">
                                                            Files
                                                        </th>
                                                        <th className="px-3 py-3 text-center">
                                                            Tokens
                                                        </th>
                                                        <th className="px-3 py-3">Saved</th>
                                                        <th className="px-3 py-3 text-center">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {filteredSessions.map((session) => (
                                                        <tr
                                                            key={session.id}
                                                            className="border-t border-[var(--border)] hover:bg-[var(--surface-muted)]"
                                                        >
                                                            <td className="px-6 py-3.5 font-medium text-[var(--text-primary)]">
                                                                {session.name}
                                                            </td>
                                                            <td className="max-w-[7rem] truncate px-3 py-3.5 text-[var(--text-secondary)]">
                                                                {session.repoName}
                                                            </td>
                                                            <td className="px-3 py-3.5 text-center text-[var(--text-secondary)]">
                                                                {session.selected.length}
                                                            </td>
                                                            <td className="px-3 py-3.5 text-center">
                                                                <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
                                                                    {formatTokenCount(
                                                                        session.totalTokens
                                                                    )}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-3.5 text-sm text-[var(--text-secondary)]">
                                                                {formatDate(session.timestamp)}
                                                            </td>
                                                            <td className="px-3 py-3.5">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleLoad(session)
                                                                        }
                                                                        disabled={
                                                                            loadingId === session.id
                                                                        }
                                                                        title="Load this session into the workspace"
                                                                        className="flex items-center gap-1.5 rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-85 disabled:opacity-50"
                                                                    >
                                                                        <FolderOpen size={13} />
                                                                        {loadingId === session.id
                                                                            ? "Loading…"
                                                                            : "Load"}
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            setConfirmDeleteId(
                                                                                session.id
                                                                            )
                                                                        }
                                                                        title="Delete session"
                                                                        className="rounded-lg border border-[var(--border)] p-1.5 text-red-400 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/20"
                                                                    >
                                                                        <Trash2 size={13} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {confirmDeleteId && sessionToDelete && (
                <DeleteConfirmModal
                    sessionName={sessionToDelete.name}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setConfirmDeleteId(null)}
                />
            )}
        </>
    );
}
