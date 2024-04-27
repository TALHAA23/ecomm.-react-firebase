import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import getProducts from "../../utils/db/getProducts";
import Loader from "../Loader/Loader";
export default function ProductsArea() {
  const [page, setPage] = useState(1);
  const [lastDoc, setLastDoc] = useState(null);
  const { isPending, isSuccess, isFetching, isError, error, data } = useQuery({
    queryKey: [`product-page-${page}`],
    queryFn: () => getProducts(lastDoc),
    staleTime: 80000000,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (data) setLastDoc(data.lastDocRef);
  }, [isFetching]);

  if (isPending) return <Loader />;
  else if (isError) return <h1>{error.message}</h1>;

  return (
    <div>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 p-3">
        {data.products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </section>
      <div className="py-3 flex justify-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() =>
            setPage((prevPage) => (prevPage <= 1 ? prevPage : prevPage - 1))
          }
          className="w-1/2 max-w-[300px] py-2 text-lg font-bold bg-darker rounded-md text-white disabled:opacity-80 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          disabled={!data || data.products.length < 9 || isFetching}
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="w-1/2 max-w-[300px] py-2 text-lg font-bold bg-darker rounded-md text-white disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isFetching ? "Fetching..." : "Next"}
        </button>
      </div>
    </div>
  );
}
