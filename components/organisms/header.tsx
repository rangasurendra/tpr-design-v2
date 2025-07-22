"use client"

import { SearchBar } from "@/components/molecules/search-bar"
import { DropdownSelector } from "@/components/molecules/dropdown-selector"
import { useState } from "react"

export function Header() {
  const [selectedTitle, setSelectedTitle] = useState("Selections")
  const [searchValue, setSearchValue] = useState("")

  const titleOptions = ["Selections", "Options", "Categories", "Items"]

  return (
    <div className="bg-slate-800 p-6 rounded-t-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-medium">Title</span>
          <div className="w-48">
            <DropdownSelector options={titleOptions} value={selectedTitle} onChange={setSelectedTitle} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <SearchBar placeholder="Search..." value={searchValue} onChange={setSearchValue} />
      </div>
    </div>
  )
}
