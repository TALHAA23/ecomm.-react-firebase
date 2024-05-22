import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const navigations = [
  "services",
  "nos nutritions",
  "nos Poussins",
  <Logo />,
  "boutique",
  "nos poulets",
  "contact",
];
export default function Navigations() {
  return (
    <ul className="flex items-center justify-between h-full">
      {navigations.map((item, index) => (
        <li key={index} className=" capitalize">
          <NavLink
            to={typeof item == "string" ? item.split(" ").join("") : "."}
            className={({ isActive }) =>
              isActive
                ? " font-bold"
                : "font-normal border-b-2 border-transparent hover:border-gray-300"
            }
          >
            {item}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
