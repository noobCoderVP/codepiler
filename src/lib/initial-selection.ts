import { RepoFile } from "@/types/repo";

const INITIAL_FILE_LIMIT = 140;
const INITIAL_CHAR_BUDGET = 220_000;

function scoreInitialSelection(path: string) {
    const lower = path.toLowerCase();

    if (lower.endsWith("readme.md")) return 120;
    if (lower.includes("/src/")) return 100;
    if (lower.includes("/app/")) return 95;
    if (lower.includes("/components/")) return 92;
    if (lower.endsWith("package.json")) return 90;
    if (lower.endsWith("tsconfig.json") || lower.endsWith("next.config.ts")) return 88;
    if (lower.endsWith(".ts") || lower.endsWith(".tsx")) return 80;
    if (lower.endsWith(".js") || lower.endsWith(".jsx")) return 72;
    if (lower.endsWith(".md")) return 60;
    return 40;
}

export function getInitialSelection(files: RepoFile[]) {
    const ranked = [...files].sort((left, right) => {
        const scoreDiff = scoreInitialSelection(right.path) - scoreInitialSelection(left.path);

        if (scoreDiff !== 0) return scoreDiff;
        return left.path.localeCompare(right.path);
    });

    const selectedPaths: string[] = [];
    let totalChars = 0;

    for (const file of ranked) {
        if (selectedPaths.length >= INITIAL_FILE_LIMIT) break;
        if (totalChars + file.content.length > INITIAL_CHAR_BUDGET && selectedPaths.length > 0) {
            continue;
        }

        selectedPaths.push(file.path);
        totalChars += file.content.length;
    }

    return selectedPaths;
}
