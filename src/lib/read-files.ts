const YIELD_EVERY = 20;

async function yieldToBrowser() {
    await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0);
    });
}

export async function readFiles(files: File[]) {
    const result = [];

    for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const path =
            (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name;
        const content = await file.text();

        result.push({
            path,
            content,
            size: file.size
        });

        if ((index + 1) % YIELD_EVERY === 0) {
            await yieldToBrowser();
        }
    }

    return result;
}
