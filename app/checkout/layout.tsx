import type { Metadata } from "next";

// Checkout is session-specific — no SEO value; block all crawlers.
export const metadata: Metadata = {
    title: "Checkout",
    robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
