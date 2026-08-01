"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { authApi, AuthUser } from "@/config/api";

type AuthContextType = {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { firstName: string; lastName: string; email: string; password: string; phone?: string }) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser]       = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true); // true on mount while we check session

    // Rehydrate session on mount — try the access token first.
    // If it has expired, attemptRefresh() inside request() handles it silently.
    // If the refresh token is also gone/invalid we get an error and clear the user.
    const fetchMe = useCallback(async () => {
        try {
            const res = await authApi.me();
            setUser(res.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password });
        setUser(res.user);
    };

    const register = async (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
    }) => {
        const res = await authApi.register(data);
        setUser(res.user);
    };

    const logout = async () => {
        await authApi.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
