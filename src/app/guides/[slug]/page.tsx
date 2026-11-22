import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsArticle from "@/components/docs/DocsArticle";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import JsonLd from "@/components/content/JsonLd";
import LinkCard from "@/components/content/LinkCard";
import OpenAppCallout from "@/components/content/OpenAppCallout";
import { getGuide, guides } from "@/lib/guides-content";
import { getPromptPreset } from "@/lib/prompt-presets";
import { SITE_NAME, absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuide(slug);

    if (!guide) return {};

    return pageMetadata({
        title: guide.title,
        description: guide.description,
        path: `/guides/${guide.slug}`,
        type: "article"
    });
}

export default async function GuidePage({ params }: Props) {
    const { slug } = await params;
    const guide = getGuide(slug);

    if (!guide) notFound();

    const path = `/guides/${guide.slug}`;
    const prompts = guide.prompts.map((p) => getPromptPreset(p)).filter((p) => p !== null);
    const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 4);

    return (
        <>
            <Breadcrumbs
                items={[
                    { name: "Home", href: "/" },
                    { name: "Guides", href: "/guides" },
                    { name: guide.shortTitle, href: path }
                ]}
            />
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    headline: guide.title,
                    description: guide.description,
                    url: absoluteUrl(path),
                    mainEntityOfPage: absoluteUrl(path),
                    author: { "@type": "Organization", name: SITE_NAME },
                    publisher: { "@type": "Organization", name: SITE_NAME }
                }}
            />

            <DocsArticle page={guide} eyebrow="CodePiler Guides" />

            {prompts.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        Prompts for this job
                    </h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {prompts.map(({ kind, preset }) => (
                            <LinkCard
                                key={preset.slug}
                                href={`/prompts/${preset.slug}`}
                                label={kind === "system" ? "System prompt" : "Task prompt"}
                                title={preset.label}
                                description={preset.description}
                            />
                        ))}
                    </div>
                </section>
            )}

            <OpenAppCallout />

            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">More guides</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {otherGuides.map((g) => (
                        <LinkCard
                            key={g.slug}
                            href={`/guides/${g.slug}`}
                            title={g.title}
                            description={g.description}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
