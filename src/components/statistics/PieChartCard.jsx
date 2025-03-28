"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function PieChartCard() {
  const [chartData, setChartData] = useState([])
  const [chartConfig, setChartConfig] = useState({})

  useEffect(() => {
    const storedData = localStorage.getItem("react_dashboard_data_key")
    if (storedData) {
      const localData = JSON.parse(storedData)

      const data = localData.expenses.map(expense => {
        const categoryData = localData.categories.find(cat => cat.category === expense.spendingCategory);
        
        // Ensure categoryData is defined before accessing color
        return {
          browser: expense.spendingCategory,
          category: expense.totalAmount,
          fill: categoryData ? categoryData.color : '#000', // Fallback color if not found
        }
      })

      const config = Object.fromEntries(
        localData.categories.map(cat => [
          cat.category.toLowerCase(),
          {
            label: cat.category,
            color: cat.color,
          },
        ])
      )

      setChartData(data)
      setChartConfig(config)
    }
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Label</CardTitle>
        <CardDescription>Date</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie 
              data={chartData} 
              dataKey="category" 
              nameKey="browser"
              labelLine={false}
              label={false} 
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Overview and trajectory? <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Description
        </div>
      </CardFooter>
    </Card>
  )
}