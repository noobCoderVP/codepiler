"use client";

import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="h-screen"
        >
            <MainLayout />
        </motion.div>
    );
}
