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

    // Rehydrate session on mount.
    // Strategy:
    //   1. Try /auth/me — succeeds if the access token cookie is still valid.
    //   2. If that fails for any auth reason (expired, missing cookie), attempt a
    //      proactive token refresh using the refresh_token cookie, then retry /me.
    //   3. Only clear the user if the refresh also fails (refresh token expired/revoked).
    const fetchMe = useCallback(async () => {
        try {
            const res = await authApi.me();
            setUser(res.user);
        } catch {
            // Access token missing or expired — try to refresh proactively
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500/api/v1"}/auth/refresh`, {
                    method:      "POST",
                    credentials: "include",
                });
                // After refresh, the new access token cookie is set — retry /me
                const res = await authApi.me();
                setUser(res.user);
            } catch {
                // Refresh token also gone/expired — user must log in again
                setUser(null);
            }
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
