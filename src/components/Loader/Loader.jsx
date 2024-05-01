import "./loader.css";
export default function Loader() {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="loader">
        <div className="orbe" style={{ "--index": 0 }}></div>
        <div className="orbe" style={{ "--index": 1 }}></div>
        <div className="orbe" style={{ "--index": 2 }}></div>
        <div className="orbe" style={{ "--index": 3 }}></div>
        <div className="orbe" style={{ "--index": 4 }}></div>
      </div>
    </div>
  );
}
