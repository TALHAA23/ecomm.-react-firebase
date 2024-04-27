import { useCartSteps } from "../../hooks/CartStepsProvider";
const steps = ["cart", "logged in", "address", "confirmation", "end"];

export default function CartSteps() {
  const cartSteps = useCartSteps();

  return (
    <div className="fixed hidden sm:block right-5 top-1/2 -translate-y-1/2 rounded bg-gray-100 py-10 px-12">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-3 items-start">
          <div className="flex flex-col items-center pt-1">
            <div
              className={`w-3 aspect-square ${
                cartSteps[step] ? "bg-green-800" : "bg-red-600"
              }  rounded-full`}
            ></div>
            <div
              className={`relative w-[2px] h-10 mt-1 bg-gray-400
            ${index == steps.length - 1 ? "hidden" : "block"}
            `}
            >
              <div
                className={`absolute w-full ${
                  cartSteps[step] ? "h-full" : "h-0"
                } bg-green-800 transition-all duration-700`}
              ></div>
            </div>
          </div>
          <p className="text-sm">{step}</p>
        </div>
      ))}
    </div>
  );
}
