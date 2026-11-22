import Link from "next/link";

export default function OpenAppCallout({
    title = "Try it on your own project",
    text = "Drop in a folder or .zip, tick the files your question is about, and copy one prompt. Free, no account, and your files never leave your browser."
}: {
    title?: string;
    text?: string;
}) {
    return (
        <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,var(--surface),var(--surface-muted))] px-8 py-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                {title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                {text}
            </p>
            <Link
                href="/app"
                className="mt-6 inline-block rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
            >
                Open CodePiler
            </Link>
        </section>
    );
}
