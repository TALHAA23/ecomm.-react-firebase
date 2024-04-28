import { useRef } from "react";
import { useUser } from "../../hooks/UserProvider";
import Line from "../Line";
import { useNavigate } from "react-router-dom";
import { useCartStepsUpdater } from "../../hooks/CartStepsProvider";

export default function Confirmation() {
  const user = useUser();
  const updateCartStep = useCartStepsUpdater();
  const navigate = useNavigate();
  const today = useRef(new Date());

  const finalizeOrder = () => {
    updateCartStep("confirmation");
    navigate("/cart/end");
  };

  return (
    <div className="w-full max-w-[600px] bg-light rounded-lg p-3 m-4 py-4 px-2">
      <h1 className=" text-center font-orelega-one text-4xl  font-bold flex flex-col mt-12">
        <span>Thanks for shopping</span>
        <span>with us, {user?.displayName}</span>
      </h1>
      <div className=" bg-gray-200 rounded-md flex py-4">
        {Array(2)
          .fill(null)
          .map(() => (
            <p className="flex flex-col grow text-center">
              <span className="text-xs text-gray-600 "> Date order</span>
              <span> {today.current.toLocaleDateString()}</span>
            </p>
          ))}
      </div>
      <div className="my-3 flex flex-col gap-1">
        <Item />
        <Item />
      </div>
      {/* address */}
      <Line />
      <ShippingAddress />
      <Line />
      <Amount />
      <button
        onClick={finalizeOrder}
        className="w-full  bg-darker text-white font-bold text-xl rounded-md py-4 hover:opacity-85"
      >
        Confirm Order
      </button>
    </div>
  );
}

const Item = () => (
  <div className="flex bg-dark shadow-sm">
    <img
      className="w-[20%] aspect-auto object-cover "
      src="/images/chick.png"
      alt="img"
    />
    <div className=" p-3">
      <h1 className="text-lg font-bold">Poussin arbor</h1>
      <p className="text-slate-600">$10</p>
      <p className="text-slate-800 font-bold">
        <span className="text-xs font-normal"> Qty</span> x3
      </p>
    </div>
  </div>
);

const ShippingAddress = () => (
  <div className="bg-darker rounded p-5 grid grid-cols-2">
    {[
      ["full name", "Talha sifat"],
      ["phone number", "+2344323252"],
      ["address", "street address, city, state, Code"],
    ].map(([key, value]) => (
      <>
        <p className=" text-sm text-slate-800 capitalize">{key}</p>
        <p className="text-sm font-semibold capitalize">{value}</p>
      </>
    ))}
  </div>
);

const Amount = () => (
  <div className=" grid grid-cols-2 items-baseline p-5">
    <p className=" text-sm text-slate-800 capitalize">Order Total</p>
    <p className="text-xl text-red-800 font-semibold capitalize text-right">
      $23
    </p>
  </div>
);
