"use client"

import React, { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const chartConfig = {
  views: {
    label: "Total Expenses",
  },
}

export default function BarChartInteractive({ month }) {
  const [chartData, setChartData] = useState([])
  const [colors, setColors] = useState({})

  useEffect(() => {
    const storedData = localStorage.getItem("react_dashboard_data_key")
    if (storedData) {
      const localData = JSON.parse(storedData)

      // Prepare data for the bar chart
      const data = localData.expenses.map(expense => ({
        date: expense.dateSpent,
        category: expense.spendingCategory,
        totalAmount: expense.totalAmount,
      }))

      // Filter by the specified month if provided
      const filteredData = month
        ? data.filter(expense => new Date(expense.date).getMonth() + 1 === month)
        : data

      // Group data by category and sum total amounts
      const groupedData = filteredData.reduce((acc, curr) => {
        const existing = acc.find(item => item.category === curr.category)
        if (existing) {
          existing.totalAmount += curr.totalAmount
        } else {
          acc.push({ category: curr.category, totalAmount: curr.totalAmount })
        }
        return acc
      }, [])

      // Prepare a color mapping based on categories
      const colorMapping = Object.fromEntries(
        localData.categories.map(cat => [cat.category, cat.color])
      )

      setChartData(groupedData)
      setColors(colorMapping) // Save the color mapping
    }
  }, [month])

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Total Expenses</CardTitle>
          <CardDescription>
            Total expenses by category
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip
              content={<ChartTooltipContent nameKey="totalAmount" />}
            />
            <Bar dataKey="totalAmount">
              {chartData.map((entry) => (
                <Cell key={entry.category} fill={colors[entry.category] || '#000'} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}