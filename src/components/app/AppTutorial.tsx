"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = {
    title: string;
    description: string;
    selector: string;
};

const steps: Step[] = [
    {
        title: "Import your project",
        description:
            "Drop a folder or ZIP here, or use the buttons. Dependencies, binaries and build output are skipped automatically.",
        selector: '[data-tour="upload"]'
    },
    {
        title: "Pick the files the AI should see",
        description:
            "Tick files or whole folders to include them. Click a name to preview it. Each row shows its token cost.",
        selector: '[data-tour="tree"]'
    },
    {
        title: "Tell the AI what to do",
        description:
            "Optional: choose an expert system prompt and a task, such as code review, finding bugs or writing tests.",
        selector: '[data-tour="instructions"]'
    },
    {
        title: "Choose an output format",
        description:
            "Plain text works for most chats. JSON, XML and Markdown suit tools and pipelines.",
        selector: '[data-tour="viewer-tabs"]'
    },
    {
        title: "Copy and paste",
        description:
            "Copy the full prompt and paste it into ChatGPT, Claude or Gemini, or download it as a file.",
        selector: '[data-tour="export"]'
    }
];

const EVENT_NAME = "codepiler:start-tutorial";

export default function AppTutorial() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [measured, setMeasured] = useState<{ index: number; rect: DOMRect | null } | null>(null);

    useEffect(() => {
        const handleStart = () => setActiveIndex(0);

        window.addEventListener(EVENT_NAME, handleStart);
        return () => window.removeEventListener(EVENT_NAME, handleStart);
    }, []);

    useEffect(() => {
        if (activeIndex === null) return;

        const updateRect = () => {
            const element = document.querySelector(steps[activeIndex].selector);
            setMeasured({
                index: activeIndex,
                rect: element instanceof HTMLElement ? element.getBoundingClientRect() : null
            });
        };

        const frame = window.requestAnimationFrame(updateRect);
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveIndex(null);
        };

        window.addEventListener("resize", updateRect);
        window.addEventListener("scroll", updateRect, true);
        window.addEventListener("keydown", handleKey);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("resize", updateRect);
            window.removeEventListener("scroll", updateRect, true);
            window.removeEventListener("keydown", handleKey);
        };
    }, [activeIndex]);

    const activeStep = activeIndex === null ? null : (steps[activeIndex] ?? null);
    const highlightRect = measured && measured.index === activeIndex ? measured.rect : null;
    const targetMissing = measured?.index === activeIndex && highlightRect === null;

    const nextStep = () => {
        if (activeIndex === null) return;
        setActiveIndex(activeIndex >= steps.length - 1 ? null : activeIndex + 1);
    };

    const previousStep = () => {
        if (activeIndex === null || activeIndex === 0) return;
        setActiveIndex(activeIndex - 1);
    };

    return (
        <AnimatePresence>
            {activeStep && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none fixed inset-0 z-[110] bg-[rgba(15,23,42,0.35)]"
                    />

                    {highlightRect && (
                        <motion.div
                            initial={false}
                            animate={{
                                top: Math.max(highlightRect.top - 8, 8),
                                left: Math.max(highlightRect.left - 8, 8),
                                width: highlightRect.width + 16,
                                height: highlightRect.height + 16
                            }}
                            className="pointer-events-none fixed z-[111] rounded-[1.5rem] border-2 border-[var(--accent)] shadow-[0_0_0_9999px_rgba(15,23,42,0.02)]"
                        />
                    )}

                    <motion.div
                        role="dialog"
                        aria-label="Tutorial"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className="fixed bottom-6 right-6 left-6 z-[112] max-w-sm rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-lg)] sm:left-auto"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            Step {activeIndex! + 1} of {steps.length}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                            {activeStep.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            {activeStep.description}
                        </p>
                        {targetMissing && (
                            <p className="mt-2 text-xs text-[var(--text-secondary)]">
                                This part appears after you import a project. You can use the sample
                                project to try it.
                            </p>
                        )}

                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={previousStep}
                                disabled={activeIndex === 0}
                                className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] disabled:opacity-40"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white"
                            >
                                {activeIndex === steps.length - 1 ? "Finish" : "Next"}
                            </button>
                            <button
                                onClick={() => setActiveIndex(null)}
                                className="ml-auto text-sm text-[var(--text-secondary)]"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
