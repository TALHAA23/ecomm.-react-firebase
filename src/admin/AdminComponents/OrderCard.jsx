import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import updateOrderStatus from "../adminUtils/updateOrderStatus";
import cancelOrder from "../adminUtils/cancelOrder";

export default function OrderCard({ orderDetails }) {
  const { checkoutItems, orderTotal, shippingDetails } = orderDetails;
  const ref = useRef();
  const [isStatusChangePanelOpen, setIsStatusChangePanelOpen] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(
    "/icons/left-arrow-backup-2-svgrepo-com (1).svg"
  );
  const showShippingDetails = () => {
    if (ref.current.classList.contains("w-0", "opacity-0")) {
      ref.current.classList.remove("w-0", "opacity-0");
      setArrowIcon("/icons/right-arrow-backup-2-svgrepo-com.svg");
    } else {
      ref.current.classList.add("w-0", "opacity-0");
      setArrowIcon("/icons/left-arrow-backup-2-svgrepo-com (1).svg");
    }
  };
  return (
    <div className="relative w-full rounded p-2 bg-light shadow-sm shadow-slate-500/75">
      <div className="flex h-32">
        <img
          src={orderDetails.img}
          alt="img"
          className="h-full aspect-square rounded"
        />
        <div className="grow px-2 flex flex-col justify-around">
          <h1 className="text-lg font-bold">{checkoutItems[0].title}</h1>
          <p>Qty: x{checkoutItems[0].qty}</p>
          <h2>
            Order Total: <span className="font-bold">${orderTotal}</span>
          </h2>
          {checkoutItems.length - 1 > 0 && (
            <Link
              to="/receipt"
              state={{ orderDetails, redirect: "/manageorders" }}
              className=" border border-gray-400 rounded-md p-2 w-fit text-sm hover:bg-gray-400 hover:text-white"
            >
              +{checkoutItems.length - 1} More items, see full receipt
            </Link>
          )}
        </div>
      </div>
      <Status
        orderId={orderDetails.id}
        orderBy={orderDetails.orderBy}
        status={orderDetails.status}
        openChangePanel={setIsStatusChangePanelOpen}
      />
      <ChangeStatus
        id={orderDetails.id}
        currentStatus={orderDetails.status}
        isPanelOpen={isStatusChangePanelOpen}
        changeOpenState={setIsStatusChangePanelOpen}
      />
      <div className="absolute overflow-hidden top-0 h-full w-fit  right-0 flex gap-0 items-center bg-darker rounded-l-xl">
        <button onClick={showShippingDetails} className="pl-2">
          <img src={arrowIcon} alt="" className="w-5" />
        </button>
        <div ref={ref} className="grow px-2 opacity-0 w-0">
          <h1 className="font-bold text-right">Shipping Details</h1>
          <h2 className="font-bold text-lg">{shippingDetails.fullName}</h2>
          <p>{shippingDetails.phoneNo}</p>
          <p>{shippingDetails.shippingAddress}</p>
        </div>
      </div>
    </div>
  );
}

const Status = ({ orderId, orderBy, status, openChangePanel }) => {
  const containerRef = useRef();
  const { isPending, isError, error, mutate } = useMutation({
    mutationKey: ["cancel-order"],
    mutationFn: () => cancelOrder(orderId, orderBy),
    onSuccess: () => {
      containerRef.current.parentElement.remove();
    },
  });
  return (
    <div ref={containerRef} className="m-1 flex gap-1">
      <h1 className="bg-green-500 px-3 py-2 rounded-full text-white text-sm capitalize">
        current Status: <span className="font-bold">{status}</span>
      </h1>
      <button
        onClick={mutate}
        disabled={isPending}
        className="bg-red-500 font-bold px-3 py-2 rounded-full text-white text-sm disabled:opacity-80"
      >
        {isPending ? "Canceling" : "Cancel Order"}
      </button>

      <button
        onClick={() => openChangePanel(true)}
        className="bg-orange-500 font-bold px-3 py-2 rounded-full text-white text-sm"
      >
        Change status
      </button>
    </div>
  );
};

const ChangeStatus = ({ id, currentStatus, isPanelOpen, changeOpenState }) => {
  const queryClient = useQueryClient();
  const { isPending, isError, error, mutate } = useMutation({
    mutationKey: ["update-status"],
    mutationFn: (status) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all-orders"] });
    },
  });

  return (
    <div
      className={`absolute pl-3 py-2 right-0 top-0 w-[70%] h-full flex flex-col justify-between bg-black/80 rounded-l-lg text-white  ${
        isPanelOpen ? "scale-x-100" : "scale-x-0"
      }  origin-right transition-all duration-150`}
    >
      <div>
        <h1 className="text-lg font-bold pt-2">Change status to</h1>
        {(isPending || isError) && (
          <p className="py-1 text-xs">
            {isPending ? "Changing status..." : isError ? error.message : ""}
          </p>
        )}
        <div className="flex gap-1 my-2">
          {["placed", "shipped", "delivered"].map((item, index) => (
            <button
              key={index}
              onClick={() => mutate(item)}
              disabled={isPending || item == currentStatus}
              className="px-3 py-1 rounded-full border-2 border-white text-sm capitalize hover:bg-white hover:text-black transition-all duration-100 disabled:bg-white disabled:text-black disabled:cursor-not-allowed"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button
          onClick={() => changeOpenState(false)}
          className="px-3 py-1 rounded-full border-2 border-white text-sm capitalize hover:bg-white hover:text-black transition-all duration-100 "
        >
          Close Panel
        </button>
      </div>
    </div>
  );
};
