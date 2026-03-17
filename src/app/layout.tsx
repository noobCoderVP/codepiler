import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
    metadataBase: new URL("https://codepiler.dev"),

    title: {
        default: "Codepiler",
        template: "%s | Codepiler"
    },

    description:
        "Combine repository files into a single structured output. Turn scattered code into clean, usable context.",

    applicationName: "Codepiler",

    keywords: [
        "Codepiler",
        "code merge tool",
        "repository tools",
        "developer tools",
        "combine files",
        "codebase viewer"
    ],

    authors: [{ name: "Codepiler" }],
    creator: "Codepiler",

    openGraph: {
        title: "Codepiler",
        description: "Turn your codebase into one clean, structured output.",
        url: "https://codepiler.dev",
        siteName: "Codepiler",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Codepiler - Combine your codebase into one output"
            }
        ],
        locale: "en_US",
        type: "website"
    },

    twitter: {
        card: "summary_large_image",
        title: "Codepiler",
        description: "Combine repository files into a single structured output.",
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
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0B0B0C"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
