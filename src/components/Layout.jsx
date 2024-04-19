import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import Header from "./Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  return (
    <div className=" grid grid-rows-[40px_60px_auto_100vh]">
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
