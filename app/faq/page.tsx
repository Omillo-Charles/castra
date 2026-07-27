"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronRight, MessageCircle, Mail } from "lucide-react";

const WHATSAPP_NUMBER = "254704147774";

const FAQ_GROUPS = [
    {
        id: "orders",
        label: "Orders & Payments",
        faqs: [
            {
                q: "How do I place an order?",
                a: "You can place an order directly on our website by adding items to your cart and proceeding to checkout, or by messaging us on WhatsApp at +254 704 147 774. Our team will confirm availability and provide payment instructions.",
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept M-Pesa and Cash on Delivery (COD). For M-Pesa, you will receive the paybill or till number after your order is confirmed. COD is available for select areas - confirm with us before ordering.",
            },
            {
                q: "Can I modify or cancel my order?",
                a: "Yes, but only before your order has been dispatched. Contact us immediately via WhatsApp with your order details and we will do our best to accommodate the change. Once an order is out for delivery, it cannot be modified or cancelled.",
            },
            {
                q: "Will I receive an order confirmation?",
                a: "Yes. Once your order is confirmed and payment is received, you will receive a confirmation via WhatsApp or SMS with your order summary and estimated delivery timeline.",
            },
        ],
    },
    {
        id: "delivery",
        label: "Delivery",
        faqs: [
            {
                q: "Do you deliver countrywide?",
                a: "Yes, we deliver across Kenya - Nairobi, major towns, and remote areas. Delivery timelines and charges vary by location. Contact us for a quote to your specific area.",
            },
            {
                q: "How long does delivery take?",
                a: "Standard delivery within Nairobi takes 1–2 business days. For other counties and towns, delivery typically takes 3–5 business days after order confirmation, depending on your location.",
            },
            {
                q: "How much does delivery cost?",
                a: "Delivery fees depend on your location. Within Nairobi, delivery starts from KSh 200. Upcountry delivery is charged based on weight and destination. You will be informed of the exact fee before confirming your order.",
            },
            {
                q: "What happens if no one is available to receive my order?",
                a: "Our courier will attempt to contact you before delivery. If no one is available, we will arrange a re-delivery - additional charges may apply for a second delivery attempt. Ensure your phone number and delivery address are accurate when placing your order.",
            },
        ],
    },
    {
        id: "returns",
        label: "Returns & Exchanges",
        faqs: [
            {
                q: "Can I return an item from Castra Collection?",
                a: "No. All sales on Castra Collection - including household essentials, kitchenware, bedding, decor, electronics, furniture, and organizers - are final. We do not accept returns or issue refunds. We encourage you to ask any questions about a product before purchasing.",
            },
            {
                q: "Can I exchange footwear from Castra Kicks?",
                a: "Yes. Castra Kicks (footwear) are eligible for exchanges only - no refunds. If you received a wrong size due to our error, or the item is defective, contact us within 48 hours of delivery with photos. The item must be unworn and in its original packaging.",
            },
            {
                q: "What if my order arrived damaged or incorrect?",
                a: "Contact us immediately on WhatsApp (+254 704 147 774) with photos of the damaged or incorrect item. We will assess the situation and, where we are at fault, arrange a replacement or exchange at no extra cost.",
            },
        ],
    },
    {
        id: "products",
        label: "Products",
        faqs: [
            {
                q: "Are your products authentic?",
                a: "Yes. Every product sold by Castra Households is 100% authentic and sourced from verified suppliers. We stand behind the quality of everything in our catalogue.",
            },
            {
                q: "How can I find out if an item is in stock?",
                a: "Stock availability is shown on each product listing. If an item shows as out of stock, you can message us on WhatsApp to ask about restocking timelines or to be notified when it becomes available.",
            },
            {
                q: "What is Castra Kicks?",
                a: "Castra Kicks is our premium footwear sub-brand, offering a curated selection of quality shoes. Unlike our household collection, Castra Kicks items are eligible for size exchanges within 48 hours of delivery.",
            },
            {
                q: "Can I request a product that is not listed?",
                a: "Absolutely. If you are looking for a specific household item, kitchenware, or furniture piece, reach out to us via WhatsApp or email. We will do our best to source it for you.",
            },
        ],
    },
    {
        id: "account",
        label: "Account & Privacy",
        faqs: [
            {
                q: "Do I need an account to order?",
                a: "No, you can place orders via WhatsApp without creating an account. However, registering on our website gives you benefits like order tracking, a wishlist, and faster checkout for future orders.",
            },
            {
                q: "How is my personal data used?",
                a: "We use your data solely to process and deliver your orders, and - with your consent - to send you promotions. We never sell your personal data to third parties. Read our full Privacy Policy for details.",
            },
            {
                q: "How do I delete my account?",
                a: "To request account deletion, email us at info@castracollection.com or message us on WhatsApp. We will process your request within 7 business days, subject to any legal data retention obligations.",
            },
        ],
    },
];

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open
                ? "border-[#C6A16A]/40 bg-[#C6A16A]/5 dark:bg-[#C6A16A]/5"
                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#171717] hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
                <span className={`text-sm font-semibold leading-snug transition-colors ${open ? "text-[#C6A16A]" : "text-zinc-900 dark:text-zinc-100"
                    }`}>
                    {q}
                </span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#C6A16A]" : "text-zinc-400"
                    }`} />
            </button>
            {open && (
                <div className="px-5 pb-5">
                    <div className="h-px bg-[#C6A16A]/20 mb-4" />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{a}</p>
                </div>
            )}
        </div>
    );
}

export default function FaqPage() {
    const [activeGroup, setActiveGroup] = useState(FAQ_GROUPS[0].id);
    const current = FAQ_GROUPS.find((g) => g.id === activeGroup)!;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">FAQs & Help Center</span>
            </nav>

            {/* Hero */}
            <div className="flex items-start gap-5 mb-10 pb-10 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-4 rounded-2xl bg-[#C6A16A]/10 border border-[#C6A16A]/25 text-[#C6A16A] flex-shrink-0">
                    <HelpCircle className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Help Center</p>
                    <h1 className="text-3xl sm:text-4xl font-bold font-glacial text-zinc-900 dark:text-white mb-2">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                        Find answers to common questions about orders, delivery, exchanges, and more.
                        Can&apos;t find what you&apos;re looking for? Reach out to us directly.
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Category sidebar */}
                <aside className="lg:w-52 flex-shrink-0">
                    <div className="sticky top-24 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Categories</p>
                        {FAQ_GROUPS.map((group) => (
                            <button
                                key={group.id}
                                type="button"
                                onClick={() => setActiveGroup(group.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all duration-150 cursor-pointer ${activeGroup === group.id
                                        ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                            >
                                {group.label}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* FAQs */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white mb-5 flex items-center gap-3">
                            <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                            {current.label}
                        </h2>
                        <div className="space-y-3">
                            {current.faqs.map((faq) => (
                                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                            ))}
                        </div>
                    </div>

                    {/* Still need help */}
                    <div className="mt-8 p-6 rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 text-center space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A]">Still need help?</p>
                        <h3 className="text-lg font-bold font-glacial text-white">
                            We&apos;re happy to assist you
                        </h3>
                        <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                            Our team is available daily. Reach out via WhatsApp for the fastest response.
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I need help with my Castra order.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all duration-200 shadow-md"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>
                            <a
                                href="mailto:info@castracollection.com"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 hover:border-[#C6A16A]/50 text-zinc-300 hover:text-[#C6A16A] font-bold text-xs transition-all duration-200"
                            >
                                <Mail className="w-4 h-4" />
                                Send an Email
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
