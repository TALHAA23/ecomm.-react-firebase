import { useNavigate, useParams } from "react-router-dom";
import ShopHeader from "../components/Shop/ShopHeader";
import { useMessageUpdater } from "../hooks/MessageProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/UserProvider";
import postItemToCart from "../utils/db/postItemToCart";
import getProductById from "../utils/db/getProductById";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error";

export default function ProductDetails() {
  const { productId } = useParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: [productId],
    queryFn: () => getProductById(productId),
  });

  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;

  return (
    <div className="h-screen max-h-[600px]">
      <ShopHeader />
      <div className="h-[calc(100%-60px)] flex">
        <ImagesArea img={data?.img} />
        <Details {...data} />
      </div>
      <section className="flex"></section>
    </div>
  );
}

const ImagesArea = ({ img }) => (
  <div className=" w-1/2 h-full  ">
    <img src={img} alt="img" className="w-full h-full object-cover " />
  </div>
);

const Details = ({ title, price, desc }) => (
  <div className="w-1/2 p-4 flex flex-col justify-between">
    <div>
      <h1 className=" text-4xl font-bold">{title}</h1>
      <h2 className=" text-3xl font-bold">${price}</h2>
      <h3 className=" text-2xl font-bold">Details</h3>
      <p>{desc}</p>
    </div>
    <ButtonsAndRating />
  </div>
);

const ButtonsAndRating = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { productId } = useParams();
  const updateMessage = useMessageUpdater();

  const addItemToCart = async (event) => {
    const { name } = event.target.dataset;
    if (!user) navigate("/auth/signin");
    await postItemToCart(user.uid, productId);
    name == "addToCart"
      ? updateMessage("Item added to cart")
      : navigate("/cart");
  };
  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: addItemToCart,
    onError: (error) => {
      updateMessage(error.message);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
  });

  return (
    <div>
      {/* <div className="flex items-center gap-2 my-2">
        <div className="flex">
          {Array(5)
            .fill(null)
            .map((item, index) => (
              <img
                key={index}
                src="/icons/star-solid-svgrepo-com.svg"
                alt=""
                className=" w-4"
              />
            ))}
        </div>
        <p className="text-sm">12 reviews</p>
      </div> */}
      <div className="w-full flex flex-col lg:flex-row gap-1">
        <button
          onClick={mutate}
          disabled={isPending}
          data-name="addToCart"
          className="grow py-3 border-2 border-[#B2B377] rounded-lg font-bold active:scale-95 disabled:opacity-70"
        >
          Add to cart
        </button>
        <button
          onClick={mutate}
          disabled={isPending}
          data-name="checkout"
          className="grow py-3 bg-darker text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-70"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
