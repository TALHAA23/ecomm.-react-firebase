import { useMessage } from "../hooks/MessageProvider";

export default function Message() {
  const message = useMessage();
  if (!message) return;
  return (
    <div className="border-2 bg-darker px-4 py-2 rounded-md text-white fixed  z-50 top-[110px] right-3">
      {message}
    </div>
  );
}
