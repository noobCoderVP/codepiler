import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import JsonLd from "@/components/content/JsonLd";
import { GITHUB_URL, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

const defaultTitle = "CodePiler: Ask AI About Your Code With Only the Files That Matter";
const defaultDescription =
    "Drop in your project, pick only the files your question is about, and copy one clean prompt into ChatGPT, Claude, or Gemini. Free, open source, and 100% in your browser.";

// Pages set their own canonical, Open Graph and Twitter data via pageMetadata() in lib/seo.
export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),

    title: {
        default: defaultTitle,
        template: "%s | CodePiler"
    },
    description: defaultDescription,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: GITHUB_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,

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
        title: defaultTitle,
        description: defaultDescription,
        siteName: SITE_NAME,
        images: [OG_IMAGE],
        locale: "en_US",
        type: "website"
    },

    twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: defaultDescription,
        images: [OG_IMAGE.url]
    },

    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
    },

    manifest: "/site.webmanifest",
    category: "technology"
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
        { media: "(prefers-color-scheme: dark)", color: "#0b0f19" }
    ]
};

const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: defaultDescription
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased">
                <JsonLd data={websiteData} />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
