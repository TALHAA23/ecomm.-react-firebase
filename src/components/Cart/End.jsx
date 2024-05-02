import { useEffect } from "react";
import { useCartStepsUpdater } from "../../hooks/CartStepsProvider";
import { useMutationState, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Error from "../Error";

export default function End() {
  const queryClient = useQueryClient();
  const updateCartStep = useCartStepsUpdater();
  const states = useMutationState({
    filters: { mutationKey: ["order-placement"] },
    select: (mutation) => mutation.state,
  });
  const orderPlacementMutation = states && states.length > 0 ? states[0] : null;
  if (!orderPlacementMutation)
    return (
      <h1 className="mt-20">
        Oops, we can't Confirm your order, please restart from step one
        <Link to="/cart" className=" underline text-blue-900">
          here
        </Link>
      </h1>
    );

  useEffect(() => {
    const invalidate = async () => {
      if (orderPlacementMutation.status == "success") {
        updateCartStep("end");
        await queryClient.invalidateQueries({
          queryKey: ["cart-items", "my-orders"],
        });
      }
    };

    invalidate();
  }, [orderPlacementMutation]);
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center h-[calc(100vh-100px)]">
      {orderPlacementMutation.status == "pending" ? (
        <div>
          <img
            src="/icons/circle-dashed-svgrepo-com.svg"
            alt="img"
            className="animate-spin"
          />
          <h1 className=" text-2xl">
            <span className=" text-green-600 font-bold">Almost There!</span>
            <span className=" border-b-4"> Your order is being processed.</span>
          </h1>
        </div>
      ) : orderPlacementMutation.status == "error" ? (
        <Error error={orderPlacementMutation.error} />
      ) : (
        <div className="text-center">
          <h1 className=" text-xl font-bold text-center">
            Order placed successfully
          </h1>
          <h1>Order Number: {orderPlacementMutation.data}</h1>
        </div>
      )}
    </div>
  );
}
