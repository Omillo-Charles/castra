"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard, ShoppingBag, Package, Users,
    ChevronRight, ChevronLeft, TrendingUp, Truck, CheckCircle2,
    Clock, AlertTriangle, Eye, Edit2, Trash2,
    Plus, Search, X, LogOut, Phone, Mail,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { productApi, orderApi, paymentApi, normaliseStatus, type Order, type OrderStatus as ApiOrderStatus, type PaymentStatus } from "@/config/api";
import { CATEGORIES_LIST, PRODUCTS_PER_PAGE } from "@/config/constants";
import { WhatsAppIcon } from "@/components/svgicons";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

const ORDER_STATUS = {
    confirmed:          { label: "Confirmed",        color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    processing:         { label: "Processing",        color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    dispatched:         { label: "Dispatched",        color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    "out-for-delivery": { label: "Out for Delivery",  color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
    delivered:          { label: "Delivered",         color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
};

const PAYMENT_STATUS: Record<PaymentStatus, { label: string; color: string }> = {
    PENDING: { label: "Payment Pending", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    PAID:    { label: "Paid",            color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    FAILED:  { label: "Payment Failed",  color: "text-red-500 bg-red-500/10 border-red-500/20" },
};

type OrderStatus = keyof typeof ORDER_STATUS;
type Section = "overview" | "orders" | "products" | "customers";

function formatKES(n: number) { return `KSh ${n.toLocaleString("en-KE")}`; }

const NAV: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: "overview",  label: "Overview",  icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: "orders",    label: "Orders",    icon: <ShoppingBag className="w-4 h-4" />     },
    { key: "products",  label: "Products",  icon: <Package className="w-4 h-4" />         },
    { key: "customers", label: "Customers", icon: <Users className="w-4 h-4" />           },
];

/* ══ ROOT PAGE ══════════════════════════════════════════════════════════════ */
export default function AdminPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [section, setSection] = useState<Section>("overview");

    // Route protection — must be logged in AND be ADMIN
    useEffect(() => {
        if (loading) return;
        if (!user) { router.replace("/account"); return; }
        if (user.role !== "ADMIN") { router.replace("/account/dashboard"); }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (loading || !user || user.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Admin</p>
                    <h1 className="text-3xl font-bold font-glacial text-zinc-900 dark:text-white">
                        Castra Admin
                    </h1>
                </div>
                <Link href="/account/dashboard" className="text-xs font-semibold text-zinc-500 hover:text-[#C6A16A] transition-colors">
                    ← User Dashboard
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Sidebar */}
                <aside className="w-full lg:w-52 flex-shrink-0">
                    <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">

                        {/* Admin identity */}
                        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#C6A16A]/15 border border-[#C6A16A]/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-[#C6A16A]">
                                        {user.firstName[0]}{user.lastName[0]}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{user.firstName} {user.lastName}</p>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C6A16A]">Admin</p>
                                </div>
                            </div>
                        </div>

                        <nav className="py-2">
                            {NAV.map((item) => (
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

                {/* Content */}
                <div className="flex-1 w-full min-w-0">
                    {section === "overview"  && <Overview  setSection={setSection} />}
                    {section === "orders"    && <Orders />}
                    {section === "products"  && <Products />}
                    {section === "customers" && <Customers />}
                </div>
            </div>
        </div>
    );
}

/* OVERVIEW */
function Overview({ setSection }: { setSection: (s: Section) => void }) {
    const [products,  setProducts]  = useState<import("@/config/api").Product[]>([]);
    const [orders,    setOrders]    = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    useEffect(() => {
        productApi.list({ limit: 100 })
            .then(res => setProducts(res.products || []))
            .catch(() => {});
        orderApi.list({ limit: 100 })
            .then(res => setOrders(res.orders || []))
            .catch(() => {})
            .finally(() => setOrdersLoading(false));
    }, []);

    const totalRevenue   = orders.reduce((s, o) => s + o.total, 0);
    const pendingOrders  = orders.filter(o => o.status !== "DELIVERED").length;
    const deliveredCount = orders.filter(o => o.status === "DELIVERED").length;
    const lowStockItems  = products.filter(p => p.stock <= 2);
    const lowStock       = lowStockItems.length;

    const stats = [
        { label: "Total Revenue",   value: ordersLoading ? "…" : formatKES(totalRevenue), icon: <TrendingUp className="w-5 h-5" />,   color: "text-[#C6A16A] bg-[#C6A16A]/10" },
        { label: "Active Orders",   value: ordersLoading ? "…" : pendingOrders,           icon: <Clock className="w-5 h-5" />,        color: "text-blue-500 bg-blue-500/10" },
        { label: "Delivered",       value: ordersLoading ? "…" : deliveredCount,          icon: <CheckCircle2 className="w-5 h-5" />, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Low Stock Items", value: lowStock,                                       icon: <AlertTriangle className="w-5 h-5" />,color: "text-red-500 bg-red-500/10" },
    ];

    const recentOrders = orders.slice(0, 4);

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon, color }) => (
                    <div key={label} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>{icon}</div>
                        <div>
                            <p className="text-xl font-bold text-zinc-900 dark:text-white">{value}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent orders */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Recent Orders</h2>
                    <button type="button" onClick={() => setSection("orders")} className="text-xs text-[#C6A16A] font-semibold hover:underline">View all</button>
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {ordersLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <span className="w-5 h-5 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <p className="text-sm text-zinc-400 text-center py-8">No orders yet.</p>
                    ) : recentOrders.map(order => {
                        const uiKey = normaliseStatus(order.status) as OrderStatus;
                        const s = ORDER_STATUS[uiKey] ?? ORDER_STATUS["confirmed"];
                        return (
                            <div key={order.id} className="px-5 py-3.5 flex items-center gap-4 flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">{order.ref}</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">{order.firstName} {order.lastName} · {formatDate(order.createdAt)}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color}`}>{s.label}</span>
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{formatKES(order.total)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Low stock alert */}
            {lowStock > 0 && (
                <div className="bg-white dark:bg-[#171717] rounded-2xl border border-red-200 dark:border-red-500/20 overflow-hidden">
                    <div className="px-5 py-4 border-b border-red-100 dark:border-red-500/10 flex items-center justify-between bg-red-50 dark:bg-red-500/5">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5" /> Low Stock Alert
                        </h2>
                        <button type="button" onClick={() => setSection("products")} className="text-xs text-[#C6A16A] font-semibold hover:underline">Manage</button>
                    </div>
                    <div className="divide-y divide-red-100 dark:divide-red-500/10">
                        {lowStockItems.map(p => (
                            <div key={p.id} className="px-5 py-3 flex items-center justify-between text-sm">
                                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{p.name}</span>
                                <span className={`font-bold ${p.stock === 0 ? "text-red-500" : "text-amber-500"}`}>
                                    {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ORDERS */
function Orders() {
    const [orders,        setOrders]        = useState<Order[]>([]);
    const [loading,       setLoading]       = useState(true);
    const [search,        setSearch]        = useState("");
    const [filter,        setFilter]        = useState<OrderStatus | "all">("all");
    const [currentPage,   setCurrentPage]   = useState(1);
    const [totalPages,    setTotalPages]    = useState(1);
    const [totalOrders,   setTotalOrders]   = useState(0);
    const [editing,       setEditing]       = useState<string | null>(null);
    const [newStatus,     setNewStatus]     = useState<OrderStatus>("confirmed");
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("PENDING");
    const [paymentRef,    setPaymentRef]    = useState("");
    const [updating,      setUpdating]      = useState(false);
    const [err,           setErr]           = useState("");

    const ORDERS_PER_PAGE = 10;

    const uiToApiStatus = (status: string): ApiOrderStatus => {
        return status.toUpperCase().replace(/-/g, "_") as ApiOrderStatus;
    };

    const loadOrders = (page = currentPage, query = search, status = filter) => {
        setLoading(true);
        setErr("");
        const apiStatus = status === "all" ? undefined : uiToApiStatus(status);
        orderApi.list({
            page,
            limit:  ORDERS_PER_PAGE,
            search: query || undefined,
            status: apiStatus,
        })
            .then(res => {
                setOrders(res.orders || []);
                setTotalPages(res.pagination?.totalPages || 1);
                setTotalOrders(res.pagination?.total || 0);
            })
            .catch(() => {
                setOrders([]);
                setTotalPages(1);
                setTotalOrders(0);
                setErr("Failed to load orders.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadOrders(currentPage, search, filter);
    }, [currentPage, search, filter]);

    const updateStatus = async (id: string) => {
        setUpdating(true);
        setErr("");
        try {
            await orderApi.updateStatus(id, uiToApiStatus(newStatus));
            const order = orders.find((item) => item.id === id);
            if (order?.payment) {
                await paymentApi.updateStatus(order.payment.id, {
                    status: paymentStatus,
                    mpesaReceiptNumber: paymentRef || undefined,
                });
            }
            setEditing(null);
            loadOrders(currentPage, search, filter);
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : "Failed to update status.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Orders</h2>
                {!loading && (
                    <span className="text-xs text-zinc-400">
                        {totalOrders} order{totalOrders !== 1 ? "s" : ""} found
                    </span>
                )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                    <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <input
                        type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Search by reference, customer name or phone..."
                        className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
                    />
                    {search && <button type="button" onClick={() => { setSearch(""); setCurrentPage(1); }}><X className="w-4 h-4 text-zinc-400" /></button>}
                </div>
                <select
                    value={filter}
                    onChange={(e) => { setFilter(e.target.value as OrderStatus | "all"); setCurrentPage(1); }}
                    className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C6A16A] transition-colors cursor-pointer"
                >
                    <option value="all">All Statuses</option>
                    {(Object.keys(ORDER_STATUS) as OrderStatus[]).map((k) => (
                        <option key={k} value={k}>{ORDER_STATUS[k].label}</option>
                    ))}
                </select>
            </div>

            {err && <p className="text-xs text-red-500 font-semibold">{err}</p>}

            {/* Order list */}
            <div className="space-y-3">
                {loading ? (
                    <div className="text-center py-16 text-zinc-400">
                        <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin inline-block mb-2" />
                        <p className="text-xs font-semibold">Loading orders...</p>
                    </div>
                ) : orders.map((order) => {
                    const uiKey = normaliseStatus(order.status) as OrderStatus;
                    const s = ORDER_STATUS[uiKey] ?? ORDER_STATUS["confirmed"];
                    const isEditing = editing === order.id;
                    const paymentMethodLabel = order.payment?.method === "MPESA_STK"
                        ? "M-Pesa STK"
                        : "No Payment Details";
                    const paymentStatusMeta = order.payment ? PAYMENT_STATUS[order.payment.status] : null;
                    return (
                        <div key={order.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-3 hover:border-[#C6A16A]/30 transition-all">
                            <div className="flex items-start gap-4 flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{order.ref}</p>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">{order.firstName} {order.lastName}</p>
                                    <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-zinc-400">
                                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{order.phone}</span>
                                        <span>{formatDate(order.createdAt)}</span>
                                        <span>{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}</span>
                                        <span>{paymentMethodLabel}</span>
                                        {paymentStatusMeta && (
                                            <span className={`font-bold ${paymentStatusMeta.color.split(" ")[0]}`}>
                                                {paymentStatusMeta.label}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color}`}>{s.label}</span>
                                    <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatKES(order.total)}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditing(isEditing ? null : order.id);
                                            setNewStatus(normaliseStatus(order.status) as OrderStatus);
                                            setPaymentStatus(order.payment?.status ?? "PENDING");
                                            setPaymentRef(order.payment?.mpesaReceiptNumber ?? "");
                                        }}
                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-[#C6A16A] hover:bg-[#C6A16A]/10 transition-colors"
                                        title="Update status"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 sm:grid-cols-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 px-3 py-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center flex-shrink-0">
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
                                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex-shrink-0">
                                            {formatKES(item.price * item.qty)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Inline status update */}
                            {isEditing && (
                                <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex-wrap">
                                    <span className="text-xs font-semibold text-zinc-500">Order:</span>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                                        className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C6A16A] cursor-pointer"
                                    >
                                        {(Object.keys(ORDER_STATUS) as OrderStatus[]).map((k) => (
                                            <option key={k} value={k}>{ORDER_STATUS[k].label}</option>
                                        ))}
                                    </select>
                                    {order.payment && (
                                        <>
                                            <span className="text-xs font-semibold text-zinc-500">Payment:</span>
                                            <select
                                                value={paymentStatus}
                                                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                                                className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C6A16A] cursor-pointer"
                                            >
                                                {(Object.keys(PAYMENT_STATUS) as PaymentStatus[]).map((k) => (
                                                    <option key={k} value={k}>{PAYMENT_STATUS[k].label}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                value={paymentRef}
                                                onChange={(e) => setPaymentRef(e.target.value)}
                                                placeholder="M-Pesa ref"
                                                className="w-32 text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C6A16A]"
                                            />
                                        </>
                                    )}
                                    <button type="button" onClick={() => updateStatus(order.id)} disabled={updating}
                                        className="px-3 py-1.5 rounded-lg bg-[#C6A16A] text-zinc-950 font-bold text-xs hover:bg-[#b59059] disabled:opacity-50 transition-colors">
                                        {updating ? "Saving..." : "Save"}
                                    </button>
                                    <button type="button" onClick={() => setEditing(null)}
                                        className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 font-bold text-xs hover:border-zinc-400 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
                {!loading && orders.length === 0 && (
                    <div className="text-center py-16 text-zinc-400">
                        <ShoppingBag className="w-10 h-10 opacity-20 mx-auto mb-3" />
                        <p className="text-sm font-semibold">No orders found</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {!loading && totalOrders > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-zinc-400">
                        Showing <span className="font-semibold text-zinc-700 dark:text-zinc-300">{(currentPage - 1) * ORDERS_PER_PAGE + 1}</span> to{" "}
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{Math.min(currentPage * ORDERS_PER_PAGE, totalOrders)}</span> of{" "}
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{totalOrders}</span> orders
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 transition-all"
                            >
                                Previous
                            </button>
                            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* PRODUCTS */
function Products() {
    const [products,      setProducts]      = useState<import("@/config/api").Product[]>([]);
    const [loading,       setLoading]       = useState(true);
    const [search,        setSearch]        = useState("");
    const [currentPage,   setCurrentPage]   = useState(1);
    const [totalPages,    setTotalPages]    = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // Add / Edit form
    const [showForm,   setShowForm]   = useState(false);
    const [editId,     setEditId]     = useState<string | null>(null);
    const [formName,   setFormName]   = useState("");
    const [formCat,    setFormCat]    = useState("");
    const [formSlug,   setFormSlug]   = useState("");
    const [formPrice,  setFormPrice]  = useState("");
    const [formStock,  setFormStock]  = useState("");
    const [formFiles,  setFormFiles]  = useState<FileList | null>(null);
    const [formActive, setFormActive] = useState(true);
    const [saving,     setSaving]     = useState(false);
    const [formErr,    setFormErr]    = useState("");

    const loadProducts = (page = currentPage, query = search) => {
        setLoading(true);
        productApi.list({
            page,
            limit: PRODUCTS_PER_PAGE,
            search: query || undefined,
        })
            .then((res) => {
                setProducts(res.products || []);
                setTotalPages(res.pagination?.totalPages || 1);
                setTotalProducts(res.pagination?.total || 0);
            })
            .catch(() => {
                setProducts([]);
                setTotalPages(1);
                setTotalProducts(0);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadProducts(currentPage, search);
    }, [currentPage, search]);

    const adminCategories = CATEGORIES_LIST.filter((c) => c !== "All");

    const handleCategorySelect = (cat: string) => {
        setFormCat(cat);
        if (cat) {
            setFormSlug(cat.toLowerCase().replace(/\s+/g, "-"));
        } else {
            setFormSlug("");
        }
    };

    const resetForm = () => {
        setEditId(null); setFormName(""); setFormCat(""); setFormSlug("");
        setFormPrice(""); setFormStock(""); setFormFiles(null);
        setFormActive(true); setFormErr(""); setShowForm(false);
    };

    const openEdit = (p: import("@/config/api").Product) => {
        setEditId(p.id); setFormName(p.name); setFormCat(p.category);
        setFormSlug(p.slug); setFormPrice(String(p.price));
        setFormStock(String(p.stock)); setFormActive(p.active);
        setFormErr(""); setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formName || !formCat || !formSlug || !formPrice || !formStock) {
            setFormErr("All fields except images are required."); return;
        }
        setSaving(true); setFormErr("");
        try {
            const fd = new FormData();
            fd.append("name",     formName);
            fd.append("category", formCat);
            fd.append("slug",     formSlug);
            fd.append("price",    formPrice);
            fd.append("stock",    formStock);
            fd.append("active",   String(formActive));
            if (formFiles) {
                Array.from(formFiles).forEach(f => fd.append("images", f));
            }
            if (editId) {
                await productApi.update(editId, fd);
                loadProducts(currentPage);
            } else {
                await productApi.create(fd);
                setCurrentPage(1);
                loadProducts(1);
            }
            resetForm();
        } catch (err: unknown) {
            setFormErr(err instanceof Error ? err.message : "Save failed.");
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            await productApi.toggle(id);
            loadProducts(currentPage);
        } catch {}
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this product? This cannot be undone.")) return;
        try {
            await productApi.delete(id);
            loadProducts(currentPage);
        } catch {}
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Products</h2>
                <button type="button" onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Product
                </button>
            </div>

            {/* Add / Edit form */}
            {showForm && (
                <div className="bg-white dark:bg-[#171717] rounded-2xl border border-[#C6A16A]/40 p-5 space-y-4">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-glacial">
                        {editId ? "Edit Product" : "New Product"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                            <AdminField label="Product name"  value={formName}  onChange={setFormName}  placeholder="Egyptian Cotton Duvet Set" />
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">
                                    Category
                                </label>
                                <select
                                    value={formCat}
                                    onChange={(e) => handleCategorySelect(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#C6A16A] transition-colors cursor-pointer"
                                >
                                    <option value="">Select category...</option>
                                    {adminCategories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                            <AdminField label="Slug (auto-generated)" value={formSlug} onChange={setFormSlug} placeholder="beddings" />
                            <AdminField label="Price (KES)" value={formPrice} onChange={setFormPrice} placeholder="4800" type="number" />
                            <AdminField label="Stock" value={formStock} onChange={setFormStock} placeholder="10"   type="number" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">
                                Images (up to 5, JPEG/PNG/WebP)
                            </label>
                            <input type="file" accept="image/*" multiple
                                onChange={e => setFormFiles(e.target.files)}
                                className="w-full text-sm text-zinc-600 dark:text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#C6A16A]/15 file:text-[#C6A16A] hover:file:bg-[#C6A16A]/25 cursor-pointer" />
                        </div>
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input type="checkbox" checked={formActive} onChange={e => setFormActive(e.target.checked)}
                                className="w-4 h-4 accent-[#C6A16A]" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Active (visible to customers)</span>
                        </label>
                        {formErr && <p className="text-xs text-red-500 font-semibold">{formErr}</p>}
                        <div className="flex items-center gap-3 pt-1">
                            <button type="submit" disabled={saving}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] disabled:opacity-50 text-zinc-950 font-bold text-sm transition-all shadow-sm">
                                {saving
                                    ? <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                                    : editId ? "Save Changes" : "Create Product"}
                            </button>
                            <button type="button" onClick={resetForm}
                                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none" />
                {search && <button type="button" onClick={() => { setSearch(""); setCurrentPage(1); }}><X className="w-4 h-4 text-zinc-400" /></button>}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="grid grid-cols-12 px-5 py-3 bg-zinc-50 dark:bg-zinc-900/60 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="col-span-5">Product</span>
                    <span className="col-span-2">Category</span>
                    <span className="col-span-2 text-right">Price</span>
                    <span className="col-span-1 text-center">Stock</span>
                    <span className="col-span-2 text-center">Actions</span>
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {loading ? (
                        <div className="text-center py-12 text-zinc-400">
                            <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin inline-block mb-2" />
                            <p className="text-xs font-semibold">Loading products...</p>
                        </div>
                    ) : products.map((p) => (
                        <div key={p.id} className={`grid grid-cols-12 px-5 py-3.5 items-center text-sm ${!p.active ? "opacity-50" : ""}`}>
                            <div className="col-span-5 flex items-center gap-3 min-w-0">
                                {p.images[0] ? (
                                    <img src={p.images[0]} alt={p.name}
                                        className="w-8 h-8 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800 flex-shrink-0" />
                                ) : (
                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0">
                                        <Package className="w-3.5 h-3.5 text-zinc-400" />
                                    </div>
                                )}
                                <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">{p.name}</span>
                            </div>
                            <span className="col-span-2 text-xs text-zinc-400">{p.category}</span>
                            <span className="col-span-2 text-right font-semibold text-zinc-800 dark:text-zinc-200">{formatKES(p.price)}</span>
                            <span className={`col-span-1 text-center text-xs font-bold ${
                                p.stock === 0 ? "text-red-500" : p.stock <= 2 ? "text-amber-500" : "text-emerald-500"
                            }`}>
                                {p.stock === 0 ? "Out" : p.stock}
                            </span>
                            <div className="col-span-2 flex items-center justify-center gap-1.5">
                                <button type="button" onClick={() => openEdit(p)}
                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-[#C6A16A] hover:bg-[#C6A16A]/10 transition-colors" title="Edit">
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button type="button" onClick={() => handleToggle(p.id)}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                        p.active
                                            ? "text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                                            : "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                                    }`} title={p.active ? "Deactivate" : "Activate"}>
                                    {p.active ? <Eye className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                </button>
                                <button type="button" onClick={() => handleDelete(p.id)}
                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Delete">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {!loading && products.length === 0 && (
                        <div className="text-center py-12 text-zinc-400">
                            <Package className="w-10 h-10 opacity-20 mx-auto mb-3" />
                            <p className="text-sm font-semibold">No products found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {!loading && totalProducts > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-zinc-400">
                        Showing <span className="font-semibold text-zinc-700 dark:text-zinc-300">{(currentPage - 1) * PRODUCTS_PER_PAGE + 1}</span> to{" "}
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{Math.min(currentPage * PRODUCTS_PER_PAGE, totalProducts)}</span> of{" "}
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{totalProducts}</span> products
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                        page === currentPage
                                            ? "bg-[#C6A16A] text-zinc-950 shadow-sm"
                                            : "border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A]"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                aria-label="Next page"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function AdminField({ label, value, onChange, placeholder, type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">{label}</label>
            <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#C6A16A] focus:ring-2 focus:ring-[#C6A16A]/10 transition-all" />
        </div>
    );
}

/* CUSTOMERS */
function Customers() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [customers, setCustomers] = useState<import("@/config/api").OrderCustomer[]>([]);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const CUSTOMERS_PER_PAGE = 8;

    const normaliseWhatsappPhone = (phone: string) => {
        const digits = phone.replace(/\D/g, "");
        if (digits.startsWith("254")) return digits;
        if (digits.startsWith("0")) return `254${digits.slice(1)}`;
        if (digits.startsWith("7") || digits.startsWith("1")) return `254${digits}`;
        return digits;
    };

    const loadCustomers = (page: number, query: string) => {
        setLoading(true);
        setErr("");
        orderApi.customers({
            page,
            limit: CUSTOMERS_PER_PAGE,
            search: query || undefined,
        })
            .then((res) => {
                setCustomers(res.customers || []);
                setTotalCustomers(res.pagination?.total || 0);
                setTotalPages(res.pagination?.totalPages || 1);
            })
            .catch((error: unknown) => {
                setCustomers([]);
                setTotalCustomers(0);
                setTotalPages(1);
                setErr(error instanceof Error ? error.message : "Failed to load customers.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCustomers(currentPage, search);
    }, [currentPage, search]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Customers</h2>
                {!loading && (
                    <span className="text-xs text-zinc-400">
                        {totalCustomers} customer{totalCustomers !== 1 ? "s" : ""} with orders
                    </span>
                )}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <input
                    type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    placeholder="Search by name, email or phone..."
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
                />
                {search && <button type="button" onClick={() => { setSearch(""); setCurrentPage(1); }}><X className="w-4 h-4 text-zinc-400" /></button>}
            </div>

            {err && <p className="text-xs text-red-500 font-semibold">{err}</p>}

            {/* Customer list */}
            <div className="space-y-3">
                {loading ? (
                    <div className="text-center py-16 text-zinc-400">
                        <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin inline-block mb-2" />
                        <p className="text-xs font-semibold">Loading customers...</p>
                    </div>
                ) : customers.map((c) => (
                    <div key={c.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex items-center gap-4 flex-wrap hover:border-[#C6A16A]/30 transition-all">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-[#C6A16A]/15 border border-[#C6A16A]/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-[#C6A16A]">
                                {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </span>
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">{c.name}</p>
                            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                                {c.email && <span className="flex items-center gap-1 text-xs text-zinc-400"><Mail className="w-3 h-3" />{c.email}</span>}
                                <span className="flex items-center gap-1 text-xs text-zinc-400"><Phone className="w-3 h-3" />{c.phone}</span>
                            </div>
                        </div>
                        {/* Stats */}
                        <div className="flex items-center gap-5 flex-shrink-0 text-center">
                            <div>
                                <p className="text-sm font-bold text-zinc-900 dark:text-white">{c.orders}</p>
                                <p className="text-[10px] text-zinc-400">Orders</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#C6A16A]">{formatKES(c.total)}</p>
                                <p className="text-[10px] text-zinc-400">Spent</p>
                            </div>
                            <a
                                href={`https://wa.me/${normaliseWhatsappPhone(c.phone)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/15 transition-colors"
                            >
                                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                ))}
                {!loading && customers.length === 0 && (
                    <div className="text-center py-16 text-zinc-400">
                        <Users className="w-10 h-10 opacity-20 mx-auto mb-3" />
                        <p className="text-sm font-semibold">No customers found</p>
                    </div>
                )}
            </div>

            {!loading && totalCustomers > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-zinc-400">
                        Showing <span className="font-semibold text-zinc-700 dark:text-zinc-300">{(currentPage - 1) * CUSTOMERS_PER_PAGE + 1}</span> to{" "}
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{Math.min(currentPage * CUSTOMERS_PER_PAGE, totalCustomers)}</span> of{" "}
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{totalCustomers}</span> customers
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                type="button"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-[#C6A16A]/50 hover:text-[#C6A16A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                aria-label="Next page"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
