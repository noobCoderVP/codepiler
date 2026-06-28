"use client";

import RepoUpload from "./RepoUpload";
import RepoTree from "./RepoTree";

export default function RepoExplorer() {
    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-[var(--border)] px-4 py-2">
                <RepoUpload />
            </div>

            <div className="flex-1 overflow-auto p-3">
                <RepoTree />
            </div>
        </div>
    );
}
