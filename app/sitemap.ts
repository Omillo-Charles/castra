import type { MetadataRoute } from "next";

const BASE_URL = "https://castrahouseholds.co.ke";

// Dynamic sitemap — served at /sitemap.xml
// Only public, indexable pages are listed here. Session-specific pages
// (cart, wishlist, checkout) and token-gated pages (reset-password,
// verify-email, dashboard) are excluded — they have no SEO value and
// would waste crawl budget.
// Priority guide:
//   1.0 — homepage (most important)
//   0.9 — primary shopping pages
//   0.8 — account login + tracking (high user intent)
//   0.6 — informational / support pages
//   0.4 — legal pages (low change frequency)

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        // Core shopping pages
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/kicks`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },

        // Account (sign-in / register — public landing)
        {
            url: `${BASE_URL}/account`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },

        // Order tracking
        {
            url: `${BASE_URL}/track-order`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },

        // Informational / support pages
        {
            url: `${BASE_URL}/faq`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/shipping-policy`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/returns`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },

        // Legal
        {
            url: `${BASE_URL}/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.4,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.4,
        },
    ];
}
