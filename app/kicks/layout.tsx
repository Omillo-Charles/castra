import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

const BASE_URL = "https://castrahouseholds.co.ke";

export const metadata: Metadata = {
    title: "Castra Kicks - Premium Footwear in Kenya",
    description:
        "Shop premium footwear at Castra Kicks. Nike, Adidas, Puma, Reebok, Fila, and Vans sneakers, heels, sandals, flats, boots, and formal shoes. Countrywide delivery across Kenya. Pay via M-Pesa.",
    keywords: [
        "Castra Kicks",
        "buy Nike shoes Kenya",
        "buy Adidas shoes Kenya",
        "buy Puma shoes Kenya",
        "premium footwear Kenya",
        "sneakers Kenya online",
        "ladies heels Kenya",
        "men formal shoes Kenya",
        "boots Kenya online",
        "sandals Kenya",
        "shoes delivery Kenya",
        "M-Pesa shoes Kenya",
        "online shoe store Kenya",
        "Nairobi shoes online",
        "affordable Nike Kenya",
    ],
    alternates: { canonical: "/kicks" },
    openGraph: {
        title:       "Castra Kicks - Premium Footwear in Kenya",
        description: "Nike, Adidas, Puma, Reebok, Fila, Vans and more. Shop premium footwear online with countrywide delivery across Kenya. Pay via M-Pesa.",
        url:         `${BASE_URL}/kicks`,
        images: [{ url: "/branding/og-image.png", width: 1200, height: 630, alt: "Castra Kicks - Premium Footwear Kenya" }],
    },
};

const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/kicks#itemlist`,
    name: "Castra Kicks - Premium Footwear Collection Kenya",
    description: "Curated premium footwear including Nike, Adidas, Puma, Reebok, Fila, and Vans. Available online with countrywide delivery across Kenya. Pay via M-Pesa.",
    url: `${BASE_URL}/kicks`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
};

const kicksWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/kicks#webpage`,
    name: "Castra Kicks - Premium Footwear in Kenya",
    description: "Shop premium footwear at Castra Kicks. Nike, Adidas, Puma, Reebok, Fila, Vans sneakers, heels, sandals, flats, boots, and formal shoes with countrywide delivery across Kenya.",
    url: `${BASE_URL}/kicks`,
    inLanguage: "en-KE",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: {
        "@type": "Thing",
        name: "Premium Footwear Kenya",
        description: "Premium footwear brands available in Kenya including Nike, Adidas, Puma, Reebok, Fila, and Vans.",
    },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Castra Kicks", item: `${BASE_URL}/kicks` },
        ],
    },
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".speakable"],
    },
};

const kicksBrandListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/kicks#brands`,
    name: "Footwear Brands Available at Castra Kicks Kenya",
    description: "Premium footwear brands stocked by Castra Kicks with countrywide delivery across Kenya.",
    itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@type": "Brand", name: "Nike",   description: "Nike sneakers and footwear available at Castra Kicks Kenya" } },
        { "@type": "ListItem", position: 2, item: { "@type": "Brand", name: "Adidas", description: "Adidas sneakers and footwear available at Castra Kicks Kenya" } },
        { "@type": "ListItem", position: 3, item: { "@type": "Brand", name: "Puma",   description: "Puma footwear available at Castra Kicks Kenya" } },
        { "@type": "ListItem", position: 4, item: { "@type": "Brand", name: "Reebok", description: "Reebok footwear available at Castra Kicks Kenya" } },
        { "@type": "ListItem", position: 5, item: { "@type": "Brand", name: "Fila",   description: "Fila footwear available at Castra Kicks Kenya" } },
        { "@type": "ListItem", position: 6, item: { "@type": "Brand", name: "Vans",   description: "Vans footwear available at Castra Kicks Kenya" } },
    ],
};

const kicksFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/kicks#faq`,
    mainEntity: [
        {
            "@type": "Question",
            name: "Where can I buy Nike shoes online in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can buy Nike shoes online in Kenya at Castra Kicks (castrahouseholds.co.ke/kicks). We stock Nike sneakers and footwear with countrywide delivery across Kenya and M-Pesa payment.",
            },
        },
        {
            "@type": "Question",
            name: "Where can I buy Adidas shoes online in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Adidas shoes are available online in Kenya at Castra Kicks (castrahouseholds.co.ke/kicks) with countrywide delivery and M-Pesa payment options.",
            },
        },
        {
            "@type": "Question",
            name: "What shoe brands does Castra Kicks stock?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Kicks stocks Nike, Adidas, Puma, Reebok, Fila, and Vans. The collection includes sneakers, heels, sandals, flats, boots, and formal shoes for both men and women.",
            },
        },
        {
            "@type": "Question",
            name: "Does Castra Kicks deliver shoes countrywide in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Castra Kicks delivers footwear to all counties across Kenya. Contact us on WhatsApp at +254 704 147 774 for delivery quotes to your specific location.",
            },
        },
        {
            "@type": "Question",
            name: "Can I pay via M-Pesa for shoes at Castra Kicks?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Castra Kicks accepts M-Pesa STK Push, M-Pesa Paybill (Business No. 542542), and M-Pesa Send Money to 0704147774.",
            },
        },
    ],
};

export default function KicksLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd schema={itemListSchema} />
            <JsonLd schema={kicksWebPageSchema} />
            <JsonLd schema={kicksBrandListSchema} />
            <JsonLd schema={kicksFaqSchema} />
            {children}
        </>
    );
}
