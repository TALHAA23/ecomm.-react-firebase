import { useQuery } from "@tanstack/react-query";
import CartItem from "../components/Cart/CartItem";
import CartSteps from "../components/Cart/CartSteps";
import { useUser } from "../hooks/UserProvider";
import { getCartItems } from "../utils/db/getCartItems";
import Loader from "../components/Loader/Loader";

export default function Cart() {
  const user = useUser();
  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ["cart-items"],
    queryFn: () => getCartItems(user.uid),
  });

  if (isPending) return <Loader />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_300px] min-h-screen">
      <div className="mx-auto w-full max-w-[700px]">
        {data.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </div>
      <CartSteps />
    </div>
  );
}
