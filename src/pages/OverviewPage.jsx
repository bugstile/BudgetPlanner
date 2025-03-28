import { Button } from "@/components/ui/button"
import PieChartCard from "../components/statistics/PieChartCard"
import BarChartInteractive from "../components/statistics/BarChartInteractive"
import IncomeForm from "../components/overview/IncomeForm"

export default function OverviewPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-10 h-screen">
      <h1 className="text-4xl">React Dashboard</h1>
      <IncomeForm/>
      <Button>Click me</Button>
      <PieChartCard />
      <BarChartInteractive /> {/* Pass the current month as a prop */}
    </div>
  )
}