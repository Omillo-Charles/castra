import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "FAQ - Frequently Asked Questions",
    description:
        "Find answers about ordering, delivery, M-Pesa payments, returns, and more at Castra Households. Kenya's premier online household store with countrywide delivery.",
    alternates: { canonical: "/faq" },
    openGraph: {
        title:       "FAQ | Castra Households",
        description: "Find answers about ordering, delivery, M-Pesa payments, returns, and more at Castra Households. Kenya's premier online household store.",
        url:         "https://castrahouseholds.co.ke/faq",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://castrahouseholds.co.ke/faq#faqpage",
    name: "Castra Households FAQ",
    description: "Answers to the most common questions about Castra Households — Kenya's premier online household store.",
    mainEntity: [
        {
            "@type": "Question",
            name: "How do I place an order at Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can place an order directly on our website at castrahouseholds.co.ke by adding items to your cart and proceeding to checkout, or by messaging us on WhatsApp at +254 704 147 774. We will confirm your order and arrange delivery.",
            },
        },
        {
            "@type": "Question",
            name: "What payment methods does Castra Households accept?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We accept M-Pesa STK Push (an instant prompt sent to your phone), M-Pesa Paybill (Business No. 542542, Account No. 03703439943450), and M-Pesa Send Money to 0704147774. The account name is Laureen Nyaboke Maina.",
            },
        },
        {
            "@type": "Question",
            name: "Does Castra Households deliver countrywide in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Castra Households delivers to all counties across Kenya including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Meru, Kitale, and all remote areas. Delivery charges vary by location and are communicated at checkout or via WhatsApp.",
            },
        },
        {
            "@type": "Question",
            name: "How long does delivery take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Standard delivery within Nairobi takes 1 to 2 business days. For other counties and towns across Kenya, delivery typically takes 3 to 5 business days after order confirmation.",
            },
        },
        {
            "@type": "Question",
            name: "Can I return an item purchased from Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "All sales on Castra Households are final. We do not accept returns or issue refunds on household products once delivered. Castra Kicks footwear are eligible for size exchanges only within 48 hours of delivery, provided the item is defective or the wrong size was delivered.",
            },
        },
        {
            "@type": "Question",
            name: "Are Castra Households products authentic?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Every product sold by Castra Households is 100% authentic and sourced directly from verified suppliers. We do not sell counterfeit or imitation goods.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need an account to order from Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No. You can place orders via WhatsApp at +254 704 147 774 without creating an account. However, registering on castrahouseholds.co.ke gives you order tracking, a personal wishlist, saved delivery addresses, and faster checkout.",
            },
        },
        {
            "@type": "Question",
            name: "What household brands does Castra Households stock?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households stocks home appliances and kitchenware from brands including Ramtons, Bruhm, Von, Hotpoint, Arshia, and Nunix among others. All brands are verified and authentic.",
            },
        },
        {
            "@type": "Question",
            name: "What footwear brands are available on Castra Kicks?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Kicks stocks premium footwear from Nike, Adidas, Puma, Reebok, Fila, and Vans. The collection includes sneakers, heels, sandals, flats, boots, and formal shoes for both men and women.",
            },
        },
        {
            "@type": "Question",
            name: "Where is Castra Households located?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households is based at Accra Towers B10, Nairobi, Kenya. We operate primarily as an online store and deliver countrywide across Kenya.",
            },
        },
        {
            "@type": "Question",
            name: "How do I track my order from Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Visit castrahouseholds.co.ke/track-order and enter your order reference number or phone number to check the status of your delivery.",
            },
        },
        {
            "@type": "Question",
            name: "What is the best online household store in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households is one of Kenya's leading online household stores, offering a wide range of premium beddings, kitchenware, home appliances, electronics, furniture, home décor, organizers, and footwear with countrywide delivery and M-Pesa payments.",
            },
        },
        {
            "@type": "Question",
            name: "Where can I buy beddings online in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households at castrahouseholds.co.ke offers a premium range of beddings including bedsheets, duvet covers, pillowcases, and blankets with delivery across all of Kenya.",
            },
        },
        {
            "@type": "Question",
            name: "Where can I buy furniture online in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households stocks a curated selection of furniture including sofas, beds, tables, and chairs. Shop at castrahouseholds.co.ke/furniture with countrywide delivery across Kenya.",
            },
        },
        {
            "@type": "Question",
            name: "Where can I buy home appliances online in Kenya?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households stocks home appliances from trusted brands like Ramtons, Bruhm, Von, and Hotpoint. Shop at castrahouseholds.co.ke with M-Pesa payment and countrywide delivery.",
            },
        },
        {
            "@type": "Question",
            name: "How do I contact Castra Households customer support?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can reach Castra Households customer support via WhatsApp at +254 704 147 774, by phone at +254 704 147 774, or by email at info@castrahouseholds.co.ke. Our team is available Monday to Saturday 8am to 8pm and Sunday 10am to 6pm.",
            },
        },
        {
            "@type": "Question",
            name: "Does Castra Households have a physical store?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Castra Households operates primarily as an online store based in Nairobi at Accra Towers B10. Orders are placed online at castrahouseholds.co.ke or via WhatsApp and delivered countrywide.",
            },
        },
        {
            "@type": "Question",
            name: "What is the delivery fee for Castra Households?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Delivery charges vary by location. Nairobi delivery fees differ from upcountry rates. The exact delivery fee is communicated at checkout or by our team via WhatsApp at +254 704 147 774 before you confirm your order.",
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
