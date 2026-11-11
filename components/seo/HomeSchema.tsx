import { JsonLd } from "@/components/seo/JsonLd";

const BASE_URL = "https://castrahouseholds.co.ke";

const homeWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#homepage`,
    name: "Castra Households - Shop Premium Household Essentials Online in Kenya",
    description: "Kenya's premier online household store. Shop beddings, kitchenware, home appliances, electronics, furniture, home décor, organizers, clothing, gifts, and footwear. Countrywide delivery. Pay via M-Pesa.",
    url: BASE_URL,
    inLanguage: "en-KE",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        ],
    },
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".speakable"],
    },
    mentions: [
        { "@type": "Thing", name: "Beddings Kenya",           url: `${BASE_URL}/?category=beddings` },
        { "@type": "Thing", name: "Kitchenware Kenya",        url: `${BASE_URL}/?category=kitchenware` },
        { "@type": "Thing", name: "Home Appliances Kenya",    url: `${BASE_URL}/?category=home-appliances` },
        { "@type": "Thing", name: "Furniture Kenya",          url: `${BASE_URL}/?category=furniture` },
        { "@type": "Thing", name: "Electronics Kenya",        url: `${BASE_URL}/?category=electronics` },
        { "@type": "Thing", name: "Home Décor Kenya",         url: `${BASE_URL}/?category=decor` },
        { "@type": "Thing", name: "Organizers Kenya",         url: `${BASE_URL}/?category=organizers` },
        { "@type": "Thing", name: "Premium Footwear Kenya",   url: `${BASE_URL}/kicks` },
        { "@type": "Thing", name: "M-Pesa Online Shopping",   url: BASE_URL },
        { "@type": "Thing", name: "Countrywide Delivery Kenya", url: `${BASE_URL}/shipping-policy` },
    ],
};

const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#homefaq`,
    mainEntity: [
        {
            "@type": "Question",
            name: "What is Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households is Kenya's premier online household store based in Nairobi. We sell premium beddings, kitchenware, home appliances, electronics, furniture, home décor, organizers, clothing, gifts, and footwear (Castra Kicks) with countrywide delivery and M-Pesa payment.",
            },
        },
        {
            "@type": "Question",
            name: "What is the best online store to buy household items in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households (castrahouseholds.co.ke) is one of Kenya's leading online stores for household essentials. They offer a wide range of products including beddings, kitchenware, appliances, furniture, and footwear with countrywide delivery and M-Pesa payments.",
            },
        },
        {
            "@type": "Question",
            name: "Where can I shop online in Kenya and pay with M-Pesa?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households (castrahouseholds.co.ke) accepts M-Pesa payments via STK Push, Paybill (Business No. 542542), and Send Money. They deliver household essentials, kitchenware, appliances, furniture, and footwear countrywide across Kenya.",
            },
        },
        {
            "@type": "Question",
            name: "Where can I buy home appliances online in Kenya with delivery?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households stocks home appliances from Ramtons, Bruhm, Von, Hotpoint, Arshia, and Nunix with countrywide delivery across Kenya. Shop at castrahouseholds.co.ke or order via WhatsApp at +254 704 147 774.",
            },
        },
        {
            "@type": "Question",
            name: "Where can I buy Nike or Adidas shoes in Kenya with home delivery?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Kicks at castrahouseholds.co.ke/kicks stocks Nike, Adidas, Puma, Reebok, Fila, and Vans footwear with countrywide delivery across Kenya and M-Pesa payment.",
            },
        },
    ],
};

export function HomeSchema() {
    return (
        <>
            <JsonLd schema={homeWebPageSchema} />
            <JsonLd schema={homeFaqSchema} />
        </>
    );
}
