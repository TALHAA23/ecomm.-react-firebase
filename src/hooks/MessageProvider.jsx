import { createContext, useContext, useEffect, useState } from "react";

const MESSAGE_TIMEOUT = 10 * 1000; //10s

const MessageContext = createContext();
export const useMessage = () => useContext(MessageContext)?.information;
export const useMessageUpdater = () =>
  useContext(MessageContext)?.updateMessage;

export default function MessageProvider({ children }) {
  const [information, setInformation] = useState(null);
  const updateMessage = (message) => setInformation(message);
  useEffect(() => {
    if (information) setTimeout(() => setInformation(null), MESSAGE_TIMEOUT);
  }, [information]);

  return (
    <MessageContext.Provider value={{ information, updateMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
