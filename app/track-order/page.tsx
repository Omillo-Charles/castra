"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Search, Package, CheckCircle2, Truck, MapPin,
    Clock, CircleDot, MessageCircle, ChevronRight, Phone,
} from "lucide-react";
import { orderApi, type Order } from "@/config/api";

const WHATSAPP_NUMBER = "254704147774";

type UiStatus = "confirmed" | "processing" | "dispatched" | "out-for-delivery" | "delivered";

const STEPS: { key: UiStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    { key: "confirmed", label: "Order Confirmed", desc: "Payment received and order accepted.", icon: <CheckCircle2 className="w-4 h-4" /> },
    { key: "processing", label: "Processing", desc: "We are picking and packing your items.", icon: <Package className="w-4 h-4" /> },
    { key: "dispatched", label: "Dispatched", desc: "Your order has been handed to our courier.", icon: <Truck className="w-4 h-4" /> },
    { key: "out-for-delivery", label: "Out for Delivery", desc: "Your order is on its way to you.", icon: <MapPin className="w-4 h-4" /> },
    { key: "delivered", label: "Delivered", desc: "Your order has been delivered successfully.", icon: <CheckCircle2 className="w-4 h-4" /> },
];

const STATUS_INDEX: Record<UiStatus, number> = {
    confirmed: 0, processing: 1, dispatched: 2, "out-for-delivery": 3, delivered: 4,
};

function toUiStatus(apiStatus: Order["status"]): UiStatus {
    return apiStatus.toLowerCase().replace(/_/g, "-") as UiStatus;
}

function formatKES(n: number) { return `KSh ${n.toLocaleString("en-KE")}`; }

function TrackOrderContent() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [notFound, setNotFound] = useState(false);

    // Auto-search if ?q= param is present on load
    useEffect(() => {
        const q = searchParams.get("q");
        if (q) { setQuery(q); doSearch(q); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const doSearch = async (q: string) => {
        if (!q.trim()) return;
        setLoading(true);
        setSearched(true);
        setNotFound(false);
        setOrder(null);
        try {
            const res = await orderApi.track(q.trim());
            setOrder(res.order);
        } catch {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        doSearch(query);
    };

    const uiStatus = order ? toUiStatus(order.status) : "confirmed";
    const stepIndex = STATUS_INDEX[uiStatus] ?? 0;
    const orderTotal = order?.total ?? 0;
    const waMsg = encodeURIComponent(`Hi, I'd like to track my order ${order?.ref ?? ""}.`);

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-300 font-semibold">Track Your Order</span>
            </nav>

            {/* Hero */}
            <div className="flex items-start gap-5 mb-10 pb-10 border-b border-zinc-800">
                <div className="p-4 rounded-2xl bg-[#C6A16A]/10 border border-[#C6A16A]/25 text-[#C6A16A] flex-shrink-0">
                    <Package className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Delivery</p>
                    <h1 className="text-3xl sm:text-4xl font-bold font-glacial text-white mb-2">
                        Track Your Order
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Enter your order reference number or the phone number used to place your order.
                    </p>
                </div>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
                <div className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-zinc-700 bg-zinc-900 focus-within:border-[#C6A16A] focus-within:bg-zinc-900 transition-all duration-200">
                    <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <input
                        type="text" value={query} onChange={e => setQuery(e.target.value)}
                        placeholder="e.g. CST-20250727-0041 or 0700 000 000"
                        className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none"
                    />
                </div>
                <button type="submit" disabled={loading}
                    className="px-6 py-3.5 rounded-2xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all duration-200 shadow-md flex-shrink-0 disabled:opacity-60">
                    {loading
                        ? <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin block mx-auto" />
                        : "Track"}
                </button>
            </form>

            {/* Not found */}
            {searched && notFound && !loading && (
                <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto">
                        <Search className="w-7 h-7 text-zinc-700" />
                    </div>
                    <p className="text-base font-bold text-zinc-200">No order found</p>
                    <p className="text-sm text-zinc-400 max-w-xs mx-auto">
                        We could not find an order matching that reference. Double-check your order number or contact us on WhatsApp.
                    </p>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I need help tracking my order.")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all">
                        <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                </div>
            )}

            {/* Order result */}
            {searched && order && !loading && (
                <div className="space-y-6">

                    {/* Status banner */}
                    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl border ${uiStatus === "delivered"
                        ? "bg-emerald-500/10 border-emerald-200 border-emerald-500/25"
                        : "bg-[#C6A16A]/8 border-[#C6A16A]/25"
                        }`}>
                        <div className={`p-2.5 rounded-xl ${uiStatus === "delivered" ? "bg-emerald-500/15 text-emerald-500" : "bg-[#C6A16A]/15 text-[#C6A16A]"}`}>
                            {uiStatus === "delivered" ? <CheckCircle2 className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className={`text-xs font-bold uppercase tracking-widest ${uiStatus === "delivered" ? "text-emerald-500" : "text-[#C6A16A]"}`}>
                                {STEPS[stepIndex].label}
                            </p>
                            <p className="text-sm text-zinc-400 mt-0.5">{STEPS[stepIndex].desc}</p>
                        </div>
                    </div>

                    {/* Progress tracker */}
                    <div className="bg-[#171717] rounded-2xl border border-zinc-800 p-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Order Progress</h2>
                        <div className="space-y-0">
                            {STEPS.map((step, i) => {
                                const completed = i < stepIndex;
                                const active = i === stepIndex;
                                const pending = i > stepIndex;
                                return (
                                    <div key={step.key} className="flex items-stretch gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 ${completed ? "bg-[#C6A16A] border-[#C6A16A] text-zinc-950"
                                                : active ? "bg-zinc-900 border-[#C6A16A] text-[#C6A16A] shadow-md shadow-[#C6A16A]/20"
                                                    : "bg-zinc-900 border-zinc-700 text-zinc-700"
                                                }`}>
                                                {completed ? <CheckCircle2 className="w-4 h-4" />
                                                    : active ? <CircleDot className="w-4 h-4" />
                                                        : step.icon}
                                            </div>
                                            {i < STEPS.length - 1 && (
                                                <div className={`w-0.5 flex-1 my-1 min-h-[24px] rounded-full transition-colors duration-300 ${completed ? "bg-[#C6A16A]" : "bg-zinc-200 bg-zinc-800"}`} />
                                            )}
                                        </div>
                                        <div className={`pb-6 pt-1 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
                                            <p className={`text-sm font-semibold transition-colors ${active ? "text-[#C6A16A]" : completed ? "text-zinc-300" : "text-zinc-600"}`}>
                                                {step.label}
                                                {active && (
                                                    <span className="ml-2 text-[10px] font-bold uppercase tracking-widest bg-[#C6A16A]/15 text-[#C6A16A] px-2 py-0.5 rounded-full">
                                                        Current
                                                    </span>
                                                )}
                                            </p>
                                            <p className={`text-xs mt-0.5 transition-colors ${pending ? "text-zinc-700" : "text-zinc-500"}`}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order details */}
                    <div className="bg-[#171717] rounded-2xl border border-zinc-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Order Details</h2>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Reference</p>
                                    <p className="font-semibold text-zinc-200 font-mono text-xs">{order.ref}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Order Date</p>
                                    <p className="font-semibold text-zinc-200 text-xs">
                                        {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Customer</p>
                                    <p className="font-semibold text-zinc-200 text-xs">{order.firstName} {order.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Delivery To</p>
                                    <p className="font-semibold text-zinc-200 text-xs flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-[#C6A16A]" />{order.city}, {order.county}
                                    </p>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="border-t border-zinc-800 pt-4 space-y-2.5">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between gap-4 text-sm">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                                                <Package className="w-3.5 h-3.5 text-zinc-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-zinc-200 truncate">{item.name}</p>
                                                <p className="text-[10px] text-zinc-400">Qty: {item.qty}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-zinc-200 flex-shrink-0">
                                            {formatKES(item.price * item.qty)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Order Total</span>
                                <span className="text-base font-bold text-[#C6A16A]">{formatKES(orderTotal)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Need help */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                        <div className="flex-1 text-center sm:text-left">
                            <p className="text-sm font-bold text-white">Need an update?</p>
                            <p className="text-xs text-zinc-400 mt-0.5">Our team can give you a real-time status on your delivery.</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all">
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                            </a>
                            <a href="tel:+254704147774"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold text-xs transition-all">
                                <Phone className="w-4 h-4" /> Call Us
                            </a>
                        </div>
                    </div>

                    {/* Payment status */}
                    {order.payment && (
                        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
                            <Clock className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                            <span>
                                Payment: <span className={`font-semibold ${order.payment.status === "PAID" ? "text-emerald-500" : order.payment.status === "FAILED" ? "text-red-500" : "text-amber-500"}`}>
                                    {order.payment.status}
                                </span>
                                {order.payment.mpesaReceiptNumber && ` · Ref: ${order.payment.mpesaReceiptNumber}`}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="w-7 h-7 border-2 border-zinc-700 border-t-[#C6A16A] rounded-full animate-spin" />
            </div>
        }>
            <TrackOrderContent />
        </Suspense>
    );
}
