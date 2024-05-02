// TODO: Make the cart real time
// TODO: Create a provider of Timeout
import { useMutation, useQuery } from "@tanstack/react-query";
import CartItem from "../components/Cart/CartItem";
import { useUser } from "../hooks/UserProvider";
import getCartItems from "../utils/db/getCartItems";
import Loader from "../components/Loader/Loader";
import { useEffect, useRef, useState } from "react";
import toggleProductsReadyState from "../utils/db/toggleProductsReadyState";
import { useMessageUpdater } from "../hooks/MessageProvider";
import { Link, useNavigate } from "react-router-dom";
import { useCartStepsUpdater } from "../hooks/CartStepsProvider";
import calculateTotalPrice from "../assets/calculateCartTotal";
import { useOrderDetailsUpdater } from "../hooks/OrderDetailsProvider";
import Error from "../components/Error";

export default function Cart() {
  const updateCartStep = useCartStepsUpdater();
  const user = useUser();
  const updateMessage = useMessageUpdater();
  const captureOrderDetails = useOrderDetailsUpdater();
  const timeoutId = useRef();
  const navigate = useNavigate();
  const [items, setItems] = useState();
  const [cartTotal, setCartTotal] = useState(0);
  const [itemToToggle, setItemToToggle] = useState([]);
  const { isPending, isSuccess, isFetching, isError, error, data } = useQuery({
    queryKey: ["cart-items"],
    queryFn: () => getCartItems(user.uid, setItems),
    staleTime: 86400000,
  });

  const toggleItemsQuery = useMutation({
    mutationKey: ["toggle"],
    mutationFn: () => toggleProductsReadyState(user.uid, itemToToggle),
    onSuccess: () => setItemToToggle([]),
    onError: (err) => updateMessage(err.message),
  });

  const toggleItem = (itemId) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id !== itemId ? item : { ...item, ready: !item.ready }
      );
    });
    setItemToToggle((prevItems) => {
      if (prevItems.includes(itemId))
        return prevItems.filter((item) => item !== itemId);
      return [...prevItems, itemId];
    });
  };
  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  const changeItemQty = (itemId, diraction) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id !== itemId
          ? item
          : {
              ...item,
              qty:
                diraction == "inc"
                  ? item.qty + 1
                  : item.qty == 1
                  ? item.qty
                  : item.qty - 1,
            }
      )
    );
  };

  const moveToNextStep = () => {
    const readyItems = items.filter((item) => item.ready);
    if (!readyItems.length) {
      updateMessage("Can't proceed with 0 items");
      return;
    }
    captureOrderDetails("orderTotal", cartTotal);
    captureOrderDetails("checkoutItems", readyItems);
    updateCartStep("cart");
    if (!user)
      navigate("/auth/signin", { state: { redirect: "/cart/address" } });
    else {
      navigate("address");
    }
  };
  useEffect(() => {
    if (!isSuccess && !isFetching) return;
    setItems(data);
  }, [isSuccess, isFetching]);
  useEffect(() => {
    if (!items) return;
    setCartTotal(calculateTotalPrice(items));
  }, [items]);

  useEffect(() => {
    if (!itemToToggle.length) {
      clearTimeout(timeoutId.current);
      return;
    }
    updateMessage("Your preference will be recorded in 10s");
    timeoutId.current = setTimeout(async () => {
      toggleItemsQuery.mutate();
    }, 10 * 1000);

    return () => clearTimeout(timeoutId.current);
  }, [itemToToggle]);

  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data.length) return <CartIsEmpty />;
  return (
    <div className="relative mx-auto w-full max-w-[700px]">
      {items?.map((item, index) => (
        <CartItem
          key={index}
          {...item}
          toggleItem={toggleItem}
          changeItemQty={changeItemQty}
          deleteItem={deleteItem}
        />
      ))}
      <h1 className="w-[95%] border-2 border-[#B2B377 py-4 px-7 text-lg font-bold rounded mx-2 flex justify-between hover:opacity-85">
        <span>Cart total:</span>
        <span>${cartTotal}</span>
      </h1>
      <button
        onClick={moveToNextStep}
        className="w-[95%] bg-darker py-4 text-lg font-bold rounded m-2 text-white hover:opacity-85"
      >
        Next
      </button>
    </div>
  );
}

const CartIsEmpty = () => (
  <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-2 items-center justify-center">
    <h1 className=" text-3xl font-bold">Cart is Empty</h1>
    <Link
      to="/boutique"
      className=" text-blue-800 border-b-2 border-gray-400 hover:tracking-widest transition-all duration-100"
    >
      Go to shop to fill cart
    </Link>
  </div>
);
