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

// Token refresh state 
// A single in-flight refresh promise shared across all concurrent requests
// so we don't fire multiple refresh calls when several requests expire together.

let _refreshPromise: Promise<AuthResponse> | null = null;

async function attemptRefresh(): Promise<AuthResponse> {
    if (!_refreshPromise) {
        _refreshPromise = fetch(`${BASE_URL}/auth/refresh`, {
            method:      "POST",
            credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data?.message || "Refresh failed");
                return data as AuthResponse;
            })
            .finally(() => {
                _refreshPromise = null;
            });
    }
    return _refreshPromise;
}

// Core fetch wrapper
// Automatically retries once after a silent token refresh on TOKEN_EXPIRED.

async function request<T>(
    endpoint: string,
    options: RequestInit = {},
    _isRetry = false
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const isFormData = options.body instanceof FormData;

    const res = await fetch(url, {
        ...options,
        credentials: "include",
        headers: isFormData
            ? { ...(options.headers ?? {}) }
            : { "Content-Type": "application/json", ...(options.headers ?? {}) },
    });

    const data = await res.json();

    // Access token expired — try to refresh once, then retry the original call
    if (!_isRetry && res.status === 401 && data?.code === "TOKEN_EXPIRED") {
        try {
            await attemptRefresh();
            return request<T>(endpoint, options, true);
        } catch {
            // Refresh failed — throw the original 401 so the UI can sign the user out
            throw new Error("Session expired. Please sign in again.");
        }
    }

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

    // Silently refresh the access token using the refresh_token cookie.
    // Called automatically by the request wrapper on TOKEN_EXPIRED.
    refresh: () =>
        request<AuthResponse>("/auth/refresh", {
            method: "POST",
        }),

    //Get the currently authenticated user's profile
    me: () =>
        request<{ success: boolean; user: AuthUser }>("/auth/me"),

    //Returns the URL to redirect the browser to for Google OAuth.
    //This is a full-page redirect, not a fetch call.
    googleLoginUrl: () => `${BASE_URL}/auth/google`,

    // Send a password-reset link to the given email address.
    forgotPassword: (body: { email: string }) =>
        request<ApiResponse>("/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    // Set a new password using the token from the reset email.
    resetPassword: (body: { token: string; password: string }) =>
        request<ApiResponse>("/auth/reset-password", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    // Re-send the verification email for the given address.
    resendVerification: (body: { email: string }) =>
        request<ApiResponse>("/auth/resend-verification", {
            method: "POST",
            body: JSON.stringify(body),
        }),
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
    deliveryFee: number;
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
        if (params?.page) qs.set("page", String(params.page));
        if (params?.limit) qs.set("limit", String(params.limit));
        if (params?.sort) qs.set("sort", params.sort);
        if (params?.search) qs.set("search", params.search);
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
            method: "POST",
            body: data,
            headers: {}, // let browser set Content-Type with boundary for FormData
        }),

    /**
     * Update a product — admin only.
     * Uses FormData so images can be included alongside text fields.
     */
    update: (id: string, data: FormData) =>
        request<{ success: boolean; product: Product }>(`/products/${id}`, {
            method: "PATCH",
            body: data,
            headers: {},
        }),

    /** Toggle product active/inactive — admin only. */
    toggle: (id: string) =>
        request<{ success: boolean; product: Product }>(`/products/${id}/toggle`, {
            method: "PATCH",
            body: JSON.stringify({}),
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
    userId: string | null;
    sessionId: string | null;
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
            body: JSON.stringify({ productId, qty }),
        }),

    /** Set exact qty for an item. Pass qty=0 to remove it. */
    updateItem: (productId: string, qty: number) =>
        request<{ success: boolean; cart: Cart }>(`/cart/items/${productId}`, {
            method: "PUT",
            body: JSON.stringify({ qty }),
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
            body: JSON.stringify({ code }),
        }),
};

// Wishlist API

export type WishlistItem = {
    id: string;
    wishlistId: string;
    productId: string;
    product: Product;
    createdAt: string;
};

export type Wishlist = {
    id: string;
    userId: string;
    items: WishlistItem[];
};

export const wishlistApi = {
    /** Get the current user's full wishlist. */
    get: () =>
        request<{ success: boolean; wishlist: Wishlist }>("/wishlist"),

    /** Add a product to the wishlist. Idempotent. */
    add: (productId: string) =>
        request<{ success: boolean; wishlist: Wishlist }>("/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
        }),

    /** Remove a product from the wishlist. */
    remove: (productId: string) =>
        request<{ success: boolean; wishlist: Wishlist }>(`/wishlist/${productId}`, {
            method: "DELETE",
        }),

    /** Check if a specific product is wishlisted. */
    check: (productId: string) =>
        request<{ success: boolean; wishlisted: boolean }>(`/wishlist/check/${productId}`),
};

// Order API 

export type OrderStatus =
    | "CONFIRMED"
    | "PROCESSING"
    | "DISPATCHED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

export type PaymentMethod = "MPESA_STK" | "MPESA_MANUAL";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export type OrderItem = {
    id: string;
    name: string;
    price: number;
    qty: number;
    productId: string | null;
    imageUrl: string | null;
};

export interface Payment {
    id: string;
    orderId: string;
    method: PaymentMethod;
    status: PaymentStatus;
    amount: number;
    stkPhone: string | null;
    checkoutRequestId: string | null;
    mpesaReceiptNumber: string | null;
    createdAt: string;
}

export type Order = {
    id: string;
    ref: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string;
    street: string;
    city: string;
    county: string;
    notes: string | null;
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
    payment: Payment | null;
};

export type OrdersResponse = {
    success: boolean;
    orders: Order[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export type OrderCustomer = {
    id: string;
    name: string;
    email: string | null;
    phone: string;
    orders: number;
    total: number;
    lastOrderAt: string;
};

export type OrderCustomersResponse = {
    success: boolean;
    customers: OrderCustomer[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export type PlaceOrderBody = {
    contact: {
        firstName: string;
        lastName: string;
        email?: string;
        phone: string;
    };
    delivery: {
        street: string;
        city: string;
        county: string;
        notes?: string;
    };
    payment: {
        method: "manual" | "mpesa-stk";
        stkPhone?: string; // required when method = "mpesa-stk"
    };
};

export type PlaceOrderResponse = {
    success: boolean;
    order: {
        id: string;
        ref: string;
        total: number;
        status: string;
        items: { name: string; qty: number; price: number }[];
    };
    payment: { id: string; method: string; status: string } | null;
    stk: { checkoutRequestId: string; customerMessage: string } | null;
};

/**
 * Convert uppercase API status enum to the lowercase-hyphenated form used in
 * the UI's ORDER_STATUS maps.
 *
 * Examples:
 *   "OUT_FOR_DELIVERY" → "out-for-delivery"
 *   "CONFIRMED"        → "confirmed"
 */
export function normaliseStatus(apiStatus: string): string {
    return apiStatus.toLowerCase().replace(/_/g, "-");
}

export const orderApi = {
    /** Place a new order from the authenticated user's active cart. */
    place: (body: PlaceOrderBody) =>
        request<PlaceOrderResponse>("/orders", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    /**
     * List orders.
     * - User: returns their own orders.
     * - Admin: returns all orders with optional search + status filter.
     */
    list: (params?: {
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) => {
        const qs = new URLSearchParams();
        if (params?.status) qs.set("status", params.status);
        if (params?.search) qs.set("search", params.search);
        if (params?.page) qs.set("page", String(params.page));
        if (params?.limit) qs.set("limit", String(params.limit));
        const query = qs.toString();
        return request<OrdersResponse>(`/orders${query ? `?${query}` : ""}`);
    },

    /** Get a single order by id or ref. Users can only access their own. */
    get: (idOrRef: string) =>
        request<{ success: boolean; order: Order }>(`/orders/${idOrRef}`),

    /**
     * Public endpoint — track an order by ref or phone number.
     * No auth required.
     */
    track: (q: string) =>
        request<{ success: boolean; order: Order }>(`/orders/track?q=${encodeURIComponent(q)}`),

    /** Admin only — update an order's fulfillment status. */
    updateStatus: (id: string, status: OrderStatus) =>
        request<{ success: boolean; order: Order }>(`/orders/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }),

    /** Admin only — customers derived from placed orders. */
    customers: (params?: { search?: string; page?: number; limit?: number }) => {
        const qs = new URLSearchParams();
        if (params?.search) qs.set("search", params.search);
        if (params?.page) qs.set("page", String(params.page));
        if (params?.limit) qs.set("limit", String(params.limit));
        const query = qs.toString();
        return request<OrderCustomersResponse>(`/orders/customers${query ? `?${query}` : ""}`);
    },
};

// Payment API

export const paymentApi = {
    // Poll STK Push status
    stkQuery: (checkoutRequestId: string) =>
        request<{ success: boolean; payment: Payment }>(`/payments/status/${checkoutRequestId}`, {
            method: "GET",
        }).then((res) => res.payment),

    // Admin only — manually update payment status after confirming payment.
    updateStatus: (id: string, body: { status: PaymentStatus; mpesaReceiptNumber?: string }) =>
        request<{ success: boolean; payment: Payment }>(`/payments/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify(body),
        }),
};
