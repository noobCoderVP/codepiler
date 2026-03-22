import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://codepiler.in";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1
        },
        {
            url: `${baseUrl}/app`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9
        },
        {
            url: `${baseUrl}/docs`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7
        },
        {
            url: `${baseUrl}/docs/uploading`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.65
        },
        {
            url: `${baseUrl}/docs/viewer`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.65
        },
        {
            url: `${baseUrl}/docs/examples`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6
        }
    ];
}
