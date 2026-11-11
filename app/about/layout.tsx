import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

const BASE_URL = "https://castrahouseholds.co.ke";

export const metadata: Metadata = {
    title: "About Us - Castra Households",
    description:
        "Learn about Castra Households, Kenya's premier online household store. We offer authentic beddings, kitchenware, electronics, furniture, décor, and footwear with countrywide delivery and M-Pesa payments.",
    alternates: { canonical: "/about" },
    openGraph: {
        title:       "About Castra Households | Kenya's Premier Online Household Store",
        description: "Discover our story, mission, and why thousands of Kenyan homes trust Castra Households for premium home essentials.",
        url:         `${BASE_URL}/about`,
        images: [{ url: "/branding/og-image.png", width: 1200, height: 630, alt: "About Castra Households" }],
    },
};

const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about#webpage`,
    name: "About Castra Households - Kenya's Premier Online Household Store",
    url: `${BASE_URL}/about`,
    inLanguage: "en-KE",
    description: "Castra Households is Kenya's premier online household store, offering premium home essentials including beddings, kitchenware, appliances, electronics, furniture, décor, organizers, and footwear with countrywide delivery and M-Pesa payment.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home",     item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "About Us", item: `${BASE_URL}/about` },
        ],
    },
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".speakable"],
    },
    mainEntity: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Castra Households",
        alternateName: ["Castra", "Castra Kicks"],
        url: BASE_URL,
        foundingDate: "2024",
        foundingLocation: { "@type": "Place", name: "Nairobi, Kenya" },
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 1, maxValue: 50 },
        areaServed: { "@type": "Country", name: "Kenya" },
        description: "Kenya's leading online household store offering premium beddings, kitchenware, home appliances, electronics, furniture, home décor, organizers, clothing, gifts, and footwear (Castra Kicks) with countrywide delivery across all 47 counties of Kenya.",
        telephone: "+254704147774",
        email: "info@castrahouseholds.co.ke",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Accra Towers B10",
            addressLocality: "Nairobi",
            addressRegion: "Nairobi County",
            addressCountry: "KE",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+254704147774",
            contactType: "customer service",
            areaServed: "KE",
            availableLanguage: ["English", "Swahili"],
        },
        knowsAbout: [
            "Household essentials Kenya",
            "Beddings and linens",
            "Kitchenware Kenya",
            "Home appliances Kenya",
            "Furniture Kenya",
            "Home décor",
            "Premium footwear Kenya",
            "M-Pesa online shopping",
            "Countrywide delivery Kenya",
            "E-commerce Kenya",
        ],
        sameAs: [
            "https://www.instagram.com/_castrahouseholds",
            "https://www.facebook.com/castrahouseholds",
            "https://www.tiktok.com/@castrahouseholds",
            "https://www.instagram.com/castra_kicks",
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
