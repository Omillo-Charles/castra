"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { DUMMY_PRODUCTS, CATEGORIES_LIST, PRODUCTS_PER_PAGE } from "@/lib/dummyProducts";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductGrid() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage]         = useState(1);
    const [sortBy, setSortBy]                   = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

    // Sync active category from URL param (set by navbar scroll helper)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cat    = params.get("category");
        if (!cat) return;
        // Match slug back to display name
        const match = CATEGORIES_LIST.find(
            (c) => c.toLowerCase().replace(/\s+/g, "-") === cat
        );
        if (match) setActiveCategory(match);
    }, []);

    // Also react when the URL changes via navbar clicks (popstate / replaceState)
    useEffect(() => {
        const onUrlChange = () => {
            const params = new URLSearchParams(window.location.search);
            const cat    = params.get("category");
            if (!cat) { setActiveCategory("All"); return; }
            const match = CATEGORIES_LIST.find(
                (c) => c.toLowerCase().replace(/\s+/g, "-") === cat
            );
            if (match) { setActiveCategory(match); setCurrentPage(1); }
        };
        window.addEventListener("popstate", onUrlChange);
        return () => window.removeEventListener("popstate", onUrlChange);
    }, []);

    const filtered = useMemo(() => {
        let list = activeCategory === "All"
            ? DUMMY_PRODUCTS
            : DUMMY_PRODUCTS.filter((p) => p.category === activeCategory);

        if (sortBy === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
        if (sortBy === "rating")     list = [...list].sort((a, b) => b.rating - a.rating);

        return list;
    }, [activeCategory, sortBy]);

    const totalPages  = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
    const paginated   = filtered.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const handleCategory = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
        const slug = cat === "All" ? undefined : cat.toLowerCase().replace(/\s+/g, "-");
        const url  = slug ? `/?category=${slug}` : "/";
        window.history.replaceState({ category: slug ?? null }, "", url);
    };

    return (
        <section className="w-full space-y-6">

            {/* ── Section header ── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">
                        Our Collection
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold font-glacial text-zinc-900 dark:text-white leading-tight">
                        {activeCategory === "All" ? "All Products" : activeCategory}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                        {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
                    </p>
                </div>

                {/* Sort control */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
                    <select
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setCurrentPage(1); }}
                        className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#C6A16A] transition-colors cursor-pointer"
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            {/* ── Category tabs ── */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                <LayoutGrid className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                {CATEGORIES_LIST.map((cat) => {
                    const isActive = cat === activeCategory;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => handleCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
                            }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            {/* ── Product grid ── */}
            {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
                    <LayoutGrid className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-sm font-semibold">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {paginated.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                page === currentPage
                                    ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                    : "border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A]"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

        </section>
    );
}
