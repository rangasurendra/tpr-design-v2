"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface DropdownSelectorProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function DropdownSelector({ options, value, onChange, placeholder }: DropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950"
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-sm text-left hover:bg-slate-50 first:rounded-t-md last:rounded-b-md"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
