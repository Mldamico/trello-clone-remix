import { Outlet } from "@remix-run/react";
import React from "react";

export const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};