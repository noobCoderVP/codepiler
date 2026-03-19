import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    metadataBase: new URL("https://codepiler.in"),

    title: {
        default: "Codepiler – Convert Codebase to Single File for LLM Context",
        template: "%s | Codepiler"
    },

    description:
        "Convert your entire repository into a single structured file for LLM context. Perfect for ChatGPT, Claude, and AI tools to understand full codebases without missing context.",

    applicationName: "Codepiler",

    keywords: [
        "codebase to single file",
        "LLM context builder",
        "combine repository files",
        "codebase viewer for AI",
        "ChatGPT code context",
        "Claude code context",
        "AI code understanding tool",
        "merge codebase into one file",
        "developer AI tools"
    ],

    authors: [{ name: "Codepiler" }],
    creator: "Codepiler",

    alternates: {
        canonical: "https://codepiler.in"
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },

    openGraph: {
        title: "Codepiler – Single File Codebase for LLM Context",
        description:
            "Turn your repository into a clean, structured single file for AI tools like ChatGPT and Claude.",
        url: "https://codepiler.in",
        siteName: "Codepiler",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Codepiler – Codebase to single file for LLM context"
            }
        ],
        type: "website"
    },

    twitter: {
        card: "summary_large_image",
        title: "Codepiler – Codebase to Single File",
        description: "Generate a structured single-file view of your repository for LLMs.",
        images: ["/og-image.png"]
    },

    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
        shortcut: ["/favicon.ico"]
    },

    manifest: "/site.webmanifest",

    category: "technology"
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0B0B0C"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
