import { Star, StarHalf } from "lucide-react"

export default function StarRating({ rating }) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
            {hasHalfStar && <StarHalf size={16} className="fill-yellow-400 text-yellow-400" />}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={16} className="text-gray-300" />
            ))}
            <span className="text-sm font-medium text-muted-foreground ml-1">({rating.toFixed(1)})</span>
        </div>
    )
}
