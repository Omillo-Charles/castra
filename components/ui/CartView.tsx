"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/svgicons";

const WHATSAPP_NUMBER = "254704147774";

type CartItem = {
    id: string;
    name: string;
    category: string;
    price: number;
    qty: number;
};

const INITIAL_ITEMS: CartItem[] = [
    {
        id: "c1",
        name: "Non-Stick Cookware Set 8pc",
        category: "Kitchenware",
        price: 6400,
        qty: 1,
    },
];

function formatKES(n: number) {
    return `KSh ${n.toLocaleString("en-KE")}`;
}

export function CartView() {
    const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
    const [coupon, setCoupon] = useState("");

    const updateQty = (id: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
                .filter((i) => i.qty > 0)
        );
    };

    const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

    const subtotal  = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const delivery  = subtotal > 0 ? 350 : 0;
    const total     = subtotal + delivery;

    const waOrderSummary = items
        .map((i) => `• ${i.name} x${i.qty} — ${formatKES(i.price * i.qty)}`)
        .join("\n");
    const waMsg = encodeURIComponent(
        `Hi, I'd like to place an order:\n\n${waOrderSummary}\n\nSubtotal: ${formatKES(subtotal)}\nDelivery: ${formatKES(delivery)}\n*Total: ${formatKES(total)}*\n\nPlease confirm availability.`
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
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-[#C6A16A] transition-colors"
                >
                    Continue shopping <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-400">
                    <ShoppingBag className="w-14 h-14 opacity-20" />
                    <p className="text-sm font-semibold">Your cart is empty</p>
                    <Link
                        href="/"
                        className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] text-zinc-950 font-bold text-xs hover:bg-[#b59059] transition-colors"
                    >
                        Browse Products <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── Cart items ── */}
                    <div className="flex-1 space-y-4 w-full">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-5 p-5 bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-[#C6A16A]/30 transition-all duration-200"
                            >
                                {/* Image placeholder */}
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                    <svg className="w-8 h-8 text-zinc-300 dark:text-zinc-700 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="M21 15l-5-5L5 21" />
                                    </svg>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A16A] mb-0.5">
                                        {item.category}
                                    </p>
                                    <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 font-glacial leading-snug">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-zinc-400 mt-0.5">{formatKES(item.price)} each</p>
                                    <p className="text-base font-bold text-zinc-900 dark:text-white mt-1">
                                        {formatKES(item.price * item.qty)}
                                    </p>
                                </div>

                                {/* Qty + remove */}
                                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                                    {/* Quantity stepper */}
                                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-0.5">
                                        <button
                                            type="button"
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-zinc-900 dark:text-white">
                                            {item.qty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => remove(item.id)}
                                        className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all duration-200"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
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
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                                        <Tag className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                            placeholder="Coupon code"
                                            className="flex-1 bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="px-3 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold hover:bg-[#C6A16A] dark:hover:bg-[#C6A16A] dark:hover:text-zinc-950 hover:text-zinc-950 transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>

                                {/* Line items */}
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                                        <span>Subtotal</span>
                                        <span>{formatKES(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                                        <span className="flex items-center gap-1.5">
                                            <Truck className="w-3.5 h-3.5" /> Delivery
                                        </span>
                                        <span>{formatKES(delivery)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                        <span>Total</span>
                                        <span className="text-[#C6A16A]">{formatKES(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pb-6 space-y-3">
                                {/* Checkout button */}
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                </button>

                                {/* WhatsApp order entire cart */}
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-200 text-sm font-bold text-zinc-700 dark:text-zinc-300"
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                    Order via WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Delivery note */}
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
