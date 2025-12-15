"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SellerCard from "./SellerCard"

export default function SellerCarousel({ sellers, selectedId, onSelect }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        dragFree: true
    })

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    const onSelectEmbla = (api) => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }

    useEffect(() => {
        if (!emblaApi) return
        onSelectEmbla(emblaApi)
        emblaApi.on("select", onSelectEmbla)
        emblaApi.on("reInit", onSelectEmbla)
    }, [emblaApi])

    if (!sellers.length) {
        return <div className="text-center text-muted-foreground py-10">No verified sellers available at the moment.</div>
    }

    return (
        <div className="relative group/carousel">
            {/* Carousel Container */}
            <div className="overflow-hidden px-1 -mx-1 py-4" ref={emblaRef}>
                <div className="flex gap-4 sm:gap-6">
                    {sellers.map((seller) => (
                        <div className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]" key={seller.id}>
                            <SellerCard
                                seller={seller}
                                isSelected={selectedId === seller.id}
                                onSelect={onSelect}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden sm:block">
                <Button
                    variant="outline"
                    size="icon"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full h-12 w-12 shadow-lg border-primary/20 bg-background/80 backdrop-blur-sm transition-all duration-300
            ${!canScrollPrev ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/carousel:opacity-100'}
          `}
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full h-12 w-12 shadow-lg border-primary/20 bg-background/80 backdrop-blur-sm transition-all duration-300
            ${!canScrollNext ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/carousel:opacity-100'}
          `}
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            {/* Mobile Indicator similar to Instagram/various apps */}
            <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
                {sellers.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1.5 rounded-full transition-all duration-300 
                ${index === emblaApi?.selectedScrollSnap() ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
                    />
                ))}
            </div>
        </div>
    )
}
