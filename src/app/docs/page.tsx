import type { Metadata } from "next";
import DocsArticle from "@/components/docs/DocsArticle";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getDocPage } from "@/lib/docs-content";
import { pageMetadata } from "@/lib/seo";

const page = getDocPage();

export const metadata: Metadata = pageMetadata({
    title: "Docs: Getting Started",
    description:
        "Learn how to use CodePiler: import a project, pick only the files your question is about, and copy one clean prompt into any AI.",
    path: "/docs"
});

export default function DocsIndexPage() {
    if (!page) return null;

    return (
        <div className="min-w-0">
            <Breadcrumbs
                items={[
                    { name: "Home", href: "/" },
                    { name: "Docs", href: "/docs" }
                ]}
            />
            <DocsArticle page={page} />
        </div>
    );
}
