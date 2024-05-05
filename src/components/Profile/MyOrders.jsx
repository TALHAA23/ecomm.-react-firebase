import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useUser } from "../../hooks/UserProvider";
import getMyOrders from "../../utils/db/getMyOrders";
import Loader from "../Loader/Loader";
import Error from "../Error";
import NoResult from "../NoResult";

export default function MyOrders() {
  const user = useUser();
  const [myOrders, setMyOrders] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  const { isFetching, isSuccess, isError, error, data } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => getMyOrders(user.uid),
  });
  const handleChangeInSearchParam = (newParam) => {
    if (newParam) searchParam.set("q", newParam);
    else searchParam.delete("q");
    setSearchParam(searchParam);
  };

  useEffect(() => {
    if (!data) return;
    const q = searchParam.get("q");

    q
      ? setMyOrders(
          data.filter((order) => order.status == q.split(" ").join(""))
        )
      : setMyOrders(data);
  }, [searchParam]);

  useEffect(() => {
    if (!isSuccess) return;
    setMyOrders(data);
  }, [isSuccess]);
  if (isFetching) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data || !data.length)
    return (
      <NoResult
        title="You have no orders"
        desc="make some orders and you will see them here"
      />
    );

  return (
    <div className="w-full max-w-900px] my-8 mx-auto px-2">
      <Menu searchParam={searchParam} setParam={handleChangeInSearchParam} />
      <section className="flex flex-col gap-2">
        {myOrders.map((order, index) => (
          <ItemCard key={index} orderDetails={order} />
        ))}
      </section>
    </div>
  );
}

const Menu = ({ searchParam, setParam }) => {
  const q = searchParam.get("q");
  return (
    <menu className="flex justify-around bg-light rounded py-3 my-1">
      {["", "placed", "shipped", "delivered"].map((item, index) => (
        <li
          key={index}
          onClick={() => setParam(item)}
          className={`capitalize cursor-pointer ${
            item == q || (!item && !q)
              ? "font-bold border-b-2 border-gray-300"
              : "font-normal"
          }`}
        >
          {item ? item : "all"}
        </li>
      ))}
    </menu>
  );
};

const ItemCard = ({ orderDetails }) => {
  const { checkoutItems, orderTotal, shippingDetails } = orderDetails;
  const ref = useRef();
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
    <div className="relative w-full rounded p-2 bg-light h-32 flex">
      <img
        src="/images/chick.png"
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
            state={{ orderDetails, redirect: "/profile/myOrders" }}
            className=" border border-gray-400 rounded-md p-2 w-fit text-sm hover:bg-gray-400 hover:text-white"
          >
            +{checkoutItems.length - 1} More items, see full receipt
          </Link>
        )}
      </div>
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
};
