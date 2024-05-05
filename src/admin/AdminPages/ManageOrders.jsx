import { useQuery } from "@tanstack/react-query";
import getOrders from "../adminUtils/getOrders";
import OrderCard from "../AdminComponents/OrderCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error";
import NoResult from "../../components/NoResult";

export default function ManageOrders() {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["all-orders"],
    queryFn: getOrders,
  });

  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data.length) return <NoResult title="No Order Exist" />;

  return (
    <div className="w-full max-w-[1000px] bg-lighter mx-auto my-3">
      <h1 className="text-center w-fit mx-auto text-2xl font-bold py-3 border-b-2">
        Following order(s) are under process
      </h1>
      <div className="flex flex-col gap-2 px-4 py-2">
        {data.map((order, index) => (
          <OrderCard key={index} orderDetails={order} />
        ))}
      </div>
    </div>
  );
}
