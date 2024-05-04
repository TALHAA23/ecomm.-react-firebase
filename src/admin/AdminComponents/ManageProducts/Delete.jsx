import { useMutation } from "@tanstack/react-query";
import getProductByKeyword from "../../../utils/db/getProductsByKeyword";
import ModificationCard from "./ModificationCard";

export default function Delete() {
  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await getProductByKeyword(e.target.search.value);
    return res;
  };
  const { isPending, isError, error, data, mutate } = useMutation({
    mutationKey: ["update"],
    mutationFn: handleSearch,
  });
  console.log(data);

  return (
    <section className="bg-lighter w-full m-2 rounded">
      <form onSubmit={mutate} className="flex justify-center">
        <input
          type="search"
          name="search"
          placeholder="search item and press enter"
          className=" rounded-full my-2 border-2 h-10 w-full max-w-[300px] pl-3 placeholder:text-sm placeholder:font-light"
        />
      </form>
      <h1 className="text-center text-lg font-bold my-4">
        {isPending
          ? "Searching..."
          : isError
          ? error.message
          : data?.length
          ? ""
          : "No Result"}
      </h1>
      {data?.length && (
        <div className="flex flex-col items-center gap-2">
          {data.map((item) => (
            <ModificationCard props={item} />
          ))}
        </div>
      )}
    </section>
  );
}
