"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({
    children,
    align = "start",
    sideOffset = 6
}: {
    children: React.ReactNode;
    align?: "start" | "center" | "end";
    sideOffset?: number;
}) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                align={align}
                sideOffset={sideOffset}
                className="z-50 min-w-[14rem] overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_8px_32px_rgba(15,23,42,0.16)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
                <div className="max-h-72 overflow-y-auto p-1">{children}</div>
            </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
    );
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
    return (
        <DropdownMenuPrimitive.Label className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            {children}
        </DropdownMenuPrimitive.Label>
    );
}

export function DropdownMenuItem({
    children,
    onSelect,
    checked
}: {
    children: React.ReactNode;
    onSelect?: () => void;
    checked?: boolean;
}) {
    return (
        <DropdownMenuPrimitive.Item
            onSelect={onSelect}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2 py-2 text-xs text-[var(--text-primary)] outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-[var(--surface-muted)]"
        >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                {checked && <Check size={11} className="text-[var(--accent)]" />}
            </span>
            <span className={`flex-1 ${checked ? "font-semibold text-[var(--accent)]" : ""}`}>
                {children}
            </span>
        </DropdownMenuPrimitive.Item>
    );
}

/** Checkbox row for multi-select menus. The menu stays open so several items can be ticked. */
export function DropdownMenuCheckboxItem({
    children,
    checked,
    onCheckedChange,
    trailing
}: {
    children: React.ReactNode;
    checked: boolean;
    onCheckedChange: () => void;
    /** Right-aligned detail, such as a count. */
    trailing?: React.ReactNode;
}) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            checked={checked}
            onCheckedChange={onCheckedChange}
            onSelect={(e) => e.preventDefault()}
            className="relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none data-[highlighted]:bg-[var(--surface-muted)]"
        >
            <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border shadow-sm ${
                    checked
                        ? "border-[var(--accent)] bg-[var(--accent)]"
                        : "border-[var(--border-strong)] bg-[var(--control)]"
                }`}
            >
                {checked && <Check size={11} color="white" strokeWidth={3} />}
            </span>
            <span className={`flex-1 ${checked ? "font-semibold" : ""}`}>{children}</span>
            {trailing !== undefined && (
                <span className="text-[11px] tabular-nums text-[var(--text-secondary)]">
                    {trailing}
                </span>
            )}
        </DropdownMenuPrimitive.CheckboxItem>
    );
}

export function DropdownMenuSeparator() {
    return <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[var(--border)]" />;
}
