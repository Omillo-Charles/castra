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

    // Sign in with email and password.
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

     //Returns the URL to redirect the browser to for Google OAuth.
     //This is a full-page redirect, not a fetch call.
    googleLoginUrl: () => `${BASE_URL}/auth/google`,
};

// User API

export type Address = {
    id: string;
    userId: string;
    label: string;
    street: string;
    city: string;
    county: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
};

export const userApi = {
    updateProfile: (body: { firstName?: string; lastName?: string; phone?: string }) =>
        request<{ success: boolean; user: AuthUser }>("/users/me", {
            method: "PATCH",
            body: JSON.stringify(body),
        }),

    /** Change password — requires current password for verification. */
    changePassword: (body: { currentPassword: string; newPassword: string }) =>
        request<{ success: boolean; message: string }>("/users/me/password", {
            method: "PATCH",
            body: JSON.stringify(body),
        }),

    /** Permanently delete the authenticated user's account. */
    deleteAccount: () =>
        request<{ success: boolean; message: string }>("/users/me", {
            method: "DELETE",
        }),
};

// Address API

export const addressApi = {
    /** Get all saved addresses for the current user. */
    list: () =>
        request<{ success: boolean; addresses: Address[] }>("/addresses"),

    /** Create a new address. */
    create: (body: { label: string; street: string; city: string; county: string; isDefault?: boolean }) =>
        request<{ success: boolean; address: Address }>("/addresses", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    /** Update an address by id. */
    update: (id: string, body: Partial<{ label: string; street: string; city: string; county: string; isDefault: boolean }>) =>
        request<{ success: boolean; address: Address }>(`/addresses/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
        }),

    /** Set an address as the default. */
    setDefault: (id: string) =>
        request<{ success: boolean; address: Address }>(`/addresses/${id}/default`, {
            method: "PATCH",
            body: JSON.stringify({}),
        }),

    /** Delete an address by id. */
    delete: (id: string) =>
        request<{ success: boolean; message: string }>(`/addresses/${id}`, {
            method: "DELETE",
        }),
};
