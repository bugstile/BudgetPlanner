import DashboardLayout from "@/layouts/DashboardLayout";
import OverviewPage from "@/pages/OverviewPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<OverviewPage />} />
    </Route>
  )
);

export default router;
