import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import LinkCard from "@/components/content/LinkCard";
import OpenAppCallout from "@/components/content/OpenAppCallout";
import { SYSTEM_PRESETS, TASK_PRESETS } from "@/lib/prompt-presets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Free AI Coding Prompts for Code Review, Bugs and Tests",
    description:
        "Free, detailed prompts for ChatGPT, Claude and Gemini: 18 coding task prompts such as code review, security review and unit tests, and 12 language-specific system prompts.",
    path: "/prompts"
});

export default function PromptsIndexPage() {
    return (
        <>
            <Breadcrumbs
                items={[
                    { name: "Home", href: "/" },
                    { name: "Prompt library", href: "/prompts" }
                ]}
            />

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Prompt library
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                Prompts for asking AI about code
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                The same presets that ship in the CodePiler workspace. Task prompts say what you
                want done. System prompts set the AI&apos;s expertise for your language. Copy them
                into any AI chat, or use them in CodePiler with the files they should apply to.
            </p>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Task prompts</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {TASK_PRESETS.map((preset) => (
                        <LinkCard
                            key={preset.slug}
                            href={`/prompts/${preset.slug}`}
                            title={preset.label}
                            description={preset.description}
                        />
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    System prompts by language
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {SYSTEM_PRESETS.map((preset) => (
                        <LinkCard
                            key={preset.slug}
                            href={`/prompts/${preset.slug}`}
                            title={preset.label}
                            description={preset.description}
                        />
                    ))}
                </div>
            </section>

            <OpenAppCallout />
        </>
    );
}
