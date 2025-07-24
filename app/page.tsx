"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { Header } from "@/components/organisms/header"
import { ChecklistSection } from "@/components/organisms/checklist-section"
import { ContentCard } from "@/components/molecules/content-card"
import { DataTable } from "@/components/organisms/data-table"
import { TrendChart } from "@/components/organisms/trend-chart"
import { SplineChart } from "@/components/organisms/spline-chart"
import { DonutChart } from "@/components/organisms/donut-chart"
import { Button } from "@/components/atoms/button"

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Selected Tab")

  return (
    <DashboardLayout selectedTab={selectedTab} onTabSelect={setSelectedTab}>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <Header />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TrendChart title="Performance Trends" />
          <SplineChart title="Monthly Growth" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Checklist */}
          <div className="lg:col-span-1">
            <ChecklistSection />
          </div>

          {/* Right Column - Content Cards and Donut Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ContentCard title="Heading" action="Action">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900">Text</h4>
                    <p className="text-sm text-slate-600">Sub text</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Text</h4>
                    <p className="text-sm text-slate-600">Sub text</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Text</h4>
                    <p className="text-sm text-slate-600">Sub text</p>
                  </div>
                  <div className="pt-4">
                    <Button>Button</Button>
                  </div>
                </div>
              </ContentCard>

              <DonutChart title="Project Status" />
            </div>
          </div>
        </div>

        {/* Additional Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContentCard title="Heading" />
          <ContentCard title="Heading" />
        </div>

        {/* Data Table */}
        <DataTable title="Heading" />
      </div>
    </DashboardLayout>
  )
}
