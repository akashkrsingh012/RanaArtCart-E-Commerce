"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import {
    CreditCard,
    Wallet,
    Banknote,
    QrCode,
    CheckCircle2,
    Loader2,
    ShieldCheck,
    ArrowRight
} from "lucide-react"

function PaymentContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { orders } = useUser()
    const orderId = searchParams.get("orderId")

    const [selectedMethod, setSelectedMethod] = useState<string>("card")
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(false)

    // Find the order from context
    const order = orders.find(o => o._id === orderId)

    useEffect(() => {
        if (!orderId) {
            router.push("/")
        }
    }, [orderId, router])

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="animate-spin text-orange-600" size={40} />
            </div>
        )
    }

    const handlePayment = async () => {
        if (selectedMethod !== "cod") {
            // For now, only COD is supported for immediate order placement
            alert("Payment integration is coming soon! Please use Cash on Delivery for now.")
            return
        }

        setProcessing(true)

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        setProcessing(false)
        setSuccess(true)

        // After success, wait a bit then go to orders
        setTimeout(() => {
            router.push("/orders")
        }, 2500)
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">Payment Successful!</h1>
                    <p className="text-neutral-500 mb-8">Your order has been confirmed and will be shipped soon.</p>
                    <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-neutral-500">Transaction ID</span>
                            <span className="font-mono font-medium text-neutral-800">TXN{Math.floor(Math.random() * 1000000)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Amount Paid</span>
                            <span className="font-bold text-neutral-800">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                    <p className="text-xs text-neutral-400 animate-pulse">Redirecting to orders...</p>
                </div>
            </div>
        )
    }

    const paymentMethods = [
        {
            id: "card",
            title: "Credit / Debit Card",
            icon: CreditCard,
            description: "Visa, Mastercard, RuPay",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            id: "upi",
            title: "UPI",
            icon: QrCode, // Using QRCode icon for UPI
            description: "Google Pay, PhonePe, Paytm",
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            id: "netbanking",
            title: "Net Banking",
            icon: Banknote,
            description: "All Indian banks supported",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            id: "cod",
            title: "Cash on Delivery",
            icon: Wallet,
            description: "Pay accurately at doorstep",
            color: "text-green-600",
            bg: "bg-green-50"
        }
    ]

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Secure Payment</h1>
                    <p className="text-neutral-500 flex items-center justify-center gap-2">
                        <ShieldCheck size={16} className="text-green-600" />
                        SSL Encrypted Transaction
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Options */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-semibold text-neutral-800 mb-4 px-1">Select Payment Method</h2>

                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${selectedMethod === method.id
                                        ? "bg-white border-orange-500 shadow-lg ring-1 ring-orange-500/20"
                                        : "bg-white border-neutral-200 hover:border-orange-200 hover:bg-orange-50/30 shadow-sm"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.bg} ${method.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <method.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold ${selectedMethod === method.id ? "text-neutral-900" : "text-neutral-700"}`}>
                                            {method.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500">{method.description}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === method.id
                                        ? "border-orange-500 bg-orange-500"
                                        : "border-neutral-300"
                                        }`}>
                                        {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-neutral-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Items Total</span>
                                    <span>₹{(order.totalAmount > 1000 ? order.totalAmount : order.totalAmount - 99).toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">{order.totalAmount > 1000 ? "Free" : "₹99"}</span>
                                </div>
                                <div className="h-px bg-neutral-100 my-2" />
                                <div className="flex justify-between items-end">
                                    <span className="font-semibold text-neutral-800">Total Payable</span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-orange-600">
                                            ₹{order.totalAmount.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className="w-full py-4 bg-neutral-900 text-white rounded-xl font-bold text-lg shadow-lg shadow-neutral-900/20 hover:bg-neutral-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-2 group"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay Now
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale transition-all hover:grayscale-0">
                                {/* Simple text placeholders for logos if actual SVGs aren't available */}
                                <span className="font-bold text-xs">VISA</span>
                                <span className="font-bold text-xs">Mastercard</span>
                                <span className="font-bold text-xs">UPI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="animate-spin text-orange-600" size={40} />
            </div>
        }>
            <PaymentContent />
        </Suspense>
    )
}
