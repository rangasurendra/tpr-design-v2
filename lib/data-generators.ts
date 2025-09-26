// Data generation utilities for dashboard components

import { 
  DataPoint, 
  TrendSeries, 
  SplineDataPoint, 
  DonutDataPoint, 
  ChecklistItem, 
  TableData 
} from './types'
import { CHART_COLORS, DASHBOARD_CONFIG } from './constants'

/**
 * Generate random trend data points
 */
export function generateDataPoints(baseValue: number, volatility: number): DataPoint[] {
  const now = new Date()
  const points: DataPoint[] = []
  let currentValue = baseValue

  for (let i = DASHBOARD_CONFIG.dataPoints - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    // Add some trend and random variation
    currentValue += (Math.random() - 0.5) * volatility + Math.sin(i * 0.1) * 2
    points.push({ date, value: Math.max(0, currentValue) })
  }

  return points
}

/**
 * Generate sample trend chart data
 */
export function generateTrendData(): TrendSeries[] {
  return [
    {
      name: 'Revenue',
      color: CHART_COLORS.primary,
      data: generateDataPoints(100, 8),
    },
    {
      name: 'Users',
      color: CHART_COLORS.success,
      data: generateDataPoints(80, 6),
    },
    {
      name: 'Orders',
      color: CHART_COLORS.warning,
      data: generateDataPoints(60, 10),
    },
  ]
}

/**
 * Generate sample spline chart data
 */
export function generateSplineData(): SplineDataPoint[] {
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return categories.map((category) => ({
    category,
    value: Math.floor(Math.random() * 80) + 20 + Math.sin(categories.indexOf(category) * 0.5) * 15,
  }))
}

/**
 * Generate sample donut chart data
 */
export function generateDonutData(): DonutDataPoint[] {
  return [
    { label: 'Completed', value: 65, color: CHART_COLORS.success },
    { label: 'In Progress', value: 25, color: CHART_COLORS.warning },
    { label: 'Pending', value: 10, color: CHART_COLORS.danger },
  ]
}

/**
 * Generate sample checklist items
 */
export function generateChecklistItems(): ChecklistItem[] {
  return Array.from({ length: DASHBOARD_CONFIG.checklistItems }, (_, index) => ({
    id: `item-${index}`,
    label: `Item ${index + 1}`,
    completed: false,
  }))
}

/**
 * Generate sample table data
 */
export function generateTableData(): TableData {
  const columns = Array.from({ length: DASHBOARD_CONFIG.tableColumns }, (_, i) => ({
    key: `col-${i}`,
    label: 'Heading',
  }))

  const rows = Array.from({ length: DASHBOARD_CONFIG.tableRows }, (_, rowIndex) => {
    const row: Record<string, string> = {}
    columns.forEach(col => {
      row[col.key] = `Value ${rowIndex + 1}`
    })
    return row
  })

  return { columns, rows }
}

/**
 * Generate all dashboard data at once
 */
export function generateDashboardData() {
  return {
    trendData: generateTrendData(),
    splineData: generateSplineData(),
    donutData: generateDonutData(),
    checklistItems: generateChecklistItems(),
    tableData: generateTableData(),
  }
}