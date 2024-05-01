import { useMutation, useQueryClient } from "@tanstack/react-query";
import recordNewAddress from "../../utils/db/recoredNewAddress";
import { useUser } from "../../hooks/UserProvider";
import { useNavigate } from "react-router-dom";

const inputs = [
  "full name",
  "region",
  "city",
  "street address",
  "postal code",
  "phone number",
];
export default function AddressForm() {
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataAsObj = Object.fromEntries(formData.entries());
    const addressAsString = `${formDataAsObj["street address"]}, ${formDataAsObj.city}, ${formDataAsObj.region}, ${formDataAsObj["postal code"]}`;
    const data = {
      fullName: formData.get("full name"),
      phoneNo: formData.get("phone number"),
      shippingAddress: addressAsString,
      inuse: false,
    };
    await recordNewAddress(user.uid, data);
    return true;
  };

  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationKey: ["new-address"],
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-details"] });
      navigate("/cart");
    },
  });

  return (
    <form
      onSubmit={mutate}
      className=" w-full max-w-[500px] mx-auto bg-lighter p-5 mt-12"
    >
      <h1 className=" text-center font-orelega-one text-3xl my-3">
        Add new Address
      </h1>
      {isError && (
        <p className="text-center text-sm my-4 text-red-700">{error.message}</p>
      )}
      {isSuccess && (
        <p className="text-center text-sm my-4 text-green-700">
          Successfully recorded
        </p>
      )}
      <div className="flex flex-col gap-1">
        {inputs.map((input) => (
          <input
            type="text"
            name={input}
            placeholder={input}
            className="bg-dark py-3 rounded pl-3 placeholder:text-gray-400 placeholder:text-sm"
          />
        ))}
      </div>
      <button
        disabled={isPending}
        className=" w-full bg-darker py-3 font-bold text-lg text-white rounded-md my-5 disabled:opacity-85"
      >
        {isPending ? "Please wait..." : " Submit"}
      </button>
    </form>
  );
}
