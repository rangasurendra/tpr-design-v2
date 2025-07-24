"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DonutDataPoint {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  title: string
}

export function DonutChart({ title }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Generate sample donut data
  const generateDonutData = (): DonutDataPoint[] => {
    return [
      { label: "Completed", value: 65, color: "#10b981" },
      { label: "In Progress", value: 25, color: "#f59e0b" },
      { label: "Pending", value: 10, color: "#ef4444" },
    ]
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const chartSize = 180
    const radius = chartSize / 2
    const innerRadius = radius * 0.6
    const legendWidth = 120
    const totalWidth = chartSize + legendWidth + 20 // 20px gap
    const totalHeight = chartSize

    svg.attr("width", totalWidth).attr("height", totalHeight)

    const g = svg.append("g").attr("transform", `translate(${radius},${radius})`)

    const data = generateDonutData()

    // Create pie generator
    const pie = d3
      .pie<DonutDataPoint>()
      .value((d) => d.value)
      .sort(null)

    // Create arc generator
    const arc = d3.arc<d3.PieArcDatum<DonutDataPoint>>().innerRadius(innerRadius).outerRadius(radius)

    // Create hover arc generator
    const hoverArc = d3
      .arc<d3.PieArcDatum<DonutDataPoint>>()
      .innerRadius(innerRadius)
      .outerRadius(radius + 4) // Even smaller hover effect

    // Create arcs
    const arcs = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc")

    // Add paths
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", hoverArc)

        // Show tooltip with better positioning
        tooltip.transition().duration(200).style("opacity", 0.9)

        // Calculate tooltip position to keep it within viewport
        const tooltipWidth = 100
        const tooltipHeight = 40
        let left = event.pageX + 10
        let top = event.pageY - 28

        // Adjust if tooltip would go off screen
        if (left + tooltipWidth > window.innerWidth) {
          left = event.pageX - tooltipWidth - 10
        }
        if (top < 0) {
          top = event.pageY + 10
        }

        tooltip
          .html(`${d.data.label}<br/>${d.data.value}%`)
          .style("left", left + "px")
          .style("top", top + "px")
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("d", arc)

        tooltip.transition().duration(500).style("opacity", 0)
      })

    // Add labels
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .style("fill", "#ffffff")
      .text((d) => `${d.data.value}%`)

    // Add center text
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.3em")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("fill", "#374151")
      .text("100%")

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.8em")
      .style("font-size", "12px")
      .style("fill", "#6b7280")
      .text("Total")

    // Add legend to the right side
    const legend = svg.append("g").attr("transform", `translate(${chartSize + 20}, 30)`)

    const legendItems = legend
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`) // Vertical stacking

    legendItems
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", (d) => d.color)
      .attr("rx", 2)

    legendItems
      .append("text")
      .attr("x", 18)
      .attr("y", 9)
      .style("font-size", "11px")
      .style("fill", "#374151")
      .text((d) => d.label)

    legendItems
      .append("text")
      .attr("x", 18)
      .attr("y", 21)
      .style("font-size", "10px")
      .style("fill", "#6b7280")
      .text((d) => `${d.value}%`)

    // Create tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "donut-tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "1000")
  }, [])

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}
