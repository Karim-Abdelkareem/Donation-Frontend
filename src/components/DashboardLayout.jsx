import { Navigate, Outlet, useLocation } from "react-router";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout() {
  const location = useLocation();

  if (location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/donations" replace />;
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 lg:mr-16 transition-all duration-300">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
