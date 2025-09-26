"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { SplineDataPoint, ChartConfig } from "@/lib/types"
import { mergeChartConfig, createTooltip, removeTooltip, formatNumber } from "@/lib/chart-utils"
import { SPLINE_CHART_DEFAULTS } from "@/lib/constants"

interface SplineChartProps {
  title: string
  data: SplineDataPoint[]
  config?: Partial<ChartConfig>
}

export function SplineChart({ title, data, config }: SplineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const chartConfig = mergeChartConfig({
    width: SPLINE_CHART_DEFAULTS.width,
    height: SPLINE_CHART_DEFAULTS.height,
    margin: SPLINE_CHART_DEFAULTS.margin,
    ...config,
  })

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    removeTooltip()

    const { width, height, margin, showTooltip } = chartConfig
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.category))
      .range([0, chartWidth])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) as number])
      .range([chartHeight, 0])

    // Line generator
    const line = d3
      .line<SplineDataPoint>()
      .x((d) => xScale(d.category) ?? 0)
      .y((d) => yScale(d.value))
      .curve(d3.curveCardinal)

    // Area generator for filled effect
    const area = d3
      .area<SplineDataPoint>()
      .x((d) => xScale(d.category) ?? 0)
      .y0(chartHeight)
      .y1((d) => yScale(d.value))
      .curve(d3.curveCardinal)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))

    g.append("g").call(d3.axisLeft(yScale))

    // Add gradient definition
    const defs = svg.append("defs")
    const gradient = defs
      .append("linearGradient")
      .attr("id", "splineGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", chartHeight)

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#8b5cf6").attr("stop-opacity", 0.8)
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#8b5cf6").attr("stop-opacity", 0.1)

    // Add area fill
    g.append("path")
      .datum(data)
      .attr("fill", "url(#splineGradient)")
      .attr("d", area)

    // Add spline line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#8b5cf6")
      .attr("stroke-width", 3)
      .attr("d", line)

    // Create tooltip if enabled
    let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null = null
    if (showTooltip) {
      tooltip = createTooltip()
    }

    // Add data points
    if (showTooltip) {
      g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => xScale(d.category) ?? 0)
        .attr("cy", (d) => yScale(d.value))
        .attr("r", 4)
        .attr("fill", "#8b5cf6")
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
          if (tooltip) {
            tooltip.transition().duration(200).style("opacity", 0.9)
            tooltip
              .html(`${d.category}: ${formatNumber(d.value)}`)
              .style("left", event.pageX + 10 + "px")
              .style("top", event.pageY - 28 + "px")
          }
        })
        .on("mouseout", () => {
          if (tooltip) {
            tooltip.transition().duration(500).style("opacity", 0)
          }
        })
    }
  }, [data, chartConfig])

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}