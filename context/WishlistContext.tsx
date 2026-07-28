"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { wishlistApi, Wishlist } from "@/config/api";
import { useAuth } from "@/context/AuthContext";

type WishlistContextType = {
    wishlist:    Wishlist | null;
    loading:     boolean;
    itemCount:   number;
    isWishlisted:(productId: string) => boolean;
    add:         (productId: string) => Promise<void>;
    remove:      (productId: string) => Promise<void>;
    toggle:      (productId: string) => Promise<void>;
    refresh:     () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<Wishlist | null>(null);
    const [loading,  setLoading]  = useState(false);

    const refresh = useCallback(async () => {
        if (!user) { setWishlist(null); return; }
        setLoading(true);
        try {
            const res = await wishlistApi.get();
            setWishlist(res.wishlist);
        } catch {
            setWishlist(null);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => { refresh(); }, [refresh]);

    const add = async (productId: string) => {
        const res = await wishlistApi.add(productId);
        setWishlist(res.wishlist);
    };

    const remove = async (productId: string) => {
        const res = await wishlistApi.remove(productId);
        setWishlist(res.wishlist);
    };

    const toggle = async (productId: string) => {
        if (isWishlisted(productId)) {
            await remove(productId);
        } else {
            await add(productId);
        }
    };

    const isWishlisted = (productId: string) =>
        wishlist?.items.some(i => i.productId === productId) ?? false;

    const itemCount = wishlist?.items.length ?? 0;

    return (
        <WishlistContext.Provider value={{ wishlist, loading, itemCount, isWishlisted, add, remove, toggle, refresh }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
    return ctx;
}
