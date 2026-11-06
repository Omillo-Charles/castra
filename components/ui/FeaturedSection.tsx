"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Heart,
  Star,
  Truck,
  RefreshCw,
  Gift,
  Headphones,
  Quote,
  Mail,
  ArrowRight,
} from "lucide-react";
import { productApi, type Product } from "@/config/api";
import { WhatsAppIcon } from "@/components/svgicons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { ProductModal } from "@/components/modals/products";
import { scrollToProducts } from "@/lib/scrollToProducts";
import { BlogGrid } from "@/components/ui/BlogSection";

const WHATSAPP_NUMBER = "254704147774";
const PAGE_SIZE = 8;

function formatKES(n: number) {
  return `KSh ${n.toLocaleString("en-KE")}`;
}

function StarRow({ count = 4 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < count ? "fill-[#C6A16A] text-[#C6A16A]" : "fill-zinc-700 text-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}

function FeaturedCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();
  const { addItem } = useCart();
  const router = useRouter();
  const { success, error } = useToast();
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingWish, setTogglingWish] = useState(false);

  const wishlisted = user ? isWishlisted(product.id) : false;
  const imageUrl = product.images?.[0];

  const stars = 4 + (product.id.charCodeAt(0) % 2);

  const waMessage = encodeURIComponent(
    `Hi, I'd like to order *${product.name}* (${formatKES(product.price)}). Is it available?`
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { router.push("/account"); return; }
    setTogglingWish(true);
    try {
      await toggle(product.id);
      success(isWishlisted(product.id) ? "Removed from wishlist." : "Saved to wishlist.");
    } catch (err: unknown) {
      error(err instanceof Error ? err.message : "Failed to update wishlist.");
    } finally { setTogglingWish(false); }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    setAddingToCart(true);
    try {
      await addItem(product.id, 1);
      success(`${product.name} added to cart.`);
    } catch (err: unknown) {
      error(err instanceof Error ? err.message : "Could not add to cart.");
    } finally { setAddingToCart(false); }
  };

  return (
    <article
      onClick={onOpen}
      className="group relative flex flex-col bg-zinc-900 rounded-xl border border-zinc-800
                 hover:border-[#C6A16A]/40 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider
                         bg-[#C6A16A] text-zinc-950 shadow-sm">
          New
        </span>
      </div>

      <button
        type="button"
        onClick={handleWishlist}
        disabled={togglingWish}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-zinc-900/80 border border-zinc-700
                   opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-[#C6A16A]/60"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {togglingWish ? (
          <span className="w-3.5 h-3.5 border-2 border-zinc-300/30 border-t-[#C6A16A] rounded-full animate-spin block" />
        ) : (
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-[#C6A16A] text-[#C6A16A]" : "text-zinc-400"}`} />
        )}
      </button>

      <div className="relative w-full aspect-square bg-zinc-800 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-700">
            <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[10px] font-medium uppercase opacity-60 tracking-wide">Image coming soon</span>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-zinc-900/80 text-zinc-300 text-[10px] font-bold uppercase tracking-wider border border-zinc-700">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0
                        transition-transform duration-300 flex items-center justify-center gap-2 p-2
                        bg-gradient-to-t from-black/80 to-transparent pt-6">
          <button
            type="button"
            disabled={!product.inStock || addingToCart}
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059]
                       text-zinc-950 font-bold text-[10px] disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all shadow-sm uppercase tracking-wide"
          >
            {addingToCart
              ? <span className="w-3 h-3 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
              : <ShoppingBag className="w-3 h-3" />}
            Add to Cart
          </button>

          <a
            href={product.inStock ? waHref : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-disabled={!product.inStock}
            className={`p-1.5 rounded-full border transition-all duration-200 ${
              product.inStock
                ? "border-zinc-600 hover:border-emerald-500/50 hover:bg-emerald-500/10 bg-zinc-900/80"
                : "border-zinc-700 opacity-30 pointer-events-none bg-zinc-900/80"
            }`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="flex flex-col p-3 gap-1">
        <StarRow count={stars} />
        <h3 className="text-xs font-semibold text-zinc-100 leading-snug line-clamp-2 font-glacial mt-0.5">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-bold text-white">{formatKES(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-zinc-500 line-through">{formatKES(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function FeaturedProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const fetchPage = useCallback((p: number) => {
    setLoading(true);
    productApi
      .list({ page: p, limit: PAGE_SIZE })
      .then((res) => {
        setProducts(res.products ?? []);
        setTotalPages(res.pagination?.totalPages ?? 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchPage(1); }, [fetchPage]);

  const prev = () => { if (page > 1) { setPage(p => p - 1); fetchPage(page - 1); } };
  const next = () => { if (page < totalPages) { setPage(p => p + 1); fetchPage(page + 1); } };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="w-1 h-5 rounded-full bg-[#C6A16A]" />
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-white">
            Featured Products
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prev}
            disabled={page <= 1}
            className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700
                       text-zinc-400 hover:text-white hover:border-[#C6A16A] hover:bg-[#C6A16A]/10
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={page >= totalPages}
            className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700
                       text-zinc-400 hover:text-white hover:border-[#C6A16A] hover:bg-[#C6A16A]/10
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="flex flex-col rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden animate-pulse">
              <div className="aspect-square bg-zinc-800" />
              <div className="p-3 space-y-2">
                <div className="h-2.5 w-2/3 rounded-full bg-zinc-800" />
                <div className="h-2.5 w-full rounded-full bg-zinc-800" />
                <div className="h-3 w-1/2 rounded-full bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-500 gap-3">
          <ShoppingBag className="w-10 h-10 opacity-20" />
          <p className="text-sm font-semibold">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((p) => (
            <FeaturedCard
              key={p.id}
              product={p}
              onOpen={() => setModalProduct(p)}
            />
          ))}
        </div>
      )}

      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />

      <DealsBanners />

      <div className="mt-8">
        <BlogGrid />
      </div>
    </div>
  );
}

function PromoBanner() {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-zinc-700/60 cursor-pointer
                 hover:border-[#C6A16A]/50 transition-all duration-300 shadow-md"
      style={{ minHeight: "180px" }}
      onClick={() => scrollToProducts("kitchenware")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && scrollToProducts("kitchenware")}
    >
      <img
        src="/images/categories/kitchenware.png"
        alt="Kitchenware offer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5 py-8 gap-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C6A16A]">
          Kitchenware
        </span>
        <h3 className="font-glacial font-bold text-white text-xl leading-tight">
          Flat <span className="text-[#C6A16A]">50% OFF</span>
        </h3>
        <button
          type="button"
          className="mt-1 px-5 py-2 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950
                     font-extrabold text-[10px] uppercase tracking-widest transition-all
                     hover:scale-[1.03] shadow-md"
          onClick={(e) => { e.stopPropagation(); scrollToProducts("kitchenware"); }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Free Shipping",
    subtitle: "On all orders over KSh 5,000",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Easy Returns",
    subtitle: "100% money back guarantee",
  },
  {
    icon: <Gift className="w-5 h-5" />,
    title: "Special Gift Cards",
    subtitle: "Offer special bonuses",
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    title: "24/7 Support",
    subtitle: "Answer for any question",
  },
] as const;

function ServicesBlock() {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
        <span className="w-1 h-4 rounded-full bg-[#C6A16A]" />
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">
          Our Services
        </h3>
      </div>

      <ul className="divide-y divide-zinc-800/60 bg-zinc-900">
        {SERVICES.map((s) => (
          <li key={s.title} className="flex items-center gap-4 px-4 py-3.5 hover:bg-zinc-800/40 transition-colors group">
            <div className="w-9 h-9 rounded-full bg-[#C6A16A]/10 border border-[#C6A16A]/25
                            flex items-center justify-center flex-shrink-0 text-[#C6A16A]
                            group-hover:bg-[#C6A16A]/20 transition-colors">
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">{s.title}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">{s.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEALS = [
  {
    id: "appliances",
    image: "/images/categories/homeappliances.png",
    eyebrow: "New Collection for Your Home",
    title: "Best Deals on Appliances",
    offer: "From KSh 1,999",
    cta: "Shop Now",
    slug: "home-appliances",
    accentFrom: "#C6A16A",
  },
  {
    id: "kitchenware",
    image: "/images/categories/kitchenware.png",
    eyebrow: "Premium Kitchen Essentials",
    title: "Best Deals on Kitchenware",
    offer: "Up to 40% OFF",
    cta: "Shop Now",
    slug: "kitchenware",
    accentFrom: "#C6A16A",
  },
] as const;

function DealsBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {DEALS.map((deal) => (
        <div
          key={deal.id}
          role="button"
          tabIndex={0}
          onClick={() => scrollToProducts(deal.slug)}
          onKeyDown={(e) => e.key === "Enter" && scrollToProducts(deal.slug)}
          className="relative rounded-xl overflow-hidden border border-zinc-800 cursor-pointer
                     hover:border-[#C6A16A]/50 transition-all duration-300 group"
          style={{ minHeight: "160px" }}
        >
          <img
            src={deal.image}
            alt={deal.title}
            className="absolute inset-0 w-full h-full object-cover object-center
                       group-hover:scale-105 transition-transform duration-500"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.2) 70%, transparent 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col justify-center h-full px-6 py-6 max-w-[60%]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
              {deal.eyebrow}
            </span>
            <h3 className="font-glacial font-bold text-white text-base sm:text-lg leading-snug mb-1">
              {deal.title}
            </h3>
            <p className="text-sm font-extrabold text-[#C6A16A] mb-4">
              {deal.offer}
            </p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); scrollToProducts(deal.slug); }}
              className="self-start flex items-center gap-2 px-5 py-2 rounded-full
                         bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-extrabold
                         text-[10px] uppercase tracking-widest transition-all
                         hover:scale-[1.04] shadow-md"
            >
              {deal.cta}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function useDealCountdown() {
  const getTarget = () => {
    const t = new Date();
    t.setHours(23, 59, 59, 999);
    return t.getTime();
  };

  const calc = () => {
    const diff = Math.max(0, getTarget() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins: Math.floor((diff % 3600000) / 60000),
      secs: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return time;
}

function DealOfTheDay() {
  const { days, hours, mins, secs } = useDealCountdown();
  const [products, setProducts] = useState<Product[]>([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    productApi
      .list({ limit: 5, page: 1 })
      .then((res) => setProducts(res.products?.slice(0, 5) ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const deal = products[idx] ?? null;
  const stars = deal ? 4 + (deal.id.charCodeAt(0) % 2) : 4;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="bg-[#C6A16A] px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950">
          Deal of the Day
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="w-5 h-5 flex items-center justify-center rounded bg-zinc-950/20
                       hover:bg-zinc-950/40 disabled:opacity-30 transition-all"
            aria-label="Previous deal"
          >
            <ChevronLeft className="w-3 h-3 text-zinc-950" />
          </button>
          <button
            type="button"
            onClick={() => setIdx((i) => Math.min(products.length - 1, i + 1))}
            disabled={idx >= products.length - 1}
            className="w-5 h-5 flex items-center justify-center rounded bg-zinc-950/20
                       hover:bg-zinc-950/40 disabled:opacity-30 transition-all"
            aria-label="Next deal"
          >
            <ChevronRight className="w-3 h-3 text-zinc-950" />
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 p-4 space-y-3">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="aspect-square w-full rounded-lg bg-zinc-800" />
            <div className="h-3 w-3/4 bg-zinc-800 rounded-full" />
            <div className="h-3 w-1/2 bg-zinc-800 rounded-full" />
            <div className="h-4 w-1/3 bg-zinc-800 rounded-full" />
          </div>
        ) : deal ? (
          <>
            <div
              className="relative w-full aspect-square rounded-lg bg-zinc-800 overflow-hidden cursor-pointer group"
              onClick={() => setModalProduct(deal)}
            >
              {deal.images?.[0] ? (
                <img
                  src={deal.images[0]}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-zinc-600 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < stars ? "fill-[#C6A16A] text-[#C6A16A]" : "fill-zinc-700 text-zinc-700"}`} />
              ))}
            </div>

            <p
              className="text-xs font-semibold text-zinc-200 leading-snug line-clamp-2 cursor-pointer hover:text-[#C6A16A] transition-colors"
              onClick={() => setModalProduct(deal)}
            >
              {deal.name}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-[#C6A16A]">{formatKES(deal.price)}</span>
              {deal.originalPrice && deal.originalPrice > deal.price && (
                <span className="text-xs text-zinc-500 line-through">{formatKES(deal.originalPrice)}</span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { label: "Days",  val: pad(days) },
                { label: "Hours", val: pad(hours) },
                { label: "Mins",  val: pad(mins) },
                { label: "Secs",  val: pad(secs) },
              ].map(({ label, val }) => (
                <div key={label} className="flex flex-col items-center gap-0.5 bg-zinc-800 rounded-lg py-2">
                  <span className="text-sm font-extrabold text-white tabular-nums leading-none">{val}</span>
                  <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs text-zinc-500 text-center py-4">No deals available</p>
        )}
      </div>

      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}

function RightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-4 w-56 xl:w-64 flex-shrink-0">
      <PromoBanner />
      <ServicesBlock />
      <DealOfTheDay />
      <BrandsBlock
        title="Footwear Brands"
        brands={FOOTWEAR_BRANDS}
        onShop={() => { window.location.href = "/kicks"; }}
      />
    </aside>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Absolutely love the quality of everything I've ordered from Castra. The kitchenware is premium and delivery was super fast!",
    name: "Amina W.",
    role: "Verified Buyer",
  },
  {
    quote:
      "The furniture I got exceeded expectations. Great value for money and the customer support team was so helpful.",
    name: "Brian K.",
    role: "Verified Buyer",
  },
  {
    quote:
      "I've been shopping here for months. Castra Households is hands-down the best home essentials store in Kenya.",
    name: "Sharon M.",
    role: "Verified Buyer",
  },
] as const;

function TestimonialBlock() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="bg-[#C6A16A] px-4 py-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950">
          Testimonial
        </h3>
      </div>

      <div className="bg-zinc-900 p-4 space-y-3">
        <Quote className="w-5 h-5 text-[#C6A16A] opacity-70" />

        <p className="text-xs text-zinc-400 leading-relaxed italic">
          &ldquo;{t.quote}&rdquo;
        </p>

        <div className="flex items-center gap-3 pt-1">
          <div className="w-9 h-9 rounded-full bg-[#C6A16A]/15 border border-[#C6A16A]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-extrabold text-[#C6A16A]">
              {t.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">{t.name}</p>
            <p className="text-[10px] text-zinc-500">{t.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-200 ${
                i === idx ? "w-4 h-2 bg-[#C6A16A]" : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PromoImageBlock() {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-zinc-700/60 cursor-pointer
                 hover:border-[#C6A16A]/50 transition-all duration-300"
      style={{ minHeight: "160px" }}
      onClick={() => scrollToProducts("home-appliances")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && scrollToProducts("home-appliances")}
    >
      <img
        src="/images/categories/homeappliances.png"
        alt="Home Appliances"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block px-3 py-1 rounded bg-[#C6A16A] text-zinc-950 text-[10px] font-extrabold uppercase tracking-widest shadow">
          Home Appliances
        </span>
      </div>
    </div>
  );
}

function LatestBlock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    productApi
      .list({ limit: 4, page: 1 })
      .then((res) => setProducts(res.products?.slice(0, 4) ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="bg-[#C6A16A] px-4 py-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950">
          Latest
        </h3>
      </div>

      <div className="bg-zinc-900 divide-y divide-zinc-800/60">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 w-full bg-zinc-800 rounded-full" />
                  <div className="h-2 w-2/3 bg-zinc-800 rounded-full" />
                  <div className="h-3 w-1/2 bg-zinc-800 rounded-full" />
                </div>
              </div>
            ))
          : products.map((p) => {
              const stars = 4 + (p.id.charCodeAt(0) % 2);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setModalProduct(p)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-zinc-800/50 transition-colors group text-left"
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-zinc-200 line-clamp-1 group-hover:text-[#C6A16A] transition-colors">
                      {p.name}
                    </p>
                    <div className="flex items-center gap-0.5 my-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-2.5 h-2.5 ${i < stars ? "fill-[#C6A16A] text-[#C6A16A]" : "fill-zinc-700 text-zinc-700"}`} />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-[#C6A16A]">{formatKES(p.price)}</p>
                    {p.originalPrice && p.originalPrice > p.price && (
                      <p className="text-[10px] text-zinc-500 line-through leading-none">{formatKES(p.originalPrice)}</p>
                    )}
                  </div>
                </button>
              );
            })}
      </div>

      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}

function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="bg-[#C6A16A] px-4 py-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950">
          Newsletter
        </h3>
      </div>

      <div className="bg-zinc-900 p-4 space-y-3">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#C6A16A]/10 border border-[#C6A16A]/25 flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#C6A16A]" />
          </div>
        </div>
        <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
          Get e-mail updates about our latest shop and special offers.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs
                       text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#C6A16A]
                       transition-colors"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                       bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-extrabold text-xs
                       uppercase tracking-widest transition-all hover:scale-[1.01] shadow-sm"
          >
            Subscribe
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function BrandLogo({ name }: { name: string }) {
  switch (name) {
    case "Nike":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-label="Nike">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z" />
        </svg>
      );
    case "Adidas":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-label="Adidas">
          <path d="m24 19.535-8.697-15.07-4.659 2.687 7.145 12.383Zm-8.287 0L9.969 9.59 5.31 12.277l4.192 7.258ZM4.658 14.723l2.776 4.812H1.223L0 17.41Z" />
        </svg>
      );
    case "Puma":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-label="Puma">
          <path d="M23.845 3.008c-.417-.533-1.146-.106-1.467.08-2.284 1.346-2.621 3.716-3.417 5.077-.626 1.09-1.652 1.89-2.58 1.952-.686.049-1.43-.084-2.168-.405-1.807-.781-2.78-1.792-3.017-1.97-.487-.37-4.23-4.015-7.28-4.164 0 0-.372-.75-.465-.763-.222-.025-.45.451-.616.501-.15.053-.413-.512-.565-.487-.153.02-.302.586-.6.877-.22.213-.486.2-.637.463-.052.096-.034.265-.093.42-.127.32-.551.354-.555.697 0 .381.357.454.669.72.248.212.265.362.554.461.258.088.632-.187.964-.088.277.081.543.14.602.423.054.256 0 .658-.34.613-.112-.015-.598-.174-1.198-.11-.725.077-1.553.309-1.634 1.11-.041.447.514.97 1.055.866.371-.071.196-.506.399-.716.267-.27 1.772.944 3.172.944.593 0 1.031-.15 1.467-.605.04-.029.093-.102.155-.11a.632.632 0 01.195.088c1.131.897 1.984 2.7 6.13 2.721.582.007 1.25.279 1.796.777.48.433.764 1.125 1.037 1.825.418 1.053 1.161 2.069 2.292 3.203.06.068.99.78 1.06.833.012.01.084.167.053.255-.02.69-.123 2.67 1.365 2.753.366.02.275-.231.275-.41-.005-.341-.065-.685.113-1.04.253-.478-.526-.709-.509-1.756.019-.784-.645-.651-.984-1.25-.19-.343-.368-.532-.35-.946.073-2.38-.517-3.948-.805-4.327-.227-.294-.423-.403-.207-.54 1.24-.815 1.525-1.574 1.525-1.574.66-1.541 1.256-2.945 2.075-3.57.166-.12.589-.44.852-.56.763-.362 1.173-.578 1.388-.788.356-.337.635-1.053.294-1.48z" />
        </svg>
      );
    case "Reebok":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-label="Reebok">
          <path d="M14.991 11.48C17.744 10.38 19.458 9.748 24 8.64c-2.467.163-7.922.537-11.682 1.271l2.673 1.57m-8.56 3.651h3.6c.713-1.08 1.422-1.606 2.248-2.191a71.382 71.382 0 00-1.892-.701c-2.297 1.014-3.575 2.375-3.953 2.892m.709-3.928c-3.21 1.147-4.994 2.393-6.199 3.928h3.975c.387-.539 1.862-2.093 4.633-3.174a57.092 57.092 0 00-2.41-.754M8.79 8.788H0c8.862 1.6 13.133 3.66 20 6.572-.587-.439-10.051-6.013-11.209-6.572" />
        </svg>
      );
    case "Fila":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-label="Fila">
          <path d="M8.814 8.027c-.614 0-1.113.498-1.113 1.113v5.72a1.113 1.113 0 0 0 2.226 0V9.14c0-.614-.498-1.113-1.113-1.113m-2.849.078H1.113a1.113 1.113 0 0 0 0 2.226h4.852a1.113 1.113 0 0 0 0-2.226m17.411 4.417L21.03 8.705c-.275-.444-.65-.658-1.125-.658-.488 0-.904.229-1.162.658l-2.715 4.5c-.186.308-.4.436-.753.436h-2.019a.275.275 0 0 1-.285-.284V9.102c0-.613-.497-1.075-1.11-1.075-.614 0-1.11.463-1.11 1.076v5.215c0 .784.774 1.544 1.544 1.544h4.064c.576 0 .963-.42 1.292-.996l2.114-3.627c.018-.04.053-.091.093-.091.043 0 .07.051.091.088l1.384 2.22c.058.094.069.141.032.225-.033.077-.108.093-.23.093h-1.943a1.044 1.044 0 1 0 0 2.088h3.17c.77 0 1.638-.734 1.638-1.693 0-.608-.117-.822-.624-1.647M5.431 10.954H1.113c-.615 0-1.113.498-1.113 1.113v2.715a1.113 1.113 0 1 0 2.226 0v-1.268c0-.185.15-.334.334-.334h2.87a1.113 1.113 0 0 0 0-2.226" />
        </svg>
      );
    case "Vans":
      return (
        <svg viewBox="0 0 56 24" className="w-full h-full" fill="currentColor" aria-label="Vans">
          <text x="2" y="19" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="18" fontStyle="italic">VANS</text>
        </svg>
      );
    case "Ramtons":
      return (
        <svg viewBox="0 0 90 24" className="w-full h-full" fill="currentColor" aria-label="Ramtons">
          <text x="2" y="18" fontFamily="Georgia, serif" fontWeight="700" fontSize="14">Ramtons</text>
        </svg>
      );
    case "Hotpoint":
      return (
        <svg viewBox="0 0 92 24" className="w-full h-full" fill="currentColor" aria-label="Hotpoint">
          <text x="1" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.5">HOTPOINT</text>
        </svg>
      );
    case "Arshia":
      return (
        <svg viewBox="0 0 74 24" className="w-full h-full" fill="currentColor" aria-label="Arshia">
          <text x="2" y="18" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" letterSpacing="1">ARSHIA</text>
        </svg>
      );
    case "Von":
      return (
        <svg viewBox="0 0 50 24" className="w-full h-full" fill="currentColor" aria-label="Von">
          <text x="2" y="20" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20">VON</text>
        </svg>
      );
    case "Bruhm":
      return (
        <svg viewBox="0 0 72 24" className="w-full h-full" fill="currentColor" aria-label="Bruhm">
          <text x="2" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="14" letterSpacing="1">BRUHM</text>
        </svg>
      );
    case "Nunix":
      return (
        <svg viewBox="0 0 72 24" className="w-full h-full" fill="currentColor" aria-label="Nunix">
          <text x="2" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="14" letterSpacing="1">NUNIX</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 80 24" className="w-full h-full" fill="currentColor">
          <text x="2" y="18" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13">{name}</text>
        </svg>
      );
  }
}

const HOUSEHOLD_BRANDS = ["Ramtons", "Hotpoint", "Arshia", "Von", "Bruhm", "Nunix"] as const;
const FOOTWEAR_BRANDS  = ["Nike", "Adidas", "Puma", "Vans", "Reebok", "Fila"] as const;

function BrandsBlock({
  title,
  brands,
  onShop,
}: {
  title: string;
  brands: readonly string[];
  onShop: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="bg-[#C6A16A] px-4 py-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950">{title}</h3>
      </div>
      <div className="bg-zinc-900 p-3 grid grid-cols-2 gap-2">
        {brands.map((name) => (
          <button
            key={name}
            type="button"
            onClick={onShop}
            aria-label={name}
            className="flex items-center justify-center h-14 px-2 rounded-lg border border-zinc-800
                       hover:border-[#C6A16A]/50 hover:bg-[#C6A16A]/5 transition-all duration-200
                       text-zinc-400 hover:text-[#C6A16A]"
          >
            <BrandLogo name={name} />
          </button>
        ))}
      </div>
    </div>
  );
}

function LeftSidebar() {
  return (
    <aside className="hidden xl:flex flex-col gap-4 w-52 flex-shrink-0">
      <TestimonialBlock />
      <PromoImageBlock />
      <LatestBlock />
      <NewsletterBlock />
      <BrandsBlock
        title="Household Brands"
        brands={HOUSEHOLD_BRANDS}
        onShop={() => scrollToProducts(undefined)}
      />
    </aside>
  );
}

function ShippingBanner() {
  return (
    <div className="w-full mt-8 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm font-extrabold text-white uppercase tracking-wide whitespace-nowrap">
          🚚 Get Free Shipping Today
        </p>

        <p className="text-xs text-zinc-400 text-center flex-1">
          Valid on all Orders Above KES 30000
        </p>

        <button
          type="button"
          onClick={() => scrollToProducts(undefined)}
          className="flex-shrink-0 px-6 py-2.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059]
                     text-zinc-950 font-extrabold text-xs uppercase tracking-widest
                     transition-all hover:scale-[1.03] shadow-md whitespace-nowrap"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export function FeaturedSection() {
  return (
    <section
      aria-label="Featured products"
      className="w-full bg-[#0A0A0A] border-b border-zinc-800"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-5 items-start">
          <LeftSidebar />

          <FeaturedProductsGrid />

          <RightSidebar />
        </div>

        <ShippingBanner />
      </div>
    </section>
  );
}
