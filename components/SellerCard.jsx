import { Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import StarRating from "./StarRating"

export default function SellerCard({ seller, isSelected, onSelect }) {
    return (
        <div
            onClick={() => onSelect(seller.id)}
            className={`
        relative group cursor-pointer rounded-xl border p-6 transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 bg-card
        ${isSelected
                    ? "border-primary ring-2 ring-primary ring-offset-2 bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                }
      `}
        >
            {/* Selection Indicator */}
            <div className={`
        absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300
        ${isSelected ? "bg-primary text-primary-foreground scale-100" : "bg-transparent scale-0"}
      `}>
                <Check size={14} strokeWidth={3} />
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
                {/* Profile Image */}
                <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                        <AvatarImage src={seller.profileImage} alt={seller.name} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                            {seller.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-background">
                        {seller.category}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-tight text-foreground">{seller.businessName}</h3>
                    <p className="text-sm text-muted-foreground">{seller.name}</p>
                </div>

                {/* Rating */}
                <StarRating rating={seller.rating} />

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 px-2 min-h-[40px]">
                    "{seller.businessDescription}"
                </p>

                {/* Stats */}
                <div className="w-full pt-4 border-t border-border flex items-center justify-center gap-4 text-sm font-medium">
                    <div className="flex flex-col items-center">
                        <span className="text-foreground font-bold">{seller.totalOrders}+</span>
                        <span className="text-xs text-muted-foreground">Orders</span>
                    </div>
                    <div className="h-8 w-[1px] bg-border" />
                    <div className="flex flex-col items-center">
                        <span className="text-foreground font-bold">Verified</span>
                        <span className="text-xs text-muted-foreground">Status</span>
                    </div>
                </div>

                <Button
                    className={`w-full mt-2 transition-all ${isSelected ? "bg-primary hover:bg-primary" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"}`}
                    variant={isSelected ? "default" : "secondary"}
                >
                    {isSelected ? "Selected" : "Select Seller"}
                </Button>
            </div>
        </div>
    )
}
