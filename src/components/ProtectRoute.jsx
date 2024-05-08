import { Link } from "react-router-dom";

export default function ProtectRoute({
  message = "Vous devez d'abord vous connecter",
  redirect,
}) {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex gap-2 flex-col items-center justify-center">
      <h1 className="text-4xl text-center font-bold">{message}</h1>
      <Link
        to="/auth/signin"
        state={{ redirect }}
        className=" px-16 py-3 font-bold text-lg rounded border-2 border-[#B2B377] hover:text-white hover:bg-[#B2B377] transition-all duration-100"
      >
        Sign In
      </Link>
    </div>
  );
}
