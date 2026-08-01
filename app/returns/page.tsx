import Link from "next/link";
import { RefreshCcw, X, ArrowLeftRight, AlertTriangle, MessageCircle, Mail, ChevronRight } from "lucide-react";

const WHATSAPP_NUMBER = "254704147774";

export const metadata = {
    title: "Returns & Exchanges – Castra Households",
    description: "Castra Households returns and exchanges policy.",
};

export default function ReturnsPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Returns & Exchanges</span>
            </nav>

            {/* Hero */}
            <div className="flex items-start gap-5 mb-12 pb-10 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-4 rounded-2xl bg-[#C6A16A]/10 border border-[#C6A16A]/25 text-[#C6A16A] flex-shrink-0">
                    <RefreshCcw className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Policy</p>
                    <h1 className="text-3xl sm:text-4xl font-bold font-glacial text-zinc-900 dark:text-white mb-2">
                        Returns & Exchanges
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                        We want you to be completely happy with your Castra purchase. Please read our policy carefully before placing an order.
                    </p>
                </div>
            </div>

            <div className="space-y-8">

                {/* No Returns — Castra Collection */}
                <div className="rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-red-200 dark:border-red-500/20 bg-red-100/60 dark:bg-red-500/10">
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <h2 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                            No Returns — Castra Collection
                        </h2>
                    </div>
                    <div className="px-6 py-5 space-y-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            All sales on <span className="font-semibold text-zinc-800 dark:text-zinc-200">Castra Collection</span> are <span className="font-bold text-red-500">final</span>. We do not accept returns or issue refunds on any household product once the order has been delivered. This includes:
                        </p>
                        <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                            {["Beddings", "Home Appliances", "Kitchenware", "Organizers", "Electronics", "Decor", "Office Equipment", "Furniture", "Gifts"].map((cat) => (
                                <li key={cat} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                    {cat}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1 border-t border-red-200 dark:border-red-500/20">
                            We encourage you to ask any questions about a product <span className="font-semibold">before</span> purchasing.
                            Our team is available on WhatsApp to help you make the right choice.
                        </p>
                    </div>
                </div>

                {/* Exchanges — Castra Kicks */}
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5 overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-emerald-200 dark:border-emerald-500/20 bg-emerald-100/60 dark:bg-emerald-500/10">
                        <ArrowLeftRight className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                            Exchanges Only — Castra Kicks
                        </h2>
                    </div>
                    <div className="px-6 py-5 space-y-5">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Castra Kicks</span> (footwear) are eligible for <span className="font-bold text-emerald-600 dark:text-emerald-400">size exchanges only</span> - no refunds. To qualify for an exchange, all of the following conditions must be met:
                        </p>

                        <ul className="space-y-2.5">
                            {[
                                "Request submitted within 48 hours of delivery",
                                "Item is unworn and in its original packaging",
                                "Proof of purchase is provided",
                                "The item is defective or the wrong size was delivered due to our error",
                            ].map((condition) => (
                                <li key={condition} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                                    <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    {condition}
                                </li>
                            ))}
                        </ul>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1 border-t border-emerald-200 dark:border-emerald-500/20">
                            Exchange requests submitted after 48 hours of delivery will not be accepted, regardless of circumstance.
                        </p>
                    </div>
                </div>

                {/* Damaged / Wrong Items */}
                <div className="rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-amber-200 dark:border-amber-500/20 bg-amber-100/60 dark:bg-amber-500/10">
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <h2 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                            Damaged or Incorrect Orders
                        </h2>
                    </div>
                    <div className="px-6 py-5 space-y-3">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            If your order arrives damaged or you receive the wrong item, contact us <span className="font-semibold text-zinc-800 dark:text-zinc-200">immediately</span> via WhatsApp with:
                        </p>
                        <ul className="space-y-2">
                            {[
                                "Your order reference or phone number used to place the order",
                                "Clear photos of the damaged or incorrect item",
                                "A brief description of the issue",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                            We will assess each case individually. Where we are at fault, we will arrange a replacement or exchange at no additional cost to you.
                        </p>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-7 text-center space-y-4 mt-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A]">Need Help?</p>
                    <h3 className="text-lg font-bold font-glacial text-white">
                        Have questions before you buy?
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                        Our team is happy to help you choose the right product. Reach out before placing your order.
                    </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I have a question about a product before I order.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all duration-200 shadow-md"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Chat on WhatsApp
                        </a>
                        <a
                            href="mailto:info@castrahouseholds.co.ke"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 hover:border-[#C6A16A]/50 text-zinc-300 hover:text-[#C6A16A] font-bold text-xs transition-all duration-200"
                        >
                            <Mail className="w-4 h-4" />
                            Send an Email
                        </a>
                    </div>
                </div>

                {/* Policy links */}
                <p className="text-xs text-zinc-400 text-center pb-4">
                    This policy forms part of our{" "}
                    <Link href="/terms" className="text-[#C6A16A] hover:underline font-semibold">Terms & Conditions</Link>.
                    {" "}For data-related queries, see our{" "}
                    <Link href="/privacy" className="text-[#C6A16A] hover:underline font-semibold">Privacy Policy</Link>.
                </p>

            </div>
        </div>
    );
}
