"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePagination } from "@/lib/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages:  number;
    onPageChange: (page: number) => void;
    /** Optional extra wrapper classes */
    className?: string;
}

/**
 * Reusable smart pagination component.
 *
 * Uses generatePagination() to show an ellipsis-collapsed page range so
 * the control never overflows even with hundreds of pages:
 *
 *   ← 1  2  3  4  …  48 →        (near the start)
 *   ← 1  …  23  24  25  …  48 →  (in the middle)
 *   ← 1  …  45  46  47  48 →     (near the end)
 *
 * Renders nothing when totalPages ≤ 1.
 */
export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = generatePagination(currentPage, totalPages);

    return (
        <div className={`flex items-center justify-center gap-1.5 ${className}`}>
            {/* Previous */}
            <button
                type="button"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers / ellipsis */}
            {pages.map((page, index) => {
                const isEllipsis = typeof page !== "number";
                const isActive   = page === currentPage;

                return (
                    <button
                        key={`${page}-${index}`}
                        type="button"
                        onClick={() => !isEllipsis && onPageChange(page as number)}
                        disabled={isEllipsis}
                        aria-label={isEllipsis ? "More pages" : `Go to page ${page}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center flex-shrink-0 ${
                            isActive
                                ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                : isEllipsis
                                ? "text-zinc-500 cursor-default select-none"
                                : "border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A]"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next */}
            <button
                type="button"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
