import Link from "next/link";
import DocsSidebar from "@/components/docs/DocsSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Header />
            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-8 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Link href="/" className="hover:text-[var(--text-primary)]">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-[var(--text-primary)]">Docs</span>
                </div>

                <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <DocsSidebar />
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
