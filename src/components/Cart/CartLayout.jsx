import { Outlet } from "react-router-dom";
import CartSteps from "./CartSteps";
import CartStepsProvider from "../../hooks/CartStepsProvider";

export default function CartLayout() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-[auto_300px] min-h-screen">
      <CartStepsProvider>
        <Outlet />
        <CartSteps />
      </CartStepsProvider>
    </div>
  );
}
