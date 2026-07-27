import Link from "next/link";
import { Truck, Clock, MapPin, CreditCard, Phone, MessageCircle, AlertTriangle, ChevronRight } from "lucide-react";

const WHATSAPP_NUMBER = "254704147774";

export const metadata = {
    title: "Shipping & Delivery Policy – Castra Households",
    description: "Everything you need to know about how Castra Households delivers across Kenya.",
};

const NAIROBI_ZONES = [
    { zone: "CBD & Westlands", time: "Same day – Next day", fee: "From KSh 150" },
    { zone: "Kiambu Road, Thika Road", time: "1 – 2 business days", fee: "From KSh 200" },
    { zone: "Ngong Road, Karen, Langata", time: "1 – 2 business days", fee: "From KSh 200" },
    { zone: "Eastlands (Umoja, Kayole, Donholm)", time: "1 – 2 business days", fee: "From KSh 200" },
    { zone: "Outer Nairobi (Ruiru, Athi River, Kitengela)", time: "2 – 3 business days", fee: "From KSh 300" },
];

const UPCOUNTRY_ZONES = [
    { zone: "Mombasa", time: "3 – 5 business days", fee: "From KSh 500" },
    { zone: "Kisumu", time: "3 – 5 business days", fee: "From KSh 500" },
    { zone: "Nakuru", time: "2 – 4 business days", fee: "From KSh 400" },
    { zone: "Eldoret", time: "3 – 5 business days", fee: "From KSh 500" },
    { zone: "Nyeri, Meru, Embu", time: "3 – 5 business days", fee: "From KSh 450" },
    { zone: "Other Counties", time: "4 – 7 business days", fee: "Quote on request" },
];

export default function ShippingPolicyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Shipping & Delivery Policy</span>
            </nav>

            {/* Hero */}
            <div className="flex items-start gap-5 mb-12 pb-10 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-4 rounded-2xl bg-[#C6A16A]/10 border border-[#C6A16A]/25 text-[#C6A16A] flex-shrink-0">
                    <Truck className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Delivery</p>
                    <h1 className="text-3xl sm:text-4xl font-bold font-glacial text-zinc-900 dark:text-white mb-2">
                        Shipping & Delivery Policy
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                        We deliver countrywide across Kenya. Here is everything you need to know about how we get your order to you.
                    </p>
                </div>
            </div>

            <div className="space-y-10">

                {/* How it works */}
                <section>
                    <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white mb-5 flex items-center gap-3">
                        <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                        How Delivery Works
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { icon: <CreditCard className="w-5 h-5" />, step: "1. Place & Pay", desc: "Place your order via our website or WhatsApp and complete payment via M-Pesa or confirm Cash on Delivery." },
                            { icon: <Clock className="w-5 h-5" />, step: "2. We Process", desc: "We confirm your order, prepare your items, and hand them over to our delivery partner — typically within 24 hours." },
                            { icon: <Truck className="w-5 h-5" />, step: "3. We Deliver", desc: "Your order is dispatched and delivered to your provided address. You will receive a notification when it is on its way." },
                        ].map(({ icon, step, desc }) => (
                            <div key={step} className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-[#171717] border border-zinc-200 dark:border-zinc-800">
                                <div className="w-10 h-10 rounded-xl bg-[#C6A16A]/10 border border-[#C6A16A]/25 text-[#C6A16A] flex items-center justify-center flex-shrink-0">
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-zinc-900 dark:text-white mb-1">{step}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Nairobi delivery */}
                <section>
                    <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
                        <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                        Nairobi Delivery
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
                        Estimated timelines and fees by Nairobi zone. All timelines are from the date of dispatch, not order placement.
                    </p>
                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="grid grid-cols-3 bg-zinc-100 dark:bg-zinc-900 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                            <span>Zone</span>
                            <span>Est. Time</span>
                            <span>Fee</span>
                        </div>
                        {NAIROBI_ZONES.map((row, i) => (
                            <div key={row.zone} className={`grid grid-cols-3 px-5 py-3.5 text-xs gap-2 ${
                                i !== NAIROBI_ZONES.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/60" : ""
                            }`}>
                                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{row.zone}</span>
                                <span className="text-zinc-500 dark:text-zinc-400">{row.time}</span>
                                <span className="font-semibold text-[#C6A16A]">{row.fee}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Upcountry delivery */}
                <section>
                    <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
                        <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                        Upcountry Delivery
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
                        We deliver to all 47 counties. Fees and timelines below are estimates — contact us for a precise quote.
                    </p>
                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="grid grid-cols-3 bg-zinc-100 dark:bg-zinc-900 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                            <span>Destination</span>
                            <span>Est. Time</span>
                            <span>Fee</span>
                        </div>
                        {UPCOUNTRY_ZONES.map((row, i) => (
                            <div key={row.zone} className={`grid grid-cols-3 px-5 py-3.5 text-xs gap-2 ${
                                i !== UPCOUNTRY_ZONES.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/60" : ""
                            }`}>
                                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{row.zone}</span>
                                <span className="text-zinc-500 dark:text-zinc-400">{row.time}</span>
                                <span className="font-semibold text-[#C6A16A]">{row.fee}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-zinc-400 mt-3 flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                        Delivery fees are charged per order and are confirmed before dispatch. Bulky or heavy items may attract higher charges.
                    </p>
                </section>

                {/* Important notes */}
                <section>
                    <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white mb-5 flex items-center gap-3">
                        <span className="w-1 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                        Important Notes
                    </h2>
                    <div className="space-y-3">
                        {[
                            { icon: <Clock className="w-4 h-4" />, text: "Delivery timelines begin from the date of dispatch, not the date the order was placed. Orders are typically dispatched within 24 hours of payment confirmation." },
                            { icon: <Phone className="w-4 h-4" />, text: "Ensure your phone number and delivery address are accurate. Our courier will call before arriving. If you are unreachable, re-delivery charges may apply." },
                            { icon: <AlertTriangle className="w-4 h-4" />, text: "We are not liable for delays caused by third-party couriers, adverse weather, or circumstances outside our control. We will communicate any known delays proactively." },
                            { icon: <Truck className="w-4 h-4" />, text: "Risk of loss passes to you upon delivery. Inspect your order at the point of delivery and report any visible damage immediately to our team." },
                        ].map(({ icon, text }) => (
                            <div key={text} className="flex items-start gap-3.5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <div className="p-1.5 rounded-lg bg-[#C6A16A]/10 text-[#C6A16A] flex-shrink-0 mt-0.5">
                                    {icon}
                                </div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-7 text-center space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A]">Questions?</p>
                    <h3 className="text-lg font-bold font-glacial text-white">
                        Not sure about delivery to your area?
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                        Message us on WhatsApp with your location and we will give you an accurate delivery quote and timeline.
                    </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to know the delivery fee and timeline to my area.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all duration-200 shadow-md"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Policy links */}
                <p className="text-xs text-zinc-400 text-center pb-4">
                    See also:{" "}
                    <Link href="/returns" className="text-[#C6A16A] hover:underline font-semibold">Returns & Exchanges</Link>
                    {" "}·{" "}
                    <Link href="/terms" className="text-[#C6A16A] hover:underline font-semibold">Terms & Conditions</Link>
                </p>

            </div>
        </div>
    );
}
