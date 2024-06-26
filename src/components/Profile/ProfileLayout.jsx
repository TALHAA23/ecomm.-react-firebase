import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/UserProvider";
import ProtectRoute from "../ProtectRoute";
import signOutUser from "../../utils/authentication/signout";
import { useQueryClient } from "@tanstack/react-query";
import { useMessageUpdater } from "../../hooks/MessageProvider";

const menuItems = [
  "Information sur le compte",
  "Mes commandes",
  "adresse de livraison",
  "notifications",
];

export default function ProfileLayout() {
  const queryClient = useQueryClient();
  const user = useUser();
  const updateMessage = useMessageUpdater();
  if (!user) return <ProtectRoute redirect="/profile" />;
  return (
    <div className="flex min-h-screen">
      <ul className=" w-[300px] bg-[#F4F4F4] my-1 px-3 flex flex-col">
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
        <button
          onClick={async () => {
            try {
              await queryClient.invalidateQueries();
              signOutUser();
            } catch (err) {
              updateMessage(err.message);
            }
          }}
          className="w-full py-3 text-left my-1 rounded pl-2 capitalize bg-gray-300 hover:bg-gray-300/50"
        >
          Se déconnecter
        </button>
      </ul>
      <Outlet />
    </div>
  );
}
