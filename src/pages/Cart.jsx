import CartItem from "../components/Cart/CartItem";
import CartSteps from "../components/Cart/CartSteps";

export default function Cart() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_300px] h-screen">
      <div className="mx-auto w-full max-w-[700px]">
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <CartSteps />
    </div>
  );
}
