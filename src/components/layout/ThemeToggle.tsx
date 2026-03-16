"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const toggle = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button onClick={toggle} className="p-2 rounded-md hover:bg-muted transition">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}
