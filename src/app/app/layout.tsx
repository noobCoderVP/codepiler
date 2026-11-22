import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Workspace: Build an AI Prompt From Your Code",
    description:
        "Open the CodePiler workspace: import a folder or ZIP, tick the files your question is about, add instructions, and copy one prompt for ChatGPT, Claude or Gemini. Runs in your browser.",
    path: "/app"
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return children;
}
