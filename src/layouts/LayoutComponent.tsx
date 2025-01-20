import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Sidebar from "../components/Sidebar";

function LayoutComponent() {
  return (
    <div className="flex h-screen bg-white w-full">
      <Sidebar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}

export default LayoutComponent;
