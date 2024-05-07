import emailjs from "@emailjs/browser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getAllQueries from "../adminUtils/getQuries";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error";
import NoResult from "../../components/NoResult";
import { useRef, useState } from "react";
import deleteQueryById from "../adminUtils/deleteQuery";

export default function ManageQuries() {
  const [_error, setError] = useState(null);
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["quries"],
    queryFn: getAllQueries,
  });

  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data?.length) return <NoResult title="No Query exist" />;

  return (
    <section className="w-full max-w-[800px] mx-auto rounded bg-light m-4 p-2">
      <h1 className=" text-center text-3xl font-bold ">
        You have not respond the following quries
      </h1>
      {(error || _error) && (
        <p className="text-sm text-center font-light text-red-700 my-2">
          {error?.message || _error}
        </p>
      )}
      <div>
        {data?.map((query, index) => (
          <QueryContainer key={index} setError={setError} {...query} />
        ))}
      </div>
    </section>
  );
}

const QueryContainer = ({ setError, id, name, email, message }) => {
  const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm("service_a6icfh9", "template_ern582h", e.target, {
        publicKey: "JjbBGjEJlqBzQd9Bm",
      });
      await deleteQueryById(id);
    } catch (err) {
      return setError(err);
    }
  };
  const { isPending, mutate } = useMutation({
    mutationKey: ["respond-query"],
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["quries"] });
    },
  });

  const formRef = useRef();

  const toggleFormVisibility = () => {
    formRef.current?.classList.toggle("hidden");
  };

  return (
    <div className="w-full bg-gray-100 p-2">
      <h1 className="text-lg font-bold my-2">{name} asks:</h1>
      <p>{message}</p>
      <button
        onClick={toggleFormVisibility}
        className="px-3 py-1 rounded-full text-white font-bold bg-green-600 my-2 hover:opacity-85"
      >
        replay
      </button>
      <form
        ref={formRef}
        onSubmit={mutate}
        className="w-full bg-darker rounded p-3 hidden"
      >
        <input type="text" name="name" value={name} hidden />
        <input type="email" name="email" value={email} hidden />
        <input type="text" name="query" value={message} hidden />
        <textarea
          required
          name="message"
          className="w-full rounded-md resize-none bg-lighter p-2 text-white"
        ></textarea>
        <button
          disabled={isPending}
          className="px-3 py-1 rounded bg-yellow-600 text-white font-bold hover:opacity-85 disabled:opacity-80"
        >
          {isPending
            ? "Sending email and deleting query"
            : "Send Email and delete query"}
        </button>
      </form>
    </div>
  );
};
