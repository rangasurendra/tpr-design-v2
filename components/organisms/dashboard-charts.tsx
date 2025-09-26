"use client"

import { TrendChart } from "./trend-chart"
import { SplineChart } from "./spline-chart"
import { TrendSeries, SplineDataPoint } from "@/lib/types"

interface DashboardChartsProps {
  trendData: TrendSeries[]
  splineData: SplineDataPoint[]
}

export function DashboardCharts({ trendData, splineData }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {trendData && trendData.length > 0 && (
        <TrendChart title="Performance Trends" data={trendData} />
      )}
      {splineData && splineData.length > 0 && (
        <SplineChart title="Monthly Growth" data={splineData} />
      )}
    </div>
  )
}