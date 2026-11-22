import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/marketing/HeroSection";
import WorkflowSection from "@/components/marketing/WorkflowSection";
import FeatureSection from "@/components/marketing/FeatureSection";
import FAQSection, { faqs } from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import { GITHUB_URL, SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

const title = "CodePiler: Ask AI About Your Code With Only the Files That Matter";
const description =
    "Drop in your project, pick only the files your question is about, and copy one clean prompt into ChatGPT, Claude, or Gemini. Free, open source, and 100% in your browser.";

export const metadata: Metadata = {
    ...pageMetadata({ title, description, path: "/" }),
    title: { absolute: title }
};

// kept in sync with the visible page: features from FeatureSection, questions from FAQSection
const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            name: SITE_NAME,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            url: SITE_URL,
            description:
                "A free, open-source, browser-based tool for asking AI about your code. Import a folder or ZIP, select only the files your question is about, add a system prompt and task, and copy one prompt into ChatGPT, Claude, Gemini or any other model.",
            featureList: [
                "Import a project folder or ZIP in the browser",
                "Skips dependencies, build output, binaries and .gitignore matches",
                "Token count on every file and folder",
                "Tree view and By size view with search, type and token filters",
                "System prompt and task presets for 12 languages and 18 tasks",
                "Model context window budget",
                "Export as Text, Markdown, XML or JSON",
                "Saved sessions",
                "No upload: files never leave the browser"
            ],
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            isAccessibleForFree: true,
            license: "https://opensource.org/licenses/MIT",
            sameAs: [GITHUB_URL]
        },
        {
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a }
            }))
        }
    ]
};

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <JsonLd data={structuredData} />
            <Header />

            <main className="flex-1">
                <HeroSection />
                <WorkflowSection />
                <FeatureSection />
                <FAQSection />
                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
