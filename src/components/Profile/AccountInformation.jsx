import { useQuery } from "@tanstack/react-query";
import getUserField from "../../utils/db/getUserField";
import { useUser } from "../../hooks/UserProvider";
import Loader from "../Loader/Loader";
import Error from "../Error";

export default function AccountInformation() {
  const user = useUser();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["account-information"],
    queryFn: () => getUserField(user?.uid, "accountInformation"),
  });
  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  return (
    <section className="w-full flex items-center justify-center p-4">
      <div className="w-[80%] bg-light p-5 rounded-md flex flex-col items-center gap-2">
        <img
          src="/icons/profile-svgrepo-com.svg"
          alt="avatar"
          className=" bg-darker rounded-full p-4 "
        />
        <h1 className=" font-orelega-one text-5xl my-2 text-center text-gray-700">
          Account Information
        </h1>
        {[
          ["username", data.displayName],
          ["email", data.email],
          ["creation date", data.metadata],
        ].map(([key, value], index) => (
          <div
            key={index}
            className="relative px-10 py-3 bg-gray-100 rounded-lg w-full max-w-[400px]"
          >
            <p className=" absolute left-0 top-0 bg-black/85 text-white rounded px-3 capitalize ">
              {key}
            </p>
            <h1 className="text-xl font-bold pt-3">{value}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}
