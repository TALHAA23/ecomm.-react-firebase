import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStepsUpdater } from "../../hooks/CartStepsProvider";
import { useUser } from "../../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getUserField from "../../utils/db/getUserField";
import Loader from "../Loader/Loader";
import AddressCard from "./AddressCard";
import updateShippingAddress from "../../utils/db/updateShippingAddress";
import { useOrderDetailsUpdater } from "../../hooks/OrderDetailsProvider";
import Error from "../Error";

export default function Addresses() {
  const user = useUser();
  const queryClient = useQueryClient();
  const captureOrderDetails = useOrderDetailsUpdater();
  const navigate = useNavigate();
  const updateCartStep = useCartStepsUpdater();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ["shipping-details"],
    queryFn: () => getUserField(user.uid, "shippingDetails"),
  });

  useEffect(() => {
    if (!isSuccess) return;
    const inUseAddress = data?.filter((address) => address.inuse)[0];
    setSelectedAddress(inUseAddress);
  }, [isSuccess]);

  useEffect(() => {
    user
      ? updateCartStep("logged in")
      : navigate("/auth/signin", { state: { redirect: "/cart/address" } });
  }, []);

  const moveToNextStep = () => {
    const inUseAddress = data?.filter((address) => address.inuse)[0];
    captureOrderDetails("shippingDetails", selectedAddress);
    if (selectedAddress.shippingAddress !== inUseAddress?.shippingAddress)
      updateShippingAddress(user.uid, selectedAddress).then(() => {
        queryClient.invalidateQueries({ queryKey: ["shipping-details"] });
      });
    updateCartStep("address");
    navigate("/cart/confirmation");
  };

  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;

  return (
    <div className=" mx-auto w-full max-w-[800px]">
      <div className="flex flex-col items-center gap-2">
        {data.length ? (
          data.map((address, index) => (
            <AddressCard
              key={index}
              shippingDetails={address}
              selectedAddress={selectedAddress}
              updateAddress={setSelectedAddress}
            />
          ))
        ) : (
          <h1 className="grow text-lg font-bold my-40  text-center">
            No Shipping address, Please create a shipping address below
          </h1>
        )}
      </div>
      <div className="flex flex-col gap-1 m-3">
        <Link
          to="/form/address-form"
          className="w-full bg-darker py-4 text-center text-lg font-bold rounded text-white hover:opacity-85"
        >
          Add new address
        </Link>
        <button
          onClick={moveToNextStep}
          disabled={!selectedAddress}
          className="w-full bg-darker py-4 text-lg font-bold rounded text-white hover:opacity-85 disabled:opacity-70"
        >
          Next
        </button>
      </div>
    </div>
  );
}
