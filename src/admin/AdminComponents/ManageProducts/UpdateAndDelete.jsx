import { useMutation, useQuery } from "@tanstack/react-query";
import getProductByKeyword from "../../../utils/db/getProductsByKeyword";
import ModificationCard from "./ModificationCard";
import getAllProducts from "../../adminUtils/getAllProducts";
import Loader from "../../../components/Loader/Loader";
import Error from "../../../components/Error";
import NoResult from "../../../components/NoResult";
import { useRef, useState } from "react";

export default function UpdateAndDelete() {
  const timeoutId = useRef();
  const [filteredProducts, setFilterdProducts] = useState([]);
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
  });

  const handleChange = (e) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      const result = filter(data, e.target.value);
      setFilterdProducts(result);
    }, 1000);
  };

  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data?.length) return <NoResult title="No Result" />;

  return (
    <section className="bg-lighter w-full m-2 rounded">
      <form className="flex justify-center">
        <input
          onChange={handleChange}
          type="search"
          name="search"
          placeholder="recherchez l'élément et appuyez sur Entrée"
          className=" rounded-full my-2 border-2 h-10 w-full max-w-[300px] pl-3 placeholder:text-sm placeholder:font-light"
        />
      </form>

      {data?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2">
          {(filteredProducts?.length ? filteredProducts : data).map(
            (item, index) => (
              <ModificationCard key={index} props={item} />
            )
          )}
        </div>
      )}
    </section>
  );
}

const filter = (list, query) => {
  const regex = new RegExp(`^${query}`, "i");
  return list.filter(({ title }) => regex.test(title));
};
