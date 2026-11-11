import type { MetadataRoute } from "next";

const BASE_URL = "https://castrahouseholds.co.ke";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
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
                    "/account/dashboard",
                    "/account/dashboard/",
                    "/account/reset-password",
                    "/account/verify-email",
                    "/cart",
                    "/checkout",
                    "/wishlist",
                    "/api/",
                ],
            },

            // Google — standard + extended (used for Gemini/AI Overviews)
            { userAgent: "Googlebot",        allow: ["/"] },
            { userAgent: "Google-Extended",  allow: ["/"] },

            // Bing / Microsoft Copilot
            { userAgent: "Bingbot",          allow: ["/"] },
            { userAgent: "msnbot",           allow: ["/"] },

            // OpenAI — ChatGPT browsing + training
            { userAgent: "GPTBot",           allow: ["/"] },
            { userAgent: "ChatGPT-User",     allow: ["/"] },
            { userAgent: "OAI-SearchBot",    allow: ["/"] },

            // Anthropic — Claude
            { userAgent: "anthropic-ai",     allow: ["/"] },
            { userAgent: "Claude-Web",       allow: ["/"] },
            { userAgent: "ClaudeBot",        allow: ["/"] },

            // Perplexity
            { userAgent: "PerplexityBot",    allow: ["/"] },

            // Meta — Meta AI + Llama
            { userAgent: "Meta-ExternalAgent", allow: ["/"] },
            { userAgent: "FacebookBot",        allow: ["/"] },

            // xAI — Grok
            { userAgent: "Grok",             allow: ["/"] },

            // Apple — Siri / Apple Intelligence
            { userAgent: "Applebot",         allow: ["/"] },
            { userAgent: "Applebot-Extended", allow: ["/"] },

            // Common Crawl — feeds many open-source LLMs
            { userAgent: "CCBot",            allow: ["/"] },

            // You.com AI search
            { userAgent: "YouBot",           allow: ["/"] },

            // Cohere AI
            { userAgent: "cohere-ai",        allow: ["/"] },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
