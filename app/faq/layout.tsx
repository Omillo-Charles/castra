import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "FAQ — Frequently Asked Questions",
    description:
        "Got questions? Find answers about ordering, delivery, payments, and returns at Castra Households — Kenya's premium online household store.",
    alternates: { canonical: "/faq" },
    openGraph: {
        title:       "FAQ | Castra Households",
        description: "Find answers about ordering, delivery, payments, and returns at Kenya's leading household store.",
        url:         "https://castrahouseholds.co.ke/faq",
    },
};

// FAQ Page JSON-LD schema
// Google uses this to render FAQ accordion rich results directly in SERPs,
// dramatically increasing click-through rate for support-related queries.
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How do I place an order at Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can place an order directly on our website by adding items to your cart and proceeding to checkout, or by messaging us on WhatsApp at +254 704 147 774.",
            },
        },
        {
            "@type": "Question",
            name: "What payment methods does Castra Households accept?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We accept M-Pesa STK Push. At checkout, enter your phone number and you will receive a payment prompt on your phone to complete the payment.",
            },
        },
        {
            "@type": "Question",
            name: "Does Castra Households deliver countrywide in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we deliver across Kenya — Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and all major towns and remote areas. Delivery timelines and charges vary by location.",
            },
        },
        {
            "@type": "Question",
            name: "How long does delivery take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Standard delivery within Nairobi takes 1–2 business days. For other counties and towns, delivery typically takes 3–5 business days after order confirmation.",
            },
        },
        {
            "@type": "Question",
            name: "Can I return an item purchased from Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "All sales on Castra Collection are final. We do not accept returns or issue refunds. Castra Kicks (footwear) are eligible for exchanges only within 48 hours of delivery if the item is defective or the wrong size was sent.",
            },
        },
        {
            "@type": "Question",
            name: "Are Castra Households products authentic?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Every product sold by Castra Households is 100% authentic and sourced from verified suppliers.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need an account to order from Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No, you can place orders via WhatsApp without creating an account. However, registering on our website gives you order tracking, a wishlist, and faster checkout.",
            },
        },
    ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd schema={faqSchema} />
            {children}
        </>
    );
}
