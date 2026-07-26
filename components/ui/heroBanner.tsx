"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "254704147774";

const SLIDES = [
  {
    id: "households",
    src: "/images/householdsbanner.jpg",
    alt: "Castra Households – Premium Home Essentials",
    title: "Castra Households",
    subtitle: "Premium household essentials delivered to your doorstep.",
    productsHref: "/category/beddings",
    whatsappMsg: "Hi, I'd like to view your household products.",
  },
  {
    id: "footwear",
    src: "/images/footwearbanner.jpg",
    alt: "Castra Kicks – Premium Footwear Collection",
    title: "Castra Kicks",
    subtitle: "Step into luxury with our curated footwear collection.",
    productsHref: "/kicks",
    whatsappMsg: "Hi, I'd like to view the Castra Kicks collection.",
  },
];

const DELAY = 6000; // 6 seconds

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 400);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, DELAY);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "50vh" }}>

      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === current ? (isTransitioning ? 0 : 1) : 0 }}
          aria-hidden={index !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Slide content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            {/* Title */}
            <h1 className="font-mulish italic font-black text-white drop-shadow-lg
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              tracking-wide leading-tight mb-3">
              {slide.title}
            </h1>

            {/* Gold divider */}
            <div className="w-20 h-[2px] bg-[#C6A16A] rounded-full mb-4 opacity-90" />

            {/* Subtitle */}
            <p className="text-zinc-200 text-sm sm:text-base max-w-md mb-8 drop-shadow font-mulish">
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link
                href={slide.productsHref}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.03]"
              >
                <ShoppingBag className="w-4 h-4" />
                View Products
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(slide.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 hover:border-[#C6A16A]/60 transition-all duration-200 shadow-lg hover:scale-[1.03] backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={prev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 hover:border-[#C6A16A]/60 transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 hover:border-[#C6A16A]/60 transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "w-7 h-2.5 bg-[#C6A16A]"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
