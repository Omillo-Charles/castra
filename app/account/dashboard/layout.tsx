import type { Metadata } from "next";

// Authenticated dashboard — private page, no indexing.
export const metadata: Metadata = {
    title: "My Account",
    robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
