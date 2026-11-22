import type { Metadata } from "next";

export const SITE_URL = "https://codepiler.in";
export const SITE_NAME = "CodePiler";
export const OG_IMAGE = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "CodePiler: ask AI about your code with only the files that matter"
};

/**
 * Per-page metadata. Next merges metadata shallowly, so a page that sets openGraph or twitter
 * replaces the root layout's objects entirely; this rebuilds them in full for every page.
 */
export function pageMetadata({
    title,
    description,
    path,
    type = "website"
}: {
    title: string;
    description: string;
    path: string;
    type?: "website" | "article";
}): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url: path,
            siteName: SITE_NAME,
            type,
            locale: "en_US",
            images: [OG_IMAGE]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [OG_IMAGE.url]
        }
    };
}

export function absoluteUrl(path: string) {
    return new URL(path, SITE_URL).toString();
}

export const GITHUB_URL = "https://github.com/noobcodervp/codepiler";
