import ShopHeader from "../components/Shop/ShopHeader";

export default function ProductDetails() {
  return (
    <div className="h-screen max-h-[600px] border border-black">
      <ShopHeader />
      <div className="h-[calc(100%-60px)] flex">
        <ImagesArea />
        <Details />
      </div>
      <section className="flex"></section>
    </div>
  );
}

const ImagesArea = () => (
  <div className=" w-1/2 h-full  ">
    <img
      src="/images/chick.png"
      alt=""
      className="w-full h-[80%] object-cover "
    />
    <div className="  flex gap-3 items-center h-[20%] justify-center py-2">
      {Array(3)
        .fill(null)
        .map(() => (
          <img
            src="/images/chick.png"
            alt="img"
            className=" h-full aspect-square object-contain border border-gray-200 rounded"
          />
        ))}
    </div>
  </div>
);

const Details = () => (
  <div className="w-1/2 p-4 flex flex-col justify-between">
    <div>
      <h1 className=" text-4xl font-bold">Poussin arbor</h1>
      <h2 className=" text-3xl font-bold">$10</h2>
      <h3 className=" text-2xl font-bold">Details</h3>
      <p>
        Experience the rich, bold flavor of our Caffè Americano, a perfect blend
        of espresso and hot water that will invigorate your senses and energize
        your day!
      </p>
    </div>
    <ButtonsAndRating />
  </div>
);

const ButtonsAndRating = () => (
  <div>
    <div className="flex items-center gap-2 my-2">
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
    </div>
    <div className="w-full flex flex-col lg:flex-row gap-1">
      <button className="grow py-3 border-2 border-[#B2B377] rounded-lg font-bold active:scale-95">
        Add to cart
      </button>
      <button className="grow py-3 bg-darker text-white rounded-lg font-bold hover:opacity-90">
        Checkout
      </button>
    </div>
  </div>
);
