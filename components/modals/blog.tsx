"use client";

import { useEffect } from "react";
import { X, Calendar, ArrowRight } from "lucide-react";
import { scrollToProducts } from "@/lib/scrollToProducts";

export type BlogPost = {
  id: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  readTime: string;
};

type BlogModalProps = {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
};

export function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6
                 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#141414] border border-zinc-800 rounded-xl
                   overflow-hidden shadow-2xl my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-900/90 text-zinc-400
                     hover:text-white border border-zinc-700/60 hover:border-zinc-500
                     transition-all shadow-md cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="max-h-[88vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">

          <div className="relative w-full aspect-[16/7] overflow-hidden bg-zinc-800 flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-6 sm:px-8 pt-5 pb-8">

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-semibold">
                <Calendar className="w-3 h-3 text-[#C6A16A]" />
                {post.date}
              </div>
              <span className="text-zinc-700 text-xs">·</span>
              <span className="text-[10px] text-zinc-500 font-semibold">{post.readTime}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-glacial text-white leading-snug mb-4">
              {post.title}
            </h2>

            <div className="space-y-4">
              {post.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-zinc-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-zinc-500">
                Enjoyed this? Browse our full collection and find something you love.
              </p>
              <button
                type="button"
                onClick={() => { onClose(); scrollToProducts(undefined); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A]
                           hover:bg-[#b59059] text-zinc-950 font-extrabold text-xs uppercase
                           tracking-wide transition-all hover:scale-[1.03] shadow-md whitespace-nowrap"
              >
                Shop Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
