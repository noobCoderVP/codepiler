import type { Metadata } from "next";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import LinkCard from "@/components/content/LinkCard";
import OpenAppCallout from "@/components/content/OpenAppCallout";
import { guides } from "@/lib/guides-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Guides: Asking AI About Your Code",
    description:
        "Practical guides for getting better answers from ChatGPT, Claude and Gemini about your code: sharing a codebase, cutting token costs, debugging, code review, tests and more.",
    path: "/guides"
});

export default function GuidesIndexPage() {
    return (
        <>
            <Breadcrumbs
                items={[
                    { name: "Home", href: "/" },
                    { name: "Guides", href: "/guides" }
                ]}
            />

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Guides
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                Asking AI about your code
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                How to choose the right files and write questions that get useful answers from
                ChatGPT, Claude, Gemini or any other model.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
                {guides.map((guide) => (
                    <LinkCard
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        title={guide.title}
                        description={guide.description}
                    />
                ))}
            </div>

            <OpenAppCallout />
        </>
    );
}
