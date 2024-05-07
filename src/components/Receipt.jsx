import { Link, useLocation } from "react-router-dom";
import Line from "./Line";
import { Timestamp } from "firebase/firestore";
import formatDate from "../assets/formatDate";

export default function Receipt() {
  const { orderDetails, redirect } = useLocation().state;

  const placementDate = formatDate(
    new Timestamp(
      orderDetails.placementDate.seconds,
      orderDetails.placementDate.nanoseconds
    ).toDate()
  );

  return (
    <div className="w-full mt-20 max-w-[600px] bg-light rounded-lg p-3 mx-auto py-4 px-2 flex flex-col">
      <h1 className="text-right font-bold text-xl">Receipt</h1>
      <div className=" bg-gray-200 rounded-md flex py-4">
        <p className="flex flex-col grow text-center">
          <span className="text-xs text-gray-600 "> Placement Date</span>
          <span>{placementDate}</span>
        </p>
      </div>
      <div className="my-3 flex flex-col gap-1">
        {orderDetails?.checkoutItems?.map(
          ({ title, price, qty, img }, index) => (
            <Item key={index} title={title} price={price} qty={qty} img={img} />
          )
        )}
      </div>
      {/* address */}
      <Line />
      <ShippingAddress {...orderDetails.shippingDetails} />
      <Line />
      <Amount total={orderDetails.orderTotal} />
      <Link
        to={redirect}
        className="w-full text-center bg-darker text-white font-bold text-xl rounded-md py-4 hover:opacity-85"
      >
        Go Back
      </Link>
    </div>
  );
}

const Item = ({ title, price, qty, img }) => (
  <div className="flex bg-dark shadow-sm">
    <img className="w-[20%] aspect-auto object-cover " src={img} alt="img" />
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
