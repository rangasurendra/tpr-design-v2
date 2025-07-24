"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DataPoint {
  date: Date
  value: number
}

interface TrendData {
  name: string
  color: string
  data: DataPoint[]
}

interface TrendChartProps {
  title: string
}

export function TrendChart({ title }: TrendChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Generate random trend data
  const generateTrendData = (): TrendData[] => {
    const now = new Date()
    const dataPoints = 30 // 30 days of data

    const generateDataPoints = (baseValue: number, volatility: number): DataPoint[] => {
      const points: DataPoint[] = []
      let currentValue = baseValue

      for (let i = dataPoints - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
        // Add some trend and random variation
        currentValue += (Math.random() - 0.5) * volatility + Math.sin(i * 0.1) * 2
        points.push({ date, value: Math.max(0, currentValue) })
      }

      return points
    }

    return [
      {
        name: "Revenue",
        color: "#3b82f6", // blue
        data: generateDataPoints(100, 8),
      },
      {
        name: "Users",
        color: "#10b981", // green
        data: generateDataPoints(80, 6),
      },
      {
        name: "Orders",
        color: "#f59e0b", // amber
        data: generateDataPoints(60, 10),
      },
    ]
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous render

    const margin = { top: 20, right: 80, bottom: 40, left: 50 }
    const width = 600 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const trendData = generateTrendData()
    const allData = trendData.flatMap((d) => d.data)

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(allData, (d) => d.date) as [Date, Date])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allData, (d) => d.value) as number])
      .range([height, 0])

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%d")))

    g.append("g").call(d3.axisLeft(yScale))

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(() => ""),
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", "0.3")

    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => ""),
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", "0.3")

    // Add trend lines
    trendData.forEach((trend) => {
      g.append("path")
        .datum(trend.data)
        .attr("fill", "none")
        .attr("stroke", trend.color)
        .attr("stroke-width", 2)
        .attr("d", line)

      // Add dots for data points
      g.selectAll(`.dot-${trend.name}`)
        .data(trend.data)
        .enter()
        .append("circle")
        .attr("class", `dot-${trend.name}`)
        .attr("cx", (d) => xScale(d.date))
        .attr("cy", (d) => yScale(d.value))
        .attr("r", 3)
        .attr("fill", trend.color)
    })

    // Add legend
    const legend = g.append("g").attr("transform", `translate(${width + 10}, 20)`)

    trendData.forEach((trend, i) => {
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
