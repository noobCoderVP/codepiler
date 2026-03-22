import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsArticle from "@/components/docs/DocsArticle";
import { docsPages, getDocPage } from "@/lib/docs-content";

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

    return {
        title: page.title,
        description: page.description
    };
}

export default async function DocSlugPage({ params }: Props) {
    const { slug } = await params;
    const page = getDocPage(slug);

    if (!page) {
        notFound();
    }

    return <DocsArticle page={page} />;
}
