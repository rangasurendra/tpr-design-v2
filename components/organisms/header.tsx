"use client"

import { SearchBar } from "@/components/molecules/search-bar"
import { DropdownSelector } from "@/components/molecules/dropdown-selector"
import { useState } from "react"
import { DEFAULT_DROPDOWN_OPTIONS } from "@/lib/constants"

interface HeaderProps {
  title?: string
  placeholder?: string
  onSearch?: (value: string) => void
  onSelectionChange?: (value: string) => void
}

export function Header({ 
  title = "Title", 
  placeholder = "Search...",
  onSearch,
  onSelectionChange 
}: HeaderProps) {
  const [selectedTitle, setSelectedTitle] = useState(DEFAULT_DROPDOWN_OPTIONS[0])
  const [searchValue, setSearchValue] = useState("")

  const handleTitleChange = (value: string) => {
    setSelectedTitle(value)
    if (onSelectionChange) {
      onSelectionChange(value)
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <div className="bg-slate-800 p-6 rounded-t-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-medium">{title}</span>
          <div className="w-48">
            <DropdownSelector 
              options={Array.from(DEFAULT_DROPDOWN_OPTIONS)} 
              value={selectedTitle} 
              onChange={handleTitleChange} 
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <SearchBar 
          placeholder={placeholder} 
          value={searchValue} 
          onChange={handleSearchChange} 
        />
      </div>
    </div>
  )
}
