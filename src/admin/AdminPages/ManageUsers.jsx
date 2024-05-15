import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import formatDate from "../../assets/formatDate";

export default function ManageUsers() {
  const [filterUser, setFilterUser] = useState();
  const timeoutId = useRef();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["list-users"],
    queryFn: async () => {
      const res = await fetch(
        "http://127.0.0.1:5001/e-commerce-7bd3f/us-central1/listAllUsers"
      );
      const data = await res.json();
      return data;
    },
  });

  const handleChange = (e) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setFilterUser(executeFilter(data, e.target.value));
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-[1000px] bg-light rounded mx-auto my-3 px-2 py-8 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="sticky top-0">
        <input
          onChange={handleChange}
          type="search"
          placeholder="search by email"
          className="w-full py-2 rounded bg-darker pl-2 text-white placeholder:text-white text-sm placeholder:font-light"
        />
        <div className="flex  my-2 text-gray-400">
          {["provider", "display name", "uid", "last signed in"].map(
            (item, index) => (
              <p key={index} className="w-1/4 text-center capitalize text-sm">
                {item}
              </p>
            )
          )}
        </div>
      </div>
      <h3 className="text-center font-bold text-lg">
        {isPending
          ? "Loading users"
          : isError
          ? error.message
          : !data.users.length
          ? "No user found"
          : ""}
      </h3>
      {data?.users.length > 0 && (
        <section>
          {(filterUser?.length ? filterUser : data?.users).map(
            (user, index) => (
              <div
                key={index}
                className={`group relative flex hover:bg-gray-100 ${
                  user.disabled && " opacity-50"
                }`}
              >
                {[
                  user.email,
                  user.displayName,
                  user.uid,
                  user.metadata.lastSignInTime,
                ].map((item, index) => (
                  <p
                    key={index}
                    className="text-sm text-center h-auto w-1/4 py-2 border-b"
                  >
                    {item}
                  </p>
                ))}
                <div className="group/dots relative w-10 aspect-square bg-gray-300 right-0 rounded-full p-1 opacity-0 hover:bg-gray-400 group-hover:opacity-100 transition-opacity duration-100">
                  <img
                    src="/icons/interface-ui-dots-menu-svgrepo-com.svg"
                    alt="dots"
                  />
                  <Actions useruid={user.uid} disabled={user.disabled} />
                </div>
              </div>
            )
          )}
        </section>
      )}
    </div>
  );
}

const Actions = ({ useruid, disabled }) => {
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: async () => {
      await fetch(
        "http://127.0.0.1:5001/e-commerce-7bd3f/us-central1/deleteUser",
        {
          method: "post",
          body: JSON.stringify({ uid: useruid }),
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["list-users"] });
    },
  });
  const disableUserMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: async () => {
      await fetch(
        "http://127.0.0.1:5001/e-commerce-7bd3f/us-central1/disableUser",
        {
          method: "post",
          body: JSON.stringify({ uid: useruid, condition: !disabled }),
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["list-users"] });
    },
  });
  return (
    <div className="absolute -left-[240%] rounded flex flex-col top-0 z-30 text-xs  bg-gray-900 text-white py-1 text-center scale-x-0 origin-right group-hover/dots:scale-x-100 transition-all duration-100">
      <button
        onClick={disableUserMutation.mutate}
        disabled={disableUserMutation.isPending}
        className="px-3 py-1 hover:opacity-80 disabled:opacity-20 capitalize"
      >
        {disableUserMutation.isPending
          ? disabled
            ? "enabling"
            : "disabling"
          : disabled
          ? "enable user"
          : "disable user"}
      </button>
      <button
        onClick={deleteUserMutation.mutate}
        disabled={deleteUserMutation.isPending}
        className="px-3 py-1 hover:opacity-80 disabled:opacity-20 capitalize"
      >
        {deleteUserMutation.isPending ? "deleting" : "delete user"}
      </button>
    </div>
  );
};

const executeFilter = (list, query) => {
  const regex = new RegExp(`^${query}`, "i");
  return list.users.filter(({ email }) => regex.test(email));
};
