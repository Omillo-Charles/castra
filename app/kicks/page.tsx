"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Footprints, ChevronLeft, ChevronRight } from "lucide-react";
import { productApi, type Product } from "@/config/api";
import { ProductCard } from "@/components/ui/ProductCard";

const PER_PAGE = 8;

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
                        <ProductCard key={p.id} product={p} />
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
