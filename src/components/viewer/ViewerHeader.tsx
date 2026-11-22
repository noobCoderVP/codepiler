"use client";

import { useState } from "react";
import { Save, BookOpen, MessageSquarePlus } from "lucide-react";
import ViewerChips from "./ViewerChips";
import ViewerActions from "./ViewerActions";
import WorkflowSteps from "./WorkflowSteps";
import SavedSessionsModal from "@/components/repo/SavedSessionsModal";
import { ViewerFormat } from "@/lib/viewer-formatters";
import { RepoFile } from "@/types/repo";

type Props = {
    repoName: string | null;
    files: number;
    tokens: number;
    content: string;
    format: ViewerFormat;
    selectedFiles: RepoFile[];
    selectedPaths: string[];
    modelLimit: number | null;
    onModelLimitChange: (limit: number | null) => void;
    instructionsLabel: string | null;
    exported: boolean;
    onExported: () => void;
    onTogglePromptEditor: () => void;
};

const secondaryButton = "btn btn-secondary";

export default function ViewerHeader({
    repoName,
    files,
    tokens,
    content,
    format,
    selectedFiles,
    selectedPaths,
    modelLimit,
    onModelLimitChange,
    instructionsLabel,
    exported,
    onExported,
    onTogglePromptEditor
}: Props) {
    const [modal, setModal] = useState<"sessions" | "save" | null>(null);

    const canSave = selectedFiles.length > 0 && !!repoName;

    return (
        <>
            <div className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-3">
                <div className="mb-3">
                    <WorkflowSteps
                        selectedCount={files}
                        hasInstructions={!!instructionsLabel}
                        exported={exported}
                        onOpenInstructions={onTogglePromptEditor}
                    />
                </div>

                <div data-tour="viewer-actions" className="flex flex-wrap items-center gap-2">
                    {/* Size of the prompt and the model budget */}
                    <ViewerChips
                        files={files}
                        tokens={tokens}
                        modelLimit={modelLimit}
                        onModelLimitChange={onModelLimitChange}
                    />

                    <div className="h-5 w-px bg-[var(--border)]" />

                    <button
                        data-tour="instructions"
                        onClick={onTogglePromptEditor}
                        title="Add a system prompt and a task around your code"
                        data-active={!!instructionsLabel}
                        className={
                            instructionsLabel ? "btn btn-secondary max-w-[16rem]" : secondaryButton
                        }
                    >
                        <MessageSquarePlus size={13} className="shrink-0" />
                        <span className="truncate">
                            {instructionsLabel
                                ? `Instructions: ${instructionsLabel}`
                                : "Add instructions"}
                        </span>
                    </button>

                    <button
                        onClick={() => setModal("sessions")}
                        title="Open a saved session"
                        className={secondaryButton}
                    >
                        <BookOpen size={13} />
                        Sessions
                    </button>
                    <button
                        onClick={() => setModal("save")}
                        disabled={!canSave}
                        title={
                            canSave ? "Save this file selection for later" : "Select files first"
                        }
                        className={secondaryButton}
                    >
                        <Save size={13} />
                        Save
                    </button>

                    <div className="ml-auto">
                        <ViewerActions
                            content={content}
                            format={format}
                            repoName={repoName}
                            disabled={files === 0}
                            onExported={onExported}
                        />
                    </div>
                </div>
            </div>

            {(modal === "save" || modal === "sessions") && (
                <SavedSessionsModal
                    onClose={() => setModal(null)}
                    pendingSave={
                        modal === "save" && canSave
                            ? {
                                  repoName: repoName!,
                                  files: selectedFiles,
                                  selected: selectedPaths,
                                  totalTokens: tokens
                              }
                            : null
                    }
                />
            )}
        </>
    );
}
