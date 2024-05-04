import { NavLink, Outlet } from "react-router-dom";

const menuItems = ["create", "update", "delete"];

export default function ManageProductsLayout() {
  return (
    <div className="flex min-h-screen">
      <ul className=" w-[200px] bg-[#F4F4F4] my-1 px-3 flex flex-col">
        <h1 className="text-lg font-bold text-cl-darker my-2">Menu</h1>
        {menuItems.map((menu, index) => (
          <NavLink
            key={index}
            end
            to={index == 0 ? "" : menu.split(" ").join("")}
            className={({ isActive }) => `
            w-full py-3  my-1 rounded pl-2 capitalize hover:bg-gray-300/50
            ${isActive ? "bg-gray-400 font-bold" : "bg-gray-300"}
            `}
          >
            {menu}
          </NavLink>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
