export async function readFiles(files: File[]) {
    const result = []

    for (const file of files) {
        const path =
            (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name
        const content = await file.text()

        result.push({
            path,
            content,
            size: file.size
        })
    }

    return result
}
