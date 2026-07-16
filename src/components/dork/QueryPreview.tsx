export default function QueryPreview() {
    return (
        <div>
            <h2 className="font-semibold mb-2">
                Generated Query
            </h2>
            <div className=" rounded-lg border bg-muted p-4 font-mono">
                site:example.com filetype:pdf
            </div>
        </div>
    )
}