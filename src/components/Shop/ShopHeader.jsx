import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ShopHeader() {
  const location = useLocation();
  return (
    <div className="w-full h-[60px] bg-gray-300 flex items-center px-2 text-cl-gray">
      <Link to=".">Home</Link> {location.pathname}
    </div>
  );
}
