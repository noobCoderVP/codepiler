"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogOverlay() {
    return (
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    );
}

export function DialogContent({
    children,
    className = "",
    onClose
}: {
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
}) {
    return (
        <DialogPrimitive.Portal>
            <DialogOverlay />
            <DialogPrimitive.Content
                className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(15,23,42,0.2)] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${className}`}
            >
                {children}
                {onClose && (
                    <DialogPrimitive.Close
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-lg p-1.5 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                    >
                        <X size={15} />
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
    return <div className="border-b border-[var(--border)] px-6 py-4">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
    return (
        <DialogPrimitive.Title className="text-sm font-semibold text-[var(--text-primary)]">
            {children}
        </DialogPrimitive.Title>
    );
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
    return (
        <DialogPrimitive.Description className="mt-0.5 text-xs text-[var(--text-secondary)]">
            {children}
        </DialogPrimitive.Description>
    );
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-muted)] px-6 py-3">
            {children}
        </div>
    );
}
