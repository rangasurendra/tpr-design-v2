"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { DonutDataPoint, ChartConfig } from "@/lib/types"
import { mergeChartConfig, createTooltip, removeTooltip, formatNumber } from "@/lib/chart-utils"
import { DONUT_CHART_DEFAULTS } from "@/lib/constants"

interface DonutChartProps {
  title: string
  data: DonutDataPoint[]
  config?: Partial<ChartConfig>
}

export function DonutChart({ title, data, config }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const chartConfig = mergeChartConfig(config)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    removeTooltip()

    const { showTooltip } = chartConfig
    const { size, innerRadiusRatio, legendWidth, gap } = DONUT_CHART_DEFAULTS
    const radius = size / 2
    const innerRadius = radius * innerRadiusRatio
    const totalWidth = size + legendWidth + gap
    const totalHeight = size

    svg.attr("width", totalWidth).attr("height", totalHeight)

    // Chart group
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${radius}, ${radius})`)

    // Legend group
    const legendGroup = svg
      .append("g")
      .attr("transform", `translate(${size + gap}, 20)`)

    // Pie generator
    const pie = d3
      .pie<DonutDataPoint>()
      .value((d) => d.value)
      .sort(null)

    // Arc generator
    const arc = d3
      .arc<d3.PieArcDatum<DonutDataPoint>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)

    // Create tooltip if enabled
    let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null = null
    if (showTooltip) {
      tooltip = createTooltip()
    }

    // Draw arcs
    const arcs = chartGroup
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .style("cursor", showTooltip ? "pointer" : "default")
      .on("mouseover", (event, d) => {
        if (tooltip) {
          tooltip.transition().duration(200).style("opacity", 0.9)
          tooltip
            .html(`${d.data.label}: ${formatNumber(d.data.value)}%`)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px")
        }
      })
      .on("mouseout", () => {
        if (tooltip) {
          tooltip.transition().duration(500).style("opacity", 0)
        }
      })

    // Add legend
    const legendItems = legendGroup
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`)

    legendItems
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", (d) => d.color)

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .style("fill", "#374151")
      .text((d) => d.label)

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .attr("dx", (d) => d.label.length * 7 + 10) // Approximate text width
      .style("font-size", "12px")
      .style("fill", "#6b7280")
      .text((d) => `${formatNumber(d.value)}%`)

  }, [data, chartConfig])

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}