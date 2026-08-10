import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Castra Kicks — Premium Footwear in Kenya",
    description:
        "Discover Castra Kicks — curated premium footwear for every step. Shop the latest styles with countrywide delivery across Kenya.",
    alternates: {
        canonical: "/kicks",
    },
    openGraph: {
        title:       "Castra Kicks — Premium Footwear in Kenya",
        description: "Curated premium footwear for every step. Countrywide delivery across Kenya.",
        url:         "https://castrahouseholds.co.ke/kicks",
    },
};

export default function KicksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
