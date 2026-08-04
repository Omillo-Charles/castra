"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, Loader2 } from "lucide-react";
import { CATEGORIES_LIST, PRODUCTS_PER_PAGE } from "@/config/constants";

const GRID_PAGE_SIZE = 12; // product grid shows 12 per page; other pages use PRODUCTS_PER_PAGE (8)
import { ProductCard } from "@/components/ui/ProductCard";
import { productApi, type Product } from "@/config/api";

function resolveCategory(categoryParam?: string | null) {
    if (!categoryParam) return "All";

    const normalizedParam = categoryParam.toLowerCase().replace(/\s+/g, "-");
    const match = CATEGORIES_LIST.find(
        (category) => category.toLowerCase().replace(/\s+/g, "-") === normalizedParam
    );

    return match ?? "All";
}

export function ProductGrid() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-24 text-zinc-400 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#C6A16A]" />
                <p className="text-sm font-semibold">Fetching collection...</p>
            </div>
        }>
            <ProductGridInner />
        </Suspense>
    );
}

function ProductGridInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const activeCategory = resolveCategory(searchParams.get("category"));
    const searchQuery = searchParams.get("search")?.trim() ?? "";
    const currentPage = Number.parseInt(searchParams.get("page") ?? "1", 10) || 1;
    const sortBy = (() => {
        const value = searchParams.get("sort");
        return value === "price-asc" || value === "price-desc" ? value : "default";
    })();

    // Keep a ref to the latest searchParams so the categorychange listener
    // always reads the current value without needing to be re-registered on
    // every navigation — which was the root cause of the stale-closure race.
    const searchParamsRef = useRef(searchParams);
    useEffect(() => { searchParamsRef.current = searchParams; }, [searchParams]);

    // Fetch products whenever category, page, sort, or search changes.
    // setLoading is synchronous here — queueMicrotask was causing the spinner
    // to be skipped/deferred under React's prod batching.
    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const category = activeCategory === "All" ? undefined : activeCategory;
        const sort = sortBy === "default" ? undefined : sortBy;
        const trimmedQuery = searchQuery.trim();

        productApi.list({
            category,
            page: currentPage,
            limit: GRID_PAGE_SIZE,
            sort,
            search: trimmedQuery || undefined,
        })
            .then((res) => {
                if (!isMounted) return;
                setProducts(res.products || []);
                setTotalPages(res.pagination?.totalPages || 1);
                setTotalProducts(res.pagination?.total || (res.products?.length ?? 0));
            })
            .catch(() => {
                if (isMounted) setProducts([]);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [activeCategory, currentPage, sortBy, searchQuery]);

    // React to navbar category clicks — listens for a custom DOM event.
    // searchParams is intentionally NOT in the dep array — we use a ref
    // instead so this listener is only registered once per router instance
    // and never fires with stale closure data during mid-navigation renders.
    useEffect(() => {
        const onCategoryChange = (e: Event) => {
            const slug = (e as CustomEvent<{ slug?: string }>).detail.slug;
            const params = new URLSearchParams(searchParamsRef.current.toString());

            // Always clear search and reset to page 1 when switching category
            params.delete("search");
            params.set("page", "1");

            if (!slug) {
                params.delete("category");
            } else {
                const match = CATEGORIES_LIST.find(
                    (c) => c.toLowerCase().replace(/\s+/g, "-") === slug
                );
                if (!match) return;
                params.set("category", slug);
            }

            const queryString = params.toString();
            router.replace(queryString ? `/?${queryString}` : "/", { scroll: false });
        };

        window.addEventListener("categorychange", onCategoryChange);
        return () => window.removeEventListener("categorychange", onCategoryChange);
    }, [router]); // ← router only; searchParams handled via ref above

    // updateQueryParams no longer sets loading — the fetch effect owns that
    // exclusively. Setting it here created a double-loading race where a
    // stale in-flight request's finally() could clear the spinner too early.
    const updateQueryParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParamsRef.current.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        const queryString = params.toString();
        router.replace(queryString ? `/?${queryString}` : "/", { scroll: false });
    };

    const handleCategory = (cat: string) => {
        const slug = cat === "All" ? null : cat.toLowerCase().replace(/\s+/g, "-");
        updateQueryParams({
            category: slug,
            page:     "1",
            search:   null, // clear any active search when switching category
        });
    };

    const handleSortChange = (value: "default" | "price-asc" | "price-desc") => {
        updateQueryParams({
            sort: value === "default" ? null : value,
            page: "1",
        });
    };

    const handlePageChange = (page: number) => {
        updateQueryParams({ page: String(page) });
    };

    return (
        <section className="w-full space-y-6">

            {/* ── Section header ── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">
                        Our Collection
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold font-glacial text-white leading-tight">
                        {activeCategory === "All" ? "All Products" : activeCategory}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                        {loading
                            ? "Loading products..."
                            : searchQuery.trim()
                                ? `${totalProducts} item${totalProducts !== 1 ? "s" : ""} found for “${searchQuery.trim()}”`
                                : `${totalProducts} item${totalProducts !== 1 ? "s" : ""} found`}
                    </p>
                </div>

                {/* Sort control */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
                    <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                        className="text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#C6A16A] transition-colors cursor-pointer"
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
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
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 cursor-pointer ${isActive
                                ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-zinc-200 bg-zinc-800" />

            {/* ── Product grid ── */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-zinc-400 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-[#C6A16A]" />
                    <p className="text-sm font-semibold">Fetching collection...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
                    <LayoutGrid className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-sm font-semibold">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* ── Pagination ── */}
            {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        type="button"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === currentPage
                                ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                : "border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A]"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

        </section>
    );
}
