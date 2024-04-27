import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UserProvider";
import { useMutation } from "@tanstack/react-query";
import postItemToCart from "../../utils/db/postItemToCart";
import { useEffect } from "react";
import { useMessageUpdater } from "../../hooks/MessageProvider";
const text = `Experience the rich, bold flavor of our Caffè Americano, a perfect blend
      of espresso and hot water.`;
export default function ProductCard({ id, title, desc, price }) {
  const user = useUser();

  const addItemToCart = async () => {
    if (!user) navigate("/auth/signin");
    await postItemToCart(user.uid, id);
  };

  return (
    <div className="relative w-full aspect-[3/4] flex flex-col rounded shadow-md">
      <PriceTag />
      <AddToCart
        addItemToCartFn={addItemToCart}
        userId={user.uid}
        itemId={id}
      />
      <Image />
      <Desc addItemToCartFn={addItemToCart} userId={user.uid} itemId={id} />
    </div>
  );
}

const PriceTag = () => (
  <div className=" absolute right-0 top-0 px-4 py-1 bg-darker text-white font-bold rounded-tr">
    10$
  </div>
);

const AddToCart = ({ addItemToCartFn }) => {
  const updateMessage = useMessageUpdater();
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: addItemToCartFn,
  });

  useEffect(() => {
    if (!isSuccess && !isError) return;
    updateMessage(isError ? error.message : "Item added to cart!");
  }, [isSuccess, isError]);

  return (
    <div
      onClick={mutate}
      className={`absolute top-1 left-1 w-8 p-1 aspect-square rounded-full bg-light border-2 border-transparent hover:border-lime-200 
      ${isPending ? "animate-spin cursor-not-allowed" : "hover:scale-125"}
     `}
    >
      <img
        src={
          isPending
            ? "/icons/circle-dashed-svgrepo-com.svg"
            : "/icons/add-to-the-cart-svgrepo-com.svg"
        }
        alt="cart"
      />
    </div>
  );
};

const Image = () => (
  <img
    src="/images/chick.png"
    alt="chick"
    className="w-full h-[50%] object-cover rounded-t"
  />
);

const Desc = ({ addItemToCartFn, itemId }) => {
  const navigate = useNavigate();
  const updateMessage = useMessageUpdater();

  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: addItemToCartFn,
  });

  useEffect(() => {
    if (!isSuccess && !isError) return;
    isError ? updateMessage(error.message) : navigate("/cart");
  }, [isSuccess, isError]);

  return (
    <div className=" grow flex flex-col p-1 bg-gray-200 rounded-b">
      <h1 className="font-semibold">Poussin arbor</h1>
      <div className="w-full flex flex-col justify-between h-full">
        <p className=" ml-2 text-sm">
          {text.length <= 110 ? text : text.substring(0, 110) + "..."}
        </p>
        {/* <button
            onClick={mutate}
            disabled={isPending}
            className="w-full py-2 rounded font-semibold bg-darker text-white text-center hover:opacity-90 disabled:opacity-80"
          >
            {isPending ? "Preparing..." : "Place order"}
          </button> */}
        <Link
          to={itemId}
          className="w-full py-2 rounded font-semibold bg-darker text-white text-center hover:opacity-90 disabled:opacity-80"
        >
          More
        </Link>
      </div>
    </div>
  );
};
