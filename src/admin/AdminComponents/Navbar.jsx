import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full bg-darker text-white flex items-center justify-between px-3">
      <Link to=".">Administration</Link>
      <button>Logout</button>
    </nav>
  );
}
