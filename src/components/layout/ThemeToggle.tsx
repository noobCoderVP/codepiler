"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const noopSubscribe = () => () => {};

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    // the theme is only known on the client; render the default icon during SSR
    const mounted = useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false
    );

    const toggle = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
        >
            {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
