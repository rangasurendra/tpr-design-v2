"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface SplineDataPoint {
  category: string
  value: number
}

interface SplineChartProps {
  title: string
}

export function SplineChart({ title }: SplineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Generate sample spline data
  const generateSplineData = (): SplineDataPoint[] => {
    const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return categories.map((category) => ({
      category,
      value: Math.floor(Math.random() * 80) + 20 + Math.sin(categories.indexOf(category) * 0.5) * 15,
    }))
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = 500 - margin.left - margin.right
    const height = 250 - margin.top - margin.bottom

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const data = generateSplineData()

    // Scales
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) as number])
      .range([height, 0])

    // Create spline line generator
    const line = d3
      .line<SplineDataPoint>()
      .x((d) => xScale(d.category) || 0)
      .y((d) => yScale(d.value))
      .curve(d3.curveCardinal.tension(0.5)) // Smooth spline curve

    // Add gradient definition
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "spline-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", 0)
      .attr("y2", 0)

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#8b5cf6").attr("stop-opacity", 0.1)

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#8b5cf6").attr("stop-opacity", 0.8)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "12px")

    g.append("g").call(d3.axisLeft(yScale).ticks(5)).selectAll("text").style("font-size", "12px")

    // Add area under the curve
    const area = d3
      .area<SplineDataPoint>()
      .x((d) => xScale(d.category) || 0)
      .y0(height)
      .y1((d) => yScale(d.value))
      .curve(d3.curveCardinal.tension(0.5))

    g.append("path").datum(data).attr("fill", "url(#spline-gradient)").attr("d", area)

    // Add the spline line
    g.append("path").datum(data).attr("fill", "none").attr("stroke", "#8b5cf6").attr("stroke-width", 3).attr("d", line)

    // Add data points
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.category) || 0)
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 4)
      .attr("fill", "#8b5cf6")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)

    // Add value labels on hover
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")

    g.selectAll(".dot")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip
          .html(`${d.category}: ${Math.round(d.value)}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0)
      })
  }, [])

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}
