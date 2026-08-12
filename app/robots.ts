import type { MetadataRoute } from "next";

const BASE_URL = "https://castrahouseholds.co.ke";

// robots.txt — served at /robots.txt
// Allows all crawlers on public pages.
// Blocks crawlers on authenticated/admin routes, checkout, and API paths
// since those have no SEO value and should not be indexed.

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // All crawlers
                userAgent: "*",
                allow: [
                    "/",
                    "/kicks",
                    "/faq",
                    "/about",
                    "/shipping-policy",
                    "/returns",
                    "/terms",
                    "/privacy",
                    "/track-order",
                    "/account",
                ],
                disallow: [
                    "/account/dashboard",       // authenticated — no indexing
                    "/account/dashboard/",
                    "/account/reset-password",  // token-gated
                    "/account/verify-email",    // token-gated
                    "/cart",                    // session-specific
                    "/checkout",                // session-specific
                    "/wishlist",                // authenticated
                    "/api/",                    // backend API proxy
                ],
            },
            {
                // Block GPTBot (OpenAI) and similar AI scrapers from training data
                userAgent: "GPTBot",
                disallow: ["/"],
            },
            {
                userAgent: "ChatGPT-User",
                disallow: ["/"],
            },
            {
                userAgent: "CCBot",
                disallow: ["/"],
            },
            {
                userAgent: "anthropic-ai",
                disallow: ["/"],
            },
            {
                userAgent: "Claude-Web",
                disallow: ["/"],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
