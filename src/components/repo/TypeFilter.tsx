"use client";

import { ChevronDown, FileCode2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const extLabel = (ext: string) => (ext ? `.${ext}` : "no extension");

function summary(selected: Set<string>) {
    if (selected.size === 0) return "All types";
    if (selected.size <= 2) return [...selected].map(extLabel).join(", ");
    return `${selected.size} types`;
}

/** Multi-select of file extensions, most common first, with how many files use each. */
export default function TypeFilter({
    typeCounts,
    selected,
    onChange
}: {
    typeCounts: [string, number][];
    selected: Set<string>;
    onChange: (next: Set<string>) => void;
}) {
    const toggle = (ext: string) => {
        const next = new Set(selected);
        if (next.has(ext)) next.delete(ext);
        else next.add(ext);
        onChange(next);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="btn btn-secondary btn-sm min-w-0 flex-1 justify-between"
                    data-active={selected.size > 0}
                    title="Show only some file types"
                >
                    <span className="flex min-w-0 items-center gap-1.5">
                        <FileCode2 size={13} className="shrink-0" />
                        <span className="truncate">{summary(selected)}</span>
                    </span>
                    <ChevronDown size={12} className="shrink-0 opacity-70" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>File types</DropdownMenuLabel>
                <DropdownMenuItem
                    checked={selected.size === 0}
                    onSelect={() => onChange(new Set())}
                >
                    All types
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {typeCounts.map(([ext, count]) => (
                    <DropdownMenuCheckboxItem
                        key={ext}
                        checked={selected.has(ext)}
                        onCheckedChange={() => toggle(ext)}
                        trailing={count}
                    >
                        {extLabel(ext)}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
