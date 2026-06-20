"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
    return (
        <TooltipPrimitive.Provider delayDuration={400} skipDelayDuration={100}>
            {children}
        </TooltipPrimitive.Provider>
    );
}

export function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
    return (
        <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content
                    sideOffset={6}
                    className="z-50 max-w-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] shadow-[0_4px_12px_rgba(15,23,42,0.1)] data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95"
                >
                    {content}
                    <TooltipPrimitive.Arrow className="fill-[var(--border)]" />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    );
}
