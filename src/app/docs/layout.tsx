import DocsSidebar from "@/components/docs/DocsSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Header />
            <main className="mx-auto max-w-7xl px-6 py-12">
                {/* breadcrumbs are rendered by each page so they match the page */}
                <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <DocsSidebar />
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
