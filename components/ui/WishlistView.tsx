"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/svgicons";

const WHATSAPP_NUMBER = "254704147774";

type WishItem = {
    id: string;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
};

const INITIAL_ITEMS: WishItem[] = [
    {
        id: "w1",
        name: "Egyptian Cotton Duvet Set",
        category: "Beddings",
        price: 4800,
        inStock: true,
    },
];

function formatKES(n: number) {
    return `KSh ${n.toLocaleString("en-KE")}`;
}

export function WishlistView() {
    const [items, setItems] = useState<WishItem[]>(INITIAL_ITEMS);

    const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

    return (
        <div className="space-y-8">

            {/* Page header */}
            <div className="flex items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">My Account</p>
                    <h1 className="text-3xl font-bold font-glacial text-zinc-900 dark:text-white flex items-center gap-3">
                        <Heart className="w-7 h-7 text-[#C6A16A]" />
                        Wishlist
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        {items.length} saved item{items.length !== 1 ? "s" : ""}
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
                    <Heart className="w-14 h-14 opacity-20" />
                    <p className="text-sm font-semibold">Your wishlist is empty</p>
                    <Link
                        href="/"
                        className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] text-zinc-950 font-bold text-xs hover:bg-[#b59059] transition-colors"
                    >
                        Browse Products <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
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
                                <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 font-glacial leading-snug truncate">
                                    {item.name}
                                </h3>
                                <p className="text-base font-bold text-zinc-900 dark:text-white mt-1">
                                    {formatKES(item.price)}
                                </p>
                                <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                    item.inStock
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                                }`}>
                                    {item.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
                                <button
                                    type="button"
                                    disabled={!item.inStock}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold hover:bg-[#C6A16A] dark:hover:bg-[#C6A16A] dark:hover:text-zinc-950 hover:text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
                                >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Add to Cart</span>
                                </button>

                                <a
                                    href={item.inStock
                                        ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'd like to order *${item.name}* (${formatKES(item.price)}). Is it available?`)}`
                                        : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-disabled={!item.inStock}
                                    className={`flex items-center justify-center p-2.5 rounded-xl border transition-all duration-200 ${
                                        item.inStock
                                            ? "border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:scale-110"
                                            : "border-zinc-200 dark:border-zinc-800 opacity-30 pointer-events-none"
                                    }`}
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                </a>

                                <button
                                    type="button"
                                    onClick={() => remove(item.id)}
                                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all duration-200"
                                    aria-label="Remove from wishlist"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
