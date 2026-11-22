export const faqs = [
    {
        q: "Are my files uploaded anywhere?",
        a: "No. CodePiler reads your folder or ZIP in the browser. There is no backend, and nothing leaves your machine until you paste the prompt into an AI yourself."
    },
    {
        q: "What gets skipped when I import a project?",
        a: "Dependency and build folders (node_modules, dist, .next, target…), anything in your .gitignore, binaries such as images and archives, and files over 200 KB."
    },
    {
        q: "Which AI tools does it work with?",
        a: "Any of them. The output is plain text (or Markdown, XML or JSON), so you can paste it into ChatGPT, Claude, Gemini or a local model, or feed it to your own scripts."
    },
    {
        q: "Why not just paste the whole repo?",
        a: "Large prompts cost more, hit context limits, and bury your question in unrelated code. Sending only the relevant files usually gets a sharper answer."
    },
    {
        q: "Is it free?",
        a: "Yes. CodePiler is free and open source, with no account and no usage limits."
    }
];

export default function FAQSection() {
    return (
        <section id="faq" className="scroll-mt-20 px-6 py-16">
            <div className="mx-auto max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    FAQ
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                    Questions developers ask first
                </h2>

                <div className="mt-8 divide-y divide-[var(--border)] rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
                    {faqs.map((item) => (
                        <details key={item.q} className="group px-6 py-5">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--text-primary)]">
                                {item.q}
                                <span className="text-[var(--text-secondary)] transition group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                {item.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
