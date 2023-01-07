import { Outlet } from "@remix-run/react";
import { Navbar } from "~/components/ui/Navbar";
import Drawer from "react-modern-drawer";
import styles from "react-modern-drawer/dist/index.css";
import mainStyles from "../styles/main.css";
import { Sidebar } from "~/components/ui/Sidebar";
import { useContext } from "react";
import { UIContext } from "~/context/ui";

export const AppLayout = () => {
  const { sidemenuOpen, toggleSideMenu } = useContext(UIContext);
  return (
    <div className="flex-1 bg-bgWhite dark:bg-darkPrimary dark:text-white">
      <Navbar />
      <Drawer open={sidemenuOpen} onClose={toggleSideMenu} direction="left">
        <Sidebar />
      </Drawer>
      <div className="px-2 py-2">
        <Outlet />
      </div>
    </div>
  );
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: mainStyles },
  ];
}

export default AppLayout;
