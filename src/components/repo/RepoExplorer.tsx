"use client"

import RepoUpload from "./RepoUpload"
import RepoTree from "./RepoTree"

export default function RepoExplorer() {
    return (
        <div className="flex h-full flex-col">
            {/* Upload */}
            <div className="border-b border-border px-4 py-3">
                <RepoUpload />
            </div>

            {/* Tree */}
            <div className="flex-1 overflow-auto p-3">
                <RepoTree />
            </div>
        </div>
    )
}
