import { MetadataRoute } from "next";
import { docsPages } from "@/lib/docs-content";
import { guides } from "@/lib/guides-content";
import { SYSTEM_PRESETS, TASK_PRESETS } from "@/lib/prompt-presets";
import { absoluteUrl } from "@/lib/seo";

// No lastModified: a date that changes on every build is ignored by search engines,
// and none of these pages track a real edit date.
export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        "/",
        "/app",
        ...docsPages.map((page) => (page.slug ? `/docs/${page.slug}` : "/docs")),
        "/guides",
        ...guides.map((guide) => `/guides/${guide.slug}`),
        "/prompts",
        ...[...TASK_PRESETS, ...SYSTEM_PRESETS].map((preset) => `/prompts/${preset.slug}`)
    ];

    return paths.map((path) => ({ url: absoluteUrl(path) }));
}
