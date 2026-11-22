"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/marketing/HeroSection";
import WorkflowSection from "@/components/marketing/WorkflowSection";
import FeatureSection from "@/components/marketing/FeatureSection";
import FAQSection from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <Header />

            <main className="flex-1">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <HeroSection />
                    <WorkflowSection />
                    <FeatureSection />
                    <FAQSection />
                    <CTASection />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
