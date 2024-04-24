import { Link } from "react-router-dom";
import { useUser } from "../hooks/UserProvider";

const headerMenu = [
  ["profile", "profile-svgrepo-com.svg"],
  ["cart", "add-to-the-cart-svgrepo-com.svg"],
];
export default function Header() {
  const user = useUser();
  return (
    <div className=" w-full h-full bg-lighter flex gap-1 justify-end items-center px-2">
      {!user ? (
        <Link
          to="/auth/signin"
          className="  px-5 py-1  bg-darker rounded text-white font-semibold"
        >
          Login
        </Link>
      ) : (
        headerMenu.map(([link, icon], index) => (
          <Link
            key={index}
            to={link}
            className="h-[90%] aspect-square rounded-full bg-slate-200 p-1"
          >
            <img src={`/icons/${icon}`} alt="cart" />
          </Link>
        ))
      )}
    </div>
  );
}
