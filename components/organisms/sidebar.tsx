"use client"

import { NavigationItem } from "@/components/molecules/navigation-item"
import { UserProfile } from "@/components/molecules/user-profile"

interface SidebarProps {
  selectedTab: string
  onTabSelect: (tab: string) => void
}

export function Sidebar({ selectedTab, onTabSelect }: SidebarProps) {
  const navigationItems = ["unselect tab", "Selected Tab", "unselect tab", "unselect tab", "unselect tab"]

  return (
    <div className="w-64 bg-slate-800 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Logo</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            label={item}
            isSelected={selectedTab === item}
            onClick={() => onTabSelect(item)}
          />
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <UserProfile name="User Name" email="Email" avatar="/placeholder.svg?height=40&width=40" />
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 pb-4 space-y-2">
        <NavigationItem label="unselect tab" />
        <NavigationItem label="unselect tab" />
      </div>
    </div>
  )
}
