import type { Metadata } from "next";
import DocsArticle from "@/components/docs/DocsArticle";
import { getDocPage } from "@/lib/docs-content";

const page = getDocPage();

export const metadata: Metadata = {
    title: "Docs",
    description:
        "Learn how to use CodePiler: import a project, pick only the files your question is about, and copy one clean prompt into any AI."
};

export default function DocsIndexPage() {
    if (!page) return null;

    return <DocsArticle page={page} />;
}
