// Application constants and configuration

export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6',
} as const

export const CHART_DEFAULTS = {
  width: 600,
  height: 300,
  margin: {
    top: 20,
    right: 80,
    bottom: 40,
    left: 50,
  },
  colors: [
    CHART_COLORS.primary,
    CHART_COLORS.success,
    CHART_COLORS.warning,
    CHART_COLORS.danger,
    CHART_COLORS.info,
    CHART_COLORS.purple,
  ],
} as const

export const SPLINE_CHART_DEFAULTS = {
  width: 500,
  height: 250,
  margin: {
    top: 20,
    right: 30,
    bottom: 40,
    left: 50,
  },
} as const

export const DONUT_CHART_DEFAULTS = {
  size: 180,
  innerRadiusRatio: 0.6,
  legendWidth: 120,
  gap: 20,
} as const

export const DASHBOARD_CONFIG = {
  dataPoints: 30, // days of trend data
  checklistItems: 8,
  tableRows: 5,
  tableColumns: 6,
} as const

export const DEFAULT_DROPDOWN_OPTIONS = [
  'Selections',
  'Options', 
  'Categories',
  'Items'
] as const