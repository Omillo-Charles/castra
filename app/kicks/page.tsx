"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Footprints, LayoutGrid, ExternalLink } from "lucide-react";
import { productApi, type Product } from "@/config/api";
import { KICKS_SUBCATEGORIES_LIST } from "@/config/constants";
import { ProductCard } from "@/components/ui/ProductCard";
import { InstagramIcon } from "@/components/svgicons";
import { Pagination } from "@/components/ui/Pagination";

const PER_PAGE = 8;

/* Skeleton — mirrors FeaturedCard shape used on the home page */
function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden animate-pulse">
      <div className="aspect-square bg-zinc-800" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 w-2/3 rounded-full bg-zinc-800" />
        <div className="h-2.5 w-full rounded-full bg-zinc-800" />
        <div className="h-3 w-1/2 rounded-full bg-zinc-800" />
        <div className="flex gap-2 mt-1">
          <div className="flex-1 h-9 rounded-xl bg-zinc-800" />
          <div className="w-9 h-9 rounded-xl bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

function resolveSubcategory(param?: string | null) {
  if (!param) return "All";
  const normalized = param.toLowerCase().replace(/\s+/g, "-");
  const match = KICKS_SUBCATEGORIES_LIST.find(
    (sub) => sub.toLowerCase().replace(/\s+/g, "-") === normalized
  );
  return match ?? "All";
}

export default function KicksPage() {
  return (
    <Suspense fallback={
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-16">
          {Array.from({ length: PER_PAGE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <KicksPageContent />
    </Suspense>
  );
}

function KicksPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const activeSubcategory = resolveSubcategory(searchParams.get("subcategory"));

  const fetchPage = useCallback(async (page: number, subcat: string) => {
    setLoading(true);
    try {
      const subcategoryParam = subcat === "All" ? undefined : subcat;
      const res = await productApi.list({
        category: "kicks",
        subcategory: subcategoryParam,
        page,
        limit: PER_PAGE,
      });
      setProducts(res.products || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotal(res.pagination?.total || 0);
    } catch {
      setProducts([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const pageFromUrl = Number.parseInt(searchParams.get("page") ?? "1", 10) || 1;
    setCurrentPage(pageFromUrl);
    fetchPage(pageFromUrl, activeSubcategory);
  }, [searchParams, activeSubcategory, fetchPage]);

  const handleSubcategoryChange = (subcat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (subcat === "All") {
      params.delete("subcategory");
    } else {
      params.set("subcategory", subcat.toLowerCase().replace(/\s+/g, "-"));
    }
    const qs = params.toString();
    router.replace(qs ? `/kicks?${qs}` : "/kicks", { scroll: false });
  };

  const goTo = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`/kicks?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
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
            {!loading && total > 0 && (
              <span className="ml-1">{total} style{total !== 1 ? "s" : ""} available.</span>
            )}
          </p>
        </div>
        <Link
          href="/"
          className="text-xs font-semibold text-zinc-400 hover:text-[#C6A16A] transition-colors self-start sm:self-auto"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Subcategory filter bar */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 mb-8">
        <LayoutGrid className="w-4 h-4 text-zinc-400 flex-shrink-0" />
        {KICKS_SUBCATEGORIES_LIST.map((subcat) => {
          const isActive = subcat === activeSubcategory;
          return (
            <button
              key={subcat}
              type="button"
              onClick={() => handleSubcategoryChange(subcat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0
                         transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#C6A16A] text-zinc-950 shadow-sm font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {subcat}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800 mb-6" />

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: PER_PAGE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-400">
          <Footprints className="w-16 h-16 opacity-20" />
          <p className="text-sm font-semibold">
            {activeSubcategory === "All"
              ? "No kicks available right now"
              : `No kicks found in "${activeSubcategory}"`}
          </p>
          <p className="text-xs text-zinc-500">Check back soon, new styles drop regularly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goTo}
          className="mt-12"
        />
      )}

      {/* Instagram CTA */}
      <div className="relative mt-16 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950
                      border border-zinc-800 hover:border-[#C6A16A]/40 transition-colors
                      p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#C6A16A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-mulish font-black text-white leading-tight">
              Follow <span className="text-[#C6A16A]">@castra_kicks</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Discover exclusive style drops, fresh releases, customer features, and sneak peeks on our official Instagram page.
            </p>
          </div>
          <a
            href="https://www.instagram.com/castra_kicks/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl
                       bg-gradient-to-r from-[#C6A16A] to-[#b59059] text-zinc-950
                       font-bold text-xs sm:text-sm shadow-lg hover:shadow-[#C6A16A]/20
                       hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0"
          >
            <InstagramIcon className="w-4 h-4 text-zinc-950" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-4 h-4 text-zinc-950 opacity-80" />
          </a>
        </div>
      </div>

    </div>
  );
}
