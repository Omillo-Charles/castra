"use client";

import { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard, ShoppingBag, Package, Users,
    ChevronRight, TrendingUp, Truck, CheckCircle2,
    Clock, AlertTriangle, Eye, Edit2, Trash2,
    Plus, Search, X, LogOut, Phone, Mail,
} from "lucide-react";

/* DUMMY DATA */
const DUMMY_ORDERS = [
    { id: "CST-20250727-0041", customer: "Jane Wanjiku",    phone: "+254 712 345 678", items: 2, total: 6750,  status: "out-for-delivery" as const, date: "27 Jul 2025", payment: "M-Pesa" },
    { id: "CST-20250726-0039", customer: "Brian Otieno",    phone: "+254 723 456 789", items: 1, total: 8900,  status: "dispatched"       as const, date: "26 Jul 2025", payment: "M-Pesa STK" },
    { id: "CST-20250725-0035", customer: "Amina Hassan",    phone: "+254 734 567 890", items: 3, total: 14200, status: "processing"       as const, date: "25 Jul 2025", payment: "M-Pesa" },
    { id: "CST-20250724-0031", customer: "Peter Kamau",     phone: "+254 745 678 901", items: 1, total: 4800,  status: "confirmed"        as const, date: "24 Jul 2025", payment: "COD" },
    { id: "CST-20250720-0028", customer: "Grace Njoroge",   phone: "+254 756 789 012", items: 2, total: 9300,  status: "delivered"        as const, date: "20 Jul 2025", payment: "M-Pesa" },
    { id: "CST-20250718-0024", customer: "David Mwangi",    phone: "+254 767 890 123", items: 4, total: 22100, status: "delivered"        as const, date: "18 Jul 2025", payment: "M-Pesa" },
];

const DUMMY_PRODUCTS = [
    { id: "1",  name: "Egyptian Cotton Duvet Set",  category: "Beddings",        price: 4800,  stock: 12, active: true  },
    { id: "2",  name: "Air Fryer 5.5L",             category: "Home Appliances", price: 8900,  stock: 5,  active: true  },
    { id: "3",  name: "Non-Stick Cookware Set 8pc", category: "Kitchenware",     price: 6400,  stock: 8,  active: true  },
    { id: "4",  name: "Rattan Accent Chair",        category: "Furniture",       price: 22000, stock: 2,  active: true  },
    { id: "5",  name: "Steam Iron Pro",             category: "Home Appliances", price: 2750,  stock: 0,  active: false },
    { id: "6",  name: "LED Smart Desk Lamp",        category: "Electronics",     price: 2900,  stock: 14, active: true  },
];

const DUMMY_CUSTOMERS = [
    { id: "u1", name: "Jane Wanjiku",  email: "jane@example.com",   phone: "+254 712 345 678", orders: 3, total: 21850, joined: "Jan 2025" },
    { id: "u2", name: "Brian Otieno",  email: "brian@example.com",  phone: "+254 723 456 789", orders: 1, total: 8900,  joined: "Mar 2025" },
    { id: "u3", name: "Amina Hassan",  email: "amina@example.com",  phone: "+254 734 567 890", orders: 2, total: 17600, joined: "May 2025" },
    { id: "u4", name: "Peter Kamau",   email: "peter@example.com",  phone: "+254 745 678 901", orders: 1, total: 4800,  joined: "Jun 2025" },
    { id: "u5", name: "Grace Njoroge", email: "grace@example.com",  phone: "+254 756 789 012", orders: 2, total: 9300,  joined: "Jul 2025" },
];

const ORDER_STATUS = {
    confirmed:          { label: "Confirmed",         color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    processing:         { label: "Processing",         color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    dispatched:         { label: "Dispatched",         color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    "out-for-delivery": { label: "Out for Delivery",   color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
    delivered:          { label: "Delivered",          color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
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

/* ROOT PAGE */
export default function AdminPage() {
    const [section, setSection] = useState<Section>("overview");

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
                        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Navigation</p>
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
                            <button type="button" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/8 transition-colors cursor-pointer">
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
    const totalRevenue   = DUMMY_ORDERS.reduce((s, o) => s + o.total, 0);
    const pendingOrders  = DUMMY_ORDERS.filter((o) => o.status !== "delivered").length;
    const deliveredCount = DUMMY_ORDERS.filter((o) => o.status === "delivered").length;
    const lowStock       = DUMMY_PRODUCTS.filter((p) => p.stock <= 2).length;

    const stats = [
        { label: "Total Revenue",    value: formatKES(totalRevenue), icon: <TrendingUp className="w-5 h-5" />,  color: "text-[#C6A16A] bg-[#C6A16A]/10" },
        { label: "Active Orders",    value: pendingOrders,            icon: <Clock className="w-5 h-5" />,       color: "text-blue-500 bg-blue-500/10" },
        { label: "Delivered",        value: deliveredCount,           icon: <CheckCircle2 className="w-5 h-5" />,color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Low Stock Items",  value: lowStock,                 icon: <AlertTriangle className="w-5 h-5" />,color: "text-red-500 bg-red-500/10" },
    ];

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
                    {DUMMY_ORDERS.slice(0, 4).map((order) => {
                        const s = ORDER_STATUS[order.status];
                        return (
                            <div key={order.id} className="px-5 py-3.5 flex items-center gap-4 flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">{order.id}</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">{order.customer} · {order.date}</p>
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
                        {DUMMY_PRODUCTS.filter((p) => p.stock <= 2).map((p) => (
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
    const [orders, setOrders]     = useState(DUMMY_ORDERS);
    const [search, setSearch]     = useState("");
    const [filter, setFilter]     = useState<OrderStatus | "all">("all");
    const [editing, setEditing]   = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<OrderStatus>("confirmed");

    const filtered = orders.filter((o) => {
        const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                            o.customer.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || o.status === filter;
        return matchSearch && matchFilter;
    });

    const updateStatus = (id: string) => {
        setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
        setEditing(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Orders</h2>
                <span className="text-xs text-zinc-400">{filtered.length} of {orders.length}</span>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                    <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <input
                        type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by order ID or customer..."
                        className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
                    />
                    {search && <button type="button" onClick={() => setSearch("")}><X className="w-4 h-4 text-zinc-400" /></button>}
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as OrderStatus | "all")}
                    className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C6A16A] transition-colors cursor-pointer"
                >
                    <option value="all">All Statuses</option>
                    {(Object.keys(ORDER_STATUS) as OrderStatus[]).map((k) => (
                        <option key={k} value={k}>{ORDER_STATUS[k].label}</option>
                    ))}
                </select>
            </div>

            {/* Order list */}
            <div className="space-y-3">
                {filtered.map((order) => {
                    const s = ORDER_STATUS[order.status];
                    const isEditing = editing === order.id;
                    return (
                        <div key={order.id} className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-3 hover:border-[#C6A16A]/30 transition-all">
                            <div className="flex items-start gap-4 flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{order.id}</p>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">{order.customer}</p>
                                    <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-zinc-400">
                                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{order.phone}</span>
                                        <span>{order.date}</span>
                                        <span>{order.items} item{order.items !== 1 ? "s" : ""}</span>
                                        <span>{order.payment}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color}`}>{s.label}</span>
                                    <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatKES(order.total)}</span>
                                    <button
                                        type="button"
                                        onClick={() => { setEditing(isEditing ? null : order.id); setNewStatus(order.status); }}
                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-[#C6A16A] hover:bg-[#C6A16A]/10 transition-colors"
                                        title="Update status"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Inline status update */}
                            {isEditing && (
                                <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex-wrap">
                                    <span className="text-xs font-semibold text-zinc-500">Update status:</span>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                                        className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C6A16A] cursor-pointer"
                                    >
                                        {(Object.keys(ORDER_STATUS) as OrderStatus[]).map((k) => (
                                            <option key={k} value={k}>{ORDER_STATUS[k].label}</option>
                                        ))}
                                    </select>
                                    <button type="button" onClick={() => updateStatus(order.id)}
                                        className="px-3 py-1.5 rounded-lg bg-[#C6A16A] text-zinc-950 font-bold text-xs hover:bg-[#b59059] transition-colors">
                                        Save
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
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-zinc-400">
                        <ShoppingBag className="w-10 h-10 opacity-20 mx-auto mb-3" />
                        <p className="text-sm font-semibold">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* PRODUCTS */
function Products() {
    const [products, setProducts] = useState(DUMMY_PRODUCTS);
    const [search, setSearch]     = useState("");

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const toggleActive = (id: string) =>
        setProducts((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Products</h2>
                <button type="button" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Product
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <input
                    type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
                />
                {search && <button type="button" onClick={() => setSearch("")}><X className="w-4 h-4 text-zinc-400" /></button>}
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
                    {filtered.map((p) => (
                        <div key={p.id} className={`grid grid-cols-12 px-5 py-3.5 items-center text-sm ${!p.active ? "opacity-50" : ""}`}>
                            <div className="col-span-5 flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0">
                                    <Package className="w-3.5 h-3.5 text-zinc-400" />
                                </div>
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
                                <button type="button" className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="View">
                                    <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button type="button" className="p-1.5 rounded-lg text-zinc-400 hover:text-[#C6A16A] hover:bg-[#C6A16A]/10 transition-colors" title="Edit">
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleActive(p.id)}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                        p.active
                                            ? "text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                                            : "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                                    }`}
                                    title={p.active ? "Deactivate" : "Activate"}
                                >
                                    {p.active ? <Trash2 className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-zinc-400">
                            <p className="text-sm font-semibold">No products found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* CUSTOMERS */
function Customers() {
    const [search, setSearch] = useState("");

    const filtered = DUMMY_CUSTOMERS.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-glacial text-zinc-900 dark:text-white">Customers</h2>
                <span className="text-xs text-zinc-400">{DUMMY_CUSTOMERS.length} registered</span>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] transition-colors">
                <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <input
                    type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email or phone..."
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
                />
                {search && <button type="button" onClick={() => setSearch("")}><X className="w-4 h-4 text-zinc-400" /></button>}
            </div>

            {/* Customer list */}
            <div className="space-y-3">
                {filtered.map((c) => (
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
                                <span className="flex items-center gap-1 text-xs text-zinc-400"><Mail className="w-3 h-3" />{c.email}</span>
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
                            <div>
                                <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{c.joined}</p>
                                <p className="text-[10px] text-zinc-400">Joined</p>
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-zinc-400">
                        <Users className="w-10 h-10 opacity-20 mx-auto mb-3" />
                        <p className="text-sm font-semibold">No customers found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
