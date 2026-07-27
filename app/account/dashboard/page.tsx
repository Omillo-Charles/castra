"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User, MapPin, ShoppingBag, Heart, Settings,
    LogOut, ChevronRight, Package, Truck, CheckCircle2,
    Edit2, Phone, Mail, Home, Plus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/* ── Dummy data — to be replaced when order/address/wishlist endpoints are ready ── */
const DUMMY_ORDERS = [
    { id: "CST-20250727-0041", date: "27 Jul 2025", items: 2, total: 6750,  status: "out-for-delivery" as const },
    { id: "CST-20250720-0033", date: "20 Jul 2025", items: 1, total: 4800,  status: "delivered"        as const },
    { id: "CST-20250710-0018", date: "10 Jul 2025", items: 3, total: 12300, status: "delivered"        as const },
];

const DUMMY_ADDRESSES = [
    { id: "a1", label: "Home", street: "Westlands, Mpaka Road, Apt 4B", city: "Nairobi", county: "Nairobi County", default: true },
];

const DUMMY_WISHLIST = [
    { id: "w1", name: "Egyptian Cotton Duvet Set", category: "Beddings", price: 4800 },
    { id: "w2", name: "Cast Iron Dutch Oven",       category: "Kitchenware", price: 5100 },
];

type Section = "overview" | "orders" | "addresses" | "wishlist" | "profile";

const NAV_ITEMS: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: "overview",   label: "Overview",   icon: <Home className="w-4 h-4" /> },
    { key: "orders",     label: "My Orders",  icon: <ShoppingBag className="w-4 h-4" /> },
    { key: "addresses",  label: "Addresses",  icon: <MapPin className="w-4 h-4" /> },
    { key: "wishlist",   label: "Wishlist",   icon: <Heart className="w-4 h-4" /> },
    { key: "profile",    label: "Profile",    icon: <Settings className="w-4 h-4" /> },
];

const ORDER_STATUS: Record<string, { label: string; color: string }> = {
    "confirmed":         { label: "Confirmed",       color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    "processing":        { label: "Processing",       color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    "dispatched":        { label: "Dispatched",       color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    "out-for-delivery":  { label: "Out for Delivery", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
    "delivered":         { label: "Delivered",        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
};

function formatKES(n: number) { return `KSh ${n.toLocaleString("en-KE")}`; }

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [section, setSection] = useState<Section>("overview");

    // Route protection — redirect to /account if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.replace("/account");
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    // Show nothing while checking auth
    if (loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Page header */}
            <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">My Account</p>
                <h1 className="text-3xl font-bold font-glacial text-zinc-900 dark:text-white">
                    Welcome back, {user.firstName}
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* ── Sidebar ── */}
                <aside className="w-full lg:w-56 flex-shrink-0">
                    <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">

                        {/* Avatar */}
                        <div className="px-5 py-5 flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <div className="w-10 h-10 rounded-full bg-[#C6A16A]/15 border border-[#C6A16A]/30 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-[#C6A16A]">
                                    {user.firstName[0]}{user.lastName[0]}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{user.firstName} {user.lastName}</p>
                                <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="py-2">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => setSection(item.key)}
                                    className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all cursor-pointer text-left ${
                                        section === item.key
                                            ? "text-[#C6A16A] bg-[#C6A16A]/8"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                    }`}
                                >
                                    <span className={section === item.key ? "text-[#C6A16A]" : "text-zinc-400"}>{item.icon}</span>
                                    {item.label}
                                    {section === item.key && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#C6A16A]" />}
                                </button>
                            ))}
                        </nav>

                        {/* Sign out */}
                        <div className="px-3 pb-3 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/8 transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* ── Main content ── */}
                <div className="flex-1 w-full min-w-0">
                    {section === "overview"  && <Overview setSection={setSection} />}
                    {section === "orders"    && <Orders />}
                    {section === "addresses" && <Addresses />}
                    {section === "wishlist"  && <Wishlist />}
                    {section === "profile"   && <Profile />}
                </div>

            </div>
        </div>
    );
}

/* ══ OVERVIEW ══════════════════════════════════════════════════════════════ */
function Overview({ setSection }: { setSection: (s: Section) => void }) {
    const recentOrder = DUMMY_ORDERS[0];
    const status = ORDER_STATUS[recentOrder.status];

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: "Total Orders",    value: DUMMY_ORDERS.length,    icon: <Package className="w-5 h-5" />,  onClick: () => setSection("orders") },
                    { label: "Wishlist Items",  value: DUMMY_WISHLIST.length,   icon: <Heart className="w-5 h-5" />,    onClick: () => setSection("wishlist") },
                    { label: "Saved Addresses", value: DUMMY_ADDRESSES.length,  icon: <MapPin className="w-5 h-5" />,   onClick: () => setSection("addresses") },
                ].map(({ label, value, icon, onClick }) => (
                    <button key={label} type="button" onClick={onClick}
                        className="flex flex-col gap-3 p-5 bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-[#C6A16A]/40 transition-all text-left cursor-pointer group">
                        <div className="p-2 rounded-xl bg-[#C6A16A]/10 text-[#C6A16A] w-fit">{icon}</div>
                        <div>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Recent order */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Most Recent Order</h2>
                    <button type="button" onClick={() => setSection("orders")} className="text-xs text-[#C6A16A] font-semibold hover:underline">View all</button>
                </div>
                <div className="px-5 py-4 flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">{recentOrder.id}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{recentOrder.date} · {recentOrder.items} items</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${status.color}`}>{status.label}</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatKES(recentOrder.total)}</span>
                    </div>
                    <Link href="/track-order" className="flex items-center gap-1.5 text-xs font-semibold text-[#C6A16A] hover:underline flex-shrink-0">
                        <Truck className="w-3.5 h-3.5" /> Track
                    </Link>
                </div>
            </div>

            {/* Quick links */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Quick Links</h2>
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {[
                        { label: "Edit Profile",     sub: "Update your name, email and phone", onClick: () => setSection("profile") },
                        { label: "Manage Addresses", sub: "Add or edit delivery addresses",     onClick: () => setSection("addresses") },
                        { label: "Browse Products",  sub: "Shop our full collection",           href: "/" },
                        { label: "Track an Order",   sub: "Check your delivery status",         href: "/track-order" },
                    ].map(({ label, sub, onClick, href }) => (
                        href ? (
                            <Link key={label} href={href} className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                                <div>
                                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-[#C6A16A] transition-colors">{label}</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-[#C6A16A] transition-colors" />
                            </Link>
                        ) : (
                            <button key={label} type="button" onClick={onClick} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group cursor-pointer text-left">
                                <div>
                                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-[#C6A16A] transition-colors">{label}</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-[#C6A16A] transition-colors" />
                            </button>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ══ ORDERS ════════════════════════════════════════════════════════════════ */
function Orders() {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">My Orders</h2>
            {DUMMY_ORDERS.map((order) => {
                const status = ORDER_STATUS[order.status];
                return (
                    <div key={order.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex items-center gap-4 flex-wrap hover:border-[#C6A16A]/30 transition-all">
                        <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
                            <Package className="w-5 h-5 text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">{order.id}</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">{order.date} · {order.items} item{order.items !== 1 ? "s" : ""}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${status.color}`}>{status.label}</span>
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatKES(order.total)}</span>
                            {order.status !== "delivered" && (
                                <Link href="/track-order" className="flex items-center gap-1.5 text-xs font-semibold text-[#C6A16A] hover:underline">
                                    <Truck className="w-3.5 h-3.5" /> Track
                                </Link>
                            )}
                            {order.status === "delivered" && (
                                <span className="flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ══ ADDRESSES ═════════════════════════════════════════════════════════════ */
function Addresses() {
    const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Saved Addresses</h2>
                <button type="button" className="flex items-center gap-1.5 text-xs font-bold text-[#C6A16A] hover:underline">
                    <Plus className="w-3.5 h-3.5" /> Add New
                </button>
            </div>
            {addresses.map((addr) => (
                <div key={addr.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#C6A16A]/10 text-[#C6A16A] flex-shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">{addr.label}</p>
                            {addr.default && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C6A16A]/15 text-[#C6A16A] border border-[#C6A16A]/25">Default</span>
                            )}
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{addr.street}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{addr.city} · {addr.county}</p>
                    </div>
                    <button type="button" className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-[#C6A16A] transition-colors flex-shrink-0">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                </div>
            ))}
            {addresses.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400">
                    <MapPin className="w-10 h-10 opacity-20" />
                    <p className="text-sm font-semibold">No saved addresses</p>
                </div>
            )}
        </div>
    );
}

/* ══ WISHLIST ══════════════════════════════════════════════════════════════ */
function Wishlist() {
    const [items, setItems] = useState(DUMMY_WISHLIST);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Wishlist</h2>
                <Link href="/wishlist" className="text-xs font-bold text-[#C6A16A] hover:underline">View full wishlist</Link>
            </div>
            {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A16A]">{item.category}</p>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{item.name}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">{formatKES(item.price)}</p>
                    </div>
                    <button type="button" onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                        className="text-xs font-semibold text-zinc-400 hover:text-red-500 transition-colors flex-shrink-0">
                        Remove
                    </button>
                </div>
            ))}
            {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400">
                    <Heart className="w-10 h-10 opacity-20" />
                    <p className="text-sm font-semibold">Your wishlist is empty</p>
                    <Link href="/" className="text-xs text-[#C6A16A] font-bold hover:underline">Browse products</Link>
                </div>
            )}
        </div>
    );
}

/* ══ PROFILE ═══════════════════════════════════════════════════════════════ */
function Profile() {
    const { user } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName,  setLastName]  = useState(user?.lastName  ?? "");
    const [email,     setEmail]     = useState(user?.email     ?? "");
    const [phone,     setPhone]     = useState(user?.phone     ?? "");
    const [saved,     setSaved]     = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call PATCH /api/v1/users/me
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="space-y-5">
            <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Profile & Settings</h2>

            <form onSubmit={handleSave} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <ProfileField label="First name" value={firstName} onChange={setFirstName} icon={<User className="w-4 h-4" />} />
                    <ProfileField label="Last name"  value={lastName}  onChange={setLastName} />
                </div>
                <ProfileField label="Email address" type="email" value={email} onChange={setEmail} icon={<Mail className="w-4 h-4" />} />
                <ProfileField label="Phone number"  type="tel"  value={phone}  onChange={setPhone} icon={<Phone className="w-4 h-4" />} />
                <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all shadow-sm">
                        Save Changes
                    </button>
                    {saved && (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                            <CheckCircle2 className="w-4 h-4" /> Saved
                        </span>
                    )}
                </div>
            </form>

            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Password</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Change your account password</p>
                </div>
                <button type="button" className="text-xs font-bold text-[#C6A16A] hover:underline">Change</button>
            </div>

            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-red-200 dark:border-red-500/20 p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Delete Account</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Permanently delete your account and all data</p>
                </div>
                <button type="button" className="text-xs font-bold text-red-500 hover:underline">Delete</button>
            </div>
        </div>
    );
}

function ProfileField({ label, type = "text", value, onChange, icon }: {
    label: string; type?: string; value: string; onChange: (v: string) => void; icon?: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">{label}</label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-[#C6A16A]/10 transition-all">
                {icon && <span className="text-zinc-400 flex-shrink-0">{icon}</span>}
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none min-w-0" />
            </div>
        </div>
    );
}
