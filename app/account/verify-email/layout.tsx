import type { Metadata } from "next";

// Token-gated email verification page — no SEO value; block crawlers.
export const metadata: Metadata = {
    title: "Verify Email",
    robots: { index: false, follow: false },
};

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
