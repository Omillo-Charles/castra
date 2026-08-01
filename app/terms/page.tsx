import Link from "next/link";
import { ScrollText, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export const metadata = {
    title: "Terms & Conditions – Castra Households",
    description: "The terms and conditions governing your use of Castra Households.",
};

const SECTIONS = [
    {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: [
            {
                subtitle: "Agreement to terms",
                body: "By accessing or using the Castra Households website, placing an order, or interacting with us via WhatsApp, social media, or any other channel, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
            },
            {
                subtitle: "Changes to terms",
                body: "We reserve the right to update or modify these Terms at any time. We will indicate the date of the most recent revision at the top of this page. Your continued use of our services after any changes constitutes your acceptance of the updated Terms.",
            },
        ],
    },
    {
        id: "use-of-site",
        title: "Use of Our Website",
        content: [
            {
                subtitle: "Permitted use",
                body: "You may use our website for lawful personal and non-commercial purposes only. You agree not to use our site in any way that is unlawful, harmful, fraudulent, or that infringes the rights of others.",
            },
            {
                subtitle: "Prohibited conduct",
                body: "You must not attempt to gain unauthorised access to any part of our website or its related systems, scrape or copy content for commercial use without written permission, submit false or misleading information, or interfere with the proper functioning of the site.",
            },
            {
                subtitle: "Intellectual property",
                body: "All content on this website - including text, images, logos, graphics, and the Castra brand - is the property of Castra Households and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written consent.",
            },
        ],
    },
    {
        id: "orders-payments",
        title: "Orders & Payments",
        content: [
            {
                subtitle: "Placing an order",
                body: "An order placed through our website, WhatsApp, or social media constitutes an offer to purchase. We reserve the right to accept or decline any order at our discretion. You will receive a confirmation once your order has been accepted.",
            },
            {
                subtitle: "Pricing",
                body: "All prices are listed in Kenyan Shillings (KSh) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice. The price charged will be the price confirmed at the time your order is accepted.",
            },
            {
                subtitle: "Payment methods",
                body: "We currently accept M-Pesa STK Push at checkout. Payment must be completed before your order is dispatched.",
            },
            {
                subtitle: "Order cancellation",
                body: "You may cancel an order before it has been dispatched by contacting us immediately. Once an order has been dispatched, cancellation is no longer possible, and you will need to follow our returns process.",
            },
        ],
    },
    {
        id: "delivery",
        title: "Delivery",
        content: [
            {
                subtitle: "Delivery coverage",
                body: "We deliver countrywide across Kenya. Delivery timelines vary by location and are typically 2–5 business days after order confirmation. Remote areas may take longer.",
            },
            {
                subtitle: "Delivery charges",
                body: "Delivery fees are calculated based on your location and will be communicated to you before order confirmation. We reserve the right to revise delivery charges without prior notice.",
            },
            {
                subtitle: "Risk of loss",
                body: "Risk of loss and title for products passes to you upon delivery. We are not responsible for any loss, damage, or delay caused by third-party courier services once items have been handed over for delivery.",
            },
            {
                subtitle: "Failed delivery",
                body: "If a delivery attempt fails due to an incorrect address or unavailability of the recipient, re-delivery charges may apply. We will attempt to contact you before a second delivery attempt.",
            },
        ],
    },
    {
        id: "returns-refunds",
        title: "Returns & Exchanges Policy",
        content: [
            {
                subtitle: "No returns on Castra Collection",
                body: "All sales on Castra Collection (household essentials, kitchenware, bedding, decor, electronics, organizers, furniture, and office equipment) are final. We do not accept returns or issue refunds once an order has been delivered. We encourage you to review product details carefully before placing your order. If you have any questions about a product before purchasing, please reach out to us via WhatsApp or email.",
            },
            {
                subtitle: "Exchanges on Castra Kicks",
                body: "For Castra Kicks (footwear), we accept exchanges only - no refunds. If you receive a defective item or the wrong size was delivered due to our error, you may request an exchange within 48 hours of delivery. The item must be unworn, in its original packaging, and accompanied by proof of purchase. Exchange requests submitted after 48 hours will not be accepted.",
            },
            {
                subtitle: "Damaged or incorrect items",
                body: "If your order arrives damaged or you receive a wrong item, please contact us immediately via WhatsApp on +254 704 147 774 with photographic evidence. We will assess each case individually and, where we are at fault, arrange a replacement or exchange at no additional cost to you.",
            },
        ],
    },
    {
        id: "accounts",
        title: "User Accounts",
        content: [
            {
                subtitle: "Account responsibility",
                body: "If you create an account with us, you are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately if you suspect unauthorised use of your account.",
            },
            {
                subtitle: "Account termination",
                body: "We reserve the right to suspend or terminate your account at any time if we reasonably believe you have violated these Terms or engaged in fraudulent or harmful activity.",
            },
        ],
    },
    {
        id: "limitation-liability",
        title: "Limitation of Liability",
        content: [
            {
                subtitle: "No warranties",
                body: "Our website and services are provided on an 'as is' basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of our website or the products listed on it.",
            },
            {
                subtitle: "Limitation of damages",
                body: "To the fullest extent permitted by Kenyan law, Castra Households shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our website or services, even if we have been advised of the possibility of such damages. Our total liability to you shall not exceed the value of the order giving rise to the claim.",
            },
        ],
    },
    {
        id: "governing-law",
        title: "Governing Law",
        content: [
            {
                subtitle: "Jurisdiction",
                body: "These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Kenya.",
            },
            {
                subtitle: "Dispute resolution",
                body: "We encourage you to contact us first to resolve any dispute amicably. If a resolution cannot be reached, the matter will be referred to the appropriate Kenyan legal authority.",
            },
        ],
    },
];

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-300 font-semibold">Terms & Conditions</span>
            </nav>

            {/* Hero */}
            <div className="flex items-start gap-5 mb-10 pb-10 border-b border-zinc-800">
                <div className="p-4 rounded-2xl bg-[#C6A16A]/10 border border-[#C6A16A]/25 text-[#C6A16A] flex-shrink-0">
                    <ScrollText className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Legal</p>
                    <h1 className="text-3xl sm:text-4xl font-bold font-glacial text-white mb-2">
                        Terms & Conditions
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                        Please read these terms carefully before using the Castra Households website or placing any order with us.
                    </p>
                    <p className="text-xs text-zinc-400 mt-3">
                        Effective date: <span className="font-semibold text-zinc-300">26 August 2026</span>
                        &nbsp;·&nbsp; Last updated: <span className="font-semibold text-zinc-300">27 July 2026</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">

                {/* Table of contents */}
                <aside className="lg:w-56 flex-shrink-0">
                    <div className="sticky top-24 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">On this page</p>
                        {SECTIONS.map((s, i) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-[#C6A16A] py-1.5 transition-colors group"
                            >
                                <span className="w-5 h-5 rounded-md bg-zinc-900 text-zinc-400 group-hover:bg-[#C6A16A]/15 group-hover:text-[#C6A16A] flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors">
                                    {i + 1}
                                </span>
                                {s.title}
                            </a>
                        ))}
                    </div>
                </aside>

                {/* Content */}
                <article className="flex-1 space-y-12">
                    {SECTIONS.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <h2 className="text-lg font-bold font-glacial text-white mb-5 flex items-center gap-3">
                                <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                                {section.title}
                            </h2>
                            <div className="space-y-5">
                                {section.content.map((block) => (
                                    <div key={block.subtitle}>
                                        <h3 className="text-sm font-bold text-zinc-200 mb-1.5">
                                            {block.subtitle}
                                        </h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            {block.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Contact */}
                    <section id="contact" className="scroll-mt-24 pt-6 border-t border-zinc-800">
                        <h2 className="text-lg font-bold font-glacial text-white mb-5 flex items-center gap-3">
                            <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                            Contact Us
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                            If you have any questions about these Terms and Conditions, please get in touch with us:
                        </p>
                        <div className="flex flex-col gap-3 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <Mail className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                                <a href="mailto:info@castrahouseholds.co.ke" className="hover:text-[#C6A16A] transition-colors">
                                    info@castrahouseholds.co.ke
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <Phone className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                                <a href="tel:+254704147774" className="hover:text-[#C6A16A] transition-colors">
                                    +254 704 147 774
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <MapPin className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                                <span>Accra Towers B10, Nairobi, Kenya</span>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-400 mt-6 leading-relaxed">
                            These Terms & Conditions should be read alongside our{" "}
                            <Link href="/privacy" className="text-[#C6A16A] hover:underline font-semibold">
                                Privacy Policy
                            </Link>
                            , which explains how we handle your personal data.
                        </p>
                    </section>
                </article>

            </div>
        </div>
    );
}
