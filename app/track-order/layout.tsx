import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Track Your Order",
    description:
        "Track the status of your Castra Households order in real time. Enter your order reference or phone number to see where your delivery is.",
    alternates: { canonical: "/track-order" },
    openGraph: {
        title:       "Track Your Order | Castra Households",
        description: "Get real-time updates on your Castra order delivery status.",
        url:         "https://castrahouseholds.co.ke/track-order",
    },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
