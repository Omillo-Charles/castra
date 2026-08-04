# Castra Households — Frontend

Next.js frontend for [Castra Households](https://castrahouseholds.co.ke) — a Kenyan household essentials e-commerce platform. Built with Next.js 16 App Router, React 19, and Tailwind CSS v4.

> The backend REST API lives in [`castraAPI/`](./castraAPI/README.md) and has its own README.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [State Management](#state-management)
- [API Client](#api-client)
- [Checkout Flow](#checkout-flow)
- [Product Grid](#product-grid)
- [Authentication](#authentication)
- [Fonts & Styling](#fonts--styling)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 16.2 | Full-stack React framework (App Router) |
| React | 19.2 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| Lucide React | 1.27 | Icon set |

---

## Project Structure

```
castra/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout — font vars, providers, Navbar, Footer
│   ├── globals.css                   # CSS variables, Tailwind theme, font tokens, base styles
│   ├── page.tsx                      # Home — hero banner + product grid (force-dynamic)
│   ├── account/
│   │   ├── page.tsx                  # Auth page — login / register / forgot / verify tabs
│   │   ├── reset-password/
│   │   │   ├── page.tsx              # Server shell — metadata, Suspense, force-dynamic
│   │   │   └── ResetPasswordForm.tsx # Client form — reads ?token= from URL
│   │   ├── verify-email/
│   │   │   └── page.tsx              # Email verification handler (reads ?token=)
│   │   └── dashboard/
│   │       ├── page.tsx              # User dashboard — orders, addresses, wishlist, profile
│   │       └── admin/
│   │           └── page.tsx          # Admin dashboard — products, orders, payments
│   ├── cart/page.tsx                 # Cart review + coupon code
│   ├── checkout/page.tsx             # 4-step checkout with M-Pesa payment
│   ├── kicks/page.tsx                # Castra Kicks — dedicated footwear page
│   ├── wishlist/page.tsx             # Saved products
│   ├── track-order/page.tsx          # Public order tracker by ref or phone
│   ├── faq/page.tsx
│   ├── returns/page.tsx
│   ├── shipping-policy/page.tsx
│   ├── terms/page.tsx
│   └── privacy/page.tsx
├── components/
│   └── ui/
│       ├── Navbar.tsx                # Sticky navbar — search bar, category nav, mobile drawer
│       ├── Footer.tsx
│       ├── ProductGrid.tsx           # Category tabs, search, sort, pagination, URL-driven state
│       ├── ProductCard.tsx           # Reusable product card with cart + wishlist actions
│       ├── AccountForm.tsx           # Auth form tabs — login, register, forgot password, verify
│       ├── heroBanner.tsx
│       └── svgicons.tsx              # SVG icon components (WhatsApp, Instagram, etc.)
├── config/
│   ├── api.ts                        # Typed API client — all fetch calls, auto token refresh
│   ├── constants.ts                  # CATEGORIES_LIST, ADMIN_CATEGORIES_LIST, PRODUCTS_PER_PAGE
│   └── fonts.ts                      # Next.js font config (Chirp, Glacial Indifference, Mulish)
├── context/
│   ├── AuthContext.tsx               # User session state — login, register, logout, rehydration
│   ├── CartContext.tsx               # Cart state — items, item count, total, mutations
│   ├── WishlistContext.tsx           # Wishlist state — toggle, isWishlisted
│   └── ToastContext.tsx              # Global toast notifications — success, error
├── lib/
│   └── scrollToProducts.ts           # Smooth scroll to #products + fire categorychange event
└── next.config.ts                    # Security headers (CSP, HSTS, X-Frame-Options, etc.)
```

---

## Pages & Routes

| Route | Rendering | Description |
|-------|-----------|-------------|
| `/` | Server + `force-dynamic` | Home page — hero banner and full product grid with search, filters, pagination |
| `/account` | Server + `force-dynamic` | Sign in, register, forgot password, email verification (all in one tabbed page) |
| `/account/reset-password` | Server + `force-dynamic` | Password reset form — reads `?token=` from URL |
| `/account/verify-email` | Client | Email verification — calls backend verify endpoint on load |
| `/account/dashboard` | Client | User account management — orders, addresses, wishlist, profile, password |
| `/account/dashboard/admin` | Client | Admin panel — product management (CRUD), order management, payment confirmation |
| `/cart` | Client | Cart review, coupon application, checkout CTA |
| `/checkout` | Client | 4-step checkout — contact details, delivery address, payment, review + place order |
| `/kicks` | Client | Castra Kicks footwear page — separate from the main product grid |
| `/wishlist` | Client | Saved products |
| `/track-order` | Client | Public order tracker — search by order reference or phone number |
| `/faq` `/returns` `/shipping-policy` `/terms` `/privacy` | Server | Static content pages |

> Pages that read URL search params (`?search=`, `?token=`, `?error=`) are marked `force-dynamic` and have their `useSearchParams()` components wrapped in `<Suspense>` boundaries to prevent hydration failures on hard refresh.

---

## State Management

There is no global state library. All state is managed through four React Contexts, each backed by the API client.

### `AuthContext`

Manages the authenticated user session across the entire app.

- On mount, calls `GET /auth/me`. If the access token is expired, silently calls `POST /auth/refresh` first using the refresh token cookie, then retries `/me`.
- Exposes: `user`, `loading`, `login(email, password)`, `register({ firstName, lastName, email, password, phone? })`, `logout()`

### `CartContext`

Keeps cart state in sync with the backend. Works identically for guests (session cookie) and authenticated users.

- Exposes: `cart`, `itemCount`, `total`, `addItem(productId, qty)`, `refresh()`

### `WishlistContext`

Manages the wishlist for signed-in users. Optimistically updates the local state on toggle.

- Exposes: `items`, `itemCount`, `isWishlisted(productId)`, `toggle(productId)`

### `ToastContext`

Lightweight toast system — no external library.

- Exposes: `success(message)`, `error(message)`

---

## API Client

`config/api.ts` is the single source of truth for all communication with the backend. It exports typed namespaces for each resource.

### Key features

**Auto token refresh** — the `request()` wrapper catches `401 + code: TOKEN_EXPIRED` responses and automatically retries once after calling `POST /auth/refresh`. A shared `_refreshPromise` ensures concurrent requests don't trigger multiple refresh calls simultaneously.

**Cookie credentials** — every request includes `credentials: "include"` so the browser sends the `httpOnly` auth cookies on cross-origin requests.

**Full type safety** — all request bodies (`PlaceOrderBody`, etc.) and response shapes (`Order`, `Payment`, `Product`, etc.) are declared as TypeScript interfaces.

### Available API namespaces

| Namespace | Purpose |
|-----------|---------|
| `authApi` | Register, login, logout, refresh, me, forgotPassword, resetPassword, resendVerification |
| `userApi` | updateProfile, changePassword, deleteAccount |
| `addressApi` | list, create, update, setDefault, delete |
| `productApi` | list, get, create, update, toggle, delete |
| `cartApi` | get, addItem, updateItem, removeItem, clear, applyCoupon |
| `wishlistApi` | get, add, remove, check |
| `orderApi` | place, list, get, track, updateStatus, customers |
| `paymentApi` | stkQuery, updateStatus |

---

## Checkout Flow

The checkout is a 4-step single-page flow. Each step validates before advancing — required fields are highlighted in red and the user cannot proceed until they are filled.

### Steps

**1. Your Details**
- First name, last name, phone (required)
- Email address (optional — used for order confirmation emails)
- Pre-filled from the authenticated user's profile if available

**2. Delivery Address**
- Street / estate, town / city, county (all required)
- Delivery notes (optional)
- Authenticated users can select from their saved addresses
- Pre-fills from the default saved address on step load

**3. Payment**
- **Manual M-Pesa** (active): Paybill `542542` / Account `03703439943450` or Send Money `0704147774` (Laureen Nyaboke Maina). Copy buttons provided for each detail.
- **STK Push** (wired, disabled in UI): tab exists but is greyed out pending live Daraja credentials

**4. Review**
- Summary of contact, delivery, and payment details with edit links back to each step
- Place Order button submits to `POST /api/v1/orders`

### Order confirmation screen

After a successful order:
- Order reference is displayed prominently
- For manual payment orders: M-Pesa payment details card with copy buttons
- For STK orders: live payment status indicator (polls every 5s for up to 60s)
- Pre-filled WhatsApp link to confirm the order with the team
- Link to the order tracker

---

## Product Grid

The main product grid at `/` is entirely URL-driven — all state (category, search query, sort order, page) lives in the URL search params, not in component state. This makes every grid view shareable and bookmarkable.

### URL params

| Param | Values | Description |
|-------|--------|-------------|
| `category` | category slug | Filter by category (e.g. `beddings`, `kitchenware`) |
| `search` | any string | Full-text product name search |
| `sort` | `price-asc`, `price-desc` | Sort order |
| `page` | integer | Pagination |

### Behaviour

- **Category tab click** — clears `search` and resets to page 1. Search and category are mutually exclusive.
- **Search submit** — clears the category filter, resets to page 1.
- **Navbar category click** — fires a `categorychange` DOM event. `ProductGrid` listens for this event using a stable ref-based listener to avoid stale closure races during navigation.
- **Kicks** — the `Kicks` category is excluded from the "All" view at the backend level. Kicks have their own page at `/kicks`.

---

## Authentication

The UI supports four auth modes, all in a single tabbed component (`AccountForm.tsx`):

- **Sign In** — email + password login
- **Register** — creates an account and immediately shows the email verification panel
- **Forgot Password** — sends a reset link to the entered email
- **Verify Email** — shown automatically after registration; has a resend button

Google OAuth is available on the sign-in and register tabs. Clicking "Continue with Google" navigates to `GET /auth/google` on the backend.

### Route protection

Protected pages (`/account/dashboard`, `/wishlist`, etc.) check `user` from `AuthContext` on mount and redirect to `/account` if no session is found.

The admin dashboard additionally checks `user.role === "ADMIN"` and redirects non-admin users.

---

## Fonts & Styling

Three custom fonts are configured in `config/fonts.ts` and injected as CSS variables on the `<html>` element:

| CSS variable | Tailwind class | Usage |
|-------------|----------------|-------|
| `--font-chirp` | `font-chirp` | Legacy / fallback |
| `--font-glacial` | `font-glacial` | Headings, logo, section titles |
| `--font-mulish` | `font-mulish` | Body text, UI labels, announcement bar |

Mulish is set as the default `body` font in `globals.css`. Glacial Indifference is the default for `h1`–`h6` elements.

The design is permanently dark — no light mode. The primary brand accent colour is `#C6A16A` (gold), defined as `--brand-gold` and available as `text-[#C6A16A]` / `bg-[#C6A16A]` throughout.

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5500/api/v1
```

In production this should point to the live API origin, e.g. `https://api.castrahouseholds.co.ke/api/v1`.

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5500/api/v1" > .env.local

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build

# 5. Start the production server
npm start
```

The frontend will be available at `http://localhost:3000`.

> Make sure the backend (`castraAPI/`) is also running at the URL specified in `NEXT_PUBLIC_API_URL`. See [castraAPI/README.md](./castraAPI/README.md) for backend setup instructions.
