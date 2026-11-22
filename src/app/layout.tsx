import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const baseUrl = new URL("https://codepiler.in");

export const metadata: Metadata = {
    metadataBase: baseUrl,

    title: {
        default: "CodePiler — Ask AI About Your Code With Only the Files That Matter",
        template: "%s | CodePiler"
    },

    description:
        "Drop in your project, pick only the files your question is about, and copy one clean prompt into ChatGPT, Claude, or Gemini. Free, open source, and 100% in your browser.",

    applicationName: "CodePiler",

    keywords: [
        "repository to AI prompt",
        "codebase context builder",
        "AI context for code review",
        "reduce LLM token costs",
        "AI prompt builder for developers",
        "ChatGPT code context",
        "Claude codebase prompt",
        "Gemini repository context",
        "reduce AI API costs",
        "LLM context window optimizer",
        "open source AI developer tool",
        "code prompt generator",
        "AI-ready repository export",
        "token budget for LLM",
        "system prompt for code review",
        "AI agent context preparation",
        "repository RAG context",
        "codebase to prompt converter",
        "developer AI tooling",
        "prompt context builder"
    ],

    authors: [{ name: "CodePiler" }],
    creator: "CodePiler",
    publisher: "CodePiler",

    alternates: {
        canonical: "/"
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
        title: "CodePiler — Ask AI About Your Code With Only the Files That Matter",
        description:
            "Select the exact files that matter, set a model token budget, wrap with a system prompt and task, then export to ChatGPT, Claude, or Gemini. Free, open source, runs entirely in your browser.",
        url: "/",
        siteName: "CodePiler",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "CodePiler — repository to AI prompt context builder"
            }
        ],
        locale: "en_US",
        type: "website"
    },

    twitter: {
        card: "summary_large_image",
        title: "CodePiler — Ask AI About Your Code With Only the Files That Matter",
        description:
            "Select files, set a token budget, add a system prompt and task, then export to Claude, ChatGPT, or Gemini. Free, open source, 100% in-browser.",
        images: ["/og-image.png"]
    },

    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
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

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            name: "CodePiler",
            alternateName: ["Codepiler", "CodePiler AI", "Code Piler"],
            url: "https://codepiler.in",
            description:
                "CodePiler converts any repository into focused AI prompt context. Select files, set a token budget, wrap with a system prompt and task, then export to ChatGPT, Claude, or Gemini.",
            potentialAction: {
                "@type": "SearchAction",
                target: "https://codepiler.in/app",
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@type": "SoftwareApplication",
            name: "CodePiler",
            applicationCategory: "DeveloperApplication",
            applicationSubCategory: "AI Developer Tool",
            operatingSystem: "Web",
            url: "https://codepiler.in",
            description:
                "A free, open-source, browser-based tool that turns Git repositories into structured AI prompt context. Upload a repo, select relevant files with inline token counts, add a system prompt and task from expert presets, set a model token budget, and export to Text, JSON, XML, or Markdown — all without sending any files to a server.",
            featureList: [
                "Upload folder or ZIP repository",
                "Interactive repository file tree",
                "Per-file and per-folder inline token counts",
                "Selective file inclusion with checkboxes",
                "Select All / Clear All tree controls",
                "Expand All / Collapse All folder controls",
                "File preview without auto-selection",
                "Token budget with 18 model presets (Claude Opus 5.5, GPT-6.2, Gemini 4, Llama 4, and more)",
                "Prompt wrapper with system prompt and task",
                "12 language-specific system prompt presets (JS, Python, Go, Rust, Java, Swift, Kotlin, and more)",
                "18 task presets (code review, security audit, refactor, tests, performance, and more)",
                "File type filter by extension",
                "Token and size manager for bulk selection",
                "Selected files panel with per-file token cost",
                "Export as Text, JSON, XML, or Markdown",
                "Copy to clipboard or download",
                "Saved sessions with localStorage restore",
                "100% local-first — no files leave the browser"
            ],
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
            },
            isAccessibleForFree: true,
            license: "https://opensource.org/licenses/MIT"
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "What is CodePiler?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "CodePiler is a free, open-source browser tool that converts any Git repository into focused AI prompt context. You upload a repo, select the files that matter, optionally add a system prompt and task, and export a structured prompt ready to paste into ChatGPT, Claude, Gemini, or any other AI model."
                    }
                },
                {
                    "@type": "Question",
                    name: "Does CodePiler send my code to a server?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "No. CodePiler is 100% client-side. Your repository files are processed entirely in your browser using standard browser file APIs. Nothing is uploaded to any server."
                    }
                },
                {
                    "@type": "Question",
                    name: "How does CodePiler reduce AI API costs?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "By letting you select only the files relevant to your task, CodePiler can reduce prompt size by 80–95% compared to sending an entire repository. A 300-file project might be 500K tokens; a focused 20-file selection is typically 30–50K tokens — a 10–15× cost reduction per prompt call."
                    }
                },
                {
                    "@type": "Question",
                    name: "Which AI models does CodePiler support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "CodePiler exports plain text, JSON, XML, and Markdown that work with any AI model. It includes token budget presets for 18 current models including Claude Opus 5.5 (1M), Claude Sonnet 5.5 (1M), GPT-6.2 Astra (1.05M), Gemini 4 Neon (1M), Llama 4 Scout (10M), DeepSeek V4, Qwen 3.5, and more."
                    }
                },
                {
                    "@type": "Question",
                    name: "What is the prompt wrapper feature?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "The prompt wrapper lets you prepend a system prompt and append a task to your exported code context. CodePiler ships with 12 expert language presets (JavaScript, Python, Go, Rust, Java, Swift, and more) and 18 task presets (code review, security audit, write tests, refactor, performance audit, and more), each hundreds of words long with detailed technical instructions."
                    }
                }
            ]
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
