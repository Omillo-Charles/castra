"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Search,
    User,
    Heart,
    ShoppingBag,
    ChevronDown,
    ChevronRight,
    LayoutGrid,
    Footprints,
    Truck,
    Menu,
    X,
} from "lucide-react";

import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/svgicons";
import { scrollToProducts } from "@/lib/scrollToProducts";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const CATEGORIES = [
    "All Categories",
    "Beddings",
    "Home appliances",
    "Kitchenware",
    "Organizers",
    "Electronics",
    "Decor",
    "Office Equipments",
    "Furniture",
];

const PRODUCT_CATEGORIES = CATEGORIES.slice(1);

function slugifyCategory(category: string) {
    return category.toLowerCase().replace(/\s+/g, "-");
}

export function Navbar() {
    const { user } = useAuth();
    const { itemCount, total } = useCart();
    const { itemCount: wishlistCount } = useWishlist();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [activeNavCategory, setActiveNavCategory] = useState<string | null>(null);

    // Dropdown states
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Mobile state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedQuery = searchQuery.trim();
        const params = new URLSearchParams();

        if (trimmedQuery) {
            params.set("search", trimmedQuery);
        }

        if (selectedCategory !== "All Categories") {
            params.set("category", slugifyCategory(selectedCategory));
        }

        const queryString = params.toString();
        const targetUrl = queryString ? `/?${queryString}` : "/";

        scrollToProducts(selectedCategory !== "All Categories" ? slugifyCategory(selectedCategory) : undefined);
        router.push(targetUrl);
    };

    return (
        <header className="w-full sticky top-0 z-50 bg-white dark:bg-[#0A0A0A] border-b border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">

            {/*  LAYER 1: TOP ANNOUNCEMENT & SOCIAL BAR (VISIBLE ON ALL SCREENS)  */}
            <div className="w-full bg-zinc-950 text-zinc-300 dark:bg-black dark:text-zinc-400 border-b border-zinc-800/80 text-xs py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                    {/* EXTREME LEFT: Delivery Notice */}
                    <div className="flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5 text-[#C6A16A]" />
                        <span className="font-chirp font-medium tracking-wide text-zinc-200 text-[11px] sm:text-xs">
                            We do delivery countrywide
                        </span>
                    </div>

                    {/* EXTREME RIGHT: Social Icons */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="hidden sm:inline text-[11px] text-zinc-400 font-medium">Follow us:</span>
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <a
                                href="https://www.instagram.com/_castrahouseholds?igsh=MWpsZHFrdzZjOGJvYw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-[#C6A16A] transition-colors p-1"
                                title="Instagram"
                            >
                                <InstagramIcon className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@castrahouseholds?_r=1&_t=ZS-98MRIOkLRlF"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-[#C6A16A] transition-colors p-1"
                                title="TikTok"
                            >
                                <TikTokIcon className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://www.facebook.com/share/1EX8Veqo2R/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-[#C6A16A] transition-colors p-1"
                                title="Facebook"
                            >
                                <FacebookIcon className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/*  LAYER 2: MAIN BRANDING & ACTIONS NAVBAR  */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 lg:gap-8">

                    {/* LEFT: Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 sm:gap-3 group transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-950 p-1 shadow-md border border-[#C6A16A]/30 overflow-hidden flex items-center justify-center">
                                <Image
                                    src="/branding/logo.png"
                                    alt="Castra Logo"
                                    width={44}
                                    height={44}
                                    className="object-contain w-full h-full"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-glacial group-hover:text-[#C6A16A] transition-colors leading-tight">
                                    CASTRA
                                </span>
                                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#C6A16A] font-semibold leading-tight">
                                    Households
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* CENTER: Desktop Search Bar with Category Filter (Hidden on Mobile) */}
                    <div className="flex-1 max-w-2xl mx-2 hidden md:block">
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                            <div className="flex w-full rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 focus-within:border-[#C6A16A] dark:focus-within:border-[#C6A16A] transition-all duration-200 shadow-xs">

                                {/* Category Dropdown Trigger */}
                                <div className="relative flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsCategoryOpen(!isCategoryOpen);
                                        }}
                                        className="h-full px-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] flex items-center gap-2 transition-colors cursor-pointer bg-zinc-100/70 dark:bg-zinc-800/40 select-none rounded-l-full"
                                    >
                                        <span className="truncate max-w-[130px]">{selectedCategory}</span>
                                        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180 text-[#C6A16A]' : ''}`} />
                                    </button>

                                    {/* Category Dropdown Menu */}
                                    {isCategoryOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsCategoryOpen(false)}
                                            />
                                            <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 py-2 z-50 max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150 scrollbar-thin">
                                                {CATEGORIES.map((cat) => (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedCategory(cat);
                                                            setIsCategoryOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${selectedCategory === cat
                                                            ? "bg-[#C6A16A]/10 text-[#C6A16A] font-bold"
                                                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                                                            }`}
                                                    >
                                                        <span>{cat}</span>
                                                        {selectedCategory === cat && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A16A]" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Search Input */}
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for luxury items, products, brands..."
                                    className="w-full px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 bg-transparent placeholder-zinc-400 focus:outline-none"
                                />

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    className="px-6 bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-medium text-sm flex items-center justify-center transition-colors duration-200 cursor-pointer rounded-r-full"
                                    title="Search"
                                >
                                    <Search className="w-4 h-4 text-zinc-950 font-bold" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* DESKTOP RIGHT ACTIONS (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-3 sm:gap-5">

                        {/* Profile Icon / User Account */}
                        <Link
                            href={user ? (user.role === "ADMIN" ? "/account/dashboard/admin" : "/account/dashboard") : "/account"}
                            className="flex items-center gap-2 p-2 rounded-full text-zinc-700 dark:text-zinc-200 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 group"
                            title="Account"
                        >
                            <div className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-[#C6A16A]/15 group-hover:text-[#C6A16A] transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="hidden xl:flex flex-col text-left">
                                <span className="text-[10px] text-zinc-400 leading-tight">
                                    {user ? "My Account" : "Welcome"}
                                </span>
                                <span className="text-xs font-semibold leading-tight text-zinc-800 dark:text-zinc-100 group-hover:text-[#C6A16A]">
                                    {user ? `${user.firstName} ${user.lastName}` : "Sign In / Account"}
                                </span>
                            </div>
                        </Link>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className="relative p-2 rounded-full text-zinc-700 dark:text-zinc-200 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 group flex items-center gap-2"
                            title="Wishlist"
                        >
                            <div className="relative p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-[#C6A16A]/15 group-hover:text-[#C6A16A] transition-colors">
                                <Heart className="w-5 h-5" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#C6A16A] text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                        {wishlistCount > 9 ? "9+" : wishlistCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden xl:inline text-xs font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-[#C6A16A]">
                                Wishlist
                            </span>
                        </Link>

                        {/* Cart Section */}
                        <Link
                            href="/cart"
                            className="flex items-center gap-3 pl-2 pr-3.5 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-zinc-800 hover:bg-[#C6A16A] hover:text-zinc-950 dark:hover:bg-[#C6A16A] dark:hover:text-zinc-950 transition-all duration-200 shadow-sm group"
                            title="Cart"
                        >
                            <div className="relative p-1.5 rounded-full bg-white/10 group-hover:bg-zinc-950/10 transition-colors">
                                <ShoppingBag className="w-5 h-5" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#C6A16A] group-hover:bg-zinc-950 text-zinc-950 group-hover:text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs transition-colors">
                                        {itemCount > 9 ? "9+" : itemCount}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] opacity-75 leading-tight">My Cart</span>
                                <span className="text-xs font-bold leading-tight font-mono">
                                    {user ? `KSh ${total.toLocaleString("en-KE")}` : "KSh 0"}
                                </span>
                            </div>
                        </Link>

                    </div>

                    {/* MOBILE RIGHT ACTIONS (ONLY icons: Search, Profile, Wishlist, Cart-icon-only, Hamburger) */}
                    <div className="flex items-center gap-1 sm:gap-1.5 md:hidden">

                        {/* Mobile Search Icon Toggle */}
                        <button
                            type="button"
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className="p-2 text-zinc-700 dark:text-zinc-200 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Mobile Profile Icon */}
                        <Link
                            href={user ? (user.role === "ADMIN" ? "/account/dashboard/admin" : "/account/dashboard") : "/account"}
                            className="p-2 text-zinc-700 dark:text-zinc-200 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Account"
                        >
                            <User className="w-5 h-5" />
                        </Link>

                        {/* Mobile Wishlist Icon (Icon only + badge) */}
                        <Link
                            href="/wishlist"
                            className="relative p-2 text-zinc-700 dark:text-zinc-200 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Wishlist"
                        >
                            <Heart className="w-5 h-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-[#C6A16A] text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                    {wishlistCount > 9 ? "9+" : wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Cart Icon (Icon only + badge, NO text/price) */}
                        <Link
                            href="/cart"
                            className="relative p-2 text-zinc-700 dark:text-zinc-200 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-[#C6A16A] text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                    {itemCount > 9 ? "9+" : itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Hamburger Menu Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-zinc-800 dark:text-zinc-100 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ml-0.5"
                            title="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                    </div>

                </div>
            </div>

            {/*  MOBILE EXPANDABLE SEARCH BAR  */}
            {isMobileSearchOpen && (
                <div className="md:hidden px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-top-2 duration-150">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                        <div className="flex-1 flex items-center bg-white dark:bg-zinc-950 rounded-full border border-zinc-300 dark:border-zinc-700 px-3.5 py-2 shadow-xs">
                            <Search className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products, brands..."
                                className="w-full text-sm bg-transparent focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#C6A16A] text-zinc-950 font-bold text-xs rounded-full shadow-xs flex-shrink-0"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}

            {/*  LAYER 3: CATEGORY NAVIGATION BAR (HIDDEN ON MOBILE, VISIBLE ON DESKTOP ONLY)  */}
            <div className="hidden md:block w-full bg-zinc-50/90 dark:bg-zinc-950/90 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4 py-2">

                        {/* Category Items starting from Left */}
                        <nav className="flex items-center gap-1 sm:gap-2 md:gap-2.5 overflow-x-auto scrollbar-none py-0.5 w-full">

                            {/* All Categories Quick Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    setActiveNavCategory("All Categories");
                                    scrollToProducts(undefined);
                                }}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all duration-150 flex-shrink-0 cursor-pointer shadow-2xs select-none ${activeNavCategory === "All Categories" || activeNavCategory === null
                                    ? "bg-[#C6A16A] text-zinc-950"
                                    : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-[#C6A16A] hover:text-zinc-950 dark:hover:bg-[#C6A16A] dark:hover:text-zinc-950"
                                    }`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                                <span>All Categories</span>
                            </button>

                            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800 mx-1 flex-shrink-0" />

                            {/* List of outlined categories starting from left */}
                            {PRODUCT_CATEGORIES.map((cat) => {
                                const slug = cat.toLowerCase().replace(/\s+/g, "-");
                                const isActive = activeNavCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => {
                                            setActiveNavCategory(cat);
                                            scrollToProducts(slug);
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 flex items-center gap-1.5 select-none cursor-pointer ${isActive
                                            ? "bg-[#C6A16A]/15 text-[#C6A16A] font-bold border border-[#C6A16A]/30"
                                            : "text-zinc-700 dark:text-zinc-300 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Right Action Badge: Castra Kicks */}
                        <div className="flex items-center gap-2 flex-shrink-0 pl-3 border-l border-zinc-200 dark:border-zinc-800">
                            <Link
                                href="/kicks"
                                className="flex items-center gap-1.5 text-xs font-bold text-[#C6A16A] hover:text-[#b59059] transition-colors py-1.5 px-3 rounded-full bg-[#C6A16A]/10 hover:bg-[#C6A16A]/20 whitespace-nowrap"
                            >
                                <Footprints className="w-3.5 h-3.5 text-[#C6A16A]" />
                                <span>Castra Kicks</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/*  MOBILE HAMBURGER MENU DRAWER (OPENS ALL CATEGORIES)  */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
                    <div className="w-4/5 max-w-sm h-full bg-white dark:bg-[#0A0A0A] shadow-2xl flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-250">

                        {/* Drawer Header */}
                        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/40">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-zinc-950 p-1 border border-[#C6A16A]/30 flex items-center justify-center">
                                    <Image
                                        src="/branding/logo.png"
                                        alt="Castra Logo"
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white font-glacial leading-tight">
                                        All Categories
                                    </span>
                                    <span className="text-[10px] text-[#C6A16A] font-semibold uppercase tracking-wider">
                                        Browse Catalog
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                                title="Close Menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Body - Category List */}
                        <div className="flex-1 overflow-y-auto py-3 px-4 space-y-1">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-[#C6A16A] px-3 py-2 flex items-center gap-2">
                                <LayoutGrid className="w-3.5 h-3.5" />
                                <span>Categories</span>
                            </div>

                            {PRODUCT_CATEGORIES.map((cat) => {
                                const slug = cat.toLowerCase().replace(/\s+/g, "-");
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            scrollToProducts(slug);
                                        }}
                                        className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-[#C6A16A] dark:hover:text-[#C6A16A] transition-colors group cursor-pointer"
                                    >
                                        <span>{cat}</span>
                                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#C6A16A] transition-colors" />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Drawer Footer - Actions */}
                        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-2">
                            <Link
                                href="/kicks"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C6A16A] text-zinc-950 font-bold text-xs shadow-xs hover:bg-[#b59059] transition-colors"
                            >
                                <Footprints className="w-4 h-4 text-zinc-950" />
                                <span>Castra Kicks</span>
                            </Link>
                        </div>

                    </div>
                </div>
            )}

        </header>
    );
}
