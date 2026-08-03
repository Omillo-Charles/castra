import type { NextConfig } from "next";

// Content Security Policy
// Resolve the API origin from the env so connect-src stays in sync with
// NEXT_PUBLIC_API_URL regardless of environment (dev, staging, production).

const apiUrl    = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500/api/v1";
const apiOrigin = new URL(apiUrl).origin; // e.g. "http://localhost:5500" or "https://api.castrahouseholds.co.ke"

// Content Security Policy 
// Applied to every response via HTTP headers (not a <meta> tag — headers are
// more reliable and can't be stripped by injected content).
// Directives are intentionally explicit — anything not listed is blocked.
// Update this list when new external resources are added to the site.

const CSP_DIRECTIVES = [
    // Only load documents from our own origin
    "default-src 'self'",

    // Scripts: self + Next.js inline scripts (required for hydration)
    // 'unsafe-inline' is needed for Next.js inline script tags;
    // nonce-based CSP would be the next hardening step.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",

    // Styles: self + Google Fonts + inline styles (Tailwind injects these)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

    // Fonts: self + Google Fonts CDN
    "font-src 'self' https://fonts.gstatic.com",

    // Images: self + Cloudinary (product images) + data URIs (Next.js image blur)
    "img-src 'self' data: blob: https://res.cloudinary.com",

    // Frames: Google Maps embed only
    "frame-src https://www.google.com",

    // Connections: self + backend API (dynamically resolved from NEXT_PUBLIC_API_URL)
    `connect-src 'self' ${apiOrigin} https://*.upstash.io https://*.neon.tech`,

    // Media: none expected
    "media-src 'none'",

    // Object/embed: none
    "object-src 'none'",

    // Base URI: lock to self to prevent base-tag injection
    "base-uri 'self'",

    // Form submissions: only to self (all forms POST to the same origin or API)
    "form-action 'self'",

    // Prevent this site from being embedded in iframes elsewhere (clickjacking)
    "frame-ancestors 'none'",

    // Upgrade insecure requests in production
    "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
    // Content Security Policy
    {
        key:   "Content-Security-Policy",
        value: CSP_DIRECTIVES,
    },
    // Prevent MIME type sniffing
    {
        key:   "X-Content-Type-Options",
        value: "nosniff",
    },
    // Clickjacking protection
    {
        key:   "X-Frame-Options",
        value: "DENY",
    },
    // Referrer leakage control 
    {
        key:   "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    // Force HTTPS (HSTS)
    // 1 year max-age; includeSubDomains; preload-eligible
    {
        key:   "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    // Permissions Policy — disable unused browser features 
    {
        key:   "Permissions-Policy",
        value: [
            "camera=()",
            "microphone=()",
            "geolocation=()",
            "payment=()",
            "usb=()",
            "interest-cohort=()",   // disable FLoC
        ].join(", "),
    },
];

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                // Apply security headers to every route
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
