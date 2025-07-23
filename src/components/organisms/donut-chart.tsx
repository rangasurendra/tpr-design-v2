"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DonutData {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  title: string
}

export function DonutChart({ title }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Generate sample completion data
  const generateDonutData = (): DonutData[] => {
    return [
      { label: "Completed", value: 65, color: "#10b981" }, // green
      { label: "In Progress", value: 25, color: "#f59e0b" }, // amber
      { label: "Pending", value: 10, color: "#ef4444" }, // red
    ]
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous render

    const width = 300
    const height = 300
    const margin = 20
    const radius = Math.min(width, height) / 2 - margin
    const innerRadius = radius * 0.6 // Creates the donut hole

    svg.attr("width", width).attr("height", height)

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`)

    const data = generateDonutData()
    const total = d3.sum(data, (d) => d.value)

    // Create pie generator
    const pie = d3
      .pie<DonutData>()
      .value((d) => d.value)
      .sort(null)

    // Create arc generator
    const arc = d3.arc<d3.PieArcDatum<DonutData>>().innerRadius(innerRadius).outerRadius(radius)

    // Create hover arc (slightly larger)
    const hoverArc = d3
      .arc<d3.PieArcDatum<DonutData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius + 10)

    // Create arcs
    const arcs = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc")

    // Add paths
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", hoverArc)

        // Show tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px 12px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("opacity", 0)

        tooltip
          .html(`${d.data.label}: ${d.data.value}%`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1)
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arc)

        // Remove tooltip
        d3.selectAll(".tooltip").remove()
      })

    // Add percentage labels on arcs
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "white")
      .style("pointer-events", "none")
      .text((d) => `${d.data.value}%`)

    // Add center text showing total completion
    const completedPercentage = data.find((d) => d.label === "Completed")?.value || 0

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .style("fill", "#374151")
      .text(`${completedPercentage}%`)

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .style("font-size", "12px")
      .style("fill", "#6b7280")
      .text("Complete")

    // Add legend
    const legend = svg.append("g").attr("transform", `translate(20, ${height - 80})`)

    const legendItems = legend
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`)

    legendItems
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", (d) => d.color)
      .attr("rx", 2)

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .style("fill", "#374151")
      .text((d) => `${d.label} (${d.value}%)`)
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
