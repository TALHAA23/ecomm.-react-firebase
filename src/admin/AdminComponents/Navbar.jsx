import { Link } from "react-router-dom";
import signOutUser from "../../utils/authentication/signout";

export default function NavBar() {
  return (
    <nav className="w-full bg-darker text-white flex items-center justify-between px-3">
      <Link to=".">Administration</Link>
      <h1 className="font-orelega-one text-4xl border-b-2">GRAIN DU SUD</h1>
      <button onClick={signOutUser}>Logout</button>
    </nav>
  );
}
