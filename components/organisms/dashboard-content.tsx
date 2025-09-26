"use client"

import { ContentCard } from "@/components/molecules/content-card"
import { DonutChart } from "./donut-chart"
import { Button } from "@/components/atoms/button"
import { DonutDataPoint } from "@/lib/types"

interface DashboardContentProps {
  donutData: DonutDataPoint[]
}

export function DashboardContent({ donutData }: DashboardContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ContentCard title="Project Overview" action="View Details">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-slate-900">Active Projects</h4>
            <p className="text-sm text-slate-600">12 projects currently in progress</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-900">Team Members</h4>
            <p className="text-sm text-slate-600">8 members working on projects</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-900">Completed Tasks</h4>
            <p className="text-sm text-slate-600">156 tasks completed this month</p>
          </div>
          <div className="pt-4">
            <Button>View All Projects</Button>
          </div>
        </div>
      </ContentCard>

      {donutData && donutData.length > 0 && (
        <DonutChart title="Project Status" data={donutData} />
      )}
    </div>
  )
}