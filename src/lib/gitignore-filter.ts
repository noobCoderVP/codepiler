import ignore from "ignore";
import { RepoFile } from "@/types/repo";

export function filterGitignore(files: RepoFile[]) {
    const ig = ignore();

    const gitignore = files.find((f) => f.path === ".gitignore");

    if (gitignore) {
        ig.add(gitignore.content);
    }

    // also ignore common directories
    ig.add(["node_modules", ".git", ".next", "dist", "build"]);

    return files.filter((file) => !ig.ignores(file.path));
}
