import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout() {
  return (
    <div className="grid grid-rows-[60px_auto]">
      <NavBar />
      <Outlet />
    </div>
  );
}
