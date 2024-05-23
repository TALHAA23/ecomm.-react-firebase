import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { deleteProduct } from "../../adminUtils/delete";
import { updateProduct } from "../../adminUtils/update";
const fields = ["title", "price", "desc"];
export default function ModificationCard({ props }) {
  const queryClient = useQueryClient();
  const cardRef = useRef();
  const changeMutation = useMutation({
    mutationKey: [`change:${props.id}`],
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all-products"] });
    },
  });
  const deleteMutation = useMutation({
    mutationKey: [`delete:${props.id}`],
    mutationFn: (variables) => deleteProduct(variables),
    onSuccess: () => {
      cardRef.current.remove();
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get("img"));
    [...formData.entries()].map(([key, value]) => {
      const valueIsEmptyOrIsNotModified = !value || value == props[key];
      const fileIsNotAttached = value instanceof File && !value.name;
      if (valueIsEmptyOrIsNotModified || fileIsNotAttached)
        formData.delete(key);
    });
    if (![...formData.keys()].length) throw new Error("No changes to save");
    const formDataToObject = Object.fromEntries(formData.entries());

    const lowercaseFormData = toLowercaseObject(formDataToObject);
    console.log(lowercaseFormData);
    await updateProduct(props.id, lowercaseFormData);
  }

  function triggerDeleteOperation() {
    const confirmation = confirm("Are you sure to delete?");
    if (confirmation) {
      deleteMutation.mutate(props.id);
    }
  }

  return (
    <form
      ref={cardRef}
      onSubmit={changeMutation.mutate}
      className="rounded border-2 border-gray-200"
    >
      <div className="flex items-center justify-between h-8 px-1 bg-gray-200 py-1 font-bold">
        <p className="text-xs">
          {changeMutation?.isPending || deleteMutation?.isPending
            ? "processing..."
            : changeMutation?.isError || deleteMutation?.isError
            ? changeMutation?.error?.message || deleteMutation?.error?.message
            : changeMutation?.isSuccess || deleteMutation?.isSuccess
            ? "changes recorded successfully"
            : ""}
        </p>
        <div className="flex h-full gap-1">
          {[
            "/icons/tick-svgrepo-com (1).svg",
            "/icons/trash-xmark-svgrepo-com.svg",
          ].map((icon, index) => (
            <button
              type={index == 0 ? "submit" : "button"}
              key={index}
              onClick={index == 1 ? triggerDeleteOperation : null}
              className="h-full aspect-square bg-gray-400 rounded-full p-1 hover:opacity-80"
            >
              <img src={icon} alt="trash" className="h-full aspect-square" />
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-full aspect-square">
        <img src={props.img} alt="img" className="w-full h-full object-cover" />
        <input
          type="file"
          name="img"
          id="img"
          className="absolute w-[90%] bottom-2 right-1
          block text-sm text-slate-500 file:py-1 file:px-2 bg-[#fbffc1] rounded
          file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#fbffc1]
          hover:file:opacity-80"
        />
      </div>
      <div className="px-2 py-1">
        <input
          type="text"
          name="title"
          placeholder={props.title}
          className=" font-bold text-xl w-full bg-transparent focus:outline-none"
        />

        <textarea
          name="desc"
          placeholder={props.desc}
          className="w-full bg-gray-100 resize-none focus:outline-none rounded p-1 text-sm"
        ></textarea>

        <input
          type="number"
          name="price"
          min={0}
          placeholder={`$${props.price}`}
          className="bg-transparent focus:outline-none w-[90%] text-xl font-bold mr-auto text-green-900"
        />
      </div>
    </form>
  );
}

function toLowercaseObject(obj) {
  const newObj = {};
  for (const key in obj)
    if (typeof obj[key] === "string")
      newObj[key] = obj[key].toLowerCase().trim();
    else newObj[key] = obj[key];
  return newObj;
}
