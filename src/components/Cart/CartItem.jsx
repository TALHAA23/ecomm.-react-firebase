export default function CartItem() {
  return (
    <div className="relative w-[95%] bg-gray-100 rounded p-2 flex h-[110px] gap-2 my-2 mx-auto">
      <Cancel />
      <Counter />
      <ImageAndSelection />
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

const ImageAndSelection = () => (
  <img
    src="/images/chick.png"
    alt="img"
    className="h-full aspect-square rounded"
  />
);

const Details = () => (
  <div>
    <h1 className=" text-lg font-bold">Poussin arbor</h1>
    <h3 className=" font-bold text-cl-darker">$10</h3>
  </div>
);

const Cancel = () => (
  <button className="absolute right-1 top-1 w-8 rounded-full hover:bg-gray-200">
    <img src="/icons/cross-svgrepo-com.svg" alt="delete" className=" " />
  </button>
);
