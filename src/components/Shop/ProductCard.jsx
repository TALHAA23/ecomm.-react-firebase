import { Link } from "react-router-dom";
const text = `Experience the rich, bold flavor of our Caffè Americano, a perfect blend
      of espresso and hot water.`;
export default function ProductCard() {
  return (
    <div className="relative w-full aspect-[3/4] flex flex-col rounded shadow-md">
      <PriceTag />
      <AddToCart />
      <Image />
      <Desc />
    </div>
  );
}

const PriceTag = () => (
  <div className=" absolute right-0 top-0 px-4 py-1 bg-darker text-white font-bold rounded-tr">
    10$
  </div>
);

const AddToCart = () => (
  <div className=" absolute top-1 left-1 w-8 p-1 aspect-square rounded-full bg-light border-2 border-transparent hover:border-lime-200 hover:scale-125">
    <img src="/icons/add-to-the-cart-svgrepo-com.svg" alt="cart" />
  </div>
);

const Image = () => (
  <img
    src="/images/chick.png"
    alt="chick"
    className="w-full h-[50%] object-cover rounded-t"
  />
);

const Desc = () => (
  <div className=" grow flex flex-col p-1 bg-gray-200 rounded-b">
    <h1 className="font-semibold">Poussin arbor</h1>
    <p className=" ml-2 text-sm">
      {text.length <= 110 ? text : text.substring(0, 110) + "..."}
    </p>
    <Link className=" w-full py-2 rounded font-semibold bg-darker text-white text-center">
      Place Order
    </Link>
  </div>
);
