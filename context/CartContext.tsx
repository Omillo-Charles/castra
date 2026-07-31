"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { cartApi, Cart } from "@/config/api";
import { useToast } from "@/context/ToastContext";

type CartContextType = {
    cart:        Cart | null;
    loading:     boolean;
    itemCount:   number;
    total:       number;
    addItem:     (productId: string, qty?: number) => Promise<void>;
    updateItem:  (productId: string, qty: number)  => Promise<void>;
    removeItem:  (productId: string)               => Promise<void>;
    clearCart:   ()                                => Promise<void>;
    applyCoupon: (code: string)                    => Promise<{ success: boolean; message: string }>;
    refresh:     ()                                => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const { error: toastError } = useToast();
    const [cart,    setCart]    = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const res = await cartApi.get();
            setCart(res.cart);
        } catch {
            setCart(null);
            toastError("Could not load your cart. Please refresh the page.");
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { refresh(); }, [refresh]);

    const addItem = async (productId: string, qty = 1) => {
        const res = await cartApi.addItem(productId, qty);
        setCart(res.cart);
    };

    const updateItem = async (productId: string, qty: number) => {
        const res = await cartApi.updateItem(productId, qty);
        setCart(res.cart);
    };

    const removeItem = async (productId: string) => {
        const res = await cartApi.removeItem(productId);
        setCart(res.cart);
    };

    const clearCart = async () => {
        await cartApi.clear();
        setCart(prev => prev ? { ...prev, items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 } : null);
    };

    const applyCoupon = async (code: string) => {
        const res = await cartApi.applyCoupon(code);
        if (res.success) await refresh();
        return { success: res.success, message: res.message ?? "" };
    };

    const itemCount = cart?.items.reduce((s, i) => s + i.qty, 0) ?? 0;
    const total     = cart?.total ?? 0;

    return (
        <CartContext.Provider value={{ cart, loading, itemCount, total, addItem, updateItem, removeItem, clearCart, applyCoupon, refresh }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
