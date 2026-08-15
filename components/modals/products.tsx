"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Heart, ShoppingBag, Truck, Check, AlertCircle, Minus, Plus } from "lucide-react";
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

export type ProductModalProps = {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
};

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { user } = useAuth();
    const { isWishlisted, toggle } = useWishlist();
    const { addItem } = useCart();
    const router = useRouter();
    const { success, error } = useToast();

    const [selectedImgIndex, setSelectedImgIndex] = useState(0);
    const [qty, setQty] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [togglingWish, setTogglingWish] = useState(false);

    // Reset image selection and quantity when opening a new product
    useEffect(() => {
        if (isOpen) {
            setSelectedImgIndex(0);
            setQty(1);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, product?.id]);

    // Handle ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const wishlisted = user ? isWishlisted(product.id) : false;
    const images = product.images && product.images.length > 0 ? product.images : [];
    const activeImage = images[selectedImgIndex] || null;

    const handleWishlist = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            onClose();
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

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!product.inStock) return;
        setAddingToCart(true);
        try {
            await addItem(product.id, qty);
            success(`${qty} × ${product.name} added to cart.`);
        } catch (err: unknown) {
            error(err instanceof Error ? err.message : "Could not add item to cart.");
        } finally {
            setAddingToCart(false);
        }
    };

    const waMessage = encodeURIComponent(
        `Hi, I'd like to order *${product.name}* (Qty: ${qty}, Total: ${formatKES(product.price * qty)}). Is it available?`
    );
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl bg-[#141414] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-auto animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-700/60 hover:border-zinc-500 transition-all shadow-md cursor-pointer"
                    aria-label="Close modal"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 p-5 sm:p-7 gap-6 sm:gap-8 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">

                    {/* Left: Product Images Gallery */}
                    <div className="flex flex-col gap-3">
                        <div className="relative w-full aspect-square bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-inner flex items-center justify-center">
                            {activeImage ? (
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-zinc-700">
                                    <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="M21 15l-5-5L5 21" />
                                    </svg>
                                    <span className="text-xs uppercase font-medium">Image coming soon</span>
                                </div>
                            )}

                            {!product.inStock && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="px-4 py-2 rounded-full bg-zinc-900/90 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-zinc-700">
                                        Out of Stock
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Selector */}
                        {images.length > 1 && (
                            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSelectedImgIndex(idx)}
                                        className={`relative w-16 h-16 rounded-xl border overflow-hidden flex-shrink-0 transition-all ${
                                            selectedImgIndex === idx
                                                ? "border-[#C6A16A] ring-2 ring-[#C6A16A]/30 scale-105"
                                                : "border-zinc-800 opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Details & Purchase Actions */}
                    <div className="flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16A]">
                                    {product.category}
                                </span>
                                <span
                                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                        product.inStock
                                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                            : "text-red-400 bg-red-500/10 border-red-500/20"
                                    }`}
                                >
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold font-glacial text-white leading-snug">
                                {product.name}
                            </h2>

                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-extrabold text-white font-glacial">
                                    {formatKES(product.price)}
                                </span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <span className="text-sm font-semibold text-zinc-500 line-through">
                                        {formatKES(product.originalPrice)}
                                    </span>
                                )}
                            </div>

                            {product.deliveryFee > 0 && (
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Truck className="w-3.5 h-3.5 text-[#C6A16A]" />
                                    <span>Standard Delivery Fee: <strong className="text-zinc-200">{formatKES(product.deliveryFee)}</strong></span>
                                </div>
                            )}

                            <div className="h-px bg-zinc-800 my-3" />

                            {/* Full Description Section */}
                            <div className="space-y-1.5">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Product Description
                                </h4>
                                <div className="text-sm text-zinc-300 leading-relaxed space-y-2 whitespace-pre-line max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                                    {product.description ? (
                                        <p>{product.description}</p>
                                    ) : (
                                        <p className="text-zinc-500 italic text-xs">
                                            No detailed description provided for this product.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                            {/* Quantity Selector */}
                            {product.inStock && (
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-400">Quantity</span>
                                    <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setQty(Math.max(1, qty - 1)); }}
                                            className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="px-4 py-1.5 text-xs font-bold text-white min-w-[32px] text-center">
                                            {qty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setQty(Math.min(product.stock || 99, qty + 1)); }}
                                            className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                                <button
                                    type="button"
                                    disabled={!product.inStock || addingToCart}
                                    onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-bold hover:bg-[#C6A16A] hover:text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer"
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
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label="Order via WhatsApp"
                                    aria-disabled={!product.inStock}
                                    className={`flex items-center justify-center gap-1.5 rounded-xl border transition-all duration-200 shadow-sm
                                      w-full p-2.5 text-xs font-bold sm:w-auto sm:flex-shrink-0 sm:p-2.5 sm:text-transparent
                                      ${product.inStock
                                            ? "border-zinc-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 sm:hover:scale-110"
                                            : "border-zinc-800 opacity-30 cursor-not-allowed pointer-events-none"
                                        }`}
                                >
                                    <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                                    <span className="sm:hidden text-emerald-400">WhatsApp</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={handleWishlist}
                                    disabled={togglingWish}
                                    className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-[#C6A16A] hover:border-[#C6A16A]/50 transition-all flex items-center justify-center flex-shrink-0 cursor-pointer"
                                    title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                                >
                                    {togglingWish ? (
                                        <span className="w-4 h-4 border-2 border-zinc-400/20 border-t-[#C6A16A] rounded-full animate-spin block" />
                                    ) : (
                                        <Heart className={`w-4 h-4 ${wishlisted ? "fill-[#C6A16A] text-[#C6A16A]" : ""}`} />
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
