import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadProduct from "../../adminUtils/upload";

const inputs = [
  ["text", "title"],
  ["number", "price"],
  ["text", "desc"],
];
export default function Create() {
  const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const res = await uploadProduct(data);
    return res;
  };
  const { isPending, isError, error, mutate } = useMutation({
    mutationKey: ["upload"],
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["all-products"],
      });
    },
  });

  return (
    <section className="w-full min-h-[calc(100vh-60px)] flex items-center justify-center">
      <form
        onSubmit={mutate}
        className="m-5 w-full max-w-[400px] bg-lighter flex flex-col py-4 p-2"
      >
        <h1 className="text-center text-2xl font-bold text-cl-darker my-3">
          Télécharger un nouveau produit
        </h1>
        {isError && (
          <p className="text-center text-sm text-red-700">{error.message}</p>
        )}
        <div>
          {inputs.map(([type, name], index) => (
            <input
              key={index}
              type={type}
              name={name}
              placeholder={name}
              //   required
              className="capitalize w-full h-12 rounded bg-dark my-1 text-black pl-3"
            />
          ))}
        </div>
        <input
          type="file"
          name="img"
          className="block w-full text-sm text-slate-500 my-1
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-[#f1f5a896] file:text-[#B2B377]
      hover:file:bg-violet-100
    "
        />
        <button
          disabled={isPending}
          className="bg-darker py-3 rounded-md text-white font-lg font-bold hover:opacity-85 disabled:opacity-80"
        >
          {isPending ? "Uploading..." : " Upload"}
        </button>
      </form>
    </section>
  );
}
