import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { TikTokIcon, WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/svgicons";

const WHATSAPP_NUMBER = "254704147774";

const CATEGORIES = [
    { name: "Beddings & Linens", href: "/?category=beddings" },
    { name: "Kitchenware", href: "/?category=kitchenware" },
    { name: "Electronics", href: "/?category=electronics" },
    { name: "Furniture", href: "/?category=furniture" },
    { name: "Home Décor", href: "/?category=decor" },
    { name: "Organizers", href: "/?category=organizers" },
    { name: "Premium Footwear", href: "/kicks" },
];

const VALUES = [
    {
        heading: "Authenticity",
        body: "Every product in our catalogue is sourced from verified, trusted suppliers. We never compromise on quality - your home deserves the best.",
    },
    {
        heading: "Accessibility",
        body: "Premium household items shouldn't be a privilege. We work hard to keep our prices fair and our delivery reach as wide as possible across Kenya.",
    },
    {
        heading: "Convenience",
        body: "From browsing to checkout to doorstep delivery - we've made every step seamless. Pay via M-Pesa, track your order, and reach us anytime on WhatsApp.",
    },
    {
        heading: "Community",
        body: "We're a Kenyan brand, built for Kenyan homes. Every purchase supports a local team committed to elevating living standards across the country.",
    },
];

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-300 font-semibold">About Us</span>
            </nav>

            {/* Hero */}
            <div className="mb-14 pb-14 border-b border-zinc-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A16A] mb-3">
                    Our Story
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold font-glacial text-white leading-tight mb-6">
                    Kenya&apos;s Home,{" "}
                    <span className="text-[#C6A16A]">Elevated.</span>
                </h1>
                <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">
                    Castra Households was founded with a single belief: that every Kenyan home deserves
                    access to premium, authentic household essentials - without the hassle. We started
                    in Nairobi and quickly grew to serve customers across the country, from Mombasa to
                    Eldoret, Kisumu to Nakuru, and everywhere in between.
                </p>
            </div>

            {/* Mission */}
            <div className="mb-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A16A] mb-3">
                            Our Mission
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-bold font-glacial text-white mb-4 leading-snug">
                            Premium Living, Made Accessible
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                            We curate only the best - beddings, kitchenware, electronics, furniture, home
                            décor, organizers, and footwear - and deliver them directly to your doorstep
                            across Kenya. Our promise is simple: authentic products, transparent pricing,
                            and a customer experience that feels personal.
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Whether you&apos;re setting up a new home, refreshing your space, or hunting for
                            the perfect gift, Castra Households is Kenya&apos;s most trusted online destination
                            for household essentials.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: "47+", label: "Counties Served" },
                            { value: "100%", label: "Authentic Products" },
                            { value: "M-Pesa", label: "Payments Accepted" },
                            { value: "Daily", label: "Customer Support" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 text-center"
                            >
                                <p className="text-2xl font-bold font-glacial text-[#C6A16A] mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-zinc-400 font-semibold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="mb-14">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
                    What We Stand For
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {VALUES.map((v) => (
                        <div
                            key={v.heading}
                            className="p-6 rounded-2xl border border-zinc-800 bg-[#111111]
                                       hover:border-[#C6A16A]/30 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-1.5 h-5 rounded-full bg-[#C6A16A] flex-shrink-0" />
                                <h3 className="text-sm font-bold text-white">{v.heading}</h3>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed">{v.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* What We Sell */}
            <div className="mb-14 pb-14 border-b border-zinc-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
                    Our Collections
                </p>
                <h2 className="text-xl font-bold font-glacial text-white mb-4">
                    Everything Your Home Needs
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                    From the bedroom to the kitchen, the living room to the outdoors - we stock
                    everything you need to build a beautiful, functional home in Kenya.
                </p>
                <nav aria-label="Product categories" className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.name}
                            href={cat.href}
                            className="px-4 py-2 rounded-full border border-zinc-700 hover:border-[#C6A16A]/60
                                       text-xs font-semibold text-zinc-300 hover:text-[#C6A16A]
                                       transition-all duration-200 hover:bg-[#C6A16A]/5"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Contact & Social */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Contact */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-5">
                        Get in Touch
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-white mb-0.5">Location</p>
                                <p className="text-xs text-zinc-400">Accra Towers B10, Nairobi, Kenya</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-white mb-0.5">Phone / WhatsApp</p>
                                <a
                                    href={`tel:+${WHATSAPP_NUMBER}`}
                                    className="text-xs text-zinc-400 hover:text-[#C6A16A] transition-colors"
                                >
                                    +254 704 147 774
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-white mb-0.5">Email</p>
                                <a
                                    href="mailto:info@castrahouseholds.co.ke"
                                    className="text-xs text-zinc-400 hover:text-[#C6A16A] transition-colors"
                                >
                                    info@castrahouseholds.co.ke
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about Castra Households.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                                       bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm
                                       transition-all duration-200 shadow-lg hover:scale-[1.02]"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Social */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-5">
                        Follow Us
                    </p>
                    <div className="space-y-3">
                        <a
                            href="https://www.instagram.com/_castrahouseholds"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800
                                       hover:border-[#C6A16A]/40 hover:bg-[#C6A16A]/5 transition-all duration-200 group"
                        >
                            <InstagramIcon className="w-5 h-5 text-zinc-400 group-hover:text-[#C6A16A] transition-colors" />
                            <div>
                                <p className="text-xs font-bold text-white">Instagram</p>
                                <p className="text-[11px] text-zinc-500">@_castrahouseholds</p>
                            </div>
                        </a>
                        <a
                            href="https://www.facebook.com/castrahouseholds"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800
                                       hover:border-[#C6A16A]/40 hover:bg-[#C6A16A]/5 transition-all duration-200 group"
                        >
                            <FacebookIcon className="w-5 h-5 text-zinc-400 group-hover:text-[#C6A16A] transition-colors" />
                            <div>
                                <p className="text-xs font-bold text-white">Facebook</p>
                                <p className="text-[11px] text-zinc-500">Castra Households</p>
                            </div>
                        </a>
                        <a
                            href="https://www.tiktok.com/@castrahouseholds"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800
                                       hover:border-[#C6A16A]/40 hover:bg-[#C6A16A]/5 transition-all duration-200 group"
                        >
                            <TikTokIcon className="w-5 h-5 text-zinc-400 group-hover:text-[#C6A16A] transition-colors" />
                            <div>
                                <p className="text-xs font-bold text-white">TikTok</p>
                                <p className="text-[11px] text-zinc-500">@castrahouseholds</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
