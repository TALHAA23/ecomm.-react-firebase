import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postItemToCart from "../../utils/db/postItemToCart";
import { useMessageUpdater } from "../../hooks/MessageProvider";

export default function ProductCard({ id, title, desc, price, img }) {
  const user = useUser();
  const navigate = useNavigate();

  const addItemToCart = async () => {
    if (!user) return navigate("/auth/signin");
    await postItemToCart(user.uid, id);
  };

  return (
    <div className="relative w-full aspect-[3/4] flex flex-col rounded shadow-md">
      <PriceTag price={price} />
      <AddToCart
        addItemToCartFn={addItemToCart}
        userId={user?.uid}
        itemId={id}
      />
      <Image img={img} />
      <Desc title={title} desc={desc} itemId={id} />
    </div>
  );
}

const PriceTag = ({ price }) => (
  <div className=" absolute right-0 top-0 px-4 py-1 bg-darker text-white font-bold rounded-tr">
    ${price}
  </div>
);

const AddToCart = ({ addItemToCartFn }) => {
  const updateMessage = useMessageUpdater();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: addItemToCartFn,
    onError: (err) => {
      updateMessage(err.message);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["cart-items"] });
    },
  });

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

const Image = ({ img }) => (
  <img
    src={img}
    alt="chick"
    className="w-full h-[50%] object-cover rounded-t"
  />
);

const Desc = ({ title, desc, itemId }) => {
  return (
    <div className=" grow flex flex-col p-1 bg-gray-200 rounded-b">
      <h1 className="font-semibold capitalize">{title}</h1>
      <div className="w-full flex flex-col justify-between h-full">
        <p className=" ml-2 text-sm">
          {desc.length <= 110 ? desc : desc.substring(0, 110) + "..."}
        </p>
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
