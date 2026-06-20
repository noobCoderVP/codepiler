"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export function SelectTrigger({
    children,
    className = "",
    title
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
}) {
    return (
        <SelectPrimitive.Trigger
            title={title}
            className={`flex items-center justify-between gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] outline-none transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] data-[state=open]:border-[var(--accent)] data-[state=open]:text-[var(--text-primary)] ${className}`}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDown size={12} className="shrink-0 opacity-60" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                position="popper"
                sideOffset={6}
                className="z-50 min-w-[10rem] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_32px_rgba(15,23,42,0.14)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
                <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1 text-[var(--text-secondary)]">
                    <ChevronUp size={12} />
                </SelectPrimitive.ScrollUpButton>

                <SelectPrimitive.Viewport className="max-h-60 p-1">
                    {children}
                </SelectPrimitive.Viewport>

                <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1 text-[var(--text-secondary)]">
                    <ChevronDown size={12} />
                </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

export function SelectLabel({ children }: { children: React.ReactNode }) {
    return (
        <SelectPrimitive.Label className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            {children}
        </SelectPrimitive.Label>
    );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
    return (
        <SelectPrimitive.Item
            value={value}
            className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-[var(--surface-muted)] data-[highlighted]:text-[var(--text-primary)] data-[state=checked]:font-semibold data-[state=checked]:text-[var(--accent)]"
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator className="absolute right-2">
                <Check size={11} />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
}

export function SelectSeparator() {
    return <SelectPrimitive.Separator className="my-1 h-px bg-[var(--border)]" />;
}
