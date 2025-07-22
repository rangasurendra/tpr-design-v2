"use client"

import { cn } from "@/lib/utils"

interface NavigationItemProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
}

export function NavigationItem({ label, isSelected, onClick }: NavigationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors",
        isSelected ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white",
      )}
    >
      {label}
    </button>
  )
}
