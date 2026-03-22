"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
        >
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
