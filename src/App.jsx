import { useUI } from "./hooks/UserProvider";

export default function App() {
  const UI = useUI();
  return UI;
}
