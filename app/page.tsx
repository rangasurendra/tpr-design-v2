"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { Header } from "@/components/organisms/header"
import { ChecklistSection } from "@/components/organisms/checklist-section"
import { ContentCard } from "@/components/molecules/content-card"
import { DataTable } from "@/components/organisms/data-table"
import { DashboardCharts } from "@/components/organisms/dashboard-charts"
import { DashboardContent } from "@/components/organisms/dashboard-content"
import { useDashboardData } from "@/hooks/use-dashboard-data"

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Dashboard")
  const { data, loading } = useDashboardData()

  if (loading || !data) {
    return (
      <DashboardLayout selectedTab={selectedTab} onTabSelect={setSelectedTab}>
        <div className="p-6 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-2 text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout selectedTab={selectedTab} onTabSelect={setSelectedTab}>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <Header />

        {/* Charts Section */}
        <DashboardCharts 
          trendData={data.trendData} 
          splineData={data.splineData} 
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Checklist */}
          <div className="lg:col-span-1">
            <ChecklistSection 
              items={data.checklistItems}
              title="Project Tasks"
            />
          </div>

          {/* Right Column - Content Cards and Donut Chart */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardContent donutData={data.donutData} />
          </div>
        </div>

        {/* Additional Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContentCard title="Recent Activity">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-900">Task Completed</p>
                  <p className="text-sm text-slate-600">Project Alpha milestone reached</p>
                </div>
                <span className="text-xs text-slate-500">2h ago</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-900">New Team Member</p>
                  <p className="text-sm text-slate-600">Sarah joined the development team</p>
                </div>
                <span className="text-xs text-slate-500">1d ago</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium text-slate-900">Budget Updated</p>
                  <p className="text-sm text-slate-600">Q4 budget approved and allocated</p>
                </div>
                <span className="text-xs text-slate-500">3d ago</span>
              </div>
            </div>
          </ContentCard>
          
          <ContentCard title="System Status">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Server Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">API Response</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Slow</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Cache</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Optimal</span>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* Data Table */}
        <DataTable title="Project Data" data={data.tableData} />
      </div>
    </DashboardLayout>
  )
}
