import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router";
import PageTransition from "./animations/PageTransition";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
}
