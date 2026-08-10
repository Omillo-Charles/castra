// JsonLd
// A thin server component that injects a JSON-LD <script> block into the
// document <head>. Pass any valid Schema.org graph object as `schema`.
// Usage:
//   <JsonLd schema={{ "@context": "https://schema.org", "@type": "Organization", ... }} />

export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // suppressHydrationWarning is needed because Next.js server-renders
            // this as a string and React would otherwise warn about a mismatch
            // when it reconciles on the client.
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
