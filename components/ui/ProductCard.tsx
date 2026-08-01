"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/config/api";
import { WhatsAppIcon } from "@/components/svgicons";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const WHATSAPP_NUMBER = "254704147774";

function formatKES(amount: number) {
    return `KSh ${amount.toLocaleString("en-KE")}`;
}

export function ProductCard({ product }: { product: Product }) {
    const { user } = useAuth();
    const { isWishlisted, toggle } = useWishlist();
    const { addItem } = useCart();
    const router = useRouter();
    const { success, error } = useToast();

    const [addingToCart, setAddingToCart] = useState(false);
    const [togglingWish, setTogglingWish] = useState(false);

    const wishlisted = user ? isWishlisted(product.id) : false;

    const handleWishlist = async () => {
        if (!user) {
            router.push("/account");
            return;
        }
        setTogglingWish(true);
        try {
            await toggle(product.id);
            if (isWishlisted(product.id)) {
                success("Removed from wishlist.");
            } else {
                success("Saved to wishlist.");
            }
        } catch (err: unknown) {
            error(err instanceof Error ? err.message : "Failed to update wishlist.");
        } finally {
            setTogglingWish(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product.inStock) return;
        setAddingToCart(true);
        try {
            await addItem(product.id, 1);
            success(`${product.name} added to cart.`);
        } catch (err: unknown) {
            error(err instanceof Error ? err.message : "Could not add item to cart.");
        } finally {
            setAddingToCart(false);
        }
    };

    const waMessage = encodeURIComponent(
        `Hi, I'd like to order *${product.name}* (${formatKES(product.price)}). Is it available?`
    );
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
    const imageUrl = product.images?.[0];

    return (
        <article className="group relative flex flex-col bg-[#171717] rounded-2xl border border-zinc-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#C6A16A]/40 transition-all duration-300">

            {/* Image area */}
            <div className="relative w-full aspect-square bg-zinc-900 overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-700">
                        <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span className="text-[10px] font-medium tracking-wide uppercase opacity-60">
                            Image coming soon
                        </span>
                    </div>
                )}

                {/* Hover shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Out of stock overlay */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-zinc-900/80 text-zinc-300 text-xs font-semibold uppercase tracking-wider border border-zinc-700">
                            Out of Stock
                        </span>
                    </div>
                )}

                {/* Wishlist button */}
                <button
                    type="button"
                    onClick={handleWishlist}
                    disabled={togglingWish}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 bg-zinc-900/90 border border-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-[#C6A16A]/60 hover:scale-110 disabled:cursor-not-allowed"
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {togglingWish ? (
                        <span className="w-4 h-4 border-2 border-zinc-300/30 border-t-[#C6A16A] rounded-full animate-spin block" />
                    ) : (
                        <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-[#C6A16A] text-[#C6A16A]" : "text-zinc-400"
                            }`} />
                    )}
                </button>
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C6A16A]">
                    {product.category}
                </span>

                <h3 className="text-sm font-semibold text-zinc-100 leading-snug line-clamp-2 font-glacial">
                    {product.name}
                </h3>

                <div className="flex-1" />

                <div className="flex flex-col mt-1">
                    <span className="text-base font-bold text-white">
                        {formatKES(product.price)}
                    </span>
                </div>

                {/* Action buttons — stacked on mobile, row on sm+ */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                    <button
                        type="button"
                        disabled={!product.inStock || addingToCart}
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-[#C6A16A] hover:text-zinc-950 hover:text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                        aria-label="Add to cart"
                    >
                        {addingToCart ? (
                            <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        ) : (
                            <ShoppingBag className="w-3.5 h-3.5" />
                        )}
                        <span>Add to Cart</span>
                    </button>

                    <a
                        href={product.inStock ? waHref : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Order via WhatsApp"
                        aria-disabled={!product.inStock}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border transition-all duration-200 shadow-sm
                          w-full p-2 text-xs font-bold sm:w-auto sm:flex-shrink-0 sm:p-2 sm:text-transparent
                          ${product.inStock
                                ? "border-zinc-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 sm:hover:scale-110"
                                : "border-zinc-800 opacity-30 cursor-not-allowed pointer-events-none"
                            }`}
                    >
                        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                        <span className="sm:hidden text-emerald-400">WhatsApp</span>
                    </a>
                </div>
            </div>
        </article>
    );
}
