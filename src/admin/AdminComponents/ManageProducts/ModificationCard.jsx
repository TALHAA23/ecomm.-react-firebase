import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { deleteProduct } from "../../adminUtils/delete";
const fields = ["title", "price", "desc"];
export default function ModificationCard({ props }) {
  // const cardRef = useRef();
  // const changeMutation = useMutation({
  //   mutationKey: [`change:${props.id}`],
  //   mutationFn: handleSubmit,
  // });
  const deleteMutation = useMutation({
    mutationKey: [`delete:${props.id}`],
    mutationFn: (variables) => deleteProduct(variables),
  });

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   if (props.availability && !formData.has("availability"))
  //     formData.set("availability", "off");
  //   [...formData.entries()].map(([key, value]) => {
  //     const valueIsEmptyOrIsNotModified = !value || value == props[key];
  //     const fileIsNotAttached = value instanceof File && !value.name;
  //     if (valueIsEmptyOrIsNotModified || fileIsNotAttached)
  //       formData.delete(key);
  //     if (key == "availability") {
  //       const availability = value == "on" ? true : false;
  //       if (availability == props.availability) formData.delete(key);
  //     }
  //   });
  //   if (![...formData.keys()].length) throw new Error("nothing has changed");
  //   const formDataToObject = {
  //     ...Object.fromEntries(formData.entries()),
  //   };
  //   if ("availability" in formDataToObject)
  //     formDataToObject.availability =
  //       formDataToObject.availability == "on" ? true : false;
  //   if ("imageAddress" in formDataToObject) {
  //     formDataToObject.image = formDataToObject.imageAddress;
  //     delete formDataToObject.imageAddress;
  //   }

  //   const lowercaseFormData = toLowercaseObject(formDataToObject);
  //   await updateProduct(props.id, lowercaseFormData);
  // }

  function triggerDeleteOperation() {
    const confirmation = confirm("Are you sure to delete?");
    if (confirmation) {
      deleteMutation.mutate(props.id);
    }
  }

  return (
    <div
      // ref={cardRef}
      className="relative h-[150px] flex shadow-md border w-full max-w-[600px] rounded-md"
    >
      {/* <div className="absolute right-0 z-10  bg-[#3c1884c0] text-white px-3 text-sm capitalize">
        {changeMutation?.isPending || deleteMutation?.isPending
          ? "processing"
          : changeMutation?.isError || deleteMutation?.isError
          ? changeMutation?.error?.message || deleteMutation?.error?.message
          : changeMutation?.isSuccess || deleteMutation?.isSuccess
          ? "completed successfully"
          : ""}
      </div> */}
      <div className=" relative">
        <img
          src={props.img}
          alt="img"
          loading="lazy"
          className=" h-full max-w-[100px] sm:max-w-max aspect-square object-cover rounded-md p-1"
        />
        <label
          htmlFor="image"
          className=" absolute bottom-0 bg-darker text-white w-[95%] m-1 text-center text-sm py-2"
        >
          Change Image
        </label>
      </div>
      <form
        // onSubmit={changeMutation.mutate}
        className="w-full py-1 flex flex-col gap-[2px] p-1"
      >
        {fields.map((field) => (
          <input
            type="text"
            name={field}
            id={field}
            placeholder={props[field]}
            className="text-xs sm:text-sm border h-[90%] pl-2 text-slate-600 rounded bg-dark"
          />
        ))}
        <input type="file" name="image" id="image" hidden />
        <div className=" flex h-full gap-1">
          {["update", "delete"].map((btn) => (
            <button
              type={btn == "update" ? "submit" : "button"}
              onClick={btn == "delete" ? triggerDeleteOperation : undefined}
              className={`w-1/2 capitalize rounded-md font-semibold text-white  ${
                btn == "update" ? "bg-green-700" : "bg-red-700"
              } hover:opacity-70`}
            >
              {btn == "delete"
                ? deleteMutation.isPending
                  ? "deleting..."
                  : btn
                : btn}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

// function toLowercaseObject(obj) {
//   const newObj = {};
//   for (const key in obj)
//     if (typeof obj[key] === "string")
//       newObj[key] = obj[key].toLowerCase().trim();
//     else newObj[key] = obj[key];
//   return newObj;
// }
