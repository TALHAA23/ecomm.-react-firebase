import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../hooks/UserProvider";
import Loader from "../Loader/Loader";
import getUserField from "../../utils/db/getUserField";
import updateShippingAddress from "../../utils/db/updateShippingAddress";
import { useMessageUpdater } from "../../hooks/MessageProvider";
import { useRef } from "react";
import Error from "../Error";
import NoResult from "../NoResult";

export default function ShippingAddresses() {
  const user = useUser();
  const updateMessage = useMessageUpdater();
  const queryClient = useQueryClient();
  const timeoutRef = useRef();
  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ["shipping-details"],
    queryFn: () => getUserField(user.uid, "shippingDetails"),
  });
  const updateAddressMutation = useMutation({
    mutationKey: ["update-address"],
    mutationFn: (newAddress) => updateShippingAddress(user.uid, newAddress),
    onMutate: () => updateMessage("Updating In use address..."),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shipping-details"] }),
    onError: (err) => updateMessage(err.message),
  });
  const handleAddressUpdate = (newAddress) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updateAddressMutation.mutate(newAddress);
    }, 5000);
    updateMessage("We will record your preferance in 5s");
  };
  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data || !data.length)
    return (
      <NoResult
        title="no address found"
        desc="you have not added address, in your checkout proccess you will be asked to add one you can skip for now"
      />
    );

  return (
    <div className="mx-auto my-10 w-full max-w-[800px]">
      <div className="flex flex-col items-center gap-2">
        {data?.map((address, index) => (
          <div
            key={index}
            onClick={() => handleAddressUpdate(address)}
            className={`relative w-full p-3 rounded ${
              address.inuse ? "bg-green-300" : "bg-lighter"
            }`}
          >
            {address.inuse && (
              <p className=" absolute right-1 top-1 px-2 py-1 rounded-full bg-green-900 text-white text-xs font-light">
                in use
              </p>
            )}
            <h1 className=" text-lg font-bold">{address.fullName}</h1>
            <p className="text-sm font-light">{address.phoneNo}</p>
            <div
              className={`p-2 rounded-md ${
                address.inuse ? "bg-green-500" : "bg-dark"
              }`}
            >
              <small className="text-xs font-light">Shipping address</small>
              <p className="text-lg text-center">{address.shippingAddress}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
