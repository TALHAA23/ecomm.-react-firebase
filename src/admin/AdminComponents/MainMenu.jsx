import { Link } from "react-router-dom";

const mainMenu = ["manage products", "manage users", "manage orders"];
export default function MainMenu() {
  return (
    <section className="min-h-[calc(100vh-60px)] flex items-center justify-center">
      <menu className=" border-2 border-[#B2B377] px-2 py-5 rounded-md w-full max-w-[500px] flex gap-1 flex-col">
        <h1 className="text-center text-4xl font-orelega-one my-4">
          Main Menu
        </h1>
        {mainMenu.map((menu, index) => (
          <Link
            to={menu.split(" ").join("")}
            key={index}
            className="w-full text-center capitalize border-2 border-[#F1F5A8] text-lg py-1 rounded-md hover:text-white hover:font-bold hover:bg-[#B2B377] hover:border-transparent transition-all duration-100"
          >
            {menu}
          </Link>
        ))}
      </menu>
    </section>
  );
}
