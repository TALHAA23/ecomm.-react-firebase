import { Link } from "react-router-dom";
import Logo from "./Logo";

const navigations = [
  "accuiel",
  "services",
  "nos nutritions",
  <Logo />,
  "nos Poussins",
  "nos poulets",
  "contact",
];
export default function Navigations() {
  return (
    <ul className="flex items-center justify-between h-full">
      {navigations.map((item, index) => (
        <li key={index} className=" capitalize">
          <Link to={typeof item == "string" ? item : "."}>{item}</Link>
        </li>
      ))}
    </ul>
  );
}
