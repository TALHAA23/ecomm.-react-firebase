const steps = ["cart", "logged in", "address", "confirmation", "end"];
export default function CartSteps() {
  return (
    <div className="fixed hidden sm:block right-5 top-1/2 -translate-y-1/2 rounded bg-gray-100 py-10 px-12">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-3 items-start">
          <div className="flex flex-col items-center pt-1">
            <div className="w-3 aspect-square bg-red-600 rounded-full"></div>
            <div
              className={`relative w-[2px] h-10 bg-red-600 mt-1
            ${index == steps.length - 1 ? "hidden" : "block"}
            `}
            >
              <div className="absolute w-full h-0 bg-yellow-900 transition-all duration-200"></div>
            </div>
          </div>
          <p className="text-sm">{step}</p>
        </div>
      ))}
    </div>

    // <div className="fixed right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-3 px-9 ">
    //   <div>
    //     <div className="flex gap-2 items-center">
    //       <div className="w-3 aspect-square bg-green-700 rounded-full"></div>
    //       <p>cart</p>
    //     </div>
    //     <div className="relative w-[2px] h-10 bg-red-600 translate-x-1 rounded">
    //       <div className="absolute w-full h-0 bg-yellow-900 transition-all duration-200"></div>
    //     </div>
    //   </div>
    // </div>

    // <div className="fixed right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-3 px-9 ">
    //   <div className="flex gap-2 items-center pb-12">
    //     <div className="relative w-3 aspect-square bg-green-700 rounded-full">
    //       <div className=" absolute w-[2px] h-12 bg-red-600 left-1/2 -translate-x-1/2 top-[150%]"></div>
    //     </div>
    //     <p>cart</p>
    //   </div>
    // </div>
  );
}
