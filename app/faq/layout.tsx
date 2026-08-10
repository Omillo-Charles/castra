import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ — Frequently Asked Questions",
    description:
        "Got questions? Find answers about ordering, delivery, payments, and returns at Castra Households.",
    alternates: { canonical: "/faq" },
    openGraph: {
        title:       "FAQ | Castra Households",
        description: "Find answers about ordering, delivery, payments, and returns.",
        url:         "https://castrahouseholds.co.ke/faq",
    },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
