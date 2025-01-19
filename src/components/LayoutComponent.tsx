import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Sidebar from "./Sidebar";
import { useContacts } from "../api/contacts";

function LayoutComponent() {
  const { data, isFetching, refetch } = useContacts();

  return (
    <div className="flex h-screen bg-white w-full">
      <Sidebar contacts={data || []} />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}

export default LayoutComponent;
