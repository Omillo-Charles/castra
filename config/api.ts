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

    // Only set Content-Type to JSON when body is not FormData.
    // For FormData, the browser sets the correct multipart/form-data boundary automatically.
    const isFormData = options.body instanceof FormData;

    const res = await fetch(url, {
        ...options,
        credentials: "include",
        headers: isFormData
            ? { ...(options.headers ?? {}) }                              // no Content-Type — browser handles it
            : { "Content-Type": "application/json", ...(options.headers ?? {}) },
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

// Product API

export type Product = {
    id: string;
    name: string;
    category: string;
    slug: string;
    price: number;
    originalPrice: number | null;
    stock: number;
    inStock: boolean;
    active: boolean;
    images: string[];
    createdAt: string;
    updatedAt: string;
};

export type ProductsResponse = {
    success: boolean;
    products: Product[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export const productApi = {
    /** List products — public. Supports category, page, limit, sort, search. */
    list: (params?: {
        category?: string;
        page?: number;
        limit?: number;
        sort?: "price-asc" | "price-desc";
        search?: string;
    }) => {
        const qs = new URLSearchParams();
        if (params?.category) qs.set("category", params.category);
        if (params?.page)     qs.set("page",     String(params.page));
        if (params?.limit)    qs.set("limit",    String(params.limit));
        if (params?.sort)     qs.set("sort",     params.sort);
        if (params?.search)   qs.set("search",   params.search);
        const query = qs.toString();
        return request<ProductsResponse>(`/products${query ? `?${query}` : ""}`);
    },

    /** Get a single product by id — public. */
    get: (id: string) =>
        request<{ success: boolean; product: Product }>(`/products/${id}`),

    /**
     * Create a product — admin only.
     * Uses FormData because images are uploaded as files.
     */
    create: (data: FormData) =>
        request<{ success: boolean; product: Product }>("/products", {
            method:  "POST",
            body:    data,
            headers: {}, // let browser set Content-Type with boundary for FormData
        }),

    /**
     * Update a product — admin only.
     * Uses FormData so images can be included alongside text fields.
     */
    update: (id: string, data: FormData) =>
        request<{ success: boolean; product: Product }>(`/products/${id}`, {
            method:  "PATCH",
            body:    data,
            headers: {},
        }),

    /** Toggle product active/inactive — admin only. */
    toggle: (id: string) =>
        request<{ success: boolean; product: Product }>(`/products/${id}/toggle`, {
            method: "PATCH",
            body:   JSON.stringify({}),
        }),

    /** Delete a product and its images — admin only. */
    delete: (id: string) =>
        request<{ success: boolean; message: string }>(`/products/${id}`, {
            method: "DELETE",
        }),
};

// Cart API

export type CartItem = {
    id: string;
    cartId: string;
    productId: string;
    qty: number;
    product: Product;
};

export type Cart = {
    id: string;
    userId: string;
    couponCode: string | null;
    discount: number;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
};

export const cartApi = {
    /** Get the current user's cart with all items and computed totals. */
    get: () =>
        request<{ success: boolean; cart: Cart }>("/cart"),

    /** Add a product to the cart. Increments qty if already present. */
    addItem: (productId: string, qty = 1) =>
        request<{ success: boolean; cart: Cart }>("/cart/items", {
            method: "POST",
            body:   JSON.stringify({ productId, qty }),
        }),

    /** Set exact qty for an item. Pass qty=0 to remove it. */
    updateItem: (productId: string, qty: number) =>
        request<{ success: boolean; cart: Cart }>(`/cart/items/${productId}`, {
            method: "PUT",
            body:   JSON.stringify({ qty }),
        }),

    /** Remove a specific item from the cart. */
    removeItem: (productId: string) =>
        request<{ success: boolean; cart: Cart }>(`/cart/items/${productId}`, {
            method: "DELETE",
        }),

    /** Clear all items and reset the coupon. */
    clear: () =>
        request<{ success: boolean; message: string }>("/cart", {
            method: "DELETE",
        }),

    /** Apply a coupon code. */
    applyCoupon: (code: string) =>
        request<{ success: boolean; message: string; discount?: number }>("/cart/coupon", {
            method: "POST",
            body:   JSON.stringify({ code }),
        }),
};
