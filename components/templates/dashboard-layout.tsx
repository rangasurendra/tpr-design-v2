import { Sidebar } from "@/components/organisms/sidebar"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  selectedTab: string
  onTabSelect: (tab: string) => void
}

export function DashboardLayout({ children, selectedTab, onTabSelect }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar selectedTab={selectedTab} onTabSelect={onTabSelect} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
