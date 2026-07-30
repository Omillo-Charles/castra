import Link from "next/link";
import { Shield, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export const metadata = {
    title: "Privacy Policy – Castra Households",
    description: "How Castra Households collects, uses, and protects your personal data.",
};

const SECTIONS = [
    {
        id: "information-we-collect",
        title: "Information We Collect",
        content: [
            {
                subtitle: "Information you provide to us",
                body: "When you create an account, place an order, or contact us, we collect information such as your full name, email address, phone number, and delivery address. We may also collect payment-related information such as M-Pesa transaction references for completed STK Push payments, though we do not store full card numbers.",
            },
            {
                subtitle: "Information collected automatically",
                body: "When you visit our website, we automatically collect certain technical data including your IP address, browser type, device type, pages visited, and time spent on pages. This helps us understand how our site is used and improve your experience.",
            },
            {
                subtitle: "Information from social media",
                body: "If you choose to sign in using Google or follow us on Instagram, TikTok, or Facebook, we may receive basic profile information from those platforms in accordance with their privacy policies and your privacy settings.",
            },
        ],
    },
    {
        id: "how-we-use",
        title: "How We Use Your Information",
        content: [
            {
                subtitle: "To process and fulfil orders",
                body: "We use your contact and delivery details to process your purchases, arrange delivery across Kenya, and communicate order status updates via phone, SMS, or WhatsApp.",
            },
            {
                subtitle: "To improve our services",
                body: "Aggregated and anonymised usage data helps us understand customer preferences, optimise our product catalogue, and improve website performance.",
            },
            {
                subtitle: "To communicate with you",
                body: "With your consent, we may send you promotional emails or WhatsApp messages about new arrivals, exclusive deals, and offers. You can opt out of marketing communications at any time.",
            },
            {
                subtitle: "To comply with legal obligations",
                body: "We may use or disclose your information where required by Kenyan law, court order, or regulatory authority.",
            },
        ],
    },
    {
        id: "sharing",
        title: "Sharing Your Information",
        content: [
            {
                subtitle: "Delivery and logistics partners",
                body: "We share your name, phone number, and delivery address with third-party courier and logistics providers solely for the purpose of fulfilling your order.",
            },
            {
                subtitle: "Payment processors",
                body: "Payment transactions are processed through M-Pesa (Safaricom). We do not store your M-Pesa PIN or full transaction credentials. Please review Safaricom's privacy policy for details on how they handle your data.",
            },
            {
                subtitle: "No sale of personal data",
                body: "We do not sell, rent, or trade your personal information to any third party for their own marketing purposes.",
            },
        ],
    },
    {
        id: "data-security",
        title: "Data Security",
        content: [
            {
                subtitle: "How we protect your data",
                body: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, accidental loss, alteration, or disclosure. Access to your data is restricted to authorised personnel who need it to fulfil our services.",
            },
            {
                subtitle: "Data retention",
                body: "We retain your personal data for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. Order records are typically retained for seven (7) years in accordance with Kenyan tax and business regulations.",
            },
        ],
    },
    {
        id: "your-rights",
        title: "Your Rights",
        content: [
            {
                subtitle: "Access and correction",
                body: "You have the right to access the personal information we hold about you and to request corrections if any information is inaccurate or incomplete. You can do this by contacting us directly.",
            },
            {
                subtitle: "Deletion",
                body: "You may request deletion of your account and associated personal data at any time, subject to any legal retention obligations we must comply with.",
            },
            {
                subtitle: "Opt-out of marketing",
                body: "You can unsubscribe from marketing communications at any time by clicking the unsubscribe link in any email, replying STOP to any SMS, or contacting us directly.",
            },
        ],
    },
    {
        id: "cookies",
        title: "Cookies & Tracking",
        content: [
            {
                subtitle: "What we use cookies for",
                body: "Our website uses essential cookies to maintain your session and remember your cart. We may also use analytics cookies (e.g. via Google Analytics) to understand how visitors interact with our site. You can disable cookies in your browser settings, though this may affect some functionality.",
            },
        ],
    },
    {
        id: "children",
        title: "Children's Privacy",
        content: [
            {
                subtitle: "Age requirement",
                body: "Our services are not directed to children under the age of 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.",
            },
        ],
    },
    {
        id: "changes",
        title: "Changes to This Policy",
        content: [
            {
                subtitle: "Policy updates",
                body: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of material changes by posting the updated policy on this page with a revised effective date. Continued use of our services after such changes constitutes your acceptance of the updated policy.",
            },
        ],
    },
];

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Privacy Policy</span>
            </nav>

            {/* Hero */}
            <div className="flex items-start gap-5 mb-10 pb-10 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-4 rounded-2xl bg-[#C6A16A]/10 border border-[#C6A16A]/25 text-[#C6A16A] flex-shrink-0">
                    <Shield className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Legal</p>
                    <h1 className="text-3xl sm:text-4xl font-bold font-glacial text-zinc-900 dark:text-white mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                        At Castra Households, your privacy matters. This policy explains what data we collect,
                        how we use it, and how we keep it safe.
                    </p>
                    <p className="text-xs text-zinc-400 mt-3">
                        Effective date: <span className="font-semibold text-zinc-600 dark:text-zinc-300">26 August 2026</span>
                        &nbsp;·&nbsp; Last updated: <span className="font-semibold text-zinc-600 dark:text-zinc-300">27 July 2026</span>
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
                                className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] py-1.5 transition-colors group"
                            >
                                <span className="w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-400 group-hover:bg-[#C6A16A]/15 group-hover:text-[#C6A16A] flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors">
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
                            <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white mb-5 flex items-center gap-3">
                                <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                                {section.title}
                            </h2>
                            <div className="space-y-5">
                                {section.content.map((block) => (
                                    <div key={block.subtitle}>
                                        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                            {block.subtitle}
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                            {block.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Contact */}
                    <section id="contact" className="scroll-mt-24 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white mb-5 flex items-center gap-3">
                            <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                            Contact Us About Privacy
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle
                            your personal data, please reach out to us through any of the following channels:
                        </p>
                        <div className="flex flex-col gap-3 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                <Mail className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                                <a href="mailto:info@castracollection.com" className="hover:text-[#C6A16A] transition-colors">
                                    info@castracollection.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                <Phone className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                                <a href="tel:+254704147774" className="hover:text-[#C6A16A] transition-colors">
                                    +254 704 147 774
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                <MapPin className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                                <span>Accra Towers B10, Nairobi, Kenya</span>
                            </div>
                        </div>
                    </section>
                </article>

            </div>
        </div>
    );
}
