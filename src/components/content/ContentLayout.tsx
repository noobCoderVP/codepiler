import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/** Page shell for the guides and prompt library. */
export default function ContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <Header />
            <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">{children}</main>
            <Footer />
        </div>
    );
}
