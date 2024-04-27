import { NavLink, Outlet } from "react-router-dom";

const menuItems = [
  "account information",
  "history",
  "shopping cart",
  "shipping address",
  "review and rating",
  "setting",
];

export default function ProfileLayout() {
  return (
    <div className="flex min-h-screen">
      <ul className=" w-[300px] bg-[#F4F4F4] my-1 px-3 flex flex-col">
        <h1 className="text-lg font-bold text-cl-darker my-2">Menu</h1>
        {menuItems.map((menu, index) => (
          <NavLink
            end
            to={index == 0 ? "" : menu.split(" ").join()}
            className={({ isActive }) => `
            w-full py-3  my-1 rounded pl-2 capitalize
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
