"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SellerCarousel from "@/components/SellerCarousel"

interface Product {
    id: string
    name: string
}

interface Seller {
    id: string
    businessName: string
    [key: string]: any
}

function ChooseSellerContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const productId = searchParams.get("productId")

    const [product, setProduct] = useState<Product | null>(null)
    const [sellers, setSellers] = useState<Seller[]>([])
    const [selectedSellerId, setSelectedSellerId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // Fetch Product Details only if productId exists
                if (productId) {
                    const productRes = await fetch(`/api/products/${productId}`)
                    if (productRes.ok) {
                        const data = await productRes.json()
                        setProduct(data.product)
                    }
                }

                // Always Fetch Verified Sellers
                const sellersRes = await fetch("/api/sellers")
                if (sellersRes.ok) {
                    const data = await sellersRes.json()
                    setSellers(data.sellers)
                }
            } catch (error) {
                console.error("Failed to fetch data", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [productId])

    const handleProceed = () => {
        if (!selectedSellerId) return

        // If productId exists, it's a "Buy Now" flow
        if (productId) {
            router.push(`/checkout?productId=${productId}&sellerId=${selectedSellerId}`)
        } else {
            // Otherwise, it's a "Cart Checkout" flow - we pass sellerId context
            // Note: In a real app, you might save this to context/session, 
            // but passing as query param works if checkout page looks for it or we just proceed.
            // Currently checkout uses cart items by default if no productId.
            // We pass sellerId just in case future logic needs it.
            router.push(`/checkout?sellerId=${selectedSellerId}`)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <p className="text-muted-foreground">Loading artisans...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
                        <ArrowLeft size={16} />
                        Back
                    </Button>
                    <h1 className="font-semibold text-lg hidden sm:block">Choose Your Artisan</h1>
                    <div className="w-[88px]"></div> {/* Spacer for alignment */}
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:py-12">

                {/* Hero Section */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Choose a Seller
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {product ? (
                            <>
                                Select the best artisan to craft your <strong>{product.name}</strong>.
                                <br className="hidden sm:block" />
                                Review their ratings, stories, and verified status below.
                            </>
                        ) : (
                            <>
                                Select an artisan to support with your order.
                                <br className="hidden sm:block" />
                                Your purchase directly empowers these talented creators.
                            </>
                        )}
                    </p>
                </div>

                {/* Carousel Section */}
                <div className="mb-12">
                    <SellerCarousel
                        sellers={sellers}
                        selectedId={selectedSellerId}
                        onSelect={setSelectedSellerId}
                    />
                </div>

                {/* Selection Summary & Action - Sticky Bottom for Mobile */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border sm:static sm:bg-transparent sm:border-0 sm:p-0 flex justify-center z-20">
                    <div className="w-full max-w-md sm:max-w-none flex flex-col sm:flex-row items-center justify-center gap-4">
                        {selectedSellerId && (
                            <div className="hidden sm:flex items-center gap-2 text-muted-foreground animate-in fade-in slide-in-from-bottom-2">
                                <span>Selected:</span>
                                <span className="font-semibold text-foreground">
                                    {sellers.find(s => s.id === selectedSellerId)?.businessName}
                                </span>
                            </div>
                        )}

                        <Button
                            onClick={handleProceed}
                            disabled={!selectedSellerId}
                            size="lg"
                            className={`w-full sm:w-auto px-8 py-6 text-lg font-bold shadow-xl transition-all duration-300
                    ${selectedSellerId
                                    ? "bg-primary hover:scale-105"
                                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                                }
                `}
                        >
                            Proceed to Checkout
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Spacer for fixed bottom on mobile */}
                <div className="h-24 sm:hidden"></div>

            </main>
        </div>
    )
}

export default function ChooseSellerPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <p className="text-muted-foreground">Loading artisans...</p>
                </div>
            </div>
        }>
            <ChooseSellerContent />
        </Suspense>
    )
}
