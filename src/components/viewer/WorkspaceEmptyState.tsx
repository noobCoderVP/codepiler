"use client";

import { useEffect, useState } from "react";
import {
    AlertCircle,
    BookOpen,
    ClipboardCopy,
    FolderUp,
    ListChecks,
    Loader2,
    MessageSquarePlus,
    ShieldCheck,
    Sparkles,
    UploadCloud
} from "lucide-react";
import { loadSample } from "@/lib/repo-loader";
import { useRepoStore } from "@/store/repo-store";
import { useSessionsStore } from "@/store/sessions-store";
import { useRepoImport } from "@/components/repo/useRepoImport";
import SavedSessionsModal from "@/components/repo/SavedSessionsModal";

const STEPS = [
    {
        icon: FolderUp,
        title: "Import your project",
        text: "Drop a folder or ZIP. Dependencies, binaries and build output are skipped automatically."
    },
    {
        icon: ListChecks,
        title: "Pick the relevant files",
        text: "Key files are pre-selected. Tick or untick files and watch the token count update."
    },
    {
        icon: MessageSquarePlus,
        title: "Add instructions",
        text: "Optional: choose an expert system prompt and a task such as code review or writing tests."
    },
    {
        icon: ClipboardCopy,
        title: "Copy & paste",
        text: "Copy one prompt and paste it into ChatGPT, Claude, Gemini or any other LLM."
    }
];

export default function WorkspaceEmptyState() {
    const error = useRepoStore((s) => s.error);
    const sessionCount = useSessionsStore((s) => s.sessions.length);
    const loadSessions = useSessionsStore((s) => s.loadFromStorage);
    const { loading, dragActive, dropHandlers, inputs, openFolder, openZip } = useRepoImport();
    const [showSessions, setShowSessions] = useState(false);

    useEffect(() => {
        loadSessions();
    }, [loadSessions]);

    return (
        <div className="flex h-full overflow-auto">
            <div className="m-auto w-full max-w-3xl px-6 py-10">
                <h1 className="text-center text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                    Turn your code into a ready-to-paste AI prompt
                </h1>
                <p className="mx-auto mt-2 max-w-xl text-center text-sm text-[var(--text-secondary)]">
                    Give ChatGPT, Claude or Gemini exactly the files they need, with nothing extra
                    to pay for.
                </p>

                <div
                    {...dropHandlers}
                    className={`mt-8 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                        dragActive
                            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                            : "border-[var(--border-strong)] bg-[var(--surface-muted)]"
                    }`}
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--accent)] shadow-sm">
                        {loading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <UploadCloud className="h-6 w-6" />
                        )}
                    </div>
                    <div>
                        <p className="text-base font-semibold text-[var(--text-primary)]">
                            {loading
                                ? "Reading your files…"
                                : dragActive
                                  ? "Drop to import"
                                  : "Drop a project folder or .zip here"}
                        </p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">or choose one</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={openFolder}
                            disabled={loading}
                            className="btn btn-primary btn-lg"
                        >
                            <FolderUp size={16} />
                            Choose folder
                        </button>
                        <button
                            onClick={openZip}
                            disabled={loading}
                            className="btn btn-secondary btn-lg"
                        >
                            <UploadCloud size={16} />
                            Choose .zip
                        </button>
                        <button
                            onClick={() => void loadSample()}
                            disabled={loading}
                            className="btn btn-secondary btn-lg"
                        >
                            <Sparkles size={16} className="text-[var(--accent)]" />
                            Try a sample project
                        </button>
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="flex max-w-md items-start gap-1.5 text-left text-xs text-[var(--danger)]"
                        >
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            {error}
                        </p>
                    )}

                    <p className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <ShieldCheck size={14} className="text-[var(--success)]" />
                        Your files are read by your browser and never uploaded anywhere.
                    </p>

                    {inputs}
                </div>

                {sessionCount > 0 && (
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => setShowSessions(true)}
                            className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
                        >
                            <BookOpen size={15} />
                            Or restore one of your {sessionCount} saved session
                            {sessionCount === 1 ? "" : "s"}
                        </button>
                    </div>
                )}

                <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <li
                                key={step.title}
                                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                                        {index + 1}
                                    </span>
                                    <Icon size={16} className="text-[var(--text-secondary)]" />
                                </div>
                                <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                                    {step.title}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                    {step.text}
                                </p>
                            </li>
                        );
                    })}
                </ol>
            </div>

            {showSessions && <SavedSessionsModal onClose={() => setShowSessions(false)} />}
        </div>
    );
}
