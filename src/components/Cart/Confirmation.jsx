import { useRef } from "react";
import { useUser } from "../../hooks/UserProvider";
import Line from "../Line";
import { useNavigate } from "react-router-dom";
import { useCartStepsUpdater } from "../../hooks/CartStepsProvider";
import { useOrderDetails } from "../../hooks/OrderDetailsProvider";

export default function Confirmation() {
  const user = useUser();
  const orderDetails = useOrderDetails();
  const updateCartStep = useCartStepsUpdater();
  const navigate = useNavigate();
  const today = useRef(new Date());

  const finalizeOrder = () => {
    updateCartStep("confirmation");
    navigate("/cart/end");
  };

  return (
    <div className="w-full max-w-[600px] bg-light rounded-lg p-3 mx-auto py-4 px-2">
      <h1 className=" text-center font-orelega-one text-4xl  font-bold flex flex-col mt-12">
        <span>Thanks for shopping</span>
        <span>with us, {user?.displayName}</span>
      </h1>
      <div className=" bg-gray-200 rounded-md flex py-4">
        {Array(2)
          .fill(null)
          .map((item, index) => (
            <p key={index} className="flex flex-col grow text-center">
              <span className="text-xs text-gray-600 "> Date order</span>
              <span> {today.current.toLocaleDateString()}</span>
            </p>
          ))}
      </div>
      <div className="my-3 flex flex-col gap-1">
        {orderDetails?.checkoutItems?.map(({ title, price, qty }, index) => (
          <Item key={index} title={title} price={price} qty={qty} />
        ))}
      </div>
      {/* address */}
      <Line />
      <ShippingAddress {...orderDetails.shippingDetails} />
      <Line />
      <Amount total={orderDetails.orderTotal} />
      <button
        onClick={finalizeOrder}
        className="w-full  bg-darker text-white font-bold text-xl rounded-md py-4 hover:opacity-85"
      >
        Confirm Order
      </button>
    </div>
  );
}

const Item = ({ title, price, qty }) => (
  <div className="flex bg-dark shadow-sm">
    <img
      className="w-[20%] aspect-auto object-cover "
      src="/images/chick.png"
      alt="img"
    />
    <div className=" p-3">
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-slate-600">${price}</p>
      <p className="text-slate-800 font-bold">
        <span className="text-xs font-normal"> Qty</span> x{qty}
      </p>
    </div>
  </div>
);

const ShippingAddress = ({ fullName, phoneNo, shippingAddress }) => (
  <div className="bg-darker rounded p-5 grid grid-cols-2">
    {[
      ["full name", fullName],
      ["phone number", phoneNo],
      ["address", shippingAddress],
    ].map(([key, value], index) => (
      <>
        <p key={index} className=" text-sm text-slate-800 capitalize">
          {key}
        </p>
        <p key={index + 1} className="text-sm font-semibold capitalize">
          {value}
        </p>
      </>
    ))}
  </div>
);

const Amount = ({ total }) => (
  <div className=" grid grid-cols-2 items-baseline p-5">
    <p className=" text-sm text-slate-800 capitalize">Order Total</p>
    <p className="text-xl text-red-800 font-semibold capitalize text-right">
      ${total}
    </p>
  </div>
);
