"use client"
type Props = {
    repoName: string | null
}

export default function ViewerHeader({ repoName }: Props) {
    return (
        <div className="border-b border-border px-6 py-4">
            <div className="text-xl font-semibold tracking-tight text-(--text-primary)">
                One File Viewer
            </div>

            {repoName && (
                <div className="text-sm text-(--text-secondary) mt-1">Repository: {repoName}</div>
            )}
        </div>
    )
}
