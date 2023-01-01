import { Outlet } from "@remix-run/react";
import React from "react";
import { Navbar } from "~/components/ui/Navbar";

export const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
