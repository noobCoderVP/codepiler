import ignore from "ignore";
import { RepoFile } from "@/types/repo";

function getCommonRoot(files: RepoFile[]) {
    const first = files[0]?.path.split("/")[0];

    if (!first) return null;

    const shared = files.every((file) => file.path.startsWith(`${first}/`));
    return shared ? first : null;
}

export function filterGitignore(files: RepoFile[]) {
    const ig = ignore();

    // Uploaded paths are prefixed with the repository folder name ("repo/src/..."),
    // so the root .gitignore lives at "repo/.gitignore" and its rules are relative to "repo/".
    const root = getCommonRoot(files);
    const prefix = root ? `${root}/` : "";
    const gitignore = files.find((f) => f.path === `${prefix}.gitignore`);

    if (gitignore) {
        ig.add(gitignore.content);
    }

    // also ignore common directories
    ig.add(["node_modules", ".git", ".next", "dist", "build"]);

    return files.filter((file) => !ig.ignores(file.path.slice(prefix.length)));
}
