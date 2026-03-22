import type { Metadata } from "next";
import DocsArticle from "@/components/docs/DocsArticle";
import { getDocPage } from "@/lib/docs-content";

const page = getDocPage();

export const metadata: Metadata = {
    title: "Docs",
    description:
        "Documentation for CodePiler, the repository-to-prompt tool for building cleaner AI context from real project files."
};

export default function DocsIndexPage() {
    if (!page) return null;

    return <DocsArticle page={page} />;
}
