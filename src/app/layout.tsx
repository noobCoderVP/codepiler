import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const baseUrl = new URL("https://codepiler.in");

export const metadata: Metadata = {
    metadataBase: baseUrl,
    title: {
        default: "CodePiler | Turn Repositories Into AI-Ready Prompt Context",
        template: "%s | CodePiler"
    },
    description:
        "CodePiler helps developers upload a repository, search the project tree, select the right files, and export clean prompt-ready context for ChatGPT, Claude, Gemini, and other AI tools.",
    applicationName: "CodePiler",
    keywords: [
        "repository to prompt",
        "codebase context builder",
        "AI-ready code context",
        "prompt builder for codebase",
        "LLM repository viewer",
        "ChatGPT code context",
        "Claude code context",
        "developer AI tooling",
        "repository prompt generator"
    ],
    authors: [{ name: "CodePiler" }],
    creator: "CodePiler",
    publisher: "CodePiler",
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
            "max-snippet": -1,
            "max-video-preview": -1
        }
    },
    openGraph: {
        title: "CodePiler | Turn Repositories Into AI-Ready Prompt Context",
        description:
            "Upload a repository, search the tree, choose the files that matter, and export structured prompt context for AI tools.",
        url: "https://codepiler.in",
        siteName: "CodePiler",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "CodePiler repository to prompt workflow preview"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "CodePiler | Repository To Prompt Context",
        description:
            "Build cleaner prompt context from real repositories with file selection, format switching, and token awareness.",
        images: ["/og-image.png"]
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/favicon.svg", type: "image/svg+xml" }
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

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            name: "CodePiler",
            alternateName: ["Codepiler", "CodePiler AI"],
            url: "https://codepiler.in",
            description:
                "CodePiler converts repositories into structured prompt context for AI-assisted development workflows."
        },
        {
            "@type": "SoftwareApplication",
            name: "CodePiler",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            url: "https://codepiler.in",
            description:
                "A browser-based repository explorer and prompt builder for turning source code into AI-ready context.",
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
            }
        }
    ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased">
                <Script
                    id="codepiler-structured-data"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
