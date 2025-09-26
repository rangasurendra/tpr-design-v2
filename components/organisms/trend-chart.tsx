"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { TrendSeries, ChartConfig } from "@/lib/types"
import { mergeChartConfig, createTooltip, removeTooltip, formatDate, formatNumber } from "@/lib/chart-utils"

interface TrendChartProps {
  title: string
  data: TrendSeries[]
  config?: Partial<ChartConfig>
}

export function TrendChart({ title, data, config }: TrendChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const chartConfig = mergeChartConfig(config)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous render
    removeTooltip() // Remove any existing tooltips

    const { width, height, margin, showTooltip, showLegend } = chartConfig
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const allData = data.flatMap((d) => d.data)

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(allData, (d) => d.date) as [Date, Date])
      .range([0, chartWidth])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allData, (d) => d.value) as number])
      .range([chartHeight, 0])

    // Line generator
    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%d")))

    g.append("g").call(d3.axisLeft(yScale))

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-chartHeight)
          .tickFormat(() => ""),
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", "0.3")

    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => ""),
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", "0.3")

    // Create tooltip if enabled
    let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null = null
    if (showTooltip) {
      tooltip = createTooltip()
    }

    // Add trend lines
    data.forEach((trend) => {
      g.append("path")
        .datum(trend.data)
        .attr("fill", "none")
        .attr("stroke", trend.color)
        .attr("stroke-width", 2)
        .attr("d", line)

      // Add dots for data points
      if (showTooltip) {
        g.selectAll(`.dot-${trend.name}`)
          .data(trend.data)
          .enter()
          .append("circle")
          .attr("class", `dot-${trend.name}`)
          .attr("cx", (d) => xScale(d.date))
          .attr("cy", (d) => yScale(d.value))
          .attr("r", 3)
          .attr("fill", trend.color)
          .style("cursor", "pointer")
          .on("mouseover", (event, d) => {
            if (tooltip) {
              tooltip.transition().duration(200).style("opacity", 0.9)
              tooltip
                .html(`${trend.name}<br/>${formatDate(d.date)}: ${formatNumber(d.value)}`)
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
    })

    // Add legend if enabled
    if (showLegend) {
      const legend = g.append("g").attr("transform", `translate(${chartWidth + 10}, 20)`)

      data.forEach((trend, i) => {
        const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`)

        legendRow.append("rect").attr("width", 12).attr("height", 2).attr("fill", trend.color)

        legendRow
          .append("text")
          .attr("x", 20)
          .attr("y", 0)
          .attr("dy", "0.35em")
          .style("font-size", "12px")
          .style("fill", "#374151")
          .text(trend.name)
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
