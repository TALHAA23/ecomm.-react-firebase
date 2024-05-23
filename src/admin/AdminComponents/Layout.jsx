import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import { useUser } from "../../hooks/UserProvider";
import ProtectRoute from "../../components/ProtectRoute";

export default function Layout() {
  const user = useUser();

  if (!user) {
    return <h1>Something went wrong, please refresh the page</h1>;
  }

  return (
    <div className="grid grid-rows-[60px_auto]">
      <NavBar />
      <Outlet />
    </div>
  );
}
