// Data model types for the dashboard application

export interface DataPoint {
  date: Date
  value: number
}

export interface TrendSeries {
  name: string
  color: string
  data: DataPoint[]
}

export interface SplineDataPoint {
  category: string
  value: number
}

export interface DonutDataPoint {
  label: string
  value: number
  color: string
}

export interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

export interface TableColumn {
  key: string
  label: string
  width?: string
}

export interface TableRow {
  [key: string]: string | number | React.ReactNode
}

export interface TableData {
  columns: TableColumn[]
  rows: TableRow[]
}

export interface ChartConfig {
  width?: number
  height?: number
  margin?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  colors?: string[]
  showTooltip?: boolean
  showLegend?: boolean
}

export interface DashboardData {
  trendData: TrendSeries[]
  splineData: SplineDataPoint[]
  donutData: DonutDataPoint[]
  checklistItems: ChecklistItem[]
  tableData: TableData
}