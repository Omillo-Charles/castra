import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "About Us — Castra Households",
    description:
        "Learn about Castra Households — Kenya's premium online household store. We offer authentic beddings, kitchenware, electronics, furniture, décor, and footwear with countrywide delivery.",
    alternates: { canonical: "/about" },
    openGraph: {
        title:       "About Castra Households | Kenya's Premier Online Household Store",
        description: "Discover our story, mission, and why thousands of Kenyan homes trust Castra Households for premium home essentials.",
        url:         "https://castrahouseholds.co.ke/about",
    },
};

const BASE_URL = "https://castrahouseholds.co.ke";

// AboutPage JSON-LD schema
// Signals to Google that this page describes the business itself,
// which improves brand entity association and Knowledge Graph eligibility.
const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Castra Households",
    url: `${BASE_URL}/about`,
    description: "Castra Households is Kenya's premier online household store, offering premium home essentials with countrywide delivery.",
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: BASE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: `${BASE_URL}/about`,
            },
        ],
    },
    mainEntity: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Castra Households",
        url: BASE_URL,
        foundingDate: "2024",
        foundingLocation: {
            "@type": "Place",
            name: "Nairobi, Kenya",
        },
        areaServed: "Kenya",
        description: "Kenya's leading online household store offering premium beddings, kitchenware, electronics, furniture, décor, organizers, and footwear.",
        sameAs: [
            "https://www.instagram.com/_castrahouseholds",
            "https://www.facebook.com/castrahouseholds",
            "https://www.tiktok.com/@castrahouseholds",
        ],
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd schema={aboutPageSchema} />
            {children}
        </>
    );
}
