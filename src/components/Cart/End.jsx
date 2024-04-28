import { useEffect } from "react";
import { useCartStepsUpdater } from "../../hooks/CartStepsProvider";

export default function End() {
  const updateCartStep = useCartStepsUpdater();
  useEffect(() => {
    updateCartStep("end");
  }, []);
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center h-[calc(100vh-100px)]">
      <img
        src="/icons/circle-dashed-svgrepo-com.svg"
        alt="img"
        className="animate-spin"
      />
      <h1 className=" text-2xl">
        <span className=" text-green-600 font-bold">Almost There!</span>
        <span className=" border-b-4"> Your order is being processed.</span>
      </h1>
    </div>
  );
}
