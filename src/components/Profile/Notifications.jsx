import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getNotifications from "../../utils/db/getNotifications";
import { useUser } from "../../hooks/UserProvider";
import Loader from "../Loader/Loader";
import Error from "../Error";
import NoResult from "../NoResult";
import deleteNotification from "../../utils/db/deleteNotification";

export default function Notifications() {
  const user = useUser();
  const queryClient = useQueryClient();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["my-notifications"],
    queryFn: () => getNotifications(user?.uid),
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-notification"],
    mutationFn: (notificationId) =>
      deleteNotification(user?.uid, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
    },
  });
  if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data?.length) return <NoResult title="You have no notification" />;

  return (
    <div className="w-full bg-light rounded mt-5 m-3 p-6">
      <h1 className="text-cl-darker text-4xl font-bold text-center">
        Notifications
      </h1>
      <section className="mx-auto w-full max-w-[700px] flex flex-col gap-1">
        {data.map((notification, index) => (
          <div key={index} className="w-full bg-gray-100 rounded-md p-1">
            <p className="p-3">{notification.message}</p>
            <button
              onClick={() => deleteMutation.mutate(notification.id)}
              disabled={deleteMutation.isPending}
              className="rounded-full px-3 py-1 mx-2 bg-red-500 text-white font-bold hover:opacity-80 disabled:opacity-80"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
