"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Footprints, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { productApi, type Product } from "@/config/api";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Heart } from "lucide-react";
import { WhatsAppIcon } from "@/components/svgicons";

const WHATSAPP_NUMBER = "254704147774";
const PER_PAGE = 8;

function formatKES(n: number) { return `KSh ${n.toLocaleString("en-KE")}`; }

/* ── Minimal product card for the kicks page ── */
function KickCard({ product }: { product: Product }) {
    const { user } = useAuth();
    const { addItem } = useCart();
    const { isWishlisted, toggle } = useWishlist();

    const [addingToCart, setAddingToCart] = useState(false);
    const [togglingWish, setTogglingWish] = useState(false);

    const wishlisted = user ? isWishlisted(product.id) : false;

    const handleCart = async () => {
        if (!product.inStock) return;
        setAddingToCart(true);
        try { await addItem(product.id, 1); } finally { setAddingToCart(false); }
    };

    const handleWish = async () => {
        if (!user) return;
        setTogglingWish(true);
        try { await toggle(product.id); } finally { setTogglingWish(false); }
    };

    const waMsg = encodeURIComponent(
        `Hi, I'd like to order *${product.name}* (${formatKES(product.price)}). Is it available?`
    );

    return (
        <article className="group flex flex-col bg-[#171717] rounded-2xl border border-zinc-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#C6A16A]/40 transition-all duration-300">

            {/* Image */}
            <div className="relative w-full aspect-square bg-zinc-900 overflow-hidden">
                {product.images[0] ? (
                    <img src={product.images[0]} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-700">
                        <Footprints className="w-12 h-12 opacity-30" />
                        <span className="text-[10px] font-medium tracking-wide uppercase opacity-50">Image coming soon</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-zinc-900/80 text-zinc-300 text-xs font-semibold uppercase tracking-wider border border-zinc-700">
                            Out of Stock
                        </span>
                    </div>
                )}

                {/* Wishlist */}
                <button type="button" onClick={handleWish} disabled={togglingWish}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 bg-zinc-900/90 border border-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed"
                    aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}>
                    {togglingWish
                        ? <span className="w-4 h-4 border-2 border-zinc-300/30 border-t-[#C6A16A] rounded-full animate-spin block" />
                        : <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-[#C6A16A] text-[#C6A16A]" : "text-zinc-400"}`} />
                    }
                </button>
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                <h3 className="text-sm font-semibold text-zinc-100 leading-snug line-clamp-2 font-glacial">
                    {product.name}
                </h3>
                <div className="flex-1" />
                <span className="text-base font-bold text-white">{formatKES(product.price)}</span>

                <div className="flex items-center gap-2 mt-1">
                    <button type="button" disabled={!product.inStock || addingToCart} onClick={handleCart}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-[#C6A16A] hover:text-zinc-950 hover:text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm">
                        {addingToCart
                            ? <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                            : <ShoppingBag className="w-3.5 h-3.5" />
                        }
                        <span>Add to Cart</span>
                    </button>
                    <a href={product.inStock ? `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}` : undefined}
                        target="_blank" rel="noopener noreferrer"
                        aria-disabled={!product.inStock}
                        className={`flex items-center justify-center p-2 rounded-xl border transition-all duration-200 flex-shrink-0 ${product.inStock
                                ? "border-zinc-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:scale-110"
                                : "border-zinc-800 opacity-30 pointer-events-none"
                            }`}>
                        <WhatsAppIcon className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </article>
    );
}

/* ── Page ── */
export default function KicksPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchPage = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const res = await productApi.list({ category: "kicks", page, limit: PER_PAGE });
            setProducts(res.products);
            setTotalPages(res.pagination.totalPages);
            setTotal(res.pagination.total);
        } catch {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPage(currentPage); }, [currentPage, fetchPage]);

    const goTo = (page: number) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentPage(page);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Footprints className="w-5 h-5 text-[#C6A16A]" />
                        <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A]">Castra Collection</p>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-mulish font-black text-white leading-tight">
                        Castra Kicks
                    </h1>
                    <p className="text-sm text-zinc-400 mt-2">
                        Premium footwear, curated for every step.
                        {!loading && total > 0 && <span className="ml-1 text-zinc-400">{total} style{total !== 1 ? "s" : ""} available.</span>}
                    </p>
                </div>
                <Link href="/" className="text-xs font-semibold text-zinc-400 hover:text-[#C6A16A] transition-colors self-start sm:self-auto">
                    ← Back to Home
                </Link>
            </div>

            {/* Grid or loading */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {Array.from({ length: PER_PAGE }).map((_, i) => (
                        <div key={i} className="rounded-2xl bg-zinc-900 aspect-square animate-pulse" />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-400">
                    <Footprints className="w-16 h-16 opacity-20" />
                    <p className="text-sm font-semibold">No kicks available right now</p>
                    <p className="text-xs text-zinc-400">Check back soon - new styles drop regularly.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {products.map((p) => (
                        <KickCard key={p.id} product={p} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
                <div className="flex items-center justify-center gap-2 mt-12">
                    <button type="button" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}
                        className="p-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} type="button" onClick={() => goTo(page)}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${page === currentPage
                                    ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                    : "border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A]"
                                }`}>
                            {page}
                        </button>
                    ))}

                    <button type="button" onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages}
                        className="p-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

        </div>
    );
}
