import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import LinkCard from "@/components/content/LinkCard";
import OpenAppCallout from "@/components/content/OpenAppCallout";
import CopyPromptButton from "@/components/content/CopyPromptButton";
import { guides } from "@/lib/guides-content";
import { SYSTEM_PRESETS, TASK_PRESETS, getPromptPreset } from "@/lib/prompt-presets";
import { pageMetadata } from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return [...SYSTEM_PRESETS, ...TASK_PRESETS].map((preset) => ({ slug: preset.slug }));
}

function pageTitle(kind: "system" | "task", label: string) {
    return kind === "system"
        ? `${label} System Prompt for AI Coding`
        : `${label} Prompt for ChatGPT, Claude and Gemini`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const found = getPromptPreset(slug);

    if (!found) return {};

    return pageMetadata({
        title: pageTitle(found.kind, found.preset.label),
        description: found.preset.description,
        path: `/prompts/${slug}`,
        type: "article"
    });
}

export default async function PromptPage({ params }: Props) {
    const { slug } = await params;
    const found = getPromptPreset(slug);

    if (!found) notFound();

    const { kind, preset } = found;
    const isSystem = kind === "system";
    // the next four presets in the list, wrapping around, so every preset gets linked from somewhere
    const list = isSystem ? SYSTEM_PRESETS : TASK_PRESETS;
    const index = list.findIndex((p) => p.slug === slug);
    const siblings = [1, 2, 3, 4].map((offset) => list[(index + offset) % list.length]);
    const relatedGuides = guides.filter((g) => g.prompts.includes(slug));

    return (
        <>
            <Breadcrumbs
                items={[
                    { name: "Home", href: "/" },
                    { name: "Prompt library", href: "/prompts" },
                    { name: preset.label, href: `/prompts/${slug}` }
                ]}
            />

            <article>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {isSystem ? "System prompt" : "Task prompt"}
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {pageTitle(kind, preset.label)}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
                    {preset.description}
                </p>

                <section className="mt-10">
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        How to use it
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-7 text-[var(--text-secondary)]">
                        {isSystem ? (
                            <p>
                                A system prompt goes before your code and tells the model what kind
                                of expert to be. Pair it with a task prompt, such as{" "}
                                <Link
                                    href="/prompts/code-review"
                                    className="text-[var(--accent)] hover:underline"
                                >
                                    Code review
                                </Link>{" "}
                                or{" "}
                                <Link
                                    href="/prompts/find-and-fix-bugs"
                                    className="text-[var(--accent)] hover:underline"
                                >
                                    Find and fix bugs
                                </Link>
                                , that says what you want done.
                            </p>
                        ) : (
                            <p>
                                A task prompt goes after your code and tells the model what to do
                                with it. Add a line or two about your situation, such as the
                                behavior you expect or what must not change, and pair it with a{" "}
                                <Link
                                    href="/prompts"
                                    className="text-[var(--accent)] hover:underline"
                                >
                                    system prompt for your language
                                </Link>
                                .
                            </p>
                        )}
                        <p>
                            The prompt only works as well as the code it is applied to. In{" "}
                            <Link href="/app" className="text-[var(--accent)] hover:underline">
                                CodePiler
                            </Link>
                            , import your project, tick only the files that matter, click “Add
                            instructions” and pick <strong>{preset.label}</strong> from the{" "}
                            {isSystem ? "language presets" : "task presets"}. Then copy one prompt
                            with your files and instructions together.
                        </p>
                    </div>
                </section>

                <section className="mt-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                            The prompt
                        </h2>
                        <CopyPromptButton text={preset.prompt} />
                    </div>
                    <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm leading-6 text-[var(--text-primary)]">
                        {preset.prompt}
                    </pre>
                </section>
            </article>

            <OpenAppCallout
                title="Use this prompt with your own code"
                text={`Import your project, select the files that matter and pick “${preset.label}” from the presets. Free, no account, and your files never leave your browser.`}
            />

            {relatedGuides.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        Related guides
                    </h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {relatedGuides.map((g) => (
                            <LinkCard
                                key={g.slug}
                                href={`/guides/${g.slug}`}
                                title={g.title}
                                description={g.description}
                            />
                        ))}
                    </div>
                </section>
            )}

            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    More {isSystem ? "system" : "task"} prompts
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {siblings.map((p) => (
                        <LinkCard
                            key={p.slug}
                            href={`/prompts/${p.slug}`}
                            title={p.label}
                            description={p.description}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
