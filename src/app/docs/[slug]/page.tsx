import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsArticle from "@/components/docs/DocsArticle";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import { docsPages, getDocPage } from "@/lib/docs-content";
import { pageMetadata } from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return docsPages.filter((page) => page.slug).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getDocPage(slug);

    if (!page) {
        return {};
    }

    return pageMetadata({
        title: page.title,
        description: page.description,
        path: `/docs/${page.slug}`,
        type: "article"
    });
}

export default async function DocSlugPage({ params }: Props) {
    const { slug } = await params;
    const page = getDocPage(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="min-w-0">
            <Breadcrumbs
                items={[
                    { name: "Home", href: "/" },
                    { name: "Docs", href: "/docs" },
                    { name: page.title, href: `/docs/${page.slug}` }
                ]}
            />
            <DocsArticle page={page} />
        </div>
    );
}
