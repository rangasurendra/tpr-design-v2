// Chart utility functions

import * as d3 from 'd3'
import { ChartConfig } from './types'
import { CHART_DEFAULTS } from './constants'

/**
 * Merge chart configuration with defaults
 */
export function mergeChartConfig(config?: Partial<ChartConfig>): ChartConfig {
  return {
    width: config?.width ?? CHART_DEFAULTS.width,
    height: config?.height ?? CHART_DEFAULTS.height,
    margin: { ...CHART_DEFAULTS.margin, ...config?.margin },
    colors: config?.colors ?? CHART_DEFAULTS.colors,
    showTooltip: config?.showTooltip ?? true,
    showLegend: config?.showLegend ?? true,
  }
}

/**
 * Create and configure tooltip
 */
export function createTooltip() {
  return d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('opacity', 0)
    .style('background', 'rgba(0, 0, 0, 0.8)')
    .style('color', 'white')
    .style('padding', '8px')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('pointer-events', 'none')
    .style('z-index', '1000')
}

/**
 * Remove existing tooltip
 */
export function removeTooltip() {
  d3.selectAll('.tooltip').remove()
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return d3.timeFormat('%m/%d')(date)
}

/**
 * Format number for display
 */
export function formatNumber(value: number): string {
  return Math.round(value).toString()
}

/**
 * Get color from palette by index
 */
export function getColor(index: number, colors: string[]): string {
  return colors[index % colors.length]
}