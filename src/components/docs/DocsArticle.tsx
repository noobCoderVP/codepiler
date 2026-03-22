import { DocPage } from "@/lib/docs-content";
import { BookOpenText, CircleHelp, FolderOpen } from "lucide-react";

export default function DocsArticle({ page }: { page: DocPage }) {
    return (
        <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm md:p-10">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                <BookOpenText size={15} />
                CodePiler Docs
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                {page.title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
                {page.description}
            </p>

            <div className="mt-10 space-y-10">
                {page.sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                            {section.heading}
                        </h2>

                        <div className="mt-4 space-y-4 text-base leading-7 text-[var(--text-secondary)]">
                            {section.body.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {page.examples && page.examples.length > 0 && (
                <section className="mt-12 scroll-mt-24" id="examples">
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        <span className="inline-flex items-center gap-2">
                            <FolderOpen size={20} className="text-[var(--accent)]" />
                            Examples
                        </span>
                    </h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {page.examples.map((example) => (
                            <div
                                key={example.title}
                                className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-5"
                            >
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                    {example.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                    {example.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {page.faq && page.faq.length > 0 && (
                <section className="mt-12 scroll-mt-24" id="faq">
                    <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-[var(--text-primary)]">
                        <CircleHelp size={20} className="text-[var(--accent)]" />
                        FAQ
                    </h2>
                    <div className="mt-5 space-y-4">
                        {page.faq.map((item) => (
                            <div
                                key={item.question}
                                className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-5"
                            >
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                    {item.question}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
