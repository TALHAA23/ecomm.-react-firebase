import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStepsUpdater } from "../../hooks/CartStepsProvider";
import { useUser } from "../../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getUserField from "../../utils/db/getUserField";
import Loader from "../Loader/Loader";
import AddressCard from "./AddressCard";
import updateShippingAddress from "../../utils/db/updateShippingAddress";
import { useOrderDetailsUpdater } from "../../hooks/OrderDetailsProvider";

export default function Addresses() {
  const user = useUser();
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
    const inUseAddress = data.filter((address) => address.inuse);
    setSelectedAddress(inUseAddress[0]);
  }, [isSuccess]);

  useEffect(() => {
    user
      ? updateCartStep("logged in")
      : navigate("/auth/signin", { state: { redirect: "/cart/address" } });
  }, []);

  const moveToNextStep = () => {
    const inUseAddress = data.filter((address) => address.inuse);
    captureOrderDetails("shippingDetails", selectedAddress);
    if (selectedAddress !== inUseAddress)
      updateShippingAddress(user.uid, selectedAddress);
    updateCartStep("address");
    navigate("/cart/confirmation");
  };

  if (isPending) return <Loader />;

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <div className="flex flex-col items-center gap-2">
        {data.map((address, index) => (
          <AddressCard
            key={index}
            shippingDetails={address}
            selectedAddress={selectedAddress}
            updateAddress={setSelectedAddress}
          />
        ))}
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
