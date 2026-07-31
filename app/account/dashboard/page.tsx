"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User, MapPin, ShoppingBag, Heart, Settings,
    LogOut, ChevronRight, Package, Truck, CheckCircle2,
    Edit2, Phone, Mail, Home, Plus, X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userApi, addressApi, orderApi, normaliseStatus, type Order } from "@/config/api";
import { useToast } from "@/context/ToastContext";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

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

/* ══ OVERVIEW ══ */
function Overview({ setSection }: { setSection: (s: Section) => void }) {
    const [orders,  setOrders]  = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { error } = useToast();

    useEffect(() => {
        orderApi.list({ limit: 50 })
            .then(res => setOrders(res.orders || []))
            .catch(() => error("Could not load your orders."))
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const recentOrder = orders[0];
    const recentStatus = recentOrder ? ORDER_STATUS[normaliseStatus(recentOrder.status)] : null;

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: "Total Orders",    value: loading ? "—" : orders.length, icon: <Package className="w-5 h-5" />, onClick: () => setSection("orders") },
                    { label: "Wishlist Items",  value: "—",                           icon: <Heart className="w-5 h-5" />,   onClick: () => setSection("wishlist") },
                    { label: "Saved Addresses", value: "—",                           icon: <MapPin className="w-5 h-5" />,  onClick: () => setSection("addresses") },
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
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <span className="w-5 h-5 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
                    </div>
                ) : recentOrder ? (
                    <div className="px-5 py-4 flex items-center gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">{recentOrder.ref}</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">{formatDate(recentOrder.createdAt)} · {recentOrder.items.length} item{recentOrder.items.length !== 1 ? "s" : ""}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {recentStatus && <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${recentStatus.color}`}>{recentStatus.label}</span>}
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatKES(recentOrder.total)}</span>
                        </div>
                        <Link href="/track-order" className="flex items-center gap-1.5 text-xs font-semibold text-[#C6A16A] hover:underline flex-shrink-0">
                            <Truck className="w-3.5 h-3.5" /> Track
                        </Link>
                    </div>
                ) : (
                    <div className="px-5 py-8 text-center">
                        <p className="text-sm text-zinc-400">No orders yet.</p>
                        <Link href="/" className="text-xs text-[#C6A16A] font-semibold hover:underline mt-1 inline-block">Start shopping →</Link>
                    </div>
                )}
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

/* ══ ORDERS ══ */
function Orders() {
    const [orders,  setOrders]  = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState("");

    useEffect(() => {
        orderApi.list({ limit: 50 })
            .then(res => setOrders(res.orders || []))
            .catch(err => setError(err instanceof Error ? err.message : "Failed to load orders."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">My Orders</h2>
            {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}
            {orders.map((order) => {
                const uiKey = normaliseStatus(order.status);
                const status = ORDER_STATUS[uiKey] ?? ORDER_STATUS["confirmed"];
                const isDelivered = uiKey === "delivered";
                const hasItemImage = order.items.some((item) => item.imageUrl);
                return (
                    <div key={order.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex items-center gap-4 flex-wrap hover:border-[#C6A16A]/30 transition-all">
                        {!hasItemImage && (
                            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
                                <Package className="w-5 h-5 text-zinc-400" />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">{order.ref}</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">{formatDate(order.createdAt)} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                            <div className="mt-3 space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-2 min-w-0">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <Package className="w-4 h-4 text-zinc-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{item.name}</p>
                                            <p className="text-[10px] text-zinc-400">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${status.color}`}>{status.label}</span>
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatKES(order.total)}</span>
                            {!isDelivered && (
                                <Link href="/track-order" className="flex items-center gap-1.5 text-xs font-semibold text-[#C6A16A] hover:underline">
                                    <Truck className="w-3.5 h-3.5" /> Track
                                </Link>
                            )}
                            {isDelivered && (
                                <span className="flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
            {orders.length === 0 && !error && (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400">
                    <Package className="w-10 h-10 opacity-20" />
                    <p className="text-sm font-semibold">No orders yet</p>
                    <Link href="/" className="text-xs text-[#C6A16A] font-bold hover:underline">Start shopping →</Link>
                </div>
            )}
        </div>
    );
}

/* ══ ADDRESSES ═*/
function Addresses() {
    const [addresses, setAddresses] = useState<import("@/config/api").Address[]>([]);
    const [loading,   setLoading]   = useState(true);
    const [error,     setError]     = useState("");
    const { success, error: toastError } = useToast();

    // Add / Edit form state
    const [showForm,   setShowForm]   = useState(false);
    const [editId,     setEditId]     = useState<string | null>(null);
    const [label,      setLabel]      = useState("");
    const [street,     setStreet]     = useState("");
    const [city,       setCity]       = useState("");
    const [county,     setCounty]     = useState("");
    const [isDefault,  setIsDefault]  = useState(false);
    const [saving,     setSaving]     = useState(false);
    const [formError,  setFormError]  = useState("");

    // Fetch addresses on mount
    useEffect(() => {
        (async () => {
            try {
                const res = await addressApi.list();
                setAddresses(res.addresses);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Failed to load addresses.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const resetForm = () => {
        setEditId(null); setLabel(""); setStreet("");
        setCity(""); setCounty(""); setIsDefault(false);
        setFormError(""); setShowForm(false);
    };

    const openAdd = () => {
        resetForm();
        setShowForm(true);
    };

    const openEdit = (addr: import("@/config/api").Address) => {
        setEditId(addr.id);
        setLabel(addr.label);
        setStreet(addr.street);
        setCity(addr.city);
        setCounty(addr.county);
        setIsDefault(addr.isDefault);
        setFormError("");
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");
        if (!label || !street || !city || !county) {
            setFormError("All fields are required.");
            return;
        }
        setSaving(true);
        try {
            if (editId) {
                const res = await addressApi.update(editId, { label, street, city, county, isDefault });
                setAddresses(prev => prev.map(a => a.id === editId ? res.address : a));
                success("Address updated.");
            } else {
                const res = await addressApi.create({ label, street, city, county, isDefault });
                setAddresses(prev => {
                    const updated = isDefault ? prev.map(a => ({ ...a, isDefault: false })) : [...prev];
                    return [...updated, res.address];
                });
                success("Address added.");
            }
            resetForm();
        } catch (err: unknown) {
            setFormError(err instanceof Error ? err.message : "Failed to save address.");
        } finally {
            setSaving(false);
        }
    };

    const handleSetDefault = async (id: string) => {
        try {
            await addressApi.setDefault(id);
            setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
            success("Default address updated.");
        } catch {
            toastError("Could not update default address.");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await addressApi.delete(id);
            setAddresses(prev => {
                const remaining = prev.filter(a => a.id !== id);
                const wasDefault = prev.find(a => a.id === id)?.isDefault;
                if (wasDefault && remaining.length > 0) {
                    remaining[0] = { ...remaining[0], isDefault: true };
                }
                return remaining;
            });
            success("Address removed.");
        } catch {
            toastError("Could not delete address.");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Saved Addresses</h2>
                <button type="button" onClick={openAdd}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#C6A16A] hover:underline">
                    <Plus className="w-3.5 h-3.5" /> Add New
                </button>
            </div>

            {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}

            {/* Add / Edit form */}
            {showForm && (
                <div className="bg-white dark:bg-[#171717] rounded-2xl border border-[#C6A16A]/40 p-5 space-y-4">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                        {editId ? "Edit Address" : "New Address"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <AddrField label="Label (e.g. Home, Office)" value={label} onChange={setLabel} placeholder="Home" />
                        <AddrField label="Street / Estate / Building" value={street} onChange={setStreet} placeholder="Westlands, Mpaka Road, Apt 4B" />
                        <div className="grid sm:grid-cols-2 gap-3">
                            <AddrField label="Town / City" value={city}   onChange={setCity}   placeholder="Nairobi" />
                            <AddrField label="County"      value={county} onChange={setCounty} placeholder="Nairobi County" />
                        </div>
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input type="checkbox" checked={isDefault} onChange={e => setIsDefault(e.target.checked)}
                                className="w-4 h-4 accent-[#C6A16A]" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Set as default address</span>
                        </label>
                        {formError && <p className="text-xs text-red-500 font-semibold">{formError}</p>}
                        <div className="flex items-center gap-3 pt-1">
                            <button type="submit" disabled={saving}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] disabled:opacity-50 text-zinc-950 font-bold text-sm transition-all shadow-sm">
                                {saving
                                    ? <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                                    : editId ? "Save Changes" : "Add Address"}
                            </button>
                            <button type="button" onClick={resetForm}
                                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Address list */}
            {addresses.map((addr) => (
                <div key={addr.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex items-start gap-4 hover:border-[#C6A16A]/30 transition-all">
                    <div className="p-2.5 rounded-xl bg-[#C6A16A]/10 text-[#C6A16A] flex-shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">{addr.label}</p>
                            {addr.isDefault && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C6A16A]/15 text-[#C6A16A] border border-[#C6A16A]/25">Default</span>
                            )}
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{addr.street}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{addr.city} · {addr.county}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {!addr.isDefault && (
                            <button type="button" onClick={() => handleSetDefault(addr.id)}
                                className="text-[10px] font-semibold text-zinc-400 hover:text-[#C6A16A] transition-colors px-2 py-1 rounded-lg hover:bg-[#C6A16A]/10">
                                Set default
                            </button>
                        )}
                        <button type="button" onClick={() => openEdit(addr)}
                            className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-[#C6A16A] transition-colors p-1.5 rounded-lg hover:bg-[#C6A16A]/10">
                            <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={() => handleDelete(addr.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            ))}

            {addresses.length === 0 && !showForm && (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400">
                    <MapPin className="w-10 h-10 opacity-20" />
                    <p className="text-sm font-semibold">No saved addresses</p>
                    <button type="button" onClick={openAdd}
                        className="text-xs text-[#C6A16A] font-bold hover:underline flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add your first address
                    </button>
                </div>
            )}
        </div>
    );
}

function AddrField({ label, value, onChange, placeholder }: {
    label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">{label}</label>
            <input
                type="text" value={value} onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#C6A16A] focus:ring-2 focus:ring-[#C6A16A]/10 transition-all"
            />
        </div>
    );
}

/* ══ WISHLIST ═ */
function Wishlist() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Wishlist</h2>
                <Link href="/wishlist" className="text-xs font-bold text-[#C6A16A] hover:underline">View full wishlist</Link>
            </div>
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400">
                <Heart className="w-10 h-10 opacity-20" />
                <p className="text-sm font-semibold">Your wishlist is empty</p>
                <Link href="/" className="text-xs text-[#C6A16A] font-bold hover:underline">Browse products</Link>
            </div>
        </div>
    );
}

/* ══ PROFILE ═══*/
function Profile() {
    const { user, logout } = useAuth();
    const router = useRouter();

    // Profile fields
    const [firstName, setFirstName]   = useState(user?.firstName ?? "");
    const [lastName,  setLastName]    = useState(user?.lastName  ?? "");
    const [phone,     setPhone]       = useState(user?.phone     ?? "");
    const [saving,    setSaving]      = useState(false);
    const [saveMsg,   setSaveMsg]     = useState<{ type: "ok" | "err"; text: string } | null>(null);

    // Change password
    const [showPwd,     setShowPwd]   = useState(false);
    const [currentPwd,  setCurrentPwd] = useState("");
    const [newPwd,      setNewPwd]    = useState("");
    const [pwdMsg,      setPwdMsg]    = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [savingPwd,   setSavingPwd] = useState(false);

    // Delete account
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting,      setDeleting]      = useState(false);
    const [deleteErr,     setDeleteErr]     = useState("");

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaveMsg(null);
        try {
            await userApi.updateProfile({ firstName, lastName, phone: phone || undefined });
            setSaveMsg({ type: "ok", text: "Profile updated successfully." });
        } catch (err: unknown) {
            setSaveMsg({ type: "err", text: err instanceof Error ? err.message : "Update failed." });
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPwdMsg(null);
        setSavingPwd(true);
        try {
            await userApi.changePassword({ currentPassword: currentPwd, newPassword: newPwd });
            setPwdMsg({ type: "ok", text: "Password updated successfully." });
            setCurrentPwd(""); setNewPwd("");
        } catch (err: unknown) {
            setPwdMsg({ type: "err", text: err instanceof Error ? err.message : "Password change failed." });
        } finally {
            setSavingPwd(false);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        setDeleteErr("");
        try {
            await userApi.deleteAccount();
            await logout();
            router.push("/");
        } catch (err: unknown) {
            setDeleteErr(err instanceof Error ? err.message : "Deletion failed. Please try again.");
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-5">
            <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Profile & Settings</h2>

            {/* Personal info */}
            <form onSubmit={handleSaveProfile} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <ProfileField label="First name" value={firstName} onChange={setFirstName} icon={<User className="w-4 h-4" />} />
                    <ProfileField label="Last name"  value={lastName}  onChange={setLastName} />
                </div>
                {/* Email is read-only — changes require re-verification */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">Email address</label>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/60">
                        <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">{user?.email}</span>
                        <span className="ml-auto text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Read only</span>
                    </div>
                </div>
                <ProfileField label="Phone number" type="tel" value={phone} onChange={setPhone} icon={<Phone className="w-4 h-4" />} />
                <div className="flex items-center gap-3 pt-1">
                    <button type="submit" disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] disabled:opacity-50 text-zinc-950 font-bold text-sm transition-all shadow-sm">
                        {saving
                            ? <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                            : "Save Changes"}
                    </button>
                    {saveMsg && (
                        <span className={`flex items-center gap-1.5 text-xs font-semibold ${saveMsg.type === "ok" ? "text-emerald-500" : "text-red-500"}`}>
                            <CheckCircle2 className="w-4 h-4" /> {saveMsg.text}
                        </span>
                    )}
                </div>
            </form>

            {/* Change password */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="p-5 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Password</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Change your account password</p>
                    </div>
                    <button type="button" onClick={() => { setShowPwd(v => !v); setPwdMsg(null); }}
                        className="text-xs font-bold text-[#C6A16A] hover:underline">
                        {showPwd ? "Cancel" : "Change"}
                    </button>
                </div>

                {showPwd && (
                    <form onSubmit={handleChangePassword} className="px-5 pb-5 space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                        <ProfileField label="Current password" type="password" value={currentPwd} onChange={setCurrentPwd} />
                        <ProfileField label="New password (min. 8 characters)" type="password" value={newPwd} onChange={setNewPwd} />
                        {pwdMsg && (
                            <p className={`text-xs font-semibold ${pwdMsg.type === "ok" ? "text-emerald-500" : "text-red-500"}`}>
                                {pwdMsg.text}
                            </p>
                        )}
                        <button type="submit" disabled={savingPwd}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] disabled:opacity-50 text-zinc-950 font-bold text-sm transition-all shadow-sm">
                            {savingPwd
                                ? <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                                : "Update Password"}
                        </button>
                    </form>
                )}
            </div>

            {/* Delete account */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-red-200 dark:border-red-500/20 overflow-hidden">
                <div className="p-5 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Delete Account</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Permanently delete your account and all data</p>
                    </div>
                    <button type="button" onClick={() => setConfirmDelete(v => !v)}
                        className="text-xs font-bold text-red-500 hover:underline">
                        {confirmDelete ? "Cancel" : "Delete"}
                    </button>
                </div>

                {confirmDelete && (
                    <div className="px-5 pb-5 border-t border-red-100 dark:border-red-500/10 pt-4 space-y-3">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            This action is <span className="font-bold text-red-500">irreversible</span>. All your orders, addresses, and wishlist items will be permanently deleted.
                        </p>
                        {deleteErr && <p className="text-xs text-red-500 font-semibold">{deleteErr}</p>}
                        <button type="button" onClick={handleDeleteAccount} disabled={deleting}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-sm">
                            {deleting
                                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : "Yes, delete my account"}
                        </button>
                    </div>
                )}
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
