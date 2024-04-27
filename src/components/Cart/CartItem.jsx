import { useMutation } from "@tanstack/react-query";
import removeItemFromCart from "../../utils/db/removeItemFromCart";
import { useUser } from "../../hooks/UserProvider";
import { useEffect, useRef } from "react";
import { useMessageUpdater } from "../../hooks/MessageProvider";

export default function CartItem({
  id,
  title,
  price,
  desc,
  ready,
  toggleItem,
}) {
  return (
    <div
      onClick={() => toggleItem(id)}
      className="relative w-[95%] bg-gray-100 rounded p-2 flex h-[110px] gap-2 my-2 mx-auto"
    >
      <Cancel itemId={id} />
      <Counter />
      <ImageAndSelection readyToCheckout={ready} />
      <Details />
    </div>
  );
}

const Counter = () => (
  <div className="flex flex-col bg-light w-[50px] rounded-lg  items-center justify-around">
    <button className="w-full hover:bg-gray-300 rounded-t-lg">+</button>
    <h1 className=" text-3xl font-bold">3</h1>
    <button className="w-full hover:bg-gray-300 rounded-b-lg">-</button>
  </div>
);

const ImageAndSelection = ({ readyToCheckout }) => (
  <div className="relative h-full aspect-square rounded">
    <img src="/images/chick.png" alt="img" className="h-full w-full" />
    {readyToCheckout && (
      <div className=" absolute top-0 rounded w-full h-full bg-black/50 flex items-center justify-center">
        <img src="/icons/tick-svgrepo-com.svg" alt="tick" />
      </div>
    )}
  </div>
);

const Details = () => (
  <div>
    <h1 className=" text-lg font-bold">Poussin arbor</h1>
    <h3 className=" font-bold text-cl-darker">$10</h3>
  </div>
);

const Cancel = ({ itemId }) => {
  const ref = useRef();
  const user = useUser();
  const updateMessage = useMessageUpdater();
  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationKey: ["remove-item"],
    mutationFn: () => removeItemFromCart(user.uid, itemId),
  });

  useEffect(() => {
    if (!isSuccess && !isError) return;
    if (isSuccess) ref.current?.parentElement.remove();
    updateMessage(isError ? error.message : "Item removed from cart!");
  }, [isSuccess, isError]);

  if (isPending)
    ref.current?.parentElement.classList.add(
      "opacity-50",
      "cursor-not-allowed"
    );

  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        mutate();
      }}
      className={`absolute right-1 top-1 w-8 rounded-full hover:bg-gray-200
      ${isPending && "animate-spin"}
      `}
    >
      <img src="/icons/cross-svgrepo-com.svg" alt="delete" className=" " />
    </button>
  );
};
