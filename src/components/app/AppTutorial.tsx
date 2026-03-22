"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = {
    title: string;
    description: string;
    selector: string;
};

const steps: Step[] = [
    {
        title: "Import your repository",
        description: "Start by loading a folder or ZIP archive into the workspace.",
        selector: '[data-tour="upload"]'
    },
    {
        title: "Search and review the tree",
        description: "Use the search box and tree controls to narrow down the code you want.",
        selector: '[data-tour="tree"]'
    },
    {
        title: "Switch output formats",
        description: "Move between text, JSON, XML, and Markdown depending on your workflow.",
        selector: '[data-tour="viewer-tabs"]'
    },
    {
        title: "Export the final context",
        description: "Copy or download the generated output once the selection looks right.",
        selector: '[data-tour="viewer-actions"]'
    }
];

const STORAGE_KEY = "codepiler.tutorial.dismissed";
const EVENT_NAME = "codepiler:start-tutorial";

export default function AppTutorial() {
    const [promptOpen, setPromptOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const dismissed = window.localStorage.getItem(STORAGE_KEY);

        if (!dismissed) {
            setPromptOpen(true);
        }

        const handleStart = () => {
            setPromptOpen(false);
            setActiveIndex(0);
        };

        window.addEventListener(EVENT_NAME, handleStart);
        return () => window.removeEventListener(EVENT_NAME, handleStart);
    }, []);

    useEffect(() => {
        if (activeIndex === null) {
            setHighlightRect(null);
            return;
        }

        const updateRect = () => {
            const step = steps[activeIndex];
            const element = document.querySelector(step.selector);

            if (element instanceof HTMLElement) {
                setHighlightRect(element.getBoundingClientRect());
            }
        };

        updateRect();
        window.addEventListener("resize", updateRect);
        window.addEventListener("scroll", updateRect, true);

        return () => {
            window.removeEventListener("resize", updateRect);
            window.removeEventListener("scroll", updateRect, true);
        };
    }, [activeIndex]);

    const activeStep = useMemo(
        () => (activeIndex === null ? null : (steps[activeIndex] ?? null)),
        [activeIndex]
    );

    const closePrompt = (dismissTutorial: boolean) => {
        setPromptOpen(false);

        if (dismissTutorial) {
            window.localStorage.setItem(STORAGE_KEY, "true");
        }
    };

    const closeTutorial = () => {
        setActiveIndex(null);
        window.localStorage.setItem(STORAGE_KEY, "true");
    };

    const nextStep = () => {
        if (activeIndex === null) return;

        if (activeIndex >= steps.length - 1) {
            closeTutorial();
            return;
        }

        setActiveIndex(activeIndex + 1);
    };

    const previousStep = () => {
        if (activeIndex === null || activeIndex === 0) return;
        setActiveIndex(activeIndex - 1);
    };

    return (
        <>
            <AnimatePresence>
                {promptOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(15,23,42,0.45)] px-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="max-w-md rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)]"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Quick tutorial
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                                First time in CodePiler?
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                I can walk you through the key UI areas in under a minute.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    onClick={() => {
                                        window.localStorage.setItem(STORAGE_KEY, "true");
                                        setPromptOpen(false);
                                        setActiveIndex(0);
                                    }}
                                    className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
                                >
                                    Start tutorial
                                </button>
                                <button
                                    onClick={() => closePrompt(true)}
                                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
                                >
                                    Skip
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeStep && highlightRect && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pointer-events-none fixed inset-0 z-[110] bg-[rgba(15,23,42,0.35)]"
                        />

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

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            className="fixed bottom-6 right-6 z-[112] max-w-sm rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-lg)]"
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
                                    onClick={closeTutorial}
                                    className="ml-auto text-sm text-[var(--text-secondary)]"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
