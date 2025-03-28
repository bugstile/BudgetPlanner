import { Button } from "@/components/ui/button"
import PieChartCard from "../components/statistics/PieChartCard"
import BarChartInteractive from "../components/statistics/BarChartInteractive"
import IncomeForm from "../components/overview/IncomeForm"

export default function OverviewPage() {
  return (
    <div className="flex items-center flex-col w-full h-full">
      <div className="p-6 pt-12">
        <h1 className="font-semibold text-4xl">Overview</h1>
      </div>
      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 pt-2 items-center">
        <div className="w-full bg-lighterBackground p-8 mt-8">
          <IncomeForm/>
        </div>
      </div>
      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 pt-2 items-center">
        <div className="w-full bg-lighterBackground p-8">
          <PieChartCard />
        </div>
      </div>
      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 pt-2 items-center">
        <div className="w-full bg-lighterBackground p-8">
          <BarChartInteractive />
        </div>
      </div>
    </div>
  )
}