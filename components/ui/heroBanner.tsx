"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, ChevronRight as ArrowRight } from "lucide-react";
import { scrollToProducts } from "@/lib/scrollToProducts";
import { WhatsAppIcon } from "@/components/svgicons";
import { productApi, type Product } from "@/config/api";
import { CATEGORIES_LIST } from "@/config/constants";

const WHATSAPP_NUMBER = "254704147774";

const SIDEBAR_CATEGORIES = CATEGORIES_LIST.filter((c) => c !== "All");

const SLIDES = [
  {
    id: "kitchenware",
    src: "/images/categories/kitchenware.png",
    alt: "Castra – Premium Kitchenware Collection",
    eyebrow: "New Arrival",
    title: "Kitchenware\nCollection",
    highlight: "Up to 40% OFF",
    subtitle: "on Premium Kitchen Essentials",
    cta: "Shop Now",
    categorySlug: "kitchenware" as string | undefined,
    href: undefined as string | undefined,
    whatsappMsg: "Hi, I'd like to view your kitchenware products.",
  },
  {
    id: "homeappliances",
    src: "/images/categories/homeappliances.png",
    alt: "Castra – Home Appliances",
    eyebrow: "Best Sellers",
    title: "Home\nAppliances",
    highlight: "Great Deals",
    subtitle: "on Top-Rated Home Appliances",
    cta: "Shop Now",
    categorySlug: "home-appliances" as string | undefined,
    href: undefined as string | undefined,
    whatsappMsg: "Hi, I'd like to view your home appliances.",
  },
  {
    id: "furniture",
    src: "/images/categories/furniture.png",
    alt: "Castra – Premium Furniture",
    eyebrow: "Featured",
    title: "Premium\nFurniture",
    highlight: "Elevate Your Space",
    subtitle: "curated pieces for every room",
    cta: "Explore Now",
    categorySlug: "furniture" as string | undefined,
    href: undefined as string | undefined,
    whatsappMsg: "Hi, I'd like to view your furniture collection.",
  },
] as const;

const DELAY = 6000;

function formatKES(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

function BestsellersSidebar() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .list({ limit: 6, page: 1 })
      .then((res) => setProducts(res.products?.slice(0, 6) ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="hidden xl:flex flex-col w-56 flex-shrink-0 self-stretch">
      <div className="bg-brand-gold px-4 py-2.5 rounded-t-xl">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950">
          Bestsellers
        </h3>
      </div>

      <div className="flex-1 bg-zinc-900 border border-t-0 border-zinc-800 rounded-b-xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col gap-3 p-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-14 h-14 rounded-lg bg-zinc-800 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 w-full bg-zinc-800 rounded-full" />
                  <div className="h-2.5 w-2/3 bg-zinc-800 rounded-full" />
                  <div className="h-3 w-1/2 bg-zinc-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-xs text-zinc-500 p-4 text-center">No products available</p>
        ) : (
          <ul className="divide-y divide-zinc-800/60">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 px-3 py-3 hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                onClick={() => scrollToProducts(p.category.toLowerCase().replace(/\s+/g, "-"))}
              >
                <div className="w-14 h-14 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-zinc-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-zinc-200 leading-snug line-clamp-2 group-hover:text-brand-gold transition-colors">
                    {p.name}
                  </p>
                  <p className="text-xs font-bold text-brand-gold mt-1">
                    {formatKES(p.price)}
                  </p>
                  {p.originalPrice && p.originalPrice > p.price && (
                    <p className="text-[10px] text-zinc-500 line-through leading-none">
                      {formatKES(p.originalPrice)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

function CategoriesSidebar({
  activeCategory,
  onSelect,
}: {
  activeCategory: string | null;
  onSelect: (slug: string | undefined, label: string) => void;
}) {
  return (
    <aside className="hidden lg:flex flex-col w-48 flex-shrink-0 self-stretch">
      <div className="bg-brand-gold px-4 py-2.5 rounded-t-xl">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950">
          Categories
        </h3>
      </div>

      <ul className="flex-1 bg-zinc-900 border border-t-0 border-zinc-800 rounded-b-xl overflow-hidden divide-y divide-zinc-800/60">
        {SIDEBAR_CATEGORIES.map((cat) => {
          const slug = cat.toLowerCase().replace(/\s+/g, "-");
          const isActive = activeCategory === slug;
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() => onSelect(slug, cat)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-all duration-150 cursor-pointer text-left group ${
                  isActive
                    ? "bg-brand-gold/10 text-brand-gold"
                    : "text-zinc-300 hover:bg-zinc-800/70 hover:text-brand-gold"
                }`}
              >
                <span>{cat}</span>
                <ArrowRight
                  className={`w-3 h-3 flex-shrink-0 transition-colors ${
                    isActive ? "text-brand-gold" : "text-zinc-600 group-hover:text-brand-gold"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, DELAY);
    return () => clearInterval(t);
  }, [next]);

  return (
    <div className="relative flex-1 min-w-0 rounded-xl overflow-hidden shadow-lg sm:border sm:border-zinc-700/60">

      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{ opacity: i === current ? (isTransitioning ? 0 : 1) : 0 }}
          aria-hidden={i !== current}
        >
          <div className="absolute inset-0 bg-[#0e0e0e]" />

          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                "linear-gradient(to right, #0e0e0e 0%, #0e0e0e 30%, rgba(14,14,14,0.85) 45%, rgba(14,14,14,0.6) 70%, rgba(14,14,14,0.3) 100%)",
            }}
          />

          <div className="absolute left-0 inset-y-0 w-1/3 bg-gradient-to-r from-[#C6A16A]/6 to-transparent pointer-events-none hidden sm:block" />

          <div className="absolute inset-y-0 left-0 w-1/2 bg-[#0e0e0e]/50 sm:hidden" />

          <div className="relative z-10 flex items-center h-full">

            <div className="flex flex-col justify-center px-5 sm:px-8 lg:px-12 py-6 sm:py-8
                            w-1/2 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-extrabold
                               uppercase tracking-widest text-[#C6A16A] mb-2 sm:mb-3">
                {slide.eyebrow}
              </span>

              <h2 className="font-glacial font-bold text-white leading-tight whitespace-pre-line mb-1.5 sm:mb-2
                             text-base sm:text-2xl lg:text-[2.2rem] xl:text-[2.6rem]">
                {slide.title}
              </h2>

              <p className="text-sm sm:text-lg font-extrabold text-[#C6A16A] mb-0.5 leading-tight">
                {slide.highlight}
              </p>
              <p className="hidden sm:block text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-7 font-medium">
                {slide.subtitle}
              </p>

              <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (slide.href) {
                      router.push(slide.href);
                    } else {
                      scrollToProducts(slide.categorySlug);
                    }
                  }}
                  className="flex items-center gap-1.5
                             px-3 py-2 sm:px-6 sm:py-2.5
                             rounded-full bg-[#C6A16A] hover:bg-[#b59059]
                             text-zinc-950 font-extrabold text-[10px] sm:text-xs
                             transition-all duration-200 shadow-md hover:scale-[1.03]
                             uppercase tracking-wide whitespace-nowrap"
                >
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span>{slide.cta}</span>
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(slide.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5
                             px-3 py-2 sm:px-6 sm:py-2.5
                             rounded-full bg-white/10 hover:bg-white/20
                             text-white font-bold text-[10px] sm:text-xs
                             border border-white/25 hover:border-[#C6A16A]/60
                             transition-all duration-200 whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="flex-1 relative h-full flex items-center justify-center overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 50vw, 35vw"
                className="object-contain object-center scale-90 drop-shadow-[0_8px_40px_rgba(198,161,106,0.18)]"
              />
            </div>

          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-[#C6A16A]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
}

export function HeroBanner() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategorySelect = (slug: string | undefined, _label: string) => {
    setActiveCategory(slug ?? null);
    scrollToProducts(slug);
  };

  return (
    <section
      aria-label="Hero banner"
      className="w-full bg-[#0A0A0A] border-b border-zinc-800"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-3 items-stretch" style={{ minHeight: "clamp(220px, 40vw, 380px)" }}>
          <CategoriesSidebar
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />

          <BannerCarousel />

          <BestsellersSidebar />
        </div>
      </div>
    </section>
  );
}
