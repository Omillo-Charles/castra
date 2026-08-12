import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Castra Kicks — Premium Footwear in Kenya",
    description:
        "Discover Castra Kicks — curated premium footwear for every step. Shop the latest styles with countrywide delivery across Kenya. Pay via M-Pesa.",
    alternates: {
        canonical: "/kicks",
    },
    openGraph: {
        title:       "Castra Kicks — Premium Footwear in Kenya",
        description: "Curated premium footwear for every step. Countrywide delivery across Kenya. Pay via M-Pesa.",
        url:         "https://castrahouseholds.co.ke/kicks",
    },
};

// ItemList JSON-LD schema
// Signals to Google that this is a product listing page, making it eligible
// for a product carousel / list rich result in SERPs for footwear queries.
const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Castra Kicks — Premium Footwear Collection",
    description: "Curated premium footwear available for purchase online with countrywide delivery across Kenya.",
    url: "https://castrahouseholds.co.ke/kicks",
    numberOfItems: 0, // dynamically populated — 0 signals dynamic list to crawlers
    itemListOrder: "https://schema.org/ItemListOrderAscending",
};

export default function KicksLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd schema={itemListSchema} />
            {children}
        </>
    );
}

