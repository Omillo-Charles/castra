"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/svgicons";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const WHATSAPP_NUMBER = "254704147774";

function formatKES(n: number) {
    return `KSh ${n.toLocaleString("en-KE")}`;
}

export function CartView() {
    const { cart, loading, updateItem, removeItem, applyCoupon } = useCart();
    const { error, success } = useToast();
    const router = useRouter();

    const [coupon, setCoupon] = useState("");
    const [couponMsg, setCouponMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [applyingCoupon, setApplyingCoupon] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const items       = cart?.items ?? [];
    const subtotal    = cart?.subtotal ?? 0;
    const discount    = cart?.discount ?? 0;
    const total       = cart?.total ?? 0;

    const handleQtyChange = async (productId: string, delta: number, currentQty: number) => {
        const newQty = currentQty + delta;
        setUpdatingId(productId);
        try {
            await updateItem(productId, newQty);
        } catch (err: unknown) {
            error(err instanceof Error ? err.message : "Could not update quantity.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleRemove = async (productId: string) => {
        setUpdatingId(productId);
        try {
            await removeItem(productId);
            success("Item removed from cart.");
        } catch (err: unknown) {
            error(err instanceof Error ? err.message : "Could not remove item.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleApplyCoupon = async () => {
        if (!coupon.trim()) return;
        setApplyingCoupon(true);
        setCouponMsg(null);
        const res = await applyCoupon(coupon.trim());
        setCouponMsg({ type: res.success ? "ok" : "err", text: res.message });
        setApplyingCoupon(false);
    };

    const waOrderSummary = items
        .map((i) => `• ${i.product.name} x${i.qty} — ${formatKES(i.product.price * i.qty)}`)
        .join("\n");
    const waMsg = encodeURIComponent(
        `Hi, I'd like to place an order:\n\n${waOrderSummary}\n\nSubtotal: ${formatKES(subtotal)}\n*Total (Items): ${formatKES(total)}*\n*(Delivery charges excluded - will be communicated via email/WhatsApp)*\n\nPlease confirm availability.`
    );

    // Loading state
    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <span className="w-7 h-7 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-8">

            {/* Page header */}
            <div className="flex items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Checkout</p>
                    <h1 className="text-3xl font-bold font-glacial text-zinc-900 dark:text-white flex items-center gap-3">
                        <ShoppingBag className="w-7 h-7 text-[#C6A16A]" />
                        My Cart
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        {items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}
                    </p>
                </div>
                <Link href="/"
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-[#C6A16A] transition-colors">
                    Continue shopping <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-400">
                    <ShoppingBag className="w-14 h-14 opacity-20" />
                    <p className="text-sm font-semibold">Your cart is empty</p>
                    <Link href="/"
                        className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] text-zinc-950 font-bold text-xs hover:bg-[#b59059] transition-colors">
                        Browse Products <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── Cart items ── */}
                    <div className="flex-1 space-y-4 w-full">
                        {items.map((item) => {
                            const busy = updatingId === item.productId;
                            return (
                                <div key={item.id}
                                    className={`flex items-center gap-5 p-5 bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-[#C6A16A]/30 transition-all duration-200 ${busy ? "opacity-60" : ""}`}>

                                    {/* Product image */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                        {item.product.images[0] ? (
                                            <img src={item.product.images[0]} alt={item.product.name}
                                                className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-zinc-300 dark:text-zinc-700 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <path d="M21 15l-5-5L5 21" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A16A] mb-0.5">
                                            {item.product.category}
                                        </p>
                                        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 font-glacial leading-snug">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm text-zinc-400 mt-0.5">{formatKES(item.product.price)} each</p>
                                        <p className="text-base font-bold text-zinc-900 dark:text-white mt-1">
                                            {formatKES(item.product.price * item.qty)}
                                        </p>
                                    </div>

                                    {/* Qty + remove */}
                                    <div className="flex flex-col items-center gap-3 flex-shrink-0">
                                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-0.5">
                                            <button type="button" disabled={busy}
                                                onClick={() => handleQtyChange(item.productId, -1, item.qty)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all disabled:cursor-not-allowed">
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold text-zinc-900 dark:text-white">
                                                {item.qty}
                                            </span>
                                            <button type="button" disabled={busy}
                                                onClick={() => handleQtyChange(item.productId, 1, item.qty)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all disabled:cursor-not-allowed">
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <button type="button" disabled={busy}
                                            onClick={() => handleRemove(item.productId)}
                                            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all duration-200 disabled:cursor-not-allowed"
                                            aria-label="Remove item">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Order summary ── */}
                    <div className="w-full lg:w-80 flex-shrink-0 space-y-4 sticky top-24">
                        <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

                            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                                <h2 className="text-sm font-bold text-zinc-900 dark:text-white font-glacial uppercase tracking-wide">
                                    Order Summary
                                </h2>
                            </div>

                            <div className="px-6 py-5 space-y-3">
                                {/* Coupon */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                                            <Tag className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                                            <input type="text" value={coupon}
                                                onChange={(e) => { setCoupon(e.target.value); setCouponMsg(null); }}
                                                placeholder="Coupon code"
                                                className="flex-1 bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none" />
                                        </div>
                                        <button type="button" onClick={handleApplyCoupon} disabled={applyingCoupon}
                                            className="px-3 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold hover:bg-[#C6A16A] dark:hover:bg-[#C6A16A] dark:hover:text-zinc-950 hover:text-zinc-950 transition-all disabled:opacity-50">
                                            {applyingCoupon ? "..." : "Apply"}
                                        </button>
                                    </div>
                                    {couponMsg && (
                                        <p className={`text-xs font-semibold ${couponMsg.type === "ok" ? "text-emerald-500" : "text-red-500"}`}>
                                            {couponMsg.text}
                                        </p>
                                    )}
                                </div>

                                {/* Line items */}
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                                        <span>Subtotal</span><span>{formatKES(subtotal)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-emerald-500">
                                            <span>Discount</span><span>−{formatKES(discount)}</span>
                                        </div>
                                    )}
                                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
                                        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                                            <span className="flex items-center gap-1.5 font-medium"><Truck className="w-3.5 h-3.5 text-[#C6A16A]" /> Delivery Fee:</span>
                                            <span className="font-semibold text-amber-600 dark:text-amber-400">Excluded</span>
                                        </div>
                                        <p className="text-[11px] leading-snug text-zinc-400 dark:text-zinc-500 italic">
                                            Delivery charges are excluded and will be communicated directly via email or WhatsApp.
                                        </p>
                                    </div>
                                    <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                        <span>Total</span>
                                        <span className="text-[#C6A16A]">{formatKES(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pb-6 space-y-3">
                                <button type="button" onClick={() => router.push("/checkout")}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg">
                                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                </button>
                                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-200 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                    <WhatsAppIcon className="w-5 h-5" />
                                    Order via WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#C6A16A]/8 border border-[#C6A16A]/20 text-xs text-zinc-600 dark:text-zinc-400">
                            <Truck className="w-4 h-4 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                            <span>Countrywide delivery across Kenya. Estimated 2–5 business days after confirmation.</span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
