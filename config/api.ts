const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500/api/v1";

// Types

export type ApiResponse<T = unknown> = {
    success: boolean;
    message?: string;
    data?: T;
};

export type AuthUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    role: "USER" | "ADMIN";
    emailVerified: boolean;
    createdAt: string;
};

export type AuthResponse = {
    success: boolean;
    token: string;
    user: AuthUser;
    message?: string;
};

// Core fetch wrapper
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const res = await fetch(url, {
        ...options,
        credentials: "include", // send/receive httpOnly cookies
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || `Request failed with status ${res.status}`);
    }

    return data as T;
}

// Auth API 

export const authApi = {

// Register a new user account.
    register: (body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
    }) =>
        request<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    /**
     * Sign in with email and password.
     */
    login: (body: { email: string; password: string }) =>
        request<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    //Sign out — clears the httpOnly cookie server-side.
    logout: () =>
        request<ApiResponse>("/auth/logout", {
            method: "POST",
        }),

    //Get the currently authenticated user's profile
    me: () =>
        request<{ success: boolean; user: AuthUser }>("/auth/me"),
};
