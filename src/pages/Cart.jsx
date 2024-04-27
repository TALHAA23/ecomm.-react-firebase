import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CartItem from "../components/Cart/CartItem";
import CartSteps from "../components/Cart/CartSteps";
import { useUser } from "../hooks/UserProvider";
import getCartItems from "../utils/db/getCartItems";
import Loader from "../components/Loader/Loader";
import { useEffect, useRef, useState } from "react";
import toggleProductsReadyState from "../utils/db/toggleProductsReadyState";
import { useMessageUpdater } from "../hooks/MessageProvider";
import { useNavigate } from "react-router-dom";
import { useCartSteps, useCartStepsUpdater } from "../hooks/CartStepsProvider";

export default function Cart() {
  const updateCartStep = useCartStepsUpdater();
  const user = useUser();
  const updateMessage = useMessageUpdater();
  const timeoutId = useRef();
  const navigate = useNavigate();
  const [items, setItems] = useState();
  const [itemToToggle, setItemToToggle] = useState([]);
  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ["cart-items"],
    queryFn: () => getCartItems(user.uid, setItems),
  });

  const toggleItemsQuery = useMutation({
    mutationKey: ["toggle"],
    mutationFn: () => toggleProductsReadyState(user.uid, itemToToggle),
    onMutate: () => updateMessage("This will take a movement!"),
    onSuccess: () => setItemToToggle([]),
    onError: (err) => updateMessage(err.message),
  });

  const toggleItem = (itemId) => {
    setItemToToggle((prevItems) => {
      if (prevItems.includes(itemId))
        return prevItems.filter((item) => item !== itemId);
      return [...prevItems, itemId];
    });
  };

  const moveToNextStep = () => {
    updateCartStep("cart");
    if (!user)
      navigate("/auth/signin", { state: { redirect: "/cart/address" } });
    else {
      navigate("address");
    }
  };

  useEffect(() => {
    if (!itemToToggle.length) {
      clearTimeout(timeoutId.current);
      return;
    }
    timeoutId.current = setTimeout(async () => {
      toggleItemsQuery.mutate();
    }, 1000);

    return () => clearTimeout(timeoutId.current);
  }, [itemToToggle]);

  if (isPending) return <Loader />;
  return (
    // <div className=" grid grid-cols-1 sm:grid-cols-[auto_300px] min-h-screen">
    <div className="relative mx-auto w-full max-w-[700px]">
      {items?.map((item, index) => (
        <CartItem key={index} {...item} toggleItem={toggleItem} />
      ))}
      <button
        onClick={moveToNextStep}
        className="w-[95%] bg-darker py-4 text-lg font-bold rounded m-2 text-white hover:opacity-85"
      >
        Next
      </button>
    </div>
    // {/* <CartSteps /> */}
    // {/* </div> */}
  );
}
