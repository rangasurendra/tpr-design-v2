import { cn } from "@/lib/utils"
import { User } from "lucide-react"

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <div
      className={cn("relative flex shrink-0 overflow-hidden rounded-full bg-slate-100", sizeClasses[size], className)}
    >
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-200">
          {fallback ? (
            <span className="text-sm font-medium text-slate-700">{fallback}</span>
          ) : (
            <User className="h-4 w-4 text-slate-500" />
          )}
        </div>
      )}
    </div>
  )
}
