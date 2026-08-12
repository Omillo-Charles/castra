import { Suspense } from "react";
import Link from "next/link";
import { HeroBanner } from "@/components/ui/heroBanner";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { Loader2 } from "lucide-react";

// Force dynamic rendering - this page depends on URL search params
// (?search=, ?category=, ?page=, ?sort=). Without this Next.js may attempt
// to statically render the page and fail to complete React hydration when
// those params are present, breaking all interactivity after a hard refresh.
export const dynamic = "force-dynamic";

// SEO_CATEGORIES - static links crawlable by search engines.
// These anchor texts contain exact-match keyword phrases that map to
// product category searches in Kenya.
const SEO_CATEGORIES = [
  { label: "Beddings & Linens", href: "/?category=beddings", query: "beddings" },
  { label: "Kitchenware", href: "/?category=kitchenware", query: "kitchenware" },
  { label: "Electronics", href: "/?category=electronics", query: "electronics" },
  { label: "Furniture", href: "/?category=furniture", query: "furniture" },
  { label: "Home Décor", href: "/?category=decor", query: "decor" },
  { label: "Organizers", href: "/?category=organizers", query: "organizers" },
  { label: "Premium Footwear", href: "/kicks", query: "kicks" },
] as const;

// SEO_TRUST_SIGNALS - keyword-anchored trust signals surfaced as
// crawlable text. Each "why shop with us" point doubles as a micro
// landing page for queries like "M-Pesa online shopping Kenya".
const SEO_TRUST_SIGNALS = [
  {
    title: "100% Authentic Products",
    body: "Every item in the Castra Households catalogue is sourced from verified suppliers. Shop with complete confidence.",
  },
  {
    title: "M-Pesa Payments",
    body: "Pay securely via M-Pesa STK Push at checkout. No cash required - fast, safe, and familiar.",
  },
  {
    title: "Countrywide Delivery",
    body: "We deliver household essentials across Kenya - Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and beyond.",
  },
  {
    title: "Dedicated Customer Support",
    body: "Our team is available on WhatsApp daily. Get instant help with orders, delivery, or product queries.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HeroBanner />

      {/* Products section - scroll target for category nav links */}
      <section id="products" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/*
          Suspense is required here because ProductGrid uses useSearchParams()
          internally. Without this boundary, any URL with query params causes
          React to suspend during hydration, leaving the page non-interactive.
        */}
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-24 text-zinc-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#C6A16A]" />
            <p className="text-sm font-semibold">Fetching collection...</p>
          </div>
        }>
          <ProductGrid />
        </Suspense>
      </section>

      {/*
        SEO CONTENT SECTION
        This section is intentionally server-rendered and fully static.
        It gives Googlebot meaningful text to index on the homepage - the
        most-visited and most-important page for ranking purposes.
        Visually minimal so it complements rather than distracts from the
        product grid above.
      */}
      <section
        aria-label="About Castra Households"
        className="border-t border-zinc-800/60 bg-[#0D0D0D]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">

          {/* Brand statement */}
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A16A] mb-3">
              Kenya&apos;s Premium Household Store
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-glacial text-white leading-snug mb-4">
              Shop Home Essentials Online in Kenya - Delivered to Your Door
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Castra Households is Kenya&apos;s leading online household store, offering a curated
              selection of premium beddings, kitchenware, electronics, furniture, home décor,
              organizers, and footwear. We serve customers across Nairobi, Mombasa, Kisumu,
              Nakuru, Eldoret, and every corner of Kenya - with fast, reliable countrywide
              delivery. Pay conveniently via M-Pesa and enjoy a seamless online shopping
              experience built for Kenyan homes.
            </p>
          </div>

          {/* Category links - crawlable anchor text */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Browse by Category
            </p>
            <nav aria-label="Product categories" className="flex flex-wrap gap-2">
              {SEO_CATEGORIES.map((cat) => (
                <Link
                  key={cat.query}
                  href={cat.href}
                  className="px-4 py-2 rounded-full border border-zinc-700 hover:border-[#C6A16A]/60
                             text-xs font-semibold text-zinc-300 hover:text-[#C6A16A]
                             transition-all duration-200 hover:bg-[#C6A16A]/5"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Trust signals */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
              Why Shop with Castra Households
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SEO_TRUST_SIGNALS.map((signal) => (
                <div
                  key={signal.title}
                  className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40
                             hover:border-[#C6A16A]/30 transition-all duration-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C6A16A] mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1.5">{signal.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{signal.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                          gap-4 pt-4 border-t border-zinc-800/60">
            <p className="text-xs text-zinc-500 max-w-lg">
              Looking for a specific item? Browse our full collection or{" "}
              <a
                href="https://wa.me/254704147774?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20product."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C6A16A] hover:underline font-semibold"
              >
                chat with us on WhatsApp
              </a>
              {" "}and we&apos;ll source it for you.
            </p>
            <Link
              href="/about"
              className="text-xs font-bold text-zinc-400 hover:text-[#C6A16A] transition-colors whitespace-nowrap"
            >
              Learn more about us →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
